"use client";

import { useState, useMemo } from "react";
import ProductCard from "../components/shared/ProductCard";
import { laptopProducts, desktopProducts, Product } from "../data/products";

type SystemType =
  | "basic"
  | "office"
  | "development"
  | "creator"
  | "gaming"
  | "workstation";

const systemCategoryMap: Record<SystemType, string[]> = {
  basic: ["Basic"],
  office: ["Enterprise"],
  development: ["Enterprise", "Editing"], 
  creator: ["Editing"],
  gaming: ["Gaming"],
  workstation: ["Editing", "Gaming", "Enterprise"],
};

const brands = ["All", "Lenovo", "HP", "Dell", "Asus"];
const processors = [
  "All",
  "Intel Core i3",
  "Intel Core i5",
  "Intel Core i7",
  "Intel Core i9",
  "Intel Core Ultra 7",
  "AMD Ryzen 5",
  "AMD Ryzen 7",
  "Intel Xeon"
];
const rams = ["All", "8GB", "16GB", "32GB", "64GB"];
const storages = ["All", "256GB", "512GB", "1TB", "2TB"];

export default function Configurator({
  defaultSystem = "basic",
}: {
  defaultSystem?: SystemType;
}) {
  const [activeBrand, setActiveBrand] = useState("All");
  const [activeProcessor, setActiveProcessor] = useState("All");
  const [activeRAM, setActiveRAM] = useState("All");
  const [activeStorage, setActiveStorage] = useState("All");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const targetCategories = systemCategoryMap[defaultSystem] || ["Basic"];
  
  // Combine laptops and desktops
  const allProducts: Product[] = [...laptopProducts, ...desktopProducts];

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Category Map Filter
      const matchesCategory = targetCategories.includes(product.category);

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

      // Storage Filter
      const matchesStorage =
        activeStorage === "All" ||
        product.specs.some(
          (spec) =>
            spec.label === "Storage" &&
            spec.value.toLowerCase().includes(activeStorage.toLowerCase())
        );

      return (
        matchesCategory &&
        matchesBrand &&
        matchesProcessor &&
        matchesRAM &&
        matchesStorage
      );
    });
  }, [
    activeBrand,
    activeProcessor,
    activeRAM,
    activeStorage,
    targetCategories,
    allProducts,
  ]);

  const pageTitles: Record<SystemType, string> = {
    basic: "Basic Systems for Everyday Use",
    office: "Enterprise & Office Systems",
    development: "Development & Programming Machines",
    creator: "Creator & Editing Workstations",
    gaming: "High-Performance Gaming Systems",
    workstation: "Ultimate Power Workstations"
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-slate-900/15 selection:text-black pt-28 sm:pt-40 pb-12 sm:pb-20">
      <div className="page-container">
        
        <div className="mb-8 sm:mb-12 border-b border-slate-200 pb-6 sm:pb-8 text-center md:text-left">
          <p className="text-slate-900 font-extrabold tracking-widest uppercase text-xs sm:text-sm mb-2">Build Your Workflow</p>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            {pageTitles[defaultSystem] || "Customize Your PC"}
          </h1>
          <p className="text-slate-600 mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base md:text-lg font-normal">
            We've curated the best hardware for your specific use case. Use the filters to narrow down the perfect machine for your needs.
          </p>
        </div>

        {/* Mobile Filters Toggle Button */}
        <button
          onClick={() => setShowMobileFilters((prev) => !prev)}
          className="lg:hidden w-full mb-6 py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium flex items-center justify-between text-sm shadow-xs"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Refine Search Filters
          </span>
          <span className="text-black text-xs font-semibold">{showMobileFilters ? "Hide ▲" : "Show ▼"}</span>
        </button>

        <div className="grid-12">
          {/* Left Sidebar Filters */}
          <div className={`col-span-12 lg:col-span-3 ${showMobileFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-32 shadow-xs">
              <h3 className="text-xl font-bold mb-6 border-b border-slate-200 pb-4 text-slate-900">Refine Search</h3>
              
              <div className="space-y-6">
                
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">Brand</h4>
                  <select
                    value={activeBrand}
                    onChange={(e) => setActiveBrand(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-black transition-colors appearance-none font-medium"
                  >
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">Processor</h4>
                  <select
                    value={activeProcessor}
                    onChange={(e) => setActiveProcessor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-black transition-colors appearance-none font-medium"
                  >
                    {processors.map((proc) => (
                      <option key={proc} value={proc}>
                        {proc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">RAM</h4>
                  <select
                    value={activeRAM}
                    onChange={(e) => setActiveRAM(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-black transition-colors appearance-none font-medium"
                  >
                    {rams.map((ram) => (
                      <option key={ram} value={ram}>
                        {ram}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">Storage (ROM)</h4>
                  <select
                    value={activeStorage}
                    onChange={(e) => setActiveStorage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-black transition-colors appearance-none font-medium"
                  >
                    {storages.map((storage) => (
                      <option key={storage} value={storage}>
                        {storage}
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
              <div className="text-center py-24 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-slate-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No matching systems found</h3>
                <p className="text-slate-500">We couldn't find any machines matching your exact hardware requirements.</p>
                <button
                  onClick={() => {
                    setActiveBrand("All");
                    setActiveProcessor("All");
                    setActiveRAM("All");
                    setActiveStorage("All");
                  }}
                  className="mt-8 px-8 py-3 bg-black hover:bg-zinc-800 text-white rounded-full font-bold transition-all shadow-md"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((sys, index) => (
                  <ProductCard
                    key={sys.id}
                    {...sys}
                    delay={(index % 6) * 0.1}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
