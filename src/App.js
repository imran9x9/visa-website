import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./Contact";
import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Html, Stars } from "@react-three/drei";
import { TextureLoader } from "three";
import galaxyImage from "./galaxy.jpg";
import "./App.css";

// --- Galaxy 3D Background ---
function GalaxyBackground() {
  const texture = useLoader(TextureLoader, galaxyImage);
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[80, 64, 64]} />
      <meshBasicMaterial map={texture} side={2} />
    </mesh>
  );
}

// --- HEADER ---
function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40); // Change value as needed
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`global-header${scrolled ? " scrolled" : ""}`}>
      <div className="global-header-content">
        <img src={require('./yourlogo.png')} alt="helloviza" className="logo" style={{height: 48}} />
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
    <footer className="site-footer">
      <div className="footer-main">
        {/* Logo & Address */}
        <div className="footer-brand">
          <img src={require('./yourlogo.png')} alt="Visa Services Logo" className="footer-logo" />
          <div className="footer-address">
            <span>Visa Services Pvt Ltd</span>
            <span>123, Main Street, New Delhi, 110011, India</span>
            <span>
              <a href="mailto:support@visaservices.com">support@visaservices.com</a>
            </span>
            <span>+91 6200327336</span>
          </div>
        </div>
        {/* Links */}
        <div className="footer-links">
          <div>
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <a href="#products">Our Products</a>
            <a href="#approval">Approval Process</a>
          </div>
          <div>
            <h4>Legal</h4>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms & Conditions</a>
          </div>
        </div>
        {/* Social/Icons */}
        <div className="footer-social">
          <h4>Connect</h4>
          <a href="mailto:support@visaservices.com" target="_blank" rel="noopener noreferrer">
            <img src={require('./icon-email.png')} alt="Email" />
          </a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
            <img src={require('./icon-whatsapp.png')} alt="WhatsApp" />
          </a>
          <a href="https://www.linkedin.com/company/visaservices" target="_blank" rel="noopener noreferrer">
            <img src={require('./icon-linkedin.png')} alt="LinkedIn" />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Visa Services. All rights reserved.</p>
      </div>
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

// -------------- MAIN APP ---------------
export default function App() {
  const [flagOrder, setFlagOrder] = useState(
    () => Array.from({ length: flags.length }, (_, i) => i)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setFlagOrder(prev => {
        let next = prev.slice();
        let numSwap = randomInt(2, 4);
        for (let i = 0; i < numSwap; ++i) {
          let idx1 = randomInt(0, next.length - 1);
          let idx2 = randomInt(0, next.length - 1);
          [next[idx1], next[idx2]] = [next[idx2], next[idx1]];
        }
        return next;
      });
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header />
      <div className="hero-section">
        <div className="globe-3d-canvas">
          <Canvas camera={{ position: [0, 0, 24], fov: 38 }}>
            {/* 3D Galaxy Background */}
            <GalaxyBackground />
            {/* Optional Starfield Overlay */}
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
