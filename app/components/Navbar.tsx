"use client";

import { useState, useEffect } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/laptops", label: "Laptops" },
  { href: "/desktops", label: "Desktops" },
  { href: "/networking", label: "Networking" },
  { href: "/accessories", label: "Accessories" },
  { href: "/enterprise", label: "Enterprise" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Close menus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
      setMobileMenuOpen(false);
      return;
    }

    setToastMessage("We are continually expanding our catalog. This product or category will be available soon.");
    setTimeout(() => setToastMessage(""), 4000);
  };

  return (
    <>
      <nav className="main-navbar">
        {/* GLASS OVERLAY */}
        <div className="navbar-overlay"></div>

        {/* LOGO */}
        <a href="/" className="nav-logo flex items-center">
          <img src="/Navbar%20Logo-Photoroom.png" alt="Authentic Infosystem" className="h-10 md:h-12 w-auto object-contain" />
        </a>

        {/* DESKTOP NAV LINKS */}
        <div className="nav-links flex gap-2">
          {navLinks.map((item) => (
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

        {/* SEARCH & MOBILE TOGGLE */}
        <div className="relative flex items-center gap-1 ml-2">
          <button
            type="button"
            aria-label="Search"
            className="relative text-gray-800 hover:text-blue-600 transition-colors p-2 z-20"
            onClick={() => setSearchOpen((prev) => !prev)}
          >
            <FaSearch size={18} />
          </button>

          {/* HAMBURGER TOGGLE (Mobile & Tablet) */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden text-gray-800 hover:text-blue-600 p-2 transition-colors z-20 flex items-center justify-center"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          {/* DESKTOP/MOBILE SEARCH DROPDOWN */}
          {searchOpen && (
            <div className="absolute right-0 top-full mt-4 w-72 max-w-[calc(100vw-36px)] bg-[#0a0f1c] border border-gray-800 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] p-2 flex gap-2 z-50 backdrop-blur-xl">
              <input
                type="text"
                className="flex-1 bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 px-3 py-2 rounded-lg text-sm transition-all"
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
                className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
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

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-0 z-[9990] bg-[#050811]/98 backdrop-blur-2xl pt-28 px-6 pb-8 flex flex-col justify-between overflow-y-auto animate-fadeIn lg:hidden">
          {/* TOP SEARCH BAR */}
          <div className="mb-6">
            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
              <FaSearch className="text-gray-400 mr-3" size={16} />
              <input
                type="text"
                placeholder="Search catalog, solutions, products..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigateToSection(searchValue);
                  }
                }}
                className="w-full bg-transparent text-white text-base focus:outline-none placeholder-gray-400"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={() => navigateToSection(searchValue)}
                  className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg font-semibold ml-2 shrink-0"
                >
                  Search
                </button>
              )}
            </div>
          </div>

          {/* NAVIGATION LINKS */}
          <div className="flex flex-col space-y-2 mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-gray-400 px-3 mb-1">
              Products & Sourcing
            </span>
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-lg font-medium transition-all ${
                  pathname === item.href
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    : "text-gray-200 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}

            <div className="h-px bg-white/10 my-3"></div>

            <span className="text-xs uppercase font-bold tracking-widest text-gray-400 px-3 mb-1">
              Explore
            </span>

            <Link
              href="/#configuration"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3.5 rounded-xl text-lg font-medium text-gray-200 hover:bg-white/5 hover:text-white"
            >
              <span>Start Your Build</span>
              <span className="text-xs bg-blue-600/30 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">Custom PC</span>
            </Link>

            <Link
              href="/#solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3.5 rounded-xl text-lg font-medium text-gray-200 hover:bg-white/5 hover:text-white"
            >
              <span>Solutions</span>
              <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3.5 rounded-xl text-lg font-medium text-gray-200 hover:bg-white/5 hover:text-white"
            >
              <span>About Authentic</span>
              <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3.5 rounded-xl text-lg font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20"
            >
              <span>Contact Us</span>
              <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* BOTTOM QUICK ACTION */}
          <div className="pt-4 border-t border-white/10">
            <a
              href="https://wa.me/919643990077?text=Hi%2C%20I%20have%20an%20enterprise%20inquiry%20regarding%20Authentic%20Infosystem."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all text-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
              <span>Instant WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
