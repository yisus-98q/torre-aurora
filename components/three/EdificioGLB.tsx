"use client";
import { useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useEdificioStore } from "@/store/useEdificioStore";

useGLTF.preload("/models/edificio.glb");

export default function EdificioGLB() {
  const { scene } = useGLTF("/models/edificio.glb");
  const clon = useMemo(() => scene.clone(true), [scene]);

  const seleccionado = useEdificioStore(s => s.seleccionado);
  const hover = useEdificioStore(s => s.hover);
  const seleccionar = useEdificioStore(s => s.seleccionar);
  const setHover = useEdificioStore(s => s.setHover);

  useEffect(() => {
    clon.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      const mat = obj.material as THREE.MeshStandardMaterial;
      if (!mat?.emissive) return;
      mat.emissive.setHex(0x000000);
      mat.emissiveIntensity = 0;
      const id = obj.userData.depto_id as string | undefined;
      if (!id) return;
      if (id === seleccionado) {
        mat.emissive.setHex(0x3b82f6);
        mat.emissiveIntensity = 0.4;
      } else if (id === hover) {
        mat.emissive.setHex(0x60a5fa);
        mat.emissiveIntensity = 0.18;
      }
    });
  }, [clon, seleccionado, hover]);

  const resolverId = (obj: THREE.Object3D | null): string | null => {
    let a: THREE.Object3D | null = obj;
    while (a) {
      if (a.userData.depto_id) return a.userData.depto_id;
      a = a.parent;
    }
    return null;
  };

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const id = resolverId(e.object);
    if (id) seleccionar(id);
  };

  const onPointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const id = resolverId(e.object);
    if (id) {
      setHover(id);
      document.body.style.cursor = "pointer";
    }
  };

  const onPointerOut = () => {
    setHover(null);
    document.body.style.cursor = "default";
  };

  return (
    <primitive
      object={clon}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      castShadow
      receiveShadow
    />
  );
}