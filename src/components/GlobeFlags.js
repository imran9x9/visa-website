import React from "react";
import { Html } from "@react-three/drei";

// Import your flags here or pass them as props for more flexibility
const flags = [
  { src: require("../bangkokflag.png"), alt: "Bangkok" },
  // ... rest of your flags
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function GlobeFlags({ flagOrder }) {
  const flagMeshes = [];
  const N = flagOrder.length;
  const R = 9;
  for (let i = 0; i < N; i++) {
    const phi = Math.acos(-1 + (2 * i) / N);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const x = R * Math.cos(theta) * Math.sin(phi);
    const y = R * Math.sin(theta) * Math.sin(phi);
    const z = R * Math.cos(phi);
    const idx = flagOrder[i];
    flagMeshes.push(
      <Html
        key={i}
        position={[x, y, z]}
        distanceFactor={2}
        style={{ width: 120, height: 80, pointerEvents: "none" }}
        transform
        occlude
      >
        <img
          src={flags[idx].src}
          alt={flags[idx].alt}
          style={{
            width: "300px",
            height: "200px",
            borderRadius: "14px",
            border: "2px solid #000000",
            boxShadow: "0 4px 18px rgba(0,0,0,0.18)"
          }}
        />
      </Html>
    );
  }
  return <group>{flagMeshes}</group>;
}
