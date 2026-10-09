"use client";

import { motion } from "framer-motion";
import { 
  FaWhatsapp, 
  FaMicrochip, 
  FaCamera, 
  FaShieldAlt, 
  FaBatteryFull
} from "react-icons/fa";

export default function Iphone18ProAdSection() {
  const bannerImgSrc = "/Home%20Screen%20Advertisement/Iphone18PRoBanner.png";
  const lineupImgSrc = "/Home%20Screen%20Advertisement/Forged%20in%20Titanium.png";
  const cameraImgSrc = "/Home%20Screen%20Advertisement/Horizontal%20Visor%20Island.png";
  const aiImgSrc = "/Home%20Screen%20Advertisement/Apple%20Intelligence%20(A20%20Pro).png";

  const whatsappInquiryMsg = encodeURIComponent(
    `Hello Authentic Infosystem! I would like to Order the new Apple iPhone 18 Pro / Pro Max & iPhone Duo enterprise allocation.`
  );

  return (
    <section id="iphone18-ad" className="relative py-12 sm:py-16 lg:py-20 bg-white text-slate-900 overflow-hidden border-b border-slate-200">
      {/* Subtle clean neutral backdrop */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" 
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP TWO-COLUMN SHOWCASE: Content Left | Photo Right (matching BenQ section layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14 sm:mb-16">
          
          {/* LEFT COLUMN: Brand, Heading, Description, CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center z-10">
            
            {/* Top Brand Lockup */}
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-4 sm:mb-6"
            >
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl lg:text-[40px] font-black tracking-tight text-slate-950 uppercase leading-none font-sans">
                  Apple
                </span>
                <span className="text-sm sm:text-base lg:text-lg font-black tracking-wider text-slate-800 uppercase mt-1.5">
                  iPhone 18 Pro &amp; Duo Launch
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h2 
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] font-black text-slate-950 tracking-tight leading-[1.12]"
            >
              Order iPhone 18 Pro &amp; iPhone Duo
            </motion.h2>

            {/* Description Text */}
            <motion.p 
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-[16px] text-slate-700 leading-relaxed font-normal"
            >
              Titanium 18 Pro Flagship &amp; All-New Foldable iPhone Duo. Reserve Your Priority Day-1 Allocation with official GST tax invoicing and dedicated account allocation.
            </motion.p>

            {/* CTA Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href={`https://wa.me/919643990077?text=${whatsappInquiryMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                aria-label="Order iPhone 18 Pro on WhatsApp"
              >
                <FaWhatsapp className="text-emerald-400 text-base" />
                <span>Reserve via WhatsApp</span>
              </a>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Featured Photo Display Frame */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 shadow-2xl shadow-slate-300/60 border border-slate-200 group flex items-center justify-center"
            >
              <img
                src={bannerImgSrc}
                alt="Apple iPhone 18 Pro Official Banner"
                width="1400"
                height="600"
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </motion.div>
          </div>

        </div>

        {/* OFFICIAL APPLE PHOTO SHOWCASE & FEATURE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          
          {/* Card 1: Forged in Titanium & iPhone Duo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all"
          >
            <div className="p-7 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                New 4-Color Pro &amp; Duo Lineup
              </span>
              <h3 className="text-2xl font-black text-slate-950 mb-2">
                Forged in Titanium
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Available in Space Black, Frost Silver, Sky Blue, and Crimson Burgundy Titanium, alongside the groundbreaking foldable iPhone Duo.
              </p>
            </div>
            <div className="p-5 pt-0">
              <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-inner aspect-[16/9] w-full flex items-center justify-center">
                <img
                  src={lineupImgSrc}
                  alt="Forged in Titanium & iPhone Duo"
                  width="600"
                  height="338"
                  loading="lazy"
                  className="w-full h-full object-contain sm:object-cover object-center hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Card 2: Horizontal Visor Island */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all"
          >
            <div className="p-7 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Next-Gen Camera Architecture
              </span>
              <h3 className="text-2xl font-black text-slate-950 mb-2">
                Horizontal Visor Island
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Redesigned horizontal camera visor housing 48MP variable-aperture lenses, next-gen LiDAR scanner, and 10x Tetraprism optical zoom.
              </p>
            </div>
            <div className="p-5 pt-0">
              <div className="rounded-2xl overflow-hidden bg-black border border-slate-200/80 shadow-inner aspect-[16/9] w-full flex items-center justify-center">
                <img
                  src={cameraImgSrc}
                  alt="Horizontal Visor Island"
                  width="600"
                  height="338"
                  loading="lazy"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Apple Intelligence (A20 Pro) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all md:col-span-2 lg:col-span-1"
          >
            <div className="p-7 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                2nm Silicon Power
              </span>
              <h3 className="text-2xl font-black text-slate-950 mb-2">
                Apple Intelligence (A20 Pro)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                World&apos;s first 2nm mobile architecture with 32-core Neural Engine for real-time generative AI, writing tools, and live Siri context.
              </p>
            </div>
            <div className="p-5 pt-0">
              <div className="rounded-2xl overflow-hidden bg-black border border-slate-200/80 shadow-inner aspect-[16/9] w-full flex items-center justify-center">
                <img
                  src={aiImgSrc}
                  alt="Apple Intelligence (A20 Pro)"
                  width="600"
                  height="338"
                  loading="lazy"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

        </div>

        {/* 4 ARCHITECTURAL METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
            <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-950 flex items-center justify-center text-xl mb-3">
              <FaMicrochip />
            </div>
            <h4 className="text-base font-bold text-slate-950 mb-1">2nm A20 Pro Silicon</h4>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Industry-leading CPU &amp; GPU architecture with high-speed on-device neural processing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
            <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-950 flex items-center justify-center text-xl mb-3">
              <FaCamera />
            </div>
            <h4 className="text-base font-bold text-slate-950 mb-1">10x Quad-Prism Optics</h4>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Lossless 10x optical telephoto with studio-grade 4K 120 fps spatial recording.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
            <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-950 flex items-center justify-center text-xl mb-3">
              <FaShieldAlt />
            </div>
            <h4 className="text-base font-bold text-slate-950 mb-1">Quantum Titanium</h4>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Grade 5 forged aerospace alloy and Ceramic Shield 2.0 with under-display Face ID.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
            <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-950 flex items-center justify-center text-xl mb-3">
              <FaBatteryFull />
            </div>
            <h4 className="text-base font-bold text-slate-950 mb-1">All-Day 40h Power</h4>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              High-density solid state cell architecture with 45W MagSafe ultra-fast charging.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
