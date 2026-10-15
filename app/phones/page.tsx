"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PhoneCard from "./components/PhoneCard";
import { phoneProducts } from "../data/products";
import { 
  FaMobileAlt, 
  FaShieldAlt, 
  FaTruck, 
  FaHeadset, 
  FaTimes, 
  FaSearch, 
  FaWhatsapp, 
  FaCheckCircle 
} from "react-icons/fa";

const BRANDS = ["All", "Apple", "Samsung", "Vivo", "Oppo", "Realme"];

export default function PhonesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("search") || params.get("q");
      if (q) setSearchQuery(q);
    }
  }, []);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedBrand("All");
  };

  const hasActiveFilters = searchQuery.trim().length > 0 || selectedBrand !== "All";

  // Filtered smartphones based on search and brand
  const filteredProducts = useMemo(() => {
    return phoneProducts.filter((product) => {
      // Free text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = (product.brand || "").toLowerCase().includes(q);
        const matchesModel = product.modelNumber.toLowerCase().includes(q);
        const matchesSpecs = product.specs.some(
          (s) => s.value.toLowerCase().includes(q) || s.label.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesBrand && !matchesModel && !matchesSpecs) return false;
      }

      // Brand filter
      if (selectedBrand !== "All") {
        if ((product.brand || "").toLowerCase() !== selectedBrand.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedBrand]);

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
          <div className="flex items-center gap-2 text-xs text-rose-200/80 mb-2.5 select-none">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-rose-300/40">/</span>
            <span className="text-white font-medium">Smartphones & Enterprise Mobile Devices</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                Official Smartphones & Enterprise Mobile Devices
              </h1>
              <p className="text-xs sm:text-sm text-rose-100/90 mt-2 max-w-4xl leading-relaxed">
                Direct manufacturer sourcing with authentic brand warranty, IMEI serial tracking, bulk GST tax invoicing, AppleCare / Samsung Care coverage, and nationwide secure dispatch.
              </p>
            </div>

            {/* Quick Search on Top */}
            <div className="relative w-full md:w-80 shrink-0">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
              <input
                type="text"
                placeholder="Search smartphone, brand, processor..."
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

      {/* EXPANDED FULL-WIDTH CONTAINER (1720px matching laptops, desktops & accessories) */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 sm:pt-8 pb-16">

        {/* BRAND SELECTOR PILLS (Corporate Lenovo Style) */}
        <div className="mb-6 pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {BRANDS.map((brand, i) => {
              const isActive = selectedBrand === brand;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer rounded-md border ${
                    isActive
                      ? "bg-[#1546a0] text-white border-[#1546a0] shadow-xs"
                      : "bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:text-black"
                  }`}
                >
                  {brand}
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
                {filteredProducts.length} Matching devices
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
              {selectedBrand !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-xs border border-slate-200">
                  <span>Brand: {selectedBrand}</span>
                  <button onClick={() => setSelectedBrand("All")} className="text-slate-500 hover:text-black cursor-pointer">
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

        {/* FULL-WIDTH PRODUCT GRID (4 Columns across 1720px, exactly like Accessories) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredProducts.map((product) => (
              <PhoneCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-lg border border-slate-200 p-8 shadow-xs my-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900 mb-3 shadow-2xs">
              <FaMobileAlt size={26} />
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
                  We currently don't have <span className="font-bold text-slate-900">"{searchQuery}"</span> in standard online inventory, but it will be available soon. We can arrange direct enterprise batch procurement with official brand warranty.
                </>
              ) : (
                <>
                  No smartphones match the selected filters right now. We regularly expand our inventory and this lineup will be available soon.
                </>
              )}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/919643990077?text=${encodeURIComponent(`Hi Authentic Infosystem, I would like to inquire about sourcing and quote for ${searchQuery || selectedBrand || "smartphones"}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1546a0] hover:bg-[#003d7e] text-white font-bold rounded-md text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                <FaWhatsapp size={14} className="text-emerald-400" />
                <span>Inquire on WhatsApp</span>
              </a>
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white font-semibold rounded-md text-xs transition-all shadow-xs cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

        {/* WHY PROCURE FROM AUTHENTIC INFOSYSTEM (Corporate Style) */}
        <section className="mt-16 pt-12 border-t border-slate-200">
          <div className="mb-8">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Direct OEM Procurement
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Why Procure Smartphones From Authentic Infosystem
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Direct distributor access, authentic IMEI serial tracking, enterprise billing, and official brand warranty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs hover:border-slate-400 hover:shadow-md transition-all">
              <div className="w-11 h-11 bg-slate-100 text-slate-900 rounded-md flex items-center justify-center mb-4 text-lg">
                <FaShieldAlt />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">100% Genuine Brand Sourcing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sealed retail boxes with valid manufacturer serial numbers, AppleCare / Samsung Care eligibility, and GST input credit.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs hover:border-slate-400 hover:shadow-md transition-all">
              <div className="w-11 h-11 bg-slate-100 text-slate-900 rounded-md flex items-center justify-center mb-4 text-lg">
                <FaTruck />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Pan-India Insured Dispatch</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Express insured door-to-door delivery with live tracking for single devices and multi-location corporate consignments.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs hover:border-slate-400 hover:shadow-md transition-all">
              <div className="w-11 h-11 bg-slate-100 text-slate-900 rounded-md flex items-center justify-center mb-4 text-lg">
                <FaHeadset />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Enterprise Mobility Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Assistance with MDM configuration, corporate trade-ins, accessory bundling, and post-purchase priority support.
              </p>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}
