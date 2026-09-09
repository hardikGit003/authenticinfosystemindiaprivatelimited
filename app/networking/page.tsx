"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/shared/PageHero";
import SectionHeader from "../components/shared/SectionHeader";
import ProductCard from "../components/shared/ProductCard";
const surveillanceItems = [
  { title: "IP Cameras", image: "/Newtworking/IP%20Cameras.jpg" },
  { title: "PTZ Cameras", image: "/Newtworking/PTZ%20Cameras.jpg" },
  { title: "Bullet Cameras", image: "/Newtworking/Bullet%20Cameras.jpg" },
  { title: "Dome Cameras", image: "/Newtworking/Dome%20Cameras.jpg" },
  { title: "NVR", image: "/Newtworking/NVR%20Cameras.jpg" },
  { title: "DVR", image: "/Newtworking/DVR%20Camera.jpg" },
  { title: "Video Analytics", image: "/Newtworking/Video%20Analytics.jpg" },
  { title: "AI Surveillance", image: "/Newtworking/AI%20Survillance%20Camera.jpg" },
];

const networkingProducts = [
  {
    id: "n1",
    name: "Cisco Catalyst 9300",
    modelNumber: "C9300-48P-A",
    image: "/products/networking/cisco-catalyst-9300.jpg",
    description: "Enterprise-grade 48-port Gigabit PoE+ stackable switch with advanced security, Layer 3 routing, and 480 Gbps StackWise capability.",
    specs: [
      { label: "Type", value: "Managed Switch" },
      { label: "Ports", value: "48x 1G PoE+" },
      { label: "Uplink", value: "4x 10G SFP+" },
      { label: "Stacking", value: "480 Gbps StackWise" },
    ],
    badges: ["Enterprise", "Core"],
    warranty: "Lifetime Limited",
  },
  {
    id: "n2",
    name: "Aruba 2930F",
    modelNumber: "JL254A",
    image: "/products/networking/aruba-2930f.jpg",
    description: "High-performance Layer 3 access switch featuring 24 PoE+ ports, built-in SFP uplinks, and seamless Aruba Central cloud management.",
    specs: [
      { label: "Type", value: "PoE+ Switch" },
      { label: "Ports", value: "24x 1G PoE+" },
      { label: "Uplink", value: "4x 1G SFP" },
      { label: "Management", value: "Aruba Central" },
    ],
    badges: ["Access Layer", "Managed"],
    warranty: "Limited Lifetime",
  },
  {
    id: "n3",
    name: "Ubiquiti UniFi U6 Enterprise",
    modelNumber: "U6-Enterprise",
    image: "/products/networking/ubiquiti-unifi-u6.jpg",
    description: "High-density Wi-Fi 6E ceiling-mount access point delivering up to 10.2 Gbps aggregate throughput across 2.4, 5, and 6 GHz bands.",
    specs: [
      { label: "Type", value: "Wi-Fi 6E AP" },
      { label: "Bands", value: "2.4/5/6 GHz" },
      { label: "Throughput", value: "10.2 Gbps Aggregate" },
      { label: "Clients", value: "600+ Concurrent" },
    ],
    badges: ["Wireless", "High Density"],
    warranty: "1 Year Standard",
  },
  {
    id: "n4",
    name: "Fortinet FortiGate 100F",
    modelNumber: "FG-100F",
    image: "/products/networking/fortinet-fortigate-100f.jpg",
    description: "Next-generation firewall and integrated SD-WAN appliance engineered for high-throughput enterprise threat protection and VPN security.",
    specs: [
      { label: "Type", value: "Next-Gen Firewall" },
      { label: "Firewall Pkt", value: "20 Gbps" },
      { label: "Threat Protection", value: "1 Gbps" },
      { label: "Interfaces", value: "Multiple 1G/10G" },
    ],
    badges: ["Security", "SD-WAN"],
    warranty: "Requires Support Contract",
  },
  {
    id: "n5",
    name: "Cisco ISR 4331",
    modelNumber: "ISR4331/K9",
    image: "/products/networking/cisco-isr-4331.jpg",
    description: "Modular enterprise branch router with multi-core architecture delivering converged routing, security, voice, and cloud acceleration.",
    specs: [
      { label: "Type", value: "Router" },
      { label: "Throughput", value: "100-300 Mbps" },
      { label: "WAN/LAN", value: "3x 1G RJ-45/SFP" },
      { label: "Modules", value: "2x NIM, 1x SM" },
    ],
    badges: ["Branch Office", "Routing"],
    warranty: "90 Days Warranty",
  },
  {
    id: "n6",
    name: "10G SFP+ Transceiver",
    modelNumber: "SFP-10G-SR",
    image: "/products/networking/sfp-10g-sr.jpg",
    description: "Hot-pluggable multi-mode optical transceiver module delivering ultra-low latency 10 Gbps fiber connectivity up to 300 meters.",
    specs: [
      { label: "Type", value: "Fiber Module" },
      { label: "Distance", value: "300m" },
      { label: "Wavelength", value: "850nm" },
      { label: "Cable Type", value: "MMF (OM3/OM4)" },
    ],
    badges: ["Accessories", "Fiber"],
    warranty: "5 Years Replacement",
  },
  {
    id: "n7",
    name: "42U Server Rack Cabinet",
    modelNumber: "RACK-42U-PRO",
    image: "/products/networking/rack-42u-pro.jpg",
    description: "Heavy-duty 42U datacenter equipment cabinet featuring lockable ventilated mesh doors, adjustable mounting rails, and roof exhaust fans.",
    specs: [
      { label: "Capacity", value: "42U" },
      { label: "Dimensions", value: "600x1000x2050mm" },
      { label: "Load Capacity", value: "1000 kg" },
      { label: "Cooling", value: "4x Roof Fans" },
    ],
    badges: ["Infrastructure", "Datacenter"],
    warranty: "5 Years Structural",
  },
  {
    id: "n8",
    name: "24-Port Cat6 Patch Panel",
    modelNumber: "PP-C6-24-1U",
    image: "/products/networking/patch-panel-cat6.jpg",
    description: "Standard 1U 19-inch rack-mount 24-port Cat6 RJ45 patch panel engineered for clean, high-density structured cable management.",
    specs: [
      { label: "Ports", value: "24x RJ45 Cat6" },
      { label: "Rack Units", value: "1U" },
      { label: "Termination", value: "110 Punch Down" },
      { label: "Standards", value: "TIA/EIA-568-B" },
    ],
    badges: ["Cabling", "Passive"],
    warranty: "25 Years System",
  },
];

export default function NetworkingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />

      <PageHero
        title="The Backbone of Modern Business."
        subtitle="Enterprise networking, Wi-Fi, surveillance, structured cabling, and security solutions designed for businesses of every size."
        miniText="NETWORKING & INFRASTRUCTURE"
        primaryButtonText="Explore Solutions"
        secondaryButtonText="Request Consultation"
      />

      {/* Solution Categories */}
      <section className="py-10 sm:py-14 page-container border-b border-white/5">
        <SectionHeader title="Comprehensive IT Infrastructure" align="center" />
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
          {['Enterprise Networking', 'Wireless Access Points', 'Managed Switches', 'Firewalls', 'Routers', 'Load Balancers', 'VPN', 'Structured Cabling', 'Fiber Solutions', 'Server Racks'].map((cat, i) => (
            <span key={i} className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-colors cursor-default text-xs sm:text-sm">
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Featured Hardware */}
      <section className="py-10 sm:py-14 page-container">
        <SectionHeader title="Featured Hardware" subtitle="Industry-leading equipment from trusted global partners." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
          {networkingProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              {...product}
              delay={index * 0.05}
            />
          ))}
        </div>
      </section>

      {/* CCTV Section */}
      <section className="py-12 sm:py-16 bg-white/5 page-container">
        <SectionHeader title="Smart Surveillance (CCTV)" subtitle="Protect your assets with advanced AI-powered video security." />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 mt-6">
          {surveillanceItems.map((cam, i) => (
            <a
              key={i}
              href={`https://wa.me/919643990077?text=${encodeURIComponent(`Hi, I am interested in ${cam.title} CCTV & smart surveillance solutions from Authentic Infosystem.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-[18px] overflow-hidden aspect-square flex items-center justify-center p-2.5 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] cursor-pointer group hover:shadow-[0_8px_30px_rgba(77,163,255,0.3)] hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300 block"
            >
              {/* Background Image */}
              <img
                src={cam.image}
                alt={cam.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
              />

              {/* Light Vignette / Overlay for Image Clarity & Text Contrast */}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

              {/* Centered Heading with White Text */}
              <span className="relative z-10 text-white font-semibold text-xs sm:text-xs md:text-sm text-center px-1 tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,1)] [text-shadow:_0_2px_10px_rgba(0,0,0,0.95)] group-hover:text-blue-100 group-hover:scale-105 transition-all duration-300">
                {cam.title}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Solution Process Timeline */}
      <section className="py-12 sm:py-16 page-container">
        <SectionHeader title="Our Deployment Process" align="center" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mt-8 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 z-0"></div>
          {['Site Survey', 'Requirement Analysis', 'Network Design', 'Installation & Testing', 'Maintenance & Support'].map((step, i) => (
            <div key={i} className="relative z-10 glass-card p-5 sm:p-6 text-center">
              <div className="w-12 h-12 mx-auto bg-blue-600 rounded-full flex items-center justify-center font-bold text-xl mb-4 border-4 border-black shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                {i + 1}
              </div>
              <h4 className="font-semibold text-sm sm:text-base">{step}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study */}
      <section className="py-12 sm:py-16 page-container border-t border-white/10">
        <div className="glass-panel p-8 sm:p-10 lg:p-14 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 bg-gradient-to-r from-blue-900/20 to-transparent">
          <div className="lg:w-1/2">
            <span className="text-blue-400 font-semibold tracking-wider uppercase text-xs sm:text-sm mb-3 block">Case Study</span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Network Deployment for a 300-User Corporate Office</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
              Authentic Infosystem successfully overhauled the legacy infrastructure for a leading tech firm, implementing a fully redundant Cisco-based core network with Wi-Fi 6 coverage across 3 floors.
            </p>
            <button className="px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-medium text-sm border border-white/20">Read Full Case Study</button>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-3 sm:gap-4 w-full">
            <div className="glass-card p-5 sm:p-6 border-l-4 border-l-green-500">
              <h4 className="text-2xl sm:text-3xl font-bold text-white mb-1">99.9%</h4>
              <p className="text-gray-400 text-xs sm:text-sm">Uptime Achieved</p>
            </div>
            <div className="glass-card p-5 sm:p-6 border-l-4 border-l-blue-500">
              <h4 className="text-2xl sm:text-3xl font-bold text-white mb-1">35%</h4>
              <p className="text-gray-400 text-xs sm:text-sm">Faster Speeds</p>
            </div>
            <div className="glass-card p-5 sm:p-6 border-l-4 border-l-purple-500">
              <h4 className="text-2xl sm:text-3xl font-bold text-white mb-1">24x7</h4>
              <p className="text-gray-400 text-xs sm:text-sm">Active Monitoring</p>
            </div>
            <div className="glass-card p-5 sm:p-6 border-l-4 border-l-orange-500">
              <h4 className="text-2xl sm:text-3xl font-bold text-white mb-1">Zero</h4>
              <p className="text-gray-400 text-xs sm:text-sm">Downtime Migration</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 text-center page-container">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Need a complete networking solution?</h2>
        <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl mx-auto">Let our certified network engineers design the perfect infrastructure for your business needs.</p>
        <button className="px-6 sm:px-8 py-3 sm:py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold text-sm transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
          Book Site Visit
        </button>
      </section>

      <Footer />
    </main>
  );
}
