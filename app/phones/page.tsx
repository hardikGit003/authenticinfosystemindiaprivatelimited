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
    <main className="min-h-screen bg-white text-slate-900 selection:bg-rose-950 selection:text-white">
      <Navbar />

      {/* FULL-WIDTH MAROON HEADER SECTION (External CSS) */}
      <section className="maroon-hero-section">
        <div className="maroon-hero-glow" />

        <div className="maroon-hero-container">
          {/* Top Breadcrumb */}
          <div className="maroon-hero-breadcrumb">
            <Link href="/">Home</Link>
            <span className="maroon-hero-breadcrumb-sep">/</span>
            <span className="maroon-hero-breadcrumb-current">Smartphones & Enterprise Mobile Devices</span>
          </div>

          <div className="maroon-hero-layout">
            <div>
              <h1 className="maroon-hero-title">
                Official Smartphones & Enterprise Mobile Devices
              </h1>
              <p className="maroon-hero-desc">
                Direct manufacturer sourcing with authentic brand warranty, IMEI serial tracking, bulk GST tax invoicing, AppleCare / Samsung Care coverage, and nationwide secure dispatch.
              </p>
            </div>

            {/* Quick Search on Top */}
            <div className="maroon-hero-search-box">
              <FaSearch className="maroon-hero-search-icon" size={13} />
              <input
                type="text"
                placeholder="Search smartphone, brand, processor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="maroon-hero-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="maroon-hero-search-clear"
                  aria-label="Clear search"
                >
                  <FaTimes size={11} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

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
              <span className="results-count-text">
                {filteredProducts.length} Matching devices
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="results-clear-btn"
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
