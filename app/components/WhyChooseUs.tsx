"use client";

import { useState } from "react";

const whyCards = [
  {
    image: "/Photos/1g.png",
    frontTitle: "PAN India Delivery",
    backTitle: "Nationwide Logistics",
    backDesc: "Reliable procurement and fast delivery support for businesses, institutions, enterprise clients, and organizations across India."
  },
  {
    image: "/Photos/2g.png",
    frontTitle: "B2B & B2C Solutions",
    backTitle: "Flexible Supply",
    backDesc: "Supplying IT hardware, laptops, and networking systems for both large enterprise setups and individual requirements."
  },
  {
    image: "/Photos/3g.png",
    frontTitle: "Direct Procurement",
    backTitle: "Direct Sourcing",
    backDesc: "Competitive pricing, genuine products, and trusted technology procurement from top global brands."
  },
  {
    image: "/Photos/4g.png",
    frontTitle: "Enterprise Assistance",
    backTitle: "Dedicated Support",
    backDesc: "Infrastructure consultation, deployment guidance, and long term enterprise technology assistance."
  }
];

export default function WhyChooseUs() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const toggleFlip = (index: number) => {
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="why-us" className="why-section">
      {/* BACKGROUND VIDEO */}
      <video
        className="why-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/CIN3.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="why-overlay"></div>

      {/* CONTENT */}
      <div className="why-container">
        {/* LEFT SIDE */}
        <div className="why-left">
          <p className="why-mini-text">WHY CHOOSE US</p>

          <h2 className="why-heading">
            Enterprise Technology
            <span>Solutions</span>
            For Modern Businesses.
          </h2>

          <p className="why-description">
            Authentic Infosystem delivers enterprise grade laptops, desktops,
            networking infrastructure, CCTV surveillance systems, accessories,
            and complete IT procurement solutions for businesses, institutions,
            organizations, and individual customers across India.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="why-right">
          {whyCards.map((card, index) => (
            <div
              key={index}
              className={`why-flip-card cursor-pointer ${flippedIndex === index ? "is-flipped" : ""}`}
              onClick={() => toggleFlip(index)}
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
                  <h3>{card.backTitle}</h3>
                  <p>{card.backDesc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}