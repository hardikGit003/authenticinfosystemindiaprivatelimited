"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NetworkingCard from "./components/NetworkingCard";
import QuoteModal from "../laptops/components/QuoteModal";
import { surveillanceItems, networkingProducts, NetworkingProduct } from "../data/networkingData";
import { FaSearch, FaTimes, FaNetworkWired, FaCheckCircle, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const categories = [
  "All Hardware",
  "Managed Switches",
  "Wireless Access Points",
  "Firewalls",
  "Routers",
  "Fiber & Transceivers",
  "Server Racks",
  "Structured Cabling",
];

export default function NetworkingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Hardware");

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
    return networkingProducts.filter((product) => {
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

      const matchesCat = (() => {
        if (activeCategory === "All Hardware") return true;
        const cat = activeCategory.toLowerCase();
        if (cat.includes("switch")) {
          return (
            product.specs.some((s) => s.value.toLowerCase().includes("switch")) ||
            product.name.toLowerCase().includes("switch") ||
            product.badges.some((b) => b.toLowerCase().includes("managed"))
          );
        }
        if (cat.includes("wireless") || cat.includes("access point")) {
          return (
            product.specs.some((s) => s.value.toLowerCase().includes("ap") || s.value.toLowerCase().includes("wi-fi")) ||
            product.badges.some((b) => b.toLowerCase().includes("wireless"))
          );
        }
        if (cat.includes("firewall")) {
          return (
            product.specs.some((s) => s.value.toLowerCase().includes("firewall")) ||
            product.badges.some((b) => b.toLowerCase().includes("security"))
          );
        }
        if (cat.includes("router")) {
          return (
            product.specs.some((s) => s.value.toLowerCase().includes("router")) ||
            product.badges.some((b) => b.toLowerCase().includes("routing"))
          );
        }
        if (cat.includes("fiber") || cat.includes("transceiver")) {
          return (
            product.specs.some((s) => s.value.toLowerCase().includes("fiber")) ||
            product.badges.some((b) => b.toLowerCase().includes("fiber"))
          );
        }
        if (cat.includes("rack")) {
          return (
            product.specs.some((s) => s.value.toLowerCase().includes("rack") || s.label.toLowerCase().includes("capacity")) ||
            product.badges.some((b) => b.toLowerCase().includes("datacenter"))
          );
        }
        if (cat.includes("cabling")) {
          return (
            product.specs.some((s) => s.value.toLowerCase().includes("patch") || s.value.toLowerCase().includes("cat6")) ||
            product.badges.some((b) => b.toLowerCase().includes("cabling"))
          );
        }
        return product.name.toLowerCase().includes(cat) || product.description.toLowerCase().includes(cat);
      })();

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, activeCategory]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveCategory("All Hardware");
  };

  const hasActiveFilters = searchQuery.trim().length > 0 || activeCategory !== "All Hardware";

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
            <span className="text-white font-medium">Enterprise Networking & Smart Surveillance (CCTV)</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                Enterprise Networking & Smart Surveillance (CCTV)
              </h1>
              <p className="text-xs sm:text-sm text-rose-100/90 mt-2 max-w-4xl leading-relaxed">
                Enterprise-grade Cisco managed switches, Fortinet firewalls, Aruba access points, Ubiquiti UniFi Wi-Fi 6/7, optical fiber transceivers, server rack infrastructure, and AI-powered CCTV surveillance systems. Backed by pan-India onsite deployment, certified OEM warranties, and official GST invoicing.
              </p>
            </div>

            {/* Quick Search on Top Right */}
            <div className="relative w-full md:w-80 shrink-0">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
              <input
                type="text"
                placeholder="Search switch, firewall, AP, CCTV..."
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

      {/* EXPANDED CONTAINER (1720px matching laptops & desktops) */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 sm:pt-8 pb-16">

        {/* CATEGORY SELECTOR PILLS (Lenovo Corporate Style) */}
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
              {activeCategory !== "All Hardware" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-xs border border-slate-200">
                  <span>Category: {activeCategory}</span>
                  <button onClick={() => setActiveCategory("All Hardware")} className="text-slate-500 hover:text-black cursor-pointer">
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

        {/* PRODUCT GRID (Full width 4-column responsive, matching laptops & desktops) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 mb-14">
            {filteredProducts.map((product) => (
              <NetworkingCard
                key={product.id}
                product={product}
                onOpenQuote={(brand, model) => handleOpenQuote(brand, model)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-12 text-center my-6 mb-14">
            <FaNetworkWired size={32} className="mx-auto text-slate-400 mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-2">No networking hardware matches your search</h3>
            <p className="text-xs text-slate-600 mb-4">Try adjusting your search query or reset category filters.</p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 bg-[#1546a0] text-white font-bold text-xs uppercase tracking-wider rounded-md cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>

      {/* SMART SURVEILLANCE (CCTV) SECTION (Expanded to 1720px) */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Smart Surveillance & AI CCTV Solutions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Protect your enterprise assets, warehouses, and commercial spaces with high-definition IP cameras, smart PTZ domes, bullet cameras, NVRs, and AI video analytics.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {surveillanceItems.map((cam, i) => (
              <button
                key={i}
                onClick={() => handleOpenQuote("CCTV Surveillance", `${cam.title} Setup`)}
                className="relative rounded-xl overflow-hidden aspect-square flex items-center justify-center p-3 border border-slate-200 shadow-xs cursor-pointer group hover:shadow-md hover:border-black transition-all text-left block w-full"
              >
                <img
                  src={cam.image}
                  alt={cam.title}
                  width="400"
                  height="400"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-colors duration-300" />
                <h3 className="relative z-10 text-white font-extrabold text-xs sm:text-sm text-center px-1 tracking-wide drop-shadow-md">
                  {cam.title}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* DEPLOYMENT PROCESS (5 STEPS) */}
      <section className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Enterprise Deployment Workflow
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Comprehensive turnkey network engineering and structured cabling from blueprint design to 24/7 post-deployment maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { num: "01", title: "Site Survey & RF Audit", desc: "Physical premise inspection, fiber path tracing, and wireless heatmapping." },
              { num: "02", title: "Architecture & Design", desc: "VLAN segmentation, firewall policies, Layer 3 routing, and PoE power budgets." },
              { num: "03", title: "Hardware Procurement", desc: "Tier-1 OEM certified sourcing with 18% GST tax invoices and serial tracking." },
              { num: "04", title: "Installation & Commissioning", desc: "Rack mounting, structured Cat6/fiber termination, and throughput stress testing." },
              { num: "05", title: "SLA Support & Monitoring", desc: "Pan-India onsite RMA support, firmware updates, and 24/7 network monitoring." },
            ].map((step, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col justify-between transition-all hover:border-slate-400 hover:shadow-xs">
                <div>
                  <div className="w-8 h-8 bg-[#1546a0] text-white font-black text-xs flex items-center justify-center mb-3 rounded-md">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5">{step.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY SECTION */}
      <section className="pt-14 pb-6 bg-white border-t border-slate-200">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="p-6 sm:p-10 rounded-2xl border border-purple-300/80 shadow-md relative overflow-hidden bg-gradient-to-br from-pink-200/90 via-fuchsia-100 to-purple-200 flex flex-col lg:flex-row items-center gap-8">
            {/* Atmospheric ambient glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-indigo-500/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-500/25 to-fuchsia-400/25 rounded-full blur-3xl pointer-events-none" />

            <div className="lg:w-1/2 relative z-10">
              <span className="text-purple-900 font-extrabold tracking-wider uppercase text-xs mb-1.5 block">
                Enterprise Deployment Case Study
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-slate-950 mb-3 tracking-tight">
                High-Density Network & Surveillance Deployment for 300+ Users
              </h2>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6">
                Authentic Infosystem engineered and executed a fully redundant Cisco core network, Fortinet multi-WAN SD-WAN security perimeter, and unified AI CCTV surveillance infrastructure across 3 floors with zero downtime cutover.
              </p>
              <button
                onClick={() => handleOpenQuote("Enterprise", "Corporate Network Overhaul")}
                className="px-6 py-2.5 bg-[#1546a0] hover:bg-[#003d7e] text-white font-bold text-xs uppercase tracking-wider rounded-md cursor-pointer transition-colors shadow-xs"
              >
                Consult Our Solution Architect
              </button>
            </div>

            <div className="lg:w-1/2 grid grid-cols-2 gap-3 sm:gap-4 w-full relative z-10">
              <div className="bg-white/90 hover:bg-white border border-white/80 hover:border-purple-300/80 rounded-xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all">
                <div className="text-2xl sm:text-3xl font-black text-slate-950 mb-1">99.99%</div>
                <p className="text-slate-600 text-xs font-medium">Uptime SLA Guaranteed</p>
              </div>
              <div className="bg-white/90 hover:bg-white border border-white/80 hover:border-purple-300/80 rounded-xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all">
                <div className="text-2xl sm:text-3xl font-black text-slate-950 mb-1">10 Gbps</div>
                <p className="text-slate-600 text-xs font-medium">Fiber Backbone Throughput</p>
              </div>
              <div className="bg-white/90 hover:bg-white border border-white/80 hover:border-purple-300/80 rounded-xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all">
                <div className="text-2xl sm:text-3xl font-black text-slate-950 mb-1">128+</div>
                <p className="text-slate-600 text-xs font-medium">AI Smart IP Cameras</p>
              </div>
              <div className="bg-white/90 hover:bg-white border border-white/80 hover:border-purple-300/80 rounded-xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all">
                <div className="text-2xl sm:text-3xl font-black text-slate-950 mb-1">Zero</div>
                <p className="text-slate-600 text-xs font-medium">Business Interruption Migration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOM NETWORK INFRASTRUCTURE CTA (Card matching upper card size with Red to Pink gradient) */}
      <section className="pt-2 pb-16 bg-white">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="p-8 sm:p-12 lg:p-14 rounded-2xl border border-rose-300/80 shadow-md relative overflow-hidden bg-gradient-to-br from-red-100 via-rose-100 to-pink-200/90 text-center">
            {/* Atmospheric ambient glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-rose-500/20 to-pink-500/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-red-500/20 to-rose-400/25 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
              <p className="text-xs font-bold text-rose-900 tracking-[4px] uppercase mb-3">
                INFRASTRUCTURE SOLUTIONS
              </p>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 mb-4 tracking-tight">
                Design Your Enterprise Network & Security Infrastructure
              </h2>
              <p className="text-slate-700 text-xs sm:text-sm md:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
                Need custom multi-site VPNs, 10G/40G fiber aggregation, high-density Wi-Fi 7 access, or centralized AI video surveillance? Our certified Cisco & Fortinet engineers craft tailored architectures with manufacturer warranty.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => handleOpenQuote("Enterprise", "Full Network & CCTV Solution")}
                  className="px-8 py-3.5 bg-[#1546a0] hover:bg-[#003d7e] text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-md transition-all cursor-pointer"
                >
                  Request Infrastructure Quote
                </button>
                <a
                  href="https://wa.me/919643990077?text=Hi%2C%20I%20want%20to%20request%20a%20commercial%20quote%20for%20networking%20and%20CCTV%20solutions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-md transition-all cursor-pointer"
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
