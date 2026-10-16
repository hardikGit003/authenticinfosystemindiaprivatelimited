"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  FaSearch, 
  FaStar, 
  FaRegStar, 
  FaShareAlt, 
  FaMapMarkerAlt, 
  FaShoppingCart, 
  FaBars, 
  FaArrowLeft,
  FaExternalLinkAlt
} from "react-icons/fa";
import { amazonProducts, AMAZON_STORE_URL } from "../data/amazonProducts";

export default function AmazonStorefrontPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [payOnDelivery, setPayOnDelivery] = useState(false);
  const [includeOutOfStock, setIncludeOutOfStock] = useState(false);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  // Filter products based on search or sidebar clicks
  const filteredProducts = amazonProducts.filter((product) => {
    if (ratingFilter && product.rating < ratingFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.fullName.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      if (!matchName && !matchBrand) return false;
    }
    return true;
  });

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(AMAZON_STORE_URL);
      alert("Amazon Storefront link copied to clipboard!");
    } else {
      window.open(AMAZON_STORE_URL, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0f1111] font-sans antialiased selection:bg-[#f3a847]/30">
      
      {/* 0. RETURN TO AUTHENTIC SITE BAR */}
      <div className="bg-[#0b0e14] text-zinc-300 text-xs py-1.5 px-4 border-b border-zinc-800 flex items-center justify-between">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 font-semibold text-zinc-300 hover:text-white transition-colors"
        >
          <FaArrowLeft size={11} />
          <span>Return to Authentic Infosystem Official Website</span>
        </Link>
        <a 
          href={AMAZON_STORE_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1 font-bold text-[#febd69] hover:text-[#f3a847] hover:underline"
        >
          <span>Open Live Storefront on Amazon.in</span>
          <FaExternalLinkAlt size={10} />
        </a>
      </div>

      {/* 1. AMAZON MAIN HEADER (NAVY #131921) */}
      <header className="amz-header-nav">
        <div className="amz-nav-main-belt">
          
          {/* Left: Amazon Logo & Location */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Amazon Logo */}
            <a 
              href={AMAZON_STORE_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="amz-logo-badge"
              title="Amazon.in"
            >
              <div className="flex items-baseline">
                <span className="amz-logo-text">amazon</span>
                <span className="amz-logo-dot-in">.in</span>
              </div>
            </a>

            {/* Location Selector */}
            <div className="hidden md:flex items-center gap-1.5 px-2 py-1 border border-transparent hover:border-white rounded-xs cursor-pointer text-left">
              <FaMapMarkerAlt className="text-white text-sm mt-2 shrink-0" />
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] text-[#cccccc]">Delivering to Gurugram 122004</span>
                <span className="text-[13px] font-bold text-white">Update location</span>
              </div>
            </div>
          </div>

          {/* Center: Amazon Storefront Search Bar */}
          <div className="amz-search-bar">
            {/* Left Select dropdown showing the Seller name */}
            <div className="amz-search-seller-tag">
              <span>AUTHENTIC INFOSYSTEM INDIA PRIVATE LIMITED</span>
              <span className="ml-1.5 text-[9px] text-zinc-500">▼</span>
            </div>

            {/* Input field */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Amazon.in"
              className="amz-search-input-field"
            />

            {/* Orange Magnifying Search Button */}
            <button
              type="button"
              onClick={() => {
                if (searchQuery.trim()) {
                  window.open(`https://www.amazon.in/s?k=${encodeURIComponent(searchQuery)}&me=A26NUGXR8IFFOO&marketplaceID=A21TJRUUN4KGV`, "_blank");
                } else {
                  window.open(AMAZON_STORE_URL, "_blank");
                }
              }}
              className="amz-search-btn"
              title="Search"
            >
              <FaSearch size={16} />
            </button>
          </div>

          {/* Right Header Navigation Icons */}
          <div className="flex items-center gap-1 sm:gap-3 order-2 lg:order-3 shrink-0 text-white text-xs">
            {/* Language */}
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white rounded-xs cursor-pointer font-bold">
              <span className="text-sm">🇮🇳</span>
              <span>EN</span>
              <span className="text-[8px] text-zinc-400">▼</span>
            </div>

            {/* Account & Lists */}
            <a 
              href={AMAZON_STORE_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col px-2 py-1 border border-transparent hover:border-white rounded-xs cursor-pointer leading-tight text-left"
            >
              <span className="text-[11px] text-[#cccccc]">Hello, sign in</span>
              <span className="text-[13px] font-bold text-white flex items-center gap-0.5">
                Account & Lists <span className="text-[8px] text-zinc-400 ml-0.5">▼</span>
              </span>
            </a>

            {/* Returns & Orders */}
            <a 
              href={AMAZON_STORE_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex flex-col px-2 py-1 border border-transparent hover:border-white rounded-xs cursor-pointer leading-tight text-left"
            >
              <span className="text-[11px] text-[#cccccc]">Returns</span>
              <span className="text-[13px] font-bold text-white">& Orders</span>
            </a>

            {/* Cart Icon */}
            <a 
              href={AMAZON_STORE_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-end px-2 py-1 border border-transparent hover:border-white rounded-xs cursor-pointer relative"
            >
              <div className="relative flex items-center">
                <FaShoppingCart size={24} className="text-white" />
                <span className="absolute -top-1.5 left-2.5 bg-[#f08804] text-[#131921] text-[12px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </div>
              <span className="text-[13px] font-bold text-white ml-1 hidden sm:inline">Cart</span>
            </a>
          </div>

        </div>

        {/* 2. SECONDARY SUBNAV BAR (#232f3e) */}
        <div className="amz-subnav-belt">
          <div className="amz-subnav-inner">
            <button 
              type="button" 
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
                setRatingFilter(null);
              }}
              className="amz-subnav-link flex items-center gap-1.5 font-bold"
            >
              <FaBars size={12} />
              <span>All</span>
            </button>
            <span className="amz-subnav-link cursor-pointer">Prime Video</span>
            <span className="amz-subnav-link cursor-pointer">Sell</span>
            <span className="amz-subnav-link cursor-pointer">Bestsellers</span>
            <span className="amz-subnav-link cursor-pointer">Today's Deals</span>
            <span className="amz-subnav-link cursor-pointer">Mobiles</span>
            <span className="amz-subnav-link cursor-pointer">New Releases</span>
            <span className="amz-subnav-link cursor-pointer">Customer Service</span>
            <span className="amz-subnav-link cursor-pointer">Prime ▼</span>
            <span className="amz-subnav-link cursor-pointer">Electronics</span>
            <span className="amz-subnav-link cursor-pointer">Amazon Pay</span>
            <span className="amz-subnav-link cursor-pointer">Home & Kitchen</span>
            <span className="amz-subnav-link cursor-pointer">Fashion</span>
            <span className="amz-subnav-link cursor-pointer">Car & Motorbike</span>
            <span className="amz-subnav-link cursor-pointer">Computers</span>
          </div>
        </div>
      </header>

      {/* 3. STOREFRONT TITLE & SHARE HEADER */}
      <div className="border-b border-[#e7e7e7] bg-white">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0f1111]">
              AUTHENTIC INFOSYSTEM INDIA PRIVATE LIMITED
            </h1>
            <div className="flex items-center gap-1.5 mt-1 text-[#565959] text-[13px]">
              <div className="flex text-[#de7921]">
                <FaRegStar size={14} />
                <FaRegStar size={14} />
                <FaRegStar size={14} />
                <FaRegStar size={14} />
                <FaRegStar size={14} />
              </div>
              <span>0% positive lifetime (0 ratings)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[13px] text-[#565959] hidden sm:inline">
              Share this storefront with friends
            </span>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-[#f7fafa] active:bg-[#edecec] border border-[#d5d9d9] shadow-xs text-[#0f1111] text-[12px] font-medium px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <span>Share</span>
              <FaShareAlt size={12} className="text-[#565959]" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. MAIN BODY (LEFT SIDEBAR FILTERS + RIGHT PRODUCTS GRID) */}
      <div className="amz-store-body">
        
        {/* LEFT SIDEBAR: FILTERS */}
        <aside className="amz-sidebar-nav">
          <div>
            <h3 className="amz-filter-heading">Category</h3>
            <ul className="amz-filter-list">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("Computers & Accessories");
                    setSearchQuery("");
                  }}
                  className="amz-filter-item-btn"
                >
                  &lt; Computers & Accessories
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("Electronics");
                    setSearchQuery("");
                  }}
                  className="amz-filter-item-btn"
                >
                  &lt; Electronics
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("Fashion");
                  }}
                  className="amz-filter-item-btn"
                >
                  &lt; Fashion
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("Video Games");
                  }}
                  className="amz-filter-item-btn"
                >
                  &lt; Video Games
                </button>
              </li>
            </ul>
          </div>

          <div className="border-t border-[#e7e7e7] pt-3">
            <h3 className="amz-filter-heading">Customer Review</h3>
            <button
              type="button"
              onClick={() => setRatingFilter(ratingFilter === 4 ? null : 4)}
              className={`amz-filter-item-btn ${ratingFilter === 4 ? "active" : ""}`}
            >
              <div className="flex text-[#de7921]">
                <FaStar size={14} />
                <FaStar size={14} />
                <FaStar size={14} />
                <FaStar size={14} />
                <FaRegStar size={14} className="text-[#de7921]" />
              </div>
              <span>& Up</span>
            </button>
          </div>

          <div className="border-t border-[#e7e7e7] pt-3">
            <h3 className="amz-filter-heading">Pay On Delivery</h3>
            <label className="flex items-center gap-2 cursor-pointer select-none text-[13px]">
              <input
                type="checkbox"
                checked={payOnDelivery}
                onChange={(e) => setPayOnDelivery(e.target.checked)}
                className="rounded border-[#888c8c] text-[#007185] focus:ring-0"
              />
              <span>Eligible for Pay On Delivery</span>
            </label>
          </div>

          <div className="border-t border-[#e7e7e7] pt-3">
            <h3 className="amz-filter-heading">Availability</h3>
            <label className="flex items-center gap-2 cursor-pointer select-none text-[13px]">
              <input
                type="checkbox"
                checked={includeOutOfStock}
                onChange={(e) => setIncludeOutOfStock(e.target.checked)}
                className="rounded border-[#888c8c] text-[#007185] focus:ring-0"
              />
              <span>Include Out of Stock</span>
            </label>
          </div>

          {(ratingFilter || selectedCategory !== "all" || searchQuery) && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setRatingFilter(null);
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="text-xs text-[#007185] hover:text-[#c7511f] hover:underline font-semibold cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          )}
        </aside>

        {/* RIGHT MAIN: POPULAR PRODUCTS */}
        <main className="flex-1 min-w-0">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#e7e7e7] pb-3">
            <div>
              <h2 className="text-[18px] font-bold text-[#0f1111]">
                Popular Products ({filteredProducts.length})
              </h2>
              <p className="text-[12px] text-[#565959] mt-0.5">
                Official inventory fulfilled directly via Amazon India with Prime delivery
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Prices Synced with Amazon Seller Account</span>
            </div>
          </div>

          {/* Product Grid */}
          <div className="amz-popular-grid">
            {filteredProducts.map((product) => {
              const amazonRedirectUrl = product.amazonUrl || `https://www.amazon.in/dp/${product.asin}?me=A26NUGXR8IFFOO`;

              return (
                <div key={product.id} className="amz-card">
                  <div>
                    {/* Product Image Area */}
                    <a
                      href={amazonRedirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="amz-card-img-anchor"
                    >
                      <img
                        src={product.image}
                        alt={product.fullName}
                      />
                    </a>

                    {/* Brand */}
                    <span className="amz-card-brand-name">
                      {product.brand}
                    </span>

                    {/* Short Title */}
                    <a
                      href={amazonRedirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={product.fullName}
                      className="amz-card-title-text"
                    >
                      {product.shortTitle}
                    </a>

                    {/* Star Ratings & Count */}
                    <div className="flex items-center gap-1 mb-1 text-[12px]">
                      <span className="text-[#0f1111] font-medium">{product.rating}</span>
                      <div className="flex text-[#de7921]">
                        <FaStar size={12} />
                        <FaStar size={12} />
                        <FaStar size={12} />
                        <FaStar size={12} />
                        {product.rating >= 4.5 ? (
                          <FaStar size={12} />
                        ) : (
                          <FaRegStar size={12} className="text-[#de7921]" />
                        )}
                      </div>
                      <a 
                        href={amazonRedirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#007185] hover:text-[#c7511f] hover:underline"
                      >
                        {product.reviewCountFormatted}
                      </a>
                    </div>

                    {/* Price Row */}
                    <div className="flex items-baseline gap-1 my-1">
                      <span className="text-[18px] font-medium text-[#0f1111] leading-none inline-flex items-start">
                        <span className="text-[11px] font-normal relative top-0.5 mr-0.5">₹</span>
                        <span>{product.price.toLocaleString("en-IN")}</span>
                        <span className="text-[9px] font-normal relative top-0.5">00</span>
                      </span>
                      <span className="text-[12px] text-[#565959] line-through ml-1.5 font-normal">
                        ₹{product.mrp.toLocaleString("en-IN")}.00
                      </span>
                    </div>

                    {/* Discount Pill */}
                    <div className="mb-1.5">
                      <span className="bg-[#cc0c39] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-xs inline-block">
                        {product.discountPercent}% Off
                      </span>
                    </div>

                    {/* Delivery */}
                    <div className="text-[12px] text-[#565959] leading-tight">
                      {product.deliveryDate}
                    </div>
                  </div>

                  {/* Buy Button */}
                  <div>
                    <a
                      href={amazonRedirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="amz-card-btn-buy"
                    >
                      Buy on Amazon
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-12 text-center text-[#565959] text-sm">
              No products match the selected filters.{" "}
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setRatingFilter(null);
                  setSelectedCategory("all");
                }}
                className="text-[#007185] hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}
        </main>

      </div>

    </div>
  );
}
