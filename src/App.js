import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import LoginModal from "./components/LoginModal"; // Import your modal

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      <Header onLoginClick={() => setShowLogin(true)} />
      {/* Render modal ONLY if showLogin is true */}
      {showLogin && (
        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      )}
      <Routes>
        <Route path="/" element={<Home onLoginClick={() => setShowLogin(true)} />} />
        <Route path="/contact" element={<Contact />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
