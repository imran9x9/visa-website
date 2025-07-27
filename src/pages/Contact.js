// src/pages/Contact.js
import React, { useState } from "react";
import "../App.css"; // Use a separate Contact.css if you want to custom style

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // For now, just show submitted state. Integrate with backend as needed.
    setSubmitted(true);
  }

  return (
    <div className="contact-page" style={{ minHeight: "80vh", paddingTop: 60 }}>
      <div className="contact-container" style={{
        maxWidth: 500, margin: "0 auto", background: "#f7fafd", borderRadius: 16,
        boxShadow: "0 2px 16px #cad6eb40", padding: "34px 24px 24px 24px"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Contact Us</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="contact-form">
            <div style={{ marginBottom: 18 }}>
              <label>Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: 10, borderRadius: 6, border: "1.2px solid #ddd" }}
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: 10, borderRadius: 6, border: "1.2px solid #ddd" }}
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                required
                style={{ width: "100%", padding: 10, borderRadius: 6, border: "1.2px solid #ddd" }}
              />
            </div>
            <button className="hero-button button-large" type="submit" style={{ width: "100%" }}>
              Send Message
            </button>
          </form>
        ) : (
          <div style={{ textAlign: "center", padding: 30 }}>
            <h4>Thank you for contacting us!</h4>
            <p>We will get back to you soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
