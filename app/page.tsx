import dynamic from "next/dynamic";
import Navbar from "@/components/ui/Navbar";
import HeroOverlay from "@/components/ui/HeroOverlay";
import PanelDepto from "@/components/ui/PanelDepto";
import Footer from "@/components/ui/Footer";

const EscenaEdificio = dynamic(() => import("@/components/three/EscenaEdificio"), { ssr: false });

export default function HomePage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#0a0a0f]">
      <Navbar />
      <div className="absolute inset-0">
        <EscenaEdificio />
      </div>
      <HeroOverlay />
      <PanelDepto />
      <Footer />
    </main>
  );
}