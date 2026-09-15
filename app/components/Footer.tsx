"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
              <i className="fab fa-x-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>

          {subscribed ? (
            <div className="subscribe-success">
              <i className="fas fa-check-circle"></i>
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="footer-subscribe-form">
              <i className="far fa-envelope text-blue-400 pl-2"></i>
              <input
                type="email"
                placeholder="Enter your work email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="subscribe-btn">
                Subscribe
              </button>
            </form>
          )}
        </div>

        <div className="footer-line"></div>

        <div className="footer-links">
          <div className="footer-column">
            <h3>Products</h3>
            <Link href="/laptops">Laptops</Link>
            <Link href="/desktops">Desktops</Link>
            <Link href="/phones">Smartphones</Link>
            <Link href="/networking">Networking</Link>
            <Link href="/accessories">Accessories</Link>
            <Link href="/configuration">Custom PC Build</Link>
          </div>

          <div className="footer-column">
            <h3>Solutions</h3>
            <Link href="/enterprise">Business Solutions</Link>
            <Link href="/enterprise">Bulk Orders</Link>
            <Link href="/enterprise">B2B Supply</Link>
            <Link href="/enterprise">Enterprise Infra</Link>
          </div>

          <div className="footer-column">
            <h3>Support</h3>
            <a href="/#contact">Contact Us</a>
            <a href="https://wa.me/919643990077" target="_blank" rel="noopener noreferrer">Warranty Support</a>
            <a href="https://wa.me/919643990077" target="_blank" rel="noopener noreferrer">Technical Help</a>
            <a href="https://wa.me/919643990077" target="_blank" rel="noopener noreferrer">Service Request</a>
          </div>

          <div className="footer-column">
            <h3>Custom PCs</h3>
            <Link href="/configuration/gaming">Gaming Rig</Link>
            <Link href="/configuration/workstation">Workstation PC</Link>
            <Link href="/configuration/creator">Creator Studio</Link>
            <Link href="/configuration/office">Office System</Link>
          </div>

          <div className="footer-column">
            <h3>Company</h3>
            <a href="/#about">About Us</a>
            <a href="/#why-us">Why Choose Us</a>
            <a href="/#brands">Our Partners</a>
            <a href="/#contact">Get in Touch</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            Copyright © 2026 AUTHENTIC INFOSYSTEM INDIA PRIVATE LIMITED. All rights reserved.
          </p>

          <div className="footer-policy">
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}