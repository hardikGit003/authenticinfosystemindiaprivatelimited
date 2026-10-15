"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AccessoryCard from "./components/AccessoryCard";
import QuoteModal from "../laptops/components/QuoteModal";
import { buyingGuides, accessoriesProducts } from "../data/accessoriesData";
import { 
  FaSearch, 
  FaTimes, 
  FaKeyboard, 
  FaWhatsapp, 
  FaCheckCircle,
  FaShieldAlt
} from "react-icons/fa";

const categories = [
  "All", 
  "Keyboard", 
  "Mouse", 
  "Monitor", 
  "Docking Station", 
  "USB Hub", 
  "Webcam", 
  "Headsets", 
  "Conference Devices", 
  "Power Backup", 
  "External Storage", 
  "Cables"
];

export default function AccessoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Quote modal state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteBrand, setQuoteBrand] = useState("");
  const [quoteModel, setQuoteModel] = useState("");

  const handleOpenQuote = (brand = "", model = "") => {
    const msg = `Hi Authentic Infosystem, I would like to request an official quote and availability for ${brand} ${model}.`;
    window.open(`https://wa.me/919643990077?text=${encodeURIComponent(msg)}`, "_blank");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("search") || params.get("q");
      if (q) {
        setSearchQuery(q);
      }
    }
  }, []);

  const filteredProducts = useMemo(() => {
    return accessoriesProducts.filter((product) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.modelNumber.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        (product.brand && product.brand.toLowerCase().includes(q)) ||
        product.specs.some(
          (s) =>
            s.value.toLowerCase().includes(q) ||
            s.label.toLowerCase().includes(q)
        ) ||
        product.badges.some((b) => b.toLowerCase().includes(q));

      const matchesCat =
        activeCategory === "All" ||
        product.name.toLowerCase().includes(activeCategory.toLowerCase()) ||
        product.description.toLowerCase().includes(activeCategory.toLowerCase()) ||
        product.badges.some((b) => b.toLowerCase().includes(activeCategory.toLowerCase())) ||
        product.specs.some((s) => s.value.toLowerCase().includes(activeCategory.toLowerCase()));

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, activeCategory]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
  };

  const hasActiveFilters = searchQuery.trim().length > 0 || activeCategory !== "All";

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-rose-950 selection:text-white">
      <Navbar />

      {/* FULL-WIDTH MAROON HEADER SECTION (Left to Right) */}
      <section className="w-full bg-gradient-to-r from-[#4A0A16] via-[#650E20] to-[#3B0712] text-white pt-28 sm:pt-32 pb-8 sm:pb-10 border-b border-[#30050e] shadow-xs relative overflow-hidden">
        {/* Subtle ambient luxury highlight */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: "radial-gradient(ellipse 65% 85% at 20% 0%, rgba(255, 255, 255, 0.3) 0%, transparent 65%)"
          }}
        />

        <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
          {/* Top Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-rose-200/80 mb-2.5 select-none">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-rose-300/40">/</span>
            <span className="text-white font-medium">Enterprise PC Accessories & IT Peripherals</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                Enterprise PC Accessories & IT Peripherals
              </h1>
              <p className="text-xs sm:text-sm text-rose-100/90 mt-2 max-w-4xl leading-relaxed">
                Professional ultra-sharp 4K monitors, ergonomic mechanical keyboards, precision mice, universal Thunderbolt docks, conference audio, and enterprise power backup systems for modern workplace productivity. Backed by pan-India dispatch, official GST invoicing, and manufacturer warranty.
              </p>
            </div>

            {/* QUICK SEARCH INPUT */}
            <div className="relative w-full md:w-80 shrink-0">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
              <input
                type="text"
                placeholder="Search accessories (e.g. 4K Monitor, MX Master, Dock)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-white text-slate-900 border border-rose-900/30 rounded-md text-xs placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-400/50 focus:border-rose-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label="Clear search"
                >
                  <FaTimes size={11} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* EXPANDED CONTAINER (1720px matching laptops, desktops & networking) */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 sm:pt-8 pb-16">

        {/* CATEGORY SELECTOR PILLS (Corporate Lenovo Style) */}
        <div className="mb-6 pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat, i) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={i}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer rounded-md border ${
                    isActive
                      ? "bg-[#1546a0] text-white border-[#1546a0] shadow-xs"
                      : "bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:text-black"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* RESULTS HEADER BAR */}
        <div className="pb-3 border-b border-slate-200 mb-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm sm:text-base font-extrabold text-slate-950">
                {filteredProducts.length} Matching results
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-bold text-[#0f3e99] hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* ACTIVE FILTER CHIPS */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t border-slate-100">
              {activeCategory !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-xs border border-slate-200">
                  <span>Category: {activeCategory}</span>
                  <button onClick={() => setActiveCategory("All")} className="text-slate-500 hover:text-black cursor-pointer">
                    <FaTimes size={10} />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-xs border border-slate-200">
                  <span>Search: "{searchQuery}"</span>
                  <button onClick={() => setSearchQuery("")} className="text-slate-500 hover:text-black cursor-pointer">
                    <FaTimes size={10} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* PRODUCT GRID */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-lg border border-slate-200 p-8 shadow-xs my-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900 mb-3 shadow-2xs">
              <FaKeyboard size={26} />
            </div>
            <div className="inline-block px-3 py-1 mb-2.5 rounded-full bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider shadow-2xs">
              ⚡ Will be available soon
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">
              {searchQuery ? `"${searchQuery}" will be available soon` : "Will be available soon"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
              {searchQuery ? (
                <>
                  We currently don't have <span className="font-bold text-slate-900">"{searchQuery}"</span> in our standard online catalog, but it will be available soon. Contact our procurement desk for immediate corporate sourcing.
                </>
              ) : (
                <>
                  No accessories match the selected category right now. We are expanding our portfolio and these items will be available soon.
                </>
              )}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => handleOpenQuote("Accessories", searchQuery || activeCategory)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1546a0] hover:bg-[#003d7e] text-white font-bold rounded-md text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                <FaShieldAlt size={12} />
                <span>Request Custom Sourcing</span>
              </button>
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white font-semibold rounded-md text-xs transition-all shadow-xs cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredProducts.map((product) => (
              <AccessoryCard
                key={product.id}
                product={product}
                onOpenQuote={handleOpenQuote}
              />
            ))}
          </div>
        )}

        {/* WORKSPACE COLLECTIONS (Corporate Style with Skin-to-Pink Gradient) */}
        <section className="mt-16 pt-12 border-t border-slate-200">
          <div className="p-6 sm:p-8 lg:p-10 rounded-2xl border border-[#ecd2c5] shadow-md relative overflow-hidden bg-gradient-to-br from-[#f8d7c7] via-[#fadfd6] to-pink-200/90">
            {/* Atmospheric ambient glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-[#f8d7c7]/30 to-pink-400/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-[#f3c8b4]/30 to-rose-300/25 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="mb-6">
                <h2 className="text-xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  Curated Workplace Collections
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-3xl leading-relaxed">
                  Turnkey peripheral combinations tailored for developers, remote staff, and executive boardrooms.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {[
                  { title: "Work From Home Kit", desc: "Dual display hub, noise-canceling headset & wireless combo" },
                  { title: "Developer Desk", desc: "4K IPS display, mechanical tactile keyboard & high-DPI mouse" },
                  { title: "Executive Office", desc: "Curved Ultrawide monitor, premium noise-isolating audio & Thunderbolt dock" },
                  { title: "Creator & 3D Rig", desc: "Color-accurate 4K HDR display, fast NVMe external drive & monitor arm" },
                  { title: "Conference Room", desc: "Steerable multi-mic speakerphone, 4K HDR webcam & HDMI pass-through" },
                  { title: "Enterprise Fleet Setup", desc: "Bulk standard peripherals with unified asset tagging & deployment" },
                ].map((collection, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleOpenQuote("Workspace Collection", collection.title)}
                    className="bg-white/90 hover:bg-white rounded-xl border border-white/80 hover:border-[#dfb5a2] p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group"
                  >
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0f3e99] transition-colors mb-1.5">
                        {collection.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {collection.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BUYING GUIDE CAROUSEL (Corporate Style) */}
        <section className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Hardware Procurement Insights
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Accessory Sourcing & Buying Guides
              </h2>
            </div>
            {/* Scroll Navigation */}
            <div className="hidden sm:flex items-center gap-2">
              <button 
                onClick={() => scroll("left")}
                className="w-9 h-9 rounded-md border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                aria-label="Scroll left"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button 
                onClick={() => scroll("right")}
                className="w-9 h-9 rounded-md border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                aria-label="Scroll right"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 sm:gap-5 no-scrollbar pb-2"
          >
            {buyingGuides.map((guide, i) => (
              <div 
                key={i} 
                onClick={() => handleOpenQuote("Buying Guide Consultation", guide.title)}
                className="min-w-[280px] sm:min-w-[320px] h-[200px] sm:h-[220px] rounded-lg overflow-hidden relative border border-slate-200 p-5 sm:p-6 shrink-0 flex flex-col justify-end hover:shadow-xl hover:border-slate-400 transition-all duration-300 group cursor-pointer"
              >
                {/* Background Photo */}
                <img
                  src={guide.image}
                  alt={guide.title}
                  width="400"
                  height="260"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Dark Vignette Overlay for Crisp Readability */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

                {/* Text Content */}
                <div className="relative z-10">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1 drop-shadow-sm">
                    {guide.title}
                  </h3>
                  <p className="text-slate-200 text-xs leading-relaxed line-clamp-2">
                    {guide.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SPECIAL WORKSTATION BUNDLE SHOWCASE (Corporate Style) */}
        <section className="mt-16 pt-12 border-t border-slate-200">
          <div className="p-6 sm:p-8 lg:p-10 rounded-2xl border border-rose-300/80 shadow-md relative overflow-hidden bg-gradient-to-br from-red-100 via-rose-100 to-pink-200/90">
            {/* Atmospheric ambient glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-rose-500/20 to-pink-500/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-red-500/20 to-rose-400/25 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Text & Features */}
              <div className="lg:col-span-7">
                <h2 className="text-xl sm:text-3xl font-extrabold mb-3 text-slate-950 tracking-tight">
                  Professional Workstation Ecosystem Bundle
                </h2>
                <p className="text-slate-700 text-xs sm:text-sm mb-6 leading-relaxed">
                  Equip entire departments with fully certified, pre-configured workstation peripherals. Includes comprehensive OEM warranties, bulk GST tax invoicing, and Pan-India unified office dispatch.
                </p>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-7 text-slate-800 text-xs sm:text-sm font-medium">
                  <li className="flex items-center gap-2.5">
                    <FaCheckCircle className="text-emerald-600 shrink-0" size={13} />
                    <span>27" 4K UHD IPS Black Monitor</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <FaCheckCircle className="text-emerald-600 shrink-0" size={13} />
                    <span>Programmable Mechanical Keyboard</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <FaCheckCircle className="text-emerald-600 shrink-0" size={13} />
                    <span>8K DPI Ergonomic Multi-Device Mouse</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <FaCheckCircle className="text-emerald-600 shrink-0" size={13} />
                    <span>Universal Dual 4K USB-C Dock</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <FaCheckCircle className="text-emerald-600 shrink-0" size={13} />
                    <span>Noise-Canceling UC Wireless Headset</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <FaCheckCircle className="text-emerald-600 shrink-0" size={13} />
                    <span>Heavy-Duty Articulating Monitor Arm</span>
                  </li>
                </ul>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleOpenQuote("Workstation Bundle", "Complete Professional Workplace Bundle")}
                    className="px-6 py-2.5 bg-[#1546a0] hover:bg-[#003d7e] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-xs cursor-pointer"
                  >
                    Request Corporate Pricing
                  </button>
                  <a
                    href="https://wa.me/919643990077?text=Hi%2C%20I%20want%20to%20request%20corporate%20pricing%20for%20the%20Professional%20Workstation%20Bundle%20from%20Authentic%20Infosystem."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-md transition-all shadow-xs cursor-pointer"
                  >
                    <FaWhatsapp size={13} className="text-emerald-400" />
                    <span>Quick WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Bundle Photo */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <div className="rounded-xl overflow-hidden border border-rose-200/80 w-full max-w-md group bg-white shadow-md">
                  <img
                    src="/Accessories/Professional%20Workstation%20Bundle.jpeg"
                    alt="Professional Workstation Bundle - Authentic Infosystem"
                    width="500"
                    height="333"
                    loading="lazy"
                    className="w-full h-auto aspect-[500/333] object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* CUSTOM IT ACCESSORIES INFRASTRUCTURE CTA (Card matching 1720px span width on white background) */}
      <section className="pt-2 pb-16 bg-white">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="p-8 sm:p-12 lg:p-14 rounded-2xl sm:rounded-3xl border border-zinc-800 shadow-2xl relative overflow-hidden bg-[#09090b] text-white text-center">
            {/* Atmospheric ambient glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
              <p className="text-xs font-bold text-zinc-400 tracking-[4px] uppercase mb-3">
                BULK IT PROCUREMENT DESK
              </p>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                Scale Your Workplace Peripherals & Hardware Supply
              </h2>
              <p className="text-zinc-300 text-xs sm:text-sm md:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
                Need bulk procurement for multi-city branches, standard employee onboard kits, or specialized CAD/editing peripherals? Consult our corporate hardware sourcing desk for direct OEM pricing.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => handleOpenQuote("Enterprise", "Bulk Peripheral Fleet Procurement")}
                  className="px-8 py-3.5 bg-[#1546a0] hover:bg-[#003d7e] text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-md transition-all cursor-pointer"
                >
                  Request Corporate Quote
                </button>
                <a
                  href="https://wa.me/919643990077?text=Hi%2C%20I%20want%20to%20request%20a%20commercial%20quote%20for%20enterprise%20accessories%20and%20hardware."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs uppercase tracking-wider rounded-md shadow-md transition-all cursor-pointer"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialBrand={quoteBrand}
        initialModel={quoteModel}
      />

      <Footer />
    </main>
  );
}
