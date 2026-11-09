"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { FotoDepto } from "@/types/depto";

export default function GaleriaFotos({ abierta, onCerrar, fotos, titulo }: {
  abierta: boolean;
  onCerrar: () => void;
  fotos: FotoDepto[];
  titulo: string;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!abierta) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Escape") onCerrar();
      if (e.code === "ArrowRight") setIdx(i => (i + 1) % fotos.length);
      if (e.code === "ArrowLeft") setIdx(i => (i - 1 + fotos.length) % fotos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [abierta, fotos.length, onCerrar]);

  return (
    <AnimatePresence>
      {abierta && fotos.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex flex-col"
          onClick={onCerrar}
        >
          <div className="flex items-center justify-between px-6 py-4 text-white" onClick={e => e.stopPropagation()}>
            <div>
              <p className="text-sm font-medium">{titulo}</p>
              <p className="text-xs text-white/50">{fotos[idx].ambiente} - {idx + 1} / {fotos.length}</p>
            </div>
            <button onClick={onCerrar} className="p-2 rounded-full hover:bg-white/10">
              <X size={22} />
            </button>
          </div>
          <div className="flex-1 relative flex items-center justify-center px-4 min-h-0" onClick={e => e.stopPropagation()}>
            <img src={fotos[idx].url} alt={fotos[idx].alt} className="max-w-full max-h-full object-contain rounded-lg" />
            {fotos.length > 1 && (
              <>
                <button onClick={() => setIdx(i => (i - 1 + fotos.length) % fotos.length)} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur">
                  <ChevronLeft size={22} />
                </button>
                <button onClick={() => setIdx(i => (i + 1) % fotos.length)} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur">
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>
          {fotos.length > 1 && (
            <div className="px-4 py-3 flex gap-2 overflow-x-auto" onClick={e => e.stopPropagation()}>
              {fotos.map((f, i) => (
                <button key={f.url} onClick={() => setIdx(i)} className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition ${i === idx ? "border-blue-500" : "border-transparent opacity-60"}`}>
                  <img src={f.url} alt={f.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}