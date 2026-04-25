import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

const BASE_URL = "https://ajsamudio.github.io/WebPortfolio";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "AJ Samudio — Full-Stack Developer & Creative Technologist",
    template: "%s | AJ Samudio",
  },
  description:
    "AJ Samudio — Full-Stack Developer & Creative Technologist based in Los Angeles. Building web apps, e-commerce platforms, and digital experiences. Available for full-time and freelance.",
  keywords: [
    "AJ Samudio",
    "full-stack developer",
    "web developer Los Angeles",
    "creative technologist",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "e-commerce development",
    "freelance web developer",
    "portfolio",
  ],
  authors: [{ name: "AJ Samudio", url: BASE_URL }],
  creator: "AJ Samudio",
  publisher: "AJ Samudio",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "AJ Samudio Portfolio",
    title: "AJ Samudio — Full-Stack Developer & Creative Technologist",
    description:
      "Full-Stack Developer & Creative Technologist based in Los Angeles. Building web apps, e-commerce platforms, and digital experiences.",
    images: [
      {
        url: "/images/pfp.webp",
        width: 300,
        height: 300,
        alt: "AJ Samudio — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AJ Samudio — Full-Stack Developer & Creative Technologist",
    description:
      "Full-Stack Developer & Creative Technologist based in Los Angeles. Building web apps, e-commerce platforms, and digital experiences.",
    images: ["/images/pfp.webp"],
    creator: "@ajsamudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "AJ Samudio",
  url: BASE_URL,
  jobTitle: "Full-Stack Developer & Creative Technologist",
  description:
    "Full-Stack Developer & Creative Technologist based in Los Angeles specializing in web apps, e-commerce, and digital experiences.",
  address: { "@type": "PostalAddress", addressLocality: "Los Angeles", addressRegion: "CA", addressCountry: "US" },
  sameAs: [
    "https://www.linkedin.com/in/antonio-samudio/",
    "https://github.com/ajsamudio",
  ],
  knowsAbout: ["React", "Next.js", "TypeScript", "JavaScript", "Python", "Supabase", "Vercel", "Three.js", "Adobe Suite"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#projects" className="skip-link">
          Skip to projects
        </a>
        {children}
      </body>
    </html>
  );
}
