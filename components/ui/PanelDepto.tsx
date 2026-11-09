"use client";
import { useEdificioStore } from "@/store/useEdificioStore";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Bed, Bath, Maximize, Car, ArrowRight, MessageCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import GaleriaFotos from "./GaleriaFotos";

export default function PanelDepto() {
  const depto = useEdificioStore(s => s.depto);
  const cerrar = () => useEdificioStore.getState().seleccionar(null);
  const [galeriaAbierta, setGaleriaAbierta] = useState(false);

  if (!depto) return null;

  const estadoColor = {
    disponible: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    reservado: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    vendido: "bg-red-500/20 text-red-400 border border-red-500/30",
  }[depto.estado];

  return (
    <>
      <AnimatePresence>
        <motion.aside
          key={depto.id}
          initial={{ x: 450, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 450, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="fixed right-0 top-0 h-full w-full sm:w-[420px] z-50 bg-[#111]/95 backdrop-blur-xl border-l border-white/10 text-white overflow-y-auto shadow-2xl"
        >
          <div className="relative h-72 bg-neutral-900">
            {depto.fotos[0] && (
              <img src={depto.fotos[0].url} alt={depto.fotos[0].alt} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-80" />
            <button onClick={cerrar} className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur hover:bg-black/90 transition z-10">
              <X size={18} />
            </button>
            <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${estadoColor}`}>
              {depto.estado.toUpperCase()}
            </span>
            {depto.fotos.length > 0 && (
              <button
                onClick={() => setGaleriaAbierta(true)}
                className="absolute bottom-4 right-4 px-4 py-2 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-sm flex items-center gap-2 hover:bg-white/20 transition"
              >
                <ImageIcon size={16} /> Ver {depto.fotos.length} fotos
              </button>
            )}
          </div>
          <div className="p-6 relative -mt-8">
            <p className="text-xs font-semibold tracking-widest text-[#d4a373]">
              PISO {depto.piso} - {depto.orientacion.toUpperCase()}
            </p>
            <h2 className="text-3xl font-bold mt-1">Depto {depto.numero}</h2>
            <div className="grid grid-cols-4 gap-2 mt-6">
              <Stat icon={<Maximize size={16} />} label={`${depto.m2}m2`} />
              <Stat icon={<Bed size={16} />} label={`${depto.dormitorios}`} />
              <Stat icon={<Bath size={16} />} label={`${depto.banos}`} />
              <Stat icon={<Car size={16} />} label={depto.cochera ? "Si" : "-"} />
            </div>
            <p className="mt-6 text-sm text-white/60 leading-relaxed">{depto.descripcion}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {depto.amenidades.map(a => (
                <span key={a} className="text-[11px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/70">{a}</span>
              ))}
            </div>
            <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10">
              <p className="text-xs text-white/50 uppercase tracking-wider">Valor de venta</p>
              <p className="text-4xl font-light text-white mt-1">
                <span className="text-xl text-[#d4a373] font-medium mr-1">{depto.moneda}</span>
                {depto.precio.toLocaleString()}
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`https://wa.me/5491100000000?text=${encodeURIComponent(`Hola, me interesa el depto ${depto.numero} de Torre Aurora.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold flex items-center justify-center gap-2 transition"
              >
                <MessageCircle size={18} /> Consultar por WhatsApp
              </a>
              <Link
                href={`/departamento/${depto.id}`}
                className="w-full py-3.5 rounded-xl bg-white text-black hover:bg-gray-200 font-bold flex items-center justify-center gap-2 transition"
              >
                Ficha del departamento <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.aside>
      </AnimatePresence>
      <GaleriaFotos
        abierta={galeriaAbierta}
        onCerrar={() => setGaleriaAbierta(false)}
        fotos={depto.fotos}
        titulo={`Depto ${depto.numero}`}
      />
    </>
  );
}

function Stat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/5 border border-white/5">
      <span className="text-[#d4a373]">{icon}</span>
      <span className="text-[11px] font-medium text-white/80">{label}</span>
    </div>
  );
}