"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  FaCheckCircle, 
  FaWhatsapp, 
  FaPhoneAlt, 
  FaUndoAlt, 
  FaSlidersH
} from "react-icons/fa";
import { laptopProducts, desktopProducts, Product } from "../data/products";

export type SystemType =
  | "all"
  | "basic"
  | "productivity"
  | "gaming"
  | "performance"
  | "workstation"
  | "enterprise"
  | "office"
  | "business"
  | "creator"
  | "development";

interface WorkflowData {
  id: string;
  tabKey: SystemType;
  tabLabel: string;
  kicker: string;
  title: string;
  description: string;
  targetCategories: string[];
  accentGradient: string;
}

const workflows: WorkflowData[] = [
  {
    id: "all",
    tabKey: "all",
    tabLabel: "All Systems",
    kicker: "CUSTOM PC & WORKSTATION CONFIGURATOR · OEM HARDWARE",
    title: "Custom PC, AI Workstation & Enterprise Hardware Configurator",
    description:
      "Configure and customize custom desktop PCs, AI workstations, high-performance creator rigs, and enterprise business laptops from certified OEM partners including Lenovo, HP, Dell, ASUS, Acer, and Apple. All systems backed by pan-India onsite warranty, direct OEM component sourcing, and official 18% GST tax invoices.",
    targetCategories: ["Basic", "Gaming", "Editing", "Enterprise"],
    accentGradient: "from-blue-600/10 to-indigo-600/5",
  },
  {
    id: "everyday-productivity",
    tabKey: "basic",
    tabLabel: "Everyday Productivity",
    kicker: "WORKFLOW TIER 01 · EVERYDAY PRODUCTIVITY & OFFICE COMPUTING",
    title: "Custom Everyday Productivity Systems & Office PC Configurator",
    description:
      "Curated high-efficiency desktop and laptop configurations engineered for smooth daily office multitasking, ERP accounting software (Tally, SAP, Zoho), browser workflows, documentation, and institutional computing with low power consumption and rock-solid reliability.",
    targetCategories: ["Basic"],
    accentGradient: "from-amber-500/10 to-orange-500/5",
  },
  {
    id: "performance-workflows",
    tabKey: "gaming",
    tabLabel: "Performance & Creator",
    kicker: "WORKFLOW TIER 02 · HIGH PERFORMANCE GAMING & CREATOR RIGS",
    title: "High-Performance Gaming, Video Editing & Developer Rig Configurator",
    description:
      "Custom high-clock multi-core CPU builds paired with dedicated NVIDIA GeForce RTX & AMD Radeon GPUs, ultra-fast PCIe Gen4 NVMe SSDs, high-speed DDR5 RAM, and high-efficiency thermal cooling for esports, 4K video editing, game development, and high-throughput compilation.",
    targetCategories: ["Gaming", "Editing"],
    accentGradient: "from-cyan-500/10 to-blue-500/5",
  },
  {
    id: "professional-computing",
    tabKey: "workstation",
    tabLabel: "AI & Workstations",
    kicker: "WORKFLOW TIER 03 · PROFESSIONAL AI, CAD & HIGH-COMPUTE WORKSTATIONS",
    title: "Professional AI, Deep Learning & CAD Workstation Configurator",
    description:
      "ISV-certified enterprise workstations tailored for machine learning model training, LLM inference, AutoCAD, SolidWorks, Revit BIM modeling, ANSYS simulations, and complex data science pipelines. Powered by multi-core Intel Core Ultra, Xeon, and NVIDIA RTX Ada Generation professional GPUs.",
    targetCategories: ["Editing", "Enterprise", "Gaming"],
    accentGradient: "from-purple-500/10 to-fuchsia-500/5",
  },
  {
    id: "modern-businesses",
    tabKey: "enterprise",
    tabLabel: "Modern Businesses",
    kicker: "WORKFLOW TIER 04 · ENTERPRISE IT FLEET & COMMERCIAL PROCUREMENT",
    title: "Enterprise Business PC & Commercial Hardware Fleet Configurator",
    description:
      "Standardized enterprise laptops and desktop fleets built for startups, corporate offices, educational institutions, and government tenders. Featuring vPro hardware security, Lenovo ThinkCentre/ThinkPad, HP ProDesk/EliteBook, and Dell OptiPlex/Latitude with bulk B2B pricing, pan-India SLA support, and 18% GST tax invoices.",
    targetCategories: ["Enterprise"],
    accentGradient: "from-emerald-500/10 to-teal-500/5",
  },
];

// Normalize query parameters to matching tabKey
function normalizeSystemKey(raw: string): SystemType {
  const s = raw.toLowerCase();
  if (s === "basic" || s === "productivity") return "basic";
  if (s === "gaming" || s === "performance" || s === "creator" || s === "development") return "gaming";
  if (s === "workstation" || s === "power") return "workstation";
  if (s === "enterprise" || s === "office" || s === "business") return "enterprise";
  return "all";
}

const formFactors = ["All Hardware", "Laptops", "Desktops"];
const brands = ["All", "Lenovo", "HP", "Dell", "Asus", "Acer", "Apple"];
const processors = [
  "All",
  "Intel Core i3",
  "Intel Core i5",
  "Intel Core i7",
  "Intel Core i9",
  "Intel Core Ultra",
  "AMD Ryzen 5",
  "AMD Ryzen 7",
  "Intel Xeon",
];
const rams = ["All", "8GB", "16GB", "32GB", "64GB"];
const storages = ["All", "256GB", "512GB", "1TB", "2TB"];

export default function Configurator({
  defaultSystem = "all",
}: {
  defaultSystem?: SystemType;
}) {
  const searchParams = useSearchParams();
  const systemQuery = searchParams.get("system");

  const [activeTab, setActiveTab] = useState<SystemType>(() => {
    if (systemQuery) return normalizeSystemKey(systemQuery);
    return normalizeSystemKey(defaultSystem);
  });
  const [activeFormFactor, setActiveFormFactor] = useState("All Hardware");
  const [activeBrand, setActiveBrand] = useState("All");
  const [activeProcessor, setActiveProcessor] = useState("All");
  const [activeRAM, setActiveRAM] = useState("All");
  const [activeStorage, setActiveStorage] = useState("All");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state if URL query param or defaultSystem prop changes
  useEffect(() => {
    if (systemQuery) {
      setActiveTab(normalizeSystemKey(systemQuery));
    } else if (defaultSystem) {
      setActiveTab(normalizeSystemKey(defaultSystem));
    }
  }, [systemQuery, defaultSystem]);

  // Current active workflow metadata
  const currentWorkflow = useMemo(() => {
    return workflows.find((w) => w.tabKey === activeTab) || workflows[0];
  }, [activeTab]);

  // Handle tab click with smooth URL state update
  const handleTabSelect = (tabKey: SystemType) => {
    setActiveTab(tabKey);
    const newUrl = tabKey === "all" ? "/configuration" : `/configuration?system=${tabKey}`;
    window.history.pushState(null, "", newUrl);
  };

  // Combine products with form factor tagging
  const allProducts = useMemo(() => {
    const laptopsWithTag = laptopProducts.map((p) => ({ ...p, formFactor: "Laptops" }));
    const desktopsWithTag = desktopProducts.map((p) => ({ ...p, formFactor: "Desktops" }));
    return [...laptopsWithTag, ...desktopsWithTag];
  }, []);

  // Filter products based on workflow category and hardware attributes
  const filteredProducts = useMemo(() => {
    const targetCats = currentWorkflow.targetCategories;

    return allProducts.filter((product) => {
      // Workflow Category Filter
      const matchesCategory = targetCats.includes(product.category);

      // Form Factor Filter
      const matchesFormFactor =
        activeFormFactor === "All Hardware" ||
        (activeFormFactor === "Laptops" && product.formFactor === "Laptops") ||
        (activeFormFactor === "Desktops" && product.formFactor === "Desktops");

      // Brand Filter
      const matchesBrand =
        activeBrand === "All" ||
        product.brand.toLowerCase() === activeBrand.toLowerCase();

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
        matchesFormFactor &&
        matchesBrand &&
        matchesProcessor &&
        matchesRAM &&
        matchesStorage
      );
    });
  }, [
    allProducts,
    currentWorkflow,
    activeFormFactor,
    activeBrand,
    activeProcessor,
    activeRAM,
    activeStorage,
  ]);

  const resetFilters = () => {
    setActiveFormFactor("All Hardware");
    setActiveBrand("All");
    setActiveProcessor("All");
    setActiveRAM("All");
    setActiveStorage("All");
  };

  const hasActiveFilters =
    activeFormFactor !== "All Hardware" ||
    activeBrand !== "All" ||
    activeProcessor !== "All" ||
    activeRAM !== "All" ||
    activeStorage !== "All";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-24 sm:pt-28 pb-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP SEO & WORKFLOW HEADER (DARK THEME) */}
        <div className="relative bg-black rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-zinc-800 shadow-2xl mb-8 overflow-hidden transition-all">
          {/* Subtle Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
              {currentWorkflow.title}
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              {currentWorkflow.description}
            </p>
          </div>
        </div>

        {/* WORKFLOW CATEGORY SELECTOR TABS (Matching 4 Home Page Cards + All Systems) */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs uppercase tracking-widest font-extrabold text-slate-500">
              Select Build Workflow Category
            </p>
            <span className="text-xs font-semibold text-slate-500">
              Showing {filteredProducts.length} Configured Systems
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {workflows.map((wf) => {
              const isActive = activeTab === wf.tabKey;
              return (
                <button
                  key={wf.id}
                  onClick={() => handleTabSelect(wf.tabKey)}
                  className={`py-3 px-4 rounded-xl sm:rounded-2xl border text-center transition-all duration-200 flex items-center justify-center ${
                    isActive
                      ? "bg-slate-950 text-white border-slate-950 shadow-md ring-2 ring-slate-950/20"
                      : "bg-white text-slate-800 border-slate-200 hover:border-slate-400 hover:bg-slate-50 shadow-xs"
                  }`}
                >
                  <span className="text-xs sm:text-sm font-bold leading-tight block">
                    {wf.tabLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MOBILE FILTERS TOGGLE */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowMobileFilters((prev) => !prev)}
            className="w-full py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold flex items-center justify-between text-sm shadow-xs"
          >
            <span className="flex items-center gap-2">
              <FaSlidersH className="text-slate-900" />
              Hardware Filters ({hasActiveFilters ? "Active" : "Default"})
            </span>
            <span className="text-xs font-semibold text-blue-600">
              {showMobileFilters ? "Hide Filters ▲" : "Show Filters ▼"}
            </span>
          </button>
        </div>

        {/* MAIN LAYOUT: SIDEBAR FILTERS + PRODUCT GRID */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT SIDEBAR FILTERS */}
          <aside
            className={`col-span-12 lg:col-span-3 ${
              showMobileFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sticky top-28 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <FaSlidersH className="text-slate-700 text-sm" />
                  Hardware Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                  >
                    <FaUndoAlt className="text-[10px]" />
                    Reset
                  </button>
                )}
              </div>

              {/* Form Factor Filter */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                  Form Factor
                </label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-lg">
                  {formFactors.map((ff) => (
                    <button
                      key={ff}
                      onClick={() => setActiveFormFactor(ff)}
                      className={`py-1.5 text-center text-xs font-bold rounded-md transition-all ${
                        activeFormFactor === ff
                          ? "bg-white text-slate-950 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {ff === "All Hardware" ? "All" : ff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                  Brand OEM
                </label>
                <select
                  value={activeBrand}
                  onChange={(e) => setActiveBrand(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 font-semibold focus:outline-none focus:bg-white focus:border-slate-900 transition-colors appearance-none cursor-pointer"
                >
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b === "All" ? "All Brands (Lenovo, HP, Dell, Asus, Acer, Apple)" : b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Processor Filter */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                  Processor Architecture
                </label>
                <select
                  value={activeProcessor}
                  onChange={(e) => setActiveProcessor(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 font-semibold focus:outline-none focus:bg-white focus:border-slate-900 transition-colors appearance-none cursor-pointer"
                >
                  {processors.map((p) => (
                    <option key={p} value={p}>
                      {p === "All" ? "All Processors (Intel / AMD / Xeon)" : p}
                    </option>
                  ))}
                </select>
              </div>

              {/* RAM Memory Filter */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                  RAM Capacity
                </label>
                <select
                  value={activeRAM}
                  onChange={(e) => setActiveRAM(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 font-semibold focus:outline-none focus:bg-white focus:border-slate-900 transition-colors appearance-none cursor-pointer"
                >
                  {rams.map((r) => (
                    <option key={r} value={r}>
                      {r === "All" ? "All Memory (8GB - 64GB+)" : r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Storage Filter */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                  Storage (NVMe SSD / ROM)
                </label>
                <select
                  value={activeStorage}
                  onChange={(e) => setActiveStorage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 font-semibold focus:outline-none focus:bg-white focus:border-slate-900 transition-colors appearance-none cursor-pointer"
                >
                  {storages.map((s) => (
                    <option key={s} value={s}>
                      {s === "All" ? "All Storage (256GB - 2TB NVMe)" : s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Enterprise Consultation Card */}
              <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 mt-6">
                <p className="text-[11px] uppercase tracking-wider text-cyan-400 font-black mb-1">
                  Custom Architecture?
                </p>
                <h3 className="text-sm font-bold text-white mb-2 leading-tight">
                  Need Custom Specs or Bulk Fleet Quote?
                </h3>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Our certified solutions team designs multi-GPU AI servers, custom RAM/storage expansions, and corporate bulk orders.
                </p>
                <a
                  href={`https://wa.me/919643990077?text=${encodeURIComponent(
                    "Hi Authentic Infosystem, I need a custom system build and quote for our enterprise / custom workload."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-xs"
                >
                  <FaWhatsapp className="text-sm" />
                  Chat With Solution Architect
                </a>
              </div>

            </div>
          </aside>

          {/* RIGHT PRODUCT GRID */}
          <div className="col-span-12 lg:col-span-9">
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-8 shadow-xs">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <FaSlidersH className="text-2xl" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  No Exact Match Found For Selected Filters
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                  We custom-build and configure any configuration on demand. Reset your filters or contact our hardware desk directly.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white rounded-lg font-bold text-sm transition-all shadow-xs"
                  >
                    Reset Hardware Filters
                  </button>
                  <a
                    href="https://wa.me/919643990077?text=Hi%20Authentic%20Infosystem%2C%20I%20am%20looking%20for%20a%20specific%20custom%20system%20configuration."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-sm transition-all shadow-xs inline-flex items-center gap-2"
                  >
                    <FaWhatsapp />
                    Request Custom Spec
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-slate-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                  >
                    {/* PRODUCT IMAGE */}
                    <div className="relative w-full aspect-[16/11] bg-slate-50 p-6 flex items-center justify-center border-b border-slate-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={`${product.name} - Authentic Infosystem Custom Hardware`}
                        width="340"
                        height="240"
                        loading="lazy"
                        className="object-contain w-full h-full max-h-[160px] drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                      {/* CARD CONTENT */}
                      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                        <div>
                          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                            {product.modelNumber || `${product.brand} Hardware`}
                          </p>
                          <h3 className="text-lg font-extrabold text-slate-950 leading-snug mb-4 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>

                          {/* SPECS LIST */}
                          <div className="space-y-2 mb-5">
                            {product.specs.slice(0, 4).map((spec, sIdx) => (
                              <div
                                key={sIdx}
                                className="flex justify-between items-center text-xs py-1 border-b border-slate-100 last:border-0"
                              >
                                <span className="text-slate-500 font-medium">{spec.label}</span>
                                <span className="text-slate-950 font-bold text-right truncate max-w-[62%]">
                                  {spec.value}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* WARRANTY TAG */}
                          <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-600 font-semibold mb-5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60 w-full">
                            <FaCheckCircle className="text-emerald-600 text-xs flex-shrink-0" />
                            <span className="truncate">{product.warranty || "1 Year Onsite Warranty"}</span>
                          </div>
                        </div>

                        {/* CARD ACTION BUTTONS */}
                        <div className="pt-2 border-t border-slate-100">
                          <a
                            href={`https://wa.me/919643990077?text=${encodeURIComponent(
                              `Hi Authentic Infosystem, I would like to request the latest quote, configuration options, and availability for:
Product: ${product.name} (${product.modelNumber})
Workflow Category: ${product.category}
Specs: ${product.specs.map((s) => `${s.label}: ${s.value}`).join(", ")}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-950 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-xs text-center"
                          >
                            <FaWhatsapp className="text-emerald-400 text-base" />
                            <span>Request Custom Quote</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

          </div>
        </div>

        {/* BOTTOM ENTERPRISE & BULK PROCUREMENT BANNER */}
        <div className="mt-16 bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
              <span>B2B & Enterprise Hardware Deployment</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Looking for Non-Standard Specs, Multi-GPU AI Clusters, or Institutional Fleet Sourcing?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-3xl">
              Authentic Infosystem provides tailored IT solutions for businesses, research labs, universities, and creative studios. We source direct from authorized OEM tier-1 distributors with complete GST invoicing, bulk commercial credit terms, and custom SLA agreements across India.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/919643990077?text=Hi%20Authentic%20Infosystem%2C%20we%20require%20a%20commercial%20quote%20for%20enterprise%20systems%20and%20hardware."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg"
              >
                <FaWhatsapp className="text-lg" />
                <span>Contact Enterprise Hardware Desk</span>
              </a>

              <a
                href="tel:+919643990077"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
              >
                <FaPhoneAlt className="text-xs" />
                <span>Call +91 96439 90077</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
