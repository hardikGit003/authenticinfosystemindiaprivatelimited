"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  FaSearch, 
  FaTimes, 
  FaChevronDown, 
  FaChevronUp, 
  FaFilter,
  FaMicrochip, 
  FaMemory, 
  FaDesktop, 
  FaServer, 
  FaWindows, 
  FaApple,
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar,
  FaWhatsapp
} from "react-icons/fa";
import { laptopProducts, desktopProducts, Product } from "../data/products";
import QuoteModal from "../laptops/components/QuoteModal";

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
  title: string;
  description: string;
  targetCategories: string[];
}

const workflows: WorkflowData[] = [
  {
    id: "all",
    tabKey: "all",
    tabLabel: "All Systems",
    title: "Custom PC Configurator & Workstation Builder",
    description:
      "Configure and build custom desktop PCs, AI workstations, high-performance creator rigs, and enterprise systems from certified OEM partners including Lenovo, HP, Dell, ASUS, Acer, and Apple. All systems backed by pan-India onsite warranty and official GST invoicing.",
    targetCategories: ["Basic", "Gaming", "Editing", "Enterprise"],
  },
  {
    id: "everyday-productivity",
    tabKey: "basic",
    tabLabel: "Everyday Productivity",
    title: "Everyday Productivity & Office Computing Rigs",
    description:
      "Curated high-efficiency desktop and laptop configurations engineered for smooth daily office multitasking, ERP accounting software (Tally, SAP, Zoho), browser workflows, documentation, and institutional computing with low power consumption.",
    targetCategories: ["Basic"],
  },
  {
    id: "performance-workflows",
    tabKey: "gaming",
    tabLabel: "Performance & Creator",
    title: "High-Performance Gaming & Video Editing Systems",
    description:
      "Custom high-clock multi-core CPU builds paired with dedicated NVIDIA GeForce RTX & AMD Radeon GPUs, ultra-fast PCIe Gen4 NVMe SSDs, high-speed DDR5 RAM, and high-efficiency thermal cooling for esports, 4K video editing, and content creation.",
    targetCategories: ["Gaming", "Editing"],
  },
  {
    id: "professional-computing",
    tabKey: "workstation",
    tabLabel: "AI & Workstations",
    title: "Professional AI, Deep Learning & CAD Workstations",
    description:
      "ISV-certified enterprise workstations tailored for machine learning model training, LLM inference, AutoCAD, SolidWorks, Revit BIM modeling, ANSYS simulations, and complex data science pipelines with enterprise hardware reliability.",
    targetCategories: ["Editing", "Enterprise", "Gaming"],
  },
  {
    id: "modern-businesses",
    tabKey: "enterprise",
    tabLabel: "Modern Businesses",
    title: "Enterprise Business PC & Commercial Hardware Fleet",
    description:
      "Standardized enterprise laptops and desktop fleets built for startups, corporate offices, educational institutions, and government tenders. Featuring vPro hardware security, Lenovo ThinkCentre/ThinkPad, HP ProDesk, and Dell OptiPlex/Latitude.",
    targetCategories: ["Enterprise"],
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

const BRANDS = ["All", "Lenovo", "HP", "Dell", "Asus", "Acer", "Apple"];
const FORM_FACTORS = ["All Hardware", "Laptops", "Desktops"];
const PROCESSOR_GROUPS = [
  "All Intel® Processors",
  "Intel Core i3",
  "Intel Core i5",
  "Intel Core i7",
  "Intel Core i9",
  "Intel Core Ultra",
  "All AMD Processors",
  "AMD Ryzen 5",
  "AMD Ryzen 7",
  "Apple M-Series",
  "Intel Xeon",
];
const RAM_OPTIONS = ["8GB", "16GB", "32GB", "64GB"];
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

type TaggedProduct = Product & { formFactor: "Laptops" | "Desktops" };

function ConfigProductCard({
  product,
  onOpenQuote,
}: {
  product: TaggedProduct;
  onOpenQuote: (brand: string, model: string) => void;
}) {
  const getSpecValue = (label: string) => {
    const found = product.specs.find((s) => s.label.toLowerCase() === label.toLowerCase());
    return found ? found.value : "";
  };

  const processor = getSpecValue("Processor") || "High-Performance Processor";
  const ram = getSpecValue("RAM") || "16GB High-Speed System Memory";
  const storage = getSpecValue("Storage") || "512GB NVMe SSD";
  const gpu = getSpecValue("GPU") || getSpecValue("Graphics") || (product.formFactor === "Laptops" ? "Integrated High-Definition Graphics" : "Integrated / Dedicated Graphics");
  const formFactorOrOS = product.formFactor === "Laptops" 
    ? (product.brand.toLowerCase() === "apple" ? "macOS Sonoma / Sequoia" : "Windows 11 Pro 64-bit")
    : (getSpecValue("Form Factor") || "Tower Workstation");

  const rating = 4.7;
  const reviewCount = Math.floor(130 + ((product.name.length * 19) % 360));

  const handleQuoteClick = () => {
    onOpenQuote(product.brand || "Custom Hardware", `${product.name} (${product.modelNumber || product.formFactor})`);
  };

  const renderStars = (score: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (score >= i) {
        stars.push(<FaStar key={i} className="text-amber-400" size={11} />);
      } else if (score >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-amber-400" size={11} />);
      } else {
        stars.push(<FaRegStar key={i} className="text-amber-300" size={11} />);
      }
    }
    return stars;
  };

  const features = [
    product.formFactor === "Laptops"
      ? "High-efficiency anti-glare display with low blue-light certification"
      : `${formFactorOrOS} chassis engineered for whisper-quiet acoustics & airflow`,
    product.formFactor === "Laptops"
      ? "Discrete enterprise hardware security chip & camera privacy shutter"
      : "Tool-less expansion bays supporting enterprise PCIe & memory upgrades",
    product.warranty || "Includes manufacturer comprehensive onsite 3-year enterprise warranty",
  ];

  return (
    <div className="bg-white border border-slate-200 hover:border-slate-400 rounded-lg p-4 sm:p-4.5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg relative group h-full">
      <div>
        {/* MODEL TITLE (Lenovo Navy Blue) */}
        <div className="mb-1">
          <button onClick={handleQuoteClick} className="block text-left group/title w-full cursor-pointer">
            <h3 className="text-[#0f3e99] group-hover/title:underline font-bold text-xs sm:text-sm leading-snug line-clamp-2 min-h-[36px]">
              {product.brand} {product.name} - {processor.split("(")[0].trim()}, {ram}, {storage}
            </h3>
          </button>
        </div>

        {/* STAR RATING */}
        <div className="flex items-center gap-1.5 mb-2.5 text-xs">
          <div className="flex items-center gap-0.5">{renderStars(rating)}</div>
          <span className="font-bold text-slate-900 text-[11px]">{rating.toFixed(1)}</span>
          <span className="text-slate-500 text-[11px]">({reviewCount})</span>
        </div>

        {/* PRODUCT IMAGE (Centered on Clean Background) */}
        <div 
          onClick={handleQuoteClick}
          className="relative w-full h-40 sm:h-44 bg-white flex items-center justify-center p-2 mb-3 overflow-hidden group-hover:scale-102 transition-transform duration-300 cursor-pointer"
        >
          <img
            src={product.image}
            alt={`${product.name} - ${product.modelNumber}`}
            width="280"
            height="190"
            loading="lazy"
            className="max-h-full max-w-full object-contain drop-shadow-sm"
          />
        </div>

        {/* TECH SPECS WITH ICONS */}
        <div className="mt-3 space-y-2 py-2.5 border-t border-slate-100 text-[11px] text-slate-700">
          {/* Processor */}
          <div className="flex items-start gap-2">
            <FaMicrochip className="text-slate-800 shrink-0 mt-0.5" size={12} />
            <span className="line-clamp-2 leading-tight text-slate-900 font-medium">{processor}</span>
          </div>

          {/* Form Factor / OS */}
          <div className="flex items-center gap-2">
            {product.formFactor === "Laptops" ? (
              product.brand.toLowerCase() === "apple" ? (
                <FaApple className="text-slate-800 shrink-0" size={12} />
              ) : (
                <FaWindows className="text-slate-800 shrink-0" size={12} />
              )
            ) : (
              <FaServer className="text-slate-800 shrink-0" size={12} />
            )}
            <span className="truncate text-slate-900 font-medium">{formFactorOrOS}</span>
          </div>

          {/* GPU */}
          <div className="flex items-center gap-2">
            <FaDesktop className="text-slate-800 shrink-0" size={12} />
            <span className="truncate text-slate-900 font-medium">{gpu}</span>
          </div>

          {/* Memory & Storage */}
          <div className="flex items-center gap-2">
            <FaMemory className="text-slate-800 shrink-0" size={12} />
            <span className="truncate text-slate-900 font-medium">{ram} | {storage}</span>
          </div>
        </div>

        {/* ADDITIONAL SPECS LINK */}
        <div className="pt-1 pb-2">
          <button
            onClick={handleQuoteClick}
            className="text-[11px] font-bold text-[#0f3e99] hover:underline inline-block cursor-pointer"
          >
            Additional Specs & Configs
          </button>
        </div>

        {/* FEATURES BULLET LIST */}
        <div className="pt-2 border-t border-slate-100 text-xs text-slate-700 mb-3">
          <div className="font-bold text-slate-900 text-[11px] uppercase tracking-wider mb-1.5">
            Features
          </div>
          <ul className="space-y-1 text-slate-600 text-[11px] leading-relaxed">
            {features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-slate-400 select-none">•</span>
                <span className="line-clamp-2">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* PRIMARY CTA BUTTON (Full Width Corporate Lenovo Blue) */}
      <div className="mt-auto pt-2">
        <button
          onClick={handleQuoteClick}
          className="w-full bg-[#1546a0] hover:bg-[#003d7e] active:bg-[#00285a] text-white font-bold py-2.5 px-3 text-xs tracking-wider rounded-md transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer uppercase"
        >
          <span>Request Quote</span>
        </button>
      </div>
    </div>
  );
}

export default function Configurator({
  defaultSystem = "all",
}: {
  defaultSystem?: SystemType;
}) {
  const searchParams = useSearchParams();
  const systemQuery = searchParams.get("system");

  // Filters state
  const [activeTab, setActiveTab] = useState<SystemType>(() => {
    if (systemQuery) return normalizeSystemKey(systemQuery);
    return normalizeSystemKey(defaultSystem);
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [processorSearch, setProcessorSearch] = useState("");
  const [selectedFormFactor, setSelectedFormFactor] = useState("All Hardware");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedProcessors, setSelectedProcessors] = useState<string[]>([]);
  const [selectedRams, setSelectedRams] = useState<string[]>([]);
  const [selectedStorages, setSelectedStorages] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Accordion state
  const [accordions, setAccordions] = useState({
    formFactor: true,
    workflow: true,
    brand: true,
    processor: true,
    ram: true,
    storage: true,
  });

  // Quote modal state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteBrand, setQuoteBrand] = useState("");
  const [quoteModel, setQuoteModel] = useState("");

  const handleOpenQuote = (brand = "", model = "") => {
    const msg = `Hi Authentic Infosystem, I would like to request an official custom build quote for ${brand} ${model}.`;
    window.open(`https://wa.me/919643990077?text=${encodeURIComponent(msg)}`, "_blank");
  };

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
  const allProducts: TaggedProduct[] = useMemo(() => {
    const laptopsWithTag: TaggedProduct[] = laptopProducts.map((p) => ({ ...p, formFactor: "Laptops" }));
    const desktopsWithTag: TaggedProduct[] = desktopProducts.map((p) => ({ ...p, formFactor: "Desktops" }));
    return [...laptopsWithTag, ...desktopsWithTag];
  }, []);

  // Filter products based on workflow category and hardware attributes
  const filteredProducts = useMemo(() => {
    const targetCats = currentWorkflow.targetCategories;

    const result = allProducts.filter((product) => {
      // Workflow Category Filter
      const matchesCategory = targetCats.includes(product.category);
      if (!matchesCategory) return false;

      // Text search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesModel = product.modelNumber.toLowerCase().includes(query);
        const matchesSpecs = product.specs.some(
          (s) => s.label.toLowerCase().includes(query) || s.value.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesBrand && !matchesModel && !matchesSpecs) return false;
      }

      // Form Factor Filter
      if (selectedFormFactor !== "All Hardware") {
        if (selectedFormFactor === "Laptops" && product.formFactor !== "Laptops") return false;
        if (selectedFormFactor === "Desktops" && product.formFactor !== "Desktops") return false;
      }

      // Brand Filter
      if (selectedBrand !== "All" && product.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }

      // Processor group filter
      if (selectedProcessors.length > 0) {
        const procSpec = product.specs.find((s) => s.label.toLowerCase() === "processor")?.value || "";
        const procLower = procSpec.toLowerCase();

        const matchesProc = selectedProcessors.some((pGroup) => {
          if (pGroup === "All Intel® Processors") return procLower.includes("intel");
          if (pGroup === "Intel Core i3") return procLower.includes("i3");
          if (pGroup === "Intel Core i5") return procLower.includes("i5");
          if (pGroup === "Intel Core i7") return procLower.includes("i7");
          if (pGroup === "Intel Core i9") return procLower.includes("i9");
          if (pGroup === "Intel Core Ultra") return procLower.includes("ultra");
          if (pGroup === "All AMD Processors") return procLower.includes("amd") || procLower.includes("ryzen");
          if (pGroup === "AMD Ryzen 5") return procLower.includes("ryzen 5") || procLower.includes("r5");
          if (pGroup === "AMD Ryzen 7") return procLower.includes("ryzen 7") || procLower.includes("r7");
          if (pGroup === "Apple M-Series") return procLower.includes("apple") || procLower.includes("m1") || procLower.includes("m2") || procLower.includes("m3");
          if (pGroup === "Intel Xeon") return procLower.includes("xeon");
          return procLower.includes(pGroup.toLowerCase());
        });

        if (!matchesProc) return false;
      }

      // RAM filter
      if (selectedRams.length > 0) {
        const ramSpec = product.specs.find((s) => s.label.toLowerCase() === "ram")?.value || "";
        const matchesRam = selectedRams.some((r) => ramSpec.toLowerCase().includes(r.toLowerCase()));
        if (!matchesRam) return false;
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
    allProducts,
    currentWorkflow,
    searchQuery,
    selectedFormFactor,
    selectedBrand,
    selectedProcessors,
    selectedRams,
    selectedStorages,
  ]);

  // Compute counts for UI checkboxes
  const counts = useMemo(() => {
    return {
      total: allProducts.length,
      brands: BRANDS.reduce((acc, brand) => {
        acc[brand] = brand === "All"
          ? allProducts.length
          : allProducts.filter((p) => p.brand.toLowerCase() === brand.toLowerCase()).length;
        return acc;
      }, {} as Record<string, number>),
      formFactors: {
        "All Hardware": allProducts.length,
        "Laptops": allProducts.filter((p) => p.formFactor === "Laptops").length,
        "Desktops": allProducts.filter((p) => p.formFactor === "Desktops").length,
      },
      rams: RAM_OPTIONS.reduce((acc, ram) => {
        acc[ram] = allProducts.filter((p) => {
          const spec = p.specs.find((s) => s.label.toLowerCase() === "ram")?.value || "";
          return spec.toLowerCase().includes(ram.toLowerCase());
        }).length;
        return acc;
      }, {} as Record<string, number>),
      storages: STORAGE_OPTIONS.reduce((acc, st) => {
        const cleanSt = st.toLowerCase().replace(" ssd", "");
        acc[st] = allProducts.filter((p) => {
          const spec = p.specs.find((s) => s.label.toLowerCase() === "storage")?.value || "";
          return spec.toLowerCase().includes(cleanSt);
        }).length;
        return acc;
      }, {} as Record<string, number>),
      processors: PROCESSOR_GROUPS.reduce((acc, pg) => {
        acc[pg] = allProducts.filter((p) => {
          const proc = (p.specs.find((s) => s.label.toLowerCase() === "processor")?.value || "").toLowerCase();
          if (pg === "All Intel® Processors") return proc.includes("intel");
          if (pg === "Intel Core i3") return proc.includes("i3");
          if (pg === "Intel Core i5") return proc.includes("i5");
          if (pg === "Intel Core i7") return proc.includes("i7");
          if (pg === "Intel Core i9") return proc.includes("i9");
          if (pg === "Intel Core Ultra") return proc.includes("ultra");
          if (pg === "All AMD Processors") return proc.includes("amd") || proc.includes("ryzen");
          if (pg === "AMD Ryzen 5") return proc.includes("ryzen 5") || proc.includes("r5");
          if (pg === "AMD Ryzen 7") return proc.includes("ryzen 7") || proc.includes("r7");
          if (pg === "Apple M-Series") return proc.includes("apple") || proc.includes("m1") || proc.includes("m2") || proc.includes("m3");
          if (pg === "Intel Xeon") return proc.includes("xeon");
          return proc.includes(pg.toLowerCase());
        }).length;
        return acc;
      }, {} as Record<string, number>),
    };
  }, [allProducts]);

  const toggleAccordion = (key: keyof typeof accordions) => {
    setAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAllAccordions = (expand: boolean) => {
    setAccordions({
      formFactor: expand,
      workflow: expand,
      brand: expand,
      processor: expand,
      ram: expand,
      storage: expand,
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

  const toggleStorage = (st: string) => {
    setSelectedStorages((prev) =>
      prev.includes(st) ? prev.filter((s) => s !== st) : [...prev, st]
    );
  };

  const clearAllFilters = () => {
    setActiveTab("all");
    setSelectedFormFactor("All Hardware");
    setSelectedBrand("All");
    setSelectedProcessors([]);
    setSelectedRams([]);
    setSelectedStorages([]);
    setSearchQuery("");
    setProcessorSearch("");
    window.history.pushState(null, "", "/configuration");
  };

  const hasActiveFilters =
    activeTab !== "all" ||
    selectedFormFactor !== "All Hardware" ||
    selectedBrand !== "All" ||
    selectedProcessors.length > 0 ||
    selectedRams.length > 0 ||
    selectedStorages.length > 0 ||
    searchQuery.trim().length > 0;

  const filteredProcessorGroups = useMemo(() => {
    if (!processorSearch.trim()) return PROCESSOR_GROUPS;
    return PROCESSOR_GROUPS.filter((pg) =>
      pg.toLowerCase().includes(processorSearch.toLowerCase())
    );
  }, [processorSearch]);

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-rose-950 selection:text-white">
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
          <nav className="flex items-center gap-2 text-xs text-rose-200/80 mb-2.5 select-none">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-rose-300/40">/</span>
            <span className="text-white font-medium">Custom PC & Workstation Configurator</span>
          </nav>

          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              {currentWorkflow.title}
            </h1>
            <p className="text-xs sm:text-sm text-rose-100/90 mt-2 max-w-4xl leading-relaxed">
              {currentWorkflow.description}
            </p>
          </div>
        </div>
      </section>

      {/* EXPANDED CONTAINER (1720px matching laptops & desktops) */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 sm:pt-8 pb-16">

        {/* WORKFLOW TABS SELECTOR (Lenovo Corporate Style Pills) */}
        <div className="mb-6 pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {workflows.map((wf) => {
              const isActive = activeTab === wf.tabKey;
              return (
                <button
                  key={wf.id}
                  onClick={() => handleTabSelect(wf.tabKey)}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer rounded-md border ${
                    isActive
                      ? "bg-[#1546a0] text-white border-[#1546a0] shadow-xs"
                      : "bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:text-black"
                  }`}
                >
                  {wf.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* MOBILE FILTER TRIGGER */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-900 font-bold text-xs uppercase tracking-wider flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <FaFilter size={12} className="text-[#1546a0]" />
              Filter Systems & Hardware
            </span>
            <span className="text-[11px] text-[#0f3e99] font-semibold">
              {filteredProducts.length} Results
            </span>
          </button>
        </div>

        {/* MAIN 12-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ================= LEFT ACCORDION FILTERS ================= */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-3 sticky top-28 space-y-3">
            
            {/* Header with collapse/expand */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h2 className="text-base font-black text-slate-950 uppercase tracking-wider">
                Filters
              </h2>
              <button
                onClick={() => toggleAllAccordions(false)}
                className="text-xs font-semibold text-slate-500 hover:text-black cursor-pointer"
              >
                Collapse All
              </button>
            </div>

            {/* ACCORDION 1: Form Factor / Hardware Type */}
            <div className="border-b border-slate-200 pb-3">
              <button
                onClick={() => toggleAccordion("formFactor")}
                className="w-full flex items-center justify-between py-2 text-xs font-bold text-slate-900 hover:text-[#0f3e99] cursor-pointer text-left uppercase tracking-wider"
              >
                <span>Hardware Type</span>
                {accordions.formFactor ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
              </button>
              {accordions.formFactor && (
                <div className="space-y-1.5 mt-2 pl-0.5">
                  {FORM_FACTORS.map((ff) => {
                    const isChecked = selectedFormFactor === ff;
                    const count = counts.formFactors[ff as keyof typeof counts.formFactors] || 0;
                    return (
                      <label key={ff} className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-black">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="formFactorRadio"
                            checked={isChecked}
                            onChange={() => setSelectedFormFactor(ff)}
                            className="w-4 h-4 accent-[#1546a0] cursor-pointer"
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
                  {BRANDS.filter((b) => b !== "All").map((brand) => {
                    const isChecked = selectedBrand.toLowerCase() === brand.toLowerCase();
                    const count = counts.brands[brand] || 0;
                    return (
                      <label key={brand} className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-black">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => setSelectedBrand(isChecked ? "All" : brand)}
                            className="w-4 h-4 accent-[#1546a0] rounded-xs cursor-pointer"
                          />
                          <span className={isChecked ? "font-bold text-slate-950" : ""}>{brand}</span>
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
                <div className="mt-2 pl-0.5 space-y-2">
                  <div className="relative mb-2">
                    <input
                      type="text"
                      placeholder="Search Processor"
                      value={processorSearch}
                      onChange={(e) => setProcessorSearch(e.target.value)}
                      className="w-full text-xs py-1.5 pl-7 pr-6 border border-slate-300 rounded-none focus:outline-none focus:border-[#1546a0]"
                    />
                    <FaSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]" />
                    {processorSearch && (
                      <button onClick={() => setProcessorSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black">
                        <FaTimes size={10} />
                      </button>
                    )}
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {filteredProcessorGroups.map((pg) => {
                      const isChecked = selectedProcessors.includes(pg);
                      const count = counts.processors[pg] || 0;
                      return (
                        <label key={pg} className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-black">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleProcessor(pg)}
                              className="w-4 h-4 accent-[#1546a0] rounded-xs cursor-pointer"
                            />
                            <span className={isChecked ? "font-bold text-slate-950" : ""}>{pg}</span>
                          </div>
                          <span className="text-slate-400 text-[11px]">({count})</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ACCORDION 4: RAM */}
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

            {/* ACCORDION 5: Storage */}
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

          {/* ================= RIGHT PRODUCTS SECTION ================= */}
          <div className="lg:col-span-9 xl:col-span-9">

            {/* RESULTS HEADER BAR WITH COMPACT SEARCH */}
            <div className="pb-3 border-b border-slate-200 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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

                {/* Compact & Professional Search Bar */}
                <div className="relative w-full sm:w-80 shrink-0">
                  <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                  <input
                    type="text"
                    placeholder="Search custom configurations, CPUs, GPUs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs focus:outline-none focus:border-[#1546a0] focus:bg-white text-slate-900 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      aria-label="Clear search"
                    >
                      <FaTimes size={11} />
                    </button>
                  )}
                </div>
              </div>

              {/* ACTIVE FILTER CHIPS */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t border-slate-100">
                  {activeTab !== "all" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-xs border border-slate-200">
                      <span>Workflow: {currentWorkflow.tabLabel}</span>
                      <button onClick={() => handleTabSelect("all")} className="text-slate-500 hover:text-black cursor-pointer">
                        <FaTimes size={10} />
                      </button>
                    </span>
                  )}

                  {selectedFormFactor !== "All Hardware" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-xs border border-slate-200">
                      <span>Type: {selectedFormFactor}</span>
                      <button onClick={() => setSelectedFormFactor("All Hardware")} className="text-slate-500 hover:text-black cursor-pointer">
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

            {/* PRODUCT GRID (Standard 4-column responsive) */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filteredProducts.map((product) => (
                  <ConfigProductCard
                    key={product.id}
                    product={product}
                    onOpenQuote={(brand, model) => handleOpenQuote(brand, model)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 p-12 text-center my-6">
                <FaDesktop size={32} className="mx-auto text-slate-400 mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-2">No configurations match your selected filters</h3>
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
                <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">Filter Hardware</h3>
                <button onClick={() => setShowMobileFilters(false)} className="text-slate-500 hover:text-black">
                  <FaTimes size={16} />
                </button>
              </div>

              {/* Mobile Hardware Type */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase mb-2">Hardware Type</h4>
                <div className="space-y-1">
                  {FORM_FACTORS.map((ff) => (
                    <button
                      key={ff}
                      onClick={() => {
                        setSelectedFormFactor(ff);
                        setShowMobileFilters(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-none ${
                        selectedFormFactor === ff ? "bg-[#1546a0] text-white font-bold" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {ff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Brand */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase mb-2">Brand OEM</h4>
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
                  className="w-full py-2 bg-slate-200 text-slate-800 text-xs font-bold uppercase rounded-none cursor-pointer"
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
                href={`https://wa.me/919643990077?text=${encodeURIComponent(`Hi, I am interested in the ${pkg.title} custom hardware configuration from Authentic Infosystem.`)}`}
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

      {/* CUSTOM WORKSTATION BUILDER CTA (Card matching 1720px span width on white background) */}
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
                  href="https://wa.me/919643990077?text=Hi%2C%20I%20want%20to%20request%20a%20custom%20workstation%20build%20quote."
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
    </main>
  );
}
