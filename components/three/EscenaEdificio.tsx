"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import EdificioGLB from "./EdificioGLB";
import Iluminacion from "./Iluminacion";
import CamaraControlada from "./CamaraControlada";
import Loader from "./Loader";
import { useEdificioStore } from "@/store/useEdificioStore";

export default function EscenaEdificio() {
  const deseleccionar = () => useEdificioStore.getState().seleccionar(null);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 14, 34], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true, toneMapping: "ACESFilmic" }}
      onPointerMissed={deseleccionar}
    >
      <color attach="background" args={["#0a0a0f"]} />
      <fog attach="fog" args={["#0a0a0f", 45, 95]} />
      <Suspense fallback={<Loader />}>
        <Iluminacion />
        <EdificioGLB />
        <ContactShadows position={[0, -0.01, 0]} opacity={0.55} scale={60} blur={2.5} far={20} />
      </Suspense>
      <CamaraControlada />
      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={15}
        maxDistance={55}
        target={[0, 10, 0]}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
}