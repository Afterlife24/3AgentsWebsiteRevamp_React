import { useCallback, useState, useEffect } from "react";
import { LiveKitRoom, RoomAudioRenderer, useRoomContext } from "@livekit/components-react";
import { RoomEvent } from "livekit-client";
import AvatarVoiceAgent from "./AvatarVoiceAgent";

/**
 * Props interface for LiveKitWidget component
 */
interface LiveKitWidgetProps {
  onClose: () => void;
}

/**
 * NavigationHandler component - Listens for navigation commands from agent
 * This component must be inside LiveKitRoom context to access room events
 */
function NavigationHandler() {
  const room = useRoomContext();

  useEffect(() => {
    if (!room) return;

    console.log("[NavigationHandler] Setting up data message listener");

    const handleDataReceived = (payload: Uint8Array) => {
      try {
        const decoder = new TextDecoder();
        const message = decoder.decode(payload);
        console.log("[NavigationHandler] Received data message:", message);
        
        const data = JSON.parse(message);
        
        if (data.type === "navigate") {
          console.log("[NavigationHandler] Navigation command received:", data);
          
          if (data.action === "open_url") {
            console.log(`[NavigationHandler] Opening URL in new tab: ${data.url}`);
            window.open(data.url, "_blank");
          } else if (data.action === "navigate_to_section") {
            console.log(`[NavigationHandler] Navigating to section: ${data.section}, URL: ${data.url}`);
            window.location.href = data.url;
          }
        }
      } catch (error) {
        console.error("[NavigationHandler] Error processing data message:", error);
      }
    };

    room.on(RoomEvent.DataReceived, handleDataReceived);
    console.log("[NavigationHandler] Data message listener registered");

    return () => {
      console.log("[NavigationHandler] Cleaning up data message listener");
      room.off(RoomEvent.DataReceived, handleDataReceived);
    };
  }, [room]);

  return null;
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
 * - Listens for navigation commands from agent via data channel
 *
 * Requirements: 3.2, 3.3, 3.5
 */
export default function LiveKitWidget({ onClose }: LiveKitWidgetProps) {
  const [token, setToken] = useState<string>("");

  /**
   * Fetch LiveKit authentication token from backend API
   * Closes widget on error to prevent connection attempts without valid token
   */
  const getToken = useCallback(async () => {
    try {
      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "https://web.afterlife.org.in";

      if (!backendUrl) {
        throw new Error("Backend URL is not configured");
      }

      const response = await fetch(`${backendUrl}/getToken?name=admin`);

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
  }, [onClose]);

  // Fetch token on component mount
  useEffect(() => {
    getToken();
  }, [getToken]);

  /**
   * LiveKit server URL - hardcoded for production deployment
   */
  const liveKitUrl =
    import.meta.env.VITE_LIVEKIT_URL || "wss://webagent-n2z20mdr.livekit.cloud";

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

      {/* NavigationHandler listens for navigation commands from agent */}
      <NavigationHandler />

      {/* AvatarVoiceAgent with voice controls and 3D avatar */}
      <AvatarVoiceAgent onClose={onClose} />
    </LiveKitRoom>
  );
}
