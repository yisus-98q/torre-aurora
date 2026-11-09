"use client";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type PointerEvent } from "react";
import type { FotoDepto } from "@/types/depto";

const limitar = (valor: number, minimo = -1, maximo = 1) => Math.min(maximo, Math.max(minimo, valor));
const PAUSA_AUTOMATICA = 2200;

export default function VisorAmbiente({ foto, indice }: { foto: FotoDepto; indice: number }) {
  const reducirMovimiento = useReducedMotion();
  const raizRef = useRef<HTMLDivElement>(null);
  const objetivo = useRef({ x: 0, y: 0 });
  const arrastre = useRef<{ x: number; y: number; origenX: number; origenY: number } | null>(null);
  const ultimaInteraccion = useRef(0);

  useEffect(() => {
    const raiz = raizRef.current;
    if (!raiz) return;

    const actual = { x: 0, y: 0 };
    let cuadro = 0;

    const animar = (tiempo: number) => {
      if (!arrastre.current && !reducirMovimiento && tiempo - ultimaInteraccion.current > PAUSA_AUTOMATICA) {
        objetivo.current.x = Math.sin(tiempo / 5200) * 0.8;
        objetivo.current.y = Math.sin(tiempo / 7300) * 0.3;
      }

      const anteriorX = actual.x;
      actual.x += (objetivo.current.x - actual.x) * 0.07;
      actual.y += (objetivo.current.y - actual.y) * 0.07;
      const giro = limitar((actual.x - anteriorX) * 90, -2.5, 2.5);

      raiz.querySelectorAll<HTMLElement>("[data-capa='fondo']").forEach((capa) => {
        capa.style.transform = `perspective(1400px) rotateY(${-giro}deg) translate3d(${-actual.x * 11}%, ${-actual.y * 7}%, 0) scale(1.3)`;
      });
      raiz.querySelectorAll<HTMLElement>("[data-capa='frente']").forEach((capa) => {
        capa.style.transform = `translate3d(${-actual.x * 19}%, ${-actual.y * 12}%, 0) scale(1.55)`;
      });

      cuadro = requestAnimationFrame(animar);
    };

    cuadro = requestAnimationFrame(animar);
    return () => cancelAnimationFrame(cuadro);
  }, [reducirMovimiento]);

  const iniciarArrastre = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    arrastre.current = {
      x: event.clientX,
      y: event.clientY,
      origenX: objetivo.current.x,
      origenY: objetivo.current.y,
    };
  };

  const moverArrastre = (event: PointerEvent<HTMLDivElement>) => {
    const inicio = arrastre.current;
    if (!inicio) return;
    const marco = event.currentTarget.getBoundingClientRect();
    objetivo.current.x = limitar(inicio.origenX - ((event.clientX - inicio.x) / marco.width) * 2.4);
    objetivo.current.y = limitar(inicio.origenY - ((event.clientY - inicio.y) / marco.height) * 2);
    ultimaInteraccion.current = performance.now();
  };

  const terminarArrastre = () => {
    arrastre.current = null;
    ultimaInteraccion.current = performance.now();
  };

  return (
    <div
      ref={raizRef}
      className="room-viewer"
      onPointerDown={iniciarArrastre}
      onPointerMove={moverArrastre}
      onPointerUp={terminarArrastre}
      onPointerCancel={terminarArrastre}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={indice}
          className="room-frame"
          initial={reducirMovimiento ? { opacity: 0 } : { opacity: 0, scale: 1.16, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={reducirMovimiento ? { opacity: 0 } : { opacity: 0, scale: 1.5, filter: "blur(14px)" }}
          transition={{ duration: 0.95, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="room-layer" data-capa="fondo">
            <Image src={foto.url} alt={foto.alt} fill priority unoptimized sizes="100vw" className="room-image" draggable={false} />
          </div>
          <div className="room-layer room-layer-front" data-capa="frente" aria-hidden="true">
            <Image src={foto.url} alt="" fill unoptimized sizes="100vw" className="room-image" draggable={false} />
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="room-viewfinder" aria-hidden="true" />
    </div>
  );
}
