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
      className="w-full bg-black py-16 sm:py-20 lg:py-28 relative border-t border-white/10 overflow-hidden"
    >
      {/* Background Ambience Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* MAIN SECTION HEADER */}
        <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
          <p className="text-xs sm:text-sm md:text-base uppercase tracking-[4px] sm:tracking-[6px] font-bold text-zinc-400 mb-3 sm:mb-4">
            CUSTOM WORKSTATIONS
          </p>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight leading-[1.1]">
            Start Your Build.
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-normal leading-relaxed">
            Select the perfect computing category matching your exact workflow. We guide you to dependable daily setups, high-performance creator rigs, AI workstations, and enterprise deployments.
          </p>
        </div>

        {/* 4 MODERN LENOVO-STYLE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-7 items-stretch">
          {buildCategories.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg sm:rounded-xl border border-zinc-800/80 hover:border-zinc-600 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              {/* TOP IMAGE AREA */}
              <div className="relative w-full aspect-[2.2/1] sm:aspect-[2/1] bg-black overflow-hidden">
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
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between bg-white">
                <div>
                  {/* Category Title */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 mb-3 tracking-tight leading-snug group-hover:text-black transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* LENOVO STYLE ACTION BUTTON */}
                <div className="mt-auto pt-2">
                  <Link
                    href={item.link}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border-2 border-slate-900 bg-transparent text-slate-950 hover:bg-slate-950 hover:text-white font-bold text-sm transition-all duration-200 shadow-xs group/btn text-center"
                  >
                    <span>{item.buttonText}</span>
                    <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform duration-200" />
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
