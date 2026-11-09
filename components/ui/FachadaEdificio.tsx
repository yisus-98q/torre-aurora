"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { DEPARTAMENTOS } from "@/lib/departamentos";
import { FACHADA, rectoEnFachada } from "@/lib/fachada";
import { useEdificioStore } from "@/store/useEdificioStore";
import type { Departamento } from "@/types/depto";

const ESTADOS = { disponible: "Disponible", reservado: "Reservado", vendido: "Vendido" } as const;
const DURACION_ACERCAMIENTO = 1100;

export default function FachadaEdificio() {
  const enfocado = useEdificioStore((state) => state.enfocado);
  const escenaRef = useRef<HTMLDivElement>(null);
  const temporizador = useRef<number | undefined>(undefined);
  const [camara, setCamara] = useState<CSSProperties>();
  const deptoEnfocado = DEPARTAMENTOS.find((depto) => depto.id === enfocado);

  useEffect(() => () => window.clearTimeout(temporizador.current), []);

  const acercar = (depto: Departamento, boton: HTMLButtonElement) => {
    const escena = escenaRef.current;
    if (!escena || enfocado) return;

    const marco = escena.getBoundingClientRect();
    const unidad = boton.getBoundingClientRect();
    const centroX = unidad.left + unidad.width / 2 - marco.left;
    const centroY = unidad.top + unidad.height / 2 - marco.top;
    const escala = Math.min(
      4.2,
      Math.max(1.8, Math.min((marco.width * 0.78) / unidad.width, (marco.height * 0.55) / unidad.height)),
    );

    setCamara({
      transformOrigin: `${centroX}px ${centroY}px`,
      transform: `translate3d(${marco.width / 2 - centroX}px, ${marco.height / 2 - centroY}px, 0) scale(${escala})`,
    });
    useEdificioStore.getState().enfocar(depto.id);

    const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    temporizador.current = window.setTimeout(
      () => useEdificioStore.getState().seleccionar(depto.id),
      reducirMovimiento ? 0 : DURACION_ACERCAMIENTO,
    );
  };

  return (
    <div ref={escenaRef} className="facade-scene" data-fase={enfocado ? "enfocando" : "reposo"}>
      <div className="facade-camera" style={enfocado ? camara : undefined}>
        <div className="facade-stage">
          <Image
            src={FACHADA.src}
            alt="Fachada de Torre Aurora al anochecer, con seis pisos de dos departamentos cada uno"
            fill
            priority
            unoptimized
            className="facade-image"
          />
          {DEPARTAMENTOS.map((depto) => {
            const recto = rectoEnFachada(depto);

            return (
              <button
                key={depto.id}
                type="button"
                className="facade-unit"
                data-unidad={depto.id}
                data-estado={depto.estado}
                tabIndex={enfocado ? -1 : 0}
                style={{
                  left: `${recto.left}%`,
                  top: `${recto.top}%`,
                  width: `${recto.width}%`,
                  height: `${recto.height}%`,
                }}
                aria-label={`Departamento ${depto.numero}, piso ${depto.piso}, ${ESTADOS[depto.estado].toLowerCase()}. Acercar y recorrer sus ambientes.`}
                onClick={(event) => acercar(depto, event.currentTarget)}
              >
                <span className="facade-unit-dot" aria-hidden="true" />
                <span className="facade-unit-label" aria-hidden="true">
                  <strong>{depto.numero}</strong>
                  {ESTADOS[depto.estado]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="facade-vignette" aria-hidden="true" />
      <div className="facade-film" aria-hidden="true">
        <span className="facade-film-bar facade-film-top" />
        <span className="facade-film-bar facade-film-bottom">
          <span>{deptoEnfocado ? `Piso ${deptoEnfocado.piso} · Depto ${deptoEnfocado.numero}` : ""}</span>
        </span>
      </div>
    </div>
  );
}
