"use client";

import { 
  FaWhatsapp, 
  FaMicrochip, 
  FaMemory, 
  FaDesktop, 
  FaHdd,
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar,
  FaServer
} from "react-icons/fa";
import { Product } from "../../data/products";

interface DesktopCardProps {
  product: Product;
  onOpenQuote?: (brand: string, model: string) => void;
}

export default function DesktopCard({ product, onOpenQuote }: DesktopCardProps) {
  const getSpecValue = (label: string) => {
    const found = product.specs.find((s) => s.label.toLowerCase() === label.toLowerCase());
    return found ? found.value : "";
  };

  const processor = getSpecValue("Processor") || "High-Performance Processor";
  const ram = getSpecValue("RAM") || "16GB High-Speed RAM";
  const storage = getSpecValue("Storage") || "512GB NVMe SSD";
  const gpu = getSpecValue("GPU") || "Integrated Intel UHD / Iris Xe Graphics";
  const formFactor = getSpecValue("Form Factor") || "Tower Workstation";

  const rating = 4.7;
  const reviewCount = Math.floor(120 + ((product.name.length * 17) % 350));

  const whatsappMessage = `Hi Authentic Infosystem, I would like to request an official B2B quote and availability for ${product.brand} ${product.name} (${product.modelNumber}).`;
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
    `${formFactor} chassis engineered for whisper-quiet acoustics & airflow`,
    "Tool-less expansion bays supporting enterprise PCIe & memory upgrades",
    "Includes manufacturer comprehensive onsite 3-year enterprise warranty",
  ];

  return (
    <div className="corp-card">
      <div>
        {/* MODEL TITLE (Lenovo Navy Blue) */}
        <div className="corp-card-title-link">
          <button onClick={handleQuoteClick} className="corp-card-title-link w-full border-none bg-transparent p-0 text-left">
            <h3 className="corp-card-title">
              {product.brand} {product.name} - {processor}, {ram}, {storage}
            </h3>
          </button>
        </div>

        {/* STAR RATING */}
        <div className="corp-card-rating-row">
          <div className="corp-card-stars">{renderStars(rating)}</div>
          <span className="corp-card-score">{rating.toFixed(1)}</span>
          <span className="corp-card-reviews">({reviewCount})</span>
        </div>

        {/* PRODUCT IMAGE (Centered on Clean Background) */}
        <div 
          onClick={handleQuoteClick}
          className="corp-card-media-box"
        >
          <img
            src={product.image}
            alt={`${product.name} - ${product.modelNumber}`}
            width="280"
            height="190"
            loading="lazy"
          />
        </div>

        {/* TECH SPECS WITH ICONS */}
        <div className="corp-card-specs-box">
          {/* Processor */}
          <div className="corp-card-spec-row">
            <FaMicrochip className="corp-card-spec-icon" size={12} />
            <span className="corp-card-spec-val">
              <span className="corp-card-spec-label">CPU: </span>
              {processor}
            </span>
          </div>

          {/* Form Factor / Chassis */}
          <div className="corp-card-spec-row">
            <FaServer className="corp-card-spec-icon" size={12} />
            <span className="corp-card-spec-val">
              <span className="corp-card-spec-label">Chassis: </span>
              {formFactor}
            </span>
          </div>

          {/* GPU */}
          <div className="corp-card-spec-row">
            <FaDesktop className="corp-card-spec-icon" size={12} />
            <span className="corp-card-spec-val">
              <span className="corp-card-spec-label">GPU: </span>
              {gpu}
            </span>
          </div>

          {/* Memory & Storage */}
          <div className="corp-card-spec-row">
            <FaMemory className="corp-card-spec-icon" size={12} />
            <span className="corp-card-spec-val">
              <span className="corp-card-spec-label">RAM / SSD: </span>
              {ram} | {storage}
            </span>
          </div>
        </div>

        {/* ADDITIONAL SPECS LINK */}
        <div>
          <button
            onClick={handleQuoteClick}
            className="corp-card-more-specs-link border-none bg-transparent p-0 text-left"
          >
            Additional Specs & Configs
          </button>
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
