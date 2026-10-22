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
      className="contact-section"
    >
      <div className="w-full bg-[#09090b] text-white rounded-[24px] sm:rounded-[28px] border border-zinc-800 shadow-2xl relative overflow-hidden p-8 sm:p-12 lg:p-16">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/Contact_US%20Background.jpg"
            alt="Enterprise Technology Procurement"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark gradient overlay ensuring crisp contrast for text and high-tech hardware visibility */}
          <div 
            className="absolute inset-0" 
            style={{
              background: "linear-gradient(105deg, rgba(9, 9, 11, 0.93) 0%, rgba(9, 9, 11, 0.84) 45%, rgba(9, 9, 11, 0.72) 100%)"
            }} 
          />
          <div 
            className="absolute inset-0" 
            style={{
              background: "linear-gradient(to bottom, rgba(9, 9, 11, 0.5) 0%, transparent 40%, rgba(9, 9, 11, 0.6) 100%)"
            }} 
          />
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none z-[1]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none z-[1]" />

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

            <p className="contact-mini-text">
              CONTACT US
            </p>

            <h2>
              Let’s Build Your <br />
              Enterprise Technology <br />
              Infrastructure.
            </h2>

            <p className="contact-description">
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
                  <div className="flex items-center gap-2 mb-1.5 text-blue-400 group-hover:text-blue-300 transition-colors">
                    <FaEnvelope className="text-sm" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-200">Email</span>
                  </div>
                  <p className="text-white group-hover:text-blue-400 transition-colors">Info@authenticinfosystem.com</p>
                </a>
              </div>

              <div>
                <a 
                  href="tel:+919643990077" 
                  className="group block cursor-pointer transition-transform duration-200 hover:translate-x-1"
                  aria-label="Call +91 9643990077"
                >
                  <div className="flex items-center gap-2 mb-1.5 text-blue-400 group-hover:text-blue-300 transition-colors">
                    <FaPhoneAlt className="text-sm" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-200">Phone</span>
                  </div>
                  <p className="text-white group-hover:text-blue-400 transition-colors">+91 9643990077</p>
                </a>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1.5 text-blue-400">
                  <FaMapMarkerAlt className="text-sm" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Location</span>
                </div>
                <p>9th Floor Tower D,Unitech Cyber Park,Sector 39,</p>
                <p>Gurugram, Haryana, 122001</p>

                <a
                  href="https://maps.google.com/?q=Authentic+Infosystem+India+Private+Limited"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3.5 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-105 cursor-pointer"
                >
                  <FaGoogle className="text-blue-500 text-sm" />
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