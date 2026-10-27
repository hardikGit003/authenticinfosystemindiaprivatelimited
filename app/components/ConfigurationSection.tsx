"use client";

import Link from "next/link";
import { FaArrowRight, FaCheckCircle, FaLaptopCode, FaBolt, FaMicrochip, FaBuilding } from "react-icons/fa";

interface BuildCategory {
  id: string;
  tierNumber: string;
  title: string;
  description: string;
  bestFor: string;
  keywords: string[];
  buttonText: string;
  link: string;
  image: string;
  icon: React.ReactNode;
  accentGradient: string;
  tagline: string;
}

const buildCategories: BuildCategory[] = [
  {
    id: "everyday-productivity",
    tierNumber: "01",
    title: "For Everyday Productivity",
    tagline: "Smooth & Dependable Daily Performance",
    description:
      "Reliable desktop and PC systems for office work, students, home users, accounting, browsing, documentation, and everyday business tasks. Choose practical configurations designed for smooth and dependable daily performance.",
    bestFor: "Office Work • Students • Accounting • Home Users • Documentation",
    keywords: [
      "Office Desktop PC",
      "Basic Computer System",
      "Office PC",
      "Desktop Computer India",
      "Business Desktop",
      "Affordable PC",
    ],
    buttonText: "Explore Systems",
    link: "/configuration?system=basic",
    image: "/Start%20Your%20Build/For%20Everyday%20Productivity.jpg",
    icon: <FaLaptopCode className="text-amber-400" />,
    accentGradient: "from-amber-500/20 via-orange-500/10 to-transparent",
  },
  {
    id: "performance-workflows",
    tierNumber: "02",
    title: "For Performance-Driven Workflows",
    tagline: "High-Performance CPU & GPU Power",
    description:
      "High-performance PC systems built for gaming, software development, video editing, graphic design, 3D applications, streaming, and other demanding workloads requiring powerful CPU and GPU performance.",
    bestFor: "Gaming • Video Editing • Programming • 3D Design • Streaming • Development",
    keywords: [
      "Gaming PC India",
      "Video Editing PC",
      "Developer PC",
      "Creator PC",
      "Custom Gaming PC",
      "High Performance Desktop",
    ],
    buttonText: "Explore Systems",
    link: "/configuration?system=gaming",
    image: "/Start%20Your%20Build/For%20Performance-Driven%20Workflows.jpg",
    icon: <FaBolt className="text-cyan-400" />,
    accentGradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
  },
  {
    id: "professional-computing",
    tierNumber: "03",
    title: "For Professional & High-Performance Computing",
    tagline: "Engineered For AI, CAD & Simulation",
    description:
      "Professional workstation-class systems engineered for demanding applications such as AI & Machine Learning, CAD, engineering, 3D rendering, simulation, data science, and research.",
    bestFor: "AI & ML • CAD • Engineering • 3D Rendering • Data Science • Research",
    keywords: [
      "AI Workstation India",
      "Engineering Workstation",
      "CAD Workstation",
      "Professional Workstation PC",
      "Machine Learning PC",
      "High Performance Workstation",
    ],
    buttonText: "Build Your Machine",
    link: "/configuration?system=workstation",
    image: "/Start%20Your%20Build/For%20Professional%20%26%20High-Performance%20Computing.jpg",
    icon: <FaMicrochip className="text-purple-400" />,
    accentGradient: "from-purple-500/20 via-fuchsia-500/10 to-transparent",
  },
  {
    id: "modern-businesses",
    tierNumber: "04",
    title: "Built for Modern Businesses",
    tagline: "Scalable Corporate IT & Enterprise Hardware",
    description:
      "Business-ready laptops, desktops, and computing systems designed for companies, institutions, startups, and enterprise deployments. Get standardized configurations, reliable hardware, professional support, and scalable IT procurement.",
    bestFor: "Corporate • Government • Institutions • Startups • Offices • Bulk Procurement",
    keywords: [
      "Business Desktop India",
      "Corporate IT Hardware",
      "Enterprise Computers",
      "Business PC",
      "Bulk Computer Purchase",
      "Corporate IT Solutions",
    ],
    buttonText: "Explore Business Systems",
    link: "/configuration?system=enterprise",
    image: "/Start%20Your%20Build/Built%20for%20Modern%20Businesses.jpg",
    icon: <FaBuilding className="text-emerald-400" />,
    accentGradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
];

export default function ConfigurationSection() {
  return (
    <section
      id="configuration"
      className="configuration-section-custom bg-white py-8 sm:py-12"
    >
      <div className="w-full max-w-[1720px] mx-auto">
        {/* MAIN SECTION HEADER */}
        <div className="text-center mb-10 sm:mb-14 max-w-4xl mx-auto">
          <p className="text-xs sm:text-[13px] uppercase tracking-[4px] font-bold text-slate-900 mb-2 sm:mb-3 select-none">
            CUSTOM WORKSTATIONS
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold text-slate-900 mb-3 sm:mb-4 tracking-tight leading-[1.12]">
            Start Your Build.
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Select the perfect computing category matching your exact workflow. We guide you to dependable daily setups, high-performance creator rigs, AI workstations, and enterprise deployments.
          </p>
        </div>

        {/* 4 MODERN LENOVO-STYLE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-6 items-stretch">
          {buildCategories.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              {/* TOP IMAGE AREA */}
              <div className="relative w-full aspect-[2.2/1] sm:aspect-[2/1] bg-slate-100 overflow-hidden">
                {/* Accent Gradient Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${item.accentGradient} opacity-60 z-10 pointer-events-none`}
                />

                {/* Product Image */}
                <img
                  src={item.image}
                  alt={`${item.title} - Authentic Infosystem Custom Build`}
                  width="800"
                  height="360"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* CARD CONTENT */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between bg-white">
                <div>
                  {/* Category Title */}
                  <h3 className="text-[15px] sm:text-[16px] font-bold text-slate-900 mb-2 tracking-tight leading-snug group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed mb-3 font-normal line-clamp-3">
                    {item.description}
                  </p>

                  {/* Best for chip */}
                  <div className="text-[11px] text-slate-500 mb-4 bg-slate-50 py-1.5 px-2.5 rounded-lg border border-slate-100 font-medium truncate">
                    <span className="font-semibold text-slate-700">Best For: </span>
                    {item.bestFor}
                  </div>
                </div>

                {/* ACTION BUTTON */}
                <div className="mt-auto pt-2 border-t border-slate-100">
                  <Link
                    href={item.link}
                    prefetch={false}
                    className="w-full bg-[#0c2340] hover:bg-[#12335e] text-white py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold shadow-xs transition-colors cursor-pointer text-center group/btn"
                  >
                    <span>{item.buttonText}</span>
                    <FaArrowRight size={11} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
