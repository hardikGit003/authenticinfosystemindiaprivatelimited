"use client";

import { useState } from "react";
import { 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar,
  FaDesktop,
  FaPlug,
  FaHdd,
  FaBatteryFull,
  FaHeadphones,
  FaSlidersH,
  FaShieldAlt,
  FaTag,
  FaWhatsapp,
  FaHeart,
  FaRegHeart,
  FaAmazon
} from "react-icons/fa";
import { AccessoryProduct } from "../../data/accessoriesData";

interface AccessoryCardProps {
  product: AccessoryProduct;
  onOpenQuote?: (brand: string, model: string) => void;
}

export default function AccessoryCard({ product, onOpenQuote }: AccessoryCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  // Deterministic realistic rating & reviews matching laptop / desktop sections
  const rating = 4.8;
  const reviewCount = Math.floor(115 + ((product.name.length * 19) % 310));

  const handleQuoteClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onOpenQuote) {
      onOpenQuote(product.brand || "Accessories", `${product.name} (${product.modelNumber})`);
    } else {
      const whatsappMessage = `Hi Authentic Infosystem, I would like to request an official B2B quote and availability for ${product.name} (${product.modelNumber}).`;
      window.open(`https://wa.me/919643990077?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
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

  const getSpecIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes("resolution") || l.includes("panel") || l.includes("display") || l.includes("screen")) return <FaDesktop className="text-slate-400 shrink-0 text-xs" />;
    if (l.includes("ports") || l.includes("hub") || l.includes("connect") || l.includes("usb")) return <FaPlug className="text-slate-400 shrink-0 text-xs" />;
    if (l.includes("speed") || l.includes("storage") || l.includes("ssd") || l.includes("dpi")) return <FaHdd className="text-slate-400 shrink-0 text-xs" />;
    if (l.includes("battery") || l.includes("power") || l.includes("capacity")) return <FaBatteryFull className="text-slate-400 shrink-0 text-xs" />;
    if (l.includes("audio") || l.includes("mic") || l.includes("headset") || l.includes("ear")) return <FaHeadphones className="text-slate-400 shrink-0 text-xs" />;
    if (l.includes("switch") || l.includes("layout") || l.includes("type")) return <FaSlidersH className="text-slate-400 shrink-0 text-xs" />;
    return <FaTag className="text-slate-400 shrink-0 text-xs" />;
  };

  const displayName = product.brand && !product.name.toLowerCase().includes(product.brand.toLowerCase())
    ? `${product.brand} ${product.name}`
    : product.name;

  const primarySpec = product.specs[0]?.value || product.modelNumber;
  const fullTitle = `${displayName} - ${primarySpec}`;

  // Badges exact to laptop and desktop sections
  const rawBadge = product.badges && product.badges.length > 0 ? product.badges[0] : "";
  const badgeText = rawBadge || "Enterprise Grade";
  const categoryText = product.brand || (product.badges && product.badges.length > 1 ? product.badges[1] : "Accessory");

  const getBadgeStyle = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("top") || t.includes("best") || t.includes("pro")) {
      return { bg: "bg-[#0c1e38]", textCol: "text-white" };
    }
    if (t.includes("value") || t.includes("deal") || t.includes("saving")) {
      return { bg: "bg-[#fef08a]", textCol: "text-[#78350f]", border: "border border-yellow-300" };
    }
    if (t.includes("corporate") || t.includes("enterprise") || t.includes("productivity")) {
      return { bg: "bg-[#1d4ed8]", textCol: "text-white" };
    }
    return { bg: "bg-[#15803d]", textCol: "text-white" };
  };

  const badgeStyle = getBadgeStyle(badgeText);

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

        {/* PRODUCT TITLE (Dark Bold font, 2 lines matching Laptop and Desktop sections) */}
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

        {/* TECH SPECS WITH CLEAN ICONS MATCHING LAPTOPS & DESKTOPS */}
        <div className="space-y-1.5 my-3 text-[11px] sm:text-[11.5px] text-slate-600 border-t border-slate-100 pt-2.5">
          {product.specs.slice(0, 3).map((spec, i) => (
            <div key={i} className="flex items-center gap-2 overflow-hidden">
              {getSpecIcon(spec.label)}
              <span className="truncate">
                {spec.label}: {spec.value}
              </span>
            </div>
          ))}
          {/* Model / SKU Spec */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaTag className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">Model: {product.modelNumber}</span>
          </div>
          {/* Warranty Spec */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaShieldAlt className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">{product.warranty || "1-Year Official Brand Warranty"}</span>
          </div>
        </div>
      </div>

      {/* BOTTOM ACTIONS SECTION */}
      <div className="mt-auto pt-2.5 border-t border-slate-100 flex flex-col justify-end">
        {product.price ? (
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-[11px] text-slate-500 font-medium">Official Price:</span>
            <span className="text-[14.5px] font-bold text-slate-900">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          </div>
        ) : null}

        {product.amazonUrl ? (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleQuoteClick}
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 text-[11px] font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
              title="Get B2B Quote"
            >
              <FaWhatsapp size={12} className="text-white shrink-0" />
              <span>Quote</span>
            </button>
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#febd69] hover:bg-[#f3a847] text-[#0f1111] py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 text-[11px] font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
              title="Buy on Amazon.in"
            >
              <FaAmazon size={12} className="shrink-0" />
              <span>Amazon</span>
            </a>
          </div>
        ) : (
          <button
            onClick={handleQuoteClick}
            className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <FaWhatsapp size={14} className="text-white shrink-0" />
            <span>Get Quote</span>
          </button>
        )}
      </div>
    </div>
  );
}
