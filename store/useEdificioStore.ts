import { create } from "zustand";
import { Departamento, EstadoDepto } from "@/types/depto";
import { DEPARTAMENTOS } from "@/lib/departamentos";

interface Filtros {
  precioMax: number;
  m2Min: number;
  dormitorios: number | null;
  estado: EstadoDepto | "todos";
}

interface EdificioState {
  seleccionado: string | null;
  hover: string | null;
  depto: Departamento | null;
  filtros: Filtros;
  seleccionar: (id: string | null) => void;
  setHover: (id: string | null) => void;
  setFiltros: (f: Partial<Filtros>) => void;
  resetFiltros: () => void;
  deptosFiltrados: () => Departamento[];
}

const FILTROS_INICIALES: Filtros = {
  precioMax: 500000,
  m2Min: 0,
  dormitorios: null,
  estado: "todos",
};

export const useEdificioStore = create<EdificioState>((set, get) => ({
  seleccionado: null,
  hover: null,
  depto: null,
  filtros: FILTROS_INICIALES,

  seleccionar: (id) => set({
    seleccionado: id,
    depto: id ? DEPARTAMENTOS.find(d => d.id === id) ?? null : null,
  }),

  setHover: (id) => set({ hover: id }),

  setFiltros: (f) => set({ filtros: { ...get().filtros, ...f } }),

  resetFiltros: () => set({ filtros: FILTROS_INICIALES }),

  deptosFiltrados: () => {
    const { filtros } = get();
    return DEPARTAMENTOS.filter(d => {
      if (d.precio > filtros.precioMax) return false;
      if (d.m2 < filtros.m2Min) return false;
      if (filtros.dormitorios && d.dormitorios !== filtros.dormitorios) return false;
      if (filtros.estado !== "todos" && d.estado !== filtros.estado) return false;
      return true;
    });
  },
}));