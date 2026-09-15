"use client";

import { motion } from "framer-motion";
import { useState } from "react";

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
      {/* CONTENT */}
      <div className="contact-content">

        {/* LEFT */}

        <motion.div
          className="contact-left"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
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
              <h4>Email</h4>
              <p>Info@authenticinfosystem.com</p>
            </div>

            <div>
              <h4>Phone</h4>
              <p>+91 9643990077</p>
            </div>

            <div>
              <h4>Location</h4>
              <p>9th Floor Tower D,Unitech Cyber Park,Sector 39,</p>
              <p>Gurugram, Haryana, 122001</p>
            </div>

          </div>

        </motion.div>

        {/* RIGHT FORM */}

        <motion.div
          className="contact-form-wrapper"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
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

    </section>
  );
}