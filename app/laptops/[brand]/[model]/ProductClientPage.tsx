"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import QuoteModal from "../../components/QuoteModal";
import LaptopCard from "../../components/LaptopCard";
import { LaptopProduct, LaptopBrand, getLaptopsByBrand } from "../../../data/laptopData";
import { 
  FaChevronRight, 
  FaCheckCircle, 
  FaShieldAlt, 
  FaBuilding, 
  FaWhatsapp, 
  FaPhoneAlt, 
  FaMicrochip, 
  FaMemory, 
  FaHdd, 
  FaTv, 
  FaWeightHanging, 
  FaBatteryFull,
  FaLock,
  FaFileInvoiceDollar,
  FaTruck,
  FaTools,
  FaUserCheck,
  FaLaptopCode,
  FaArrowRight
} from "react-icons/fa";

interface ProductClientPageProps {
  laptop: LaptopProduct;
  brand: LaptopBrand;
}

export default function ProductClientPage({ laptop, brand }: ProductClientPageProps) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "workloads" | "deployment">("specs");

  const relatedLaptops = getLaptopsByBrand(laptop.brandSlug)
    .filter((p) => p.id !== laptop.id)
    .slice(0, 3);

  const formatPrice = (price: number | null) => {
    if (!price) return null;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const whatsappMessage = `Hi Authentic Infosystem, I would like to request enterprise B2B pricing and availability for ${laptop.brand} ${laptop.model} (${laptop.modelNumber}).`;
  const whatsappUrl = `https://wa.me/919643990077?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      <Navbar />

      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200/80 pt-24 pb-3 sm:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <FaChevronRight size={10} className="text-slate-400" />
            <Link href="/laptops" className="hover:text-slate-900 transition-colors">
              Laptops
            </Link>
            <FaChevronRight size={10} className="text-slate-400" />
            <Link href={`/laptops/${laptop.brandSlug}`} className="hover:text-slate-900 transition-colors">
              {laptop.brand}
            </Link>
            <FaChevronRight size={10} className="text-slate-400" />
            <span className="text-slate-950 font-bold truncate max-w-[200px] sm:max-w-none">
              {laptop.model}
            </span>
          </nav>
        </div>
      </div>

      {/* Product Hero Section */}
      <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Image Display */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-slate-50 via-slate-100/70 to-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/90 flex items-center justify-center overflow-hidden shadow-xs">
              <img
                src={laptop.image}
                alt={`${laptop.brand} ${laptop.model}`}
                width="600"
                height="450"
                className="max-h-[340px] w-full object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
                loading="eager"
              />
            </div>

            {/* Quick Fleet Advantage Banner */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 border-r border-slate-200">
                <div className="font-bold text-slate-950">Bulk Invoicing</div>
                <div className="text-[11px] text-slate-500">18% GST Benefit</div>
              </div>
              <div className="p-2 border-r border-slate-200">
                <div className="font-bold text-slate-950">OEM Warranty</div>
                <div className="text-[11px] text-slate-500">Onsite Coverage</div>
              </div>
              <div className="p-2">
                <div className="font-bold text-slate-950">Pan-India</div>
                <div className="text-[11px] text-slate-500">Fast Deployment</div>
              </div>
            </div>
          </div>

          {/* Right Column: Model Overview & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Title & Tagline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight mb-2">
                {laptop.brand} {laptop.model}
              </h1>
              <p className="text-slate-600 text-sm sm:text-base font-medium mb-5 leading-relaxed">
                {laptop.tagline}
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {laptop.description}
              </p>

              {/* Quick Spec Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5 flex items-center gap-1">
                    <FaMicrochip size={10} /> Processor
                  </span>
                  <span className="text-xs font-bold text-slate-900 leading-tight block">
                    {laptop.detailedSpecs.processor.split("(")[0]}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5 flex items-center gap-1">
                    <FaMemory size={10} /> Memory (RAM)
                  </span>
                  <span className="text-xs font-bold text-slate-900 leading-tight block">
                    {laptop.specs.find((s) => s.label === "RAM")?.value || laptop.detailedSpecs.ram.split("(")[0]}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5 flex items-center gap-1">
                    <FaHdd size={10} /> Storage
                  </span>
                  <span className="text-xs font-bold text-slate-900 leading-tight block">
                    {laptop.specs.find((s) => s.label === "Storage")?.value || "512GB / 1TB NVMe"}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5 flex items-center gap-1">
                    <FaTv size={10} /> Display
                  </span>
                  <span className="text-xs font-bold text-slate-900 leading-tight block truncate">
                    {laptop.specs.find((s) => s.label === "Display")?.value || laptop.detailedSpecs.display.split(",")[0]}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5 flex items-center gap-1">
                    <FaWeightHanging size={10} /> Form Factor
                  </span>
                  <span className="text-xs font-bold text-slate-900 leading-tight block">
                    {laptop.detailedSpecs.weight}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5 flex items-center gap-1">
                    <FaShieldAlt size={10} /> Warranty
                  </span>
                  <span className="text-xs font-bold text-slate-900 leading-tight block truncate">
                    {laptop.warranty}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-slate-950 hover:bg-black text-white font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaBuilding size={14} />
                <span>Request B2B Quote</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <FaWhatsapp size={16} />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Tabs Section: Detailed Specs / Workloads / Enterprise Deployment */}
      <section className="py-12 bg-slate-50/80 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tabs Navigation */}
          <div className="flex border-b border-slate-200 mb-8 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-4 px-6 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "specs"
                  ? "border-slate-950 text-slate-950"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              Detailed Specifications
            </button>
            <button
              onClick={() => setActiveTab("workloads")}
              className={`pb-4 px-6 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "workloads"
                  ? "border-slate-950 text-slate-950"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              Who It Is Suitable For & Workloads
            </button>
            <button
              onClick={() => setActiveTab("deployment")}
              className={`pb-4 px-6 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "deployment"
                  ? "border-slate-950 text-slate-950"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              Enterprise Deployment Services
            </button>
          </div>

          {/* TAB 1: DETAILED SPECIFICATIONS TABLE */}
          {activeTab === "specs" && (
            <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
              <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/60">
                <h3 className="text-xl font-extrabold text-slate-950">
                  Full Technical Specifications & Architecture
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Official hardware configurations for {laptop.brand} {laptop.model} ({laptop.modelNumber})
                </p>
              </div>

              <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50">
                  <span className="font-bold text-slate-700">Processor & Architecture</span>
                  <span className="md:col-span-2 text-slate-900 font-medium">{laptop.detailedSpecs.processor}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50">
                  <span className="font-bold text-slate-700">Memory (RAM)</span>
                  <span className="md:col-span-2 text-slate-900 font-medium">{laptop.detailedSpecs.ram}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50">
                  <span className="font-bold text-slate-700">Solid State Storage</span>
                  <span className="md:col-span-2 text-slate-900 font-medium">{laptop.detailedSpecs.storage}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50">
                  <span className="font-bold text-slate-700">Graphics Processing</span>
                  <span className="md:col-span-2 text-slate-900 font-medium">{laptop.detailedSpecs.graphics}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50">
                  <span className="font-bold text-slate-700">Display Panel</span>
                  <span className="md:col-span-2 text-slate-900 font-medium">{laptop.detailedSpecs.display}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50">
                  <span className="font-bold text-slate-700">Operating System</span>
                  <span className="md:col-span-2 text-slate-900 font-medium">{laptop.detailedSpecs.operatingSystem}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50">
                  <span className="font-bold text-slate-700">Battery & Charging</span>
                  <span className="md:col-span-2 text-slate-900 font-medium">{laptop.detailedSpecs.battery}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50">
                  <span className="font-bold text-slate-700">I/O Ports</span>
                  <div className="md:col-span-2 space-y-1 text-slate-900 font-medium">
                    {laptop.detailedSpecs.ports.map((p, idx) => (
                      <div key={idx}>• {p}</div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50">
                  <span className="font-bold text-slate-700">Dimensions & Weight</span>
                  <span className="md:col-span-2 text-slate-900 font-medium">{laptop.detailedSpecs.weight}</span>
                </div>

                {laptop.detailedSpecs.security && (
                  <div className="grid grid-cols-1 md:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50">
                    <span className="font-bold text-slate-700">Security & Biometrics</span>
                    <div className="md:col-span-2 flex flex-wrap gap-1.5">
                      {laptop.detailedSpecs.security.map((sec, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-md text-xs font-semibold">
                          {sec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {laptop.detailedSpecs.camera && (
                  <div className="grid grid-cols-1 md:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50">
                    <span className="font-bold text-slate-700">Camera & Privacy</span>
                    <span className="md:col-span-2 text-slate-900 font-medium">{laptop.detailedSpecs.camera}</span>
                  </div>
                )}

                {laptop.detailedSpecs.audio && (
                  <div className="grid grid-cols-1 md:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50">
                    <span className="font-bold text-slate-700">Audio & Microphones</span>
                    <span className="md:col-span-2 text-slate-900 font-medium">{laptop.detailedSpecs.audio}</span>
                  </div>
                )}

                {laptop.detailedSpecs.wireless && (
                  <div className="grid grid-cols-1 md:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50">
                    <span className="font-bold text-slate-700">Wireless Connectivity</span>
                    <span className="md:col-span-2 text-slate-900 font-medium">{laptop.detailedSpecs.wireless}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 p-4 sm:p-5 hover:bg-slate-50/50 bg-slate-50/40">
                  <span className="font-bold text-slate-700">Official OEM Warranty</span>
                  <span className="md:col-span-2 text-blue-900 font-bold flex items-center gap-1.5">
                    <FaShieldAlt className="text-blue-600" />
                    <span>{laptop.warranty}</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WHO IT IS SUITABLE FOR & WORKLOADS */}
          {activeTab === "workloads" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Suitable Audiences */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4">
                  <FaUserCheck size={12} className="text-blue-600" />
                  <span>Target Corporate Roles</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-950 mb-3">
                  Who is {laptop.model} designed for?
                </h3>
                <p className="text-xs text-slate-600 mb-6">
                  Recommended for organizational departments that demand high reliability and seamless mobility.
                </p>

                <div className="space-y-3">
                  {laptop.targetAudience.map((role, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        0{idx + 1}
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-900">{role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal Workloads */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
                  <FaLaptopCode size={12} className="text-emerald-600" />
                  <span>Optimized Workloads</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-950 mb-3">
                  Recommended Software & Applications
                </h3>
                <p className="text-xs text-slate-600 mb-6">
                  Hardware verified to run these enterprise computing workloads effortlessly.
                </p>

                <div className="space-y-3">
                  {laptop.idealWorkloads.map((workload, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                      <FaCheckCircle className="text-emerald-600 shrink-0" size={16} />
                      <span className="text-xs sm:text-sm font-semibold text-slate-900">{workload}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ENTERPRISE DEPLOYMENT SERVICES */}
          {activeTab === "deployment" && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 mb-2">
                  Enterprise Procurement & Deployment Services
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                  Authentic Infosystem provides full-lifecycle IT management so your hardware arrives ready for immediate deployment on day one.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <FaFileInvoiceDollar className="text-blue-600 mb-3" size={24} />
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Bulk GST Invoicing</h4>
                  <p className="text-xs text-slate-600">
                    Official corporate tax invoice for full 18% GST input tax credit claim.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <FaTools className="text-blue-600 mb-3" size={24} />
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Custom Pre-Configuration</h4>
                  <p className="text-xs text-slate-600">
                    RAM/SSD expansion and corporate OS image preload before shipment.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <FaTruck className="text-blue-600 mb-3" size={24} />
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Pan-India Logistics</h4>
                  <p className="text-xs text-slate-600">
                    Insured direct delivery to multiple office branches and remote employees.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <FaShieldAlt className="text-blue-600 mb-3" size={24} />
                  <h4 className="text-sm font-bold text-slate-900 mb-1">OEM Warranty SLA</h4>
                  <p className="text-xs text-slate-600">
                    Direct on-site support from {laptop.brand} certified service engineers.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-slate-950 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-white">Need a customized quote for this model?</h4>
                  <p className="text-xs text-slate-400">Tell us your fleet size and required delivery timeline.</p>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs rounded-xl cursor-pointer inline-flex items-center justify-center"
                >
                  Request B2B Quote
                </a>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Related Models from Brand */}
      {relatedLaptops.length > 0 && (
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950">
                More {laptop.brand} Enterprise Laptops
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Explore complementary models from the {laptop.brand} corporate lineup
              </p>
            </div>
            <Link
              href={`/laptops/${laptop.brandSlug}`}
              className="text-xs font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1 shrink-0"
            >
              <span>View all {laptop.brand}</span>
              <FaArrowRight size={10} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {relatedLaptops.map((item) => (
              <LaptopCard
                key={item.id}
                laptop={item}
                onOpenQuote={() => window.open(whatsappUrl, "_blank")}
              />
            ))}
          </div>
        </section>
      )}

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialBrand={laptop.brand}
        initialModel={laptop.model}
      />

      <Footer />
    </main>
  );
}
