import dynamic from "next/dynamic";
import Footer from "@/components/ui/Footer";
import FeaturedUnits from "@/components/ui/FeaturedUnits";
import HeroOverlay from "@/components/ui/HeroOverlay";
import Navbar from "@/components/ui/Navbar";
import PanelDepto from "@/components/ui/PanelDepto";
import ProjectStory from "@/components/ui/ProjectStory";

const EscenaEdificio = dynamic(() => import("@/components/three/EscenaEdificio"), { ssr: false });

export default function HomePage() {
  return (
    <main id="main-content" className="home-page">
      <section id="inicio" className="home-hero" aria-labelledby="hero-title">
        <Navbar />
        <div className="hero-scene" role="region" aria-label="Modelo 3D interactivo de Torre Aurora; selecciona un departamento para ver sus detalles.">
          <EscenaEdificio />
        </div>
        <div className="hero-vignette" aria-hidden="true" />
        <HeroOverlay />
        <a className="hero-scroll" href="#proyecto">
          <span>Descubre Torre Aurora</span>
          <span className="hero-scroll-line" aria-hidden="true" />
        </a>
      </section>
      <ProjectStory />
      <FeaturedUnits />
      <Footer />
      <PanelDepto />
    </main>
  );
}
