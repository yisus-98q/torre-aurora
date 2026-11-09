import type { Departamento } from "@/types/depto";

export const FACHADA = {
  src: "/aurora-fachada.png",
  ancho: 1376,
  alto: 768,
};

// Percentages measured on aurora-fachada.png: floor 6 starts at 14.3% and each floor is 10.42% tall.
const INICIO_PISO_SUPERIOR = 14.3;
const ALTO_PISO = 10.42;
const TOTAL_PISOS = 6;
const COLUMNAS = [
  [50.4, 67.7],
  [68.2, 85.1],
] as const;

export function rectoEnFachada(depto: Departamento) {
  const [izquierda, derecha] = COLUMNAS[depto.numero.endsWith("1") ? 0 : 1];
  const arriba = INICIO_PISO_SUPERIOR + (TOTAL_PISOS - depto.piso) * ALTO_PISO;

  return {
    left: izquierda,
    top: arriba + 0.6,
    width: derecha - izquierda,
    height: ALTO_PISO - 1.2,
  };
}
