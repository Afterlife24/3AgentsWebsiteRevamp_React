"use client";

import React, { Component, ReactNode } from "react";
import { AlertCircle } from "lucide-react";

/**
 * Props interface for AvatarErrorBoundary component
 */
interface AvatarErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * State interface for AvatarErrorBoundary component
 */
interface AvatarErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Default fallback UI component for error state
 */
function DefaultErrorFallback({ error }: { error: Error | null }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4 text-center max-w-sm">
        {/* Error icon */}
        <div className="relative">
          <div className="rounded-full bg-red-100 p-4">
            <AlertCircle size={32} className="text-red-500" />
          </div>
        </div>

        {/* Error message */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Unable to Load Avatar
          </h3>
          <p className="text-sm text-gray-600">
            We encountered an issue loading the 3D avatar. This might be due to
            browser compatibility or a temporary loading error.
          </p>
        </div>

        {/* Technical details (collapsed by default in production) */}
        {import.meta.env.DEV && error && (
          <details className="w-full mt-2">
            <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
              Technical Details
            </summary>
            <pre className="mt-2 text-xs text-left bg-gray-100 p-3 rounded-lg overflow-auto max-h-32">
              {error.message}
            </pre>
          </details>
        )}

        {/* Retry suggestion */}
        <p className="text-xs text-gray-500 mt-2">
          Try refreshing the page or using a different browser.
        </p>
      </div>
    </div>
  );
}

/**
 * AvatarErrorBoundary component
 *
 * Error boundary specifically designed for Three.js and WebGL errors.
 * Catches errors during rendering, in lifecycle methods, and in constructors
 * of the whole tree below them.
 *
 * Common errors caught:
 * - WebGL context lost/unavailable
 * - GLB model loading failures
 * - Three.js rendering errors
 * - Animation system errors
 * - Out of memory errors
 *
 * Usage:
 * ```tsx
 * <AvatarErrorBoundary>
 *   <Avatar3D />
 * </AvatarErrorBoundary>
 * ```
 *
 * With custom fallback:
 * ```tsx
 * <AvatarErrorBoundary fallback={<CustomErrorUI />}>
 *   <Avatar3D />
 * </AvatarErrorBoundary>
 * ```
 */
export default class AvatarErrorBoundary extends Component<
  AvatarErrorBoundaryProps,
  AvatarErrorBoundaryState
> {
  constructor(props: AvatarErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  /**
   * Update state when an error is caught
   */
  static getDerivedStateFromError(error: Error): AvatarErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Log error details for debugging
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log to console in development
    if (import.meta.env.DEV) {
      console.error("Avatar Error Boundary caught an error:", error);
      console.error("Error Info:", errorInfo);
    }

    // In production, you might want to log to an error tracking service
    // Example: logErrorToService(error, errorInfo);

    // Categorize common Three.js/WebGL errors
    const errorMessage = error.message.toLowerCase();
    if (errorMessage.includes("webgl")) {
      console.error(
        "WebGL Error: Browser may not support WebGL or context was lost",
      );
    } else if (errorMessage.includes("gltf") || errorMessage.includes("glb")) {
      console.error("Model Loading Error: Failed to load 3D model file");
    } else if (errorMessage.includes("animation")) {
      console.error("Animation Error: Failed to play avatar animation");
    } else if (errorMessage.includes("memory")) {
      console.error("Memory Error: Insufficient memory for 3D rendering");
    }
  }

  /**
   * Reset error state (useful for retry functionality)
   */
  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided, otherwise use default
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return <DefaultErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}
