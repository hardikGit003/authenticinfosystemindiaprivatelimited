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
  FaApple,
  FaCalendarAlt,
  FaTag,
  FaFileInvoiceDollar
} from "react-icons/fa";

type ModelOption = {
  id: string;
  name: string;
  screen: string;
  basePrice: number;
  badge: string;
};

const models: ModelOption[] = [
  {
    id: "18pm",
    name: "iPhone 18 Pro Max",
    screen: "6.9\" Super Retina XDR 120Hz ProMotion",
    basePrice: 159900,
    badge: "Ultimate Flagship",
  },
  {
    id: "18p",
    name: "iPhone 18 Pro",
    screen: "6.3\" Super Retina XDR 120Hz ProMotion",
    basePrice: 134900,
    badge: "Pro Compact",
  },
  {
    id: "18air",
    name: "iPhone 18 Air",
    screen: "6.6\" Ultra-Thin 5.5mm ProMotion",
    basePrice: 99900,
    badge: "Ultra-Slim Design",
  },
];

const colors = [
  { name: "Cosmic Titanium", hex: "#434b58", class: "bg-slate-700" },
  { name: "Desert Gold", hex: "#d4af37", class: "bg-amber-600" },
  { name: "Deep Obsidian", hex: "#1c1d22", class: "bg-slate-900" },
  { name: "Natural Silver", hex: "#e5e7eb", class: "bg-slate-300" },
];

const storages = [
  { size: "256GB", addPrice: 0 },
  { size: "512GB", addPrice: 20000 },
  { size: "1TB", addPrice: 40000 },
  { size: "2TB", addPrice: 70000 },
];

export default function Iphone18ProAdSection() {
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(storages[0]);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    quantity: "1",
    notes: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const calculatedPrice = selectedModel.basePrice + selectedStorage.addPrice;

  const whatsappPreorderMsg = encodeURIComponent(
    `Hello Authentic Infosystem! I would like to Pre-Book the new Apple ${selectedModel.name}.\n\n` +
    `• Model: ${selectedModel.name}\n` +
    `• Color: ${selectedColor.name}\n` +
    `• Storage: ${selectedStorage.size}\n` +
    `• Est. Price: ₹${calculatedPrice.toLocaleString("en-IN")}\n\n` +
    `Please share the priority booking token, allocation schedule, and GST invoice details.`
  );

  const bannerImgSrc = "/Home%20Screen%20Advertisement/Iphone18PRoBanner.png";
  const videoSrc = "/Home%20Screen%20Advertisement/iPhone%2018%20Pro%20The%20ultimate%20performance%20and%20camera%20of%20any%20iPhone%2C%20with%20exceptional%20battery%20life.%20-%20Apple%20(1080p%2C%20h264).mp4";

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      const msg = encodeURIComponent(
        `Pre-Order Booking Request for ${selectedModel.name}\n\n` +
        `Name: ${formData.name}\n` +
        `Phone: ${formData.phone}\n` +
        `Email: ${formData.email}\n` +
        `Company: ${formData.company || "Individual"}\n` +
        `Quantity: ${formData.quantity}\n` +
        `Configuration: ${selectedModel.name} | ${selectedColor.name} | ${selectedStorage.size}\n` +
        `Notes: ${formData.notes || "None"}`
      );
      window.open(`https://wa.me/919643990077?text=${msg}`, "_blank");
    }, 1200);
  };

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

            {/* Watch Film Play Button Trigger */}
            <button
              onClick={() => setIsVideoOpen(true)}
              className="absolute z-20 bottom-6 right-6 sm:bottom-8 sm:right-8 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-xl border border-white/30 text-white font-bold text-xs sm:text-sm shadow-xl transition-all cursor-pointer group/btn hover:scale-105"
            >
              <span className="w-8 h-8 rounded-full bg-blue-600 group-hover/btn:bg-blue-500 flex items-center justify-center text-white shadow-md transition-colors">
                <FaPlay className="ml-0.5 text-xs" />
              </span>
              <span>Watch Official Film</span>
            </button>
          </div>
        </motion.div>

        {/* 4 HIGHLIGHT PILLARS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
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

        {/* INTERACTIVE PRE-BOOKING CONFIGURATOR CARD */}
        <div className="bg-gradient-to-br from-slate-900/95 via-slate-900 to-slate-950 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Model & Spec Configurator */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-400 flex items-center gap-1.5 mb-1.5">
                  <FaTag /> Step 1: Select Edition
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Choose Your iPhone 18 Architecture</h3>
              </div>

              {/* Model Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {models.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModel(m)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedModel.id === m.id
                        ? "bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-900/20"
                        : "bg-slate-800/60 border-slate-700 hover:bg-slate-800 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold">{m.name}</span>
                      {selectedModel.id === m.id && <FaCheckCircle className="text-blue-400 text-xs" />}
                    </div>
                    <p className="text-[10px] text-slate-400 mb-1">{m.screen}</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900 text-blue-300 border border-slate-700">
                      {m.badge}
                    </span>
                  </button>
                ))}
              </div>

              {/* Colorways */}
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-400 block mb-2">
                  Step 2: Finish & Colorway ({selectedColor.name})
                </span>
                <div className="flex flex-wrap gap-3">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        selectedColor.name === c.name
                          ? "bg-slate-800 border-blue-400 text-white shadow-sm"
                          : "bg-slate-900/80 border-slate-700 hover:bg-slate-800 text-slate-400"
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full ${c.class} border border-white/20`} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage */}
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-400 block mb-2">
                  Step 3: Storage Capacity
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {storages.map((s) => (
                    <button
                      key={s.size}
                      onClick={() => setSelectedStorage(s)}
                      className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedStorage.size === s.size
                          ? "bg-blue-600 text-white border-blue-500 font-bold shadow-sm"
                          : "bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-800 text-xs font-medium"
                      }`}
                    >
                      <div className="text-xs">{s.size}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Booking Summary & Direct Action */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 mb-4">
                  <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                    VIP Pre-Order Summary
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Phase-1 Guaranteed
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mb-1">
                  {selectedModel.name}
                </h4>
                <p className="text-xs text-slate-400 mb-4">
                  {selectedColor.name} • {selectedStorage.size} • {selectedModel.screen}
                </p>

                {/* Estimated Price */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 mb-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-400">Estimated Launch Price</span>
                    <span className="text-xl sm:text-2xl font-black text-blue-400">
                      ₹{calculatedPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5 text-right">
                    Includes GST Invoicing & 1-Yr Official Warranty
                  </p>
                </div>

                {/* Pre-Booking Advantages List */}
                <div className="space-y-2 mb-6 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-400 shrink-0 text-xs" />
                    <span>Day-1 Priority Serial Number Allocation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaFileInvoiceDollar className="text-blue-400 shrink-0 text-xs" />
                    <span>Official Corporate Invoice for 18% GST Input Credit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-indigo-400 shrink-0 text-xs" />
                    <span>Zero Cancellation Fee Before Dispatch</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2.5">
                <a
                  href={`https://wa.me/919643990077?text=${whatsappPreorderMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-emerald-950/50 cursor-pointer"
                >
                  <FaWhatsapp size={16} />
                  <span>Pre-Book via WhatsApp Now</span>
                </a>

                <button
                  onClick={() => setIsFormOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all cursor-pointer text-center"
                >
                  Register Corporate Bulk Pre-Order
                </button>
              </div>
            </div>
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
                  href={`https://wa.me/919643990077?text=${whatsappPreorderMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
                >
                  <FaWhatsapp size={14} />
                  <span>Reserve Now</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CORPORATE REGISTRATION FORM MODAL */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-white"
            >
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setFormSubmitted(false);
                }}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <FaTimes size={16} />
              </button>

              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                <FaApple /> Corporate Fleet Reservation
              </div>
              <h3 className="text-xl font-bold mb-1">Pre-Order Allocation</h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill in your contact details. Our executive enterprise desk will issue your priority invoice and delivery slot.
              </p>

              {formSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl">
                    <FaCheckCircle />
                  </div>
                  <h4 className="text-base font-bold text-white">Opening WhatsApp Connection...</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Your allocation request has been prepared. Redirecting to our priority desk.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rahul@company.com"
                        className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Company / Organization</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Enterprise Name (Optional)"
                        className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Units Quantity</label>
                      <select
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="1">1 Unit (Individual)</option>
                        <option value="2-5">2 - 5 Units (Small Team)</option>
                        <option value="5-10">5 - 10 Units (Corporate)</option>
                        <option value="10+">10+ Units (Enterprise Bulk)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-900/50 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <FaWhatsapp size={14} />
                      <span>Submit & Connect to Reservation Desk</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
