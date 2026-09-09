"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Hero() {

  useEffect(() => {

    const handleScroll = () => {

      const scrollY = window.scrollY;

      const video = document.querySelector(".background-video") as HTMLVideoElement | null;

      if (video) {

        const scale = 1 + scrollY * 0.0003;

        video.style.transform = `scale(${scale})` ;

      }

    };

 window.addEventListener("scroll", handleScroll);

return () => {
  window.removeEventListener("scroll", handleScroll);
};

}, []);

  return (

    <section
  id="home" className="hero">

      {/* VIDEO */}

      <div className="video-wrapper">

        <video
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
        >
          <source
            src="/hero.mp4"
            type="video/mp4"
          />
        </video>

      </div>

      {/* OVERLAY */}

      <div className="hero-overlay"></div>

      {/* CONTENT */}

      <div className="hero-content">

        <p className="hero-mini-text">
          AUTHENTIC INFOSYSTEM INDIA PRIVATE LIMITED
        </p>

        <h1>
          Technology Products and{" "}
          <br className="hidden sm:inline" />
          IT Solutions for Businesses{" "}
          <br className="hidden sm:inline" />
          and Individual Customers.
        </h1>

        <p className="hero-description">
             Delivering enterprise grade laptops, desktops,
             networking infrastructure, surveillance systems,
             accessories, and advanced IT procurement solutions
             tailored for modern businesses, startups,
             institutions, and individual customers across India.
      </p>

        {/* BUTTONS */}

        <div className="hero-buttons">

          <Link href="/configuration">
            <button className="primary-btn">
              Customize your System
            </button>
          </Link>

          <a href="#contact">
            <button className="primary-btn">
              Contact Us
            </button>
          </a>

        </div>
      </div>

    </section>

  );

}