"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import Avatar3D from "./Avatar3D";

/**
 * Props interface for AvatarWidget component
 */
interface AvatarWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * AvatarWidget component - Floating widget UI wrapper for interactive avatar display
 *
 * Features:
 * - Glassmorphism-styled container
 * - Bottom-right corner positioning
 * - Close button with keyboard support
 * - Larger Avatar3D instance with controls enabled
 * - Accessibility support (ARIA labels, keyboard navigation)
 */
export default function AvatarWidget({ isOpen, onClose }: AvatarWidgetProps) {
  // Handle Escape key to close widget
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="3D Avatar Preview"
      aria-modal="true"
      className="fixed bottom-4 right-4 w-64 h-72 md:w-72 md:h-80 z-50 flex flex-col"
    >
      {/* Avatar3D instance with controls enabled */}
      <div className="flex-1">
        <Avatar3D
          scale={1.0}
          position={[0, -1.15, 0]}
          enableOrbitControls={true}
          autoRotate={false}
        />
      </div>

      {/* Close button */}
      <div className="p-3 flex justify-start">
        <button
          onClick={onClose}
          aria-label="Close avatar preview"
          className="p-2.5 bg-white/90 hover:bg-white backdrop-blur-md border border-white/30 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          tabIndex={0}
        >
          <X size={18} className="text-gray-800" />
        </button>
      </div>
    </div>
  );
}
