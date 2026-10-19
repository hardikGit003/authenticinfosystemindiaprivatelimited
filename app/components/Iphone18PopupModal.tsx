"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaApple, 
  FaTimes, 
  FaWhatsapp, 
  FaArrowRight, 
  FaMicrochip, 
  FaCamera, 
  FaMobileAlt, 
  FaBatteryFull,
  FaBolt
} from "react-icons/fa";

// Module-level flag: Resets on every browser refresh / first visit, but persists during client-side Next.js route switching
let hasShownPopupInThisPageLoad = false;

export default function Iphone18PopupModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only show popup on first visit or full browser refresh
    if (hasShownPopupInThisPageLoad) {
      return;
    }

    hasShownPopupInThisPageLoad = true;
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleExploreClick = () => {
    closeModal();
    const section = document.getElementById("iphone18-ad");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const whatsappInquiryMsg = encodeURIComponent(
    `Hello Authentic Infosystem! I would like to Order the new Apple iPhone 18 Pro / Pro Max & iPhone Duo priority allocation.`
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8">
            {/* BACKDROP OVERLAY - LIGHTER & MORE TRANSPARENT */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/45 backdrop-blur-[4px]"
              onClick={closeModal}
            />

            {/* MODAL DIALOG CONTAINER - WIDER & LARGER LUXURY APPLE ARCHITECTURE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="relative w-full max-w-lg sm:max-w-2xl md:max-w-4xl lg:max-w-5xl bg-[#09090b] text-white border border-white/20 rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden z-10 max-h-[92vh] flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-labelledby="ip18-modal-title"
            >
              {/* TOP CORNER CLOSE BUTTON */}
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close advertisement popup"
                className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 text-white/80 hover:text-white flex items-center justify-center transition-all border border-white/15 backdrop-blur-md cursor-pointer shadow-lg group"
              >
                <FaTimes size={16} className="group-hover:rotate-90 transition-transform duration-200" />
              </button>

              {/* MODAL BODY WITH PROFESSIONAL DARK SCROLLBAR */}
              <div className="custom-modal-scrollbar overflow-y-auto p-5 sm:p-7 md:p-9 lg:p-10">
                
                {/* 2-COLUMN PANORAMIC GRID ON DESKTOP & TABLET */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                  
                  {/* LEFT COLUMN: HERO IMAGE SHOWCASE & HIGHLIGHT CARDS (COL 6) */}
                  <div className="lg:col-span-6 space-y-4">
                    
                    {/* TOP BADGE */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-zinc-200">
                      <FaApple className="text-white text-sm" />
                      <span>2026 Apple Launch Priority</span>
                      <span className="flex h-2 w-2 relative ml-0.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </div>

                    {/* SHOWCASE BANNER IMAGE */}
                    <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black aspect-[16/9] shadow-2xl group">
                      <img
                        src="/Home%20Screen%20Advertisement/Forged%20in%20Titanium.png"
                        alt="iPhone 18 Pro & iPhone Duo Launch"
                        width="800"
                        height="450"
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-[11px] font-bold tracking-wider uppercase text-zinc-200 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/15">
                          Titanium Precision
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1">
                          <FaBolt size={10} /> Orders Open
                        </span>
                      </div>
                    </div>

                    {/* MINI SPEC HIGHLIGHT BAR */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col items-center justify-center">
                        <p className="text-[10px] text-zinc-400 uppercase font-semibold">All</p>
                        <p className="text-xs sm:text-sm font-black text-white leading-tight mt-0.5">48MP</p>
                        <p className="text-[9px] text-zinc-400 leading-none mt-0.5">Rear cameras</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col items-center justify-center">
                        <p className="text-[10px] text-zinc-400 uppercase font-semibold">Chipset</p>
                        <p className="text-xs sm:text-sm font-bold text-white leading-tight mt-0.5">A20 Pro (2nm)</p>
                        <p className="text-[9px] text-zinc-400 leading-none mt-0.5">Bionic Engine</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col items-center justify-center">
                        <p className="text-[10px] text-zinc-400 uppercase font-semibold">Delivery</p>
                        <p className="text-xs sm:text-sm font-bold text-white leading-tight mt-0.5">PAN India</p>
                        <p className="text-[9px] text-zinc-400 leading-none mt-0.5">Priority Batch</p>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: DETAILS, 4 FEATURE BULLETS & CTAS (COL 6) */}
                  <div className="lg:col-span-6 space-y-4 sm:space-y-5">
                    
                    {/* TITLE & SUBTITLE */}
                    <div>
                      <h2 
                        id="ip18-modal-title"
                        className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-[1.1]"
                      >
                        iPhone 18 Pro <span className="text-zinc-400 font-medium">&</span> iPhone Duo
                      </h2>
                      <p className="text-xs sm:text-sm text-zinc-300 mt-2 font-light leading-relaxed">
                        Forged in lightweight aerospace-grade Titanium. Engineered for unprecedented performance with the next-generation <strong className="text-white font-semibold">A20 Pro Bionic</strong> and unified Apple Intelligence.
                      </p>
                    </div>

                    {/* 4 FEATURE HIGHLIGHT CARDS (2x2) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] transition-colors border border-white/10 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                          <FaMicrochip className="text-zinc-300" size={14} />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white">A20 Pro (2nm)</h4>
                          <p className="text-[11px] text-zinc-400 leading-tight mt-0.5">Next-gen neural AI engine</p>
                        </div>
                      </div>

                      <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] transition-colors border border-white/10 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                          <FaCamera className="text-zinc-300" size={14} />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white">All 48MP</h4>
                          <p className="text-[11px] text-zinc-400 leading-tight mt-0.5">Rear cameras system</p>
                        </div>
                      </div>

                      <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] transition-colors border border-white/10 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                          <FaMobileAlt className="text-zinc-300" size={14} />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white">iPhone Duo</h4>
                          <p className="text-[11px] text-zinc-400 leading-tight mt-0.5">Dual OLED folding display</p>
                        </div>
                      </div>

                      <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] transition-colors border border-white/10 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                          <FaBatteryFull className="text-zinc-300" size={14} />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white">40h+ Battery</h4>
                          <p className="text-[11px] text-zinc-400 leading-tight mt-0.5">Thermal dissipation tech</p>
                        </div>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <a
                        href={`https://wa.me/919643990077?text=${whatsappInquiryMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeModal}
                        className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold text-sm sm:text-base transition-all shadow-xl shadow-emerald-600/30 cursor-pointer text-center"
                      >
                        <FaWhatsapp size={18} />
                        <span>Order Now via WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={handleExploreClick}
                        className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-98 text-white font-semibold text-sm transition-all border border-white/15 cursor-pointer text-center"
                      >
                        <span>View Showcase</span>
                        <FaArrowRight size={12} />
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
