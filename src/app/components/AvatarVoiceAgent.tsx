import React, {
  useEffect,
  useCallback,
  lazy,
  Suspense,
  useState,
  useRef,
} from "react";
import { useLocalParticipant, useRoomContext } from "@livekit/components-react";
import { Mic, MicOff, X } from "lucide-react";
import { RoomEvent } from "livekit-client";

// Lazy load Avatar3D to avoid SSR issues
const Avatar3D = lazy(() => import("./Avatar3D"));

const LoadingSpinner = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
  </div>
);

/**
 * Props interface for AvatarVoiceAgent component
 */
interface AvatarVoiceAgentProps {
  onClose: () => void;
}

/**
 * AvatarVoiceAgent Component
 *
 * Voice interaction UI wrapper with microphone controls and 3D avatar display.
 * Positioned in bottom-right corner with glassmorphism styling.
 *
 * Features:
 * - 3D avatar visualization
 * - Microphone toggle with visual feedback (golden when active, gray when inactive)
 * - Close button with proper cleanup
 * - Keyboard navigation (Escape to close)
 * - Accessibility support (ARIA labels, focus management)
 */
export default function AvatarVoiceAgent({ onClose }: AvatarVoiceAgentProps) {
  const { localParticipant } = useLocalParticipant();
  const room = useRoomContext();
  const [hasGreeted, setHasGreeted] = useState(false);
  const greetingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track microphone state directly from participant
  const isListening = localParticipant?.isMicrophoneEnabled ?? false;

  /**
   * Toggle microphone on/off
   * Ensures proper track publishing/unpublishing
   */
  const toggleListening = async () => {
    if (localParticipant) {
      const newState = !isListening;
      try {
        await localParticipant.setMicrophoneEnabled(newState);
        console.log(`Microphone ${newState ? "enabled" : "disabled"}`);
      } catch (error) {
        console.error("Error toggling microphone:", error);
      }
    }
  };

  /**
   * Handle close action
   * Disables microphone before closing to ensure proper cleanup
   */
  const handleClose = useCallback(() => {
    if (localParticipant) {
      localParticipant.setMicrophoneEnabled(false);
    }
    onClose();
  }, [localParticipant, onClose]);

  /**
   * Handle keyboard events
   * - Escape: Close widget
   * - Space/Enter on buttons: Trigger button action
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  /**
   * Ensure microphone is disabled on mount
   */
  useEffect(() => {
    if (localParticipant) {
      localParticipant.setMicrophoneEnabled(false).catch((error) => {
        console.error("Error disabling microphone on mount:", error);
      });
    }
  }, [localParticipant]); // Only run when localParticipant becomes available

  /**
   * Listen for agent speaking events to auto-enable mic after greeting
   * Uses a simple approach: wait for first audio from agent, then enable mic after a delay
   */
  useEffect(() => {
    if (!room || !localParticipant || hasGreeted) return;

    console.log("[AvatarVoiceAgent] Setting up greeting detection");

    // Listen for when agent starts speaking (track subscribed)
    const handleTrackSubscribed = (
      track: any,
      _publication: any,
      participant: any,
    ) => {
      // Check if it's an audio track from a remote participant (the agent)
      if (
        track.kind === "audio" &&
        participant.identity !== localParticipant.identity
      ) {
        console.log("[AvatarVoiceAgent] Agent audio track detected");

        // Wait for the greeting to finish (estimate 3-5 seconds)
        // Clear any existing timeout
        if (greetingTimeoutRef.current) {
          clearTimeout(greetingTimeoutRef.current);
        }

        greetingTimeoutRef.current = setTimeout(async () => {
          if (!hasGreeted && localParticipant) {
            console.log(
              "[AvatarVoiceAgent] Greeting complete, enabling microphone",
            );
            try {
              await localParticipant.setMicrophoneEnabled(true);
              setHasGreeted(true);
            } catch (error) {
              console.error(
                "[AvatarVoiceAgent] Error enabling microphone:",
                error,
              );
            }
          }
        }, 5000); // Wait 5 seconds after agent starts speaking
      }
    };

    room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed);

    return () => {
      room.off(RoomEvent.TrackSubscribed, handleTrackSubscribed);
      if (greetingTimeoutRef.current) {
        clearTimeout(greetingTimeoutRef.current);
      }
    };
  }, [room, localParticipant, hasGreeted]);

  return (
    <div
      className="fixed bottom-4 right-4 w-48 h-56 md:w-72 md:h-80 z-50 flex flex-col"
      role="dialog"
      aria-label="Voice Agent Widget"
      aria-modal="true"
    >
      {/* Avatar container - flex-1 takes remaining space */}
      <div className="flex-1">
        <Suspense fallback={<LoadingSpinner />}>
          <Avatar3D
            scale={1.0}
            position={[0, -1.15, 0]}
            enableOrbitControls={false}
          />
        </Suspense>
      </div>

      {/* Control bar - fixed height */}
      <div className="flex items-center justify-between p-2 md:p-3">
        {/* Close button - moved to left */}
        <button
          onClick={handleClose}
          className="p-2 md:p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white text-gray-600 hover:text-gray-800"
          aria-label="Close voice agent"
          title="Close voice agent"
        >
          <X size={16} className="md:w-[18px] md:h-[18px]" />
        </button>

        {/* Microphone toggle button */}
        <button
          onClick={toggleListening}
          className="p-2 md:p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white"
          style={{ color: isListening ? "#D4AF37" : "#6b7280" }}
          aria-label={isListening ? "Disable microphone" : "Enable microphone"}
          aria-pressed={isListening}
          title={isListening ? "Disable microphone" : "Enable microphone"}
        >
          {isListening ? (
            <Mic size={16} className="md:w-[18px] md:h-[18px]" />
          ) : (
            <MicOff size={16} className="md:w-[18px] md:h-[18px]" />
          )}
        </button>
      </div>
    </div>
  );
}
