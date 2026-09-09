"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/shared/PageHero";
import SectionHeader from "../components/shared/SectionHeader";
import ProductCard from "../components/shared/ProductCard";
import React, { useRef } from "react";
const buyingGuides = [
  {
    title: "Mouse Guide",
    desc: "Learn everything you need to know before making a purchase.",
    image: "/Accessories/Mouse%20Guide.jpg",
  },
  {
    title: "Keyboard Guide",
    desc: "Learn everything you need to know before making a purchase.",
    image: "/Accessories/Keyboard%20Guide.jpg",
  },
  {
    title: "Monitor Guide",
    desc: "Learn everything you need to know before making a purchase.",
    image: "/Accessories/Monitor%20Guide.jpg",
  },
  {
    title: "USB-C Guide",
    desc: "Learn everything you need to know before making a purchase.",
    image: "/Accessories/USB-C%20Guide.jpg",
  },
  {
    title: "Cable Guide",
    desc: "Learn everything you need to know before making a purchase.",
    image: "/Accessories/Cable%20Guide.jpg",
  },
  {
    title: "Power Backup Guide",
    desc: "Learn everything you need to know before making a purchase.",
    image: "/Accessories/Power%20Backup%20Guide.jpg",
  },
];

const accessoriesProducts = [
  {
    id: "a1",
    name: "Logitech MX Master 3S",
    modelNumber: "LOGI-MXM-3S",
    image: "/products/accessories/logitech-mx-master-3s.jpg",
    description: "Quiet ergonomic wireless mouse with 8K DPI tracking on glass and MagSpeed electromagnetic scrolling for ultimate productivity.",
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
    image: "/products/accessories/dell-ultrasharp-27.jpg",
    description: "Brilliant 4K UHD monitor with IPS Black technology, 2000:1 contrast ratio, and integrated 90W USB-C hub with RJ45 connectivity.",
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
    image: "/products/accessories/keychron-k8-pro.jpg",
    description: "Custom wireless mechanical keyboard featuring QMK/VIA programmability, hot-swappable switches, and Mac/Windows layout compatibility.",
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
    image: "/products/accessories/lenovo-thinkpad-dock.jpg",
    description: "Enterprise docking solution supporting dual 4K external displays, 100W laptop power delivery, and centralized fleet management.",
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
    image: "/products/accessories/jabra-evolve2-65.jpg",
    description: "Professional wireless headset with noise-isolating ear cushions, 3-mic call clarity, integrated busy light, and 37-hour battery life.",
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
    image: "/products/accessories/logitech-brio-4k.jpg",
    description: "Ultra 4K HD webcam with HDR RightLight 3 technology, dual noise-canceling microphones, and Windows Hello facial recognition login.",
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
    image: "/products/accessories/apc-back-ups-1500va.jpg",
    description: "Premium line-interactive uninterruptible power supply providing battery backup, AVR surge protection, and LCD diagnostic display.",
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
    image: "/products/accessories/samsung-t7-shield.jpg",
    description: "Rugged high-speed portable SSD with IP65 water and dust resistance, 3-meter drop durability, and up to 1050 MB/s transfer speeds.",
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
    image: "/products/accessories/poly-sync-20.jpg",
    description: "Portable smart USB/Bluetooth speakerphone with steerable multi-microphone array, full-duplex audio, and 20-hour talk time.",
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
    image: "/products/accessories/anker-7in1-hub.jpg",
    description: "Multiport USB-C adapter expanding your setup with 4K HDMI, 100W Power Delivery pass-through, SD/microSD slots, and dual USB-A ports.",
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
    image: "/products/accessories/belkin-thunderbolt3-cable.jpg",
    description: "Ultra-fast Thunderbolt 3 cable supporting 40 Gbps data transfers, 100W Power Delivery, and dual 4K / single 5K high-res video feeds.",
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
    image: "/products/accessories/lg-34-curved-ultrawide.jpg",
    description: "Immersive 34-inch 21:9 WQHD curved IPS display with HDR10, sRGB 99% color fidelity, and USB Type-C single-cable connectivity.",
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
    image: "/products/accessories/microsoft-sculpt-ergo.jpg",
    description: "Advanced ergonomic desktop bundle with split domed keyboard, cushioned wrist rest, separate numeric keypad, and ergonomic mouse.",
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
    image: "/products/accessories/wd-black-sn850x.jpg",
    description: "Top-tier PCIe Gen4 NVMe M.2 internal SSD delivering blazing read speeds up to 7300 MB/s for heavy computing and instant loading.",
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
    image: "/products/accessories/ergotron-lx-monitor-arm.jpg",
    description: "Durable polished aluminum articulating monitor arm with patented Constant Force technology for effortless screen positioning.",
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
    image: "/products/accessories/kensington-nanosaver-lock.jpg",
    description: "Tough carbon steel keyed laptop security cable lock designed specifically for modern ultra-thin laptops with nano security slots.",
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
        <div className="flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 pb-2 sm:pb-0 scrollbar-hide w-full">
          {['Keyboard', 'Mouse', 'Monitor', 'Docking Station', 'USB Hub', 'Webcam', 'Headsets', 'Conference Devices', 'Speakers', 'Power Backup', 'External Storage', 'Cables'].map((cat, i) => (
            <button key={i} className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap shrink-0">
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-10 sm:py-14 page-container">
        <SectionHeader title="Featured Accessories" subtitle="Hand-picked tools to maximize your daily productivity." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-6">
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
      <section className="py-12 sm:py-16 bg-white/5 page-container">
        <SectionHeader title="Workspace Collections" align="center" subtitle="Curated setups for every type of professional." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          {['Work From Home Kit', 'Developer Desk', 'Executive Office', 'Gaming Setup', 'Conference Room', 'Student Essentials'].map((collection, i) => (
            <div key={i} className="glass-panel p-6 sm:p-8 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 relative z-10">{collection}</h3>
              <p className="text-blue-400 font-medium text-sm sm:text-base relative z-10">View Bundle →</p>
            </div>
          ))}
        </div>
      </section>

      {/* Buying Guide Carousel */}
      <section className="py-12 sm:py-16 page-container border-t border-white/10">
        <SectionHeader title="Accessory Buying Guides" />
        
        <div className="relative mt-6">
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-white/10 hover:scale-110 transition-all shadow-lg"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 sm:gap-6 scrollbar-hide relative z-0 px-2 md:px-0 h-fit items-start pb-2"
          >
            {buyingGuides.map((guide, i) => (
            <div 
              key={i} 
              className="min-w-[280px] sm:min-w-[320px] h-[210px] sm:h-[230px] rounded-[22px] overflow-hidden relative border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-6 sm:p-7 shrink-0 flex flex-col justify-end hover:shadow-2xl hover:border-blue-500/40 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
            >
              {/* Background Photo */}
              <img
                src={guide.image}
                alt={guide.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Light Vignette / Bottom Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

              {/* Text Scenario: Heading & Description */}
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,1)] [text-shadow:_0_2px_12px_rgba(0,0,0,0.95)] group-hover:text-blue-200 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] [text-shadow:_0_1px_8px_rgba(0,0,0,0.9)]">
                  {guide.desc}
                </p>
              </div>
            </div>
          ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-white/10 hover:scale-110 transition-all shadow-lg"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </section>

      {/* Special Bundle */}
      <section className="py-12 sm:py-16 page-container">
        <div className="bg-white p-8 sm:p-12 lg:p-14 rounded-[22px] border border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] relative overflow-hidden">
          {/* Subtle accent gradient inside the white card */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-100 to-transparent rounded-full opacity-60 blur-3xl -z-0 translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Column: Text & Features */}
            <div className="lg:col-span-7">
              <span className="px-3.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 inline-block">Special Bundle</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-black">Professional Workstation Bundle</h2>
              <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">Equip your team with a complete, fully compatible workstation setup featuring top-tier components. Perfect for new hires and office upgrades.</p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 mb-7 text-gray-700 text-sm sm:text-base font-medium">
                <li className="flex items-center gap-3"><span className="text-blue-600 font-bold">✓</span> 27" 4K Monitor</li>
                <li className="flex items-center gap-3"><span className="text-blue-600 font-bold">✓</span> Mechanical Keyboard</li>
                <li className="flex items-center gap-3"><span className="text-blue-600 font-bold">✓</span> Ergonomic Mouse</li>
                <li className="flex items-center gap-3"><span className="text-blue-600 font-bold">✓</span> Universal USB-C Dock</li>
                <li className="flex items-center gap-3"><span className="text-blue-600 font-bold">✓</span> Wireless Headset</li>
                <li className="flex items-center gap-3"><span className="text-blue-600 font-bold">✓</span> Adjustable Laptop Stand</li>
              </ul>

              <a
                href="https://wa.me/919643990077?text=Hi%2C%20I%20want%20to%20request%20corporate%20pricing%20for%20the%20Professional%20Workstation%20Bundle%20from%20Authentic%20Infosystem."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 sm:px-8 py-3.5 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-blue-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Request Corporate Pricing
              </a>
            </div>

            {/* Right Column: Bundle Photo */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="rounded-[20px] overflow-hidden shadow-2xl border border-black/5 w-full max-w-md group bg-gray-100">
                <img
                  src="/Accessories/Professional%20Workstation%20Bundle.jpeg"
                  alt="Professional Workstation Bundle"
                  className="w-full h-auto aspect-[500/333] object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
