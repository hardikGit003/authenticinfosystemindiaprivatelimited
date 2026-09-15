"use client";

import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/shared/PageHero";
import SectionHeader from "../components/shared/SectionHeader";
import ProductCard from "../components/shared/ProductCard";
import { desktopProducts } from "../data/products";
import { 
  FaFilter, 
  FaTimes, 
  FaSearch, 
  FaCheckCircle, 
  FaDesktop, 
  FaBuilding, 
  FaWhatsapp,
  FaMicrochip
} from "react-icons/fa";

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
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.modelNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.specs.some(
          (s) =>
            s.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.label.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Category Filter
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      // Brand Filter
      const matchesBrand = activeBrand === "All" || product.brand.toLowerCase() === activeBrand.toLowerCase();

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

  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setActiveBrand("All");
    setActiveProcessor("All");
    setActiveRAM("All");
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    activeCategory !== "All" ||
    activeBrand !== "All" ||
    activeProcessor !== "All" ||
    activeRAM !== "All";

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
      <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader 
          title="Explore Desktop Lineup" 
          subtitle="Tower workstations, compact all-in-ones, and high-compute enterprise desktops with manufacturer direct support."
          align="center" 
        />
        
        {/* Category Filter Pills */}
        <div className="flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-2 mb-8 mt-4 sm:mt-6 pb-2 sm:pb-0 scrollbar-hide w-full">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full border transition-all text-xs font-semibold shrink-0 cursor-pointer ${
                activeCategory === cat
                  ? "bg-blue-600 border-blue-600 text-white shadow-xs"
                  : "bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile Search & Filter Bar */}
        <div className="lg:hidden mb-6 flex gap-2.5">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
            <input
              type="text"
              placeholder="Search desktop model, brand, processor, RAM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-xs shadow-xs shrink-0"
          >
            <FaFilter size={12} />
            <span>Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          
          {/* DESKTOP SIDEBAR FILTERS */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-slate-50/90 border border-slate-200 rounded-2xl p-5 shadow-xs space-y-6">
              {/* Header with Title & Reset */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <FaFilter className="text-blue-600" size={12} />
                  <span>Filter Desktops</span>
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Search Box */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Search Desktops
                </label>
                <div className="relative">
                  <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                  <input
                    type="text"
                    placeholder="e.g. ThinkCentre, Dell OptiPlex, 32GB..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 text-slate-900 shadow-2xs"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <FaTimes size={11} />
                    </button>
                  )}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Brand
                  </label>
                  {activeBrand !== "All" && (
                    <button
                      onClick={() => setActiveBrand("All")}
                      className="text-[11px] text-blue-600 font-semibold hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="space-y-1">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setActiveBrand(brand)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        activeBrand === brand
                          ? "bg-blue-600 text-white font-semibold shadow-xs"
                          : "text-slate-700 hover:bg-slate-200/60 bg-white/60 border border-slate-200/50"
                      }`}
                    >
                      <span>{brand}</span>
                      {activeBrand === brand && <FaCheckCircle size={11} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Processor Filter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <FaMicrochip className="text-slate-500" size={11} />
                    <span>Processor</span>
                  </label>
                  {activeProcessor !== "All" && (
                    <button
                      onClick={() => setActiveProcessor("All")}
                      className="text-[11px] text-blue-600 font-semibold hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="space-y-1">
                  {processors.map((proc) => (
                    <button
                      key={proc}
                      onClick={() => setActiveProcessor(proc)}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        activeProcessor === proc
                          ? "bg-blue-600 text-white font-semibold shadow-xs"
                          : "text-slate-700 hover:bg-slate-200/60 bg-white/60 border border-slate-200/50"
                      }`}
                    >
                      <span>{proc}</span>
                      {activeProcessor === proc && <FaCheckCircle size={11} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* RAM Filter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    RAM Memory
                  </label>
                  {activeRAM !== "All" && (
                    <button
                      onClick={() => setActiveRAM("All")}
                      className="text-[11px] text-blue-600 font-semibold hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {rams.map((ram) => (
                    <button
                      key={ram}
                      onClick={() => setActiveRAM(ram)}
                      className={`text-center py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                        activeRAM === ram
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {ram}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear All Filters button */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition-all cursor-pointer"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            {/* Corporate Bulk Fleet Card */}
            <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white p-5 rounded-2xl shadow-md relative overflow-hidden">
              <FaBuilding className="text-blue-400 mb-2.5" size={20} />
              <h4 className="text-sm font-bold mb-1">Custom Workstation Lab</h4>
              <p className="text-[11px] text-blue-100/80 leading-relaxed mb-3.5">
                Setting up CAD labs, design studios, or AI training clusters? Get tailored component configurations with official warranty.
              </p>
              <a
                href="https://wa.me/919643990077?text=Hi%2C%20I%20am%20looking%20for%20a%20custom%20workstation%20quote%20for%20desktops."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition-all shadow-sm"
              >
                <FaWhatsapp size={14} />
                <span>Request Custom Quote</span>
              </a>
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-span-12 lg:col-span-3">
            {/* Header info bar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 mb-5 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span>Showing</span>
                <span className="font-bold text-slate-900">{filteredProducts.length}</span>
                <span>desktops</span>
                {activeBrand !== "All" && (
                  <span className="bg-blue-50 text-blue-700 text-[11px] px-2 py-0.5 rounded-full font-semibold border border-blue-200">
                    {activeBrand}
                  </span>
                )}
                {activeCategory !== "All" && (
                  <span className="bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded-full font-semibold border border-slate-200">
                    {activeCategory}
                  </span>
                )}
                {activeProcessor !== "All" && (
                  <span className="bg-purple-50 text-purple-700 text-[11px] px-2 py-0.5 rounded-full font-semibold border border-purple-200">
                    {activeProcessor}
                  </span>
                )}
                {activeRAM !== "All" && (
                  <span className="bg-amber-50 text-amber-700 text-[11px] px-2 py-0.5 rounded-full font-semibold border border-amber-200">
                    {activeRAM}
                  </span>
                )}
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 p-8">
                <FaDesktop className="mx-auto text-slate-400 mb-3" size={40} />
                <h3 className="text-base font-bold text-slate-900 mb-1">No desktops found</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto mb-5">
                  Try adjusting your search query or reset the filters to browse all workstation builds.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition-all shadow-xs"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((desktop, index) => (
                  <ProductCard
                    key={desktop.id}
                    {...desktop}
                    delay={(index % 6) * 0.05}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Mobile Filter Modal Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs lg:hidden animate-fade-in">
          <div className="fixed inset-0" onClick={() => setShowMobileFilters(false)} />
          <div className="relative ml-auto w-full max-w-xs sm:max-w-sm h-full bg-white shadow-2xl p-5 overflow-y-auto flex flex-col justify-between z-10 animate-slide-left">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <FaFilter className="text-blue-600" size={14} />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Filter Desktops
                  </h3>
                </div>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <FaTimes size={15} />
                </button>
              </div>

              {/* Brand Filter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Brand
                  </label>
                  {activeBrand !== "All" && (
                    <button
                      onClick={() => setActiveBrand("All")}
                      className="text-[11px] text-blue-600 font-semibold hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="space-y-1">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setActiveBrand(brand)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        activeBrand === brand
                          ? "bg-blue-600 text-white font-semibold shadow-xs"
                          : "text-slate-700 hover:bg-slate-100 bg-slate-50 border border-slate-200"
                      }`}
                    >
                      <span>{brand}</span>
                      {activeBrand === brand && <FaCheckCircle size={11} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Processor Filter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Processor
                  </label>
                  {activeProcessor !== "All" && (
                    <button
                      onClick={() => setActiveProcessor("All")}
                      className="text-[11px] text-blue-600 font-semibold hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="space-y-1">
                  {processors.map((proc) => (
                    <button
                      key={proc}
                      onClick={() => setActiveProcessor(proc)}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        activeProcessor === proc
                          ? "bg-blue-600 text-white font-semibold shadow-xs"
                          : "text-slate-700 hover:bg-slate-100 bg-slate-50 border border-slate-200"
                      }`}
                    >
                      <span>{proc}</span>
                      {activeProcessor === proc && <FaCheckCircle size={11} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* RAM Filter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    RAM Memory
                  </label>
                  {activeRAM !== "All" && (
                    <button
                      onClick={() => setActiveRAM("All")}
                      className="text-[11px] text-blue-600 font-semibold hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {rams.map((ram) => (
                    <button
                      key={ram}
                      onClick={() => setActiveRAM(ram)}
                      className={`text-center py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                        activeRAM === ram
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {ram}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-200 mt-6 space-y-2">
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all"
                >
                  Clear All Filters
                </button>
              )}
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-3 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all"
              >
                View {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}

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
