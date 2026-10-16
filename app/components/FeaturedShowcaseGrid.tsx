"use client";

import Link from "next/link";
import { 
  FaTv, 
  FaVideo, 
  FaLaptop, 
  FaMobileAlt, 
  FaCogs, 
  FaKeyboard, 
  FaCheckCircle, 
  FaArrowRight, 
  FaWhatsapp,
  FaShieldAlt,
  FaFire
} from "react-icons/fa";

interface ShowcaseCard {
  id: string;
  pillLabel: string;
  pillClass: string;
  statusLabel: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  primaryFeatures: string[];
  ctaLabel: string;
  ctaHref: string;
  isExternal?: boolean;
  ctaIcon?: "arrow" | "whatsapp";
}

const cardsData: ShowcaseCard[] = [
  // 1. BenQ (Card 1)
  {
    id: "benq",
    pillLabel: "BenQ Official Partner",
    pillClass: "pill-benq",
    statusLabel: "Official Warranty",
    title: "BenQ Smart Displays & Boards",
    subtitle: "4K Interactive Flat Panels for Smart Classrooms & Hybrid Boardrooms",
    imageSrc: "/BenQ Smart Screen/BenQ1.avif",
    imageAlt: "BenQ 4K Interactive Flat Panel Display",
    primaryFeatures: [
      "4K UHD Antimicrobial Touchscreen with EZWrite Whiteboard Collaboration",
      "Google EDLA Certified with native Play Store & Google Workspace access",
      "On-site deployment, authorized warranty & corporate GST invoicing"
    ],
    ctaLabel: "Explore BenQ Smart Boards",
    ctaHref: "#benq-smart-board",
    ctaIcon: "arrow"
  },

  // 2. Logitech (Card 2)
  {
    id: "logitech",
    pillLabel: "Logitech Workspace",
    pillClass: "pill-logi",
    statusLabel: "In Stock Ready Dispatch",
    title: "Logitech Enterprise Solutions",
    subtitle: "Conference Cameras, Video Bars & Ergonomic MX Series Workspace",
    imageSrc: "/products/accessories/logitech-workspace-solutions.jpg",
    imageAlt: "Logitech Video Conferencing & MX Workspace Peripherals",
    primaryFeatures: [
      "Rally Bar & MeetUp 4K Ultra-HD Intelligent Conference Video Systems",
      "Logitech MX Master 3S Ergonomic Mice & MX Mechanical Keyboards",
      "Certified bundles for Microsoft Teams, Zoom & Google Meet rooms"
    ],
    ctaLabel: "Explore Logitech Store",
    ctaHref: "/amazon",
    ctaIcon: "arrow"
  },

  // 3. LoQ Laptop (Card 3)
  {
    id: "loq-laptop",
    pillLabel: "Lenovo LOQ Series",
    pillClass: "pill-lenovo",
    statusLabel: "AI Tuned • RTX 40-Series",
    title: "Lenovo LOQ AI Gaming Laptops",
    subtitle: "High-Performance Computing for Heavy Workflows, Creators & Gamers",
    imageSrc: "/products/laptops/lenovo-loq-15.jpg",
    imageAlt: "Lenovo LOQ AI High-Performance Gaming Laptop",
    primaryFeatures: [
      "Intel 13th/14th Gen & AMD Ryzen Processors with Lenovo LA1 AI chip",
      "NVIDIA GeForce RTX 40-Series Dedicated GPUs with 144Hz FHD/QHD Display",
      "Hyperchamber Thermal Architecture with On-Site Lenovo India Warranty"
    ],
    ctaLabel: "Explore Lenovo LOQ & Laptops",
    ctaHref: "/laptops/lenovo",
    ctaIcon: "arrow"
  },

  // 4. 18 Pro Series (Card 4)
  {
    id: "iphone-18-pro",
    pillLabel: "Apple Flagship Launch",
    pillClass: "pill-apple",
    statusLabel: "Priority Allocation",
    title: "Apple iPhone 18 Pro Series",
    subtitle: "Forged in Aerospace Titanium with A20 Pro Silicon & Apple Intelligence",
    imageSrc: "/Home Screen Advertisement/Iphone18PRoBanner.png",
    imageAlt: "Apple iPhone 18 Pro Titanium Flagship",
    primaryFeatures: [
      "Next-Gen Apple A20 Pro (2nm Silicon) with Deep Neural Apple Intelligence",
      "48MP Quad-Reflecting Visor Island Camera System with 10x Optical Zoom",
      "Day-1 Corporate Fleet Allocation with Bulk GST Tax Invoicing & AppleCare"
    ],
    ctaLabel: "Order iPhone 18 Pro",
    ctaHref: "/phones",
    ctaIcon: "arrow"
  },

  // 5. Customize Your Pc (Card 5)
  {
    id: "custom-pc",
    pillLabel: "PC Configurator",
    pillClass: "pill-pc",
    statusLabel: "Live Compatibility",
    title: "Customize Your Dream PC",
    subtitle: "Tailored Rig Builder for Gaming, 8K Video Editing, AI & Workstations",
    imageSrc: "/products/desktops/custom-pc-configurator-rig.jpg",
    imageAlt: "Custom Liquid-Cooled High-End Workstation & Gaming PC Rig",
    primaryFeatures: [
      "Interactive 3D Configurator with Real-Time Component Compatibility",
      "Intel Core Ultra & AMD Ryzen 9 + NVIDIA RTX 4090 / RTX 4080 builds",
      "48-Hour Thermal Stress Testing, 3-Year Doorstep Warranty & Nationwide Dispatch"
    ],
    ctaLabel: "Start Custom PC Build",
    ctaHref: "/configuration",
    ctaIcon: "arrow"
  },

  // 6. Accesories (Card 6)
  {
    id: "accessories",
    pillLabel: "Enterprise Essentials",
    pillClass: "pill-acc",
    statusLabel: "Bulk Corporate Pricing",
    title: "Business IT Accessories",
    subtitle: "Displays, Thunderbolt Docks, Storage, Audio & Ergonomic Peripherals",
    imageSrc: "/products/accessories/enterprise-accessories-bundle.jpg",
    imageAlt: "Enterprise Workstation Displays, Docks, Keyboards and Accessories",
    primaryFeatures: [
      "Dell UltraSharp & LG 4K Curved USB-C Hub Professional IPS Displays",
      "Thunderbolt 4 Enterprise Docking Stations with 100W Laptop Power Delivery",
      "High-Speed NVMe External Storage, Mechanical Keyboards & Ergonomic Mounts"
    ],
    ctaLabel: "Browse All Accessories",
    ctaHref: "/accessories",
    ctaIcon: "arrow"
  }
];

export default function FeaturedShowcaseGrid() {
  return (
    <section id="featured-showcase" className="featured-showcase-section">
      {/* Background Radial Glow */}
      <div className="featured-showcase-glow-bg" />

      <div className="featured-showcase-container">
        
        {/* Section Header */}
        <div className="featured-showcase-header">
          <div className="featured-showcase-eyebrow">
            <FaFire className="text-amber-500" />
            <span>Featured Solutions &amp; Flagship Hardware</span>
          </div>

          <h2 className="featured-showcase-title">
            Enterprise Solutions &amp;{" "}
            <span className="featured-showcase-title-gradient">Next-Gen Technology</span>
          </h2>

          <p className="featured-showcase-desc">
            Direct manufacturer partnerships, authorized IT hardware distribution, custom computing architectures, and priority corporate allocations across India.
          </p>
        </div>

        {/* 6-Card Grid: 3 columns desktop, 2 columns tablet, 1 column mobile */}
        <div className="featured-showcase-grid">
          {cardsData.map((card) => (
            <div key={card.id} className="featured-card group">
              <div>
                {/* Card Topbar */}
                <div className="featured-card-topbar">
                  <span className={`featured-card-brand-pill ${card.pillClass}`}>
                    {card.pillLabel}
                  </span>
                  <div className="featured-card-status-badge">
                    <span className="featured-card-status-dot" />
                    <span>{card.statusLabel}</span>
                  </div>
                </div>

                {/* Card Media Preview */}
                <Link 
                  href={card.ctaHref} 
                  className="featured-card-media block cursor-pointer"
                  title={card.title}
                >
                  <img 
                    src={card.imageSrc} 
                    alt={card.imageAlt}
                    width={400}
                    height={260}
                    loading="lazy"
                    className="featured-card-media-img"
                  />
                </Link>

                {/* Card Content Body */}
                <div className="featured-card-body">
                  <h3 className="featured-card-title">
                    <Link href={card.ctaHref} className="hover:text-blue-600 transition-colors">
                      {card.title}
                    </Link>
                  </h3>
                  <p className="featured-card-subtitle">
                    {card.subtitle}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="featured-card-features-list">
                    {card.primaryFeatures.map((feat, idx) => (
                      <li key={idx} className="featured-card-feature-item">
                        <FaCheckCircle className="featured-card-feature-icon" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="featured-card-footer">
                <Link 
                  href={card.ctaHref}
                  className="featured-card-cta-btn btn-accent"
                >
                  <span>{card.ctaLabel}</span>
                  <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
