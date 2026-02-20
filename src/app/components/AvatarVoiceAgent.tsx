import React, { useEffect, useCallback, lazy, Suspense } from "react";
import { useLocalParticipant } from "@livekit/components-react";
import { Mic, MicOff, X } from "lucide-react";

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
