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
    <div className="corp-card">
      <div>
        {/* MODEL TITLE (Lenovo Navy Blue) */}
        <div className="corp-card-title-link">
          <button onClick={handleQuoteClick} className="corp-card-title-link w-full border-none bg-transparent p-0 text-left">
            <h3 className="corp-card-title">
              {(product.brand && product.brand !== "Authentic Infosystem" && !product.name.toLowerCase().startsWith(product.brand.toLowerCase()))
                ? `${product.brand} ${product.name}`
                : product.name} - {product.modelNumber}
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
          {/* Architecture / Type */}
          <div className="corp-card-spec-row">
            <FaNetworkWired className="corp-card-spec-icon" size={12} />
            <span className="corp-card-spec-val">
              <span className="corp-card-spec-label">Type: </span>
              {typeSpec}
            </span>
          </div>

          {/* Capacity / Ports */}
          <div className="corp-card-spec-row">
            <FaServer className="corp-card-spec-icon" size={12} />
            <span className="corp-card-spec-val">
              <span className="corp-card-spec-label">Capacity: </span>
              {capacitySpec}
            </span>
          </div>

          {/* Speed / Uplink */}
          <div className="corp-card-spec-row">
            <FaHdd className="corp-card-spec-icon" size={12} />
            <span className="corp-card-spec-val">
              <span className="corp-card-spec-label">Speed: </span>
              {speedSpec}
            </span>
          </div>

          {/* Management / Standards */}
          <div className="corp-card-spec-row">
            <FaShieldAlt className="corp-card-spec-icon" size={12} />
            <span className="corp-card-spec-val">
              <span className="corp-card-spec-label">Security: </span>
              {manageSpec}
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
