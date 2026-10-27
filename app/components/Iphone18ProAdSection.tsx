"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function Iphone18ProAdSection() {
  const bannerImgSrc = "/Home%20Screen%20Advertisement/Forged%20in%20Titanium.png";

  const whatsappInquiryMsg = encodeURIComponent(
    `Hello Authentic Infosystem! I would like to Order the new Apple iPhone 18 Pro / Pro Max & iPhone Duo enterprise allocation.`
  );

  return (
    <section id="iphone18-ad" className="iphone-ad-section">
      {/* TWO-COLUMN SHOWCASE: Content Left | Photo Right */}
      <div className="iphone-ad-top">
        
        {/* LEFT COLUMN: Brand, Heading, Description, CTA */}
        <motion.div 
          className="iphone-ad-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Top Brand Lockup */}
          <div className="iphone-ad-brand">
            <span className="iphone-ad-brand-title">Apple</span>
            <span className="iphone-ad-brand-sub">
              iPhone 18 Pro &amp; Duo Launch
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="iphone-ad-heading">
            Order iPhone 18 Pro &amp; iPhone Duo
          </h2>

          {/* Description Text */}
          <p className="iphone-ad-description">
            Titanium 18 Pro Flagship &amp; All-New Foldable iPhone Duo. Reserve Your Priority Day-1 Allocation with official GST tax invoicing and dedicated account allocation.
          </p>

          {/* CTA Actions */}
          <div className="benq-banner-actions">
            <a
              href={`https://wa.me/919643990077?text=${whatsappInquiryMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm sm:text-base shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              aria-label="Order iPhone 18 Pro on WhatsApp"
            >
              <FaWhatsapp className="text-white text-base" />
              <span>Reserve via WhatsApp</span>
            </a>
          </div>

        </motion.div>

        {/* RIGHT COLUMN: Featured Photo Display Frame */}
        <motion.div 
          className="iphone-ad-right"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="iphone-ad-frame group flex items-center justify-center">
            <img
              src={bannerImgSrc}
              alt="Apple iPhone 18 Pro & iPhone Duo Official Lineup"
              width="1400"
              height="788"
              loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
