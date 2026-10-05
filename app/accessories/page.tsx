"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeader from "../components/shared/SectionHeader";
import ProductCard from "../components/shared/ProductCard";
import { useState, useMemo, useEffect, useRef } from "react";
import { FaSearch, FaTimes, FaKeyboard, FaWhatsapp } from "react-icons/fa";

import { buyingGuides, accessoriesProducts } from "../data/accessoriesData";

const categories = ['All', 'Keyboard', 'Mouse', 'Monitor', 'Docking Station', 'USB Hub', 'Webcam', 'Headsets', 'Conference Devices', 'Power Backup', 'External Storage', 'Cables'];

export default function AccessoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />

      {/* Categories & Search Bar */}
      <section className="pt-28 sm:pt-32 pb-6 sm:pb-8 page-container border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-md mx-auto mb-4">
          <div className="relative">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
            <input
              type="text"
              placeholder="Search accessories (e.g., 4K Monitor, MX Master, USB-C Dock)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-black text-slate-900 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <FaTimes size={12} />
              </button>
            )}
          </div>
        </div>

        <div className="flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 pb-2 sm:pb-0 scrollbar-hide w-full">
          {categories.map((cat, i) => (
            <button 
              key={i} 
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 shadow-xs cursor-pointer ${
                activeCategory === cat
                  ? "bg-black border-black text-white"
                  : "bg-white border-slate-200 hover:bg-slate-100 text-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-10 sm:py-14 page-container">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <SectionHeader title="Featured Accessories" subtitle="Hand-picked tools to maximize your daily productivity." />
          {(searchQuery || activeCategory !== "All") && (
            <button
              onClick={clearAllFilters}
              className="text-xs font-semibold text-black hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 p-8 shadow-xs my-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-100 border border-zinc-200 text-zinc-900 mb-3 shadow-2xs">
              <FaKeyboard size={26} />
            </div>
            <div className="inline-block px-3 py-1 mb-2.5 rounded-full bg-black text-white text-[11px] font-bold uppercase tracking-wider shadow-2xs">
              ⚡ Will be available soon
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">
              {searchQuery ? `"${searchQuery}" will be available soon` : "Will be available soon"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
              {searchQuery ? (
                <>
                  We currently don't have <span className="font-bold text-slate-900">"{searchQuery}"</span> in our standard online inventory, but it will be available soon. Contact our procurement desk for immediate corporate sourcing.
                </>
              ) : (
                <>
                  No accessories match the selected category right now. We are expanding our portfolio and these items will be available soon.
                </>
              )}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/919643990077?text=Hi%2C%20I%20am%20looking%20for%20a%20quote%20for%20${encodeURIComponent(searchQuery || activeCategory || 'accessories')}.%20Please%20let%20me%20know%20availability.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-sm cursor-pointer"
              >
                <FaWhatsapp size={14} />
                <span>Inquire on WhatsApp</span>
              </a>
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 bg-black hover:bg-zinc-800 text-white font-semibold rounded-xl text-xs transition-all shadow-xs cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-6">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                {...product}
                delay={index * 0.05}
              />
            ))}
          </div>
        )}
      </section>

      {/* Workspace Collections */}
      <section className="py-12 sm:py-16 bg-slate-50 page-container border-y border-slate-200">
        <SectionHeader title="Workspace Collections" align="center" subtitle="Curated setups for every type of professional." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          {['Work From Home Kit', 'Developer Desk', 'Executive Office', 'Gaming Setup', 'Conference Room', 'Student Essentials'].map((collection, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 group cursor-pointer relative overflow-hidden shadow-xs hover:border-black hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-black/[0.03] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 relative z-10">{collection}</h3>
              <p className="text-black font-bold text-sm sm:text-base relative z-10 group-hover:underline">View Bundle →</p>
            </div>
          ))}
        </div>
      </section>

      {/* Buying Guide Carousel */}
      <section className="py-12 sm:py-16 page-container border-b border-slate-200">
        <SectionHeader title="Accessory Buying Guides" />
        
        <div className="relative mt-6">
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-black hover:text-white hover:border-black hover:scale-110 transition-all shadow-md cursor-pointer"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 sm:gap-6 scrollbar-hide relative z-0 px-2 md:px-0 h-fit items-start pb-2"
          >
            {buyingGuides.map((guide, i) => (
            <div 
              key={i} 
              className="min-w-[280px] sm:min-w-[320px] h-[210px] sm:h-[230px] rounded-[22px] overflow-hidden relative border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7 shrink-0 flex flex-col justify-end hover:shadow-xl hover:border-black hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
            >
              {/* Background Photo */}
              <img
                src={guide.image}
                alt={guide.title}
                width="400"
                height="260"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Light Vignette / Bottom Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

              {/* Text Scenario: Heading & Description */}
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,1)] [text-shadow:_0_2px_12px_rgba(0,0,0,0.95)] transition-colors">
                  {guide.title}
                </h3>
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] [text-shadow:_0_1px_8px_rgba(0,0,0,0.9)]">
                  {guide.desc}
                </p>
              </div>
            </div>
          ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-black hover:text-white hover:border-black hover:scale-110 transition-all shadow-md cursor-pointer"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </section>

      {/* Special Bundle */}
      <section className="py-12 sm:py-16 page-container">
        <div className="bg-white p-8 sm:p-12 lg:p-14 rounded-[22px] border border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.06)] relative overflow-hidden">
          {/* Subtle accent gradient inside the white card */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-slate-100 to-transparent rounded-full opacity-60 blur-3xl -z-0 translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Column: Text & Features */}
            <div className="lg:col-span-7">
              <span className="px-3.5 py-1 bg-zinc-100 text-slate-900 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 inline-block border border-zinc-300">Special Bundle</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-slate-900">Professional Workstation Bundle</h2>
              <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed">Equip your team with a complete, fully compatible workstation setup featuring top-tier components. Perfect for new hires and office upgrades.</p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 mb-7 text-slate-700 text-sm sm:text-base font-medium">
                <li className="flex items-center gap-3"><span className="text-black font-bold">✓</span> 27" 4K Monitor</li>
                <li className="flex items-center gap-3"><span className="text-black font-bold">✓</span> Mechanical Keyboard</li>
                <li className="flex items-center gap-3"><span className="text-black font-bold">✓</span> Ergonomic Mouse</li>
                <li className="flex items-center gap-3"><span className="text-black font-bold">✓</span> Universal USB-C Dock</li>
                <li className="flex items-center gap-3"><span className="text-black font-bold">✓</span> Wireless Headset</li>
                <li className="flex items-center gap-3"><span className="text-black font-bold">✓</span> Adjustable Laptop Stand</li>
              </ul>

              <a
                href="https://wa.me/919643990077?text=Hi%2C%20I%20want%20to%20request%20corporate%20pricing%20for%20the%20Professional%20Workstation%20Bundle%20from%20Authentic%20Infosystem."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 sm:px-8 py-3.5 bg-black text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-zinc-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                Request Corporate Pricing
              </a>
            </div>

            {/* Right Column: Bundle Photo */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="rounded-[20px] overflow-hidden shadow-xl border border-slate-200 w-full max-w-md group bg-slate-100">
                <img
                  src="/Accessories/Professional%20Workstation%20Bundle.jpeg"
                  alt="Professional Workstation Bundle"
                  width="500"
                  height="333"
                  loading="lazy"
                  className="w-full h-auto aspect-[500/333] object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
