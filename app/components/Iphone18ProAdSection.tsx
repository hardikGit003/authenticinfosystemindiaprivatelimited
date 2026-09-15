"use client";

import { motion } from "framer-motion";
import { 
  FaWhatsapp, 
  FaMicrochip, 
  FaCamera, 
  FaShieldAlt, 
  FaBatteryFull, 
  FaApple,
  FaBolt
} from "react-icons/fa";

export default function Iphone18ProAdSection() {
  const bannerImgSrc = "/Home%20Screen%20Advertisement/Iphone18PRoBanner.png";
  const lineupImgSrc = "/Home%20Screen%20Advertisement/Forged%20in%20Titanium.png";
  const cameraImgSrc = "/Home%20Screen%20Advertisement/Horizontal%20Visor%20Island.png";
  const aiImgSrc = "/Home%20Screen%20Advertisement/Apple%20Intelligence%20(A20%20Pro).png";

  const whatsappInquiryMsg = encodeURIComponent(
    `Hello Authentic Infosystem! I would like to Pre-Book the new Apple iPhone 18 Pro / Pro Max & iPhone Duo enterprise allocation.`
  );

  return (
    <section className="relative py-20 sm:py-28 bg-white text-slate-900 overflow-hidden border-b border-slate-200">
      {/* Subtle clean neutral backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP HEADER - Huge Bold Announcement */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-slate-900 text-white shadow-md mb-5"
          >
            <FaApple className="text-white text-base" />
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-100">
              2026 Apple Launch • Priority Pre-Booking Open
            </span>
            <span className="flex h-2.5 w-2.5 relative ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 max-w-5xl leading-[1.08]"
          >
            Book iPhone 18 Pro & iPhone Duo
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-4 text-lg sm:text-2xl font-semibold text-slate-700 max-w-3xl leading-relaxed"
          >
            Titanium 18 Pro Flagship & All-New Foldable iPhone Duo. Reserve Your Priority Day-1 Allocation.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={`https://wa.me/919643990077?text=${whatsappInquiryMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-black text-sm sm:text-base shadow-xl shadow-slate-950/20 transition-all hover:scale-105 cursor-pointer"
            >
              <FaWhatsapp className="text-emerald-400 text-xl" />
              <span>Pre-Book iPhone 18 Pro & Duo Now</span>
            </a>
          </motion.div>
        </div>

        {/* HERO BANNER PHOTO SHOWCASE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-2xl shadow-slate-200/80 mb-14 group"
        >
          {/* Top Status Bar */}
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
            <span className="bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold px-4 py-2 rounded-full border border-slate-200 shadow-sm flex items-center gap-2">
              <FaApple className="text-slate-900 text-sm" /> Authentic Infosystem Distribution
            </span>

            <span className="bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm flex items-center gap-1.5">
              <FaBolt className="text-amber-400 text-xs" /> A20 Pro Silicon • iPhone Duo Foldable
            </span>
          </div>

          {/* Banner Photo */}
          <div className="relative w-full aspect-[21/9] min-h-[300px] sm:min-h-[420px] lg:min-h-[520px] flex items-center justify-center overflow-hidden bg-slate-950">
            <img
              src={bannerImgSrc}
              alt="Apple iPhone 18 Pro Official Banner"
              className="w-full h-full object-cover sm:object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </motion.div>

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
                New 4-Color Pro & Duo Lineup
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
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

        </div>

        {/* 4 ARCHITECTURAL METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
            <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-950 flex items-center justify-center text-xl mb-3">
              <FaMicrochip />
            </div>
            <h4 className="text-base font-bold text-slate-950 mb-1">2nm A20 Pro Silicon</h4>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Industry-leading CPU & GPU architecture with high-speed on-device neural processing.
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

        {/* BOTTOM ENTERPRISE INQUIRY BANNER */}
        <div className="rounded-3xl bg-black text-white p-7 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-neutral-800">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Authentic Infosystem Priority Commercial Allocation
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Reserve Your iPhone 18 Pro & iPhone Duo
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
              Official corporate GST tax invoicing, day-1 priority serial numbers, and dedicated account management.
            </p>
          </div>

          <a
            href={`https://wa.me/919643990077?text=${whatsappInquiryMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm sm:text-base shadow-lg transition-all hover:scale-105 cursor-pointer"
          >
            <FaWhatsapp size={20} />
            <span>Pre-Book via WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
