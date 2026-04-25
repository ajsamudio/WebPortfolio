"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Project } from "@/lib/types";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoToggle = () => {
    const v = videoRef.current;
    if (!v) return;
    v.paused ? v.play() : v.pause();
  };

  const isExternal = project.link.startsWith("http");
  const linkProps = isExternal
    ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
    : { href: project.link };

  return (
    <article
      className="project-card reveal"
      data-category={project.category}
      aria-label={`${project.title} project`}
    >
      <div className="project-image-wrapper">
        {project.videoSrc ? (
          <video
            ref={videoRef}
            className="project-video js-video"
            poster={project.videoPoster}
            loop
            muted
            playsInline
            onClick={handleVideoToggle}
            aria-label={`${project.title} video preview, click to play`}
          >
            <source src={project.videoSrc} type="video/mp4" />
          </video>
        ) : project.videoPoster && !project.videoSrc ? (
          <Image
            src={project.videoPoster}
            alt={project.imageAlt}
            width={600}
            height={220}
            className="project-img"
            loading="lazy"
          />
        ) : (
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={600}
            height={220}
            className="project-img"
            loading="lazy"
          />
        )}
        <div className="project-overlay" aria-hidden="true" />
      </div>

      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        {project.link !== "#" && (
          <a {...linkProps} className="project-link" aria-label={`View ${project.title} live site`}>
            View Project →
          </a>
        )}
      </div>
    </article>
  );
}
