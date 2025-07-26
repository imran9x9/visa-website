import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import "./App.css";

// --- HEADER ---
function Header() {
  return (
    <header className="global-header">
      <div className="global-header-content">
        <div className="logo">Visa Services</div>
        <nav className="global-nav">
          <a href="#services">Services</a>
          <a href="#apply">Apply Now</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

// --- FOOTER ---
function Footer() {
  return (
    <footer>
      <p>© 2025 Visa Services. All rights reserved.</p>
    </footer>
  );
}

// ----------- FLAG DATA -------------
const flags = [
  { src: require("./bangkokflag.png"), alt: "Bangkok" },
  { src: require("./chinaflag.png"), alt: "China" },
  { src: require("./dubaiflag.png"), alt: "Dubai" },
  { src: require("./franceflag.png"), alt: "France" },
  { src: require("./indonesiaflag.png"), alt: "Indonesia" },
  { src: require("./maldivesflag.png"), alt: "Maldives" },
  { src: require("./mauritiusflag.png"), alt: "Mauritius" },
  { src: require("./srilankaflag.png"), alt: "Sri Lanka" },
  { src: require("./switzerlandflag.png"), alt: "Switzerland" },
  { src: require("./thailandflag.png"), alt: "Thailand" },
  { src: require("./ukflag.png"), alt: "UK" },
  { src: require("./australiaflag.png"), alt: "Australia" },
  { src: require("./usflag.png"), alt: "US" },
  { src: require("./bahrainflag.png"), alt: "Bahrain" },
  { src: require("./belgiumflag.png"), alt: "Belgium" },
  { src: require("./bhutanflag.png"), alt: "Bhutan" },
  { src: require("./brazilflag.png"), alt: "Brazil" },
  { src: require("./canadaflag.png"), alt: "Canada" },
  { src: require("./egyptflag.png"), alt: "Egypt" },
  { src: require("./germanyflag.png"), alt: "Germany" },
  { src: require("./greeceflag.png"), alt: "Greece" },
  { src: require("./hongkongflag.png"), alt: "Hongkong" },
  { src: require("./icelandflag.png"), alt: "Iceland" },
  { src: require("./italyflag.png"), alt: "Italy" },
  { src: require("./japanflag.png"), alt: "Japan" },
  { src: require("./newzealandflag.png"), alt: "Newzealand" },
  { src: require("./philippinesflag.png"), alt: "Phillippines" },
  { src: require("./portugalflag.png"), alt: "Portugal" },
  { src: require("./qatarflag.png"), alt: "Qatar" },
  { src: require("./russiaflag.png"), alt: "Russia" },
  { src: require("./southafricaflag.webp"), alt: "SouthAfrica" },
  { src: require("./spainflag.png"), alt: "Spain" },
  { src: require("./taiwanflag.png"), alt: "Taiwan" }
];

// ----------- RANDOMIZATION LOGIC -------------
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Pass flagOrder as a prop so it can be changed dynamically
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
            width: "210px",
            height: "140px",
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

// -------------- MAIN APP ---------------
export default function App() {
  // New: flag order state and shuffle logic
  const [flagOrder, setFlagOrder] = useState(
    () => Array.from({ length: flags.length }, (_, i) => i)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setFlagOrder(prev => {
        let next = prev.slice();
        // Swap a few flags each time
        let numSwap = randomInt(2, 4);
        for (let i = 0; i < numSwap; ++i) {
          let idx1 = randomInt(0, next.length - 1);
          let idx2 = randomInt(0, next.length - 1);
          [next[idx1], next[idx2]] = [next[idx2], next[idx1]];
        }
        return next;
      });
    }, 1600); // Change every 1.6s (adjust as you like)
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header />
      <div className="hero-section">
        {/* Globe 3D */}
        <div className="globe-3d-canvas">
          <Canvas camera={{ position: [0, 0, 24], fov: 38 }}>
            <ambientLight intensity={1.5} />
            <Suspense fallback={null}>
              <GlobeFlags flagOrder={flagOrder} />
            </Suspense>
            {/* Rotates Globe */}
            <OrbitControls autoRotate autoRotateSpeed={1.25} enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
        {/* Hero Text Overlay */}
        <div className="hero-text-container">
          <h1 className="hero-title">Your Gateway to the World</h1>
          <p className="hero-subtitle">Fast and reliable visa services for all your travel needs.</p>
          <button className="hero-button button-large">Apply Now</button>
        </div>
      </div>
      {/* Services Section */}
      <section id="services">
        <h3>Our Services</h3>
        <ul className="services-list">
          <li>Tourist Visa</li>
          <li>Business Visa</li>
          <li>Student Visa</li>
          <li>Family Visa</li>
        </ul>
      </section>
      <Footer />
    </div>
  );
}
