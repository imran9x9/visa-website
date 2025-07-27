import React from "react";

export default function Contact() {
  return (
    <div className="contact-section" style={{ maxWidth: 580, margin: "48px auto", background: "#f5f8fa", borderRadius: 16, boxShadow: "0 2px 16px #d4d7dd40", padding: 36 }}>
      <h2>Contact Us</h2>
      <p><strong>Address:</strong> 123 Your Street, Your City, Country</p>
      <p><strong>Email:</strong> <a href="mailto:info@yourdomain.com">info@yourdomain.com</a></p>
      <p><strong>Phone:</strong> +91-12345 67890</p>
      {/* Contact Form */}
      <form style={{ marginTop: 28 }}>
        <input type="text" placeholder="Your Name" required style={{ width: "100%", padding: 10, marginBottom: 10 }} />
        <input type="email" placeholder="Your Email" required style={{ width: "100%", padding: 10, marginBottom: 10 }} />
        <textarea placeholder="Your Message" required style={{ width: "100%", padding: 10, marginBottom: 10 }} rows={4} />
        <button type="submit" style={{ padding: "10px 32px", background: "#21808d", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>
          Send Message
        </button>
      </form>
      {/* Add social links or Google Map here if you like */}
    </div>
  );
}
