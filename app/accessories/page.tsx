"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/shared/PageHero";
import SectionHeader from "../components/shared/SectionHeader";
import ProductCard from "../components/shared/ProductCard";
import React, { useRef } from "react";

const accessoriesProducts = [
  {
    id: "a1",
    name: "Logitech MX Master 3S",
    modelNumber: "LOGI-MXM-3S",
    image: "/placeholder-accessory.png",
    specs: [
      { label: "Type", value: "Wireless Mouse" },
      { label: "DPI", value: "8000 DPI Sensor" },
      { label: "Connectivity", value: "Bluetooth/Logi Bolt" },
    ],
    badges: ["Productivity", "Top Rated"],
    warranty: "1 Year Limited",
  },
  {
    id: "a2",
    name: "Dell UltraSharp 27\" 4K",
    modelNumber: "U2723QE",
    image: "/placeholder-accessory.png",
    specs: [
      { label: "Resolution", value: "3840 x 2160" },
      { label: "Panel Type", value: "IPS Black Technology" },
      { label: "Hub Features", value: "USB-C (90W PD), RJ45" },
    ],
    badges: ["Monitor", "Professional"],
    warranty: "3 Years Advanced Exchange",
  },
  {
    id: "a3",
    name: "Keychron K8 Pro",
    modelNumber: "KEY-K8P",
    image: "/placeholder-accessory.png",
    specs: [
      { label: "Type", value: "Mechanical Keyboard" },
      { label: "Layout", value: "TKL (80%)" },
      { label: "Switches", value: "Hot-swappable" },
    ],
    badges: ["Developer", "Wireless"],
    warranty: "1 Year Standard",
  },
  {
    id: "a4",
    name: "Lenovo ThinkPad Universal USB-C Dock",
    modelNumber: "40AY0090US",
    image: "/placeholder-accessory.png",
    specs: [
      { label: "Video Ports", value: "2x DisplayPort, 1x HDMI" },
      { label: "Power Delivery", value: "Up to 100W" },
      { label: "Networking", value: "Gigabit Ethernet" },
    ],
    badges: ["Docking", "Essential"],
    warranty: "3 Years Warranty",
  },
  {
    id: "a5",
    name: "Jabra Evolve2 65",
    modelNumber: "JABRA-EV2-65",
    image: "/placeholder-accessory.png",
    specs: [
      { label: "Type", value: "Wireless Headset" },
      { label: "Battery Life", value: "Up to 37 hours" },
      { label: "Mic", value: "3-microphone tech" },
    ],
    badges: ["Audio", "UC Certified"],
    warranty: "2 Years Limited",
  },
  {
    id: "a6",
    name: "Logitech Brio 4K Webcam",
    modelNumber: "LOGI-BRIO-4K",
    image: "/placeholder-accessory.png",
    specs: [
      { label: "Resolution", value: "4K Ultra HD" },
      { label: "FOV", value: "Adjustable 65/78/90°" },
      { label: "Features", value: "Windows Hello support" },
    ],
    badges: ["Video", "Premium"],
    warranty: "3 Years Limited",
  },
  {
    id: "a7",
    name: "APC Back-UPS Pro 1500VA",
    modelNumber: "BR1500G",
    image: "/placeholder-accessory.png",
    specs: [
      { label: "Capacity", value: "1500VA / 865W" },
      { label: "Outlets", value: "10 Total" },
      { label: "Topology", value: "Line Interactive" },
    ],
    badges: ["Power", "Backup"],
    warranty: "3 Years Repair/Replace",
  },
  {
    id: "a8",
    name: "Samsung T7 Shield 2TB",
    modelNumber: "SAM-T7-2TB",
    image: "/placeholder-accessory.png",
    specs: [
      { label: "Type", value: "Portable SSD" },
      { label: "Speed", value: "Up to 1050 MB/s" },
      { label: "Durability", value: "IP65 Water/Dust" },
    ],
    badges: ["Storage", "Rugged"],
    warranty: "3 Years Limited",
  },
  {
    id: "a9",
    name: "Poly Sync 20 Speakerphone",
    modelNumber: "POLY-SYNC-20",
    image: "/placeholder-accessory.png",
    specs: [
      { label: "Connectivity", value: "USB-A/C, Bluetooth" },
      { label: "Mic Range", value: "Up to 7 ft / 2 m" },
      { label: "Battery", value: "Up to 20 hours" },
    ],
    badges: ["Conference", "Portable"],
    warranty: "2 Years Standard",
  },
  {
    id: "a10",
    name: "Anker 7-in-1 USB-C Hub",
    modelNumber: "A83460A2",
    image: "/placeholder-accessory.png",
    specs: [
      { label: "Ports", value: "HDMI, SD, USB-A/C" },
      { label: "Power Delivery", value: "100W Pass-Through" },
      { label: "Compatibility", value: "Mac, Windows, iPad" },
    ],
    badges: ["Hub", "Travel"],
    warranty: "18 Months Warranty",
  },
  {
    id: "a11",
    name: "Belkin Thunderbolt 3 Cable",
    modelNumber: "F2CD084BT0.8MBK",
    image: "/placeholder-accessory.png",
    specs: [
      { label: "Type", value: "Thunderbolt 3 (USB-C)" },
      { label: "Length", value: "0.8m / 2.6ft" },
      { label: "Speed", value: "40 Gbps" },
    ],
    badges: ["Cables", "High Speed"],
    warranty: "2 Years Limited",
  },
  {
    id: "a12",
    name: "LG 34\" Curved Ultrawide",
    modelNumber: "34WN80C-B",
    image: "/placeholder-accessory.png",
    specs: [
      { label: "Resolution", value: "3440 x 1440 (WQHD)" },
      { label: "Panel", value: "IPS Curved" },
      { label: "Features", value: "USB-C PD, sRGB 99%" },
    ],
    badges: ["Monitor", "Ultrawide"],
    warranty: "1 Year Parts & Labor",
  },
  {
    id: "a13",
    name: "Microsoft Sculpt Ergonomic",
    modelNumber: "MS-SCULPT-ERGO",
    image: "/placeholder-accessory.png",
    specs: [
      { label: "Type", value: "Ergonomic Desktop Set" },
      { label: "Layout", value: "Split Keyset" },
      { label: "Includes", value: "Keyboard, Mouse, Numpad" },
    ],
    badges: ["Ergonomic", "Bundle"],
    warranty: "3 Years Limited",
  },
  {
    id: "a14",
    name: "WD Black SN850X 2TB",
    modelNumber: "WDS200T2X0E",
    image: "/placeholder-accessory.png",
    specs: [
      { label: "Type", value: "Internal NVMe SSD" },
      { label: "Interface", value: "PCIe Gen4 x4" },
      { label: "Speed", value: "Up to 7300 MB/s" },
    ],
    badges: ["Storage", "Performance"],
    warranty: "5 Years Limited",
  },
  {
    id: "a15",
    name: "Ergotron LX Desk Monitor Arm",
    modelNumber: "45-241-026",
    image: "/placeholder-accessory.png",
    specs: [
      { label: "Capacity", value: "Up to 34\", 25 lbs" },
      { label: "Adjustment", value: "13\" height range" },
      { label: "Mounting", value: "Desk Clamp / Grommet" },
    ],
    badges: ["Ergonomics", "Mounting"],
    warranty: "10 Years Warranty",
  },
  {
    id: "a16",
    name: "Kensington NanoSaver Lock",
    modelNumber: "K64444WW",
    image: "/placeholder-accessory.png",
    specs: [
      { label: "Type", value: "Keyed Cable Lock" },
      { label: "Compatibility", value: "Nano Security Slot" },
      { label: "Cable", value: "Carbon Steel" },
    ],
    badges: ["Security", "Physical"],
    warranty: "5 Years Limited",
  },
];

export default function AccessoriesPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />

      <PageHero
        title="Elevate Your Workspace."
        subtitle="Explore productivity-enhancing accessories designed for professionals and modern workplaces."
        miniText="PREMIUM ACCESSORIES"
        primaryButtonText="Browse Accessories"
        secondaryButtonText="Request Corporate Pricing"
      />

      {/* Categories */}
      <section className="py-6 sm:py-8 page-container border-b border-white/5">
        <div className="flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-4 pb-2 sm:pb-0 scrollbar-hide w-full">
          {['Keyboard', 'Mouse', 'Monitor', 'Docking Station', 'USB Hub', 'Webcam', 'Headsets', 'Conference Devices', 'Speakers', 'Power Backup', 'External Storage', 'Cables'].map((cat, i) => (
            <button key={i} className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap shrink-0">
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-8 sm:py-10 page-container">
        <SectionHeader title="Featured Accessories" subtitle="Hand-picked tools to maximize your daily productivity." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
          {accessoriesProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              {...product}
              delay={index * 0.05}
            />
          ))}
        </div>
      </section>

      {/* Workspace Collections */}
      <section className="py-12 bg-white/5 page-container">
        <SectionHeader title="Workspace Collections" align="center" subtitle="Curated setups for every type of professional." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {['Work From Home Kit', 'Developer Desk', 'Executive Office', 'Gaming Setup', 'Conference Room', 'Student Essentials'].map((collection, i) => (
            <div key={i} className="glass-panel p-8 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <h3 className="text-2xl font-bold mb-2 relative z-10">{collection}</h3>
              <p className="text-blue-400 font-medium relative z-10">View Bundle →</p>
            </div>
          ))}
        </div>
      </section>

      {/* Buying Guide Carousel */}
      <section className="page-container mt-12 border-t border-white/10 pt-12 h-fit">
        <SectionHeader title="Accessory Buying Guides" />
        
        <div className="relative mt-8 h-fit">
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-white/10 hover:scale-110 transition-all shadow-lg"
            aria-label="Scroll left"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 scrollbar-hide relative z-0 px-4 md:px-0 h-fit items-start pb-4"
          >
            {['Mouse Guide', 'Keyboard Guide', 'Monitor Guide', 'USB-C Guide', 'Cable Guide', 'Power Backup Guide'].map((guide, i) => (
            <div key={i} className="min-w-[300px] bg-white rounded-[22px] border border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-8 shrink-0 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-black/5 rounded-full mb-6 flex items-center justify-center text-xl">📚</div>
              <h3 className="text-xl font-semibold mb-3 text-black">{guide}</h3>
              <p className="text-gray-600 text-sm">Learn everything you need to know before making a purchase.</p>
            </div>
          ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-white/10 hover:scale-110 transition-all shadow-lg"
            aria-label="Scroll right"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </section>

      {/* Special Bundle */}
      <section className="page-container mt-8 mb-24 h-fit">
        <div className="bg-white p-12 lg:p-20 rounded-[22px] border border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] relative overflow-hidden">
          {/* Subtle accent gradient inside the white card */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-100 to-transparent rounded-full opacity-60 blur-3xl -z-0 translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>
          
          <div className="max-w-3xl relative z-10">
            <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-bold uppercase tracking-wider mb-6 inline-block">Special Bundle</span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-black">Professional Workstation Bundle</h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">Equip your team with a complete, fully compatible workstation setup featuring top-tier components. Perfect for new hires and office upgrades.</p>
            
            <ul className="grid grid-cols-2 gap-4 mb-10 text-gray-700 font-medium">
              <li className="flex items-center gap-3"><span className="text-blue-600">✓</span> 27" 4K Monitor</li>
              <li className="flex items-center gap-3"><span className="text-blue-600">✓</span> Mechanical Keyboard</li>
              <li className="flex items-center gap-3"><span className="text-blue-600">✓</span> Ergonomic Mouse</li>
              <li className="flex items-center gap-3"><span className="text-blue-600">✓</span> Universal USB-C Dock</li>
              <li className="flex items-center gap-3"><span className="text-blue-600">✓</span> Wireless Headset</li>
              <li className="flex items-center gap-3"><span className="text-blue-600">✓</span> Adjustable Laptop Stand</li>
            </ul>

            <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Request Corporate Pricing
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
