"use client";

import { useEffect, useRef } from "react";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let animationId: number;
    let renderer: import("three").WebGLRenderer;

    (async () => {
      const THREE = await import("three");

      const canvas = canvasRef.current;
      if (!canvas) return;

      const isMobile = window.innerWidth <= 768;
      const PARTICLE_COUNT = isMobile ? 500 : 1000;

      // Renderer
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x0a0a0a);

      // Scene & camera
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
      camera.position.z = 500;

      // Lights
      scene.add(new THREE.AmbientLight(0x404040));
      const dirLight = new THREE.DirectionalLight(0xffffff);
      dirLight.position.set(1, 1, 1);
      scene.add(dirLight);

      // Particles
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const colors = new Float32Array(PARTICLE_COUNT * 3);
      const cyan = new THREE.Color("#00f2ea");
      const pink = new THREE.Color("#ff0050");

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 1000;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;
        const c = Math.random() > 0.5 ? cyan : pink;
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // Mouse tracking
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const onMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX - window.innerWidth / 2;
        mouseY = e.clientY - window.innerHeight / 2;
      };
      const onTouch = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          mouseX = e.touches[0].clientX - window.innerWidth / 2;
          mouseY = e.touches[0].clientY - window.innerHeight / 2;
        }
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("touchstart", onTouch, { passive: true });
      window.addEventListener("touchmove", onTouch, { passive: true });

      // Resize
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      // Animation loop
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;
        targetX += (mouseX * 0.05 - targetX) * 0.05;
        targetY += (-mouseY * 0.05 - targetY) * 0.05;
        camera.position.x = targetX;
        camera.position.y = targetY;
        renderer.render(scene, camera);
      };

      const onVisibility = () => {
        if (document.hidden) cancelAnimationFrame(animationId);
        else animate();
      };
      document.addEventListener("visibilitychange", onVisibility);

      animate();

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("touchstart", onTouch);
        window.removeEventListener("touchmove", onTouch);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);
        cancelAnimationFrame(animationId);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
      };
    })();

    return () => {
      cancelAnimationFrame(animationId);
      renderer?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="three-background"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        display: "block",
      }}
    />
  );
}
