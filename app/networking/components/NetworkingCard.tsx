"use client";

import { 
  FaNetworkWired, 
  FaServer, 
  FaShieldAlt, 
  FaHdd,
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar,
  FaWhatsapp 
} from "react-icons/fa";
import { NetworkingProduct } from "../../data/networkingData";

interface NetworkingCardProps {
  product: NetworkingProduct;
  onOpenQuote: (brand: string, model: string) => void;
}

export default function NetworkingCard({ product, onOpenQuote }: NetworkingCardProps) {
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

  const whatsappMessage = `Hi Authentic Infosystem, I would like to request an official quote and availability for ${product.brand || "Networking"} ${product.name} (${product.modelNumber}).`;
  const whatsappUrl = `https://wa.me/919643990077?text=${encodeURIComponent(whatsappMessage)}`;

  const handleQuoteClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.open(whatsappUrl, "_blank");
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
    product.description || "Enterprise-grade high-density hardware built for low latency & reliability",
    `Includes manufacturer official warranty: ${product.warranty}`,
    "Full pan-India enterprise deployment, technical configuration & GST invoicing",
  ];

  return (
    <div className="bg-white border border-slate-200 hover:border-slate-400 rounded-lg p-4 sm:p-4.5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg relative group h-full">
      <div>
        {/* MODEL TITLE (Lenovo Navy Blue) */}
        <div className="mb-1">
          <button onClick={handleQuoteClick} className="block text-left group/title w-full cursor-pointer">
            <h3 className="text-[#0f3e99] group-hover/title:underline font-bold text-xs sm:text-sm leading-snug line-clamp-2 min-h-[36px]">
              {(product.brand && product.brand !== "Authentic Infosystem" && !product.name.toLowerCase().startsWith(product.brand.toLowerCase()))
                ? `${product.brand} ${product.name}`
                : product.name} - {product.modelNumber}
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
          {/* Architecture / Type */}
          <div className="flex items-start gap-2">
            <FaNetworkWired className="text-slate-800 shrink-0 mt-0.5" size={12} />
            <span className="line-clamp-2 leading-tight text-slate-900 font-medium">{typeSpec}</span>
          </div>

          {/* Capacity / Ports */}
          <div className="flex items-center gap-2">
            <FaServer className="text-slate-800 shrink-0" size={12} />
            <span className="truncate text-slate-900 font-medium">{capacitySpec}</span>
          </div>

          {/* Speed / Uplink */}
          <div className="flex items-center gap-2">
            <FaHdd className="text-slate-800 shrink-0" size={12} />
            <span className="truncate text-slate-900 font-medium">{speedSpec}</span>
          </div>

          {/* Management / Standards */}
          <div className="flex items-center gap-2">
            <FaShieldAlt className="text-slate-800 shrink-0" size={12} />
            <span className="truncate text-slate-900 font-medium">{manageSpec}</span>
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
