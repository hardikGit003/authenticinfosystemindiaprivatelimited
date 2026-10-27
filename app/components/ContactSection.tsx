"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaGoogle, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactSection() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {

    const whatsappMessage =
`Enterprise Inquiry

Name: ${name}

Email: ${email}

Company: ${company}

Requirement:
${message}`;

    const whatsappURL =
`https://wa.me/919643990077?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <section
      id="contact"
      className="contact-section py-8 sm:py-12"
    >
      <div className="w-full max-w-[1720px] mx-auto">
        {/* CONTENT */}
        <div className="contact-content relative z-10">

          {/* LEFT */}
          <motion.div
            className="contact-left"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <p className="contact-mini-text text-xs sm:text-[13px] tracking-[4px] uppercase font-bold text-slate-900 mb-2 sm:mb-3 select-none">
              CONTACT US
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold tracking-tight text-slate-900 mb-4 sm:mb-5 leading-[1.12]">
              Let’s Build Your <br />
              Enterprise Technology <br />
              Infrastructure.
            </h2>

            <p className="contact-description text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal max-w-xl">
              Authentic Infosystem provides enterprise-grade
              technology procurement solutions for businesses,
              organizations, and government departments
              across India.
            </p>

            <div className="contact-details">

              <div>
                <a 
                  href="mailto:Info@authenticinfosystem.com" 
                  className="group block cursor-pointer transition-transform duration-200 hover:translate-x-1"
                  aria-label="Send email to Info@authenticinfosystem.com"
                >
                  <div className="flex items-center gap-2 mb-1 text-blue-600 group-hover:text-blue-700 transition-colors">
                    <FaEnvelope className="text-sm" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-600">Email</span>
                  </div>
                  <p className="text-slate-900 font-semibold group-hover:text-blue-700 transition-colors">Info@authenticinfosystem.com</p>
                </a>
              </div>

              <div>
                <a 
                  href="tel:+919643990077" 
                  className="group block cursor-pointer transition-transform duration-200 hover:translate-x-1"
                  aria-label="Call +91 9643990077"
                >
                  <div className="flex items-center gap-2 mb-1 text-blue-600 group-hover:text-blue-700 transition-colors">
                    <FaPhoneAlt className="text-sm" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-600">Phone</span>
                  </div>
                  <p className="text-slate-900 font-semibold group-hover:text-blue-700 transition-colors">+91 9643990077</p>
                </a>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1 text-blue-600">
                  <FaMapMarkerAlt className="text-sm" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Location</span>
                </div>
                <p className="text-slate-700 text-sm sm:text-[14.5px] font-medium leading-relaxed">
                  9th Floor Tower D, Unitech Cyber Park, Sector 39, Gurugram, Haryana, 122001
                </p>

                <a
                  href="https://maps.google.com/?q=Authentic+Infosystem+India+Private+Limited"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3.5 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs sm:text-sm border border-slate-200 shadow-xs transition-all duration-200 hover:scale-105 cursor-pointer"
                >
                  <FaGoogle className="text-blue-600 text-sm" />
                  <span>Visit on Google Maps</span>
                </a>
              </div>

            </div>

          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <div className="contact-form">

              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="email"
                placeholder="Business Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="text"
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />

              <textarea
                placeholder="Tell us about your requirement"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>

              <button onClick={handleSubmit}>
                Send Inquiry
              </button>

            </div>

          </motion.div>

        </div>
      </div>

    </section>
  );
}