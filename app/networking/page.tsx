"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/shared/PageHero";
import SectionHeader from "../components/shared/SectionHeader";
import ProductCard from "../components/shared/ProductCard";
import { useState, useMemo, useEffect } from "react";
import { FaSearch, FaTimes, FaNetworkWired, FaWhatsapp } from "react-icons/fa";

import { surveillanceItems, networkingProducts } from "../data/networkingData";

const categories = ['All', 'Enterprise Networking', 'Wireless Access Points', 'Managed Switches', 'Firewalls', 'Routers', 'Fiber Solutions', 'Server Racks', 'Cabling'];

export default function NetworkingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

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

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <PageHero
        title="The Backbone of Modern Business."
        subtitle="Enterprise networking, Wi-Fi, surveillance, structured cabling, and security solutions designed for businesses of every size."
        miniText="NETWORKING & INFRASTRUCTURE"
        primaryButtonText="Explore Solutions"
        secondaryButtonText="Request Consultation"
      />

      {/* Solution Categories & Search Bar */}
      <section className="py-6 sm:py-8 page-container border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-md mx-auto mb-4">
          <div className="relative">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
            <input
              type="text"
              placeholder="Search networking (e.g., Cisco switch, Fortinet firewall, Wi-Fi 6)..."
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

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all text-xs sm:text-sm font-medium cursor-pointer ${
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

      {/* Featured Hardware */}
      <section className="py-10 sm:py-14 page-container">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <SectionHeader title="Featured Hardware" subtitle="Industry-leading equipment from trusted global partners." />
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
              <FaNetworkWired size={26} />
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
                  We currently don't have <span className="font-bold text-slate-900">"{searchQuery}"</span> in our active online catalogue, but it will be available soon. Contact our enterprise infrastructure team for custom B2B procurement.
                </>
              ) : (
                <>
                  No hardware matches the selected category right now. We regularly expand our partner portfolio and these configurations will be available soon.
                </>
              )}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/919643990077?text=Hi%2C%20I%20am%20looking%20for%20a%20quote%20for%20${encodeURIComponent(searchQuery || activeCategory || 'networking hardware')}.%20Please%20let%20me%20know%20availability.`}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
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

      {/* CCTV Section */}
      <section className="py-12 sm:py-16 bg-slate-50 page-container border-t border-b border-slate-200">
        <SectionHeader title="Smart Surveillance (CCTV)" subtitle="Protect your assets with advanced AI-powered video security." />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 mt-6">
          {surveillanceItems.map((cam, i) => (
            <a
              key={i}
              href={`https://wa.me/919643990077?text=${encodeURIComponent(`Hi, I am interested in ${cam.title} CCTV & smart surveillance solutions from Authentic Infosystem.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-[18px] overflow-hidden aspect-square flex items-center justify-center p-2.5 border border-slate-200 shadow-sm cursor-pointer group hover:shadow-md hover:border-black hover:-translate-y-1 transition-all duration-300 block"
            >
              <img
                src={cam.image}
                alt={cam.title}
                width="400"
                height="400"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
              <span className="relative z-10 text-white font-bold text-xs sm:text-xs md:text-sm text-center px-1 tracking-tight drop-shadow-md group-hover:scale-105 transition-all duration-300">
                {cam.title}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Solution Process Timeline */}
      <section className="py-12 sm:py-16 page-container">
        <SectionHeader title="Our Deployment Process" align="center" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mt-8 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
          {['Site Survey', 'Requirement Analysis', 'Network Design', 'Installation & Testing', 'Maintenance & Support'].map((step, i) => (
            <div key={i} className="relative z-10 bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 text-center">
              <div className="w-12 h-12 mx-auto bg-black text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 border-4 border-slate-50 shadow-sm">
                {i + 1}
              </div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">{step}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study */}
      <section className="py-12 sm:py-16 page-container border-t border-slate-200">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 lg:p-14 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 shadow-sm">
          <div className="lg:w-1/2">
            <span className="text-black font-extrabold tracking-wider uppercase text-xs sm:text-sm mb-2 block">Case Study</span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Network Deployment for a 300-User Corporate Office</h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              Authentic Infosystem successfully overhauled the legacy infrastructure for a leading tech firm, implementing a fully redundant Cisco-based core network with Wi-Fi 6 coverage across 3 floors.
            </p>
            <button className="px-6 py-2.5 sm:py-3 bg-white hover:bg-slate-100 rounded-xl transition-colors font-bold text-sm border border-slate-300 text-slate-800 shadow-xs cursor-pointer">Read Full Case Study</button>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-3 sm:gap-4 w-full">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
              <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">99.9%</h4>
              <p className="text-slate-500 text-xs sm:text-sm">Uptime Achieved</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
              <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">35%</h4>
              <p className="text-slate-500 text-xs sm:text-sm">Faster Speeds</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
              <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">24×7</h4>
              <p className="text-slate-500 text-xs sm:text-sm">Active Monitoring</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
              <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">Zero</h4>
              <p className="text-slate-500 text-xs sm:text-sm">Downtime Migration</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 text-center page-container border-t border-slate-200">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 sm:mb-4">Need a complete networking solution?</h2>
        <p className="text-slate-600 text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl mx-auto">Let our certified network engineers design the perfect infrastructure for your business needs.</p>
        <a
          href="https://wa.me/919643990077?text=Hi%2C%20I%20want%20to%20book%20a%20site%20visit%20for%20an%20enterprise%20networking%20solution."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 sm:px-8 py-3.5 bg-black hover:bg-zinc-800 text-white rounded-full font-bold text-sm transition-all shadow-md cursor-pointer"
        >
          Book Site Visit
        </a>
      </section>

      <Footer />
    </main>
  );
}
