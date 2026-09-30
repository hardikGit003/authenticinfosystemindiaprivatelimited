"use client";

import { useState, useMemo, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/shared/PageHero";
import SectionHeader from "../components/shared/SectionHeader";
import { phoneProducts, Product } from "../data/products";
import { motion } from "framer-motion";
import { 
  FaMobileAlt, 
  FaShieldAlt, 
  FaTruck, 
  FaHeadset, 
  FaFilter, 
  FaTimes, 
  FaSearch, 
  FaWhatsapp, 
  FaBuilding, 
  FaCheckCircle,
  FaMicrochip,
  FaCamera,
  FaTv,
  FaBatteryFull
} from "react-icons/fa";

const categories = ["All", "Flagship", "Camera & Creator", "Foldable", "Performance", "Enterprise Fleet"];
const brands = ["All", "Apple", "Samsung", "Vivo", "Oppo", "Realme"];
const rams = ["All", "6GB", "8GB", "12GB", "16GB"];
const storages = ["All", "128GB", "256GB", "512GB", "1TB"];

function CompactPhoneCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  const getSpecValue = (label: string) => {
    const found = product.specs.find((s) => s.label.toLowerCase() === label.toLowerCase());
    return found ? found.value : "";
  };

  const processor = getSpecValue("Processor");
  const camera = getSpecValue("Camera");
  const display = getSpecValue("Display");
  const battery = getSpecValue("Battery");

  const getBatteryLabel = (bat: string) => {
    if (!bat) return "";
    const mah = bat.match(/\d+mAh/i);
    if (mah) return mah[0];
    const hrs = bat.match(/(\d+)\s*Hours?/i);
    if (hrs) return `${hrs[1]}h Video`;
    return bat.split(" ")[0] === "Up" ? "All-Day" : bat.split(" ")[0];
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Authentic Infosystem, I would like to inquire about pricing, stock and quotation for ${product.name} (${product.modelNumber}).`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
      className="group bg-white border border-slate-200 hover:border-black rounded-2xl shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col h-full relative overflow-hidden"
    >
      {/* Top Image Box */}
      <div className="relative w-full h-44 bg-gradient-to-b from-slate-50/80 to-slate-100/60 p-4 flex items-center justify-center border-b border-slate-100 overflow-hidden">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          width="200"
          height="200"
          className="object-contain max-h-[135px] max-w-[125px] w-auto drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Model ID & Name */}
        <div className="mb-2.5">
          <p className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase mb-0.5">
            {product.modelNumber}
          </p>
          <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-black transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Price */}
        <div className="mb-3">
          <span className="text-base sm:text-lg font-extrabold text-slate-950">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(product.price)}
          </span>
          <span className="text-[11px] text-slate-400 ml-1.5 font-normal">excl. GST / MRP</span>
        </div>

        {/* Compact Key Spec Badges (2x2 Grid) */}
        <div className="grid grid-cols-2 gap-1.5 mb-3 text-[11px] text-slate-600">
          {processor && (
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-2 py-1 rounded-lg truncate" title={processor}>
              <FaMicrochip className="text-slate-700 shrink-0 text-[10px]" />
              <span className="truncate">{processor.replace(/Apple|Snapdragon|MediaTek/g, "").trim()}</span>
            </div>
          )}
          {display && (
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-2 py-1 rounded-lg truncate" title={display}>
              <FaTv className="text-slate-700 shrink-0 text-[10px]" />
              <span className="truncate">{display.split(" ")[0]} AMOLED</span>
            </div>
          )}
          {camera && (
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-2 py-1 rounded-lg truncate" title={camera}>
              <FaCamera className="text-emerald-500 shrink-0 text-[10px]" />
              <span className="truncate">{camera.split("+")[0].trim()}</span>
            </div>
          )}
          {battery && (
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-2 py-1 rounded-lg truncate" title={battery}>
              <FaBatteryFull className="text-amber-500 shrink-0 text-[10px]" />
              <span className="truncate">{getBatteryLabel(battery)}</span>
            </div>
          )}
        </div>

        {/* Warranty Tag */}
        <div className="mt-auto pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 mb-3">
          <span className="flex items-center gap-1 text-emerald-700 font-medium truncate max-w-[85%]">
            <FaCheckCircle className="text-emerald-600 text-[10px] shrink-0" />
            <span className="truncate">{product.warranty}</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`https://wa.me/919643990077?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold transition-colors"
          >
            <FaWhatsapp size={13} className="text-emerald-600 shrink-0" />
            <span>Inquire</span>
          </a>
          <a
            href="/#contact"
            className="flex items-center justify-center py-2 px-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white text-xs font-semibold transition-colors shadow-2xs text-center"
          >
            Get Quote
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function PhonesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrand, setActiveBrand] = useState("All");
  const [activeRAM, setActiveRAM] = useState("All");
  const [activeStorage, setActiveStorage] = useState("All");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
    return phoneProducts.filter((product) => {
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
      const matchesBrand =
        activeBrand === "All" || product.brand.toLowerCase() === activeBrand.toLowerCase();

      // RAM Filter
      const matchesRAM =
        activeRAM === "All" ||
        product.specs.some(
          (spec) =>
            spec.label === "RAM" &&
            spec.value.toLowerCase().includes(activeRAM.toLowerCase())
        );

      // Storage Filter
      const matchesStorage =
        activeStorage === "All" ||
        product.specs.some(
          (spec) =>
            spec.label === "Storage" &&
            spec.value.toLowerCase().includes(activeStorage.toLowerCase())
        );

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesRAM &&
        matchesStorage
      );
    });
  }, [searchQuery, activeCategory, activeBrand, activeRAM, activeStorage]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setActiveBrand("All");
    setActiveRAM("All");
    setActiveStorage("All");
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    activeCategory !== "All" ||
    activeBrand !== "All" ||
    activeRAM !== "All" ||
    activeStorage !== "All";

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <PageHero
        title="Next-Gen Smartphones. Enterprise Mobility."
        subtitle="Authorized procurement for the latest flagship, foldable, and performance devices from Apple, Samsung, Vivo, Oppo, and Realme with official warranties and bulk pricing."
        miniText="AUTHORIZED SMARTPHONE DISTRIBUTOR"
      />

      {/* Main Content */}
      <section className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Explore Smartphone Lineup" 
          subtitle="Direct manufacturer sourcing with genuine warranty, IMEI registration, and corporate invoice compliance."
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
                  ? "bg-black border-black text-white shadow-xs"
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
              placeholder="Search phone model, brand, chip..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-black"
            />
          </div>
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-black text-white rounded-xl font-semibold text-xs shadow-xs shrink-0"
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
                  <FaFilter className="text-black" size={12} />
                  <span>Filter Lineup</span>
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-black hover:underline font-semibold cursor-pointer"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Search Box */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Search Devices
                </label>
                <div className="relative">
                  <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                  <input
                    type="text"
                    placeholder="e.g. iPhone, S24, Vivo, 512GB..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-black text-slate-900 shadow-2xs"
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
                      className="text-[11px] text-black font-semibold hover:underline"
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
                          ? "bg-black text-white font-semibold shadow-xs"
                          : "text-slate-700 hover:bg-slate-200/60 bg-white/60 border border-slate-200/50"
                      }`}
                    >
                      <span>{brand}</span>
                      {activeBrand === brand && <FaCheckCircle size={11} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* RAM Filter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    RAM Capacity
                  </label>
                  {activeRAM !== "All" && (
                    <button
                      onClick={() => setActiveRAM("All")}
                      className="text-[11px] text-black font-semibold hover:underline"
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
                          ? "bg-black text-white border-black shadow-xs"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {ram}
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage Filter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Internal Storage
                  </label>
                  {activeStorage !== "All" && (
                    <button
                      onClick={() => setActiveStorage("All")}
                      className="text-[11px] text-black font-semibold hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {storages.map((storage) => (
                    <button
                      key={storage}
                      onClick={() => setActiveStorage(storage)}
                      className={`text-center py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                        activeStorage === storage
                          ? "bg-black text-white border-black shadow-xs"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {storage}
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
            <div className="bg-gradient-to-br from-zinc-900 to-black text-white p-5 rounded-2xl shadow-md relative overflow-hidden border border-zinc-800">
              <FaBuilding className="text-white mb-2.5" size={20} />
              <h4 className="text-sm font-bold mb-1">Corporate Bulk Fleet</h4>
              <p className="text-[11px] text-zinc-300 leading-relaxed mb-3.5">
                Procuring 5+ smartphones for executives or field workforce? Get customized pricing with GST invoicing.
              </p>
              <a
                href="https://wa.me/919643990077?text=Hi%2C%20I%20am%20looking%20for%20a%20bulk%20enterprise%20quote%20for%20smartphones."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition-all shadow-sm"
              >
                <FaWhatsapp size={14} />
                <span>Request B2B Quote</span>
              </a>
            </div>
          </div>

          {/* COMPACT PRODUCT LIST GRID */}
          <div className="lg:col-span-3">
            {/* Header info bar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 mb-5 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span>Showing</span>
                <span className="font-bold text-slate-900">{filteredProducts.length}</span>
                <span>devices</span>
                {activeBrand !== "All" && (
                  <span className="bg-zinc-100 text-zinc-900 text-[11px] px-2 py-0.5 rounded-full font-semibold border border-zinc-300">
                    {activeBrand}
                  </span>
                )}
                {activeCategory !== "All" && (
                  <span className="bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded-full font-semibold border border-slate-200">
                    {activeCategory}
                  </span>
                )}
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-black hover:underline font-semibold"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Compact Professional Responsive Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5">
                {filteredProducts.map((product, idx) => (
                  <CompactPhoneCard
                    key={product.id}
                    product={product}
                    delay={idx * 0.03}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-xs">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-100 border border-zinc-200 text-zinc-900 mb-3 shadow-2xs">
                  <FaMobileAlt size={26} />
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
                      We currently don't have <span className="font-bold text-slate-900">"{searchQuery}"</span> in immediate catalogue inventory, but it will be available soon. We can arrange direct enterprise batch procurement with official brand warranty.
                    </>
                  ) : (
                    <>
                      No smartphones match the selected filters right now. We regularly expand our inventory and this lineup will be available soon.
                    </>
                  )}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/919643990077?text=Hi%2C%20I%20am%20looking%20for%20a%20quote%20for%20${encodeURIComponent(searchQuery || 'phone')}.%20Please%20let%20me%20know%20availability%20and%20pricing.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-sm cursor-pointer"
                  >
                    <FaWhatsapp size={14} />
                    <span>Inquire Availability on WhatsApp</span>
                  </a>
                  <button
                    onClick={clearAllFilters}
                    className="px-5 py-2.5 bg-black hover:bg-zinc-800 text-white font-semibold rounded-xl text-xs transition-all shadow-xs cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WHY BUY SMARTPHONES FROM AUTHENTIC INFOSYSTEM */}
      <section className="bg-white border-t border-slate-200 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Why Procure From Authentic Infosystem"
            subtitle="Direct distributor access, authentic IMEI serial tracking, enterprise billing, and official brand warranty."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs text-center">
              <div className="w-12 h-12 bg-zinc-100 text-black rounded-xl flex items-center justify-center mx-auto mb-4 text-xl">
                <FaShieldAlt />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">100% Genuine Brand Sourcing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sealed retail boxes with valid manufacturer serial numbers, AppleCare / Samsung Care eligibility, and GST input credit.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs text-center">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-xl">
                <FaTruck />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Pan-India Insured Dispatch</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Express insured door-to-door delivery with live tracking for single devices and multi-location corporate consignments.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs text-center">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-xl">
                <FaHeadset />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Enterprise Mobility Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Assistance with MDM configuration, corporate trade-ins, accessory bundling, and post-purchase priority support.
              </p>
            </div>
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
                  <FaFilter className="text-black" size={14} />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Filter Smartphones
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
                      className="text-[11px] text-black font-semibold hover:underline"
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
                          ? "bg-black text-white font-semibold shadow-xs"
                          : "text-slate-700 hover:bg-slate-100 bg-slate-50 border border-slate-200"
                      }`}
                    >
                      <span>{brand}</span>
                      {activeBrand === brand && <FaCheckCircle size={11} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* RAM Filter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    RAM Capacity
                  </label>
                  {activeRAM !== "All" && (
                    <button
                      onClick={() => setActiveRAM("All")}
                      className="text-[11px] text-black font-semibold hover:underline"
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
                          ? "bg-black text-white border-black shadow-xs"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {ram}
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage Filter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Internal Storage
                  </label>
                  {activeStorage !== "All" && (
                    <button
                      onClick={() => setActiveStorage("All")}
                      className="text-[11px] text-black font-semibold hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {storages.map((storage) => (
                    <button
                      key={storage}
                      onClick={() => setActiveStorage(storage)}
                      className={`text-center py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                        activeStorage === storage
                          ? "bg-black text-white border-black shadow-xs"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {storage}
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
                className="w-full py-3 px-3 rounded-xl bg-black hover:bg-zinc-800 text-white text-xs font-bold shadow-md transition-all"
              >
                View {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
