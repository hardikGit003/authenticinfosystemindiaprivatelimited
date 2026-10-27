export interface NetworkingProduct {
  id: string;
  name: string;
  modelNumber: string;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
  badges: string[];
  warranty: string;
  price?: number;
  brand?: string;
}

export const surveillanceItems = [
  { title: "IP Cameras", image: "/Newtworking/ip-cameras.png" },
  { title: "PTZ Cameras", image: "/Newtworking/ptz-cameras.png" },
  { title: "Bullet Cameras", image: "/Newtworking/bullet-cameras.png" },
  { title: "Dome Cameras", image: "/Newtworking/dome-cameras.png" },
  { title: "NVR", image: "/Newtworking/nvr-cameras.png" },
  { title: "DVR", image: "/Newtworking/dvr-camera.png" },
  { title: "Video Analytics", image: "/Newtworking/video-analytics.png" },
  { title: "AI Surveillance", image: "/Newtworking/ai-surveillance-camera.png" },
];

export const networkingProducts: NetworkingProduct[] = [
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
    brand: "Cisco",
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
    brand: "Aruba",
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
    brand: "Ubiquiti",
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
    brand: "Fortinet",
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
    brand: "Cisco",
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
    brand: "Authentic Infosystem",
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
    brand: "Authentic Infosystem",
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
    brand: "Authentic Infosystem",
  },
];
