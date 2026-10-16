"use client";

import Link from "next/link";

interface FlipkartCard {
  id: string;
  themeClass: string;
  starburstTitle: string;
  starburstSub: string;
  ribbonTitle: string;
  ribbonSub: string;
  headline: string;
  price: string;
  features: string;
  bank1: string;
  bank1Class: string;
  bank2: string;
  bank2Class: string;
  bankOffer: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

const flipkartCards: FlipkartCard[] = [
  // 1. BenQ
  {
    id: "benq",
    themeClass: "fk-theme-benq",
    starburstTitle: "BIG BILLION",
    starburstSub: "DEALS",
    ribbonTitle: "NOW OR NEVER",
    ribbonSub: "Prices lower than ever",
    headline: "Top Deals on BenQ Smart Boards",
    price: "From ₹84,990*",
    features: "Google EDLA Certified | 4K UHD Antimicrobial Touch",
    bank1: "AXIS BANK",
    bank1Class: "fk-bank-axis",
    bank2: "ICICI Bank",
    bank2Class: "fk-bank-icici",
    bankOffer: "10% Instant Discount* + 18% GST Credit",
    imageSrc: "/BenQ Smart Screen/BenQ1.avif",
    imageAlt: "BenQ 4K Smart Board Display",
    href: "#benq-smart-board"
  },

  // 2. Logitech
  {
    id: "logitech",
    themeClass: "fk-theme-logi",
    starburstTitle: "BIG BILLION",
    starburstSub: "DAYS",
    ribbonTitle: "NOW OR NEVER",
    ribbonSub: "Lowest prices ever",
    headline: "Logitech Video & MX Series",
    price: "From ₹2,995*",
    features: "Rally Bar 4K | MeetUp Camera | MX Master 3S",
    bank1: "AXIS BANK",
    bank1Class: "fk-bank-axis",
    bank2: "ICICI Bank",
    bank2Class: "fk-bank-icici",
    bankOffer: "10% Instant Discount* | Official Warranty",
    imageSrc: "/products/accessories/logitech-workspace-solutions.jpg",
    imageAlt: "Logitech Video Conferencing & MX Series Workspace",
    href: "/amazon"
  },

  // 3. LoQ Laptop
  {
    id: "loq-laptop",
    themeClass: "fk-theme-loq",
    starburstTitle: "BIG BILLION",
    starburstSub: "DAYS",
    ribbonTitle: "NOW OR NEVER",
    ribbonSub: "Prices lower than ever",
    headline: "Top Deals on Lenovo LOQ AI",
    price: "From ₹64,990*",
    features: "NVIDIA RTX 40-Series | Intel 14th Gen & Ryzen AI",
    bank1: "AXIS BANK",
    bank1Class: "fk-bank-axis",
    bank2: "ICICI Bank",
    bank2Class: "fk-bank-icici",
    bankOffer: "10% Instant Discount* | No Cost EMI",
    imageSrc: "/products/laptops/lenovo-loq-15.jpg",
    imageAlt: "Lenovo LOQ AI Gaming Laptop",
    href: "/laptops/lenovo"
  },

  // 4. 18 Pro Series
  {
    id: "18-pro-series",
    themeClass: "fk-theme-apple",
    starburstTitle: "FLAGSHIP",
    starburstSub: "LAUNCH",
    ribbonTitle: "DAY-1 ALLOCATION",
    ribbonSub: "Reserve priority stock",
    headline: "Apple iPhone 18 Pro Series",
    price: "From ₹1,34,900*",
    features: "A20 Pro 2nm Silicon | 48MP Visor Quad-Prism",
    bank1: "AXIS BANK",
    bank1Class: "fk-bank-axis",
    bank2: "ICICI Bank",
    bank2Class: "fk-bank-icici",
    bankOffer: "10% Instant Savings* | 1-Yr AppleCare",
    imageSrc: "/Home Screen Advertisement/Iphone18PRoBanner.png",
    imageAlt: "Apple iPhone 18 Pro Titanium Flagship",
    href: "/phones"
  },

  // 5. Customize Your Pc
  {
    id: "customize-your-pc",
    themeClass: "fk-theme-pc",
    starburstTitle: "CUSTOM RIG",
    starburstSub: "BUILDER",
    ribbonTitle: "NOW OR NEVER",
    ribbonSub: "Free 48H burn-in test",
    headline: "Custom Built PC Workstations",
    price: "From ₹38,990*",
    features: "RTX 4090 / 4080 | Liquid Cooled | 3Y Warranty",
    bank1: "AXIS BANK",
    bank1Class: "fk-bank-axis",
    bank2: "ICICI Bank",
    bank2Class: "fk-bank-icici",
    bankOffer: "10% Instant Discount* | Doorstep Warranty",
    imageSrc: "/products/desktops/custom-pc-configurator-rig.jpg",
    imageAlt: "Custom Liquid Cooled Workstation Rig",
    href: "/configuration"
  },

  // 6. Accesories
  {
    id: "accessories",
    themeClass: "fk-theme-acc",
    starburstTitle: "MEGA SALE",
    starburstSub: "OFFERS",
    ribbonTitle: "NOW OR NEVER",
    ribbonSub: "Lowest prices ever",
    headline: "4K Displays, Docks & Storage",
    price: "From ₹1,499*",
    features: "Dell UltraSharp | Thunderbolt 4 | NVMe Fast SSDs",
    bank1: "AXIS BANK",
    bank1Class: "fk-bank-axis",
    bank2: "ICICI Bank",
    bank2Class: "fk-bank-icici",
    bankOffer: "10% Instant Discount* | Express Dispatch",
    imageSrc: "/products/accessories/enterprise-accessories-bundle.jpg",
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
              className={`fk-card ${card.themeClass}`}
              title={card.headline}
            >
              {/* Background festive lanterns and sparkles */}
              <div className="fk-bg-decor" />

              {/* Top-Left Starburst "The Big Billion Days" Badge */}
              <div className="fk-starburst-wrapper">
                <svg viewBox="0 0 100 100" className="fk-starburst-svg" aria-hidden="true">
                  <polygon 
                    points="50,0 62,10 77,5 82,20 97,23 93,38 100,50 93,62 97,77 82,80 77,95 62,90 50,100 38,90 23,95 18,80 3,77 7,62 0,50 7,38 3,23 18,20 23,5 38,10" 
                    fill="#FFDF00"
                    stroke="#D97706"
                    strokeWidth="1.5"
                  />
                </svg>
                <div className="fk-starburst-label">
                  <span>{card.starburstTitle}</span>
                  <span className="fk-starburst-sub">{card.starburstSub}</span>
                </div>
              </div>

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

                {/* Bottom Bank Offer Strip */}
                <div className="fk-bank-strip">
                  <span className={`fk-bank-badge ${card.bank1Class}`}>{card.bank1}</span>
                  <span className={`fk-bank-badge ${card.bank2Class}`}>{card.bank2}</span>
                  <span className="fk-bank-text">{card.bankOffer}</span>
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
