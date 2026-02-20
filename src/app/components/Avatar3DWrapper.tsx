"use client";

import { useRef, useEffect, useState } from "react";
import Avatar3D from "./Avatar3D";

/**
 * Wrapper component to prevent Avatar3D from being mounted twice by React Strict Mode
 * Uses a ref to ensure only one instance is ever created
 */
interface Avatar3DWrapperProps {
  scale?: number;
  position?: [number, number, number];
  enableOrbitControls?: boolean;
  onReady?: () => void;
}

export default function Avatar3DWrapper({
  scale = 1.2,
  position = [0, -1.15, 0],
  enableOrbitControls = false,
  onReady,
}: Avatar3DWrapperProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const hasRendered = useRef(false);

  useEffect(() => {
    if (!hasRendered.current) {
      hasRendered.current = true;
      setShouldRender(true);
    }
  }, []);

  if (!shouldRender) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200/30 border-t-blue-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-sm text-gray-600 font-medium">Initializing...</p>
        </div>
      </div>
    );
  }

  return (
    <Avatar3D
      scale={scale}
      position={position}
      enableOrbitControls={enableOrbitControls}
      onReady={onReady}
    />
  );
}
