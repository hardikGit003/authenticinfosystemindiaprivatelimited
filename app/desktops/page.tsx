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

export default function DesktopsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrand, setActiveBrand] = useState("All");
  const [activeProcessor, setActiveProcessor] = useState("All");
  const [activeRAM, setActiveRAM] = useState("All");

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
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />

      <PageHero
        title="Uncompromising Performance."
        subtitle="Professional desktops engineered for engineering, development, AI, business operations, and enterprise computing."
        miniText="ENTERPRISE WORKSTATIONS"
        primaryButtonText="Explore Workstations"
        secondaryButtonText="Get Quote"
      />

      {/* Main Content */}
      <section className="py-20 page-container">
        
        <SectionHeader title="Desktop Categories" align="center" />
        
        {/* Featured Categories Row */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 mt-8 w-full">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full border transition-colors text-sm font-medium ${
                activeCategory === cat
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "bg-white/5 border-white/10 hover:bg-white/10 text-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid-12">
          
          {/* Left Sidebar Filters */}
          <div className="col-span-12 lg:col-span-3">
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

      {/* Performance Comparison Infographics */}
      <section className="py-24 bg-white/5 page-container">
        <SectionHeader title="Performance Comparison Metrics" subtitle="Evaluate what matters most for your workloads." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {['Performance Score', 'Power Consumption', 'Upgradeability', 'Warranty'].map((metric, i) => (
            <div key={i} className="glass-card p-6 border-t-4 border-t-blue-500">
              <h4 className="text-lg font-semibold text-gray-200 mb-4">{metric}</h4>
              <div className="h-32 w-full bg-gradient-to-tr from-white/5 to-white/10 rounded-lg flex items-center justify-center border border-white/5">
                <span className="text-white/20 font-mono text-sm">[Infographic]</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Configurations */}
      <section className="py-24 page-container">
        <SectionHeader title="Popular Configurations" align="center" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {['Office Package', 'Developer Package', 'Video Editing Package', 'AI Training Package', 'AutoCAD Package', 'Enterprise Package'].map((pkg, i) => (
            <div key={i} className="bg-white rounded-[22px] p-8 border border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] text-center cursor-pointer group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors">{pkg}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Optimized hardware bundled with recommended peripherals for this specific workflow.</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 text-center page-container border-t border-white/10">
        <div className="glass-card max-w-4xl mx-auto p-12 bg-gradient-to-br from-blue-900/40 to-black relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">Build Your Custom Desktop</h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">Don't see exactly what you need? We build custom workstations tailored to your specific enterprise requirements.</p>
          <button className="relative z-10 px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-full font-semibold transition-all">
            Request Configuration
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
