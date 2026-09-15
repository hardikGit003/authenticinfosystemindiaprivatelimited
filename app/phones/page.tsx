"use client";

import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/shared/PageHero";
import SectionHeader from "../components/shared/SectionHeader";
import ProductCard from "../components/shared/ProductCard";
import { phoneProducts } from "../data/products";
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
  FaBolt
} from "react-icons/fa";

const categories = ["All", "Flagship", "Camera & Creator", "Foldable", "Performance", "Enterprise Fleet"];
const brands = ["All", "Apple", "Samsung", "Vivo", "Oppo", "Realme"];
const rams = ["All", "6GB", "8GB", "12GB", "16GB"];
const storages = ["All", "128GB", "256GB", "512GB", "1TB"];

const highlightUseCases = [
  {
    title: "Executive Flagships",
    subtitle: "Apple iPhone 16 Pro & Galaxy S24 Ultra",
    desc: "Titanium grade durability, hardware security enclaves, and peak productivity.",
    icon: "💎",
  },
  {
    title: "Foldables & Multitasking",
    subtitle: "Galaxy Z Fold6 & Find N3 Flip",
    desc: "Dual-screen workflows, side-by-side apps, and next-gen portable computing.",
    icon: "📱",
  },
  {
    title: "ZEISS & Hasselblad Cameras",
    subtitle: "Vivo X100 Pro & Oppo Find X7",
    desc: "Studio-grade mobile imaging, 4K HDR recording, and creator-level optics.",
    icon: "📸",
  },
  {
    title: "Enterprise Fleet & Bulk Supply",
    subtitle: "Vivo V40, Reno 12 & Realme 13",
    desc: "Reliable 5G deployment, MDM compatibility, and fast nationwide procurement.",
    icon: "🏢",
  },
];

export default function PhonesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrand, setActiveBrand] = useState("All");
  const [activeRAM, setActiveRAM] = useState("All");
  const [activeStorage, setActiveStorage] = useState("All");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/20">
      <Navbar />

      {/* Hero Section */}
      <PageHero
        title="Next-Gen Smartphones. Enterprise & Flagships."
        subtitle="Authorized procurement for the latest flagship, foldable, and performance devices from Apple, Samsung, Vivo, Oppo, and Realme with official warranties and bulk pricing."
        miniText="AUTHORIZED SMARTPHONE DISTRIBUTOR"
      />

      {/* Highlights Bar */}
      <section className="bg-slate-50 border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {highlightUseCases.map((uc, i) => (
              <div 
                key={i} 
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all hover:border-blue-300 group"
              >
                <div className="text-3xl mb-3">{uc.icon}</div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {uc.title}
                </h3>
                <p className="text-xs font-semibold text-blue-600 mb-1">{uc.subtitle}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Explore Smartphone Lineup" 
          subtitle="Direct manufacturer sourcing with genuine warranty, IMEI registration, and corporate invoice compliance."
          align="center" 
        />

        {/* Category Filter Pills */}
        <div className="flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 mt-4 sm:mt-8 pb-3 sm:pb-0 scrollbar-hide w-full">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 sm:px-5 py-2 rounded-full border transition-all text-xs sm:text-sm font-semibold shrink-0 cursor-pointer ${
                activeCategory === cat
                  ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/25"
                  : "bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile Filters Button */}
        <div className="lg:hidden mb-6 flex gap-3">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search phone model, chip, camera..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm shadow-sm"
          >
            <FaFilter size={13} />
            <span>Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* DESKTOP SIDEBAR FILTERS */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            {/* Search Box */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FaSearch className="text-blue-600" size={14} />
                <span>Search Devices</span>
              </h4>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. iPhone 16, S24, Vivo, 512GB..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-500 text-slate-900"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <FaTimes size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-slate-900">Brand</h4>
                {activeBrand !== "All" && (
                  <button
                    onClick={() => setActiveBrand("All")}
                    className="text-xs text-blue-600 font-semibold hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="space-y-1.5">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setActiveBrand(brand)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                      activeBrand === brand
                        ? "bg-blue-600 text-white font-semibold"
                        : "text-slate-700 hover:bg-slate-200/70"
                    }`}
                  >
                    <span>{brand}</span>
                    {activeBrand === brand && <FaCheckCircle size={12} />}
                  </button>
                ))}
              </div>
            </div>

            {/* RAM Filter */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-slate-900">RAM Capacity</h4>
                {activeRAM !== "All" && (
                  <button
                    onClick={() => setActiveRAM("All")}
                    className="text-xs text-blue-600 font-semibold hover:underline"
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
                    className={`text-center py-2 rounded-lg text-xs font-semibold transition-all border ${
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

            {/* Storage Filter */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-slate-900">Storage</h4>
                {activeStorage !== "All" && (
                  <button
                    onClick={() => setActiveStorage("All")}
                    className="text-xs text-blue-600 font-semibold hover:underline"
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
                    className={`text-center py-2 rounded-lg text-xs font-semibold transition-all border ${
                      activeStorage === storage
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear All Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-semibold transition-all"
              >
                Clear All Filters
              </button>
            )}

            {/* Enterprise B2B Quote Help */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none"></div>
              <FaBuilding className="text-blue-400 mb-3" size={24} />
              <h4 className="text-base font-bold mb-1">Corporate Bulk Fleet</h4>
              <p className="text-xs text-blue-100/90 leading-relaxed mb-4">
                Procuring 10+ smartphones for your executive team or sales fleet? Get dedicated account pricing with GST input tax credit.
              </p>
              <a
                href="https://wa.me/919643990077?text=Hi%2C%20I%20am%20looking%20for%20a%20bulk%20enterprise%20quote%20for%20smartphones."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition-all shadow-md"
              >
                <FaWhatsapp size={15} />
                <span>Request B2B Quote</span>
              </a>
            </div>
          </div>

          {/* PRODUCT LIST GRID */}
          <div className="lg:col-span-3">
            {/* Header info bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span>Showing</span>
                <span className="font-bold text-slate-900">{filteredProducts.length}</span>
                <span>devices</span>
                {activeBrand !== "All" && (
                  <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-blue-200">
                    {activeBrand}
                  </span>
                )}
                {activeCategory !== "All" && (
                  <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-slate-200">
                    {activeCategory}
                  </span>
                )}
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {filteredProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    modelNumber={product.modelNumber}
                    image={product.image}
                    price={product.price}
                    specs={product.specs}
                    badges={product.badges}
                    warranty={product.warranty}
                    delay={idx * 0.05}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-50 border border-slate-200 rounded-3xl p-8">
                <FaMobileAlt className="mx-auto text-slate-400 mb-4" size={48} />
                <h3 className="text-lg font-bold text-slate-900 mb-1">No matching devices found</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                  We could not find any smartphone matching your exact filter criteria. Try resetting your filters or contacting our procurement desk.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MOBILE FILTERS MODAL */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[85vh] overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FaFilter className="text-blue-600" size={16} />
                <span>Filter Smartphones</span>
              </h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Brand in Mobile */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">Brand</h4>
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setActiveBrand(brand)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      activeBrand === brand
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Category in Mobile */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">Category</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      activeCategory === cat
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* RAM in Mobile */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">RAM</h4>
              <div className="flex flex-wrap gap-2">
                {rams.map((ram) => (
                  <button
                    key={ram}
                    onClick={() => setActiveRAM(ram)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      activeRAM === ram
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {ram}
                  </button>
                ))}
              </div>
            </div>

            {/* Storage in Mobile */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">Storage</h4>
              <div className="flex flex-wrap gap-2">
                {storages.map((storage) => (
                  <button
                    key={storage}
                    onClick={() => setActiveStorage(storage)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      activeStorage === storage
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-200 flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold rounded-xl text-center"
              >
                Reset
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl text-center shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WHY BUY SMARTPHONES FROM AUTHENTIC INFOSYSTEM */}
      <section className="bg-slate-50 border-t border-slate-200 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Why Procure From Authentic Infosystem"
            subtitle="Direct distributor access, authentic IMEI serial tracking, enterprise billing, and hassle-free warranty fulfillment."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl">
                <FaShieldAlt />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">100% Genuine Brand Sourcing</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Brand-new sealed boxes with manufacturer warranty, valid AppleCare / Samsung Care eligibility, and GST input tax credit for businesses.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl">
                <FaTruck />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Insured Express Pan-India Delivery</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Secure, tamper-evident logistics with door-to-door tracking for both single orders and multi-location corporate distributions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl">
                <FaHeadset />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Dedicated Account Manager</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Single point of contact for bulk quotes, customized device deployment, accessory pairing, and post-purchase enterprise support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
