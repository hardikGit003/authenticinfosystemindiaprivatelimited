"use client";

import { useState, useEffect, useRef } from "react";
import { 
  FaSearch, 
  FaBars, 
  FaTimes, 
  FaHome,
  FaLaptop, 
  FaDesktop, 
  FaMobileAlt, 
  FaNetworkWired, 
  FaKeyboard, 
  FaBuilding, 
  FaTools,
  FaWhatsapp,
  FaPhoneAlt,
  FaArrowRight,
  FaChevronDown
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { searchAllCatalog, UnifiedProduct } from "../data/products";

const navLinks = [
  { href: "/", label: "Home", icon: FaHome },
  { href: "/laptops", label: "Laptops", icon: FaLaptop },
  { href: "/desktops", label: "Desktops", icon: FaDesktop },
  { href: "/phones", label: "Mobiles", icon: FaMobileAlt },
  { href: "/networking", label: "Networking", icon: FaNetworkWired },
  { href: "/accessories", label: "Accessories", icon: FaKeyboard },
  { href: "/enterprise", label: "Enterprise", icon: FaBuilding },
  { href: "/#contact", label: "Contact Us", icon: FaPhoneAlt },
];

const productItems = [
  { href: "/laptops", label: "Laptops & Workstations" },
  { href: "/desktops", label: "Desktops & All-in-Ones" },
  { href: "/phones", label: "Smartphones & Devices" },
  { href: "/accessories", label: "IT Accessories & Peripherals" },
];

const solutionItems = [
  { href: "/networking", label: "Networking & CCTV" },
  { href: "/enterprise", label: "Enterprise Infrastructure" },
  { href: "/configuration", label: "Custom PC Configurator" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  // Live search catalog results
  const searchResults: UnifiedProduct[] = searchValue.trim()
    ? searchAllCatalog(searchValue)
    : [];

  // Scroll listener for elevation change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global keyboard shortcut (Ctrl+K or /) to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsSearchFocused(true);
      } else if (e.key === "/" && document.activeElement !== inputRef.current && document.activeElement !== mobileInputRef.current && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsSearchFocused(true);
      } else if (e.key === "Escape") {
        setIsSearchFocused(false);
        setMobileSearchOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
    setIsSearchFocused(false);
  }, [pathname]);

  // Focus mobile input when mobile search opens
  useEffect(() => {
    if (mobileSearchOpen) {
      setTimeout(() => {
        mobileInputRef.current?.focus();
      }, 100);
    }
  }, [mobileSearchOpen]);

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
    const query = value.trim();
    if (!query) return;

    const results = searchAllCatalog(query);
    if (results.length > 0) {
      if (typeof window !== "undefined") {
        window.location.href = results[0].href;
      }
      setSearchValue("");
      setIsSearchFocused(false);
      setMobileMenuOpen(false);
      setMobileSearchOpen(false);
      return;
    }

    const qLower = query.toLowerCase();
    const routeMap = [
      { keys: ["laptop", "macbook", "thinkpad", "notebook"], path: "/laptops" },
      { keys: ["desktop", "pc", "computer", "all-in-one", "aio"], path: "/desktops" },
      { keys: ["phone", "smartphone", "mobile", "iphone", "apple", "samsung", "galaxy", "vivo", "oppo", "realme"], path: "/phones" },
      { keys: ["network", "router", "switch", "wifi", "access point", "cisco", "aruba"], path: "/networking" },
      { keys: ["accessori", "mouse", "keyboard", "monitor", "headphone", "cable", "dock"], path: "/accessories" },
      { keys: ["enterprise", "server", "storage", "rack", "poweredge"], path: "/enterprise" },
      { keys: ["gaming", "game", "esport", "rtx"], path: "/configuration?system=gaming" },
      { keys: ["basic", "everyday", "home"], path: "/configuration?system=basic" },
      { keys: ["office", "business", "accounting"], path: "/configuration?system=office" },
      { keys: ["development", "code", "programming"], path: "/configuration?system=development" },
      { keys: ["creator", "editing", "design", "cad"], path: "/configuration?system=creator" },
      { keys: ["workstation", "power"], path: "/configuration?system=workstation" },
      { keys: ["config", "custom", "build"], path: "/configuration" },
      { keys: ["about", "who"], path: "/#about" },
      { keys: ["solution", "service"], path: "/#solutions" },
      { keys: ["brand", "partner", "hp", "dell", "lenovo"], path: "/#brands" },
      { keys: ["why", "reason"], path: "/#why-us" },
      { keys: ["contact", "quote", "reach", "call", "whatsapp", "inquiry"], path: "/#contact" },
    ];

    const match = routeMap.find((item) =>
      item.keys.some((key) => qLower.includes(key)),
    );

    if (match) {
      if (typeof window !== "undefined") {
        window.location.href = match.path;
      }
      setSearchValue("");
      setIsSearchFocused(false);
      setMobileMenuOpen(false);
      setMobileSearchOpen(false);
      return;
    }

    setToastMessage(`"${query}" will be available soon. Contact us for custom enterprise sourcing.`);
    setTimeout(() => setToastMessage(""), 4500);
  };

  const isProductsActive = ["/laptops", "/desktops", "/phones", "/accessories"].includes(pathname) || pathname.startsWith("/laptops") || pathname.startsWith("/desktops") || pathname.startsWith("/phones") || pathname.startsWith("/accessories");
  const isSolutionsActive = ["/networking", "/enterprise", "/configuration"].includes(pathname) || pathname.startsWith("/configuration") || pathname.startsWith("/enterprise") || pathname.startsWith("/networking");

  return (
    <>
      <header className={`main-navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-full flex items-center justify-between gap-4">
          
          {/* LEFT: BRAND LOGO & WORDMARK */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="nav-logo flex items-center gap-2.5 py-1 group" aria-label="Authentic Infosystem Home">
              <img 
                src="/ai_icon.png" 
                alt="Authentic Infosystem" 
                width="36"
                height="36"
                loading="eager"
                decoding="async"
                className="h-[32px] sm:h-[36px] w-auto object-contain shrink-0 group-hover:scale-105 transition-transform" 
              />
              <span className="text-[12.5px] sm:text-[14px] lg:text-[15px] font-bold tracking-tight text-slate-950 leading-tight select-none">
                Authentic Infosystem India Private Limited
              </span>
            </Link>
          </div>

          {/* CENTER: STREAMLINED CORPORATE NAVIGATION (Requirement 3: Home | Products ▾ | Solutions ▾ | Contact Us) */}
          <nav className="hidden lg:flex items-center h-full gap-1 xl:gap-1.5 flex-1 justify-center px-4" aria-label="Main Navigation">
            {/* 1. HOME */}
            <Link
              href="/"
              className={`relative flex items-center h-full px-4 xl:px-4.5 text-[14.5px] xl:text-[15px] tracking-tight font-semibold transition-colors duration-150 group ${
                pathname === "/" ? "text-slate-950 font-bold" : "text-slate-700 hover:text-black"
              }`}
            >
              <span className="relative z-10 py-2">Home</span>
              <span className="absolute inset-x-1 inset-y-4 rounded-lg bg-slate-100/0 group-hover:bg-slate-100/80 transition-colors -z-0 pointer-events-none" />
              {pathname === "/" && (
                <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-slate-950 rounded-t-full shadow-xs" />
              )}
            </Link>

            {/* 2. PRODUCTS DROPDOWN */}
            <div className="nav-dropdown-wrapper">
              <button
                type="button"
                className={`nav-dropdown-trigger relative flex items-center gap-1.5 h-full px-4 xl:px-4.5 text-[14.5px] xl:text-[15px] tracking-tight font-semibold transition-colors duration-150 group ${
                  isProductsActive ? "text-slate-950 font-bold" : "text-slate-700 hover:text-black"
                }`}
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="relative z-10 py-2">Products</span>
                <FaChevronDown className="nav-dropdown-chevron" />
                <span className="absolute inset-x-1 inset-y-4 rounded-lg bg-slate-100/0 group-hover:bg-slate-100/80 transition-colors -z-0 pointer-events-none" />
                {isProductsActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-slate-950 rounded-t-full shadow-xs" />
                )}
              </button>

              <div className="nav-dropdown-menu">
                <div className="flex flex-col gap-0.5">
                  {productItems.map((item) => {
                    const isItemActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`nav-dropdown-item group ${isItemActive ? "bg-slate-100 font-bold" : ""}`}
                      >
                        <span className="text-[13.5px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. SOLUTIONS DROPDOWN */}
            <div className="nav-dropdown-wrapper">
              <button
                type="button"
                className={`nav-dropdown-trigger relative flex items-center gap-1.5 h-full px-4 xl:px-4.5 text-[14.5px] xl:text-[15px] tracking-tight font-semibold transition-colors duration-150 group ${
                  isSolutionsActive ? "text-slate-950 font-bold" : "text-slate-700 hover:text-black"
                }`}
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="relative z-10 py-2">Solutions</span>
                <FaChevronDown className="nav-dropdown-chevron" />
                <span className="absolute inset-x-1 inset-y-4 rounded-lg bg-slate-100/0 group-hover:bg-slate-100/80 transition-colors -z-0 pointer-events-none" />
                {isSolutionsActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-slate-950 rounded-t-full shadow-xs" />
                )}
              </button>

              <div className="nav-dropdown-menu">
                <div className="flex flex-col gap-0.5">
                  {solutionItems.map((item) => {
                    const isItemActive = pathname === item.href || (item.href === "/configuration" && pathname.startsWith("/configuration"));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`nav-dropdown-item group ${isItemActive ? "bg-slate-100 font-bold" : ""}`}
                      >
                        <span className="text-[13.5px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 4. CONTACT US */}
            <Link
              href="/#contact"
              className={`relative flex items-center h-full px-4 xl:px-4.5 text-[14.5px] xl:text-[15px] tracking-tight font-semibold transition-colors duration-150 group ${
                pathname === "/contact" ? "text-slate-950 font-bold" : "text-slate-700 hover:text-black"
              }`}
            >
              <span className="relative z-10 py-2">Contact Us</span>
              <span className="absolute inset-x-1 inset-y-4 rounded-lg bg-slate-100/0 group-hover:bg-slate-100/80 transition-colors -z-0 pointer-events-none" />
              {pathname === "/contact" && (
                <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-slate-950 rounded-t-full shadow-xs" />
              )}
            </Link>
          </nav>

          {/* RIGHT CONTROLS: SEARCH & TOGGLES */}
          <div className="flex items-center gap-2">
            {/* DESKTOP SEARCH INPUT */}
            <div className="relative hidden md:block">
              <div 
                className={`relative flex items-center h-[42px] transition-all duration-200 ease-out rounded-full border ${
                  isSearchFocused 
                    ? "w-64 lg:w-76 xl:w-84 bg-white border-slate-900 ring-2 ring-slate-100 shadow-sm" 
                    : "w-52 lg:w-60 xl:w-68 bg-slate-100/90 border-slate-200/90 hover:bg-slate-100 hover:border-slate-300"
                }`}
                onClick={() => {
                  inputRef.current?.focus();
                  setIsSearchFocused(true);
                }}
              >
                <FaSearch 
                  className={`ml-4 shrink-0 transition-colors duration-150 ${
                    isSearchFocused ? "text-slate-900" : "text-slate-400"
                  }`} 
                  size={14} 
                />
                
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full bg-transparent text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none pl-3 pr-2 font-normal"
                  placeholder="Search products, models..."
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    if (!isSearchFocused) setIsSearchFocused(true);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      navigateToSection(searchValue);
                    }
                  }}
                />

                {/* Clear / Submit Button */}
                {searchValue && (
                  <div className="flex items-center mr-1.5 gap-1">
                    <button
                      type="button"
                      aria-label="Clear search"
                      className="p-1 text-slate-400 hover:text-slate-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchValue("");
                      }}
                    >
                      <FaTimes size={11} />
                    </button>
                    <button
                      type="button"
                      aria-label="Submit search"
                      className="px-3 py-1 text-xs font-semibold bg-black hover:bg-zinc-800 text-white rounded-full transition-all shadow-2xs cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToSection(searchValue);
                      }}
                    >
                      Go
                    </button>
                  </div>
                )}
              </div>

              {/* LIVE FLOATING SEARCH DROPDOWN (DESKTOP) */}
              {isSearchFocused && searchValue.trim().length > 0 && (
                <div 
                  ref={searchDropdownRef}
                  className="absolute top-full right-0 mt-2 w-80 lg:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-[1000] animate-fadeIn"
                >
                  {searchResults.length > 0 ? (
                    <div className="p-2">
                      <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-100 mb-1">
                        <span>Matching Products ({searchResults.length})</span>
                        <span className="text-[10px] text-slate-500 font-semibold">Available</span>
                      </div>
                      <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                        {searchResults.slice(0, 5).map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            onClick={() => {
                              setIsSearchFocused(false);
                              setSearchValue("");
                            }}
                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
                          >
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-11 h-11 object-contain bg-slate-100/60 rounded-lg p-1 border border-slate-200/60 shrink-0" 
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-zinc-100 text-slate-900 border border-slate-200">
                                  {item.section}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono truncate">
                                  {item.modelNumber}
                                </span>
                              </div>
                              <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-black">
                                {item.name}
                              </h4>
                            </div>
                            <FaArrowRight size={10} className="text-slate-400 group-hover:text-black group-hover:translate-x-0.5 transition-all shrink-0" />
                          </Link>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => navigateToSection(searchValue)}
                        className="w-full mt-1.5 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold rounded-xl text-center transition-colors block cursor-pointer"
                      >
                        View all in {searchResults[0].section} →
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 text-center">
                      <div className="inline-block px-2.5 py-0.5 mb-2 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-wider">
                        ⚡ Will be available soon
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mb-1">
                        "{searchValue}" will be available soon
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                        We currently do not have this in immediate stock. Contact our enterprise team to source it directly on-demand.
                      </p>
                      <a
                        href={`https://wa.me/919643990077?text=Hi%2C%20I%20am%20looking%20for%20a%20quote%20for%20${encodeURIComponent(searchValue)}.%20Please%20let%20me%20know%20availability.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-xs cursor-pointer"
                      >
                        <FaWhatsapp size={13} />
                        <span>Inquire on WhatsApp</span>
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* MOBILE SEARCH TOGGLE (Phone < md) */}
            <button
              type="button"
              aria-label={mobileSearchOpen ? "Close search bar" : "Open search bar"}
              className={`md:hidden p-2.5 rounded-full transition-colors flex items-center justify-center ${
                mobileSearchOpen 
                  ? "bg-black text-white shadow-sm" 
                  : "text-slate-700 hover:text-black hover:bg-slate-100"
              }`}
              onClick={() => {
                setMobileSearchOpen((prev) => !prev);
                if (mobileMenuOpen) setMobileMenuOpen(false);
              }}
            >
              <FaSearch size={16} />
            </button>

            {/* MOBILE HAMBURGER TOGGLE (Mobile & Tablet < lg) */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden text-slate-700 hover:text-black p-2.5 transition-colors flex items-center justify-center rounded-full hover:bg-slate-100 active:scale-95"
              onClick={() => {
                setMobileMenuOpen((prev) => !prev);
                if (mobileSearchOpen) setMobileSearchOpen(false);
              }}
            >
              {mobileMenuOpen ? <FaTimes size={21} /> : <FaBars size={21} />}
            </button>
          </div>

        </div>

        {/* TOAST NOTIFICATION */}
        {toastMessage && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[10000] bg-slate-900 border border-slate-700 text-white px-5 py-2.5 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2.5 animate-fadeIn">
            <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-medium whitespace-nowrap">{toastMessage}</span>
          </div>
        )}
      </header>

      {/* MOBILE SEARCH DROPDOWN OVERLAY (Phone < md) */}
      {mobileSearchOpen && (
        <>
          <div 
            className="fixed inset-0 z-[9991] bg-slate-900/40 backdrop-blur-xs md:hidden animate-fadeIn"
            onClick={() => setMobileSearchOpen(false)}
          />
          
          <div className="fixed top-[64px] left-0 right-0 z-[9992] bg-white border-b border-slate-200 shadow-xl p-4 animate-fadeIn md:hidden max-h-[80vh] overflow-y-auto">
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:border-black focus-within:bg-white transition-all">
              <FaSearch className="text-slate-800 mr-2.5 shrink-0" size={14} />
              <input
                ref={mobileInputRef}
                type="text"
                placeholder="Search laptops, desktops, switches, mice..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigateToSection(searchValue);
                    setMobileSearchOpen(false);
                  }
                }}
                className="w-full bg-transparent text-slate-900 text-sm focus:outline-none placeholder-slate-400 font-normal"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={() => {
                    navigateToSection(searchValue);
                    setMobileSearchOpen(false);
                  }}
                  className="bg-black hover:bg-zinc-800 text-white text-xs px-3 py-1 rounded-lg font-semibold ml-2 shrink-0 shadow-xs cursor-pointer"
                >
                  Search
                </button>
              )}
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setMobileSearchOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 ml-1 transition-colors"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* LIVE RESULTS IN MOBILE SEARCH */}
            {searchValue.trim().length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-100">
                {searchResults.length > 0 ? (
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Matching Products ({searchResults.length})
                    </span>
                    <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                      {searchResults.slice(0, 4).map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => {
                            setMobileSearchOpen(false);
                            setSearchValue("");
                          }}
                          className="flex items-center gap-3 py-2.5 hover:bg-slate-50 transition-colors"
                        >
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-10 h-10 object-contain bg-slate-100/60 rounded-lg p-1 border border-slate-200/60 shrink-0" 
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-zinc-100 text-slate-900 border border-slate-200">
                                {item.section}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono truncate">
                                {item.modelNumber}
                              </span>
                            </div>
                            <h4 className="text-xs font-bold text-slate-900 truncate">
                              {item.name}
                            </h4>
                          </div>
                          <FaArrowRight size={10} className="text-slate-400 shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-slate-50 rounded-xl text-center">
                    <div className="inline-block px-2.5 py-0.5 mb-1.5 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-wider">
                      ⚡ Will be available soon
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 mb-1">
                      "{searchValue}" will be available soon
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-2.5">
                      Our procurement desk can source this item on-demand for enterprise orders.
                    </p>
                    <a
                      href={`https://wa.me/919643990077?text=Hi%2C%20I%20am%20looking%20for%20a%20quote%20for%20${encodeURIComponent(searchValue)}.%20Please%20let%20me%20know%20availability.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-xs"
                    >
                      <FaWhatsapp size={13} />
                      <span>Inquire on WhatsApp</span>
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* POPULAR CATEGORY CHIPS */}
            <div className="mt-3 pt-3 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Popular Categories
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "💻 Laptops", href: "/laptops" },
                  { label: "🖥️ Desktops", href: "/desktops" },
                  { label: "📱 Mobiles", href: "/phones" },
                  { label: "🌐 Networking", href: "/networking" },
                  { label: "🖱️ Accessories", href: "/accessories" },
                  { label: "🏢 Enterprise", href: "/enterprise" },
                  { label: "⚙️ Custom PC", href: "/configuration" },
                ].map((chip) => (
                  <Link
                    key={chip.href}
                    href={chip.href}
                    onClick={() => setMobileSearchOpen(false)}
                    className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-full border border-slate-200/80 transition-colors"
                  >
                    {chip.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* MOBILE NAVIGATION DRAWER (Mobile & Tablet < lg) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[64px] z-[9990] bg-white backdrop-blur-2xl px-6 py-6 flex flex-col justify-between overflow-y-auto animate-fadeIn lg:hidden border-t border-slate-200/80">
          
          {/* SEARCH BAR INSIDE DRAWER */}
          <div className="mb-5">
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:border-black focus-within:bg-white transition-all">
              <FaSearch className="text-slate-400 mr-2.5" size={14} />
              <input
                type="text"
                placeholder="Search catalog, products..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigateToSection(searchValue);
                  }
                }}
                className="w-full bg-transparent text-slate-900 text-sm focus:outline-none placeholder-slate-400"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={() => navigateToSection(searchValue)}
                  className="bg-black text-white text-xs px-3 py-1 rounded-lg font-semibold ml-2 shrink-0 shadow-xs"
                >
                  Search
                </button>
              )}
            </div>
          </div>

          {/* PRIMARY CATEGORY LINKS */}
          <div className="flex flex-col space-y-1 mb-6">
            <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 px-3 mb-1">
              Products & Solutions
            </span>
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href === "/#contact" && pathname === "/contact");
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? "bg-slate-100 text-slate-950 border border-slate-300 font-bold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-black"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={isActive ? "text-slate-900" : "text-slate-400"} size={16} />
                    <span>{item.label}</span>
                  </div>
                  <FaArrowRight className="w-3.5 h-3.5 opacity-40" />
                </Link>
              );
            })}

            <div className="h-px bg-slate-100 my-2"></div>

            <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 px-3 mb-1">
              Explore & Configure
            </span>

            <Link
              href="/configuration"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-black"
            >
              <div className="flex items-center gap-3">
                <FaTools className="text-slate-400" size={15} />
                <span>Custom PC Builder</span>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full border border-slate-300 font-semibold">
                Configure
              </span>
            </Link>

            <Link
              href="/#solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-black"
            >
              <span>Enterprise Solutions</span>
              <FaArrowRight className="w-3.5 h-3.5 opacity-40" />
            </Link>

            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-black"
            >
              <span>About Authentic</span>
              <FaArrowRight className="w-3.5 h-3.5 opacity-40" />
            </Link>
          </div>

          {/* BOTTOM QUICK ACTION */}
          <div className="pt-4 border-t border-slate-100">
            <a
              href="https://wa.me/919643990077?text=Hi%2C%20I%20have%20an%20enterprise%20inquiry%20regarding%20Authentic%20Infosystem."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-5 rounded-xl flex items-center justify-center gap-2.5 shadow-md shadow-emerald-600/20 transition-all text-sm"
            >
              <FaWhatsapp className="text-lg" />
              <span>Instant WhatsApp Sales Inquiry</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
