"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useEdificioStore } from "@/store/useEdificioStore";

export default function DeptoPage() {
  const { id } = useParams<{ id: string }>();
  const depto = useEdificioStore(s => s.depto);
  const seleccionar = useEdificioStore(s => s.seleccionar);

  // Seleccionar el departamento cuando la página carga
  useEffect(() => {
    if (id) seleccionar(id);
  }, [id, seleccionar]);

  if (!depto) return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <p>Departamento no encontrado</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Depto {depto.numero}</h1>
      <p className="text-white/60 mb-8">{depto.descripcion}</p>
      <div className="grid grid-cols-2 gap-4">
        <p><strong>Precio:</strong> {depto.moneda} {depto.precio.toLocaleString()}</p>
        <p><strong>Superficie:</strong> {depto.m2} m²</p>
        <p><strong>Dormitorios:</strong> {depto.dormitorios}</p>
        <p><strong>Baños:</strong> {depto.banos}</p>
      </div>
      <div className="mt-8">
        <a
          href={`https://wa.me/5491100000000?text=${encodeURIComponent(`Hola, me interesa el depto ${depto.numero} de Torre Aurora.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-black font-bold py-3 px-6 rounded-lg hover:bg-[#20bd5a] transition"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
}
