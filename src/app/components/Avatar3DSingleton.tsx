"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Global singleton to ensure only one canvas exists
let globalCanvas: HTMLCanvasElement | null = null;
let globalRenderer: THREE.WebGLRenderer | null = null;
let globalScene: THREE.Scene | null = null;
let globalCamera: THREE.PerspectiveCamera | null = null;
let globalModel: THREE.Group | null = null;
let globalMixer: THREE.AnimationMixer | null = null;
let globalAnimationAction: THREE.AnimationAction | null = null;
let isLoading = false;
let isLoaded = false;
let animationFrameId: number | null = null;

interface Avatar3DSingletonProps {
  scale?: number;
  position?: [number, number, number];
  playAnimation?: boolean;
  animationSpeed?: number; // Control animation playback speed (1.0 = normal, 0.5 = half speed)
}

export default function Avatar3DSingleton({
  scale = 1.2,
  position = [0, -1.15, 0],
  playAnimation = true,
  animationSpeed = 1.0,
}: Avatar3DSingletonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(true);
  const [loading, setLoading] = useState(!isLoaded);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Effect to replay animation when playAnimation changes
  useEffect(() => {
    if (playAnimation && globalAnimationAction && globalMixer) {
      globalAnimationAction.reset();
      globalAnimationAction.timeScale = animationSpeed; // Set animation speed
      globalAnimationAction.play();
    }
  }, [playAnimation, animationSpeed]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const initScene = async () => {
      try {
        // Create canvas only once globally
        if (!globalCanvas) {
          globalCanvas = document.createElement("canvas");
          globalCanvas.style.width = "100%";
          globalCanvas.style.height = "100%";
          globalCanvas.style.display = "block";
        }

        // Append canvas to current container
        container.appendChild(globalCanvas);

        // Create renderer only once
        if (!globalRenderer) {
          globalRenderer = new THREE.WebGLRenderer({
            canvas: globalCanvas,
            antialias: true,
            alpha: true,
          });
          globalRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          globalRenderer.setClearColor(0x000000, 0);
        }

        // Update renderer size
        const width = container.clientWidth;
        const height = container.clientHeight;
        globalRenderer.setSize(width, height);

        // Create scene only once
        if (!globalScene) {
          globalScene = new THREE.Scene();

          // Add lights
          const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
          globalScene.add(ambientLight);

          const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
          directionalLight.position.set(5, 5, 5);
          globalScene.add(directionalLight);
        }

        // Create camera only once
        if (!globalCamera) {
          globalCamera = new THREE.PerspectiveCamera(
            45,
            width / height,
            0.1,
            1000,
          );
          globalCamera.position.set(0, 0, 3.5);
        } else {
          globalCamera.aspect = width / height;
          globalCamera.updateProjectionMatrix();
        }

        // Load model only once
        if (!globalModel && !isLoading) {
          isLoading = true;
          const loader = new GLTFLoader();

          const gltf = await new Promise<any>((resolve, reject) => {
            loader.load("/avatar&animations.glb", resolve, undefined, reject);
          });

          if (!mountedRef.current) return;

          globalModel = gltf.scene;
          if (globalModel) {
            globalModel.scale.set(scale, scale, scale);
            globalModel.position.set(position[0], position[1], position[2]);
            globalScene!.add(globalModel);

            // Setup animation
            if (gltf.animations && gltf.animations.length > 0) {
              globalMixer = new THREE.AnimationMixer(globalModel);
              globalAnimationAction = globalMixer.clipAction(
                gltf.animations[0],
              );
              globalAnimationAction.setLoop(THREE.LoopOnce, 1);
              globalAnimationAction.clampWhenFinished = true;
              globalAnimationAction.timeScale = animationSpeed; // Set initial animation speed
              globalAnimationAction.play();
            }
          }

          isLoaded = true;
          isLoading = false;
          if (mountedRef.current) setLoading(false);
        } else if (isLoaded) {
          if (mountedRef.current) setLoading(false);
        }

        // Animation loop
        const clock = new THREE.Clock();
        const animate = () => {
          if (!mountedRef.current) return;

          animationFrameId = requestAnimationFrame(animate);

          if (globalMixer) {
            globalMixer.update(clock.getDelta());
          }

          if (globalRenderer && globalScene && globalCamera) {
            globalRenderer.render(globalScene, globalCamera);
          }
        };

        animate();

        // Handle resize
        const handleResize = () => {
          if (!container || !globalRenderer || !globalCamera) return;

          const width = container.clientWidth;
          const height = container.clientHeight;

          globalRenderer.setSize(width, height);
          globalCamera.aspect = width / height;
          globalCamera.updateProjectionMatrix();
        };

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);

          if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }

          // Remove canvas from this container but keep it alive
          if (globalCanvas && container.contains(globalCanvas)) {
            container.removeChild(globalCanvas);
          }
        };
      } catch (err) {
        console.error("Error loading avatar:", err);
        if (mountedRef.current) {
          setError("Failed to load avatar");
          setLoading(false);
        }
      }
    };

    initScene();

    return () => {
      // Don't set mountedRef here, it's handled by the other useEffect
    };
  }, [scale, position]);

  return (
    <div ref={containerRef} className="w-full h-full">
      {error && (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {loading && !error && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200/30 border-t-blue-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-sm text-gray-600 font-medium">
              Loading avatar...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
