"use client";

import { useState } from "react";
import { 
  FaNetworkWired, 
  FaServer, 
  FaShieldAlt, 
  FaHdd,
  FaTag,
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar,
  FaWhatsapp,
  FaHeart,
  FaRegHeart
} from "react-icons/fa";
import { NetworkingProduct } from "../../data/networkingData";

interface NetworkingCardProps {
  product: NetworkingProduct;
  onOpenQuote?: (brand: string, model: string) => void;
}

export default function NetworkingCard({ product, onOpenQuote }: NetworkingCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const getSpecValue = (label: string) => {
    const found = product.specs.find((s) => s.label.toLowerCase() === label.toLowerCase());
    return found ? found.value : "";
  };

  const typeSpec = getSpecValue("Type") || getSpecValue("Capacity") || getSpecValue("Ports") || "Enterprise Hardware";
  const capacitySpec = getSpecValue("Ports") || getSpecValue("Bands") || getSpecValue("Firewall Pkt") || getSpecValue("Dimensions") || "High Capacity";
  const speedSpec = getSpecValue("Uplink") || getSpecValue("Throughput") || getSpecValue("Threat Protection") || getSpecValue("Distance") || "High-Speed Throughput";
  const manageSpec = getSpecValue("Stacking") || getSpecValue("Management") || getSpecValue("Clients") || getSpecValue("WAN/LAN") || getSpecValue("Cooling") || "Enterprise Managed";

  const rating = 4.8;
  const reviewCount = Math.floor(95 + ((product.name.length * 23) % 280));

  const displayName = (product.brand && product.brand !== "Authentic Infosystem" && !product.name.toLowerCase().startsWith(product.brand.toLowerCase()))
    ? `${product.brand} ${product.name}`
    : product.name;

  const fullTitle = `${displayName} - ${product.modelNumber}`;

  const whatsappMessage = `Hi Authentic Infosystem, I would like to request an official quote and availability for ${displayName} (${product.modelNumber}).`;
  const whatsappUrl = `https://wa.me/919643990077?text=${encodeURIComponent(whatsappMessage)}`;

  const handleQuoteClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onOpenQuote) {
      onOpenQuote(product.brand || "Networking", `${product.name} (${product.modelNumber})`);
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

  // Determine badge styling exact to Laptop and Desktop sections
  const rawBadge = product.badges && product.badges.length > 0 ? product.badges[0] : "";
  const badgeText = rawBadge || "Enterprise";
  const categoryText = product.brand || (product.badges && product.badges.length > 1 ? product.badges[1] : "Networking");

  const getBadgeStyle = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("core") || t.includes("enterprise") || t.includes("pro")) {
      return { bg: "bg-[#0c1e38]", textCol: "text-white" };
    }
    if (t.includes("value") || t.includes("deal") || t.includes("access")) {
      return { bg: "bg-[#fef08a]", textCol: "text-[#78350f]", border: "border border-yellow-300" };
    }
    return { bg: "bg-[#1d4ed8]", textCol: "text-white" };
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
          {/* Architecture / Type */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaNetworkWired className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">Type: {typeSpec}</span>
          </div>

          {/* Capacity / Ports */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaServer className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">Capacity: {capacitySpec}</span>
          </div>

          {/* Speed / Uplink */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaHdd className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">Speed: {speedSpec}</span>
          </div>

          {/* Management / Standards */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaShieldAlt className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">Security: {manageSpec}</span>
          </div>

          {/* Model / SKU Spec */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaTag className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">Model: {product.modelNumber}</span>
          </div>
        </div>
      </div>

      {/* BOTTOM ACTIONS SECTION: GET QUOTE CTA ONLY */}
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
