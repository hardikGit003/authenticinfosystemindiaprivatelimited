"use client";

import { motion } from "framer-motion";
import { 
  FaWhatsapp, 
  FaMicrochip, 
  FaCamera, 
  FaShieldAlt, 
  FaBatteryFull, 
  FaApple
} from "react-icons/fa";

export default function Iphone18ProAdSection() {
  const bannerImgSrc = "/Home%20Screen%20Advertisement/Iphone18PRoBanner.png";
  const lineupImgSrc = "/Home%20Screen%20Advertisement/apple_official/iphone18_lineup_hd.png";
  const cameraImgSrc = "/Home%20Screen%20Advertisement/apple_official/iphone18_camera_visor.png";
  const aiImgSrc = "/Home%20Screen%20Advertisement/apple_official/apple_intelligence_2x.jpg";

  const whatsappInquiryMsg = encodeURIComponent(
    `Hello Authentic Infosystem! I am interested in inquiring and pre-booking the new Apple iPhone 18 Pro / Pro Max enterprise allocation.`
  );

  return (
    <section className="relative py-16 sm:py-24 bg-white text-slate-900 overflow-hidden border-b border-slate-200">
      {/* Subtle clean neutral backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP HEADER - Crisp Apple Typography */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 shadow-sm mb-4"
          >
            <FaApple className="text-slate-900 text-sm" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-700">
              Official Advertisement • Priority Pre-Booking Open
            </span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 max-w-4xl leading-tight"
          >
            iPhone 18 Pro
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-3 text-lg sm:text-xl font-medium text-slate-600 max-w-2xl"
          >
            Titanium. So strong. So light. So Pro.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href={`https://wa.me/919643990077?text=${whatsappInquiryMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              <FaWhatsapp className="text-emerald-400 text-base" />
              <span>Pre-Book Your Allocation</span>
            </a>
          </motion.div>
        </div>

        {/* HERO BANNER PHOTO SHOWCASE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden border border-slate-200/80 bg-white shadow-xl shadow-slate-200/60 mb-12 group"
        >
          {/* Top Status Bar */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <span className="bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-bold px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm flex items-center gap-1.5">
              <FaApple className="text-slate-900 text-xs" /> Authentic Infosystem Distribution
            </span>
          </div>

          {/* Banner Photo */}
          <div className="relative w-full aspect-[21/9] min-h-[260px] sm:min-h-[380px] lg:min-h-[480px] flex items-center justify-center overflow-hidden bg-slate-950">
            <img
              src={bannerImgSrc}
              alt="Apple iPhone 18 Pro Official Banner"
              className="w-full h-full object-cover sm:object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </motion.div>

        {/* OFFICIAL APPLE PHOTO SHOWCASE & FEATURE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Official Titanium Lineup Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
          >
            <div className="p-6 pb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                New 4-Color Finish Lineup
              </span>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                Forged in Titanium
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Available in Space Black, Frost Silver, Sky Blue, and all-new Crimson Burgundy Titanium with ultra-narrow display borders.
              </p>
            </div>
            <div className="p-4 pt-0">
              <div className="rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-inner flex items-center justify-center p-3">
                <img
                  src={lineupImgSrc}
                  alt="Apple iPhone 18 Pro 4-Color Titanium Lineup"
                  className="w-full h-48 sm:h-52 object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Card 2: 48MP Pro Camera System Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
          >
            <div className="p-6 pb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Next-Gen Camera Architecture
              </span>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                Horizontal Visor Island
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Redesigned horizontal camera visor housing 48MP variable-aperture lenses, next-gen LiDAR scanner, and 10x Tetraprism zoom.
              </p>
            </div>
            <div className="p-4 pt-0">
              <div className="rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-inner flex items-center justify-center p-3">
                <img
                  src={cameraImgSrc}
                  alt="Apple iPhone 18 Pro Camera Visor"
                  className="w-full h-48 sm:h-52 object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Apple Intelligence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all md:col-span-2 lg:col-span-1"
          >
            <div className="p-6 pb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                2nm Silicon Power
              </span>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                Apple Intelligence (A20 Pro)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                32-core Neural Engine powering systemwide on-device AI tools, live contextual Siri, and real-time computational photography.
              </p>
            </div>
            <div className="p-4 pt-0">
              <div className="rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-inner flex items-center justify-center p-3">
                <img
                  src={aiImgSrc}
                  alt="Apple iPhone 18 Pro Apple Intelligence Tools"
                  className="w-full h-48 sm:h-52 object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

        </div>

        {/* 4 ARCHITECTURAL METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center text-lg mb-3">
              <FaMicrochip />
            </div>
            <h4 className="text-sm font-bold text-slate-950 mb-1">2nm A-Series Silicon</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Industry-leading CPU & GPU with 32-core Neural Engine for high-speed generative AI processing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center text-lg mb-3">
              <FaCamera />
            </div>
            <h4 className="text-sm font-bold text-slate-950 mb-1">10x Quad-Prism Optics</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Next-generation optical focal length range from 13mm Ultra Wide to 240mm Telephoto.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center text-lg mb-3">
              <FaShieldAlt />
            </div>
            <h4 className="text-sm font-bold text-slate-950 mb-1">Ceramic Shield 2.0</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              2x tougher than any smartphone glass with advanced thermal graphite architecture.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center text-lg mb-3">
              <FaBatteryFull />
            </div>
            <h4 className="text-sm font-bold text-slate-950 mb-1">Huge Leap in Battery</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Up to 33 hours video playback with high-speed Qi2 and 45W MagSafe fast charging.
            </p>
          </div>
        </div>

        {/* BOTTOM ENTERPRISE INQUIRY BANNER */}
        <div className="rounded-3xl bg-black text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-neutral-800">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Authentic Infosystem Commercial Allocation
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Reserve Your Units for Immediate Dispatch
            </h3>
            <p className="text-xs text-neutral-300 max-w-xl">
              Get corporate GST tax invoicing, priority serial registration, and dedicated enterprise account management.
            </p>
          </div>

          <a
            href={`https://wa.me/919643990077?text=${whatsappInquiryMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm shadow-lg transition-all hover:scale-105 cursor-pointer"
          >
            <FaWhatsapp size={16} />
            <span>Pre-Book via WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
