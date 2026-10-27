"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LaptopCard, { LAPTOP_CATALOG_META } from "./components/LaptopCard";
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
  FaArrowRight,
  FaShieldAlt,
  FaFileInvoiceDollar,
  FaTruck,
  FaHeadset,
  FaThLarge,
  FaList
} from "react-icons/fa";

// Filter taxonomy definitions matching the reference screenshot exactly
const CATEGORIES = [
  { label: "Business", count: 8 },
  { label: "Professional", count: 5 },
  { label: "Creator", count: 6 },
  { label: "Gaming", count: 5 },
  { label: "Workstation", count: 2 },
];

const BRANDS = [
  { label: "Dell", count: 6 },
  { label: "HP", count: 4 },
  { label: "Lenovo", count: 5 },
  { label: "ASUS", count: 4 },
  { label: "Acer", count: 3 },
  { label: "MSI", count: 2 },
];

const CPUS = [
  { label: "Intel Core i3", count: 3 },
  { label: "Intel Core i5", count: 8 },
  { label: "Intel Core i7", count: 7 },
  { label: "Intel Core i9", count: 2 },
  { label: "AMD Ryzen", count: 4 },
];

const RAMS = [
  { label: "8 GB", count: 4 },
  { label: "16 GB", count: 14 },
  { label: "32 GB", count: 6 },
  { label: "64 GB", count: 2 },
];

// Display priority matching screenshot (Dell Alienware, Acer Aspire, HP EliteBook, ASUS ExpertBook)
const PRIORITY_ORDER = ["del_aw_m16", "ace_asp_5", "hp_eb_840", "asu_eb_b9"];

export default function LaptopsPage() {
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCpus, setSelectedCpus] = useState<string[]>([]);
  const [selectedRams, setSelectedRams] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Accordion state (true = expanded)
  const [accordions, setAccordions] = useState({
    category: true,
    brand: true,
    cpu: true,
    ram: true,
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

  const toggleAccordion = (key: keyof typeof accordions) => {
    setAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFilter = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedCpus([]);
    setSelectedRams([]);
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    selectedCpus.length > 0 ||
    selectedRams.length > 0;

  // Filtered & Sorted products
  const filteredLaptops = useMemo(() => {
    let result = LAPTOP_PRODUCTS.filter((laptop) => {
      const meta = LAPTOP_CATALOG_META[laptop.id];
      const title = meta?.title || `${laptop.brand} ${laptop.model}`;
      const cpu = meta?.cpu || laptop.detailedSpecs?.processor || "";
      const ram = meta?.ram || laptop.detailedSpecs?.ram || "";
      const category = meta?.badge2 || laptop.category || "";
      const brand = laptop.brand;

      // Free text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = title.toLowerCase().includes(q);
        const matchesBrand = brand.toLowerCase().includes(q);
        const matchesCpu = cpu.toLowerCase().includes(q);
        const matchesRam = ram.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand && !matchesCpu && !matchesRam) return false;
      }

      // Category filter
      if (selectedCategories.length > 0) {
        const matchesCat = selectedCategories.some(
          (c) => category.toLowerCase() === c.toLowerCase()
        );
        if (!matchesCat) return false;
      }

      // Brand filter
      if (selectedBrands.length > 0) {
        const matchesBr = selectedBrands.some(
          (b) => brand.toLowerCase() === b.toLowerCase()
        );
        if (!matchesBr) return false;
      }

      // CPU filter
      if (selectedCpus.length > 0) {
        const matchesCpu = selectedCpus.some((cpuOpt) => {
          if (cpuOpt === "AMD Ryzen") return cpu.toLowerCase().includes("amd") || cpu.toLowerCase().includes("ryzen");
          const simplified = cpuOpt.replace("Intel Core ", "").toLowerCase();
          return cpu.toLowerCase().includes(simplified) || cpu.toLowerCase().includes(cpuOpt.toLowerCase());
        });
        if (!matchesCpu) return false;
      }

      // RAM filter
      if (selectedRams.length > 0) {
        const matchesRam = selectedRams.some((ramOpt) => {
          const numOnly = ramOpt.replace(" GB", "").trim();
          return ram.toLowerCase().includes(numOnly.toLowerCase());
        });
        if (!matchesRam) return false;
      }

      return true;
    });

    // Sorting logic
    if (sortBy === "recommended") {
      result.sort((a, b) => {
        const aIndex = PRIORITY_ORDER.indexOf(a.id);
        const bIndex = PRIORITY_ORDER.indexOf(b.id);
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        return a.model.localeCompare(b.model);
      });
    } else if (sortBy === "price_asc") {
      result.sort((a, b) => {
        const priceA = LAPTOP_CATALOG_META[a.id]?.priceNum || 0;
        const priceB = LAPTOP_CATALOG_META[b.id]?.priceNum || 0;
        return priceA - priceB;
      });
    } else if (sortBy === "price_desc") {
      result.sort((a, b) => {
        const priceA = LAPTOP_CATALOG_META[a.id]?.priceNum || 0;
        const priceB = LAPTOP_CATALOG_META[b.id]?.priceNum || 0;
        return priceB - priceA;
      });
    } else if (sortBy === "rating") {
      result.sort((a, b) => {
        const ratingA = LAPTOP_CATALOG_META[a.id]?.rating || 0;
        const ratingB = LAPTOP_CATALOG_META[b.id]?.rating || 0;
        return ratingB - ratingA;
      });
    }

    return result;
  }, [
    searchQuery,
    selectedCategories,
    selectedBrands,
    selectedCpus,
    selectedRams,
    sortBy,
  ]);

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-600/20 selection:text-slate-900">
      <Navbar />

      {/* =========================================================================
          HERO BANNER SECTION (50% REDUCED HEIGHT, PRESERVING IMAGE ASPECT RATIO)
          ========================================================================= */}
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mt-[76px] sm:mt-[80px] lg:mt-[82px] mb-8">
        <div 
          className="w-full rounded-[20px] text-white shadow-xl relative overflow-hidden border border-blue-900/30 min-h-[220px] lg:min-h-0 lg:aspect-[2171/362] p-4 sm:p-5 lg:px-7 lg:py-5 xl:px-9 xl:py-6 flex flex-col justify-between bg-gradient-to-r from-[#012258] via-[#022c70] to-[#01183b]"
        >
          {/* Background image container preserving 100% exact image ratio without cropping */}
          <div className="absolute right-0 top-0 bottom-0 h-full pointer-events-none select-none flex justify-end z-10">
            <img 
              src="/Futuristic Blue Tech Laptop Banner.png" 
              alt="Laptops Fleet" 
              className="h-full w-auto object-contain object-right"
              style={{
                maskImage: "linear-gradient(to right, transparent, black 25%)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 25%)"
              }}
            />
          </div>

          {/* Subtle mobile readability overlay */}
          <div className="absolute inset-0 bg-[#061B3D]/70 sm:bg-[#061B3D]/40 lg:hidden pointer-events-none z-15" />

          {/* DESKTOP THREE-PART LAYOUT */}
          <div className="relative z-20 hidden lg:flex items-center justify-between h-full gap-5">
            {/* LEFT CONTENT: BREADCRUMB, HEADING, DESCRIPTION & TRUST INDICATORS */}
            <div className="flex flex-col justify-between h-full max-w-xl xl:max-w-2xl z-20 py-1">
              <div>
                {/* Breadcrumb Navigation */}
                <nav className="flex items-center gap-1.5 text-xs lg:text-[13px] text-[#E2EAF5]/85 mb-2.5 select-none font-medium">
                  <Link href="/" prefetch={false} className="hover:text-white transition-colors">Home</Link>
                  <span className="text-[#E2EAF5]/60">&gt;</span>
                  <span className="text-white font-medium">Laptops &amp; Commercial Deals</span>
                </nav>

                {/* Main Heading (32-38px on desktop) */}
                <h1 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-bold tracking-tight text-white mb-3 leading-tight">
                  Laptops &amp; Official Fleet Deals
                </h1>

                {/* Description (14-16px) */}
                <p className="text-[13.5px] sm:text-[14px] lg:text-[15.5px] text-[#E2EAF5] font-normal leading-relaxed mb-4 max-w-xl">
                  Certified commercial fleets, genuine products, GST invoicing and volume pricing.
                </p>
              </div>

              {/* 4 Trust Indicators along the bottom-left */}
              <div className="flex items-center gap-3 xl:gap-5 text-[#E2EAF5] text-[11px] lg:text-[12.5px] font-medium pt-2 select-none">
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

            {/* SPACER FOR BACKGROUND LAPTOPS */}
            <div className="flex-1 h-full pointer-events-none select-none min-w-[200px]" />

            {/* RIGHT SEARCH BAR */}
            <div className="w-full lg:w-auto shrink-0 z-20 self-start mt-1">
              <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-slate-200/90 p-1.5 pl-3.5 w-full sm:w-[320px] lg:w-[330px] xl:w-[360px] focus-within:ring-2 focus-within:ring-[#2563EB] focus-within:border-transparent transition-all">
                <svg className="w-4 h-4 text-[#64748B] mr-2.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search models, series, CPU, RAM..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const catalogSection = document.getElementById("matching-results-section");
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
                    className="text-slate-400 hover:text-slate-600 mr-2 p-1 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <FaTimes size={11} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const catalogSection = document.getElementById("matching-results-section");
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

          {/* MOBILE / TABLET STACKED LAYOUT (< lg) */}
          <div className="relative z-20 flex lg:hidden flex-col gap-3 py-1">
            <nav className="flex items-center gap-1.5 text-xs text-[#E2EAF5]/85 select-none font-medium">
              <Link href="/" prefetch={false} className="hover:text-white transition-colors">Home</Link>
              <span className="text-[#E2EAF5]/60">&gt;</span>
              <span className="text-white font-medium">Laptops &amp; Commercial Deals</span>
            </nav>

            <p className="text-2xl font-bold tracking-tight text-white leading-tight" aria-hidden="true">
              Laptops &amp; Official Fleet Deals
            </p>

            <p className="text-xs text-[#E2EAF5] font-normal leading-relaxed">
              Certified commercial fleets, genuine products, GST invoicing and volume pricing.
            </p>

            <div className="w-full">
              <div className="relative flex items-center bg-white rounded-xl shadow-md border border-slate-200/90 p-1.5 pl-3.5 w-full focus-within:ring-2 focus-within:ring-[#2563EB] focus-within:border-transparent transition-all">
                <svg className="w-4 h-4 text-[#64748B] mr-2.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search models, series, CPU, RAM..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const catalogSection = document.getElementById("matching-results-section");
                      if (catalogSection) {
                        catalogSection.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }
                  }}
                  className="w-full text-xs text-slate-800 placeholder-[#64748B] focus:outline-none bg-transparent font-normal"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-slate-400 hover:text-slate-600 mr-2 p-1"
                    aria-label="Clear search"
                  >
                    <FaTimes size={11} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const catalogSection = document.getElementById("matching-results-section");
                    if (catalogSection) {
                      catalogSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className="bg-[#061B3D] hover:bg-[#0B3672] text-white px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors shrink-0 cursor-pointer shadow-xs active:scale-98"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[#E2EAF5] text-[11px] font-medium pt-1">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <span>100% Genuine Products</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span>GST Invoicing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V15.5c0-.442-.26-.84-.666-1.013l-3.344-1.433a1.5 1.5 0 00-.59-.12H15V6.75A1.125 1.125 0 0013.875 5.625H4.5A1.125 1.125 0 003.375 6.75v7.5" />
                </svg>
                <span>Bulk Pricing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0118 0v6M3 18a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v3zm18 0a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v3z" />
                </svg>
                <span>Dedicated Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN 2-COLUMN CATALOG CONTAINER (FILTERS SIDEBAR + 4-COL PRODUCTS GRID)
          ========================================================================= */}
      <div className="w-full max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 pb-16">

        {/* 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT SIDEBAR FILTERS ================= */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-3 pr-2">
            {/* Header: Filters + Clear all */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Filters
              </h2>
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
              >
                Clear all
              </button>
            </div>

            {/* ACCORDION 1: PRODUCT CATEGORY */}
            <div className="border-b border-slate-200 pb-3 mb-3">
              <button
                type="button"
                onClick={() => toggleAccordion("category")}
                className="flex items-center justify-between w-full py-1 text-left cursor-pointer group"
              >
                <span className="text-[11px] font-bold tracking-wider text-slate-900 uppercase">
                  PRODUCT CATEGORY
                </span>
                {accordions.category ? (
                  <FaChevronUp size={10} className="text-slate-500 group-hover:text-slate-800" />
                ) : (
                  <FaChevronDown size={10} className="text-slate-500 group-hover:text-slate-800" />
                )}
              </button>
              {accordions.category && (
                <div className="mt-2.5 space-y-1.5">
                  {CATEGORIES.map((cat) => {
                    const isChecked = selectedCategories.includes(cat.label);
                    return (
                      <label key={cat.label} className="flex items-center justify-between text-xs text-slate-700 hover:text-slate-950 cursor-pointer py-0.5 select-none">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleFilter(selectedCategories, setSelectedCategories, cat.label)}
                            className="rounded border-slate-300 text-blue-600 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                          />
                          <span className={isChecked ? "font-semibold text-slate-950" : ""}>
                            {cat.label}
                          </span>
                        </div>
                        <span className="text-slate-400 text-xs">({cat.count})</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ACCORDION 3: BRAND */}
            <div className="border-b border-slate-200 pb-3 mb-3">
              <button
                type="button"
                onClick={() => toggleAccordion("brand")}
                className="flex items-center justify-between w-full py-1 text-left cursor-pointer group"
              >
                <span className="text-[11px] font-bold tracking-wider text-slate-900 uppercase">
                  BRAND
                </span>
                {accordions.brand ? (
                  <FaChevronUp size={10} className="text-slate-500 group-hover:text-slate-800" />
                ) : (
                  <FaChevronDown size={10} className="text-slate-500 group-hover:text-slate-800" />
                )}
              </button>
              {accordions.brand && (
                <div className="mt-2.5 space-y-1.5">
                  {BRANDS.map((b) => {
                    const isChecked = selectedBrands.includes(b.label);
                    return (
                      <label key={b.label} className="flex items-center justify-between text-xs text-slate-700 hover:text-slate-950 cursor-pointer py-0.5 select-none">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleFilter(selectedBrands, setSelectedBrands, b.label)}
                            className="rounded border-slate-300 text-blue-600 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                          />
                          <span className={isChecked ? "font-semibold text-slate-950" : ""}>
                            {b.label}
                          </span>
                        </div>
                        <span className="text-slate-400 text-xs">({b.count})</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ACCORDION 4: CPU */}
            <div className="border-b border-slate-200 pb-3 mb-3">
              <button
                type="button"
                onClick={() => toggleAccordion("cpu")}
                className="flex items-center justify-between w-full py-1 text-left cursor-pointer group"
              >
                <span className="text-[11px] font-bold tracking-wider text-slate-900 uppercase">
                  CPU
                </span>
                {accordions.cpu ? (
                  <FaChevronUp size={10} className="text-slate-500 group-hover:text-slate-800" />
                ) : (
                  <FaChevronDown size={10} className="text-slate-500 group-hover:text-slate-800" />
                )}
              </button>
              {accordions.cpu && (
                <div className="mt-2.5 space-y-1.5">
                  {CPUS.map((c) => {
                    const isChecked = selectedCpus.includes(c.label);
                    return (
                      <label key={c.label} className="flex items-center justify-between text-xs text-slate-700 hover:text-slate-950 cursor-pointer py-0.5 select-none">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleFilter(selectedCpus, setSelectedCpus, c.label)}
                            className="rounded border-slate-300 text-blue-600 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                          />
                          <span className={isChecked ? "font-semibold text-slate-950" : ""}>
                            {c.label}
                          </span>
                        </div>
                        <span className="text-slate-400 text-xs">({c.count})</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ACCORDION 5: RAM (Grid display matching screenshot) */}
            <div className="border-b border-slate-200 pb-3 mb-3">
              <button
                type="button"
                onClick={() => toggleAccordion("ram")}
                className="flex items-center justify-between w-full py-1 text-left cursor-pointer group"
              >
                <span className="text-[11px] font-bold tracking-wider text-slate-900 uppercase">
                  RAM
                </span>
                {accordions.ram ? (
                  <FaChevronUp size={10} className="text-slate-500 group-hover:text-slate-800" />
                ) : (
                  <FaChevronDown size={10} className="text-slate-500 group-hover:text-slate-800" />
                )}
              </button>
              {accordions.ram && (
                <div className="mt-2.5 grid grid-cols-3 gap-y-2 gap-x-1">
                  {RAMS.map((r) => {
                    const isChecked = selectedRams.includes(r.label);
                    return (
                      <label key={r.label} className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-950 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleFilter(selectedRams, setSelectedRams, r.label)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                        />
                        <span className={isChecked ? "font-semibold text-slate-950" : ""}>
                          {r.label} <span className="text-slate-400 text-[11px]">({r.count})</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          </aside>

          {/* ================= RIGHT CATALOG CONTENT COLUMN ================= */}
          <div className="lg:col-span-9 xl:col-span-9">
            
            {/* RESULTS HEADER ROW (COUNT, SORT BY & VIEW TOGGLE) */}
            <div id="matching-results-section" className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 mb-5 scroll-mt-24">
              {/* Left: Matching Results Count & Mobile Filter Trigger */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setShowMobileFilterDrawer(true)}
                  className="flex lg:hidden items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold border border-slate-200 shadow-2xs cursor-pointer"
                >
                  <FaFilter size={10} className="text-blue-600" />
                  <span>Filters {hasActiveFilters ? `(${selectedCategories.length + selectedBrands.length + selectedCpus.length + selectedRams.length})` : ""}</span>
                </button>
                <h2 className="text-sm sm:text-xl lg:text-[22px] font-bold text-slate-900 tracking-tight">
                  {filteredLaptops.length} <span className="hidden sm:inline">matching</span> results
                </h2>
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
                    className="bg-white border border-slate-300 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600 cursor-pointer shadow-2xs"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                {/* View Mode Toggle Buttons */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer ${
                      viewMode === "grid"
                        ? "bg-[#0c2340] text-white shadow-xs"
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
                        ? "bg-[#0c2340] text-white shadow-xs"
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

            {/* PRODUCT CARDS GRID OR LIST */}
            {filteredLaptops.length > 0 ? (
              <div className={viewMode === "list" ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"}>
                {filteredLaptops.map((laptop) => (
                  <LaptopCard
                    key={laptop.id}
                    laptop={laptop}
                    isCompact={viewMode === "list"}
                    onOpenQuote={(brand, model) => handleOpenQuote(brand, model)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-10 text-center my-6">
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  No laptops match your selected filters
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Try clearing some filter criteria or searching with another term.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-[#0c2340] text-white rounded-lg text-xs font-semibold hover:bg-[#12335e] transition-colors"
                >
                  Clear all filters
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
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Filters</h3>
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
                      key={cat.label}
                      onClick={() => {
                        toggleFilter(selectedCategories, setSelectedCategories, cat.label);
                        setShowMobileFilterDrawer(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded ${
                        selectedCategories.includes(cat.label) ? "bg-[#0c2340] text-white font-bold" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {cat.label} ({cat.count})
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
                      key={br.label}
                      onClick={() => {
                        toggleFilter(selectedBrands, setSelectedBrands, br.label);
                        setShowMobileFilterDrawer(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded ${
                        selectedBrands.includes(br.label) ? "bg-[#0c2340] text-white font-bold" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {br.label} ({br.count})
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
                  className="w-full py-2 bg-slate-200 text-slate-800 text-xs font-bold uppercase rounded"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
            <div className="flex-1" onClick={() => setShowMobileFilterDrawer(false)} />
          </div>
        )}

      </div>

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
