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
  FaWhatsapp 
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

      if (selectedBrand !== "All") {
        if ((product.brand || "").toLowerCase() !== selectedBrand.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedBrand]);

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-600/20 selection:text-slate-900">
      <Navbar />

      {/* =========================================================================
          HERO BANNER SECTION (50% REDUCED HEIGHT, PRESERVING IMAGE ASPECT RATIO)
          ========================================================================= */}
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mt-[76px] sm:mt-[80px] lg:mt-[82px] mb-8">
        <div 
          className="w-full rounded-[20px] text-white shadow-xl relative overflow-hidden border border-[#5c0a15]/40 min-h-[220px] lg:min-h-0 lg:aspect-[2171/362] p-4 sm:p-5 lg:px-7 lg:py-5 xl:px-9 xl:py-6 flex flex-col justify-between bg-gradient-to-r from-[#240306] via-[#3d0309] to-[#180104]"
        >
          {/* Background image container preserving 100% exact image ratio without cropping */}
          <div className="absolute right-0 top-0 bottom-0 h-full pointer-events-none select-none flex justify-end z-10">
            <img 
              src="/Futuristic%20Red%20Tech%20Smartphone%20Banner.png" 
              alt="Official Smartphones Fleet" 
              className="h-full w-auto object-contain object-right"
              style={{
                maskImage: "linear-gradient(to right, transparent, black 20%)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 20%)"
              }}
            />
          </div>

          {/* Subtle mobile readability overlay */}
          <div className="absolute inset-0 bg-[#250207]/75 sm:bg-[#250207]/45 lg:hidden pointer-events-none z-15" />

          {/* DESKTOP THREE-PART LAYOUT */}
          <div className="relative z-20 hidden lg:flex items-center justify-between h-full gap-5">
            {/* 1. LEFT CONTENT: BREADCRUMB, HEADING, DESCRIPTION & TRUST INDICATORS */}
            <div className="flex flex-col justify-between h-full max-w-xl xl:max-w-2xl z-20 py-0.5">
              <div>
                {/* Breadcrumb Navigation */}
                <nav className="flex items-center gap-1.5 text-xs lg:text-[13px] text-[#E2EAF5]/85 mb-2.5 select-none font-medium">
                  <Link href="/" className="hover:text-white transition-colors">Home</Link>
                  <span className="text-[#E2EAF5]/60">&gt;</span>
                  <span className="text-white font-medium">Smartphones &amp; Enterprise Mobile</span>
                </nav>

                {/* Main Heading */}
                <h1 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-bold tracking-tight text-white mb-2.5 leading-tight">
                  Official Smartphones &amp; Enterprise Mobile Devices
                </h1>

                {/* Supporting Description */}
                <p className="text-[13.5px] sm:text-[14px] lg:text-[15.5px] text-[#E2EAF5] font-normal leading-relaxed mb-3 max-w-xl">
                  Direct manufacturer sourcing, brand warranty, IMEI serial tracking, bulk GST tax invoicing, and AppleCare / Samsung Care.
                </p>
              </div>

              {/* 4 Trust Indicators along the lower-left */}
              <div className="flex items-center gap-3 xl:gap-5 text-[#E2EAF5] text-[11px] lg:text-[11.5px] font-medium pt-1 select-none">
                <div className="flex items-center gap-1.5 shrink-0">
                  <svg className="w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  <span className="whitespace-nowrap">100% Genuine Products</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <svg className="w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <span className="whitespace-nowrap">GST Invoicing</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <svg className="w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V15.5c0-.442-.26-.84-.666-1.013l-3.344-1.433a1.5 1.5 0 00-.59-.12H15V6.75A1.125 1.125 0 0013.875 5.625H4.5A1.125 1.125 0 003.375 6.75v7.5" />
                  </svg>
                  <span className="whitespace-nowrap">Bulk &amp; Corporate Pricing</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <svg className="w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0118 0v6M3 18a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v3zm18 0a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v3z" />
                  </svg>
                  <span className="whitespace-nowrap">Dedicated Support</span>
                </div>
              </div>
            </div>

            {/* 2. CENTER: SPACER TO ALLOW BACKGROUND HARDWARE TO SHINE THROUGH */}
            <div className="flex-1 h-full pointer-events-none select-none min-w-[200px]" />

            {/* 3. RIGHT: SEARCH BAR */}
            <div className="w-full lg:w-auto shrink-0 z-20 self-start mt-1">
              <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-slate-200/90 p-1.5 pl-3.5 w-full sm:w-[320px] lg:w-[330px] xl:w-[360px] focus-within:ring-2 focus-within:ring-[#2563EB] focus-within:border-transparent transition-all">
                <svg className="w-4 h-4 text-[#64748B] mr-2.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search smartphone, brand, processor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-[13px] text-slate-800 placeholder-[#64748B] focus:outline-none bg-transparent font-normal"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-slate-400 hover:text-slate-600 mr-2 p-1 cursor-pointer transition-colors"
                    aria-label="Clear search"
                  >
                    <FaTimes size={11} />
                  </button>
                )}
                <button
                  type="button"
                  className="bg-[#8b1122] hover:bg-[#720c1a] text-white px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-colors shrink-0 cursor-pointer shadow-xs active:scale-98"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE / TABLET STACKED LAYOUT (< lg) */}
          <div className="relative z-20 flex lg:hidden flex-col gap-3 py-1">
            <nav className="flex items-center gap-1.5 text-xs text-[#E2EAF5]/85 select-none font-medium">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-[#E2EAF5]/50">&gt;</span>
              <span className="text-white font-medium">Smartphones</span>
            </nav>
            <p className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight" aria-hidden="true">
              Official Smartphones &amp; Enterprise Mobile Devices
            </p>
            <p className="text-xs sm:text-sm text-[#E2EAF5]/90 leading-relaxed">
              Direct manufacturer sourcing, brand warranty, IMEI serial tracking, and GST invoicing.
            </p>
            {/* Search */}
            <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-slate-200/90 p-1.5 pl-3.5 w-full">
              <svg className="w-4 h-4 text-[#64748B] mr-2.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                placeholder="Search smartphone, brand, processor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs text-slate-800 placeholder-[#64748B] focus:outline-none bg-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-slate-400 hover:text-slate-600 mr-2 p-1"
                >
                  <FaTimes size={11} />
                </button>
              )}
            </div>
            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-2 text-[#E2EAF5] text-[11px] font-medium pt-1">
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span>
                <span>100% Genuine</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span>
                <span>GST Invoicing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span>
                <span>Official Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span>
                <span>Priority Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EXPANDED FULL-WIDTH CATALOG CONTAINER */}
      <div className="catalog-main-content">

        {/* BRAND SELECTOR PILLS */}
        <div className="filter-pill-bar">
          <div className="filter-pill-list">
            {BRANDS.map((brand, i) => {
              const isActive = selectedBrand === brand;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedBrand(brand)}
                  className={`filter-pill-btn ${isActive ? "active" : ""}`}
                >
                  {brand}
                </button>
              );
            })}
          </div>
        </div>

        {/* RESULTS HEADER BAR */}
        <div className="results-summary-bar">
          <div className="results-summary-row">
            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight">
                {filteredProducts.length} matching devices
              </h2>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-bold text-[#0c2340] hover:text-blue-700 hover:underline cursor-pointer transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* ACTIVE FILTER CHIPS */}
          {hasActiveFilters && (
            <div className="active-chips-row">
              {selectedBrand !== "All" && (
                <span className="filter-chip">
                  <span>Brand: {selectedBrand}</span>
                  <button onClick={() => setSelectedBrand("All")} className="filter-chip-remove">
                    <FaTimes size={10} />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="filter-chip">
                  <span>Search: "{searchQuery}"</span>
                  <button onClick={() => setSearchQuery("")} className="filter-chip-remove">
                    <FaTimes size={10} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* FULL-WIDTH PRODUCT GRID (External CSS) */}
        {filteredProducts.length > 0 ? (
          <div className="catalog-cards-grid">
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
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-md text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                <FaWhatsapp size={14} className="text-white" />
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

        {/* WHY PROCURE FROM AUTHENTIC INFOSYSTEM (External CSS) */}
        <section className="catalog-trust-section">
          <div>
            <span className="catalog-trust-badge">
              Direct OEM Procurement
            </span>
            <h2 className="catalog-trust-title">
              Why Procure Smartphones From Authentic Infosystem
            </h2>
            <p className="catalog-trust-desc">
              Direct distributor access, authentic IMEI serial tracking, enterprise billing, and official brand warranty.
            </p>
          </div>

          <div className="catalog-trust-grid">
            <div className="catalog-trust-card">
              <div className="catalog-trust-icon-box">
                <FaShieldAlt />
              </div>
              <h3 className="catalog-trust-card-title">100% Genuine Brand Sourcing</h3>
              <p className="catalog-trust-card-desc">
                Sealed retail boxes with valid manufacturer serial numbers, AppleCare / Samsung Care eligibility, and GST input credit.
              </p>
            </div>

            <div className="catalog-trust-card">
              <div className="catalog-trust-icon-box">
                <FaTruck />
              </div>
              <h3 className="catalog-trust-card-title">Pan-India Insured Dispatch</h3>
              <p className="catalog-trust-card-desc">
                Express insured door-to-door delivery with live tracking for single devices and multi-location corporate consignments.
              </p>
            </div>

            <div className="catalog-trust-card">
              <div className="catalog-trust-icon-box">
                <FaHeadset />
              </div>
              <h3 className="catalog-trust-card-title">Enterprise Mobility Support</h3>
              <p className="catalog-trust-card-desc">
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
