"use client";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import gsap from "gsap";
import { useEdificioStore } from "@/store/useEdificioStore";
import { DEPARTAMENTOS } from "@/lib/departamentos";

const VISTA_GENERAL = { x: 0, y: 14, z: 34 };
const ALTO_PISO = 3.2;
const ANCHO_DEPTO = 8;

export default function CamaraControlada() {
  const { camera } = useThree();
  const seleccionado = useEdificioStore(s => s.seleccionado);

  useEffect(() => {
    const d = seleccionado ? DEPARTAMENTOS.find(x => x.id === seleccionado) : null;
    if (!d) {
      gsap.to(camera.position, { ...VISTA_GENERAL, duration: 1.2, ease: "power2.inOut" });
      return;
    }
    const esDerecha = d.id.endsWith("02");
    const pisoIdx = d.piso - 1;
    gsap.to(camera.position, {
      x: esDerecha ? ANCHO_DEPTO * 0.8 : -ANCHO_DEPTO * 0.8,
      y: 8 + pisoIdx * ALTO_PISO,
      z: 22,
      duration: 1.2,
      ease: "power2.inOut",
    });
  }, [seleccionado, camera]);

  return null;
}