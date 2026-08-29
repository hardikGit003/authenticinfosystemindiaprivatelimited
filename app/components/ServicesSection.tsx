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
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
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
        {services.map((service, index) => (
          <motion.div
            className={`flip-card cursor-pointer ${flippedIndex === index ? "is-flipped" : ""}`}
            key={index}
            onClick={() => handleCardClick(index)}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flip-card-inner">
              {/* FRONT SIDE */}
              <div className="flip-card-front">
                <img src={service.image} alt={service.title} />
                <div className="card-overlay"></div>
                <h3>{service.title}</h3>
              </div>

              {/* BACK SIDE */}
              <div className="flip-card-back">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}