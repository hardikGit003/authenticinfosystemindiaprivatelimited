"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      {/* LEFT CONTENT */}
      <motion.div
        className="about-left"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-xs sm:text-[13px] tracking-[4px] uppercase font-bold text-slate-900 mb-3 sm:mb-4 select-none">
          WHO WE ARE
        </h2>

        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold tracking-tight text-slate-900 mb-5 sm:mb-6 leading-[1.12]">
          Building Modern{" "}
          <br className="hidden sm:inline" />
          Technology
          <span className="bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 bg-clip-text text-transparent">
            {" "}Infrastructure
          </span>{" "}
          <br className="hidden sm:inline" />
          For Businesses.
        </h3>

        <div className="w-16 h-1 bg-gradient-to-r from-slate-950 to-transparent rounded-full mb-6 sm:mb-7"></div>

        <p className="text-sm sm:text-base md:text-[15.5px] leading-relaxed text-slate-600 font-normal mb-3.5 max-w-xl">
          Authentic Infosystem delivers enterprise technology products,
          networking solutions, IT infrastructure,
          and digital procurement services across India.
        </p>

        <p className="text-sm sm:text-base md:text-[15.5px] leading-relaxed text-slate-600 font-normal max-w-xl">
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