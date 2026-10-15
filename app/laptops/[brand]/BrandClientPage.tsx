"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LaptopCard from "../components/LaptopCard";
import QuoteModal from "../components/QuoteModal";
import { LaptopBrand, LaptopProduct, LAPTOP_BRANDS } from "../../data/laptopData";
import { 
  FaChevronRight, 
  FaLaptop, 
  FaShieldAlt, 
  FaBuilding, 
  FaWhatsapp, 
  FaCheckCircle, 
  FaArrowRight,
  FaFilter,
  FaSlidersH,
  FaFileAlt
} from "react-icons/fa";

interface BrandClientPageProps {
  brand: LaptopBrand;
  laptops: LaptopProduct[];
}

export default function BrandClientPage({ brand, laptops }: BrandClientPageProps) {
  const [activeSeries, setActiveSeries] = useState("All");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteModel, setQuoteModel] = useState("");

  const filteredLaptops = useMemo(() => {
    return laptops.filter((laptop) => {
      const matchSeries =
        activeSeries === "All" || laptop.series.toLowerCase() === activeSeries.toLowerCase();
      return matchSeries;
    });
  }, [laptops, activeSeries]);

  const handleOpenQuote = (model = "") => {
    const msg = `Hi Authentic Infosystem, I would like to request an official B2B quote and availability for ${brand.name} ${model}.`;
    window.open(`https://wa.me/919643990077?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const otherBrands = LAPTOP_BRANDS.filter((b) => b.slug !== brand.slug);

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      <Navbar />

      {/* Breadcrumb Bar */}
      <div className="bg-slate-50 border-b border-slate-200/80 pt-24 pb-3 sm:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <FaChevronRight size={10} className="text-slate-400" />
            <Link href="/laptops" className="hover:text-slate-900 transition-colors">
              Laptops
            </Link>
            <FaChevronRight size={10} className="text-slate-400" />
            <span className="text-slate-950 font-bold">{brand.name}</span>
          </nav>
        </div>
      </div>

      {/* Brand Hero */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-zinc-950 text-white py-12 sm:py-16 border-b border-slate-800 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              {/* Brand Logo & Pill */}
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 sm:h-14 bg-white/10 p-2.5 rounded-2xl border border-white/10 flex items-center justify-center max-w-[150px] sm:max-w-[180px]">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} Logo`}
                    className="max-h-7 sm:max-h-8 w-auto object-contain brightness-0 invert"
                  />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-500/20 border border-blue-400/30 px-3 py-1 rounded-full">
                  OFFICIAL ENTERPRISE LINEUP
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
                {brand.name} Laptops & Workstations
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-normal">
                {brand.description}
              </p>

              {/* Series Pills */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs text-slate-400 font-semibold mr-1">Series:</span>
                {brand.series.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSeries(activeSeries === s ? "All" : s)}
                    className={`text-xs font-bold px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                      activeSeries === s
                        ? "bg-blue-600 border-blue-500 text-white"
                        : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {brand.b2bHighlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <FaCheckCircle className="text-blue-400 shrink-0 mt-0.5" size={12} />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Fleet Inquiry Card */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-7 rounded-3xl lg:max-w-md w-full shadow-xl">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                <FaBuilding size={13} />
                <span>Bulk Fleet Procurement</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white mb-2">
                Deploying {brand.name} in your office?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-5">
                Get volume tier pricing, custom RAM/SSD pre-configuration, asset labeling, and official {brand.name} OEM warranty dispatch.
              </p>
              <div className="space-y-2.5">
                <button
                  onClick={() => handleOpenQuote()}
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaBuilding size={14} className="text-slate-900" />
                  <span>Request {brand.name} B2B Quote</span>
                </button>
                <a
                  href={`https://wa.me/919643990077?text=Hi%2C%20I%20am%20looking%20for%20a%20B2B%20quote%20for%20${brand.name}%20enterprise%20laptops.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <FaWhatsapp size={14} />
                  <span>Chat with {brand.name} Specialist</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Catalog Header Bar */}
        <div className="pb-6 border-b border-slate-200 mb-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950">
            Browse {brand.name} Models
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Showing {filteredLaptops.length} enterprise models
          </p>
        </div>

        {/* Laptops Grid */}
        {filteredLaptops.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 p-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-200 text-slate-700 mb-3">
              <FaLaptop size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              No models match current filter
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-5">
              We can procure any custom {brand.name} configuration directly from direct OEM partnership channels.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setActiveSeries("All");
                }}
                className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl"
              >
                Reset Filters
              </button>
              <button
                onClick={() => handleOpenQuote()}
                className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
              >
                Request Custom Model
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
            {filteredLaptops.map((laptop) => (
              <LaptopCard
                key={laptop.id}
                laptop={laptop}
                onOpenQuote={(_, model) => handleOpenQuote(model)}
              />
            ))}
          </div>
        )}
      </section>

      {/* FULL-BLEED BRAND PARTNERSHIPS STRIP */}
      <section className="w-full bg-slate-50/90 border-t border-b border-slate-200/90 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[3px] text-slate-500 mb-6 text-center">
            Official Laptop Brand Partnerships
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 w-full">
            {LAPTOP_BRANDS.map((b) => (
              <div
                key={b.slug}
                className="h-20 sm:h-24 px-5 py-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex items-center justify-center select-none"
              >
                <img
                  src={b.logo}
                  alt={`${b.name} Partnership`}
                  className="max-h-8 sm:max-h-9 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialBrand={brand.name}
        initialModel={quoteModel}
      />

      <Footer />
    </main>
  );
}
