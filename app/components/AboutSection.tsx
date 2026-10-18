"use client";

import { motion } from "framer-motion";

export default function AboutSection() {

  return (

   <section
  id="about" className="about-section">

      {/* LEFT CONTENT */}

      <motion.div
        className="about-left"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >

        <p className="about-mini-text">
          WHO WE ARE
        </p>

        <h2 className="about-heading">
          Building Modern{" "}
          <br className="hidden sm:inline" />
          Technology
          <span className="gradient-text">
            {" "}Infrastructure
          </span>{" "}
          <br className="hidden sm:inline" />
          For Businesses.
        </h2>

        <div className="about-line"></div>

        <p className="about-description">

          Authentic Infosystem delivers enterprise technology products,
          networking solutions, IT infrastructure,
          and digital procurement services across India.

        </p>

        <p className="about-description">

          We help businesses and individual customers
          simplify technology purchasing with reliable sourcing,
          fast delivery, and long term support.

        </p>

      </motion.div>

      {/* RIGHT IMAGE */}

      <motion.div
        className="about-right"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        viewport={{ once: true }}
      >

        <img
          src="/Photos/PIC1.jpg"
          alt="Authentic Infosystem Enterprise Technology Infrastructure & Hardware Operations"
          width="950"
          height="460"
          loading="lazy"
        />

      </motion.div>

    </section>

  );

}