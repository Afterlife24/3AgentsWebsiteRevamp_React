"use client";

import { useRef, useEffect, Suspense, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  useAnimations,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";
import AvatarErrorBoundary from "./AvatarErrorBoundary";

/**
 * Props interface for Avatar3D component
 */
interface Avatar3DProps {
  scale?: number;
  position?: [number, number, number];
  enableOrbitControls?: boolean;
  autoRotate?: boolean;
  className?: string;
  onReady?: () => void;
}

/**
 * Detect if browser supports WebGL
 */
function detectWebGLSupport(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

/**
 * Fallback component when WebGL is not supported
 */
function WebGLFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl">
      <div className="flex flex-col items-center gap-4 p-6 text-center max-w-xs">
        {/* Icon placeholder */}
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Message */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            3D Preview Unavailable
          </h3>
          <p className="text-sm text-gray-600">
            Your browser doesn&apos;t support WebGL, which is required for 3D
            graphics. Please try using a modern browser like Chrome, Firefox, or
            Safari.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Loading spinner component for avatar load state
 */
function AvatarLoadingSpinner() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          {/* Outer spinning ring */}
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200/30 border-t-blue-500"></div>
          {/* Inner pulsing dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="text-sm text-gray-600 font-medium">Loading avatar...</p>
      </div>
    </div>
  );
}

/**
 * AvatarModel sub-component for GLB loading and animation
 */
function AvatarModel({
  scale = 1.2,
  position = [0, -1.5, 0],
  onReady,
}: {
  scale: number;
  position: [number, number, number];
  onReady?: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const hasCalledReady = useRef(false);

  // Initialize with lazy state to avoid SSR issues
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    // Only check on client-side
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  // Load the combined avatar&animations.glb model
  const { scene, animations } = useGLTF("/avatar&animations.glb");

  // Set up animation system
  const { actions, mixer } = useAnimations(animations, group);

  // Notify parent when model is ready
  useEffect(() => {
    if (scene && onReady && !hasCalledReady.current) {
      hasCalledReady.current = true;
      // Small delay to ensure rendering is complete
      const timer = setTimeout(() => {
        onReady();
      }, 100);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]); // Only depend on scene, not onReady

  // Listen for changes to prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Play waving animation once on mount (unless reduced motion is preferred)
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = Object.values(actions)[0];

      if (firstAction) {
        if (prefersReducedMotion) {
          // Stop animation and show static pose
          firstAction.stop();
          // Set to first frame for a neutral pose
          firstAction.time = 0;
          firstAction.paused = true;
        } else {
          // Play the animation once (no loop)
          firstAction.setLoop(THREE.LoopOnce, 1);
          firstAction.clampWhenFinished = true; // Hold the last frame
          firstAction.play();
        }
      }
    }
  }, [actions, prefersReducedMotion]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Stop all animations
      if (mixer) {
        mixer.stopAllAction();
      }

      // Dispose Three.js resources
      scene.traverse((object: THREE.Object3D) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) {
          mesh.geometry.dispose();
        }
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((material: THREE.Material) =>
              material.dispose(),
            );
          } else {
            mesh.material.dispose();
          }
        }
      });
    };
  }, [scene, mixer]);

  return (
    <group ref={group} position={position} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

/**
 * Calculate optimal pixel ratio based on device capabilities
 * Reduces resolution on mobile devices for better performance
 */
function getOptimalPixelRatio(): number {
  // Check if we're on mobile (screen width < 768px)
  const isMobile = window.innerWidth < 768;

  // For mobile: clamp to 1.5 for better performance
  // For desktop: clamp to 2 for retina displays
  const maxPixelRatio = isMobile ? 1.5 : 2;

  return Math.min(window.devicePixelRatio, maxPixelRatio);
}

/**
 * Main Avatar3D component with Canvas wrapper
 * Renders a 3D avatar using Three.js and React Three Fiber
 */
export default function Avatar3D({
  scale = 1.2,
  position = [0, -1.5, 0],
  enableOrbitControls = false,
  autoRotate = false,
  className = "",
  onReady,
}: Avatar3DProps) {
  // Use lazy initialization to avoid setState in useEffect
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hasWebGL, _setHasWebGL] = useState<boolean | null>(() => {
    // Only detect on client-side
    if (typeof window !== "undefined") {
      return detectWebGLSupport();
    }
    return null;
  });

  const [pixelRatio, setPixelRatio] = useState<number>(() => {
    // Only calculate on client-side
    if (typeof window !== "undefined") {
      return getOptimalPixelRatio();
    }
    return 1;
  });

  const canvasInitialized = useRef(false);

  // Update pixel ratio on window resize (e.g., device rotation)
  useEffect(() => {
    const handleResize = () => {
      setPixelRatio(getOptimalPixelRatio());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show nothing during SSR or initial render
  if (hasWebGL === null) {
    return (
      <div className={`w-full h-full ${className}`}>
        <AvatarLoadingSpinner />
      </div>
    );
  }

  // Show fallback if WebGL is not supported
  if (!hasWebGL) {
    return (
      <div className={`w-full h-full ${className}`}>
        <WebGLFallback />
      </div>
    );
  }

  // Render 3D avatar with WebGL support
  // Memoize the Canvas to prevent recreation on re-renders
  const canvasElement = useMemo(() => (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 45 }}
      gl={{
        antialias: true,
        pixelRatio: pixelRatio,
        alpha: true,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
      }}
      style={{ background: "transparent" }}
      onCreated={({ gl }) => {
        if (canvasInitialized.current) {
          return;
        }
        canvasInitialized.current = true;
        gl.setClearColor(0x000000, 0);
      }}
      frameloop="always"
    >
      {/* Lighting setup */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Environment for realistic reflections */}
      <Environment preset="sunset" />

      {/* Suspense boundary for async model loading */}
      <Suspense fallback={null}>
        <AvatarModel scale={scale} position={position} onReady={onReady} />
      </Suspense>

      {/* Optional orbit controls */}
      {enableOrbitControls && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={2}
        />
      )}
    </Canvas>
  ), [scale, position, enableOrbitControls, autoRotate, onReady, pixelRatio]);

  return (
    <div className={`w-full h-full ${className}`}>
      <AvatarErrorBoundary>
        {canvasElement}
      </AvatarErrorBoundary>
    </div>
  );
}

// Preload the GLB model
useGLTF.preload("/avatar&animations.glb");
