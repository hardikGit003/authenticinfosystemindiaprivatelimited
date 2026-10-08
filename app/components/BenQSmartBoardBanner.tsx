"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaWhatsapp, 
  FaCheckCircle,
  FaPhoneAlt
} from "react-icons/fa";

const slideImages = [
  "/BenQ Smart Screen/BenQ1.avif",
  "/BenQ Smart Screen/BenQ2.avif",
  "/BenQ Smart Screen/BenQ3.avif",
  "/BenQ Smart Screen/BenQ4.avif",
  "/BenQ Smart Screen/BenQ5.avif",
];

const SLIDE_DURATION = 2500; // 2.5 seconds per slide

export default function BenQSmartBoardBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slideImages.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slideImages.length) % slideImages.length);
  }, []);

  // Continuous auto-swipe every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [handleNext]);

  const whatsappMessage = encodeURIComponent(
    "Hello Authentic Infosystem! I am interested in BenQ Smart Interactive Displays for Classrooms & Enterprise. Please share models, pricing, and live demo details."
  );

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { duration: 0.3, ease: "easeOut" },
        opacity: { duration: 0.3, ease: "easeInOut" },
        scale: { duration: 0.3, ease: "easeOut" },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { duration: 0.25, ease: "easeInOut" },
        opacity: { duration: 0.25, ease: "easeInOut" },
      },
    }),
  };

  return (
    <section 
      id="benq-smart-board"
      aria-label="BenQ Smart Interactive Displays"
      className="relative bg-white text-slate-900 pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-20 border-b border-slate-200 overflow-hidden"
    >
      {/* Hidden image preloader to keep transitions instant and seamless */}
      <div className="hidden" aria-hidden="true">
        {slideImages.map((src, i) => (
          <img key={i} src={src} alt="" loading="eager" />
        ))}
      </div>

      {/* Subtle clean neutral backdrop */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]" 
        aria-hidden="true"
      />
      <div 
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-slate-100/70 blur-3xl pointer-events-none" 
        aria-hidden="true"
      />
      <div 
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-slate-100/70 blur-3xl pointer-events-none" 
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP TWO-COLUMN LAYOUT: Content Left | Slider Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
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
                <span className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-slate-950 leading-none">
                  BenQ
                </span>
                <span className="text-sm sm:text-base lg:text-lg font-black tracking-wider text-[#5c1048] uppercase mt-1.5">
                  Classroom Innovation &apos;26
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
              Smart Interactive Displays for Modern Classrooms
            </motion.h2>

            {/* Description Text */}
            <motion.p 
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-[16px] text-slate-700 leading-relaxed font-normal"
            >
              Make every lesson more engaging with interactive display technology built for teaching, 
              collaboration, and digital learning. Bring lessons, online resources, presentations, 
              and classroom activities together on one intuitive smart board.
            </motion.p>

            {/* CTA Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              {/* Primary Pill Button */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-7 py-3.5 rounded-full bg-[#6b1456] hover:bg-[#530e42] text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-950/20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                aria-label="Learn more about BenQ Smart Interactive Displays"
              >
                Learn more
              </button>

              {/* WhatsApp Quick Inquiry Button */}
              <a
                href={`https://wa.me/919643990077?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                aria-label="Contact on WhatsApp for BenQ Displays"
              >
                <FaWhatsapp className="text-base" />
                <span>Get Demo / Quote</span>
              </a>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Auto-swiping Photo Showcase */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Carousel Display Frame */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 shadow-2xl shadow-slate-300/60 border border-slate-200 group">
              {/* Image Slides with AnimatePresence */}
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-950"
                >
                  <img
                    src={slideImages[currentIndex]}
                    alt={`BenQ Smart Interactive Board Photo ${currentIndex + 1}`}
                    className="w-full h-full object-cover object-center select-none"
                    draggable={false}
                    loading="eager"
                  />
                </motion.div>
              </AnimatePresence>

              {/* In-Card Quick Left / Right Click Controls on Hover */}
              <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              >
                <FaChevronLeft className="text-xs sm:text-sm" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              >
                <FaChevronRight className="text-xs sm:text-sm" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* QUICK SPECS & DEMO REQUEST MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 border border-slate-200 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-purple-800 uppercase tracking-wider">
                    Authentic Infosystem × BenQ Series
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">
                    BenQ Smart Interactive Board Specs &amp; Inquiry
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              {/* Specifications Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase">Display Sizes</span>
                  <p className="text-sm font-black text-slate-900 mt-1">65&quot;, 75&quot;, 86&quot; &amp; 98&quot; 4K UHD</p>
                  <p className="text-xs text-slate-600 mt-0.5">3840 × 2160 with 178° Ultra-Wide View</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase">Touch &amp; Writing</span>
                  <p className="text-sm font-black text-slate-900 mt-1">40-Point Multi-Touch Precision</p>
                  <p className="text-xs text-slate-600 mt-0.5">Zero Gap IR with Dual-Pen Stylus</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase">Software Ecosystem</span>
                  <p className="text-sm font-black text-slate-900 mt-1">EZWrite 6 &amp; InstaShare 2</p>
                  <p className="text-xs text-slate-600 mt-0.5">Google EDLA certified Android &amp; Windows OPS</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase">Health &amp; Audio</span>
                  <p className="text-sm font-black text-slate-900 mt-1">Germ-Resistant &amp; 2×16W Audio</p>
                  <p className="text-xs text-slate-600 mt-0.5">TÜV Low Blue Light + Air Quality Sensors</p>
                </div>
              </div>

              {/* Key Features Checkmarks */}
              <div className="space-y-2 mb-6 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-500 shrink-0" />
                  <span>On-site Installation, Demo &amp; Teacher Training across India</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-500 shrink-0" />
                  <span>Official Manufacturer 3-Year On-Site Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-500 shrink-0" />
                  <span>Instant GST Input Tax Invoice &amp; Educational Institution Discounts</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
                <a
                  href={`https://wa.me/919643990077?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <FaWhatsapp size={18} />
                  <span>Request Instant Pricing on WhatsApp</span>
                </a>
                <a
                  href="tel:+919643990077"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <FaPhoneAlt size={14} />
                  <span>Call Us Now</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
