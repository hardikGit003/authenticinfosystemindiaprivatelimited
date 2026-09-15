"use client";

import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/shared/PageHero";
import SectionHeader from "../components/shared/SectionHeader";
import ProductCard from "../components/shared/ProductCard";
import { desktopProducts } from "../data/products";

const categories = ["All", "Basic", "Gaming", "Editing", "Enterprise"];
const brands = ["All", "Lenovo", "HP", "Dell", "Asus"];
const processors = ["All", "Intel Core i3", "Intel Core i5", "Intel Core i7", "Intel Core i9", "AMD Ryzen 5", "AMD Ryzen 7"];
const rams = ["All", "8GB", "16GB", "32GB", "64GB"];

const popularConfigs = [
  {
    title: "Office Package",
    image: "/Desktop%20Subpage/Office%20Package.jpg",
  },
  {
    title: "Developer Package",
    image: "/Desktop%20Subpage/Developer%20Package.jpg",
  },
  {
    title: "Video Editing Package",
    image: "/Desktop%20Subpage/Video%20Editing%20Package.jpg",
  },
  {
    title: "AI Training Package",
    image: "/Desktop%20Subpage/AI%20Training%20.jpg",
  },
  {
    title: "AutoCAD Package",
    image: "/Desktop%20Subpage/Autocad%20Package.jpg",
  },
  {
    title: "Enterprise Package",
    image: "/Desktop%20Subpage/Enterprise%20Package.jpg",
  },
];

export default function DesktopsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrand, setActiveBrand] = useState("All");
  const [activeProcessor, setActiveProcessor] = useState("All");
  const [activeRAM, setActiveRAM] = useState("All");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return desktopProducts.filter((product) => {
      // Search Filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.modelNumber.toLowerCase().includes(searchQuery.toLowerCase());

      // Category Filter
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      // Brand Filter
      const matchesBrand = activeBrand === "All" || product.brand === activeBrand;

      // Processor Filter
      const matchesProcessor =
        activeProcessor === "All" ||
        product.specs.some(
          (spec) =>
            spec.label === "Processor" &&
            spec.value.toLowerCase().includes(activeProcessor.toLowerCase())
        );

      // RAM Filter
      const matchesRAM =
        activeRAM === "All" ||
        product.specs.some(
          (spec) =>
            spec.label === "RAM" &&
            spec.value.toLowerCase().includes(activeRAM.toLowerCase())
        );

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesProcessor &&
        matchesRAM
      );
    });
  }, [searchQuery, activeCategory, activeBrand, activeProcessor, activeRAM]);

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/20">
      <Navbar />

      <PageHero
        title="Uncompromising Performance."
        subtitle="Professional desktops engineered for engineering, development, AI, business operations, and enterprise computing."
        miniText="ENTERPRISE WORKSTATIONS"
        primaryButtonText="Explore Workstations"
        secondaryButtonText="Get Quote"
      />

      {/* Main Content */}
      <section className="py-12 sm:py-20 page-container">
        
        <SectionHeader title="Desktop Categories" align="center" />
        
        {/* Featured Categories Row */}
        <div className="flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-2.5 sm:gap-4 mb-10 sm:mb-16 mt-4 sm:mt-8 pb-3 sm:pb-0 scrollbar-hide w-full">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-5 sm:px-6 py-2 sm:py-2.5 rounded-full border transition-all text-xs sm:text-sm font-semibold shrink-0 cursor-pointer ${
                activeCategory === cat
                  ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/25"
                  : "bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile Filters Toggle Button */}
        <button
          onClick={() => setShowMobileFilters((prev) => !prev)}
          className="lg:hidden w-full mb-6 py-3.5 px-5 rounded-2xl bg-[#042442] border border-white/10 text-white font-semibold flex items-center justify-between text-sm cursor-pointer shadow-md"
        >
          <span className="flex items-center gap-2.5">
            <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter Products
          </span>
          <span className="text-sky-400 text-xs font-bold">{showMobileFilters ? "Hide ▲" : "Show ▼"}</span>
        </button>

        <div className="grid-12">
          
          {/* Left Sidebar Filters */}
          <div className={`col-span-12 lg:col-span-3 ${showMobileFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-[#042442] border border-white/10 rounded-2xl p-6 shadow-xl sticky top-32 text-white relative overflow-hidden">
              {/* Subtle ambient lighting */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                  <h3 className="text-xl font-extrabold text-white tracking-tight">Filters</h3>
                  {(searchQuery || activeBrand !== "All" || activeProcessor !== "All" || activeRAM !== "All") && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setActiveBrand("All");
                        setActiveProcessor("All");
                        setActiveRAM("All");
                      }}
                      className="text-xs text-sky-400 hover:text-sky-300 font-semibold cursor-pointer transition-colors"
                    >
                      Reset All
                    </button>
                  )}
                </div>
                
                <div className="space-y-5">
                  <div>
                    <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">Search Products</h4>
                    <input
                      type="text"
                      placeholder="Search models..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#031d36] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">Brand</h4>
                    <div className="relative">
                      <select
                        value={activeBrand}
                        onChange={(e) => setActiveBrand(e.target.value)}
                        className="w-full bg-[#031d36] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all appearance-none cursor-pointer pr-10"
                      >
                        {brands.map((brand) => (
                          <option key={brand} value={brand} className="bg-[#042442] text-white">
                            {brand}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-sky-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">Processor</h4>
                    <div className="relative">
                      <select
                        value={activeProcessor}
                        onChange={(e) => setActiveProcessor(e.target.value)}
                        className="w-full bg-[#031d36] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all appearance-none cursor-pointer pr-10"
                      >
                        {processors.map((proc) => (
                          <option key={proc} value={proc} className="bg-[#042442] text-white">
                            {proc}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-sky-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">RAM</h4>
                    <div className="relative">
                      <select
                        value={activeRAM}
                        onChange={(e) => setActiveRAM(e.target.value)}
                        className="w-full bg-[#031d36] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all appearance-none cursor-pointer pr-10"
                      >
                        {rams.map((ram) => (
                          <option key={ram} value={ram} className="bg-[#042442] text-white">
                            {ram}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-sky-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-span-12 lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No products found</h3>
                <p className="text-slate-500">Try adjusting your filters or search query.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                    setActiveBrand("All");
                    setActiveProcessor("All");
                    setActiveRAM("All");
                  }}
                  className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all shadow-sm"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((desktop, index) => (
                  <ProductCard
                    key={desktop.id}
                    {...desktop}
                    delay={(index % 6) * 0.1}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Popular Configurations */}
      <section className="py-12 sm:py-16 page-container border-t border-slate-200">
        <SectionHeader title="Popular Configurations" align="center" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
          {popularConfigs.map((pkg, i) => (
            <a
              key={i}
              href={`https://wa.me/919643990077?text=${encodeURIComponent(`Hi, I am interested in the ${pkg.title} desktop configuration from Authentic Infosystem.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-[22px] overflow-hidden min-h-[150px] sm:min-h-[170px] flex items-center justify-center p-6 border border-slate-200 shadow-sm cursor-pointer group hover:shadow-md hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 block"
            >
              <img
                src={pkg.image}
                alt={pkg.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/30 transition-colors duration-300" />
              <h3 className="relative z-10 text-white font-extrabold text-lg sm:text-xl md:text-2xl text-center px-4 tracking-wide drop-shadow-md group-hover:scale-105 transition-all duration-300">
                {pkg.title}
              </h3>
            </a>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 sm:py-16 text-center page-container border-t border-slate-200">
        <div className="max-w-4xl mx-auto p-8 sm:p-12 bg-slate-900 text-white rounded-3xl relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 relative z-10">Build Your Custom Desktop</h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto relative z-10">Don't see exactly what you need? We build custom workstations tailored to your specific enterprise requirements.</p>
          <a
            href="https://wa.me/919643990077?text=Hi%2C%20I%20want%20to%20request%20a%20custom%20desktop%20configuration%20from%20Authentic%20Infosystem."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block relative z-10 px-6 sm:px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-sm transition-all shadow-md shadow-blue-500/20 hover:scale-105"
          >
            Request Configuration
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
