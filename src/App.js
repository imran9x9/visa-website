import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./App.css";

function App() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const flags = [
    { src: require("./bangkokflag.png"), alt: "Bangkok", className: "icon1" },
    { src: require("./chinaflag.png"), alt: "China", className: "icon2" },
    { src: require("./dubaiflag.png"), alt: "Dubai", className: "icon3" },
    { src: require("./franceflag.png"), alt: "Indonesia", className: "icon4" },
    { src: require("./indonesiaflag.png"), alt: "Indonesia", className: "icon5" },
    { src: require("./maldivesflag.png"), alt: "Maldives", className: "icon6" },
    { src: require("./mauritiusflag.png"), alt: "Mauritius", className: "icon7" },
    { src: require("./srilankaflag.png"), alt: "Sri Lanka", className: "icon8" },
    { src: require("./switzerlandflag.png"), alt: "Switzerland", className: "icon9" },
    { src: require("./thailandflag.png"), alt: "Thailand", className: "icon10" },
    { src: require("./ukflag.png"), alt: "UK", className: "icon11" },
    { src: require("./australiaflag.png"), alt: "Australia", className: "icon12" },
    { src: require("./usflag.png"), alt: "US", className: "icon13" },
    { src: require("./malaysiaflag.png"), alt: "Malaysia", className: "icon14" },
  ];

  // Advanced 3D animation variants
  const flag3DVariants = {
    floating: (index) => ({
      y: [0, -15, 0],
      x: [0, 10, 0],
      rotateX: [15, 25, 15],
      rotateY: [-10, -5, -10],
      rotateZ: [0, 2, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 6 + index * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.2,
      },
    }),
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="global-header">
        <div className="global-header-content">
          <h1 className="logo">Visa Services</h1>
          <nav className="global-nav">
            <a href="#services">Services</a>
            <a href="#apply">Apply Now</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section with True 3D Flags */}
      <section ref={heroRef} className="hero-section">
        {/* 3D Floating Flags with Perspective */}
        <div className="floating-icons perspective-container">
          {flags.map((flag, index) => (
            <motion.div
              key={index}
              className={`flag-container ${flag.className}`}
              custom={index}
              variants={flag3DVariants}
              animate="floating"
              whileHover={{
                scale: 1.3,
                rotateY: -25,
                rotateX: 35,
                z: 60,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              style={{ 
                pointerEvents: "auto",
                cursor: "pointer" 
              }}
            >
              <img
                src={flag.src}
                alt={flag.alt}
                className="float-icon-3d"
              />
            </motion.div>
          ))}
        </div>

        {/* Hero Content */}
        <motion.div className="hero-text-container" style={{ y, opacity }}>
          <h1 className="hero-title">Your Gateway to the World</h1>
          <p className="hero-subtitle">Fast and reliable visa services for all your travel needs.</p>
          <button className="hero-button button-large">Apply Now</button>
        </motion.div>
      </section>

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

      {/* Footer */}
      <footer>
        <p>© 2025 Visa Services. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
