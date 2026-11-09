"use client";
import { useEdificioStore } from "@/store/useEdificioStore";
import Link from "next/link";
import { Bed, Bath, Maximize, ArrowRight } from "lucide-react";

export default function DisponiblesPage() {
  const filtros = useEdificioStore(s => s.filtros);
  const setFiltros = useEdificioStore(s => s.setFiltros);
  const reset = useEdificioStore(s => s.resetFiltros);
  const deptos = useEdificioStore(s => s.deptosFiltrados)();

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-6 sm:p-12 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-sm text-white/60 hover:text-white">Volver al edificio</Link>
        <h1 className="text-4xl font-bold mt-4">Departamentos disponibles</h1>
        <p className="text-white/50 mt-2">{deptos.length} unidades</p>

        <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-1 sm:grid-cols-4 gap-4">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-white/50">Precio max</span>
            <input type="range" min={50000} max={500000} step={10000} value={filtros.precioMax} onChange={e => setFiltros({ precioMax: Number(e.target.value) })} />
            <span className="text-white/70 text-xs">{filtros.precioMax.toLocaleString()}</span>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-white/50">Dormitorios</span>
            <select value={filtros.dormitorios ?? ""} onChange={e => setFiltros({ dormitorios: e.target.value ? Number(e.target.value) : null })} className="bg-neutral-900 border border-white/10 rounded-lg px-3 py-2">
              <option value="">Todos</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-white/50">Estado</span>
            <select value={filtros.estado} onChange={e => setFiltros({ estado: e.target.value as any })} className="bg-neutral-900 border border-white/10 rounded-lg px-3 py-2">
              <option value="todos">Todos</option>
              <option value="disponible">Disponible</option>
              <option value="reservado">Reservado</option>
              <option value="vendido">Vendido</option>
            </select>
          </label>
          <button onClick={reset} className="self-end py-2 rounded-lg border border-white/20 hover:bg-white/5 text-sm">Limpiar</button>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deptos.map(d => (
            <Link key={d.id} href={`/departamento/${d.id}`} className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors">
              <div className="aspect-video bg-neutral-800 overflow-hidden">
                {d.fotos[0] && <img src={d.fotos[0].url} alt={d.fotos[0].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">Depto {d.numero}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    d.estado === "disponible" ? "bg-emerald-500/20 text-emerald-400" :
                    d.estado === "reservado" ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"
                  }`}>{d.estado}</span>
                </div>
                <div className="flex gap-3 mt-3 text-xs text-white/60">
                  <span className="flex items-center gap-1"><Maximize size={12} />{d.m2} m2</span>
                  <span className="flex items-center gap-1"><Bed size={12} />{d.dormitorios}</span>
                  <span className="flex items-center gap-1"><Bath size={12} />{d.banos}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="font-bold text-blue-400">{d.moneda} {d.precio.toLocaleString()}</p>
                  <ArrowRight size={16} className="text-white/40 group-hover:text-blue-400 transition" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}