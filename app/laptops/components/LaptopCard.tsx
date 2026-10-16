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

  const displayName = laptop.brand && !laptop.model.toLowerCase().startsWith(laptop.brand.toLowerCase())
    ? `${laptop.brand} ${laptop.model}`
    : laptop.model;

  const whatsappMessage = `Hi Authentic Infosystem, I would like to request an official B2B quote and availability for ${displayName} (${laptop.modelNumber || laptop.series || ""}).`;
  const whatsappUrl = `https://wa.me/919643990077?text=${encodeURIComponent(whatsappMessage)}`;

  const handleQuoteClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.open(whatsappUrl, "_blank");
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
    <div className="corp-card">
      <div>
        {/* MODEL TITLE (Lenovo Navy Blue) */}
        <div className="corp-card-title-link">
          <Link href={productUrl} className="corp-card-title-link">
            <h3 className="corp-card-title">
              {laptop.brand} {laptop.model} - {processor.split("(")[0].trim()}, {ram}, {storage}
            </h3>
          </Link>
        </div>

        {/* STAR RATING */}
        <div className="corp-card-rating-row">
          <div className="corp-card-stars">{renderStars(rating)}</div>
          <span className="corp-card-score">{rating.toFixed(1)}</span>
          <span className="corp-card-reviews">({reviewCount})</span>
        </div>

        {/* PRODUCT IMAGE (Centered on Clean Background) */}
        <Link 
          href={productUrl} 
          className="corp-card-media-box"
        >
          <img
            src={laptop.image}
            alt={`${laptop.brand} ${laptop.model}`}
            width="280"
            height="190"
            loading="lazy"
          />
        </Link>

        {/* TECH SPECS WITH ICONS */}
        <div className="corp-card-specs-box">
          {/* Processor */}
          <div className="corp-card-spec-row">
            <FaMicrochip className="corp-card-spec-icon" size={12} />
            <span className="corp-card-spec-val">
              <span className="corp-card-spec-label">CPU: </span>
              {laptop.detailedSpecs?.processor || processor}
            </span>
          </div>

          {/* Operating System */}
          <div className="corp-card-spec-row">
            {laptop.brandSlug === "apple" ? (
              <FaApple className="corp-card-spec-icon" size={12} />
            ) : (
              <FaWindows className="corp-card-spec-icon" size={12} />
            )}
            <span className="corp-card-spec-val">
              <span className="corp-card-spec-label">OS: </span>
              {operatingSystem}
            </span>
          </div>

          {/* Graphics */}
          <div className="corp-card-spec-row">
            <FaDesktop className="corp-card-spec-icon" size={12} />
            <span className="corp-card-spec-val">
              <span className="corp-card-spec-label">GPU: </span>
              {graphics || "Integrated High-Definition Graphics"}
            </span>
          </div>

          {/* Memory */}
          <div className="corp-card-spec-row">
            <FaMemory className="corp-card-spec-icon" size={12} />
            <span className="corp-card-spec-val">
              <span className="corp-card-spec-label">RAM: </span>
              {laptop.detailedSpecs?.ram || `${ram} System Memory`}
            </span>
          </div>
        </div>

        {/* ADDITIONAL SPECS LINK */}
        <div>
          <Link
            href={productUrl}
            className="corp-card-more-specs-link"
          >
            Additional Specs & Configs
          </Link>
        </div>

        {/* FEATURES BULLET LIST */}
        <div className="corp-card-features-box">
          <div className="corp-card-features-header">
            Features
          </div>
          <ul className="corp-card-features-list">
            {features.map((feat, idx) => (
              <li key={idx}>
                <span className="corp-card-bullet">•</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* PRIMARY CTA BUTTON */}
      <div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="corp-card-btn-action"
        >
          <FaWhatsapp size={14} className="text-emerald-400" />
          <span>Request Quote</span>
        </a>
      </div>
    </div>
  );
}
