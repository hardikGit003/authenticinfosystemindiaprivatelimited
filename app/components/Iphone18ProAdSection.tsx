"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaWhatsapp, 
  FaPlay, 
  FaTimes, 
  FaMicrochip, 
  FaCamera, 
  FaShieldAlt, 
  FaBatteryFull, 
  FaCheckCircle, 
  FaBolt, 
  FaApple
} from "react-icons/fa";

export default function Iphone18ProAdSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const bannerImgSrc = "/Home%20Screen%20Advertisement/Iphone18PRoBanner.png";
  const videoSrc = "/Home%20Screen%20Advertisement/iPhone%2018%20Pro%20The%20ultimate%20performance%20and%20camera%20of%20any%20iPhone%2C%20with%20exceptional%20battery%20life.%20-%20Apple%20(1080p%2C%20h264).mp4";

  const whatsappInquiryMsg = encodeURIComponent(
    `Hello Authentic Infosystem! I would like to inquire about the upcoming Apple iPhone 18 Pro / Pro Max corporate pre-booking and enterprise allocation.`
  );

  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-[#070b14] to-slate-950 text-white overflow-hidden border-y border-slate-800/80">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Badge */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-slate-900 border border-blue-500/40 shadow-lg shadow-blue-950/50 mb-4"
          >
            <FaApple className="text-blue-400 text-sm" />
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-blue-300">
              2026 Priority Allocation • Pre-Booking Open
            </span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl leading-tight"
          >
            Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">iPhone 18 Pro</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed"
          >
            The next quantum leap in Apple Silicon. Forged in aerospace Quantum Titanium with the revolutionary 2nm A20 Pro chip, under-display Face ID, and Quad-Prism 10x optical zoom.
          </motion.p>
        </div>

        {/* HERO BANNER SHOWCASE CONTAINER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden border border-slate-700/80 bg-gradient-to-b from-slate-900/90 to-slate-950 shadow-2xl shadow-blue-950/40 mb-12 group"
        >
          {/* Top Banner Bar with Quick Badges */}
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-slate-700 shadow-sm flex items-center gap-1.5">
                <FaBolt className="text-amber-400 text-xs" /> A20 Pro (2nm)
              </span>
              <span className="bg-blue-600/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                Next-Gen Apple Intelligence
              </span>
            </div>

            <span className="bg-emerald-500/90 backdrop-blur-md text-slate-950 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
              <FaCheckCircle /> Authorized Apple Distribution
            </span>
          </div>

          {/* Banner Image */}
          <div className="relative w-full aspect-[21/9] min-h-[260px] sm:min-h-[380px] lg:min-h-[460px] flex items-center justify-center overflow-hidden bg-black/40">
            <img
              src={bannerImgSrc}
              alt="Apple iPhone 18 Pro Official Banner"
              className="w-full h-full object-cover sm:object-contain object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30 pointer-events-none" />

            {/* Bottom Actions Overlay */}
            <div className="absolute z-20 bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
              <a
                href={`https://wa.me/919643990077?text=${whatsappInquiryMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs sm:text-sm shadow-xl transition-all cursor-pointer hover:scale-105"
              >
                <FaWhatsapp size={16} />
                <span>Pre-Book via WhatsApp</span>
              </a>

              {/* Watch Film Play Button Trigger */}
              <button
                onClick={() => setIsVideoOpen(true)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-xl border border-white/30 text-white font-bold text-xs sm:text-sm shadow-xl transition-all cursor-pointer group/btn hover:scale-105"
              >
                <span className="w-8 h-8 rounded-full bg-blue-600 group-hover/btn:bg-blue-500 flex items-center justify-center text-white shadow-md transition-colors">
                  <FaPlay className="ml-0.5 text-xs" />
                </span>
                <span>Watch Official Film</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* 4 HIGHLIGHT PILLARS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-blue-500/50 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center text-lg mb-3">
              <FaMicrochip />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">A20 Pro Silicon</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              World&apos;s first 2nm mobile architecture with 32-core Neural Engine for real-time Apple Intelligence.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-lg mb-3">
              <FaCamera />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">10x Quad-Prism Camera</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              All 48MP lenses with lossless 10x optical zoom, 8K ProRes Spatial recording, and Gen-3 sensor shift.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-lg mb-3">
              <FaShieldAlt />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Quantum Titanium</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Under-display Face ID bezel-less glass and Grade 6 forged titanium alloy with zero scratch coating.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-lg mb-3">
              <FaBatteryFull />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">All-Day Power (40h)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stacked solid-state cell architecture supporting 45W MagSafe and 50% recharge in just 15 minutes.
            </p>
          </div>
        </div>
      </div>

      {/* VIDEO POPUP MODAL */}
      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/80">
                <div className="flex items-center gap-2">
                  <FaApple className="text-white text-base" />
                  <span className="text-sm font-bold text-white">
                    iPhone 18 Pro — The Ultimate Performance & Camera
                  </span>
                </div>
                <button
                  onClick={() => setIsVideoOpen(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <FaTimes size={16} />
                </button>
              </div>

              {/* Video Player */}
              <div className="relative aspect-video w-full bg-black">
                <video
                  src={videoSrc}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-900/90 flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Official Apple Keynote Preview Film • Authentic Infosystem Distribution
                </p>
                <a
                  href={`https://wa.me/919643990077?text=${whatsappInquiryMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold transition-all shadow-sm"
                >
                  <FaWhatsapp size={14} />
                  <span>Pre-Book Now</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

