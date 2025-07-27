// src/pages/Home.js
import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Html, Stars } from "@react-three/drei";
import { TextureLoader } from "three";
import galaxyImage from "../assets/galaxy.jpg";
import "../App.css";

// -------- Galaxy 3D Background --------
function GalaxyBackground() {
  const texture = useLoader(TextureLoader, galaxyImage);
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[80, 64, 64]} />
      <meshBasicMaterial map={texture} side={2} />
    </mesh>
  );
}

// -------- Flags Data --------
const flags = [
  { src: require("../assets/flags/bangkokflag.png"), alt: "Bangkok" },
  { src: require("../assets/flags/chinaflag.png"), alt: "China" },
  { src: require("../assets/flags/dubaiflag.png"), alt: "Dubai" },
  { src: require("../assets/flags/franceflag.png"), alt: "France" },
  { src: require("../assets/flags/indonesiaflag.png"), alt: "Indonesia" },
  { src: require("../assets/flags/maldivesflag.png"), alt: "Maldives" },
  { src: require("../assets/flags/mauritiusflag.png"), alt: "Mauritius" },
  { src: require("../assets/flags/srilankaflag.png"), alt: "Sri Lanka" },
  { src: require("../assets/flags/switzerlandflag.png"), alt: "Switzerland" },
  { src: require("../assets/flags/thailandflag.png"), alt: "Thailand" },
  { src: require("../assets/flags/ukflag.png"), alt: "UK" },
  { src: require("../assets/flags/australiaflag.png"), alt: "Australia" },
  { src: require("../assets/flags/usflag.png"), alt: "US" },
  { src: require("../assets/flags/bahrainflag.png"), alt: "Bahrain" },
  { src: require("../assets/flags/belgiumflag.png"), alt: "Belgium" },
  { src: require("../assets/flags/bhutanflag.png"), alt: "Bhutan" },
  { src: require("../assets/flags/brazilflag.png"), alt: "Brazil" },
  { src: require("../assets/flags/canadaflag.png"), alt: "Canada" },
  { src: require("../assets/flags/egyptflag.png"), alt: "Egypt" },
  { src: require("../assets/flags/germanyflag.png"), alt: "Germany" },
  { src: require("../assets/flags/greeceflag.png"), alt: "Greece" },
  { src: require("../assets/flags/hongkongflag.png"), alt: "Hongkong" },
  { src: require("../assets/flags/icelandflag.png"), alt: "Iceland" },
  { src: require("../assets/flags/italyflag.png"), alt: "Italy" },
  { src: require("../assets/flags/japanflag.png"), alt: "Japan" },
  { src: require("../assets/flags/newzealandflag.png"), alt: "Newzealand" },
  { src: require("../assets/flags/philippinesflag.png"), alt: "Phillippines" },
  { src: require("../assets/flags/portugalflag.png"), alt: "Portugal" },
  { src: require("../assets/flags/qatarflag.png"), alt: "Qatar" },
  { src: require("../assets/flags/russiaflag.png"), alt: "Russia" },
  { src: require("../assets/flags/southafricaflag.webp"), alt: "SouthAfrica" }, // .webp as per your previous code
  { src: require("../assets/flags/spainflag.png"), alt: "Spain" },
  { src: require("../assets/flags/taiwanflag.png"), alt: "Taiwan" }
];

// -------- GlobeFlags 3D Component --------
function GlobeFlags({ flagOrder }) {
  const flagMeshes = [];
  const N = flagOrder.length;
  const R = 9; // Globe radius

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

export default function Home() {
  const [flagOrder, setFlagOrder] = useState(
    () => Array.from({ length: flags.length }, (_, i) => i)
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setFlagOrder(prev => {
        let next = prev.slice();
        let numSwap = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
        for (let i = 0; i < numSwap; ++i) {
          let idx1 = Math.floor(Math.random() * next.length);
          let idx2 = Math.floor(Math.random() * next.length);
          [next[idx1], next[idx2]] = [next[idx2], next[idx1]];
        }
        return next;
      });
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="hero-section">
        <div className="globe-3d-canvas">
          <Canvas camera={{ position: [0, 0, 24], fov: 38 }}>
            <GalaxyBackground />
            <Stars
              radius={70}
              depth={180}
              count={2800}
              factor={4.5}
              saturation={0.93}
              fade
              speed={0.2}
            />
            <ambientLight intensity={1.5} />
            <Suspense fallback={null}>
              <GlobeFlags flagOrder={flagOrder} />
            </Suspense>
            <OrbitControls autoRotate autoRotateSpeed={1.25} enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
        <div className="hero-text-container">
          <h1 className="hero-title">Your Gateway to the World</h1>
          <p className="hero-subtitle">Fast and reliable visa services for all your travel needs.</p>
          <button className="hero-button button-large">Apply Now</button>
        </div>
      </div>
      <section id="services">
        <h3>Our Services</h3>
        <ul className="services-list">
          <li>Tourist Visa</li>
          <li>Business Visa</li>
          <li>Student Visa</li>
          <li>Family Visa</li>
        </ul>
      </section>
    </div>
  );
}
