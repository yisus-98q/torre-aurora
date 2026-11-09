"use client";
import { useEdificioStore } from "@/store/useEdificioStore";

export default function HeroOverlay() {
  const seleccionado = useEdificioStore(s => s.seleccionado);
  if (seleccionado) return null;
  return (
    <div className="absolute top-24 left-6 sm:left-10 max-w-sm text-white pointer-events-none">
      <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
        Vivi la<br /><span className="text-[#d4a373]">experiencia</span><br />en 3D
      </h1>
      <p className="mt-4 text-white/60 text-sm sm:text-base">
        Hace click en cualquier departamento para conocer sus detalles.
      </p>
    </div>
  );
}