"use client";

import { useState, useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/projects";
import type { ProjectCategory } from "@/lib/types";

type FilterValue = "all" | ProjectCategory;

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: "All", value: "all" },
  { label: "Web Development", value: "web" },
  { label: "Graphic Design", value: "design" },
  { label: "Video Editing", value: "video" },
];

export default function ProjectGrid() {
  const [active, setActive] = useState<FilterValue>("all");
  const gridRef = useRef<HTMLDivElement>(null);

  const visible = projects.filter((p) => active === "all" || p.category === active);

  // Intersection observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = gridRef.current?.querySelectorAll(".reveal");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [active]);

  return (
    <section className="projects-section" id="projects" aria-label="Portfolio projects">
      <div className="container">
        <h2 className="section-title fade-in">Projects</h2>

        <nav className="filter-buttons" aria-label="Filter projects by category">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`filter-btn${active === f.value ? " active" : ""}`}
              onClick={() => setActive(f.value)}
              aria-pressed={active === f.value}
            >
              {f.label}
            </button>
          ))}
        </nav>

        <div className="projects-grid" ref={gridRef} role="list">
          {visible.map((project) => (
            <div key={project.id} role="listitem">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
