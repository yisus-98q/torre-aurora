"use client";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useEdificioStore } from "@/store/useEdificioStore";

export default function HeroOverlay() {
  const seleccionado = useEdificioStore((state) => state.seleccionado);
  if (seleccionado) return null;

  return (
    <div className="hero-copy absolute text-white">
      <p className="eyebrow hero-eyebrow">Residencias · Torre Aurora</p>
      <h1 id="hero-title">
        Tu próximo hogar<br />
        <em>comienza aquí.</em>
      </h1>
      <p className="hero-description">
        Recorre el edificio en 3D, descubre cada tipología y encuentra la que se siente tuya.
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
