"use client";

import { useState } from "react";
import { 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar,
  FaMicrochip, 
  FaCamera, 
  FaTv, 
  FaBatteryFull,
  FaMemory,
  FaShieldAlt,
  FaWhatsapp,
  FaHeart,
  FaRegHeart
} from "react-icons/fa";
import { Product } from "../../data/products";

interface PhoneCardProps {
  product: Product;
}

export default function PhoneCard({ product }: PhoneCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

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

  const rating = 4.8;
  const reviewCount = Math.floor(180 + ((product.name.length * 29) % 450));

  const displayName = product.brand && !product.name.toLowerCase().startsWith(product.brand.toLowerCase())
    ? `${product.brand} ${product.name}`
    : product.name;

  const fullTitle = `${displayName} - ${processor.split("(")[0].trim()}, ${ram} / ${storage.split("/")[0].trim()}`;

  const whatsappMessage = `Hi Authentic Infosystem, I would like to request an official B2B quote and availability for ${displayName} (${product.modelNumber}).`;
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

  // Determine badge styling exact to Laptop and Desktop sections
  const badgeText = product.badges && product.badges.length > 0
    ? product.badges[0]
    : product.brand === "Apple"
    ? "Official AppleCare"
    : product.brand === "Samsung"
    ? "Enterprise Edition"
    : "Best Seller";

  const getBadgeStyle = (brand: string) => {
    if (brand.toLowerCase() === "apple") {
      return { bg: "bg-[#0c1e38]", textCol: "text-white" };
    }
    if (brand.toLowerCase() === "samsung") {
      return { bg: "bg-[#1d4ed8]", textCol: "text-white" };
    }
    return { bg: "bg-[#15803d]", textCol: "text-white" };
  };

  const badgeStyle = getBadgeStyle(product.brand || "");

  return (
    <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between h-full transition-all duration-200 hover:shadow-md group">
      <div>
        {/* TOP ROW: WISHLIST HEART */}
        <div className="flex items-center justify-end mb-1">
          <button 
            type="button"
            onClick={() => setIsFavorited(!isFavorited)}
            className="text-slate-400 hover:text-rose-500 transition-colors p-1.5 -mr-1 -mt-1 cursor-pointer shrink-0 min-h-[32px] min-w-[32px] flex items-center justify-center rounded-full hover:bg-slate-50"
            aria-label="Save to wishlist"
          >
            {isFavorited ? (
              <FaHeart className="text-rose-500" size={14} />
            ) : (
              <FaRegHeart size={14} />
            )}
          </button>
        </div>

        {/* PRODUCT IMAGE: Centered on Crisp White Background */}
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full h-[140px] sm:h-[155px] flex items-center justify-center p-1.5 my-1 overflow-hidden group-hover:scale-[1.02] transition-transform duration-300 block"
        >
          <img
            src={product.image}
            alt={fullTitle}
            width="280"
            height="180"
            loading="lazy"
            className="max-h-full max-w-full object-contain filter drop-shadow-sm"
          />
        </a>

        {/* PRODUCT TITLE (Dark Bold font, 2 lines matching Laptop and Desktop sections) */}
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-2 group/title"
        >
          <h3 className="text-[13px] sm:text-[13.5px] font-bold text-slate-900 group-hover/title:text-blue-700 leading-snug line-clamp-2 min-h-[38px] transition-colors">
            {fullTitle}
          </h3>
        </a>

        {/* STAR RATING ROW */}
        <div className="flex items-center gap-1.5 my-2">
          <div className="flex items-center gap-0.5">
            {renderStars(rating)}
          </div>
          <span className="text-xs font-bold text-slate-800 ml-0.5">
            {rating.toFixed(1)}
          </span>
          <span className="text-xs text-slate-400">
            ({reviewCount})
          </span>
        </div>

        {/* TECH SPECS WITH CLEAN ICONS EXACT MATCHING LAPTOP & DESKTOP */}
        <div className="space-y-1.5 my-3 text-[11px] sm:text-[11.5px] text-slate-600 border-t border-slate-100 pt-2.5">
          {/* 1. CPU */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaMicrochip className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">{processor}</span>
          </div>

          {/* 2. Display */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaTv className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">{display}</span>
          </div>

          {/* 3. Camera */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaCamera className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">{camera}</span>
          </div>

          {/* 4. Battery */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaBatteryFull className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">{battery}</span>
          </div>

          {/* 5. Memory / Storage */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaMemory className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">{ram} | {storage}</span>
          </div>

          {/* 6. Warranty */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaShieldAlt className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">{product.warranty || "1-Year Official Brand Warranty"}</span>
          </div>
        </div>
      </div>

      {/* BOTTOM ACTIONS SECTION: GET QUOTE CTA */}
      <div className="mt-auto pt-2.5 border-t border-slate-100">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
        >
          <FaWhatsapp size={14} className="text-white shrink-0" />
          <span>Get Quote</span>
        </a>
      </div>
    </div>
  );
}
