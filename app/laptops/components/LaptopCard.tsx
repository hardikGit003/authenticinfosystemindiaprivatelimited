"use client";

import Link from "next/link";
import { 
  FaWhatsapp, 
  FaMicrochip, 
  FaMemory, 
  FaDesktop, 
  FaWindows, 
  FaApple,
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar 
} from "react-icons/fa";
import { LaptopProduct } from "../../data/laptopData";

interface LaptopCardProps {
  laptop: LaptopProduct;
  onOpenQuote?: (brand: string, model: string) => void;
  isCompact?: boolean;
}

// Preset realistic enterprise ratings for deal display
const laptopPricingMap: Record<string, { rating: number; reviews: number }> = {
  len_tp_e14: { rating: 4.6, reviews: 316 },
  len_tp_x1c: { rating: 4.8, reviews: 597 },
  len_tp_t14: { rating: 4.7, reviews: 420 },
  len_yo_slim7: { rating: 4.5, reviews: 188 },
  len_yo_9i: { rating: 4.7, reviews: 245 },
  len_leg_pro5: { rating: 4.8, reviews: 632 },
  hp_pb_440: { rating: 4.5, reviews: 274 },
  hp_eb_840: { rating: 4.7, reviews: 389 },
  hp_sp_x360: { rating: 4.6, reviews: 210 },
  hp_om_16: { rating: 4.7, reviews: 495 },
  hp_vic_15: { rating: 4.4, reviews: 340 },
  dell_lat_3440: { rating: 4.5, reviews: 290 },
  dell_lat_5440: { rating: 4.6, reviews: 412 },
  dell_xps_13: { rating: 4.7, reviews: 520 },
  dell_xps_15: { rating: 4.8, reviews: 430 },
  dell_ali_m16: { rating: 4.8, reviews: 315 },
  asus_eb_b9: { rating: 4.7, reviews: 182 },
  asus_zen_duo: { rating: 4.6, reviews: 276 },
  asus_rog_g16: { rating: 4.9, reviews: 680 },
  asus_viv_pro15: { rating: 4.5, reviews: 220 },
  acer_sw_go14: { rating: 4.4, reviews: 194 },
  acer_pred_hel: { rating: 4.7, reviews: 410 },
  apple_mba_m2: { rating: 4.8, reviews: 920 },
  apple_mba_m3: { rating: 4.9, reviews: 840 },
  apple_mbp_m3pro: { rating: 4.9, reviews: 610 },
  apple_mbp_m3max: { rating: 5.0, reviews: 390 },
};

export default function LaptopCard({ laptop, onOpenQuote, isCompact = false }: LaptopCardProps) {
  const getSpecValue = (label: string) => {
    const found = laptop.specs.find((s) => s.label.toLowerCase() === label.toLowerCase());
    return found ? found.value : "";
  };

  const processor = getSpecValue("Processor") || laptop.detailedSpecs.processor;
  const ram = getSpecValue("RAM") || laptop.detailedSpecs.ram;
  const storage = getSpecValue("Storage") || laptop.detailedSpecs.storage;
  const graphics = getSpecValue("Graphics") || laptop.detailedSpecs.graphics;
  const operatingSystem = laptop.detailedSpecs.operatingSystem || (laptop.brandSlug === "apple" ? "macOS Sonoma / Sequoia" : "Windows 11 Pro 64-bit");

  const cardData = laptopPricingMap[laptop.id] || {
    rating: 4.6,
    reviews: 240,
  };

  const rating = cardData.rating;
  const reviewCount = cardData.reviews;

  const productUrl = `/laptops/${laptop.brandSlug}/${laptop.slug}`;

  const handleQuoteClick = () => {
    if (onOpenQuote) {
      onOpenQuote(laptop.brand, laptop.model);
    } else {
      const msg = `Hi Authentic Infosystem, I would like to request an official B2B quote for ${laptop.brand} ${laptop.model} (${laptop.modelNumber}).`;
      window.open(`https://wa.me/919643990077?text=${encodeURIComponent(msg)}`, "_blank");
    }
  };

  // Render 5-star rating
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

  // Key features (3 bullets)
  const features = laptop.keyFeatures?.slice(0, 3) || [
    "High-efficiency anti-glare display with low blue-light certification",
    "Discrete enterprise hardware security chip & camera privacy shutter",
    "Rapid Charge battery management engineered for all-day mobility",
  ];

  return (
    <div className="bg-white border border-slate-200 hover:border-slate-400 rounded-lg p-4 sm:p-4.5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg relative group h-full">
      <div>
        {/* MODEL TITLE (Lenovo Navy Blue) */}
        <div className="mb-1">
          <Link href={productUrl} className="block group/title">
            <h3 className="text-[#0f3e99] group-hover/title:underline font-bold text-xs sm:text-sm leading-snug line-clamp-2 min-h-[36px]">
              {laptop.brand} {laptop.model} - {processor.split("(")[0].trim()}, {ram}, {storage}
            </h3>
          </Link>
        </div>

        {/* STAR RATING */}
        <div className="flex items-center gap-1.5 mb-2.5 text-xs">
          <div className="flex items-center gap-0.5">{renderStars(rating)}</div>
          <span className="font-bold text-slate-900 text-[11px]">{rating.toFixed(1)}</span>
          <span className="text-slate-500 text-[11px]">({reviewCount})</span>
        </div>

        {/* PRODUCT IMAGE (Centered on Clean Background) */}
        <Link 
          href={productUrl} 
          className="block relative w-full h-40 sm:h-44 bg-white flex items-center justify-center p-2 mb-3 overflow-hidden group-hover:scale-102 transition-transform duration-300"
        >
          <img
            src={laptop.image}
            alt={`${laptop.brand} ${laptop.model}`}
            width="280"
            height="190"
            loading="lazy"
            className="max-h-full max-w-full object-contain drop-shadow-sm"
          />
        </Link>



        {/* TECH SPECS WITH ICONS */}
        <div className="mt-3 space-y-2 py-2.5 border-t border-slate-100 text-[11px] text-slate-700">
          {/* Processor */}
          <div className="flex items-start gap-2">
            <FaMicrochip className="text-slate-800 shrink-0 mt-0.5" size={12} />
            <span className="line-clamp-2 leading-tight text-slate-900 font-medium">
              {laptop.detailedSpecs?.processor || processor}
            </span>
          </div>

          {/* Operating System */}
          <div className="flex items-center gap-2">
            {laptop.brandSlug === "apple" ? (
              <FaApple className="text-slate-800 shrink-0" size={12} />
            ) : (
              <FaWindows className="text-slate-800 shrink-0" size={12} />
            )}
            <span className="truncate text-slate-900 font-medium">{operatingSystem}</span>
          </div>

          {/* Graphics */}
          <div className="flex items-center gap-2">
            <FaDesktop className="text-slate-800 shrink-0" size={12} />
            <span className="truncate text-slate-900 font-medium">{graphics || "Integrated High-Definition Graphics"}</span>
          </div>

          {/* Memory */}
          <div className="flex items-center gap-2">
            <FaMemory className="text-slate-800 shrink-0" size={12} />
            <span className="truncate text-slate-900 font-medium">
              {laptop.detailedSpecs?.ram || `${ram} High-Speed System Memory`}
            </span>
          </div>
        </div>

        {/* ADDITIONAL SPECS LINK */}
        <div className="pt-1 pb-2">
          <Link
            href={productUrl}
            className="text-[11px] font-bold text-[#0f3e99] hover:underline inline-block"
          >
            Additional Specs
          </Link>
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
