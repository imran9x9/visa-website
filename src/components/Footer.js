import React from "react";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <img src={require('../yourlogo.png')} alt="Visa Services Logo" className="footer-logo" />
          <div className="footer-address">
            <span>Visa Services Pvt Ltd</span>
            <span>123, Main Street, New Delhi, 110011, India</span>
            <span>
              <a href="mailto:support@visaservices.com">support@visaservices.com</a>
            </span>
            <span>+91 6200327336</span>
          </div>
        </div>
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
        <div className="footer-social">
          <h4>Connect</h4>
          <a href="mailto:support@visaservices.com" target="_blank" rel="noopener noreferrer">
            <img src={require('../icon-email.png')} alt="Email" />
          </a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
            <img src={require('../icon-whatsapp.png')} alt="WhatsApp" />
          </a>
          <a href="https://www.linkedin.com/company/visaservices" target="_blank" rel="noopener noreferrer">
            <img src={require('../icon-linkedin.png')} alt="LinkedIn" />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Visa Services. All rights reserved.</p>
      </div>
    </footer>
  );
}
