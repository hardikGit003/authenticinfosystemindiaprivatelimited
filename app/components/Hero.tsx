"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
  return (
    <section id="home" className="hero bg-white border-b border-slate-200">
      {/* Subtle clean neutral grid backdrop */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" 
        aria-hidden="true"
      />

      {/* CONTENT */}
      <div className="hero-content relative z-10">
        {/* PRIMARY HEADLINE (H1) */}
        <h1 className="hero-heading">
          Technology Products and{" "}
          <br className="hidden sm:inline" />
          IT Solutions for Businesses{" "}
          <br className="hidden sm:inline" />
          and Individual Customers.
        </h1>

        {/* SUPPORTING SUBTITLE */}
        <p className="hero-description">
          Delivering enterprise-grade laptops, desktops, networking infrastructure,
          surveillance systems, accessories, and advanced IT procurement solutions
          tailored for modern businesses, startups, institutions, and individual
          customers across India.
        </p>

        {/* CALL TO ACTION BUTTONS */}
        <div className="hero-buttons">
          <Link href="/configuration">
            <button className="hero-btn-primary" aria-label="Customize your System">
              <span>Customize your System</span>
            </button>
          </Link>

          <a href="/#contact">
            <button className="hero-btn-secondary" aria-label="Contact Us">
              <span>Contact Us</span>
              <FaArrowRight className="text-xs opacity-75" />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}