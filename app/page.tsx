import FachadaEdificio from "@/components/ui/FachadaEdificio";
import Footer from "@/components/ui/Footer";
import FeaturedUnits from "@/components/ui/FeaturedUnits";
import HeroOverlay from "@/components/ui/HeroOverlay";
import Navbar from "@/components/ui/Navbar";
import ProjectStory from "@/components/ui/ProjectStory";
import VisorDepto from "@/components/ui/VisorDepto";

export default function HomePage() {
  return (
    <main id="main-content" className="home-page">
      <section id="inicio" className="home-hero" aria-labelledby="hero-title">
        <Navbar />
        <div className="hero-scene" role="region" aria-label="Fachada interactiva de Torre Aurora; selecciona un departamento para recorrerlo.">
          <FachadaEdificio />
        </div>
        <HeroOverlay />
        <a className="hero-scroll" href="#proyecto">
          <span>Descubre Torre Aurora</span>
          <span className="hero-scroll-line" aria-hidden="true" />
        </a>
      </section>
      <ProjectStory />
      <FeaturedUnits />
      <Footer />
      <VisorDepto />
    </main>
  );
}
