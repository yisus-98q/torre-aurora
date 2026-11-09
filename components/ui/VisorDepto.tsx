"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Bath, BedDouble, Car, ChevronLeft, ChevronRight, Maximize2, MessageCircle, Move, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import VisorAmbiente from "./VisorAmbiente";
import { useEdificioStore } from "@/store/useEdificioStore";
import type { Departamento } from "@/types/depto";

const ESTADOS = { disponible: "Disponible", reservado: "Reservado", vendido: "Vendido" } as const;

export default function VisorDepto() {
  const depto = useEdificioStore((state) => state.depto);
  if (!depto) return null;
  return <VisorAbierto key={depto.id} depto={depto} />;
}

function VisorAbierto({ depto }: { depto: Departamento }) {
  const [indice, setIndice] = useState(0);
  const reducirMovimiento = useReducedMotion();
  const cerrarRef = useRef<HTMLButtonElement>(null);
  const total = depto.fotos.length;
  const foto = depto.fotos[indice];

  const cerrar = useCallback(() => {
    const store = useEdificioStore.getState();
    store.seleccionar(null);
    store.enfocar(null);
  }, []);

  const mover = useCallback((paso: number) => {
    if (total > 0) setIndice((actual) => (actual + paso + total) % total);
  }, [total]);

  useEffect(() => {
    const anterior = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cerrarRef.current?.focus();

    const alPresionar = (event: KeyboardEvent) => {
      if (event.key === "Escape") cerrar();
      if (event.key === "ArrowRight") mover(1);
      if (event.key === "ArrowLeft") mover(-1);
    };

    window.addEventListener("keydown", alPresionar);
    return () => {
      window.removeEventListener("keydown", alPresionar);
      document.body.style.overflow = overflow;
      anterior?.focus();
    };
  }, [cerrar, mover]);

  return (
    <motion.div
      className="unit-viewer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="unit-viewer-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <button ref={cerrarRef} type="button" className="unit-viewer-close" onClick={cerrar} aria-label="Cerrar y volver a la fachada">
        <X size={18} aria-hidden="true" />
      </button>

      <div className="unit-viewer-stage">
        <motion.div
          className="unit-viewer-entry"
          initial={reducirMovimiento ? false : { scale: 1.22, filter: "blur(10px) brightness(1.5)" }}
          animate={{ scale: 1, filter: "blur(0px) brightness(1)" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {foto && <VisorAmbiente foto={foto} indice={indice} />}
        </motion.div>
        <motion.div
          className="unit-viewer-glow"
          aria-hidden="true"
          initial={{ opacity: reducirMovimiento ? 0 : 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
        />

        <div className="unit-viewer-hud">
          <p className="eyebrow">Piso {depto.piso} · Depto {depto.numero}</p>
          <p className="unit-viewer-room" aria-live="polite">
            <span>{String(indice + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            {foto?.ambiente}
          </p>
        </div>

        <p className="unit-viewer-hint">
          <Move size={14} aria-hidden="true" /> Arrastra para mirar alrededor
        </p>

        {total > 1 && (
          <>
            <button type="button" className="unit-viewer-arrow unit-viewer-prev" onClick={() => mover(-1)} aria-label="Ambiente anterior">
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button type="button" className="unit-viewer-arrow unit-viewer-next" onClick={() => mover(1)} aria-label="Ambiente siguiente">
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </>
        )}

        <div className="unit-viewer-rooms" role="group" aria-label="Ambientes del departamento">
          {depto.fotos.map((ambiente, posicion) => (
            <button
              key={`${ambiente.ambiente}-${posicion}`}
              type="button"
              className="room-tab"
              aria-pressed={posicion === indice}
              onClick={() => setIndice(posicion)}
            >
              <Image src={ambiente.url} alt="" width={88} height={88} unoptimized />
              <span>{ambiente.ambiente}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.aside
        className="unit-viewer-info"
        initial={reducirMovimiento ? false : { opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="unit-badge" data-estado={depto.estado}>{ESTADOS[depto.estado]}</span>
        <h2 id="unit-viewer-title">Departamento {depto.numero}</h2>
        <p className="unit-viewer-meta">Piso {depto.piso} · {depto.ambientes} ambientes · Orientación {depto.orientacion}</p>

        <dl className="unit-stats">
          <div><dt><Maximize2 size={15} aria-hidden="true" /> Superficie</dt><dd>{depto.m2} m²</dd></div>
          <div><dt><BedDouble size={15} aria-hidden="true" /> Dormitorios</dt><dd>{depto.dormitorios}</dd></div>
          <div><dt><Bath size={15} aria-hidden="true" /> Baños</dt><dd>{depto.banos}</dd></div>
          <div><dt><Car size={15} aria-hidden="true" /> Cochera</dt><dd>{depto.cochera ? "Sí" : "No"}</dd></div>
        </dl>

        <p className="unit-desc">{depto.descripcion}</p>

        <div className="unit-price">
          <p>Valor de venta</p>
          <p><span>{depto.moneda}</span> {depto.precio.toLocaleString("es-AR")}</p>
        </div>

        <div className="unit-actions">
          <a
            className="unit-whatsapp"
            href={`https://wa.me/5491100000000?text=${encodeURIComponent(`Hola, me interesa el depto ${depto.numero} de Torre Aurora.`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={17} aria-hidden="true" /> Consultar por WhatsApp
          </a>
          <Link className="btn-outline" href={`/departamento/${depto.id}`}>
            Ficha completa <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </motion.aside>
    </motion.div>
  );
}
