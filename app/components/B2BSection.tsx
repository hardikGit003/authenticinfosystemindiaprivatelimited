"use client";

import { motion } from "framer-motion";

export default function B2BSection() {
  return (
    <section className="b2b-section">

      {/* VIDEO */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="b2b-video"
      >
        <source src="/CIN1.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY */}

      <div className="b2b-overlay"></div>

      {/* CONTENT */}

      <div className="b2b-content">

        {/* LEFT */}

        <motion.div
          className="b2b-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >

          <p className="b2b-mini-text">
            ENTERPRISE PROCUREMENT
          </p>

          <h2>
            Built for Modern <br />
            Enterprise Supply.
          </h2>

          <p className="b2b-description">
            Authentic Infosystem supports corporate companies,
            government departments, institutions, and organizations
            with reliable enterprise technology procurement solutions.
          </p>

          <p className="b2b-description">
            From large-scale laptop procurement to enterprise
            infrastructure sourcing, we simplify IT acquisition
            with direct sourcing and nationwide delivery.
          </p>

        </motion.div>

        {/* RIGHT STATS */}

        <motion.div
          className="b2b-right"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >

          <div className="stat-card">
            <h3>PAN India</h3>
            <p>Enterprise Delivery Network</p>
          </div>

          <div className="stat-card">
            <h3>B2B & B2C</h3>
            <p>Procurement Solutions</p>
          </div>

          <div className="stat-card">
            <h3>Direct Sourcing</h3>
            <p>Faster & Reliable Procurement</p>
          </div>

          <div className="stat-card">
            <h3>Enterprise Support</h3>
            <p>Dedicated Business Assistance</p>
          </div>

        </motion.div>

      </div>

    </section>
  );
}