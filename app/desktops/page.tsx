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

      {/* FULL-WIDTH MAROON HEADER SECTION */}
      <section className="maroon-hero-section">
        {/* Subtle ambient luxury highlight */}
        <div className="maroon-hero-glow" />

        <div className="maroon-hero-container">
          {/* Top Breadcrumb */}
          <nav className="maroon-hero-breadcrumb">
            <Link href="/">Home</Link>
            <span className="maroon-hero-breadcrumb-sep">/</span>
            <span className="maroon-hero-breadcrumb-current">Desktops & Workstation Deals</span>
          </nav>

          <div className="maroon-hero-layout">
            <div>
              <h1 className="maroon-hero-title">
                Desktops, All-in-Ones & Official Workstation Deals
              </h1>
              <p className="maroon-hero-desc">
                Commercial tower workstations, ultra-compact mini PCs, enterprise all-in-ones, and AI rendering rigs with 3-year onsite support and GST invoicing.
              </p>
            </div>

            {/* Quick Search on Top */}
            <div className="maroon-hero-search-box">
              <FaSearch className="maroon-hero-search-icon" size={13} />
              <input
                type="text"
                placeholder="Search desktop, series, CPU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="maroon-hero-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="maroon-hero-search-clear"
                  aria-label="Clear search"
                >
                  <FaTimes size={11} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* EXPANDED CONTAINER: Wide e-commerce canvas to eliminate dead margins */}
      <div className="catalog-main-content">

        {/* MOBILE FILTER TRIGGER */}
        <div className="catalog-mobile-trigger">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="catalog-mobile-btn"
          >
            <FaFilter size={11} />
            <span>Filters ({hasActiveFilters ? "Active" : "All"})</span>
          </button>
          <span className="results-count-text">
            {filteredProducts.length} Matching results
          </span>
        </div>

        {/* 2-COLUMN CATALOG LAYOUT */}
        <div className="catalog-layout-2col">
          
          {/* ================= LEFT SIDEBAR FILTERS (Lenovo Accordion Style) ================= */}
          <aside className="catalog-sidebar-col">
            <div className="catalog-sidebar-header">
              <h2 className="catalog-sidebar-title">Filters</h2>
              <button
                onClick={toggleAllAccordions}
                className="catalog-sidebar-toggle-all"
              >
                {areAllExpanded ? "Collapse All" : "Expand All"}
              </button>
            </div>

            {/* ACCORDION 1: Product Category */}
            <div className="catalog-accordion-item">
              <button
                onClick={() => toggleAccordion("category")}
                className="catalog-accordion-btn"
              >
                <span>Product Category</span>
                {accordions.category ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
              </button>
              {accordions.category && (
                <div className="catalog-accordion-body">
                  {CATEGORIES.filter((c) => c !== "All").map((cat) => {
                    const isChecked = selectedCategory.toLowerCase() === cat.toLowerCase();
                    const count = counts.categories[cat] || 0;
                    return (
                      <label key={cat} className="catalog-accordion-label justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => setSelectedCategory(isChecked ? "All" : cat)}
                            className="catalog-accordion-checkbox"
                          />
                          <span className={isChecked ? "font-bold text-slate-950" : ""}>{cat}</span>
                        </div>
                        <span className="catalog-accordion-count">({count})</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ACCORDION 2: Brand */}
            <div className="catalog-accordion-item">
              <button
                onClick={() => toggleAccordion("brand")}
                className="catalog-accordion-btn"
              >
                <span>Brand</span>
                {accordions.brand ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
              </button>
              {accordions.brand && (
                <div className="catalog-accordion-body">
                  {BRANDS.filter((b) => b !== "All").map((br) => {
                    const isChecked = selectedBrand.toLowerCase() === br.toLowerCase();
                    const count = counts.brands[br] || 0;
                    return (
                      <label key={br} className="catalog-accordion-label justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => setSelectedBrand(isChecked ? "All" : br)}
                            className="catalog-accordion-checkbox"
                          />
                          <span className={isChecked ? "font-bold text-slate-950" : ""}>{br}</span>
                        </div>
                        <span className="catalog-accordion-count">({count})</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ACCORDION 3: Processor */}
            <div className="catalog-accordion-item">
              <button
                onClick={() => toggleAccordion("processor")}
                className="catalog-accordion-btn"
              >
                <span>Processor</span>
                {accordions.processor ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
              </button>
              {accordions.processor && (
                <div className="mt-2 space-y-2">
                  <div className="catalog-accordion-search">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={10} />
                    <input
                      type="text"
                      placeholder="Search Processor"
                      value={processorSearch}
                      onChange={(e) => setProcessorSearch(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                    {visibleProcessors.map((proc) => {
                      const isChecked = selectedProcessors.includes(proc);
                      const count = counts.processors[proc] || 0;
                      return (
                        <label key={proc} className="catalog-accordion-label justify-between">
                          <div className="flex items-center gap-2 truncate">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleProcessor(proc)}
                              className="catalog-accordion-checkbox"
                            />
                            <span className={`truncate text-xs ${isChecked ? "font-bold text-slate-950" : ""}`}>
                              {proc}
                            </span>
                          </div>
                          <span className="catalog-accordion-count shrink-0 ml-1">({count})</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ACCORDION 4: Form Factor */}
            <div className="catalog-accordion-item">
              <button
                onClick={() => toggleAccordion("formFactor")}
                className="catalog-accordion-btn"
              >
                <span>Form Factor</span>
                {accordions.formFactor ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
              </button>
              {accordions.formFactor && (
                <div className="catalog-accordion-body">
                  {FORM_FACTORS.map((ff) => {
                    const isChecked = selectedFormFactors.includes(ff);
                    const count = counts.formFactors[ff] || 0;
                    return (
                      <label key={ff} className="catalog-accordion-label justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleFormFactor(ff)}
                            className="catalog-accordion-checkbox"
                          />
                          <span className={isChecked ? "font-bold text-slate-950" : ""}>{ff}</span>
                        </div>
                        <span className="catalog-accordion-count">({count})</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ACCORDION 5: RAM */}
            <div className="catalog-accordion-item">
              <button
                onClick={() => toggleAccordion("ram")}
                className="catalog-accordion-btn"
              >
                <span>Memory (RAM)</span>
                {accordions.ram ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
              </button>
              {accordions.ram && (
                <div className="catalog-accordion-body">
                  {RAM_OPTIONS.map((ram) => {
                    const isChecked = selectedRams.includes(ram);
                    const count = counts.rams[ram] || 0;
                    return (
                      <label key={ram} className="catalog-accordion-label justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleRam(ram)}
                            className="catalog-accordion-checkbox"
                          />
                          <span className={isChecked ? "font-bold text-slate-950" : ""}>{ram}</span>
                        </div>
                        <span className="catalog-accordion-count">({count})</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ACCORDION 6: Storage */}
            <div className="catalog-accordion-item">
              <button
                onClick={() => toggleAccordion("storage")}
                className="catalog-accordion-btn"
              >
                <span>Storage</span>
                {accordions.storage ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
              </button>
              {accordions.storage && (
                <div className="catalog-accordion-body">
                  {STORAGE_OPTIONS.map((st) => {
                    const isChecked = selectedStorages.includes(st);
                    return (
                      <label key={st} className="catalog-accordion-label">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleStorage(st)}
                          className="catalog-accordion-checkbox"
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
          <div className="catalog-products-col">
            
            {/* RESULTS HEADER BAR */}
            <div className="results-summary-bar">
              <div className="results-summary-row">
                <div className="flex items-center gap-3">
                  <span className="results-count-text">
                    {filteredProducts.length} Matching results
                  </span>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="results-clear-btn"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              {/* ACTIVE FILTER CHIPS */}
              {hasActiveFilters && (
                <div className="active-chips-row">
                  {selectedCategory !== "All" && (
                    <span className="filter-chip">
                      <span>Category: {selectedCategory}</span>
                      <button onClick={() => setSelectedCategory("All")} className="filter-chip-remove" aria-label="Remove category filter">
                        <FaTimes size={10} />
                      </button>
                    </span>
                  )}

                  {selectedBrand !== "All" && (
                    <span className="filter-chip">
                      <span>Brand: {selectedBrand}</span>
                      <button onClick={() => setSelectedBrand("All")} className="filter-chip-remove" aria-label="Remove brand filter">
                        <FaTimes size={10} />
                      </button>
                    </span>
                  )}

                  {selectedProcessors.map((p) => (
                    <span key={p} className="filter-chip">
                      <span>Processor: {p}</span>
                      <button onClick={() => toggleProcessor(p)} className="filter-chip-remove" aria-label={`Remove processor ${p}`}>
                        <FaTimes size={10} />
                      </button>
                    </span>
                  ))}

                  {selectedRams.map((r) => (
                    <span key={r} className="filter-chip">
                      <span>RAM: {r}</span>
                      <button onClick={() => toggleRam(r)} className="filter-chip-remove" aria-label={`Remove ram ${r}`}>
                        <FaTimes size={10} />
                      </button>
                    </span>
                  ))}

                  {selectedFormFactors.map((f) => (
                    <span key={f} className="filter-chip">
                      <span>Form Factor: {f}</span>
                      <button onClick={() => toggleFormFactor(f)} className="filter-chip-remove" aria-label={`Remove form factor ${f}`}>
                        <FaTimes size={10} />
                      </button>
                    </span>
                  ))}

                  {searchQuery && (
                    <span className="filter-chip">
                      <span>Search: "{searchQuery}"</span>
                      <button onClick={() => setSearchQuery("")} className="filter-chip-remove" aria-label="Clear search">
                        <FaTimes size={10} />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* PRODUCT GRID */}
            {filteredProducts.length > 0 ? (
              <div className="catalog-cards-grid">
                {filteredProducts.map((desktop) => (
                  <DesktopCard
                    key={desktop.id}
                    product={desktop}
                    onOpenQuote={(brand, model) => handleOpenQuote(brand, model)}
                  />
                ))}
              </div>
            ) : (
              <div className="catalog-empty-box">
                <FaDesktop size={32} className="mx-auto text-slate-400 mb-3" />
                <h3 className="catalog-empty-title">No desktops match your selected filters</h3>
                <p className="catalog-empty-desc">Try adjusting your filters or search for another configuration.</p>
                <button
                  onClick={clearAllFilters}
                  className="catalog-empty-btn"
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
