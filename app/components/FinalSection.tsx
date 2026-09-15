"use client";

import { motion } from "framer-motion";

export default function FinalSection() {
  return (
    <section className="final-section">
      {/* CONTENT */}
      <motion.div
        className="final-content"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >

        <p className="final-mini-text">
          AUTHENTIC INFOSYSTEM
        </p>

        <h2>
          Future Ready{" "}
          <br className="hidden sm:inline" />
          <span>Enterprise Infrastructure</span>
        </h2>

        <p className="final-description">
          Empowering organizations, startups,
          institutions, and enterprises with
          premium technology procurement,
          networking infrastructure, enterprise
          hardware, smart surveillance, and
          scalable IT solutions across India.
        </p>

        <div className="final-buttons">

          <a
            href="https://wa.me/919643990077"
            target="_blank"
            rel="noopener noreferrer"
          >

            <button className="final-primary-btn">
              Start Your Enterprise Journey
            </button>

          </a>

          <button className="final-secondary-btn">
            Explore Solutions
          </button>

        </div>

        {/* STATS */}

        <div className="final-stats">

          <div className="final-stat-card">

            <h3>50+</h3>

            <p>Enterprise Clients</p>

          </div>

          <div className="final-stat-card">

            <h3>1000+</h3>

            <p>Technologies Delivered </p>

          </div>

          <div className="final-stat-card">

            <h3>24/7</h3>

            <p>Business Support</p>

          </div>

        </div>

      </motion.div>

    </section>

  );

}