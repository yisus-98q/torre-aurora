"use client";
import { Environment, SoftShadows } from "@react-three/drei";

export default function Iluminacion() {
  return (
    <>
      <SoftShadows size={25} samples={16} focus={0.5} />
      <ambientLight intensity={0.4} color="#ffe5cc" />
      <directionalLight
        position={[-15, 25, 20]}
        intensity={2.5}
        castShadow
        color="#ffb877"
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={40}
        shadow-camera-bottom={-10}
        shadow-camera-far={100}
      />
      <Environment preset="sunset" background={false} />
    </>
  );
}