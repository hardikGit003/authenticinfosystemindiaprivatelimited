"use client";

import { useState } from "react";
import { FaSyncAlt } from "react-icons/fa";

const whyCards = [
  {
    image: "/Pan%20India%20Delivery.jpg",
    frontTitle: "Pan-India Logistics",
    backTitle: "Nationwide Supply Chain",
    backDesc: "End-to-end supply chain network delivering high-priority IT infrastructure, rapid transit assurance, and secure procurement across every major enterprise hub in India."
  },
  {
    image: "/B2B%20%26%20B2C%20Business.jpg",
    frontTitle: "B2B & Enterprise Supply",
    backTitle: "Scalable IT Procurement",
    backDesc: "Tailored volume procurement, flexible institutional licensing, and high-performance hardware architectures built for both enterprise rollouts and specialized individual workstations."
  },
  {
    image: "/Direct%20Procurement.jpg",
    frontTitle: "Direct OEM Procurement",
    backTitle: "Authorized Tier-1 Sourcing",
    backDesc: "Direct authorized tier-1 sourcing with guaranteed manufacturer warranties, transparent commercial pricing, and genuine high-grade hardware from leading global OEMs."
  },
  {
    image: "/Enterprise%20Assitacne.jpg",
    frontTitle: "Enterprise Solutions & SLA",
    backTitle: "Mission-Critical Support",
    backDesc: "Comprehensive IT lifecycle management, system architecture advisory, turnkey deployment services, and dedicated SLA-backed enterprise technical support."
  }
];

export default function WhyChooseUs() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const toggleFlip = (index: number) => {
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="why-us" className="why-section">
      {/* CONTENT */}
      <div className="why-container">
        {/* LEFT SIDE */}
        <div className="why-left">
          <p className="why-mini-text">WHY CHOOSE AUTHENTIC INFOSYSTEM</p>

          <h2 className="why-heading">
            Enterprise Technology
            <span>Solutions</span>
            Engineered For Growth.
          </h2>

          <p className="why-description">
            Authentic Infosystem empowers corporations, educational institutions,
            and public-sector enterprises with enterprise-grade computing,
            mission-critical networking, advanced surveillance, and seamless
            turnkey IT procurement across India.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="why-right">
          {whyCards.map((card, index) => {
            const isFlipped = flippedIndex === index;
            return (
              <div
                key={index}
                className={`why-flip-card ${isFlipped ? "is-flipped" : ""}`}
                role="button"
                tabIndex={0}
                aria-label={`${card.frontTitle}. Tap to flip.`}
                aria-pressed={isFlipped}
                onClick={() => toggleFlip(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleFlip(index);
                  }
                }}
              >
                <div className="why-flip-inner">
                  {/* FRONT */}
                  <div
                    className="why-card-front"
                    style={{ backgroundImage: `url('${card.image}')` }}
                  >
                    <div className="why-card-overlay"></div>
                    <div className="why-card-content">
                      <h3>{card.frontTitle}</h3>
                    </div>
                  </div>

                  {/* BACK */}
                  <div className="why-card-back">
                    <div className="mb-2">
                      <h3>{card.backTitle}</h3>
                    </div>
                    <p>{card.backDesc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}