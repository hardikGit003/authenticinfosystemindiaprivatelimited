"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeader from "../components/shared/SectionHeader";
import BrandCard from "./components/BrandCard";
import LaptopCard from "./components/LaptopCard";
import QuoteModal from "./components/QuoteModal";
import { 
  LAPTOP_BRANDS, 
  LAPTOP_PRODUCTS, 
  getLaptopsByCategory 
} from "../data/laptopData";
import { 
  FaBriefcase,
  FaUserTie,
  FaPalette,
  FaGamepad,
  FaServer,
  FaArrowRight
} from "react-icons/fa";

const requirementTabs = [
  {
    id: "Business",
    name: "Business & Office",
    icon: FaBriefcase,
    tagline: "Essential enterprise fleet reliability, Office 365, ERP workflows, and long battery life.",
    featuredSeries: "ThinkPad E-Series, HP ProBook, Dell Latitude, ASUS VivoBook, Acer TravelMate",
  },
  {
    id: "Professional",
    name: "Professional & Executive",
    icon: FaUserTie,
    tagline: "Featherlight magnesium/carbon chassis, 16:10 high-resolution displays, and Intel vPro security.",
    featuredSeries: "ThinkPad X1 Carbon, HP EliteBook 840, Dell Latitude 7440, ASUS ExpertBook B9, MacBook Air",
  },
  {
    id: "Creator",
    name: "Creator & Editing",
    icon: FaPalette,
    tagline: "Color-accurate OLED/Liquid Retina displays, dedicated NVIDIA RTX Studio GPUs, and fast rendering.",
    featuredSeries: "Yoga Pro 9i, HP Spectre x360, Dell XPS 15, ASUS Zenbook Pro Duo, Acer Swift Go, MacBook Pro",
  },
  {
    id: "Gaming",
    name: "Gaming & High-Compute",
    icon: FaGamepad,
    tagline: "High refresh rate 165Hz-240Hz screens, liquid metal vapor cooling, and max TGP graphics.",
    featuredSeries: "Lenovo Legion, HP OMEN, Dell Alienware, ASUS ROG Strix, Acer Nitro",
  },
  {
    id: "Workstation",
    name: "Workstation & Studio",
    icon: FaServer,
    tagline: "Massive unified memory up to 128GB, ISV certifications, 3D simulation, and AI model training.",
    featuredSeries: "MacBook Pro M3 Max, Dell Precision, Lenovo ThinkPad P-Series",
  },
];

export default function LaptopsPage() {
  const [activeRequirement, setActiveRequirement] = useState("Business");
  const [searchQuery, setSearchQuery] = useState("");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteBrand, setQuoteBrand] = useState("");
  const [quoteModel, setQuoteModel] = useState("");

  const handleOpenQuote = (brand = "", model = "") => {
    setQuoteBrand(brand);
    setQuoteModel(model);
    setIsQuoteModalOpen(true);
  };

  const currentLaptops = getLaptopsByCategory(activeRequirement);

  const searchedLaptops = searchQuery.trim()
    ? LAPTOP_PRODUCTS.filter(
        (p) =>
          p.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.specs.some((s) => s.value.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      <Navbar />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12 sm:pb-16 space-y-16 sm:space-y-24">

        {/* SECTION 1: SHOP BY BRAND */}
        <section id="shop-by-brand" className="scroll-mt-24">
          <SectionHeader
            title="Shop by Brand"
            subtitle="Select your preferred brand to inspect enterprise partnership series, technical specifications, and bulk availability."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10">
            {LAPTOP_BRANDS.map((brand) => (
              <BrandCard key={brand.slug} brand={brand} />
            ))}
          </div>
        </section>

        {/* SECTION 2: CHOOSE BY REQUIREMENT */}
        <section id="choose-by-requirement" className="scroll-mt-24 bg-slate-50/80 rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-xs">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
              <span>WORKLOAD DISCOVERY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight">
              Choose by Requirement
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base mt-2">
              Know your intended workload? Browse purpose-engineered laptops curated by role and performance profile.
            </p>
          </div>

          {/* Workload Tabs */}
          <div className="flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-2.5 mb-8 pb-2 sm:pb-0 scrollbar-hide">
            {requirementTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeRequirement === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveRequirement(tab.id)}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-slate-950 text-white shadow-md scale-102"
                      : "bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-blue-400" : "text-slate-400"} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Laptops Matching This Requirement */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentLaptops.map((laptop) => (
              <LaptopCard
                key={laptop.id}
                laptop={laptop}
                onOpenQuote={(brand, model) => handleOpenQuote(brand, model)}
              />
            ))}
          </div>
        </section>

        </div>

      {/* SECTION 3: WHY ENTERPRISES PARTNER (DARK FULL-WIDTH WORKSTATIONS STYLE) */}
      <section className="w-full bg-black py-16 sm:py-20 lg:py-28 relative border-t border-white/10 overflow-hidden">
        {/* Background Ambience Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* MAIN SECTION HEADER */}
          <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
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

          {/* 4 MODERN LENOVO-STYLE CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-7 items-stretch">
            {/* Card 01 */}
            <div className="bg-white rounded-lg sm:rounded-xl border border-zinc-800/80 hover:border-zinc-600 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1">
              <div className="relative w-full aspect-[2.2/1] sm:aspect-[2/1] bg-black overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-orange-500/10 to-transparent opacity-60 z-10 pointer-events-none" />
                <img
                  src="/Start%20Your%20Build/For%20Everyday%20Productivity.jpg"
                  alt="For Everyday Productivity - Authentic Infosystem Custom Build"
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
                    Reliable desktop and PC systems for office work, students, home users, accounting, browsing, documentation, and everyday business tasks. Choose practical configurations designed for smooth and dependable daily performance.
                  </p>
                </div>
                <div className="mt-auto pt-2">
                  <a
                    href="#choose-by-requirement"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border-2 border-slate-900 bg-transparent text-slate-950 hover:bg-slate-950 hover:text-white font-bold text-sm transition-all duration-200 shadow-xs group/btn text-center cursor-pointer"
                  >
                    <span>Explore Systems</span>
                    <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </div>
            </div>

            {/* Card 02 */}
            <div className="bg-white rounded-lg sm:rounded-xl border border-zinc-800/80 hover:border-zinc-600 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1">
              <div className="relative w-full aspect-[2.2/1] sm:aspect-[2/1] bg-black overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-blue-500/10 to-transparent opacity-60 z-10 pointer-events-none" />
                <img
                  src="/Start%20Your%20Build/For%20Performance-Driven%20Workflows.jpg"
                  alt="For Performance-Driven Workflows - Authentic Infosystem Custom Build"
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
                    High-performance PC systems built for gaming, software development, video editing, graphic design, 3D applications, streaming, and other demanding workloads requiring powerful CPU and GPU performance.
                  </p>
                </div>
                <div className="mt-auto pt-2">
                  <a
                    href="#choose-by-requirement"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border-2 border-slate-900 bg-transparent text-slate-950 hover:bg-slate-950 hover:text-white font-bold text-sm transition-all duration-200 shadow-xs group/btn text-center cursor-pointer"
                  >
                    <span>Explore Systems</span>
                    <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </div>
            </div>

            {/* Card 03 */}
            <div className="bg-white rounded-lg sm:rounded-xl border border-zinc-800/80 hover:border-zinc-600 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1">
              <div className="relative w-full aspect-[2.2/1] sm:aspect-[2/1] bg-black overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-fuchsia-500/10 to-transparent opacity-60 z-10 pointer-events-none" />
                <img
                  src="/Start%20Your%20Build/For%20Professional%20%26%20High-Performance%20Computing.jpg"
                  alt="For Professional & High-Performance Computing - Authentic Infosystem Custom Build"
                  width="800"
                  height="360"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between bg-white">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 mb-3 tracking-tight leading-snug group-hover:text-black transition-colors">
                    For Professional & High-Performance Computing
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    Professional workstation-class systems engineered for demanding applications such as AI & Machine Learning, CAD, engineering, 3D rendering, simulation, data science, and research.
                  </p>
                </div>
                <div className="mt-auto pt-2">
                  <button
                    onClick={() => handleOpenQuote("Workstation", "Custom Machine")}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border-2 border-slate-900 bg-transparent text-slate-950 hover:bg-slate-950 hover:text-white font-bold text-sm transition-all duration-200 shadow-xs group/btn text-center cursor-pointer"
                  >
                    <span>Build Your Machine</span>
                    <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform duration-200" />
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
                  alt="Built for Modern Businesses - Authentic Infosystem Custom Build"
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
                    Business-ready laptops, desktops, and computing systems designed for companies, institutions, startups, and enterprise deployments. Standardized configurations, reliable hardware, and scalable procurement.
                  </p>
                </div>
                <div className="mt-auto pt-2">
                  <button
                    onClick={() => handleOpenQuote("Enterprise", "Business Fleet")}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border-2 border-slate-900 bg-transparent text-slate-950 hover:bg-slate-950 hover:text-white font-bold text-sm transition-all duration-200 shadow-xs group/btn text-center cursor-pointer"
                  >
                    <span>Explore Business Solutions</span>
                    <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
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
