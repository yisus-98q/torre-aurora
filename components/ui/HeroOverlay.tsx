"use client";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useEdificioStore } from "@/store/useEdificioStore";

export default function HeroOverlay() {
  const activo = useEdificioStore((state) => Boolean(state.seleccionado || state.enfocado));
  if (activo) return null;

  return (
    <div className="hero-copy absolute text-white">
      <p className="eyebrow hero-eyebrow">Residencias · Torre Aurora</p>
      <h1 id="hero-title">
        Tu próximo hogar<br />
        <em>comienza aquí.</em>
      </h1>
      <p className="hero-description">
        Toca cualquier departamento de la fachada para acercarte y recorrer sus ambientes.
      </p>
      <div className="hero-actions">
        <Link className="btn-primary" href="/disponibles">
          Ver disponibilidad <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <a className="btn-text" href="#proyecto">
          Conocer el proyecto <ArrowDownRight size={16} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
