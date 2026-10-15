"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LaptopCard from "./components/LaptopCard";
import QuoteModal from "./components/QuoteModal";
import { 
  LAPTOP_PRODUCTS, 
  LaptopProduct 
} from "../data/laptopData";
import { 
  FaSearch, 
  FaTimes, 
  FaChevronDown, 
  FaChevronUp, 
  FaFilter,
  FaArrowRight
} from "react-icons/fa";

// Filter taxonomy definitions matching official Lenovo deals catalog
const CATEGORIES = ["All", "Business", "Professional", "Creator", "Gaming", "Workstation"];
const BRANDS = ["All", "Lenovo", "HP", "Dell", "ASUS", "Acer", "Apple"];
const PROCESSOR_GROUPS = [
  "All Intel® Processors",
  "Intel Core i3",
  "Intel Core i5",
  "Intel Core i7",
  "Intel Core i9",
  "All AMD Processors",
  "AMD Ryzen 5",
  "AMD Ryzen 7",
  "Apple M-Series",
];
const RAM_OPTIONS = ["8GB", "16GB", "32GB", "64GB"];
const STORAGE_OPTIONS = ["512GB", "1TB", "2TB"];
const PRODUCT_TYPES = ["Ready to Ship", "Configurable Fleet"];

export default function LaptopsPage() {
  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [processorSearch, setProcessorSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedProcessors, setSelectedProcessors] = useState<string[]>([]);
  const [selectedRams, setSelectedRams] = useState<string[]>([]);
  const [selectedStorages, setSelectedStorages] = useState<string[]>([]);
  const [selectedProductType, setSelectedProductType] = useState<string>("All");

  // Accordion collapse state (true = expanded)
  const [accordions, setAccordions] = useState({
    productType: true,
    category: true,
    brand: true,
    processor: true,
    ram: true,
    storage: true,
  });

  const [showMobileFilterDrawer, setShowMobileFilterDrawer] = useState(false);

  // Quote modal state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteBrand, setQuoteBrand] = useState("");
  const [quoteModel, setQuoteModel] = useState("");

  const handleOpenQuote = (brand = "", model = "") => {
    const msg = `Hi Authentic Infosystem, I would like to request an official B2B quote and availability for ${brand} ${model}.`;
    window.open(`https://wa.me/919643990077?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // Toggle single accordion
  const toggleAccordion = (key: keyof typeof accordions) => {
    setAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Expand / Collapse all accordions
  const areAllExpanded = Object.values(accordions).every(Boolean);
  const toggleAllAccordions = () => {
    const nextState = !areAllExpanded;
    setAccordions({
      productType: nextState,
      category: nextState,
      brand: nextState,
      processor: nextState,
      ram: nextState,
      storage: nextState,
    });
  };

  // Toggle multi-select checkbox helpers
  const toggleProcessor = (proc: string) => {
    setSelectedProcessors((prev) =>
      prev.includes(proc) ? prev.filter((p) => p !== proc) : [...prev, proc]
    );
  };

  const toggleRam = (ram: string) => {
    setSelectedRams((prev) =>
      prev.includes(ram) ? prev.filter((r) => r !== ram) : [...prev, ram]
    );
  };

  const toggleStorage = (st: string) => {
    setSelectedStorages((prev) =>
      prev.includes(st) ? prev.filter((s) => s !== st) : [...prev, st]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setProcessorSearch("");
    setSelectedCategory("All");
    setSelectedBrand("All");
    setSelectedProcessors([]);
    setSelectedRams([]);
    setSelectedStorages([]);
    setSelectedProductType("All");
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "All" ||
    selectedBrand !== "All" ||
    selectedProcessors.length > 0 ||
    selectedRams.length > 0 ||
    selectedStorages.length > 0 ||
    selectedProductType !== "All";

  // Filtered & sorted products calculation
  const filteredLaptops = useMemo(() => {
    let result = LAPTOP_PRODUCTS.filter((laptop) => {
      // Free text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = laptop.model.toLowerCase().includes(q);
        const matchesBrand = laptop.brand.toLowerCase().includes(q);
        const matchesSeries = laptop.series.toLowerCase().includes(q);
        const matchesSpecs = laptop.specs.some(
          (s) => s.value.toLowerCase().includes(q) || s.label.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesBrand && !matchesSeries && !matchesSpecs) return false;
      }

      // Category filter
      if (selectedCategory !== "All") {
        if (laptop.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // Brand filter
      if (selectedBrand !== "All") {
        if (laptop.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
          return false;
        }
      }

      // Product Type filter
      if (selectedProductType !== "All") {
        if (selectedProductType === "Ready to Ship") {
          if (!laptop.availability.toLowerCase().includes("ready") && !laptop.availability.toLowerCase().includes("stock")) {
            return false;
          }
        }
      }

      // Processor filter
      if (selectedProcessors.length > 0) {
        const procSpec = laptop.specs.find((s) => s.label.toLowerCase() === "processor")?.value || laptop.detailedSpecs.processor || "";
        const matchesProc = selectedProcessors.some((p) => {
          if (p === "All Intel® Processors") return procSpec.toLowerCase().includes("intel");
          if (p === "All AMD Processors") return procSpec.toLowerCase().includes("amd") || procSpec.toLowerCase().includes("ryzen");
          if (p === "Apple M-Series") return laptop.brandSlug === "apple" || procSpec.toLowerCase().includes("m2") || procSpec.toLowerCase().includes("m3");
          return procSpec.toLowerCase().includes(p.toLowerCase().replace("intel core ", ""));
        });
        if (!matchesProc) return false;
      }

      // RAM filter
      if (selectedRams.length > 0) {
        const ramSpec = laptop.specs.find((s) => s.label.toLowerCase() === "ram")?.value || laptop.detailedSpecs.ram || "";
        const matchesRam = selectedRams.some((r) => ramSpec.toLowerCase().includes(r.toLowerCase()));
        if (!matchesRam) return false;
      }

      // Storage filter
      if (selectedStorages.length > 0) {
        const stSpec = laptop.specs.find((s) => s.label.toLowerCase() === "storage")?.value || laptop.detailedSpecs.storage || "";
        const matchesStorage = selectedStorages.some((st) => stSpec.toLowerCase().includes(st.toLowerCase()));
        if (!matchesStorage) return false;
      }

      return true;
    });

    // Default alphabetical sorting
    result.sort((a, b) => a.model.localeCompare(b.model));

    return result;
  }, [
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedProductType,
    selectedProcessors,
    selectedRams,
    selectedStorages,
  ]);

  // Compute counts for UI checkboxes
  const counts = useMemo(() => {
    return {
      total: LAPTOP_PRODUCTS.length,
      categories: CATEGORIES.reduce((acc, cat) => {
        acc[cat] = cat === "All" 
          ? LAPTOP_PRODUCTS.length 
          : LAPTOP_PRODUCTS.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;
        return acc;
      }, {} as Record<string, number>),
      brands: BRANDS.reduce((acc, br) => {
        acc[br] = br === "All"
          ? LAPTOP_PRODUCTS.length
          : LAPTOP_PRODUCTS.filter((p) => p.brand.toLowerCase() === br.toLowerCase()).length;
        return acc;
      }, {} as Record<string, number>),
      processors: PROCESSOR_GROUPS.reduce((acc, proc) => {
        acc[proc] = LAPTOP_PRODUCTS.filter((p) => {
          const s = (p.specs.find((x) => x.label === "Processor")?.value || p.detailedSpecs.processor || "").toLowerCase();
          if (proc === "All Intel® Processors") return s.includes("intel");
          if (proc === "All AMD Processors") return s.includes("amd") || s.includes("ryzen");
          if (proc === "Apple M-Series") return p.brandSlug === "apple" || s.includes("m2") || s.includes("m3");
          return s.includes(proc.toLowerCase().replace("intel core ", ""));
        }).length;
        return acc;
      }, {} as Record<string, number>),
      rams: RAM_OPTIONS.reduce((acc, ram) => {
        acc[ram] = LAPTOP_PRODUCTS.filter((p) => {
          const s = (p.specs.find((x) => x.label === "RAM")?.value || p.detailedSpecs.ram || "").toLowerCase();
          return s.includes(ram.toLowerCase());
        }).length;
        return acc;
      }, {} as Record<string, number>),
      storages: STORAGE_OPTIONS.reduce((acc, st) => {
        acc[st] = LAPTOP_PRODUCTS.filter((p) => {
          const s = (p.specs.find((x) => x.label === "Storage")?.value || p.detailedSpecs.storage || "").toLowerCase();
          return s.includes(st.toLowerCase());
        }).length;
        return acc;
      }, {} as Record<string, number>),
    };
  }, []);

  // Filtered processor list inside processor accordion search
  const visibleProcessorGroups = useMemo(() => {
    if (!processorSearch.trim()) return PROCESSOR_GROUPS;
    return PROCESSOR_GROUPS.filter((proc) =>
      proc.toLowerCase().includes(processorSearch.toLowerCase())
    );
  }, [processorSearch]);

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
          <div className="flex items-center gap-2 text-xs text-rose-200/80 mb-2.5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-rose-300/40">/</span>
            <span className="text-white font-medium">Laptops & Commercial Deals</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                Laptops & Official Fleet Deals
              </h1>
              <p className="text-xs sm:text-sm text-rose-100/90 mt-2 max-w-4xl leading-relaxed">
                Certified commercial ThinkPad, IdeaPad, Latitude, EliteBook, MacBook & ROG fleets with 3-year premier onsite warranty, GST invoicing, and volume discounts.
              </p>
            </div>

            {/* Quick Search on Top */}
            <div className="relative w-full md:w-80 shrink-0">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
              <input
                type="text"
                placeholder="Search model, series, CPU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-white text-slate-900 border border-rose-900/30 rounded-md text-xs placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-400/50 focus:border-rose-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <FaTimes size={11} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* EXPANDED CONTAINER: Wide e-commerce canvas to eliminate dead margins */}
      <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 sm:pt-8 pb-16">

        {/* MOBILE FILTER TRIGGER BUTTON */}
        <div className="lg:hidden flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
          <button
            onClick={() => setShowMobileFilterDrawer(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1546a0] text-white text-xs font-bold uppercase tracking-wider rounded-md"
          >
            <FaFilter size={11} />
            <span>Filters ({hasActiveFilters ? "Active" : "All"})</span>
          </button>
          <span className="text-xs font-bold text-slate-900">
            {filteredLaptops.length} Matching results
          </span>
        </div>

        {/* MAIN 2-COLUMN CATALOG LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          
          {/* ================= LEFT SIDEBAR FILTERS (Lenovo Accordion Style) ================= */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-3 sticky top-24 space-y-4 select-none">
            {/* Filters Sidebar Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-slate-900">
              <h2 className="text-base font-extrabold text-slate-950 tracking-tight">Filters</h2>
              <button
                onClick={toggleAllAccordions}
                className="text-xs font-bold text-[#0f3e99] hover:underline cursor-pointer"
              >
                {areAllExpanded ? "Collapse All" : "Expand All"}
              </button>
            </div>

            {/* ACCORDION 1: Product Type */}
            <div className="border-b border-slate-200 pb-3">
              <button
                onClick={() => toggleAccordion("productType")}
                className="w-full flex items-center justify-between py-2 text-xs font-bold text-slate-900 hover:text-[#0f3e99] cursor-pointer text-left uppercase tracking-wider"
              >
                <span>Product Type</span>
                {accordions.productType ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
              </button>
              {accordions.productType && (
                <div className="space-y-1.5 mt-2 pl-0.5">
                  {PRODUCT_TYPES.map((type) => (
                    <label key={type} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-black">
                      <input
                        type="checkbox"
                        checked={selectedProductType === type}
                        onChange={() => setSelectedProductType(selectedProductType === type ? "All" : type)}
                        className="w-4 h-4 accent-[#1546a0] rounded-xs cursor-pointer"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* ACCORDION 2: Product Category */}
            <div className="border-b border-slate-200 pb-3">
              <button
                onClick={() => toggleAccordion("category")}
                className="w-full flex items-center justify-between py-2 text-xs font-bold text-slate-900 hover:text-[#0f3e99] cursor-pointer text-left uppercase tracking-wider"
              >
                <span>Product Category</span>
                {accordions.category ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
              </button>
              {accordions.category && (
                <div className="space-y-1.5 mt-2 pl-0.5">
                  {CATEGORIES.filter((c) => c !== "All").map((cat) => {
                    const isChecked = selectedCategory.toLowerCase() === cat.toLowerCase();
                    const count = counts.categories[cat] || 0;
                    return (
                      <label key={cat} className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-black">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => setSelectedCategory(isChecked ? "All" : cat)}
                            className="w-4 h-4 accent-[#1546a0] rounded-xs cursor-pointer"
                          />
                          <span className={isChecked ? "font-bold text-slate-950" : ""}>{cat}</span>
                        </div>
                        <span className="text-slate-400 text-[11px]">({count})</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ACCORDION 3: Brand */}
            <div className="border-b border-slate-200 pb-3">
              <button
                onClick={() => toggleAccordion("brand")}
                className="w-full flex items-center justify-between py-2 text-xs font-bold text-slate-900 hover:text-[#0f3e99] cursor-pointer text-left uppercase tracking-wider"
              >
                <span>Brand</span>
                {accordions.brand ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
              </button>
              {accordions.brand && (
                <div className="space-y-1.5 mt-2 pl-0.5">
                  {BRANDS.filter((b) => b !== "All").map((br) => {
                    const isChecked = selectedBrand.toLowerCase() === br.toLowerCase();
                    const count = counts.brands[br] || 0;
                    return (
                      <label key={br} className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-black">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => setSelectedBrand(isChecked ? "All" : br)}
                            className="w-4 h-4 accent-[#1546a0] rounded-xs cursor-pointer"
                          />
                          <span className={isChecked ? "font-bold text-slate-950" : ""}>{br}</span>
                        </div>
                        <span className="text-slate-400 text-[11px]">({count})</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ACCORDION 4: Processor (with Search Box inside!) */}
            <div className="border-b border-slate-200 pb-3">
              <button
                onClick={() => toggleAccordion("processor")}
                className="w-full flex items-center justify-between py-2 text-xs font-bold text-slate-900 hover:text-[#0f3e99] cursor-pointer text-left uppercase tracking-wider"
              >
                <span>Processor</span>
                {accordions.processor ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
              </button>
              {accordions.processor && (
                <div className="mt-2 space-y-2">
                  {/* Search inside processor accordion */}
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={10} />
                    <input
                      type="text"
                      placeholder="Search Processor"
                      value={processorSearch}
                      onChange={(e) => setProcessorSearch(e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 bg-slate-100 rounded-full text-[11px] focus:outline-none focus:bg-white focus:ring-1 focus:ring-slate-400"
                    />
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                    {visibleProcessorGroups.map((proc) => {
                      const isChecked = selectedProcessors.includes(proc);
                      const count = counts.processors[proc] || 0;
                      return (
                        <label key={proc} className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-black">
                          <div className="flex items-center gap-2 truncate">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleProcessor(proc)}
                              className="w-4 h-4 accent-[#1546a0] rounded-xs cursor-pointer"
                            />
                            <span className={`truncate text-xs ${isChecked ? "font-bold text-slate-950" : ""}`}>
                              {proc}
                            </span>
                          </div>
                          <span className="text-slate-400 text-[11px] shrink-0 ml-1">({count})</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ACCORDION 5: Memory / RAM */}
            <div className="border-b border-slate-200 pb-3">
              <button
                onClick={() => toggleAccordion("ram")}
                className="w-full flex items-center justify-between py-2 text-xs font-bold text-slate-900 hover:text-[#0f3e99] cursor-pointer text-left uppercase tracking-wider"
              >
                <span>Memory</span>
                {accordions.ram ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
              </button>
              {accordions.ram && (
                <div className="space-y-1.5 mt-2 pl-0.5">
                  {RAM_OPTIONS.map((ram) => {
                    const isChecked = selectedRams.includes(ram);
                    const count = counts.rams[ram] || 0;
                    return (
                      <label key={ram} className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-black">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleRam(ram)}
                            className="w-4 h-4 accent-[#1546a0] rounded-xs cursor-pointer"
                          />
                          <span className={isChecked ? "font-bold text-slate-950" : ""}>{ram}</span>
                        </div>
                        <span className="text-slate-400 text-[11px]">({count})</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ACCORDION 6: Storage */}
            <div className="border-b border-slate-200 pb-3">
              <button
                onClick={() => toggleAccordion("storage")}
                className="w-full flex items-center justify-between py-2 text-xs font-bold text-slate-900 hover:text-[#0f3e99] cursor-pointer text-left uppercase tracking-wider"
              >
                <span>Storage</span>
                {accordions.storage ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
              </button>
              {accordions.storage && (
                <div className="space-y-1.5 mt-2 pl-0.5">
                  {STORAGE_OPTIONS.map((st) => {
                    const isChecked = selectedStorages.includes(st);
                    const count = counts.storages[st] || 0;
                    return (
                      <label key={st} className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-black">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleStorage(st)}
                            className="w-4 h-4 accent-[#1546a0] rounded-xs cursor-pointer"
                          />
                          <span className={isChecked ? "font-bold text-slate-950" : ""}>{st}</span>
                        </div>
                        <span className="text-slate-400 text-[11px]">({count})</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          </aside>

          {/* ================= RIGHT PRODUCTS SECTION (Lenovo Catalog Style) ================= */}
          <div className="lg:col-span-9 xl:col-span-9">
            
            {/* RESULTS HEADER BAR */}
            <div className="pb-3 border-b border-slate-200 mb-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Result count & Clear All */}
                <div className="flex items-center gap-3">
                  <span className="text-sm sm:text-base font-extrabold text-slate-950">
                    {filteredLaptops.length} Matching results
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

              {/* ACTIVE FILTER CHIPS (Removable tags) */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t border-slate-100">
                  {selectedCategory !== "All" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-xs border border-slate-200">
                      <span>Category: {selectedCategory}</span>
                      <button onClick={() => setSelectedCategory("All")} className="text-slate-500 hover:text-black cursor-pointer">
                        <FaTimes size={10} />
                      </button>
                    </span>
                  )}

                  {selectedBrand !== "All" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-xs border border-slate-200">
                      <span>Brand: {selectedBrand}</span>
                      <button onClick={() => setSelectedBrand("All")} className="text-slate-500 hover:text-black cursor-pointer">
                        <FaTimes size={10} />
                      </button>
                    </span>
                  )}

                  {selectedProductType !== "All" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-xs border border-slate-200">
                      <span>Type: {selectedProductType}</span>
                      <button onClick={() => setSelectedProductType("All")} className="text-slate-500 hover:text-black cursor-pointer">
                        <FaTimes size={10} />
                      </button>
                    </span>
                  )}

                  {selectedProcessors.map((p) => (
                    <span key={p} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-xs border border-slate-200">
                      <span>Processor: {p}</span>
                      <button onClick={() => toggleProcessor(p)} className="text-slate-500 hover:text-black cursor-pointer">
                        <FaTimes size={10} />
                      </button>
                    </span>
                  ))}

                  {selectedRams.map((r) => (
                    <span key={r} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-xs border border-slate-200">
                      <span>RAM: {r}</span>
                      <button onClick={() => toggleRam(r)} className="text-slate-500 hover:text-black cursor-pointer">
                        <FaTimes size={10} />
                      </button>
                    </span>
                  ))}

                  {selectedStorages.map((s) => (
                    <span key={s} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-xs border border-slate-200">
                      <span>Storage: {s}</span>
                      <button onClick={() => toggleStorage(s)} className="text-slate-500 hover:text-black cursor-pointer">
                        <FaTimes size={10} />
                      </button>
                    </span>
                  ))}

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

            {/* PRODUCT CARDS GRID */}
            {filteredLaptops.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filteredLaptops.map((laptop) => (
                  <LaptopCard
                    key={laptop.id}
                    laptop={laptop}
                    onOpenQuote={(brand, model) => handleOpenQuote(brand, model)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 p-12 text-center my-6">
                <h3 className="text-base font-bold text-slate-900 mb-2">No laptops match your selected filters</h3>
                <p className="text-xs text-slate-600 mb-4">Try removing some filter criteria or clearing all filters.</p>
                <button
                  onClick={clearAllFilters}
                  className="px-5 py-2.5 bg-[#1546a0] text-white font-bold text-xs uppercase tracking-wider rounded-md cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE DRAWER FILTERS */}
        {showMobileFilterDrawer && (
          <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs lg:hidden">
            <div className="w-80 max-w-[85%] bg-white h-full p-5 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">Filters</h3>
                <button onClick={() => setShowMobileFilterDrawer(false)} className="text-slate-500 p-1">
                  <FaTimes size={16} />
                </button>
              </div>

              {/* Category in Drawer */}
              <div>
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Category</p>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowMobileFilterDrawer(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-none ${
                        selectedCategory === cat ? "bg-[#1546a0] text-white font-bold" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand in Drawer */}
              <div className="pt-3 border-t border-slate-200">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Brand</p>
                <div className="space-y-1">
                  {BRANDS.map((br) => (
                    <button
                      key={br}
                      onClick={() => {
                        setSelectedBrand(br);
                        setShowMobileFilterDrawer(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-none ${
                        selectedBrand === br ? "bg-[#1546a0] text-white font-bold" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {br}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear in Drawer */}
              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    clearAllFilters();
                    setShowMobileFilterDrawer(false);
                  }}
                  className="w-full py-2 bg-slate-200 text-slate-800 text-xs font-bold uppercase rounded-none"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
            <div className="flex-1" onClick={() => setShowMobileFilterDrawer(false)} />
          </div>
        )}

      </div>

      {/* SECTION 3: WHY ENTERPRISES PARTNER (DARK FULL-WIDTH WORKSTATIONS STYLE) */}
      <section className="w-full bg-white py-10 sm:py-14 lg:py-16 relative overflow-hidden">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="w-full bg-[#09090b] text-white rounded-[24px] sm:rounded-[28px] border border-zinc-800 shadow-2xl relative overflow-hidden p-8 sm:p-12 lg:p-16">
            {/* Background Ambience Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10">
              <div className="text-center mb-10 sm:mb-14 max-w-4xl mx-auto">
            <p className="text-xs sm:text-sm md:text-base uppercase tracking-[4px] sm:tracking-[6px] font-bold text-zinc-400 mb-3 sm:mb-4">
              CUSTOM WORKSTATIONS & FLEET PROCUREMENT
            </p>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight leading-[1.1]">
              Start Your Build.
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-normal leading-relaxed">
              Select the perfect computing category matching your exact workflow. We guide you to dependable daily setups, high-performance creator rigs, AI workstations, and enterprise deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-7 items-stretch">
            {/* Card 01 */}
            <div className="bg-white rounded-lg sm:rounded-xl border border-zinc-800/80 hover:border-zinc-600 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1">
              <div className="relative w-full aspect-[2.2/1] sm:aspect-[2/1] bg-black overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-orange-500/10 to-transparent opacity-60 z-10 pointer-events-none" />
                <img
                  src="/Start%20Your%20Build/For%20Everyday%20Productivity.jpg"
                  alt="For Everyday Productivity"
                  width="800"
                  height="360"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between bg-white">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 mb-3 tracking-tight leading-snug group-hover:text-black transition-colors">
                    For Everyday Productivity
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    Reliable desktop and PC systems for office work, students, home users, accounting, browsing, documentation, and everyday business tasks.
                  </p>
                </div>
                <div className="mt-auto pt-2">
                  <button
                    onClick={() => handleOpenQuote("Lenovo", "Productivity Fleet")}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md border-2 border-slate-900 bg-transparent text-slate-950 hover:bg-slate-950 hover:text-white font-bold text-sm transition-all duration-200 cursor-pointer"
                  >
                    <span>Explore Systems</span>
                    <FaArrowRight className="text-xs" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 02 */}
            <div className="bg-white rounded-lg sm:rounded-xl border border-zinc-800/80 hover:border-zinc-600 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1">
              <div className="relative w-full aspect-[2.2/1] sm:aspect-[2/1] bg-black overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-blue-500/10 to-transparent opacity-60 z-10 pointer-events-none" />
                <img
                  src="/Start%20Your%20Build/For%20Performance-Driven%20Workflows.jpg"
                  alt="For Performance-Driven Workflows"
                  width="800"
                  height="360"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between bg-white">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 mb-3 tracking-tight leading-snug group-hover:text-black transition-colors">
                    For Performance-Driven Workflows
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    High-performance PC systems built for gaming, software development, video editing, graphic design, 3D applications, and demanding compute.
                  </p>
                </div>
                <div className="mt-auto pt-2">
                  <button
                    onClick={() => handleOpenQuote("High-Performance", "Custom Rig")}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md border-2 border-slate-900 bg-transparent text-slate-950 hover:bg-slate-950 hover:text-white font-bold text-sm transition-all duration-200 cursor-pointer"
                  >
                    <span>Explore Systems</span>
                    <FaArrowRight className="text-xs" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 03 */}
            <div className="bg-white rounded-lg sm:rounded-xl border border-zinc-800/80 hover:border-zinc-600 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1">
              <div className="relative w-full aspect-[2.2/1] sm:aspect-[2/1] bg-black overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-fuchsia-500/10 to-transparent opacity-60 z-10 pointer-events-none" />
                <img
                  src="/Start%20Your%20Build/For%20Professional%20%26%20High-Performance%20Computing.jpg"
                  alt="For Professional & High-Performance Computing"
                  width="800"
                  height="360"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between bg-white">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 mb-3 tracking-tight leading-snug group-hover:text-black transition-colors">
                    For Professional & High-Compute
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    Professional workstation systems engineered for demanding applications such as AI & ML training, CAD, 3D rendering, and scientific simulation.
                  </p>
                </div>
                <div className="mt-auto pt-2">
                  <button
                    onClick={() => handleOpenQuote("Workstation", "AI & CAD Machine")}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md border-2 border-slate-900 bg-transparent text-slate-950 hover:bg-slate-950 hover:text-white font-bold text-sm transition-all duration-200 cursor-pointer"
                  >
                    <span>Build Your Machine</span>
                    <FaArrowRight className="text-xs" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 04 */}
            <div className="bg-white rounded-lg sm:rounded-xl border border-zinc-800/80 hover:border-zinc-600 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1">
              <div className="relative w-full aspect-[2.2/1] sm:aspect-[2/1] bg-black overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 via-teal-500/10 to-transparent opacity-60 z-10 pointer-events-none" />
                <img
                  src="/Start%20Your%20Build/Built%20for%20Modern%20Businesses.jpg"
                  alt="Built for Modern Businesses"
                  width="800"
                  height="360"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between bg-white">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 mb-3 tracking-tight leading-snug group-hover:text-black transition-colors">
                    Built for Modern Businesses
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    Business-ready laptops and fleets designed for companies, institutions, startups, and enterprise deployments with scalable warranty options.
                  </p>
                </div>
                <div className="mt-auto pt-2">
                  <button
                    onClick={() => handleOpenQuote("Enterprise", "Corporate Fleet")}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md border-2 border-slate-900 bg-transparent text-slate-950 hover:bg-slate-950 hover:text-white font-bold text-sm transition-all duration-200 cursor-pointer"
                  >
                    <span>Explore Business Solutions</span>
                    <FaArrowRight className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
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
