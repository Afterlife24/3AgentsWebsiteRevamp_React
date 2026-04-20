import { useCallback, useState, useEffect } from "react";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  useRoomContext,
  useTranscriptions,
} from "@livekit/components-react";
import { RoomEvent, ConnectionQuality, ConnectionState } from "livekit-client";
import AvatarVoiceAgent from "./AvatarVoiceAgent";
import { useLanguage } from "@/app/contexts/LanguageContext";

/**
 * Props interface for LiveKitWidget component
 */
interface LiveKitWidgetProps {
  onClose: () => void;
}

/**
 * NavigationHandler component - Registers RPC method to handle navigation commands from agent
 * This component must be inside LiveKitRoom context to access room and local participant
 */
function NavigationHandler() {
  const room = useRoomContext();

  useEffect(() => {
    if (!room || !room.localParticipant) return;

    console.log("[NavigationHandler] Registering RPC method 'navigate'");

    // Register the RPC method handler
    room.localParticipant.registerRpcMethod("navigate", async (data) => {
      try {
        console.log(
          "[NavigationHandler] RPC method called with payload:",
          data.payload,
        );

        const navigationData = JSON.parse(data.payload);
        console.log(
          "[NavigationHandler] Parsed navigation data:",
          navigationData,
        );

        if (navigationData.type === "navigate") {
          if (navigationData.action === "open_url") {
            // Open external URLs in new tab
            console.log(
              `[NavigationHandler] Opening URL in new tab: ${navigationData.url}`,
            );
            window.open(navigationData.url, "_blank");
            return JSON.stringify({ success: true, message: "URL opened" });
          } else if (navigationData.action === "navigate_same_tab") {
            // Navigate in same tab using React Router
            console.log(
              `[NavigationHandler] Navigating in same tab to: ${navigationData.path}, section: ${navigationData.section}`,
            );

            // Build the URL with query parameters if section is specified
            let targetUrl = navigationData.path;
            if (navigationData.section) {
              // Determine action type based on section
              const scrollSections = [
                "vision",
                "services",
                "testimonials",
                "meet-assistants",
                "demo",
                "ai-workforce",
                "whatsapp-agent",
                "web-agent",
                "industries",
              ];
              const action = scrollSections.includes(navigationData.section)
                ? "scroll"
                : "expand";
              targetUrl = `${navigationData.path}?action=${action}&section=${navigationData.section}`;
            }

            // Dispatch custom event for React Router navigation
            // This keeps the LiveKit connection alive by avoiding page reload
            const navigationEvent = new CustomEvent("agent-navigate", {
              detail: { url: targetUrl },
            });
            window.dispatchEvent(navigationEvent);

            console.log(
              `[NavigationHandler] Dispatched navigation event for: ${targetUrl}`,
            );
            return JSON.stringify({
              success: true,
              message: "Navigation initiated",
            });
          }
        }

        return JSON.stringify({
          success: false,
          message: "Unknown navigation action",
        });
      } catch (error) {
        console.error("[NavigationHandler] Error processing RPC call:", error);
        return JSON.stringify({ success: false, message: `Error: ${error}` });
      }
    });

    console.log(
      "[NavigationHandler] RPC method 'navigate' registered successfully",
    );

    return () => {
      console.log("[NavigationHandler] Unregistering RPC method 'navigate'");
      room.localParticipant?.unregisterRpcMethod("navigate");
    };
  }, [room]);

  return null;
}

/**
 * 5.7 — ConnectionMonitor: handles reconnection events and connection quality changes.
 * Shows console warnings and could drive a UI indicator in the future.
 */
function ConnectionMonitor() {
  const room = useRoomContext();

  useEffect(() => {
    if (!room) return;

    const onReconnecting = () => {
      console.warn("[LiveKit] Connection lost, attempting to reconnect...");
    };
    const onReconnected = () => {
      console.log("[LiveKit] Reconnected successfully");
    };
    const onQualityChanged = (
      quality: ConnectionQuality,
      participant: { isLocal?: boolean },
    ) => {
      if (participant?.isLocal && quality === ConnectionQuality.Poor) {
        console.warn("[LiveKit] Poor connection quality detected");
      }
    };
    const onStateChanged = (state: ConnectionState) => {
      if (state === ConnectionState.Disconnected) {
        console.error("[LiveKit] Disconnected from room");
      }
    };

    room.on(RoomEvent.Reconnecting, onReconnecting);
    room.on(RoomEvent.Reconnected, onReconnected);
    room.on(RoomEvent.ConnectionQualityChanged, onQualityChanged);
    room.on(RoomEvent.ConnectionStateChanged, onStateChanged);

    return () => {
      room.off(RoomEvent.Reconnecting, onReconnecting);
      room.off(RoomEvent.Reconnected, onReconnected);
      room.off(RoomEvent.ConnectionQualityChanged, onQualityChanged);
      room.off(RoomEvent.ConnectionStateChanged, onStateChanged);
    };
  }, [room]);

  return null;
}

/**
 * Strip leaked LLM function-call syntax from transcript text.
 * Matches patterns like <function=name>{...}</function> and <|...|>
 */
const FUNC_CALL_RE = /<function=\w+.*?<\/function>|<\|.*?\|>/gs;
function cleanTranscript(text: string): string {
  return text.replace(FUNC_CALL_RE, "").trim();
}

/**
 * 5.8 — TranscriptOverlay: displays live transcription from the agent session.
 * Uses the useTranscriptions hook which subscribes to the lk.transcription topic.
 * Renders as a compact floating bubble near the widget with glassmorphism styling.
 */
function TranscriptOverlay() {
  const transcriptions = useTranscriptions();
  const recent = transcriptions
    .slice(-3)
    .map((entry) => ({ ...entry, text: cleanTranscript(entry.text) }))
    .filter((entry) => entry.text.length > 0);

  if (recent.length === 0) return null;

  return (
    <div
      className="fixed bottom-64 right-4 md:bottom-88 md:right-4 w-48 md:w-72 z-50
                 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl
                 px-3 py-2.5 shadow-lg pointer-events-none
                 max-h-28 overflow-y-auto"
      aria-live="polite"
      aria-label="Live transcription"
    >
      {recent.map((entry, i) => (
        <p
          key={entry.streamInfo?.id ?? i}
          className="text-[11px] md:text-xs leading-relaxed text-white/85 truncate"
        >
          {entry.text}
        </p>
      ))}
    </div>
  );
}

/**
 * LiveKitWidget component - Manages LiveKit room connection and audio setup
 *
 * Features:
 * - Fetches authentication token from backend API
 * - Establishes LiveKit room connection with audio-only settings
 * - Configures audio capture (echo cancellation, noise suppression, auto gain)
 * - Handles connection errors and cleanup
 * - Renders AvatarVoiceAgent within LiveKit context
 * - Closes widget on disconnection or error
 * - Registers RPC method to handle navigation commands from agent
 *
 * Requirements: 3.2, 3.3, 3.5
 */
export default function LiveKitWidget({ onClose }: LiveKitWidgetProps) {
  const [token, setToken] = useState<string>("");
  const { language } = useLanguage();

  /**
   * Fetch LiveKit authentication token from backend API
   * Passes current language so the agent can adapt STT/TTS
   * Closes widget on error to prevent connection attempts without valid token
   */
  const getToken = useCallback(async () => {
    try {
      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "https://web.afterlife.org.in";

      if (!backendUrl) {
        throw new Error("Backend URL is not configured");
      }

      const response = await fetch(
        `${backendUrl}/getToken?name=admin&language=${language}`,
      );

      if (!response.ok) {
        throw new Error(`Token fetch failed: ${response.status}`);
      }

      const tokenData = await response.text();
      setToken(tokenData);
    } catch (error) {
      console.error("Error fetching LiveKit token:", error);
      // Close widget on token fetch failure
      onClose();
    }
  }, [onClose, language]);

  // Fetch token on component mount
  useEffect(() => {
    getToken();
  }, [getToken]);

  /**
   * LiveKit server URL - hardcoded for production deployment
   */
  const liveKitUrl =
    import.meta.env.VITE_LIVEKIT_URL ||
    "wss://webagent-revamp-brx4ajqj.livekit.cloud";

  /**
   * Audio capture configuration for high-quality voice input
   * - Echo cancellation: Prevents feedback loops from speaker output
   * - Noise suppression: Reduces background noise for clearer voice input
   * - Auto gain control: Normalizes microphone volume levels
   * - Sample rate: 48kHz for high-quality audio capture
   */
  const audioCaptureDefaults = {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
    sampleRate: 48000,
  };

  /**
   * Connection options for LiveKit room
   * - audio: Disable audio tracks by default (user must manually enable)
   * - video: Disable video tracks (audio-only connection)
   * - dynacast: Optimizes bandwidth by only sending active streams
   * - adaptiveStream: Adjusts quality based on network conditions
   * - stopLocalTrackOnUnpublish: Properly releases microphone when unpublishing
   */
  const connectOptions = {
    audio: false,
    video: false,
    audioCaptureDefaults,
    dynacast: true,
    adaptiveStream: true,
    stopLocalTrackOnUnpublish: true,
  };

  /**
   * Handle disconnection from LiveKit room
   * Closes widget when connection is lost
   */
  const handleDisconnected = useCallback(() => {
    console.log("LiveKit room disconnected");
    onClose();
  }, [onClose]);

  // Don't render until token is fetched
  if (!token) {
    return null;
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl={liveKitUrl}
      connect={true}
      audio={connectOptions.audio}
      video={connectOptions.video}
      options={{
        audioCaptureDefaults: connectOptions.audioCaptureDefaults,
        dynacast: connectOptions.dynacast,
        adaptiveStream: connectOptions.adaptiveStream,
        stopLocalTrackOnUnpublish: connectOptions.stopLocalTrackOnUnpublish,
      }}
      onDisconnected={handleDisconnected}
    >
      {/* RoomAudioRenderer handles audio playback from LiveKit room */}
      <RoomAudioRenderer />

      {/* NavigationHandler registers RPC method for navigation commands from agent */}
      <NavigationHandler />

      {/* 5.7 — Monitor connection quality and reconnection */}
      <ConnectionMonitor />

      {/* AvatarVoiceAgent with voice controls and 3D avatar */}
      <div className="relative">
        <AvatarVoiceAgent onClose={onClose} />
      </div>
    </LiveKitRoom>
  );
}
