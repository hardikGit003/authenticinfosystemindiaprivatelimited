"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DesktopCard from "./components/DesktopCard";
import QuoteModal from "../laptops/components/QuoteModal";
import { desktopProducts, Product } from "../data/products";
import { 
  FaSearch, 
  FaTimes, 
  FaChevronDown, 
  FaChevronUp, 
  FaFilter,
  FaDesktop
} from "react-icons/fa";

const CATEGORIES = ["All", "Basic", "Gaming", "Editing", "Enterprise"];
const BRANDS = ["All", "Lenovo", "HP", "Dell", "Asus"];
const PROCESSOR_GROUPS = [
  "All Intel® Processors",
  "Intel Core i3",
  "Intel Core i5",
  "Intel Core i7",
  "Intel Core i9",
  "All AMD Processors",
  "AMD Ryzen 5",
  "AMD Ryzen 7",
];
const RAM_OPTIONS = ["8GB", "16GB", "32GB", "64GB"];
const FORM_FACTORS = ["Tower", "Compact Tower", "Small Form Factor", "All-in-One"];
const STORAGE_OPTIONS = ["256GB SSD", "512GB SSD", "1TB SSD", "2TB SSD"];

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
  const [processorSearch, setProcessorSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedProcessors, setSelectedProcessors] = useState<string[]>([]);
  const [selectedRams, setSelectedRams] = useState<string[]>([]);
  const [selectedFormFactors, setSelectedFormFactors] = useState<string[]>([]);
  const [selectedStorages, setSelectedStorages] = useState<string[]>([]);

  // Accordion state (true = expanded)
  const [accordions, setAccordions] = useState({
    category: true,
    brand: true,
    processor: true,
    ram: true,
    formFactor: true,
    storage: true,
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Quote modal state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteBrand, setQuoteBrand] = useState("");
  const [quoteModel, setQuoteModel] = useState("");

  const handleOpenQuote = (brand = "", model = "") => {
    const msg = `Hi Authentic Infosystem, I would like to request an official B2B quote and availability for ${brand} ${model}.`;
    window.open(`https://wa.me/919643990077?text=${encodeURIComponent(msg)}`, "_blank");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("search") || params.get("q");
      if (q) setSearchQuery(q);
    }
  }, []);

  const toggleAccordion = (key: keyof typeof accordions) => {
    setAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const areAllExpanded = Object.values(accordions).every(Boolean);
  const toggleAllAccordions = () => {
    const nextState = !areAllExpanded;
    setAccordions({
      category: nextState,
      brand: nextState,
      processor: nextState,
      ram: nextState,
      formFactor: nextState,
      storage: nextState,
    });
  };

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

  const toggleFormFactor = (ff: string) => {
    setSelectedFormFactors((prev) =>
      prev.includes(ff) ? prev.filter((f) => f !== ff) : [...prev, ff]
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
    setSelectedFormFactors([]);
    setSelectedStorages([]);
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "All" ||
    selectedBrand !== "All" ||
    selectedProcessors.length > 0 ||
    selectedRams.length > 0 ||
    selectedFormFactors.length > 0 ||
    selectedStorages.length > 0;

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let result = desktopProducts.filter((product) => {
      // Free text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = (product.brand || "").toLowerCase().includes(q);
        const matchesModel = product.modelNumber.toLowerCase().includes(q);
        const matchesSpecs = product.specs.some(
          (s) => s.value.toLowerCase().includes(q) || s.label.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesBrand && !matchesModel && !matchesSpecs) return false;
      }

      // Category filter
      if (selectedCategory !== "All") {
        if (product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // Brand filter
      if (selectedBrand !== "All") {
        if ((product.brand || "").toLowerCase() !== selectedBrand.toLowerCase()) {
          return false;
        }
      }

      // Processor filter
      if (selectedProcessors.length > 0) {
        const procSpec = product.specs.find((s) => s.label.toLowerCase() === "processor")?.value || "";
        const matchesProc = selectedProcessors.some((p) => {
          if (p === "All Intel® Processors") return procSpec.toLowerCase().includes("intel");
          if (p === "All AMD Processors") return procSpec.toLowerCase().includes("amd") || procSpec.toLowerCase().includes("ryzen");
          return procSpec.toLowerCase().includes(p.toLowerCase().replace("intel core ", ""));
        });
        if (!matchesProc) return false;
      }

      // RAM filter
      if (selectedRams.length > 0) {
        const ramSpec = product.specs.find((s) => s.label.toLowerCase() === "ram")?.value || "";
        const matchesRam = selectedRams.some((r) => ramSpec.toLowerCase().includes(r.toLowerCase()));
        if (!matchesRam) return false;
      }

      // Form factor filter
      if (selectedFormFactors.length > 0) {
        const ffSpec = product.specs.find((s) => s.label.toLowerCase() === "form factor")?.value || "";
        const matchesFF = selectedFormFactors.some((f) => ffSpec.toLowerCase().includes(f.toLowerCase()));
        if (!matchesFF) return false;
      }

      // Storage filter
      if (selectedStorages.length > 0) {
        const stSpec = product.specs.find((s) => s.label.toLowerCase() === "storage")?.value || "";
        const matchesSt = selectedStorages.some((s) => stSpec.toLowerCase().includes(s.toLowerCase().replace(" ssd", "")));
        if (!matchesSt) return false;
      }

      return true;
    });

    // Default alphabetical sorting
    result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedProcessors,
    selectedRams,
    selectedFormFactors,
    selectedStorages,
  ]);

  // Counts for checkboxes
  const counts = useMemo(() => {
    return {
      total: desktopProducts.length,
      categories: CATEGORIES.reduce((acc, cat) => {
        acc[cat] = cat === "All"
          ? desktopProducts.length
          : desktopProducts.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;
        return acc;
      }, {} as Record<string, number>),
      brands: BRANDS.reduce((acc, br) => {
        acc[br] = br === "All"
          ? desktopProducts.length
          : desktopProducts.filter((p) => (p.brand || "").toLowerCase() === br.toLowerCase()).length;
        return acc;
      }, {} as Record<string, number>),
      processors: PROCESSOR_GROUPS.reduce((acc, proc) => {
        acc[proc] = desktopProducts.filter((p) => {
          const s = (p.specs.find((x) => x.label === "Processor")?.value || "").toLowerCase();
          if (proc === "All Intel® Processors") return s.includes("intel");
          if (proc === "All AMD Processors") return s.includes("amd") || s.includes("ryzen");
          return s.includes(proc.toLowerCase().replace("intel core ", ""));
        }).length;
        return acc;
      }, {} as Record<string, number>),
      rams: RAM_OPTIONS.reduce((acc, ram) => {
        acc[ram] = desktopProducts.filter((p) => {
          const s = (p.specs.find((x) => x.label === "RAM")?.value || "").toLowerCase();
          return s.includes(ram.toLowerCase());
        }).length;
        return acc;
      }, {} as Record<string, number>),
      formFactors: FORM_FACTORS.reduce((acc, ff) => {
        acc[ff] = desktopProducts.filter((p) => {
          const s = (p.specs.find((x) => x.label === "Form Factor")?.value || "").toLowerCase();
          return s.includes(ff.toLowerCase());
        }).length;
        return acc;
      }, {} as Record<string, number>),
    };
  }, []);

  const visibleProcessors = useMemo(() => {
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
            <span className="text-white font-medium">Desktops & Workstation Deals</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                Desktops, All-in-Ones & Official Workstation Deals
              </h1>
              <p className="text-xs sm:text-sm text-rose-100/90 mt-2 max-w-4xl leading-relaxed">
                Commercial tower workstations, ultra-compact mini PCs, enterprise all-in-ones, and AI rendering rigs with 3-year onsite support and GST invoicing.
              </p>
            </div>

            {/* Quick Search on Top */}
            <div className="relative w-full md:w-80 shrink-0">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
              <input
                type="text"
                placeholder="Search desktop, series, CPU..."
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

        {/* MOBILE FILTER TRIGGER */}
        <div className="lg:hidden flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1546a0] text-white text-xs font-bold uppercase tracking-wider rounded-md"
          >
            <FaFilter size={11} />
            <span>Filters ({hasActiveFilters ? "Active" : "All"})</span>
          </button>
          <span className="text-xs font-bold text-slate-900">
            {filteredProducts.length} Matching results
          </span>
        </div>

        {/* 2-COLUMN CATALOG LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          
          {/* ================= LEFT SIDEBAR FILTERS (Lenovo Accordion Style) ================= */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-3 sticky top-24 space-y-4 select-none">
            <div className="flex items-center justify-between pb-3 border-b-2 border-slate-900">
              <h2 className="text-base font-extrabold text-slate-950 tracking-tight">Filters</h2>
              <button
                onClick={toggleAllAccordions}
                className="text-xs font-bold text-[#0f3e99] hover:underline cursor-pointer"
              >
                {areAllExpanded ? "Collapse All" : "Expand All"}
              </button>
            </div>

            {/* ACCORDION 1: Product Category */}
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

            {/* ACCORDION 2: Brand */}
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

            {/* ACCORDION 3: Processor */}
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
                    {visibleProcessors.map((proc) => {
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

            {/* ACCORDION 4: Form Factor */}
            <div className="border-b border-slate-200 pb-3">
              <button
                onClick={() => toggleAccordion("formFactor")}
                className="w-full flex items-center justify-between py-2 text-xs font-bold text-slate-900 hover:text-[#0f3e99] cursor-pointer text-left uppercase tracking-wider"
              >
                <span>Form Factor</span>
                {accordions.formFactor ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
              </button>
              {accordions.formFactor && (
                <div className="space-y-1.5 mt-2 pl-0.5">
                  {FORM_FACTORS.map((ff) => {
                    const isChecked = selectedFormFactors.includes(ff);
                    const count = counts.formFactors[ff] || 0;
                    return (
                      <label key={ff} className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-black">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleFormFactor(ff)}
                            className="w-4 h-4 accent-[#1546a0] rounded-xs cursor-pointer"
                          />
                          <span className={isChecked ? "font-bold text-slate-950" : ""}>{ff}</span>
                        </div>
                        <span className="text-slate-400 text-[11px]">({count})</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ACCORDION 5: RAM */}
            <div className="border-b border-slate-200 pb-3">
              <button
                onClick={() => toggleAccordion("ram")}
                className="w-full flex items-center justify-between py-2 text-xs font-bold text-slate-900 hover:text-[#0f3e99] cursor-pointer text-left uppercase tracking-wider"
              >
                <span>Memory (RAM)</span>
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
                    return (
                      <label key={st} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-black">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleStorage(st)}
                          className="w-4 h-4 accent-[#1546a0] rounded-xs cursor-pointer"
                        />
                        <span className={isChecked ? "font-bold text-slate-950" : ""}>{st}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          </aside>

          {/* ================= RIGHT PRODUCTS SECTION ================= */}
          <div className="lg:col-span-9 xl:col-span-9">
            
            {/* RESULTS HEADER BAR */}
            <div className="pb-3 border-b border-slate-200 mb-4">
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

                  {selectedFormFactors.map((f) => (
                    <span key={f} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-xs border border-slate-200">
                      <span>Form Factor: {f}</span>
                      <button onClick={() => toggleFormFactor(f)} className="text-slate-500 hover:text-black cursor-pointer">
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

            {/* PRODUCT GRID */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filteredProducts.map((desktop) => (
                  <DesktopCard
                    key={desktop.id}
                    product={desktop}
                    onOpenQuote={(brand, model) => handleOpenQuote(brand, model)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 p-12 text-center my-6">
                <FaDesktop size={32} className="mx-auto text-slate-400 mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-2">No desktops match your selected filters</h3>
                <p className="text-xs text-slate-600 mb-4">Try adjusting your filters or search for another configuration.</p>
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

        {/* MOBILE DRAWER */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs lg:hidden">
            <div className="w-80 max-w-[85%] bg-white h-full p-5 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">Filter Desktops</h3>
                <button onClick={() => setShowMobileFilters(false)} className="text-slate-500 p-1">
                  <FaTimes size={16} />
                </button>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Category</p>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowMobileFilters(false);
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

              <div className="pt-3 border-t border-slate-200">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Brand</p>
                <div className="space-y-1">
                  {BRANDS.map((br) => (
                    <button
                      key={br}
                      onClick={() => {
                        setSelectedBrand(br);
                        setShowMobileFilters(false);
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

              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    clearAllFilters();
                    setShowMobileFilters(false);
                  }}
                  className="w-full py-2 bg-slate-200 text-slate-800 text-xs font-bold uppercase rounded-none"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
            <div className="flex-1" onClick={() => setShowMobileFilters(false)} />
          </div>
        )}

      </div>

      {/* POPULAR CONFIGURATIONS (Expanded to 1720px) */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Popular Pre-Configured Packages
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Purpose-built turnkey workstation packages ready for rapid commercial deployment with full warranty.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {popularConfigs.map((pkg, i) => (
              <a
                key={i}
                href={`https://wa.me/919643990077?text=${encodeURIComponent(`Hi, I am interested in the ${pkg.title} desktop configuration from Authentic Infosystem.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-xl overflow-hidden min-h-[140px] flex items-center justify-center p-4 border border-slate-200 shadow-xs cursor-pointer group hover:shadow-md hover:border-black transition-all block"
              >
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  width="400"
                  height="200"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-colors duration-300" />
                <h3 className="relative z-10 text-white font-extrabold text-sm sm:text-base text-center px-2 tracking-wide drop-shadow-md">
                  {pkg.title}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOM DESKTOP BUILDER CTA (Card matching 1720px span width on white background) */}
      <section className="pt-2 pb-16 bg-white">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="p-8 sm:p-12 lg:p-14 rounded-2xl sm:rounded-3xl border border-[#7fc1f8] shadow-xl relative overflow-hidden bg-gradient-to-r from-[#b3dbfc] via-[#90CAF9] to-[#67aef5] text-slate-950 text-center">
            {/* Atmospheric ambient glow */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/45 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#42A5F5]/35 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
              <p className="text-xs font-black text-[#0B2545] tracking-[4px] uppercase mb-3">CUSTOM WORKSTATIONS</p>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight text-slate-950">
                Build Your Custom Workstation Lab
              </h2>
              <p className="text-slate-800 text-xs sm:text-sm md:text-base mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
                Need custom GPU clusters, dual-socket processors, high-capacity ECC RAM, or liquid-cooled render racks? Our systems engineers craft tailored enterprise rigs with manufacturer warranty.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => handleOpenQuote("Custom", "Workstation Lab")}
                  className="px-8 py-3.5 bg-[#0D254C] hover:bg-[#071731] text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Request Custom Architecture
                </button>
                <a
                  href="https://wa.me/919643990077?text=Hi%2C%20I%20want%20to%20request%20a%20custom%20desktop%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs uppercase tracking-wider rounded-md shadow-md hover:shadow-lg transition-all cursor-pointer border border-white/60"
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
