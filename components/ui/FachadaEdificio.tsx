"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { DEPARTAMENTOS } from "@/lib/departamentos";
import { FACHADA, rectoEnFachada } from "@/lib/fachada";
import { useEdificioStore } from "@/store/useEdificioStore";
import type { Departamento } from "@/types/depto";

const ESTADOS = { disponible: "Disponible", reservado: "Reservado", vendido: "Vendido" } as const;
const INICIO_ENTRADA = 1900;
const APERTURA_VISOR = 2550;

type Camara = { origen: string; desplazamiento: string; escala: number };
type Fase = "enfocando" | "entrando";

export default function FachadaEdificio() {
  const enfocado = useEdificioStore((state) => state.enfocado);
  const escenaRef = useRef<HTMLDivElement>(null);
  const temporizadores = useRef<number[]>([]);
  const [camara, setCamara] = useState<Camara>();
  const [fase, setFase] = useState<Fase>("enfocando");
  const deptoEnfocado = DEPARTAMENTOS.find((depto) => depto.id === enfocado);
  const faseActual = enfocado ? fase : "reposo";

  useEffect(() => () => temporizadores.current.forEach((id) => window.clearTimeout(id)), []);

  const estiloCamara: CSSProperties | undefined =
    enfocado && camara
      ? {
          transformOrigin: camara.origen,
          transform: `${camara.desplazamiento} scale(${fase === "entrando" ? camara.escala * 1.9 : camara.escala})`,
        }
      : undefined;

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
      origen: `${centroX}px ${centroY}px`,
      desplazamiento: `translate3d(${marco.width / 2 - centroX}px, ${marco.height / 2 - centroY}px, 0)`,
      escala,
    });
    setFase("enfocando");
    useEdificioStore.getState().enfocar(depto.id);

    const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const abrir = () => useEdificioStore.getState().seleccionar(depto.id);
    temporizadores.current.forEach((id) => window.clearTimeout(id));
    temporizadores.current = reducirMovimiento
      ? [window.setTimeout(abrir, 0)]
      : [window.setTimeout(() => setFase("entrando"), INICIO_ENTRADA), window.setTimeout(abrir, APERTURA_VISOR)];
  };

  return (
    <div ref={escenaRef} className="facade-scene" data-fase={faseActual}>
      <div className="facade-camera" style={estiloCamara}>
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
                data-activo={depto.id === enfocado}
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
                <span className="facade-unit-light" aria-hidden="true" />
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
        <span className="facade-flash" />
        <span className="facade-film-bar facade-film-top" />
        <span className="facade-film-bar facade-film-bottom">
          <span>{deptoEnfocado ? `Piso ${deptoEnfocado.piso} · Depto ${deptoEnfocado.numero}` : ""}</span>
        </span>
      </div>
    </div>
  );
}
