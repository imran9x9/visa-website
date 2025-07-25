import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1 className="logo">Hello Viza</h1>
        <nav>
          <a href="#services">Services</a>
          <a href="#apply">Apply Now</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero">
        <h2>Your Gateway to the World</h2>
        <p>Fast and reliable visa services for all your travel needs.</p>
        <button onClick={() => alert("Apply flow coming soon!")}>Apply Now</button>
      </section>

      <section id="services">
        <h3>Our Services</h3>
        <ul>
          <li>Tourist Visa</li>
          <li>Business Visa</li>
          <li>Student Visa</li>
          <li>Family Visa</li>
        </ul>
      </section>

      <footer>
        <p>© 2025 HelloViza. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
