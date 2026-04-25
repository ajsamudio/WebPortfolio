"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { techPills } from "@/lib/projects";

export default function Header() {
  const typewriterRef = useRef<HTMLParagraphElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    const text =
      "Fullstack developer with a B.S. degree, building web apps with React, TypeScript, and JavaScript. Based in Orange County, CA — seeking junior roles in Software Engineering, AI Development, Web Development, or QA.";
    const el = typewriterRef.current;
    if (!el) return;

    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        el.textContent = text.slice(0, i + 1);
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 3D tilt effect on profile image
  useEffect(() => {
    const container = profileRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = (-y / rect.height) * 10;
      const rotY = (x / rect.width) * 10;
      container.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.05)`;
    };
    const onLeave = () => {
      container.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <header className="header" id="home">
      <div className="header-content">
        <div className="profile-image-container" ref={profileRef}>
          <div className="profile-image-inner">
            <Image
              src="/images/pfp.webp"
              alt="AJ Samudio — Full-Stack Developer & Creative Technologist based in Los Angeles"
              fill
              sizes="300px"
              className="profile-image"
              priority
              fetchPriority="high"
            />
          </div>
        </div>

        <h1 className="name gradient-text">AJ Samudio</h1>
        <p className="title">Full-Stack Developer &amp; Creative Technologist</p>
        <p className="typewriter" id="typewriter" ref={typewriterRef} aria-label="About AJ Samudio" />

        <div className="tech-pills" role="list" aria-label="Tech stack">
          {techPills.map((pill) => (
            <span key={pill.label} className="tech-pill" role="listitem">
              {pill.label}
            </span>
          ))}
        </div>

        <a href="#contact" className="btn-primary">
          Get in Touch
        </a>
      </div>
    </header>
  );
}
