"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function ServicesSection() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const services = [
    {
      title: "Enterprise Laptops",
      href: "/laptops",
      image: "/Photos/PIC2.jpg",
      description:
        "Business grade laptops, professional computing systems, and enterprise mobility solutions designed for modern workplaces, startups, institutions, remote teams, and high performance business operations. We provide reliable sourcing, configuration support, and technology solutions tailored for evolving enterprise environments."
    },
    {
      title: "Networking & CCTV",
      href: "/networking",
      image: "/Photos/PIC3.jpg",
      description:
        "Advanced networking infrastructure, surveillance systems, secure connectivity solutions, CCTV integration, and intelligent monitoring technologies built for offices, commercial spaces, institutions, warehouses, and enterprise environments requiring stability, security, and operational efficiency."
    },
    {
      title: "Smart Displays",
      href: "#benq-smart-board",
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-xs sm:text-[13px] tracking-[4px] uppercase font-bold text-slate-900 mb-2 sm:mb-3 select-none">
          SOLUTIONS
        </h2>
        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold tracking-tight text-slate-900 mb-2 sm:mb-3 leading-[1.12]">
          Enterprise Technology{" "}
          <br className="hidden sm:inline" />
          Solutions.
        </h3>
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              viewport={{ once: true }}
            >
              <div className="flip-card-inner">
                {/* FRONT SIDE */}
                <div className="flip-card-front">
                  <img src={service.image} alt={service.title} width="800" height="400" loading="lazy" />
                  <div className="card-overlay"></div>
                  
                  <div className="flip-card-front-content">
                    <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                      {service.title}
                    </h4>
                    <span className="text-[11px] font-semibold text-white/95 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 select-none shadow-xs">
                      Tap for details
                    </span>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div className="flip-card-back">
                  <div className="mb-2.5 border-b border-slate-100 pb-2 flex items-center justify-between">
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 m-0 tracking-tight">
                      {service.title}
                    </h4>
                    <span className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider">
                      Overview
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed m-0 flex-1 font-normal">
                    {service.description}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={service.href}
                      prefetch={false}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0c2340] hover:text-blue-700 transition-colors"
                    >
                      <span>Explore {service.title}</span>
                      <FaArrowRight size={10} />
                    </Link>
                    <span className="text-[10px] text-slate-400">Click to flip back</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}