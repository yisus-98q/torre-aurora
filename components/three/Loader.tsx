"use client";
import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, color: "white" }}>
        <div style={{ width: 192, height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ height: "100%", background: "#3b82f6", width: `${progress}%`, transition: "all 0.3s" }} />
        </div>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Cargando edificio... {Math.round(progress)}%</span>
      </div>
    </Html>
  );
}