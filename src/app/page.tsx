import Header from "@/components/Header";
import ProjectGrid from "@/components/ProjectGrid";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ThreeBackgroundLoader from "@/components/ThreeBackgroundLoader";

export default function Home() {
  return (
    <main>
      <ThreeBackgroundLoader />
      <Header />
      <ProjectGrid />
      <Contact />
      <Footer />
    </main>
  );
}
