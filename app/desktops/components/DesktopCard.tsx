"use client";

import { useState } from "react";
import { 
  FaMicrochip, 
  FaMemory, 
  FaDesktop, 
  FaHdd,
  FaServer,
  FaWindows,
  FaWhatsapp,
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar,
  FaShoppingCart,
  FaRegHeart,
  FaHeart
} from "react-icons/fa";
import { Product } from "../../data/products";

interface DesktopCardProps {
  product: Product;
  onOpenQuote?: (brand: string, model: string) => void;
  isCompact?: boolean;
}

export default function DesktopCard({ product, onOpenQuote, isCompact }: DesktopCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const getSpecValue = (label: string) => {
    const found = product.specs?.find((s) => s.label.toLowerCase() === label.toLowerCase());
    return found ? found.value : "";
  };

  const processor = getSpecValue("Processor") || "High-Performance Processor";
  const ram = getSpecValue("RAM") || "16GB DDR5 High-Speed RAM";
  const storage = getSpecValue("Storage") || "512GB NVMe SSD";
  const gpu = getSpecValue("GPU") || "Integrated Graphics / Dedicated GPU";
  const formFactor = getSpecValue("Form Factor") || "Tower Workstation";

  const rating = 4.7;
  const reviewCount = Math.floor(120 + ((product.name.length * 17) % 350));

  const whatsappMessage = `Hi Authentic Infosystem, I would like to request an official B2B quote and availability for ${product.brand} ${product.name} (${product.modelNumber}).`;
  const whatsappUrl = `https://wa.me/919643990077?text=${encodeURIComponent(whatsappMessage)}`;

  const handleQuoteClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onOpenQuote) {
      onOpenQuote(product.brand, product.name);
    } else {
      window.open(whatsappUrl, "_blank");
    }
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

  // Determine Badge 1 text and colors matching LaptopCard styling
  const rawBadge = product.badges && product.badges.length > 0 ? product.badges[0] : "";
  const badgeText = rawBadge || (product.category === "Gaming" ? "Gaming Rig" : product.category === "Enterprise" ? "Corporate Choice" : "Best Seller");
  
  const getBadgeStyle = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("best") || t.includes("gaming") || t.includes("power")) {
      return { bg: "bg-[#0c1e38]", textCol: "text-white" };
    }
    if (t.includes("value") || t.includes("reliable") || t.includes("home") || t.includes("family")) {
      return { bg: "bg-[#fef08a]", textCol: "text-[#78350f]", border: "border border-yellow-300" };
    }
    if (t.includes("corporate") || t.includes("enterprise") || t.includes("pro")) {
      return { bg: "bg-[#1d4ed8]", textCol: "text-white" };
    }
    return { bg: "bg-[#15803d]", textCol: "text-white" };
  };

  const badgeStyle = getBadgeStyle(badgeText);

  // Build clean, dark full title
  const displayName = product.name.toLowerCase().startsWith(product.brand.toLowerCase())
    ? product.name
    : `${product.brand} ${product.name}`;
  const fullTitle = `${displayName} - ${processor}, ${ram}, ${storage}`;

  if (isCompact) {
    return (
      <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-3.5 sm:p-4 transition-all duration-200 hover:shadow-md group flex flex-col sm:flex-row gap-4 items-stretch w-full">
        {/* Left Image */}
        <div className="sm:w-48 lg:w-56 shrink-0 flex flex-col justify-center">
          <div 
            onClick={handleQuoteClick}
            className="relative w-full h-[120px] sm:h-[135px] flex items-center justify-center p-1 overflow-hidden group-hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
          >
            <img
              src={product.image}
              alt={fullTitle}
              width="240"
              height="150"
              loading="lazy"
              className="max-h-full max-w-full object-contain filter drop-shadow-sm"
            />
          </div>
        </div>

        {/* Center / Right Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <button onClick={handleQuoteClick} className="block text-left group/title border-none bg-transparent p-0 cursor-pointer">
                <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 group-hover/title:text-blue-700 leading-snug transition-colors line-clamp-2">
                  {fullTitle}
                </h3>
              </button>
              <button 
                type="button"
                onClick={() => setIsFavorited(!isFavorited)}
                className="text-slate-400 hover:text-rose-500 transition-colors p-2 -mr-1 -mt-1 cursor-pointer shrink-0 min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label="Save to wishlist"
              >
                {isFavorited ? <FaHeart className="text-rose-500" size={14} /> : <FaRegHeart size={14} />}
              </button>
            </div>

            <div className="flex items-center gap-1.5 my-1.5">
              <div className="flex items-center gap-0.5">
                {renderStars(rating)}
              </div>
              <span className="text-xs font-bold text-slate-800 ml-0.5">{rating.toFixed(1)}</span>
              <span className="text-xs text-slate-400">({reviewCount})</span>
            </div>

            {/* Spec grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-1.5 my-2 text-[11px] text-slate-600 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
              <div className="flex items-center gap-1.5 overflow-hidden">
                <FaMicrochip className="text-slate-400 shrink-0 text-xs" />
                <span className="truncate">{processor}</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-hidden">
                <FaMemory className="text-slate-400 shrink-0 text-xs" />
                <span className="truncate">{ram}</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-hidden">
                <FaHdd className="text-slate-400 shrink-0 text-xs" />
                <span className="truncate">{storage}</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-hidden">
                <FaServer className="text-slate-400 shrink-0 text-xs" />
                <span className="truncate">{formFactor}</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-hidden">
                <FaDesktop className="text-slate-400 shrink-0 text-xs" />
                <span className="truncate">{gpu}</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-hidden">
                <FaWindows className="text-slate-400 shrink-0 text-xs" />
                <span className="truncate">{product.warranty || "3-Year Enterprise Warranty"}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-slate-100 mt-2 sm:mt-0">
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-100">
              Ready to Ship
            </span>
            <button
              onClick={handleQuoteClick}
              className="bg-[#25D366] hover:bg-[#20ba59] text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer min-h-[40px] touch-manipulation"
            >
              <FaWhatsapp size={14} className="text-white shrink-0" />
              <span>Get Quote</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between h-full transition-all duration-200 hover:shadow-md group">
      <div>
        {/* TOP ROW: WISHLIST HEART */}
        <div className="flex items-center justify-end mb-1">
          <button 
            type="button"
            onClick={() => setIsFavorited(!isFavorited)}
            className="text-slate-400 hover:text-rose-500 transition-colors p-2 -mr-1 -mt-1 cursor-pointer shrink-0 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full hover:bg-slate-50"
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
        <div 
          onClick={handleQuoteClick}
          className="relative w-full h-[140px] sm:h-[155px] flex items-center justify-center p-1.5 my-1 overflow-hidden group-hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
        >
          <img
            src={product.image}
            alt={fullTitle}
            width="280"
            height="180"
            loading="lazy"
            className="max-h-full max-w-full object-contain filter drop-shadow-sm"
          />
        </div>

        {/* PRODUCT TITLE (Dark Bold font, 2 lines matching Laptop section) */}
        <button onClick={handleQuoteClick} className="block mt-2 text-left w-full group/title border-none bg-transparent p-0 cursor-pointer">
          <h3 className="text-[13px] sm:text-[13.5px] font-bold text-slate-900 group-hover/title:text-blue-700 leading-snug line-clamp-2 min-h-[38px] transition-colors">
            {fullTitle}
          </h3>
        </button>

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

        {/* TECH SPECS WITH CLEAN ICONS */}
        <div className="space-y-1.5 my-3 text-[11px] sm:text-[11.5px] text-slate-600 border-t border-slate-100 pt-2.5">
          {/* 1. CPU */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaMicrochip className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">{processor}</span>
          </div>

          {/* 2. RAM */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaMemory className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">{ram}</span>
          </div>

          {/* 3. Storage */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaHdd className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">{storage}</span>
          </div>

          {/* 4. Chassis / Form Factor */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaServer className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">{formFactor}</span>
          </div>

          {/* 5. GPU */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaDesktop className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">{gpu}</span>
          </div>

          {/* 6. OS / Warranty */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaWindows className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">{product.warranty || "3-Year Enterprise Onsite Warranty"}</span>
          </div>
        </div>
      </div>

      {/* BOTTOM ACTIONS SECTION: GET QUOTE CTA ONLY */}
      <div className="mt-auto pt-2.5 border-t border-slate-100">
        <button
          onClick={handleQuoteClick}
          className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer min-h-[44px] touch-manipulation"
        >
          <FaWhatsapp size={14} className="text-white shrink-0" />
          <span>Get Quote</span>
        </button>
      </div>
    </div>
  );
}
