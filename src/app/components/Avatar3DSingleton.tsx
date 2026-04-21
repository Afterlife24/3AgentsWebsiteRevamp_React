"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Global singleton state — persists across component mounts/unmounts
let globalCanvas: HTMLCanvasElement | null = null;
let globalRenderer: THREE.WebGLRenderer | null = null;
let globalScene: THREE.Scene | null = null;
let globalCamera: THREE.PerspectiveCamera | null = null;
let globalModel: THREE.Group | null = null;
let globalMixer: THREE.AnimationMixer | null = null;
let globalAnimationAction: THREE.AnimationAction | null = null;
let animationFrameId: number | null = null;
let loadPromise: Promise<void> | null = null;
let loadError: string | null = null;

// Callbacks for components waiting on load
const loadCallbacks: Set<() => void> = new Set();

function notifyLoaded() {
  loadCallbacks.forEach((cb) => cb());
}

async function ensureModelLoaded(): Promise<void> {
  // Already loaded
  if (globalModel) return;

  // Already loading — wait for it
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    try {
      const loader = new GLTFLoader();
      const gltf = await new Promise<any>((resolve, reject) => {
        loader.load("/avatar&animations.glb", resolve, undefined, reject);
      });

      globalModel = gltf.scene;
      if (globalModel && globalScene) {
        globalModel.scale.set(1.2, 1.2, 1.2);
        globalModel.position.set(0, -1.15, 0);
        globalScene.add(globalModel);

        if (gltf.animations && gltf.animations.length > 0) {
          globalMixer = new THREE.AnimationMixer(globalModel);
          globalAnimationAction = globalMixer.clipAction(gltf.animations[0]);
          globalAnimationAction.setLoop(THREE.LoopOnce, 1);
          globalAnimationAction.clampWhenFinished = true;
          globalAnimationAction.play();
        }
      }
      notifyLoaded();
    } catch (err) {
      console.error("Error loading avatar:", err);
      loadError = "Failed to load avatar";
      loadPromise = null;
      notifyLoaded();
    }
  })();

  return loadPromise;
}

function ensureRenderer() {
  if (!globalCanvas) {
    globalCanvas = document.createElement("canvas");
    globalCanvas.style.width = "100%";
    globalCanvas.style.height = "100%";
    globalCanvas.style.display = "block";
  }

  if (!globalRenderer) {
    globalRenderer = new THREE.WebGLRenderer({
      canvas: globalCanvas,
      antialias: true,
      alpha: true,
    });
    globalRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    globalRenderer.setClearColor(0x000000, 0);
  }

  if (!globalScene) {
    globalScene = new THREE.Scene();
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    globalScene.add(ambientLight);
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2);
    dirLight1.position.set(5, 5, 5);
    globalScene.add(dirLight1);
    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight2.position.set(-5, 3, -5);
    globalScene.add(dirLight2);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 5, 0);
    globalScene.add(pointLight);
  }

  if (!globalCamera) {
    globalCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    globalCamera.position.set(0, 0, 3.5);
  }
}

interface Avatar3DSingletonProps {
  scale?: number;
  position?: [number, number, number];
  playAnimation?: boolean;
  animationSpeed?: number;
}

export default function Avatar3DSingleton({
  scale = 1.2,
  position = [0, -1.15, 0],
  playAnimation = true,
  animationSpeed = 0.7,
}: Avatar3DSingletonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(!!globalModel);
  const [error, setError] = useState<string | null>(loadError);

  // Register for load notification
  useEffect(() => {
    if (globalModel) {
      setLoaded(true);
      return;
    }
    if (loadError) {
      setError(loadError);
      return;
    }

    const cb = () => {
      if (globalModel) setLoaded(true);
      if (loadError) setError(loadError);
    };
    loadCallbacks.add(cb);
    return () => { loadCallbacks.delete(cb); };
  }, []);

  // Replay animation when playAnimation prop changes
  useEffect(() => {
    if (playAnimation && globalAnimationAction && globalMixer) {
      globalAnimationAction.reset();
      globalAnimationAction.timeScale = animationSpeed;
      globalAnimationAction.play();
    }
  }, [playAnimation, animationSpeed]);

  // Update model transform when scale/position change
  useEffect(() => {
    if (globalModel) {
      globalModel.scale.set(scale, scale, scale);
      globalModel.position.set(position[0], position[1], position[2]);
    }
  }, [scale, position]);

  // Attach canvas, start render loop, load model
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    ensureRenderer();

    // Attach canvas to this container
    if (globalCanvas && !container.contains(globalCanvas)) {
      container.appendChild(globalCanvas);
    }

    // Size the renderer to the container
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (globalRenderer && width > 0 && height > 0) {
      globalRenderer.setSize(width, height);
    }
    if (globalCamera) {
      globalCamera.aspect = width / height || 1;
      globalCamera.updateProjectionMatrix();
    }

    // Start loading model (no-op if already loaded/loading)
    ensureModelLoaded();

    // Animation loop
    const clock = new THREE.Clock();
    let running = true;

    const animate = () => {
      if (!running) return;
      animationFrameId = requestAnimationFrame(animate);

      if (globalMixer) {
        globalMixer.update(clock.getDelta());
      }
      if (globalRenderer && globalScene && globalCamera) {
        globalRenderer.render(globalScene, globalCamera);
      }
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!container || !globalRenderer || !globalCamera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        globalRenderer.setSize(w, h);
        globalCamera.aspect = w / h;
        globalCamera.updateProjectionMatrix();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      running = false;
      window.removeEventListener("resize", handleResize);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      // Detach canvas but keep it alive for reuse
      if (globalCanvas && container.contains(globalCanvas)) {
        container.removeChild(globalCanvas);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      {error && (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      {!loaded && !error && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-200/30 border-t-blue-400"></div>
        </div>
      )}
    </div>
  );
}
