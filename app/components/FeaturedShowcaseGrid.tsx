"use client";

import Link from "next/link";

interface FlipkartCard {
  id: string;
  themeClass: string;
  ribbonTitle: string;
  ribbonSub: string;
  headline: string;
  price: string;
  features: string;
  ctaText: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

const flipkartCards: FlipkartCard[] = [
  // 1. BenQ
  {
    id: "benq",
    themeClass: "fk-theme-benq",
    ribbonTitle: "NOW OR NEVER",
    ribbonSub: "Prices lower than ever",
    headline: "Top Deals on BenQ Smart Boards",
    price: "From ₹1,10,999*",
    features: "Google EDLA Certified | 4K UHD Antimicrobial Touch",
    ctaText: "Explore Smart Boards",
    imageSrc: "/Front Cards Advertisement/Benq Display Board Photo.avif",
    imageAlt: "BenQ 4K Smart Board Display",
    href: "#benq-smart-board"
  },

  // 2. Logitech
  {
    id: "logitech",
    themeClass: "fk-theme-logi",
    ribbonTitle: "NOW OR NEVER",
    ribbonSub: "Lowest prices ever",
    headline: "Logitech Professional Mouses",
    price: "From ₹2,995*",
    features: "Rally Bar 4K | MeetUp Camera | MX Master 3S",
    ctaText: "Explore Logitech",
    imageSrc: "/Front Cards Advertisement/Logitech Mouses Photos.jpg",
    imageAlt: "Logitech Video Conferencing & MX Series Workspace",
    href: "/amazon"
  },

  // 3. LoQ Laptop
  {
    id: "loq-laptop",
    themeClass: "fk-theme-loq",
    ribbonTitle: "NOW OR NEVER",
    ribbonSub: "Prices lower than ever",
    headline: "Top Deals on Lenovo LOQ AI",
    price: "From ₹74,999*",
    features: "NVIDIA RTX 40-Series | Intel 14th Gen & Ryzen AI",
    ctaText: "Shop LOQ Laptops",
    imageSrc: "/products/laptops/lenovo-loq-15.jpg",
    imageAlt: "Lenovo LOQ AI Gaming Laptop",
    href: "/laptops/lenovo"
  },

  // 4. 18 Pro Series
  {
    id: "18-pro-series",
    themeClass: "fk-theme-apple",
    ribbonTitle: "DAY-1 ALLOCATION",
    ribbonSub: "Reserve priority",
    headline: "Apple iPhone 18 Pro Series",
    price: "From ₹1,34,900*",
    features: "A20 Pro 2nm Silicon | 48MP Visor Quad-Prism",
    ctaText: "Order 18 Pro",
    imageSrc: "/Front Cards Advertisement/Iphone 18 Series Photos.avif",
    imageAlt: "Apple iPhone 18 Pro Titanium Flagship",
    href: "/phones"
  },

  // 5. Customize Your Pc
  {
    id: "customize-your-pc",
    themeClass: "fk-theme-pc",
    ribbonTitle: "NOW OR NEVER",
    ribbonSub: "Free 48H burn-in test",
    headline: "Custom Built PC Workstations",
    price: "From ₹38,999*",
    features: "RTX 4090 / 4080 | Liquid Cooled | 3Y Warranty",
    ctaText: "Configure Your PC",
    imageSrc: "/products/desktops/custom-pc-configurator-rig.jpg",
    imageAlt: "Custom Liquid Cooled Workstation Rig",
    href: "/configuration"
  },

  // 6. Accesories
  {
    id: "accessories",
    themeClass: "fk-theme-acc",
    ribbonTitle: "NOW OR NEVER",
    ribbonSub: "Lowest prices ever",
    headline: "4K Displays, Docks & Storage",
    price: "From ₹3,XXX*",
    features: "Dell UltraSharp | Thunderbolt 4 | NVMe Fast SSDs",
    ctaText: "Shop Accessories",
    imageSrc: "/Front Cards Advertisement/Accessories Photos.jpg",
    imageAlt: "Enterprise IT Accessories Displays and Docks",
    href: "/accessories"
  }
];

export default function FeaturedShowcaseGrid() {
  return (
    <section id="flipkart-showcase" className="fk-section">
      <div className="fk-container">

        {/* 6 Flipkart Scenario Advertising Cards Grid (3 Columns Desktop, 2 Columns Tablet, 1 Column Mobile) */}
        <div className="fk-grid">
          {flipkartCards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              prefetch={false}
              className={`fk-card ${card.themeClass}`}
              title={card.headline}
            >
              {/* Background festive glow */}
              <div className="fk-bg-decor" />

              {/* Top-Right "NOW OR NEVER" Ribbon */}
              <div className="fk-ribbon">
                <span className="fk-ribbon-title">{card.ribbonTitle}</span>
                <span className="fk-ribbon-sub">{card.ribbonSub}</span>
              </div>

              {/* Left Content Area (~60% width) */}
              <div className="fk-content">
                <h3 className="fk-title">{card.headline}</h3>
                <div className="fk-price">{card.price}</div>
                <div className="fk-features">{card.features}</div>

                {/* Direct CTA Link Button */}
                <div className="fk-cta">
                  <span>{card.ctaText}</span>
                  <span className="fk-cta-arrow">→</span>
                </div>
              </div>

              {/* Right Media with 3D Illuminated Stage (~40% width) */}
              <div className="fk-media-wrap">
                <div className="fk-podium" />
                <img
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  width={280}
                  height={180}
                  loading="lazy"
                  className="fk-product-img"
                />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
