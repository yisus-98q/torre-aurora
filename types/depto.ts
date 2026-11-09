export type EstadoDepto = "disponible" | "reservado" | "vendido";
export type Orientacion = "frente" | "contrafrente" | "lateral";

export interface FotoDepto {
  url: string;
  alt: string;
  ambiente: string;
}

export interface Departamento {
  id: string;
  piso: number;
  numero: string;
  m2: number;
  m2Balcon?: number;
  dormitorios: number;
  banos: number;
  ambientes: number;
  balcon: boolean;
  cochera: boolean;
  orientacion: Orientacion;
  precio: number;
  moneda: "USD" | "PEN" | "ARS";
  expensas?: number;
  estado: EstadoDepto;
  descripcion: string;
  amenidades: string[];
  fotos: FotoDepto[];
  planoUrl?: string;
  destacado?: boolean;
}