"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ServicesSection() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const services = [
    {
      title: "Enterprise Laptops",
      image: "/Photos/PIC2.jpg",
      description:
        "Business grade laptops, professional computing systems, and enterprise mobility solutions designed for modern workplaces, startups, institutions, remote teams, and high performance business operations. We provide reliable sourcing, configuration support, and technology solutions tailored for evolving enterprise environments."
    },
    {
      title: "Networking & CCTV",
      image: "/Photos/PIC3.jpg",
      description:
        "Advanced networking infrastructure, surveillance systems, secure connectivity solutions, CCTV integration, and intelligent monitoring technologies built for offices, commercial spaces, institutions, warehouses, and enterprise environments requiring stability, security, and operational efficiency."
    },
    {
      title: "Smart Displays",
      image: "/Photos/PIC4.png",
      description:
        "Interactive display systems, digital collaboration technologies, conference room solutions, smart presentation infrastructure, and enterprise visual communication setups designed to improve productivity, engagement, communication, and modern workplace experiences."
    }
  ];

  const handleCardClick = (index: number) => {
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="solutions" className="services-section">
      {/* HEADER */}
      <motion.div
        className="services-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="services-mini-text">SOLUTIONS</p>
        <h2 className="services-heading">
          Enterprise Technology{" "}
          <br className="hidden sm:inline" />
          Solutions.
        </h2>
      </motion.div>

      {/* FLIP CARD GRID */}
      <div className="flip-card-grid">
        {services.map((service, index) => {
          const isFlipped = flippedIndex === index;
          return (
            <motion.div
              className={`flip-card ${isFlipped ? "is-flipped" : ""}`}
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`${service.title}. Tap or click to flip card for details.`}
              aria-pressed={isFlipped}
              onClick={() => handleCardClick(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(index);
                }
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="flip-card-inner">
                {/* FRONT SIDE */}
                <div className="flip-card-front">
                  <img src={service.image} alt={service.title} width="800" height="400" loading="lazy" />
                  <div className="card-overlay"></div>
                  
                  <div className="flip-card-front-content">
                    <h3>{service.title}</h3>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div className="flip-card-back">
                  <div className="mb-3 border-b border-slate-100 pb-2.5">
                    <h3 className="text-xl font-bold text-slate-900 m-0">{service.title}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed m-0 flex-1">{service.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}