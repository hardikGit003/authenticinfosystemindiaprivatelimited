"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const navigateToSection = (value: string) => {
    const query = value.trim().toLowerCase();
    if (!query) return;

    // Advanced search routing mapping
    const routeMap = [
      { keys: ["laptop", "macbook", "thinkpad"], path: "/laptops" },
      { keys: ["desktop", "pc", "computer"], path: "/desktops" },
      { keys: ["network", "router", "switch", "wifi"], path: "/networking" },
      { keys: ["accessori", "mouse", "keyboard", "monitor", "headphone"], path: "/accessories" },
      { keys: ["enterprise", "server", "storage"], path: "/enterprise" },
      { keys: ["gaming", "game", "esport"], path: "/configuration?system=gaming" },
      { keys: ["basic", "everyday", "home"], path: "/configuration?system=basic" },
      { keys: ["office", "business", "accounting"], path: "/configuration?system=office" },
      { keys: ["development", "code", "programming"], path: "/configuration?system=development" },
      { keys: ["creator", "editing", "design"], path: "/configuration?system=creator" },
      { keys: ["workstation", "power", "cad"], path: "/configuration?system=workstation" },
      // Sections
      { keys: ["about", "who"], path: "/#about" },
      { keys: ["solution", "service"], path: "/#solutions" },
      { keys: ["brand", "partner"], path: "/#brands" },
      { keys: ["why", "reason"], path: "/#why-us" },
      { keys: ["contact", "quote", "reach"], path: "/#contact" },
    ];

    const match = routeMap.find((item) =>
      item.keys.some((key) => query.includes(key)),
    );

    if (match) {
      if (typeof window !== "undefined") {
        window.location.href = match.path;
      }
      return;
    }

    setToastMessage("We are continually expanding our catalog. This product or category will be available soon.");
    setTimeout(() => setToastMessage(""), 4000);
  };

  return (
    <nav className="main-navbar">
      {/* GLASS OVERLAY */}
      <div className="navbar-overlay"></div>

      {/* LOGO */}
      <a href="/" className="nav-logo flex items-center">
        <img src="/Navbar%20Logo-Photoroom.png" alt="Authentic Infosystem" className="h-12 w-auto object-contain" />
      </a>

      {/* NAV LINKS */}
      <div className="nav-links flex gap-2">
        {[
          { href: "/laptops", label: "Laptops" },
          { href: "/desktops", label: "Desktops" },
          { href: "/networking", label: "Networking" },
          { href: "/accessories", label: "Accessories" },
          { href: "/enterprise", label: "Enterprise" },
        ].map((item) => (
          <Link 
            key={item.href} 
            href={item.href} 
            className="group relative px-4 py-2 rounded-full transition-all duration-300 hover:text-blue-100"
          >
            {/* Glowing Aura Background */}
            <span className="absolute inset-0 bg-blue-500/20 blur-[8px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute inset-0 bg-blue-400/20 shadow-[0_0_15px_rgba(77,163,255,0.8)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            
            {/* Text */}
            <span className="relative z-10 font-medium">{item.label}</span>
          </Link>
        ))}
        <a 
          href="/#contact" 
          className="group relative px-4 py-2 rounded-full transition-all duration-300 hover:text-blue-100"
        >
          {/* Glowing Aura Background */}
          <span className="absolute inset-0 bg-blue-500/20 blur-[8px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="absolute inset-0 bg-blue-400/20 shadow-[0_0_15px_rgba(77,163,255,0.8)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          
          {/* Text */}
          <span className="relative z-10 font-medium">Contact</span>
        </a>
      </div>

      {/* SEARCH ICON */}
      <div className="relative flex items-center ml-2">
        <button
          type="button"
          className="relative text-gray-600 hover:text-blue-600 transition-colors p-2 z-20"
          onClick={() => setSearchOpen((prev) => !prev)}
        >
          <FaSearch size={18} />
        </button>

        {searchOpen && (
          <div className="absolute right-0 top-full mt-4 w-72 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100 p-2 flex gap-2 z-50">
            <input
              type="text"
              className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-4 py-2 rounded-lg text-sm transition-all"
              placeholder="Search products..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  navigateToSection(searchValue);
                }
              }}
            />
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
              onClick={() => navigateToSection(searchValue)}
            >
              Go
            </button>
          </div>
        )}
      </div>
      {/* TOAST MESSAGE */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-gray-900 border border-gray-700 text-white px-6 py-3 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-3">
          <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium whitespace-nowrap">{toastMessage}</span>
        </div>
      )}
    </nav>
  );
}
