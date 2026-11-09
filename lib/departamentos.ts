import { Departamento } from "@/types/depto";

const FOTOS_MODERNO = [
  { url: "/aurora-living.png", alt: "Living de departamento con luz natural", ambiente: "Living" },
  { url: "/aurora-kitchen.png", alt: "Cocina integrada con isla de piedra", ambiente: "Cocina" },
  { url: "/aurora-bedroom.png", alt: "Dormitorio principal de tonos cálidos", ambiente: "Dormitorio" },
  { url: "/aurora-bathroom.png", alt: "Baño contemporáneo con piedra natural", ambiente: "Baño" },
];

const FOTOS_CLASICO = [
  { url: "/aurora-living.png", alt: "Living de departamento con madera cálida", ambiente: "Living" },
  { url: "/aurora-kitchen.png", alt: "Cocina integrada con isla de piedra", ambiente: "Cocina" },
  { url: "/aurora-bedroom.png", alt: "Suite principal con luz natural", ambiente: "Dormitorio" },
  { url: "/aurora-bathroom.png", alt: "Baño en suite con piedra natural", ambiente: "Baño" },
];

export const DEPARTAMENTOS: Departamento[] = [
  { id: "101", piso: 1, numero: "101", m2: 78, dormitorios: 2, banos: 1, ambientes: 3, balcon: true, cochera: false, orientacion: "frente", precio: 95000, moneda: "USD", expensas: 120, estado: "disponible", descripcion: "Departamento de 3 ambientes con vista al jardin interior.", amenidades: ["Cocina equipada", "Piso de madera", "Balcon", "Aire acondicionado"], fotos: FOTOS_MODERNO, destacado: true },
  { id: "102", piso: 1, numero: "102", m2: 92, dormitorios: 3, banos: 2, ambientes: 4, balcon: true, cochera: true, orientacion: "frente", precio: 120000, moneda: "USD", expensas: 150, estado: "reservado", descripcion: "Amplio de 4 ambientes con doble balcon y cochera.", amenidades: ["Walk-in closet", "Bano en suite", "Cochera"], fotos: FOTOS_CLASICO },
  { id: "201", piso: 2, numero: "201", m2: 78, dormitorios: 2, banos: 1, ambientes: 3, balcon: true, cochera: false, orientacion: "frente", precio: 100000, moneda: "USD", expensas: 120, estado: "disponible", descripcion: "Unidad de 3 ambientes con balcon al frente.", amenidades: ["Cocina equipada", "Piso de madera", "Balcon"], fotos: FOTOS_CLASICO },
  { id: "202", piso: 2, numero: "202", m2: 92, dormitorios: 3, banos: 2, ambientes: 4, balcon: true, cochera: true, orientacion: "frente", precio: 125000, moneda: "USD", expensas: 150, estado: "disponible", descripcion: "Departamento de 4 ambientes con detalles de diseno.", amenidades: ["Walk-in closet", "Bano en suite", "Cochera"], fotos: FOTOS_MODERNO },
  { id: "301", piso: 3, numero: "301", m2: 78, dormitorios: 2, banos: 1, ambientes: 3, balcon: true, cochera: false, orientacion: "frente", precio: 105000, moneda: "USD", expensas: 120, estado: "disponible", descripcion: "3 ambientes con balcon y vista panoramica.", amenidades: ["Cocina equipada", "Piso de madera", "Balcon"], fotos: FOTOS_MODERNO },
  { id: "302", piso: 3, numero: "302", m2: 92, dormitorios: 3, banos: 2, ambientes: 4, balcon: true, cochera: true, orientacion: "frente", precio: 130000, moneda: "USD", expensas: 150, estado: "vendido", descripcion: "4 ambientes con doble balcon y cochera.", amenidades: ["Walk-in closet", "Bano en suite", "Cochera"], fotos: FOTOS_CLASICO },
  { id: "401", piso: 4, numero: "401", m2: 78, dormitorios: 2, banos: 1, ambientes: 3, balcon: true, cochera: false, orientacion: "frente", precio: 110000, moneda: "USD", expensas: 120, estado: "disponible", descripcion: "Unidad de 3 ambientes en piso alto. Mucha luz natural.", amenidades: ["Cocina equipada", "Piso de madera", "Balcon"], fotos: FOTOS_CLASICO },
  { id: "402", piso: 4, numero: "402", m2: 92, dormitorios: 3, banos: 2, ambientes: 4, balcon: true, cochera: true, orientacion: "frente", precio: 135000, moneda: "USD", expensas: 150, estado: "disponible", descripcion: "Amplio 4 ambientes con detalles unicos.", amenidades: ["Walk-in closet", "Bano en suite", "Cochera"], fotos: FOTOS_MODERNO },
  { id: "501", piso: 5, numero: "501", m2: 78, dormitorios: 2, banos: 1, ambientes: 3, balcon: true, cochera: false, orientacion: "frente", precio: 115000, moneda: "USD", expensas: 120, estado: "reservado", descripcion: "3 ambientes con balcon, en piso privilegiado.", amenidades: ["Cocina equipada", "Piso de madera", "Balcon"], fotos: FOTOS_MODERNO },
  { id: "502", piso: 5, numero: "502", m2: 92, dormitorios: 3, banos: 2, ambientes: 4, balcon: true, cochera: true, orientacion: "frente", precio: 140000, moneda: "USD", expensas: 150, estado: "disponible", descripcion: "4 ambientes con vista despejada.", amenidades: ["Walk-in closet", "Bano en suite", "Cochera"], fotos: FOTOS_CLASICO },
  { id: "601", piso: 6, numero: "601", m2: 85, dormitorios: 3, banos: 2, ambientes: 4, balcon: true, cochera: true, orientacion: "frente", precio: 180000, moneda: "USD", expensas: 180, estado: "disponible", descripcion: "Ultimo piso! Departamento con terraza propia.", amenidades: ["Terraza exclusiva", "Parrilla", "Bano en suite", "Cochera doble"], fotos: FOTOS_MODERNO, destacado: true },
  { id: "602", piso: 6, numero: "602", m2: 110, dormitorios: 4, banos: 3, ambientes: 5, balcon: true, cochera: true, orientacion: "frente", precio: 210000, moneda: "USD", expensas: 200, estado: "disponible", descripcion: "Penthouse exclusivo con terraza y parrilla.", amenidades: ["Terraza exclusiva", "Parrilla", "Suite principal", "Cochera doble"], fotos: FOTOS_CLASICO, destacado: true },
];

export function getDepto(id: string): Departamento | undefined {
  return DEPARTAMENTOS.find(d => d.id === id);
}
