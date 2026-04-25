export type ProjectCategory = "web" | "design" | "video";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  image: string;
  imageAlt: string;
  link: string;
  linkLabel?: string;
  /** For video projects — rendered as <video> instead of <img> */
  videoSrc?: string;
  videoPoster?: string;
}

export interface TechPill {
  label: string;
}
