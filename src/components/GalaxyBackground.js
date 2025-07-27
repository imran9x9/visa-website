import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import galaxyImage from "../galaxy.jpg"; // adjust if needed

export default function GalaxyBackground() {
  const texture = useLoader(TextureLoader, galaxyImage);
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[5, 64, 64]} />
      <meshBasicMaterial map={texture} side={2} />
    </mesh>
  );
}
