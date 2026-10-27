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
  FaDesktop,
  FaWhatsapp,
  FaThLarge,
  FaList
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
  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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

    if (sortBy === "price_asc") {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price_desc") {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "name_desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "name_asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Default recommended sorting (alphabetical by brand and name)
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedProcessors,
    selectedRams,
    selectedFormFactors,
    selectedStorages,
    sortBy,
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
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-600/20 selection:text-slate-900">
      <Navbar />

      {/* =========================================================================
          HERO BANNER SECTION (50% REDUCED HEIGHT, PRESERVING WORKSTATION ASPECT RATIO)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 mt-[76px] sm:mt-[80px] lg:mt-[84px] mb-8">
        <div 
          className="w-full rounded-[20px] text-white shadow-2xl relative overflow-hidden border border-blue-900/30 min-h-[220px] lg:min-h-0 lg:aspect-[2172/362] p-4 sm:p-5 lg:px-7 lg:py-4 xl:px-9 xl:py-4.5 flex flex-col justify-between bg-gradient-to-r from-[#012258] via-[#022c70] to-[#01183b]"
        >
          {/* Background image container preserving 100% exact image ratio without cropping */}
          <div className="absolute right-0 top-0 bottom-0 h-full pointer-events-none select-none flex justify-end z-10">
            <img 
              src="/Futuristic Blue Tech Workstation Banner.png" 
              alt="Enterprise Workstations" 
              className="h-full w-auto object-contain object-right"
              style={{
                maskImage: "linear-gradient(to right, transparent, black 25%)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 25%)"
              }}
            />
          </div>

          {/* Subtle mobile readability overlay */}
          <div className="absolute inset-0 bg-[#061B3D]/70 sm:bg-[#061B3D]/40 lg:hidden pointer-events-none z-15" />

          {/* DESKTOP THREE-PART LAYOUT (lg:flex) */}
          <div className="relative z-20 hidden lg:flex items-center justify-between h-full gap-5">
            {/* 1. LEFT CONTENT: BREADCRUMB, HEADING, DESCRIPTION & TRUST INDICATORS */}
            <div className="flex flex-col justify-between h-full max-w-xl xl:max-w-2xl z-20 py-0.5">
              <div>
                {/* Breadcrumb Navigation */}
                <nav className="flex items-center gap-1.5 text-xs text-[#E5EDF8]/90 mb-1 select-none font-medium">
                  <Link href="/" prefetch={false} className="hover:text-white transition-colors">Home</Link>
                  <span className="text-[#E5EDF8]/60">&gt;</span>
                  <span className="text-white font-medium">Desktops &amp; Workstation Deals</span>
                </nav>

                {/* Main Heading */}
                <h1 className="text-xl sm:text-2xl lg:text-[25px] xl:text-[28px] font-bold tracking-tight text-white mb-1.5 leading-tight">
                  Desktops &amp; Official Workstation Deals
                </h1>

                {/* Supporting Description */}
                <p className="text-[12.5px] sm:text-[13px] lg:text-[13.5px] text-[#E5EDF8] font-normal leading-snug mb-2 max-w-xl">
                  Commercial workstations, mini PCs, AI rendering rigs, 3-year onsite support and GST invoicing.
                </p>
              </div>

              {/* 4 Trust Indicators along the lower-left */}
              <div className="flex items-center gap-3 xl:gap-5 text-[#E5EDF8] text-[11px] lg:text-[11.5px] font-medium pt-1 select-none">
                <div className="flex items-center gap-1.5 shrink-0">
                  <svg className="w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  <span className="whitespace-nowrap">100% Genuine Products</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <svg className="w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <span className="whitespace-nowrap">GST Invoicing</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <svg className="w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V15.5c0-.442-.26-.84-.666-1.013l-3.344-1.433a1.5 1.5 0 00-.59-.12H15V6.75A1.125 1.125 0 0013.875 5.625H4.5A1.125 1.125 0 003.375 6.75v7.5" />
                  </svg>
                  <span className="whitespace-nowrap">Bulk &amp; Corporate Pricing</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <svg className="w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0118 0v6M3 18a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v3zm18 0a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v3z" />
                  </svg>
                  <span className="whitespace-nowrap">Dedicated Support</span>
                </div>
              </div>
            </div>

            {/* 2. CENTER: SPACER TO ALLOW BACKGROUND HARDWARE TO SHINE THROUGH */}
            <div className="flex-1 h-full pointer-events-none select-none min-w-[200px]" />

            {/* 3. RIGHT: SEARCH BAR */}
            <div className="w-full lg:w-auto shrink-0 z-20 self-start mt-1">
              <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-slate-200/90 p-1.5 pl-3.5 w-full sm:w-[320px] lg:w-[330px] xl:w-[360px] focus-within:ring-2 focus-within:ring-[#1456A0] focus-within:border-transparent transition-all">
                <svg className="w-4 h-4 text-[#64748B] mr-2.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search desktop, series, CPU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const catalogSection = document.getElementById("desktop-matching-results-section");
                      if (catalogSection) {
                        catalogSection.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }
                  }}
                  className="w-full text-[13px] text-slate-800 placeholder-[#64748B] focus:outline-none bg-transparent font-normal"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-slate-400 hover:text-slate-600 mr-2 p-1 cursor-pointer transition-colors"
                    aria-label="Clear search"
                  >
                    <FaTimes size={11} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const catalogSection = document.getElementById("desktop-matching-results-section");
                    if (catalogSection) {
                      catalogSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className="bg-[#061B3D] hover:bg-[#0B3672] text-white px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-colors shrink-0 cursor-pointer shadow-xs active:scale-98"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE & TABLET LAYOUT (< lg) */}
          <div className="relative z-20 flex lg:hidden flex-col gap-4 py-2">
            {/* Top Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-[#E5EDF8]/90 select-none font-medium">
              <Link href="/" prefetch={false} className="hover:text-white transition-colors">Home</Link>
              <span className="text-[#E5EDF8]/60">&gt;</span>
              <span className="text-white font-medium">Desktops &amp; Workstation Deals</span>
            </nav>

            {/* Main Heading (Mobile Visual Heading - single semantic H1 in desktop view) */}
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight" aria-hidden="true">
              Desktops, All-in-Ones &amp; Official Workstation Deals
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#E5EDF8] font-normal leading-relaxed">
              Commercial tower workstations, ultra-compact mini PCs, enterprise all-in-ones, and AI rendering rigs with 3-year onsite support and GST invoicing.
            </p>

            {/* Hardware Imagery (Mobile/Tablet) */}
            <div className="w-full max-w-[340px] sm:max-w-[420px] mx-auto my-1 select-none">
              <img
                src="/hero-workstation-lineup.png"
                alt="Commercial Tower Workstations, Mini PCs & All-in-Ones"
                className="w-full h-auto max-h-[140px] sm:max-h-[180px] object-contain filter drop-shadow-xl"
              />
            </div>

            {/* Search Bar (Mobile/Tablet) */}
            <div className="w-full">
              <div className="relative flex items-center bg-white rounded-xl shadow-md border border-slate-200/90 p-1.5 pl-3.5 w-full focus-within:ring-2 focus-within:ring-[#1456A0] focus-within:border-transparent transition-all">
                <svg className="w-4 h-4 text-[#64748B] mr-2.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search desktop, series, CPU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const catalogSection = document.getElementById("desktop-matching-results-section");
                      if (catalogSection) {
                        catalogSection.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }
                  }}
                  className="w-full text-xs sm:text-[13px] text-slate-800 placeholder-[#64748B] focus:outline-none bg-transparent font-normal"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-slate-400 hover:text-slate-600 mr-2 p-1 cursor-pointer transition-colors"
                    aria-label="Clear search"
                  >
                    <FaTimes size={11} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const catalogSection = document.getElementById("desktop-matching-results-section");
                    if (catalogSection) {
                      catalogSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className="bg-[#061B3D] hover:bg-[#0B3672] text-white px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors shrink-0 cursor-pointer shadow-xs active:scale-98"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Trust Indicators (Mobile/Tablet 2x2 grid) */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 text-[#E5EDF8] text-[11px] sm:text-xs font-medium pt-1">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <span>100% Genuine Products</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span>GST Invoicing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V15.5c0-.442-.26-.84-.666-1.013l-3.344-1.433a1.5 1.5 0 00-.59-.12H15V6.75A1.125 1.125 0 0013.875 5.625H4.5A1.125 1.125 0 003.375 6.75v7.5" />
                </svg>
                <span>Bulk Pricing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0118 0v6M3 18a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v3zm18 0a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v3z" />
                </svg>
                <span>Dedicated Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EXPANDED CONTAINER: Wide e-commerce canvas to eliminate dead margins */}
      <div className="catalog-main-content">

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
                    <FaSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={11} />
                    <input
                      type="text"
                      placeholder="Search Processor"
                      value={processorSearch}
                      onChange={(e) => setProcessorSearch(e.target.value)}
                      style={{ paddingLeft: "2.25rem" }}
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
            
            {/* RESULTS HEADER BAR (ALIGNED TOOLBAR WITH SORTING & VIEW TOGGLES) */}
            <div id="desktop-matching-results-section" className="results-summary-bar scroll-mt-24">
              <div className="results-summary-row flex-wrap gap-3 pb-1">
                {/* Left: Matching Results Count & Mobile Filter Trigger */}
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setShowMobileFilters(true)}
                    className="flex lg:hidden items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold border border-slate-200 shadow-2xs cursor-pointer"
                  >
                    <FaFilter size={10} className="text-[#082A5E]" />
                    <span>Filters {hasActiveFilters ? "(Active)" : ""}</span>
                  </button>
                  <h2 className="text-sm sm:text-xl lg:text-[22px] font-bold text-slate-900 tracking-tight">
                    {filteredProducts.length} <span className="hidden sm:inline">Matching</span> results
                  </h2>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs font-bold text-[#082A5E] hover:text-[#2563EB] hover:underline cursor-pointer transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Right: Sort By Dropdown & Grid / List View Toggle */}
                <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs sm:text-sm text-slate-600 font-medium whitespace-nowrap hidden sm:inline">
                      Sort by
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-white border border-slate-300 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:border-[#2563EB] cursor-pointer shadow-2xs"
                    >
                      <option value="recommended">Recommended</option>
                      <option value="name_asc">Name: A to Z</option>
                      <option value="name_desc">Name: Z to A</option>
                    </select>
                  </div>

                  {/* View Mode Toggle Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer ${
                        viewMode === "grid"
                          ? "bg-[#082A5E] text-white shadow-xs"
                          : "bg-white border border-slate-300 text-slate-400 hover:text-slate-700"
                      }`}
                      title="Grid view"
                      aria-label="Grid view"
                    >
                      <FaThLarge size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("list")}
                      className={`p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer ${
                        viewMode === "list"
                          ? "bg-[#082A5E] text-white shadow-xs"
                          : "bg-white border border-slate-300 text-slate-400 hover:text-slate-700"
                      }`}
                      title="List view"
                      aria-label="List view"
                    >
                      <FaList size={12} />
                    </button>
                  </div>
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
              <div className={viewMode === "list" ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"}>
                {filteredProducts.map((desktop) => (
                  <DesktopCard
                    key={desktop.id}
                    product={desktop}
                    isCompact={viewMode === "list"}
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
      <section className="py-14 bg-white border-t border-slate-100">
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

      {/* CUSTOM DESKTOP BUILDER CTA */}
      <section className="pt-8 pb-16 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight text-slate-950">
            Build Your Custom Workstation Lab
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base mb-8 max-w-2xl mx-auto leading-relaxed font-normal">
            Need custom GPU clusters, dual-socket processors, high-capacity ECC RAM, or liquid-cooled render racks? Our systems engineers craft tailored enterprise rigs with manufacturer warranty.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleOpenQuote("Custom", "Workstation Lab")}
              className="px-8 py-3.5 bg-[#0c2340] hover:bg-[#12335e] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer"
            >
              Request Custom Architecture
            </button>
            <a
              href="https://wa.me/919643990077?text=Hi%2C%20I%20want%20to%20request%20a%20custom%20desktop%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border border-[#25D366] inline-flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.99]"
            >
              <FaWhatsapp className="text-base text-white" />
              <span>Chat on WhatsApp</span>
            </a>
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
