"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  FaMicrochip, 
  FaMemory, 
  FaHdd, 
  FaDesktop, 
  FaLayerGroup, 
  FaWindows, 
  FaApple,
  FaWhatsapp,
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar,
  FaShoppingCart,
  FaRegHeart,
  FaHeart
} from "react-icons/fa";
import { LaptopProduct } from "../../data/laptopData";

interface LaptopCardProps {
  laptop: LaptopProduct;
  onOpenQuote?: (brand: string, model: string) => void;
  isCompact?: boolean;
}

export interface LaptopMetaInfo {
  title: string;
  badge1: { text: string; bg: string; textCol: string; border?: string };
  badge2: string;
  rating: number;
  reviews: number;
  cpu: string;
  ram: string;
  storage: string;
  display: string;
  gpu: string;
  os: string;
  price: string;
  priceNum: number;
  inStock: boolean;
  stockStatus: string;
}

export const LAPTOP_CATALOG_META: Record<string, LaptopMetaInfo> = {
  del_aw_m16: {
    title: "Dell Alienware m16 R2 - Intel Core Ultra 7 155H, 16GB / 32GB DDR5",
    badge1: { text: "Best Seller", bg: "bg-[#0c1e38]", textCol: "text-white" },
    badge2: "Gaming",
    rating: 4.6,
    reviews: 240,
    cpu: "Intel Core Ultra 7 155H (16 Cores)",
    ram: "16GB / 32GB DDR5",
    storage: "1TB SSD",
    display: '16" QHD+ (2560 × 1600), 240Hz',
    gpu: "NVIDIA GeForce RTX 4060 8GB",
    os: "Windows 11 Pro 64-bit",
    price: "₹ 1,89,990",
    priceNum: 189990,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  ace_asp_5: {
    title: "Acer Aspire 5 - Intel Core i5-1335U, 16GB LPDDR5, 512GB SSD",
    badge1: { text: "Value Deal", bg: "bg-[#fef08a]", textCol: "text-[#78350f]", border: "border border-yellow-300" },
    badge2: "Business",
    rating: 4.8,
    reviews: 420,
    cpu: "Intel Core i5-1335U (10 Cores)",
    ram: "16GB LPDDR5",
    storage: "512GB SSD",
    display: '15.6" Full HD (1920 × 1080)',
    gpu: "Intel Iris Xe Graphics",
    os: "Windows 11 Home / Pro",
    price: "₹ 63,990",
    priceNum: 63990,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  hp_eb_840: {
    title: "HP EliteBook 840 G10 - Intel Core i7-1365U, 32GB DDR5",
    badge1: { text: "Corporate Choice", bg: "bg-[#1d4ed8]", textCol: "text-white" },
    badge2: "Professional",
    rating: 4.7,
    reviews: 389,
    cpu: "Intel Core i7-1365U (10 Cores)",
    ram: "32GB DDR5",
    storage: "1TB SSD",
    display: '14" WUXGA (1920 × 1200)',
    gpu: "Intel Iris Xe Graphics",
    os: "Windows 11 Pro 64-bit",
    price: "₹ 1,24,990",
    priceNum: 124990,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  asu_eb_b9: {
    title: "ASUS ExpertBook B9 OLED - Intel Core i7-1355U vPro, 32GB LPDDR5",
    badge1: { text: "New Arrival", bg: "bg-[#15803d]", textCol: "text-white" },
    badge2: "Business",
    rating: 4.6,
    reviews: 240,
    cpu: "Intel Core i7-1355U (10 Cores)",
    ram: "32GB LPDDR5",
    storage: "1TB SSD",
    display: '14" 2.8K OLED (2880 × 1800)',
    gpu: "Intel Iris Xe Graphics",
    os: "Windows 11 Pro 64-bit",
    price: "₹ 1,39,990",
    priceNum: 139990,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  len_tp_e14: {
    title: "Lenovo ThinkPad E14 Gen 5 - Intel Core i5-1335U, 16GB RAM, 512GB SSD",
    badge1: { text: "Corporate Choice", bg: "bg-[#1d4ed8]", textCol: "text-white" },
    badge2: "Business",
    rating: 4.6,
    reviews: 316,
    cpu: "Intel Core i5-1335U (10 Cores)",
    ram: "16GB DDR4",
    storage: "512GB SSD",
    display: '14" WUXGA (1920 × 1200)',
    gpu: "Intel Iris Xe Graphics",
    os: "Windows 11 Pro 64-bit",
    price: "₹ 68,990",
    priceNum: 68990,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  len_tp_x1c: {
    title: "Lenovo ThinkPad X1 Carbon Gen 11 - Intel Core i7-1365U, 32GB DDR5",
    badge1: { text: "Best Seller", bg: "bg-[#0c1e38]", textCol: "text-white" },
    badge2: "Professional",
    rating: 4.8,
    reviews: 597,
    cpu: "Intel Core i7-1365U (10 Cores)",
    ram: "32GB LPDDR5",
    storage: "1TB SSD",
    display: '14" 2.8K OLED (2880 × 1800)',
    gpu: "Intel Iris Xe Graphics",
    os: "Windows 11 Pro 64-bit",
    price: "₹ 1,74,990",
    priceNum: 174990,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  len_ip_s3: {
    title: "Lenovo IdeaPad Slim 3 - Intel Core i5-13420H, 16GB, 512GB SSD",
    badge1: { text: "Value Deal", bg: "bg-[#fef08a]", textCol: "text-[#78350f]", border: "border border-yellow-300" },
    badge2: "Business",
    rating: 4.5,
    reviews: 210,
    cpu: "Intel Core i5-13420H (8 Cores)",
    ram: "16GB DDR5",
    storage: "512GB SSD",
    display: '15.6" FHD (1920 × 1080)',
    gpu: "Intel UHD Graphics",
    os: "Windows 11 Home / Pro",
    price: "₹ 54,990",
    priceNum: 54990,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  len_yg_9i: {
    title: "Lenovo Yoga Pro 9i - Intel Core Ultra 9 185H, 32GB, RTX 4060",
    badge1: { text: "New Arrival", bg: "bg-[#15803d]", textCol: "text-white" },
    badge2: "Creator",
    rating: 4.7,
    reviews: 245,
    cpu: "Intel Core Ultra 9 185H (16 Cores)",
    ram: "32GB LPDDR5X",
    storage: "1TB SSD",
    display: '16" 3.2K (3200 × 2000), 165Hz',
    gpu: "NVIDIA GeForce RTX 4060 8GB",
    os: "Windows 11 Pro 64-bit",
    price: "₹ 1,82,990",
    priceNum: 182990,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  len_leg_5i: {
    title: "Lenovo Legion Pro 5i - Intel Core i7-14700HX, 32GB, RTX 4070",
    badge1: { text: "Best Seller", bg: "bg-[#0c1e38]", textCol: "text-white" },
    badge2: "Gaming",
    rating: 4.8,
    reviews: 632,
    cpu: "Intel Core i7-14700HX (20 Cores)",
    ram: "32GB DDR5",
    storage: "1TB SSD",
    display: '16" WQXGA 240Hz 500 nits',
    gpu: "NVIDIA GeForce RTX 4070 8GB",
    os: "Windows 11 Pro 64-bit",
    price: "₹ 1,64,990",
    priceNum: 164990,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  hp_pb_440: {
    title: "HP ProBook 440 G10 - Intel Core i5-1335U, 16GB, 512GB SSD",
    badge1: { text: "Corporate Choice", bg: "bg-[#1d4ed8]", textCol: "text-white" },
    badge2: "Business",
    rating: 4.5,
    reviews: 274,
    cpu: "Intel Core i5-1335U (10 Cores)",
    ram: "16GB DDR4",
    storage: "512GB SSD",
    display: '14" FHD (1920 × 1080)',
    gpu: "Intel Iris Xe Graphics",
    os: "Windows 11 Pro 64-bit",
    price: "₹ 67,490",
    priceNum: 67490,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  hp_sp_x360: {
    title: "HP Spectre x360 14 - Intel Core Ultra 7 155H, 32GB, 2.8K OLED",
    badge1: { text: "Corporate Choice", bg: "bg-[#1d4ed8]", textCol: "text-white" },
    badge2: "Creator",
    rating: 4.6,
    reviews: 210,
    cpu: "Intel Core Ultra 7 155H (16 Cores)",
    ram: "32GB LPDDR5X",
    storage: "1TB SSD",
    display: '14" 2.8K OLED Touch (2880 × 1800)',
    gpu: "Intel Arc Graphics",
    os: "Windows 11 Pro 64-bit",
    price: "₹ 1,59,990",
    priceNum: 159990,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  hp_om_16: {
    title: "HP OMEN 16 - Intel Core i7-14700HX, 16GB, RTX 4060",
    badge1: { text: "Best Seller", bg: "bg-[#0c1e38]", textCol: "text-white" },
    badge2: "Gaming",
    rating: 4.7,
    reviews: 495,
    cpu: "Intel Core i7-14700HX (20 Cores)",
    ram: "16GB DDR5",
    storage: "1TB SSD",
    display: '16.1" QHD 240Hz 3ms',
    gpu: "NVIDIA GeForce RTX 4060 8GB",
    os: "Windows 11 Home / Pro",
    price: "₹ 1,32,990",
    priceNum: 132990,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  del_lat_5440: {
    title: "Dell Latitude 5440 - Intel Core i5-1335U, 16GB, 512GB SSD",
    badge1: { text: "Corporate Choice", bg: "bg-[#1d4ed8]", textCol: "text-white" },
    badge2: "Business",
    rating: 4.6,
    reviews: 412,
    cpu: "Intel Core i5-1335U (10 Cores)",
    ram: "16GB DDR4",
    storage: "512GB SSD",
    display: '14" FHD (1920 × 1080) Anti-glare',
    gpu: "Intel Iris Xe Graphics",
    os: "Windows 11 Pro 64-bit",
    price: "₹ 76,990",
    priceNum: 76990,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  del_lat_7440: {
    title: "Dell Latitude 7440 Ultralight - Intel Core i7-1365U, 32GB, 1TB SSD",
    badge1: { text: "New Arrival", bg: "bg-[#15803d]", textCol: "text-white" },
    badge2: "Professional",
    rating: 4.7,
    reviews: 320,
    cpu: "Intel Core i7-1365U vPro (10 Cores)",
    ram: "32GB LPDDR5",
    storage: "1TB SSD",
    display: '14" FHD+ 16:10 400 nits',
    gpu: "Intel Iris Xe Graphics",
    os: "Windows 11 Pro 64-bit",
    price: "₹ 1,48,990",
    priceNum: 148990,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  del_vos_3520: {
    title: "Dell Vostro 3520 - Intel Core i5-1235U, 16GB, 512GB SSD",
    badge1: { text: "Value Deal", bg: "bg-[#fef08a]", textCol: "text-[#78350f]", border: "border border-yellow-300" },
    badge2: "Business",
    rating: 4.4,
    reviews: 290,
    cpu: "Intel Core i5-1235U (10 Cores)",
    ram: "16GB DDR4",
    storage: "512GB SSD",
    display: '15.6" FHD 120Hz Anti-glare',
    gpu: "Intel Iris Xe Graphics",
    os: "Windows 11 Home / Pro",
    price: "₹ 48,990",
    priceNum: 48990,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  del_xps_15: {
    title: "Dell XPS 15 (9530) - Intel Core i9-13900H, 32GB, RTX 4070, 3.5K OLED",
    badge1: { text: "Best Seller", bg: "bg-[#0c1e38]", textCol: "text-white" },
    badge2: "Creator",
    rating: 4.8,
    reviews: 430,
    cpu: "Intel Core i9-13900H (14 Cores)",
    ram: "32GB DDR5",
    storage: "1TB SSD",
    display: '15.6" 3.5K OLED InfinityEdge',
    gpu: "NVIDIA GeForce RTX 4070 8GB",
    os: "Windows 11 Pro 64-bit",
    price: "₹ 2,45,990",
    priceNum: 245990,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  asu_zb_pro14: {
    title: "ASUS Zenbook Pro 14 Duo OLED - Intel Core i9-13900H, 32GB, RTX 4060",
    badge1: { text: "New Arrival", bg: "bg-[#15803d]", textCol: "text-white" },
    badge2: "Creator",
    rating: 4.6,
    reviews: 276,
    cpu: "Intel Core i9-13900H (14 Cores)",
    ram: "32GB LPDDR5",
    storage: "1TB SSD",
    display: '14.5" 2.8K 120Hz OLED + ScreenPad',
    gpu: "NVIDIA GeForce RTX 4060 8GB",
    os: "Windows 11 Pro 64-bit",
    price: "₹ 1,94,990",
    priceNum: 194990,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  asu_vb_15: {
    title: "ASUS VivoBook 15 - Intel Core i5-1235U, 16GB, 512GB SSD",
    badge1: { text: "Value Deal", bg: "bg-[#fef08a]", textCol: "text-[#78350f]", border: "border border-yellow-300" },
    badge2: "Business",
    rating: 4.5,
    reviews: 220,
    cpu: "Intel Core i5-1235U (10 Cores)",
    ram: "16GB DDR4",
    storage: "512GB SSD",
    display: '15.6" FHD Anti-glare',
    gpu: "Intel Iris Xe Graphics",
    os: "Windows 11 Home / Pro",
    price: "₹ 49,990",
    priceNum: 49990,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  asu_rog_g16: {
    title: "ASUS ROG Strix G16 - Intel Core i7-13650HX, 16GB, RTX 4060",
    badge1: { text: "Best Seller", bg: "bg-[#0c1e38]", textCol: "text-white" },
    badge2: "Gaming",
    rating: 4.9,
    reviews: 680,
    cpu: "Intel Core i7-13650HX (14 Cores)",
    ram: "16GB DDR5",
    storage: "1TB SSD",
    display: '16" FHD+ 165Hz ROG Nebula',
    gpu: "NVIDIA GeForce RTX 4060 8GB",
    os: "Windows 11 Pro 64-bit",
    price: "₹ 1,29,990",
    priceNum: 129990,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  ace_tm_p2: {
    title: "Acer TravelMate P2 14 - Intel Core i5-1335U, 16GB, 512GB SSD",
    badge1: { text: "Corporate Choice", bg: "bg-[#1d4ed8]", textCol: "text-white" },
    badge2: "Business",
    rating: 4.5,
    reviews: 180,
    cpu: "Intel Core i5-1335U (10 Cores)",
    ram: "16GB DDR4",
    storage: "512GB SSD",
    display: '14" WUXGA 16:10 Anti-glare',
    gpu: "Intel Iris Xe Graphics",
    os: "Windows 11 Pro 64-bit",
    price: "₹ 56,990",
    priceNum: 56990,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  ace_sw_go: {
    title: "Acer Swift Go 14 OLED - Intel Core Ultra 7 155H, 16GB, 2.8K OLED",
    badge1: { text: "New Arrival", bg: "bg-[#15803d]", textCol: "text-white" },
    badge2: "Creator",
    rating: 4.7,
    reviews: 215,
    cpu: "Intel Core Ultra 7 155H (16 Cores)",
    ram: "16GB LPDDR5X",
    storage: "1TB SSD",
    display: '14" 2.8K 90Hz OLED 500 nits',
    gpu: "Intel Arc Graphics",
    os: "Windows 11 Pro 64-bit",
    price: "₹ 84,990",
    priceNum: 84990,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  ace_nit_16: {
    title: "Acer Nitro 16 - AMD Ryzen 7 7840HS, 16GB, RTX 4060",
    badge1: { text: "Value Deal", bg: "bg-[#fef08a]", textCol: "text-[#78350f]", border: "border border-yellow-300" },
    badge2: "Gaming",
    rating: 4.6,
    reviews: 340,
    cpu: "AMD Ryzen 7 7840HS (8 Cores)",
    ram: "16GB DDR5",
    storage: "1TB SSD",
    display: '16" WUXGA 165Hz sRGB 100%',
    gpu: "NVIDIA GeForce RTX 4060 8GB",
    os: "Windows 11 Home / Pro",
    price: "₹ 99,990",
    priceNum: 99990,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  app_mba_13_m3: {
    title: 'Apple MacBook Air 13" (M3) - 8-Core CPU, 10-Core GPU, 16GB',
    badge1: { text: "Best Seller", bg: "bg-[#0c1e38]", textCol: "text-white" },
    badge2: "Professional",
    rating: 4.9,
    reviews: 840,
    cpu: "Apple M3 chip (8-Core CPU)",
    ram: "16GB Unified Memory",
    storage: "512GB SSD",
    display: '13.6" Liquid Retina Display',
    gpu: "10-Core Apple GPU",
    os: "macOS Sonoma / Sequoia",
    price: "₹ 1,24,900",
    priceNum: 124900,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  app_mba_15_m3: {
    title: 'Apple MacBook Air 15" (M3) - 8-Core CPU, 10-Core GPU, 16GB',
    badge1: { text: "Corporate Choice", bg: "bg-[#1d4ed8]", textCol: "text-white" },
    badge2: "Professional",
    rating: 4.8,
    reviews: 520,
    cpu: "Apple M3 chip (8-Core CPU)",
    ram: "16GB Unified Memory",
    storage: "512GB SSD",
    display: '15.3" Liquid Retina Display',
    gpu: "10-Core Apple GPU",
    os: "macOS Sonoma / Sequoia",
    price: "₹ 1,44,900",
    priceNum: 144900,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  app_mbp_14_m3pro: {
    title: 'Apple MacBook Pro 14" (M3 Pro) - 11-Core CPU, 14-Core GPU, 18GB',
    badge1: { text: "New Arrival", bg: "bg-[#15803d]", textCol: "text-white" },
    badge2: "Creator",
    rating: 4.9,
    reviews: 610,
    cpu: "Apple M3 Pro (11-Core CPU)",
    ram: "18GB Unified Memory",
    storage: "512GB SSD",
    display: '14.2" Liquid Retina XDR 120Hz',
    gpu: "14-Core Apple GPU",
    os: "macOS Sonoma / Sequoia",
    price: "₹ 1,89,900",
    priceNum: 189900,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
  app_mbp_16_m3max: {
    title: 'Apple MacBook Pro 16" (M3 Max) - 14-Core CPU, 30-Core GPU, 36GB',
    badge1: { text: "Best Seller", bg: "bg-[#0c1e38]", textCol: "text-white" },
    badge2: "Workstation",
    rating: 5.0,
    reviews: 390,
    cpu: "Apple M3 Max (14-Core CPU)",
    ram: "36GB Unified Memory",
    storage: "1TB SSD",
    display: '16.2" Liquid Retina XDR 120Hz',
    gpu: "30-Core Apple GPU",
    os: "macOS Sonoma / Sequoia",
    price: "₹ 3,49,900",
    priceNum: 349900,
    inStock: true,
    stockStatus: "Ready to Ship",
  },
};

export default function LaptopCard({ laptop, onOpenQuote, isCompact = false }: LaptopCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const meta = LAPTOP_CATALOG_META[laptop.id] || {
    title: `${laptop.brand} ${laptop.model}`,
    badge1: { text: "Corporate Choice", bg: "bg-[#1d4ed8]", textCol: "text-white" },
    badge2: laptop.category || "Business",
    rating: 4.6,
    reviews: 240,
    cpu: laptop.detailedSpecs?.processor || "Intel Core i5 Processor",
    ram: laptop.detailedSpecs?.ram || "16GB RAM",
    storage: laptop.detailedSpecs?.storage || "512GB SSD",
    display: laptop.detailedSpecs?.display?.split(",")[0] || '14" Full HD Display',
    gpu: laptop.detailedSpecs?.graphics || "Integrated Graphics",
    os: laptop.detailedSpecs?.operatingSystem || "Windows 11 Pro 64-bit",
    price: laptop.price ? `₹ ${laptop.price.toLocaleString("en-IN")}` : "₹ 74,990",
    priceNum: laptop.price || 74990,
    inStock: true,
    stockStatus: "Ready to Ship",
  };

  const productUrl = `/laptops/${laptop.brandSlug}/${laptop.slug}`;

  const handleQuoteClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onOpenQuote) {
      onOpenQuote(laptop.brand, laptop.model);
    } else {
      const whatsappMessage = `Hi Authentic Infosystem, I would like to request an official B2B quote and availability for ${laptop.brand} ${laptop.model}.`;
      window.open(`https://wa.me/919643990077?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
    }
  };

  // Render 5-star rating exactly like screenshot
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

  if (isCompact) {
    return (
      <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-3.5 sm:p-4 transition-all duration-200 hover:shadow-md group flex flex-col sm:flex-row gap-4 items-stretch w-full">
        {/* Left Image */}
        <div className="sm:w-48 lg:w-56 shrink-0 flex flex-col justify-center">
          <Link 
            href={productUrl}
            prefetch={false}
            className="relative w-full h-[120px] sm:h-[135px] flex items-center justify-center p-1 overflow-hidden group-hover:scale-[1.02] transition-transform duration-300"
          >
            <img
              src={laptop.image}
              alt={meta.title}
              width="240"
              height="150"
              loading="lazy"
              className="max-h-full max-w-full object-contain filter drop-shadow-sm"
            />
          </Link>
        </div>

        {/* Center / Right Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <Link href={productUrl} prefetch={false} className="block group/title">
                <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 group-hover/title:text-blue-700 leading-snug transition-colors line-clamp-2">
                  {meta.title}
                </h3>
              </Link>
              <button 
                type="button"
                onClick={() => setIsFavorited(!isFavorited)}
                className="text-slate-400 hover:text-rose-500 transition-colors p-2 -mr-1 -mt-1 cursor-pointer shrink-0 min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label="Save to wishlist"
              >
                {isFavorited ? <FaHeart className="text-rose-500" size={14} /> : <FaRegHeart size={14} />}
              </button>
            </div>

            <div className="flex items-center gap-1.5 my-1.5">
              <div className="flex items-center gap-0.5">
                {renderStars(meta.rating)}
              </div>
              <span className="text-xs font-bold text-slate-800 ml-0.5">{meta.rating.toFixed(1)}</span>
              <span className="text-xs text-slate-400">({meta.reviews})</span>
            </div>

            {/* Spec grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-1.5 my-2 text-[11px] text-slate-600 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
              <div className="flex items-center gap-1.5 overflow-hidden">
                <FaMicrochip className="text-slate-400 shrink-0 text-xs" />
                <span className="truncate">{meta.cpu}</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-hidden">
                <FaMemory className="text-slate-400 shrink-0 text-xs" />
                <span className="truncate">{meta.ram}</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-hidden">
                <FaHdd className="text-slate-400 shrink-0 text-xs" />
                <span className="truncate">{meta.storage}</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-hidden">
                <FaDesktop className="text-slate-400 shrink-0 text-xs" />
                <span className="truncate">{meta.display}</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-hidden">
                <FaLayerGroup className="text-slate-400 shrink-0 text-xs" />
                <span className="truncate">{meta.gpu}</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-hidden">
                {laptop.brandSlug === "apple" ? (
                  <FaApple className="text-slate-400 shrink-0 text-xs" />
                ) : (
                  <FaWindows className="text-slate-400 shrink-0 text-xs" />
                )}
                <span className="truncate">{meta.os}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-slate-100 mt-2 sm:mt-0">
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-100">
              {meta.stockStatus}
            </span>
            <button
              onClick={handleQuoteClick}
              className="bg-[#25D366] hover:bg-[#20ba59] text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer min-h-[40px] touch-manipulation"
            >
              <FaWhatsapp size={14} className="text-white shrink-0" />
              <span>Get Quote</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between h-full transition-all duration-200 hover:shadow-md group">
      <div>
        {/* TOP ROW: WISHLIST HEART */}
        <div className="flex items-center justify-end mb-1">
          {/* Heart / Wishlist Icon with minimum 36px tap target for iOS touch */}
          <button 
            type="button"
            onClick={() => setIsFavorited(!isFavorited)}
            className="text-slate-400 hover:text-rose-500 transition-colors p-2 -mr-1 -mt-1 cursor-pointer shrink-0 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full hover:bg-slate-50"
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
        <Link 
          href={productUrl}
          prefetch={false}
          className="relative w-full h-[140px] sm:h-[155px] flex items-center justify-center p-1.5 my-1 overflow-hidden group-hover:scale-[1.02] transition-transform duration-300 block"
        >
          <img
            src={laptop.image}
            alt={meta.title}
            width="280"
            height="180"
            loading="lazy"
            className="max-h-full max-w-full object-contain filter drop-shadow-sm"
          />
        </Link>

        {/* PRODUCT TITLE (Dark Bold font, 2 lines) */}
        <Link href={productUrl} prefetch={false} className="block mt-2 group/title">
          <h3 className="text-[13px] sm:text-[13.5px] font-bold text-slate-900 group-hover/title:text-blue-700 leading-snug line-clamp-2 min-h-[38px] transition-colors">
            {meta.title}
          </h3>
        </Link>

        {/* STAR RATING ROW */}
        <div className="flex items-center gap-1.5 my-2">
          <div className="flex items-center gap-0.5">
            {renderStars(meta.rating)}
          </div>
          <span className="text-xs font-bold text-slate-800 ml-0.5">
            {meta.rating.toFixed(1)}
          </span>
          <span className="text-xs text-slate-400">
            ({meta.reviews})
          </span>
        </div>

        {/* 6 TECH SPECS WITH CLEAN ICONS */}
        <div className="space-y-1.5 my-3 text-[11px] sm:text-[11.5px] text-slate-600 border-t border-slate-100 pt-2.5">
          {/* 1. CPU */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaMicrochip className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">{meta.cpu}</span>
          </div>

          {/* 2. RAM */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaMemory className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">{meta.ram}</span>
          </div>

          {/* 3. Storage */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaHdd className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">{meta.storage}</span>
          </div>

          {/* 4. Display */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaDesktop className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">{meta.display}</span>
          </div>

          {/* 5. GPU */}
          <div className="flex items-center gap-2 overflow-hidden">
            <FaLayerGroup className="text-slate-400 shrink-0 text-xs" />
            <span className="truncate">{meta.gpu}</span>
          </div>

          {/* 6. OS */}
          <div className="flex items-center gap-2 overflow-hidden">
            {laptop.brandSlug === "apple" ? (
              <FaApple className="text-slate-400 shrink-0 text-xs" />
            ) : (
              <FaWindows className="text-slate-400 shrink-0 text-xs" />
            )}
            <span className="truncate">{meta.os}</span>
          </div>
        </div>
      </div>

      {/* BOTTOM ACTIONS SECTION: GET QUOTE CTA ONLY */}
      <div className="mt-auto pt-2.5 border-t border-slate-100">
        <button
          onClick={handleQuoteClick}
          className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer min-h-[44px] touch-manipulation"
        >
          <FaWhatsapp size={14} className="text-white shrink-0" />
          <span>Get Quote</span>
        </button>
      </div>
    </div>
  );
}
