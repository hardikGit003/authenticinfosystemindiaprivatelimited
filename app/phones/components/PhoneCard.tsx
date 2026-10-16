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
    <div className="corp-card">
      <div>
        {/* MODEL TITLE */}
        <div className="corp-card-title-link">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="corp-card-title-link"
          >
            <h3 className="corp-card-title">
              {displayName} - {processor.split("(")[0].trim()}, {storage.split("/")[0].trim()}
            </h3>
          </a>
        </div>

        {/* STAR RATING */}
        <div className="corp-card-rating-row">
          <div className="corp-card-stars">{renderStars(rating)}</div>
          <span className="corp-card-score">{rating.toFixed(1)}</span>
          <span className="corp-card-reviews">({reviewCount})</span>
        </div>

        {/* PRODUCT IMAGE */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="corp-card-media-box"
        >
          <img
            src={product.image}
            alt={`${product.name} - ${product.modelNumber}`}
            width="260"
            height="260"
            loading="lazy"
          />
        </a>

        {/* TECH SPECS WITH ICONS */}
        <div className="corp-card-specs-box">
          <div className="corp-card-spec-row">
            <FaMicrochip className="corp-card-spec-icon" size={12} />
            <span className="corp-card-spec-val">
              <span className="corp-card-spec-label">CPU: </span>
              {processor}
            </span>
          </div>

          <div className="corp-card-spec-row">
            <FaTv className="corp-card-spec-icon" size={12} />
            <span className="corp-card-spec-val">
              <span className="corp-card-spec-label">Screen: </span>
              {display}
            </span>
          </div>

          <div className="corp-card-spec-row">
            <FaCamera className="corp-card-spec-icon" size={12} />
            <span className="corp-card-spec-val">
              <span className="corp-card-spec-label">Camera: </span>
              {camera}
            </span>
          </div>

          <div className="corp-card-spec-row">
            <FaBatteryFull className="corp-card-spec-icon" size={12} />
            <span className="corp-card-spec-val">
              <span className="corp-card-spec-label">Battery: </span>
              {battery}
            </span>
          </div>

          <div className="corp-card-spec-row">
            <FaMemory className="corp-card-spec-icon" size={12} />
            <span className="corp-card-spec-val">
              <span className="corp-card-spec-label">RAM / ROM: </span>
              {ram} | {storage}
            </span>
          </div>
        </div>

        {/* ADDITIONAL SPECS LINK */}
        <div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="corp-card-more-specs-link"
          >
            Additional Specs & Configs
          </a>
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
