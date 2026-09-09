"use client";

import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/shared/PageHero";
import SectionHeader from "../components/shared/SectionHeader";
import ProductCard from "../components/shared/ProductCard";
import { laptopProducts } from "../data/products";

const categories = ["All", "Basic", "Gaming", "Editing", "Enterprise"];
const brands = ["All", "Lenovo", "HP", "Dell", "Asus"];
const processors = ["All", "Intel Core i3", "Intel Core i5", "Intel Core i7", "Intel Core i9", "Intel Core Ultra 7", "AMD Ryzen 5", "AMD Ryzen 7"];
const rams = ["All", "8GB", "16GB", "32GB", "64GB"];

export default function LaptopsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrand, setActiveBrand] = useState("All");
  const [activeProcessor, setActiveProcessor] = useState("All");
  const [activeRAM, setActiveRAM] = useState("All");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return laptopProducts.filter((product) => {
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
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />

      {/* Hero Section */}
      <PageHero
        title="Enterprise Mobility. Unleashed."
        subtitle="Discover powerful laptops for professionals, businesses, educational institutions, startups, and remote teams. Built for productivity, security, and performance."
        miniText="PREMIUM B2B LAPTOPS"
      />

      {/* Main Content */}
      <section className="py-12 sm:py-20 page-container">
        
        <SectionHeader title="Laptop Categories" align="center" />
        
        {/* Featured Categories Row */}
        <div className="flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-2.5 sm:gap-4 mb-10 sm:mb-16 mt-4 sm:mt-8 pb-3 sm:pb-0 scrollbar-hide w-full">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-5 sm:px-6 py-2 sm:py-2.5 rounded-full border transition-colors text-xs sm:text-sm font-medium shrink-0 ${
                activeCategory === cat
                  ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white/5 border-white/10 hover:bg-white/10 text-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile Filters Toggle Button */}
        <button
          onClick={() => setShowMobileFilters((prev) => !prev)}
          className="lg:hidden w-full mb-6 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium flex items-center justify-between text-sm"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter Products
          </span>
          <span className="text-blue-400 text-xs font-semibold">{showMobileFilters ? "Hide ▲" : "Show ▼"}</span>
        </button>

        <div className="grid-12">
          
          {/* Left Sidebar Filters */}
          <div className={`col-span-12 lg:col-span-3 ${showMobileFilters ? "block" : "hidden lg:block"}`}>
            <div className="glass-panel p-6 sticky top-32">
              <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Filters</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Search Products</h4>
                  <input
                    type="text"
                    placeholder="Search models..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Brand</h4>
                  <select
                    value={activeBrand}
                    onChange={(e) => setActiveBrand(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                  >
                    {brands.map((brand) => (
                      <option key={brand} value={brand} className="bg-gray-900 text-white">
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Processor</h4>
                  <select
                    value={activeProcessor}
                    onChange={(e) => setActiveProcessor(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                  >
                    {processors.map((proc) => (
                      <option key={proc} value={proc} className="bg-gray-900 text-white">
                        {proc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">RAM</h4>
                  <select
                    value={activeRAM}
                    onChange={(e) => setActiveRAM(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                  >
                    {rams.map((ram) => (
                      <option key={ram} value={ram} className="bg-gray-900 text-white">
                        {ram}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-span-12 lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
                <p className="text-gray-400">Try adjusting your filters or search query.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                    setActiveBrand("All");
                    setActiveProcessor("All");
                    setActiveRAM("All");
                  }}
                  className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((laptop, index) => (
                  <ProductCard
                    key={laptop.id}
                    {...laptop}
                    delay={(index % 6) * 0.1}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Why Buy & Buying Guide Sections */}
      <section className="py-12 sm:py-16 page-container border-t border-white/10">
        <SectionHeader title="Why Buy From Authentic Infosystem" align="center" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
          {['Genuine Products', 'PAN India Delivery', 'Bulk Corporate Pricing', 'Certified Technical Support'].map((benefit, i) => (
            <div key={i} className="bg-white rounded-[22px] border border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-6 sm:p-8 text-center flex flex-col items-center hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl mb-4 shadow-sm">
                ★
              </div>
              <h4 className="text-base sm:text-lg font-bold text-black">{benefit}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-blue-900/20 to-black text-center page-container border-t border-white/10">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Need help choosing the perfect laptop?</h2>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">Our experts can help you match the right technology with your specific business or educational requirements.</p>
        <button className="px-6 sm:px-8 py-3 sm:py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold text-sm transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
          Talk to Our Experts
        </button>
      </section>

      <Footer />
    </main>
  );
}
