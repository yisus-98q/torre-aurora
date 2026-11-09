"use client";

import { useEdificioStore } from "@/store/useEdificioStore";
import { DEPARTAMENTOS } from "@/lib/departamentos";

export default function EdificioGLB() {
  const seleccionado = useEdificioStore(s => s.seleccionado);
  const hover = useEdificioStore(s => s.hover);
  const seleccionar = useEdificioStore(s => s.seleccionar);
  const setHover = useEdificioStore(s => s.setHover);

  return (
    <group>
      <mesh position={[0, -0.35, 0]} receiveShadow>
        <boxGeometry args={[9.2, 0.7, 5.2]} />
        <meshStandardMaterial color="#25232a" roughness={0.86} />
      </mesh>
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[8.55, 0.16, 4.7]} />
        <meshStandardMaterial color="#b8a895" roughness={0.8} />
      </mesh>

      {DEPARTAMENTOS.map((depto) => {
        const esDerecha = depto.numero.endsWith("02");
        const x = esDerecha ? 2.1 : -2.1;
        const y = (depto.piso - 1) * 3 + 1.55;
        const activo = seleccionado === depto.id;
        const resaltado = hover === depto.id;
        const colorPared = activo ? "#94744f" : resaltado ? "#927d65" : "#75685a";

        return (
          <group
            key={depto.id}
            position={[x, y, 0]}
            onClick={(event) => {
              event.stopPropagation();
              seleccionar(depto.id);
            }}
            onPointerOver={(event) => {
              event.stopPropagation();
              setHover(depto.id);
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              setHover(null);
              document.body.style.cursor = "default";
            }}
          >
            <mesh castShadow receiveShadow>
              <boxGeometry args={[4.08, 2.72, 3.55]} />
              <meshStandardMaterial color={colorPared} roughness={0.76} />
            </mesh>
            <mesh position={[0, 0.12, 1.79]}>
              <boxGeometry args={[1.8, 1.45, 0.08]} />
              <meshStandardMaterial color="#263747" metalness={0.25} roughness={0.22} />
            </mesh>
            <mesh position={[0, -0.92, 2.13]} castShadow>
              <boxGeometry args={[3.72, 0.16, 0.82]} />
              <meshStandardMaterial color="#d4c5b2" roughness={0.64} />
            </mesh>
            <mesh position={[0, -0.58, 2.48]}>
              <boxGeometry args={[3.72, 0.08, 0.06]} />
              <meshStandardMaterial color="#33353a" metalness={0.65} roughness={0.3} />
            </mesh>
            {[-1.76, 1.76].map((railX) => (
              <mesh key={railX} position={[railX, -0.73, 2.48]}>
                <boxGeometry args={[0.07, 0.38, 0.06]} />
                <meshStandardMaterial color="#33353a" metalness={0.65} roughness={0.3} />
              </mesh>
            ))}
            <mesh position={[0, 1.39, 0]}>
              <boxGeometry args={[4.2, 0.12, 3.72]} />
              <meshStandardMaterial color="#d6c8b5" roughness={0.72} />
            </mesh>
            <mesh position={[0, -1.39, 0]}>
              <boxGeometry args={[4.2, 0.12, 3.72]} />
              <meshStandardMaterial color="#d6c8b5" roughness={0.72} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
