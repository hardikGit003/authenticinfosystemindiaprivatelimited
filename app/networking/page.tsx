"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/shared/PageHero";
import SectionHeader from "../components/shared/SectionHeader";
import ProductCard from "../components/shared/ProductCard";

const networkingProducts = [
  {
    id: "n1",
    name: "Cisco Catalyst 9300",
    modelNumber: "C9300-48P-A",
    image: "/placeholder-network.png",
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
    image: "/placeholder-network.png",
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
    image: "/placeholder-network.png",
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
    image: "/placeholder-network.png",
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
    image: "/placeholder-network.png",
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
    image: "/placeholder-network.png",
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
    image: "/placeholder-network.png",
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
    image: "/placeholder-network.png",
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
      <section className="py-20 page-container border-b border-white/5">
        <SectionHeader title="Comprehensive IT Infrastructure" align="center" />
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {['Enterprise Networking', 'Wireless Access Points', 'Managed Switches', 'Firewalls', 'Routers', 'Load Balancers', 'VPN', 'Structured Cabling', 'Fiber Solutions', 'Server Racks'].map((cat, i) => (
            <span key={i} className="px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-colors cursor-default">
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 page-container">
        <SectionHeader title="Featured Hardware" subtitle="Industry-leading equipment from trusted global partners." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
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
      <section className="py-24 bg-white/5 page-container">
        <SectionHeader title="Smart Surveillance (CCTV)" subtitle="Protect your assets with advanced AI-powered video security." />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mt-12">
          {['IP Cameras', 'PTZ Cameras', 'Bullet Cameras', 'Dome Cameras', 'NVR', 'DVR', 'Video Analytics', 'AI Surveillance'].map((cam, i) => (
            <div key={i} className="glass-panel p-4 text-center aspect-square flex flex-col justify-center items-center hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-10 h-10 mb-3 bg-blue-500/20 rounded-full flex items-center justify-center">📷</div>
              <span className="text-xs font-semibold leading-tight">{cam}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Solution Process Timeline */}
      <section className="py-24 page-container">
        <SectionHeader title="Our Deployment Process" align="center" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-16 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 z-0"></div>
          {['Site Survey', 'Requirement Analysis', 'Network Design', 'Installation & Testing', 'Maintenance & Support'].map((step, i) => (
            <div key={i} className="relative z-10 glass-card p-6 text-center">
              <div className="w-12 h-12 mx-auto bg-blue-600 rounded-full flex items-center justify-center font-bold text-xl mb-4 border-4 border-black shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                {i + 1}
              </div>
              <h4 className="font-semibold">{step}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study */}
      <section className="py-24 page-container border-t border-white/10">
        <div className="glass-panel p-10 lg:p-16 flex flex-col lg:flex-row items-center gap-12 bg-gradient-to-r from-blue-900/20 to-transparent">
          <div className="lg:w-1/2">
            <span className="text-blue-400 font-semibold tracking-wider uppercase text-sm mb-4 block">Case Study</span>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Network Deployment for a 300-User Corporate Office</h3>
            <p className="text-gray-300 leading-relaxed mb-8">
              Authentic Infosystem successfully overhauled the legacy infrastructure for a leading tech firm, implementing a fully redundant Cisco-based core network with Wi-Fi 6 coverage across 3 floors.
            </p>
            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-medium border border-white/20">Read Full Case Study</button>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
            <div className="glass-card p-6 border-l-4 border-l-green-500">
              <h4 className="text-3xl font-bold text-white mb-2">99.9%</h4>
              <p className="text-gray-400 text-sm">Uptime Achieved</p>
            </div>
            <div className="glass-card p-6 border-l-4 border-l-blue-500">
              <h4 className="text-3xl font-bold text-white mb-2">35%</h4>
              <p className="text-gray-400 text-sm">Faster Network Speeds</p>
            </div>
            <div className="glass-card p-6 border-l-4 border-l-purple-500">
              <h4 className="text-3xl font-bold text-white mb-2">24x7</h4>
              <p className="text-gray-400 text-sm">Active Monitoring</p>
            </div>
            <div className="glass-card p-6 border-l-4 border-l-orange-500">
              <h4 className="text-3xl font-bold text-white mb-2">Zero</h4>
              <p className="text-gray-400 text-sm">Downtime Migration</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center page-container">
        <h2 className="text-4xl font-bold mb-6">Need a complete networking solution?</h2>
        <p className="text-gray-400 mb-10 max-w-2xl mx-auto">Let our certified network engineers design the perfect infrastructure for your business needs.</p>
        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-all">
          Book Site Visit
        </button>
      </section>

      <Footer />
    </main>
  );
}
