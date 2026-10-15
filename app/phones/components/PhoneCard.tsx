"use client";

import { 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar,
  FaMicrochip, 
  FaCamera, 
  FaTv, 
  FaBatteryFull,
  FaMemory,
  FaWhatsapp
} from "react-icons/fa";
import { Product } from "../../data/products";

interface PhoneCardProps {
  product: Product;
}

export default function PhoneCard({ product }: PhoneCardProps) {
  const getSpecValue = (label: string) => {
    const found = product.specs.find((s) => s.label.toLowerCase() === label.toLowerCase());
    return found ? found.value : "";
  };

  const processor = getSpecValue("Processor") || "Next-Gen Flagship Processor";
  const display = getSpecValue("Display") || "OLED / AMOLED High-Refresh Display";
  const camera = getSpecValue("Camera") || "Multi-Lens Pro Camera System";
  const battery = getSpecValue("Battery") || "All-Day High-Density Battery";
  const ram = getSpecValue("RAM") || "High-Speed Unified RAM";
  const storage = getSpecValue("Storage") || "Ultra-Fast NVMe / UFS Storage";

  // Deterministic realistic rating
  const rating = 4.8;
  const reviewCount = Math.floor(180 + ((product.name.length * 29) % 450));

  const displayName = product.brand && !product.name.toLowerCase().startsWith(product.brand.toLowerCase())
    ? `${product.brand} ${product.name}`
    : product.name;

  const whatsappMessage = `Hi Authentic Infosystem, I would like to request an official quote and availability for ${displayName} (${product.modelNumber}).`;
  const whatsappUrl = `https://wa.me/919643990077?text=${encodeURIComponent(whatsappMessage)}`;

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
    `${display} with ultra-smooth 120Hz refresh & high peak brightness`,
    `${camera} with advanced computational photography & HDR video`,
    `Includes official brand warranty: ${product.warranty}`,
  ];

  return (
    <div className="bg-white border border-slate-200 hover:border-slate-400 rounded-lg p-4 sm:p-4.5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg relative group h-full">
      <div>
        {/* MODEL TITLE (Lenovo Navy Blue) */}
        <div className="mb-1">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-left group/title w-full cursor-pointer"
          >
            <h3 className="text-[#0f3e99] group-hover/title:underline font-bold text-xs sm:text-sm leading-snug line-clamp-2 min-h-[36px]">
              {displayName} - {processor.split("(")[0].trim()}, {storage.split("/")[0].trim()}
            </h3>
          </a>
        </div>

        {/* STAR RATING */}
        <div className="flex items-center gap-1.5 mb-2.5 text-xs">
          <div className="flex items-center gap-0.5">{renderStars(rating)}</div>
          <span className="font-bold text-slate-900 text-[11px]">{rating.toFixed(1)}</span>
          <span className="text-slate-500 text-[11px]">({reviewCount})</span>
        </div>

        {/* PRODUCT IMAGE (Centered on Clean Background) */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full h-44 sm:h-48 bg-white flex items-center justify-center p-2 mb-3 overflow-hidden group-hover:scale-102 transition-transform duration-300 cursor-pointer block"
        >
          <img
            src={product.image}
            alt={`${product.name} - ${product.modelNumber}`}
            width="260"
            height="260"
            loading="lazy"
            className="max-h-full max-w-full object-contain drop-shadow-sm"
          />
        </a>

        {/* TECH SPECS WITH ICONS */}
        <div className="mt-3 space-y-2 py-2.5 border-t border-slate-100 text-[11px] text-slate-700">
          {/* Processor */}
          <div className="flex items-start gap-2">
            <FaMicrochip className="text-slate-800 shrink-0 mt-0.5" size={12} />
            <span className="line-clamp-1 leading-tight text-slate-900 font-medium">
              <span className="text-slate-500 font-normal">CPU: </span>
              {processor}
            </span>
          </div>

          {/* Display */}
          <div className="flex items-center gap-2">
            <FaTv className="text-slate-800 shrink-0" size={12} />
            <span className="truncate text-slate-900 font-medium">
              <span className="text-slate-500 font-normal">Screen: </span>
              {display}
            </span>
          </div>

          {/* Camera */}
          <div className="flex items-center gap-2">
            <FaCamera className="text-slate-800 shrink-0" size={12} />
            <span className="truncate text-slate-900 font-medium">
              <span className="text-slate-500 font-normal">Camera: </span>
              {camera}
            </span>
          </div>

          {/* Battery */}
          <div className="flex items-center gap-2">
            <FaBatteryFull className="text-slate-800 shrink-0" size={12} />
            <span className="truncate text-slate-900 font-medium">
              <span className="text-slate-500 font-normal">Battery: </span>
              {battery}
            </span>
          </div>

          {/* RAM & Storage */}
          <div className="flex items-center gap-2">
            <FaMemory className="text-slate-800 shrink-0" size={12} />
            <span className="truncate text-slate-900 font-medium">
              <span className="text-slate-500 font-normal">RAM / ROM: </span>
              {ram} | {storage}
            </span>
          </div>
        </div>

        {/* ADDITIONAL SPECS LINK */}
        <div className="pt-1 pb-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold text-[#0f3e99] hover:underline inline-block cursor-pointer"
          >
            Additional Specs & Configs
          </a>
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

      {/* PRIMARY CTA BUTTON (Full Width Corporate Lenovo Blue - Directly to WhatsApp) */}
      <div className="mt-auto pt-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#1546a0] hover:bg-[#003d7e] active:bg-[#00285a] text-white font-bold py-2.5 px-3 text-xs tracking-wider rounded-md transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer uppercase text-center"
        >
          <FaWhatsapp size={14} className="text-emerald-400" />
          <span>Request Quote</span>
        </a>
      </div>
    </div>
  );
}
