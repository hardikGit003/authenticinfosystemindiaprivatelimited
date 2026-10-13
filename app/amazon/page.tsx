"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  FaSearch, 
  FaStar, 
  FaStarHalfAlt,
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
      <header className="bg-[#131921] text-white">
        <div className="w-full px-4 py-2.5 flex flex-wrap lg:flex-nowrap items-center justify-between gap-3">
          
          {/* Left: Amazon Logo & Location */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Amazon Logo */}
            <a 
              href={AMAZON_STORE_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-baseline px-2 py-1 border border-transparent hover:border-white rounded-xs transition-colors"
              title="Amazon.in"
            >
              <div className="flex items-baseline">
                <span className="text-[23px] font-black tracking-tighter text-white leading-none">amazon</span>
                <span className="text-[#febd69] text-[15px] font-black leading-none">.in</span>
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
          <div className="flex-1 min-w-[280px] max-w-4xl order-3 lg:order-2 w-full lg:w-auto">
            <div className="flex items-center h-[40px] rounded-md overflow-hidden bg-white shadow-xs focus-within:ring-2 focus-within:ring-[#e77600]">
              
              {/* Left Select dropdown showing the Seller name */}
              <div className="hidden sm:flex items-center h-full px-3 bg-[#f3f3f3] hover:bg-[#dadada] border-r border-[#cdcdcd] text-[#555555] text-xs font-normal cursor-pointer select-none max-w-[280px] truncate">
                <span className="truncate font-medium text-[11px]">AUTHENTIC INFOSYSTEM INDIA PRIVATE LIMITED</span>
                <span className="ml-1.5 text-[9px] text-zinc-500">▼</span>
              </div>

              {/* Input field */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Amazon.in"
                className="flex-1 h-full px-3 text-[14px] text-[#0f1111] focus:outline-none placeholder-[#757575]"
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
                className="bg-[#febd69] hover:bg-[#f3a847] text-[#0f1111] px-4 sm:px-5 h-full flex items-center justify-center transition-colors cursor-pointer shrink-0"
                title="Search"
              >
                <FaSearch size={16} />
              </button>
            </div>
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

        {/* 2. AMAZON SECONDARY STRIP (#232f3e) */}
        <div className="bg-[#232f3e] text-white text-[13px] font-medium px-4 overflow-x-auto scrollbar-none border-t border-zinc-800">
          <div className="flex items-center gap-3 sm:gap-4 py-1.5 whitespace-nowrap">
            <button 
              type="button" 
              onClick={() => {
                setSearchQuery("");
                setRatingFilter(null);
                setSelectedCategory("all");
              }}
              className="flex items-center gap-1.5 font-bold hover:outline-1 hover:outline-white px-2 py-0.5"
            >
              <FaBars size={12} />
              <span>All</span>
            </button>
            <span className="hover:outline-1 hover:outline-white px-2 py-0.5 cursor-pointer">Prime Video</span>
            <span className="hover:outline-1 hover:outline-white px-2 py-0.5 cursor-pointer">Sell</span>
            <span className="hover:outline-1 hover:outline-white px-2 py-0.5 cursor-pointer">Bestsellers</span>
            <span className="hover:outline-1 hover:outline-white px-2 py-0.5 cursor-pointer">Today's Deals</span>
            <span className="hover:outline-1 hover:outline-white px-2 py-0.5 cursor-pointer">Mobiles</span>
            <span className="hover:outline-1 hover:outline-white px-2 py-0.5 cursor-pointer">New Releases</span>
            <span className="hover:outline-1 hover:outline-white px-2 py-0.5 cursor-pointer">Customer Service</span>
            <span className="hover:outline-1 hover:outline-white px-2 py-0.5 cursor-pointer">Prime ▼</span>
            <span className="hover:outline-1 hover:outline-white px-2 py-0.5 cursor-pointer">Electronics</span>
            <span className="hover:outline-1 hover:outline-white px-2 py-0.5 cursor-pointer">Amazon Pay</span>
            <span className="hover:outline-1 hover:outline-white px-2 py-0.5 cursor-pointer">Home & Kitchen</span>
            <span className="hover:outline-1 hover:outline-white px-2 py-0.5 cursor-pointer">Fashion</span>
            <span className="hover:outline-1 hover:outline-white px-2 py-0.5 cursor-pointer">Car & Motorbike</span>
            <span className="hover:outline-1 hover:outline-white px-2 py-0.5 cursor-pointer">Computers</span>
            <span className="hover:outline-1 hover:outline-white px-2 py-0.5 cursor-pointer">Grocery & Gourmet Foods</span>
            <span className="hover:outline-1 hover:outline-white px-2 py-0.5 cursor-pointer">Pet Supplies</span>
          </div>
        </div>
      </header>

      {/* 3. STOREFRONT TITLE & SHARE HEADER (MATCHING USER SCREENSHOT) */}
      <div className="border-b border-[#e7e7e7] bg-white">
        <div className="max-w-[1460px] mx-auto px-4 sm:px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          
          {/* Left: Storefront Name and Lifetime Rating */}
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

          {/* Right: Share Storefront Button */}
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

      {/* 4. MAIN BODY (LEFT SIDEBAR FILTERS + RIGHT 5 PRODUCTS GRID) */}
      <div className="max-w-[1460px] mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* LEFT SIDEBAR: FILTERS */}
          <aside className="w-full md:w-[210px] shrink-0 text-[#0f1111] text-[13px] space-y-4">
            
            {/* Category Filter */}
            <div>
              <h3 className="font-bold text-[14px] text-[#0f1111] mb-2">Category</h3>
              <ul className="space-y-1 text-[#0f1111]">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("Computers & Accessories");
                      setSearchQuery("");
                    }}
                    className="hover:text-[#c45500] hover:underline text-left block"
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
                    className="hover:text-[#c45500] hover:underline text-left block"
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
                    className="hover:text-[#c45500] hover:underline text-left block"
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
                    className="hover:text-[#c45500] hover:underline text-left block"
                  >
                    &lt; Video Games
                  </button>
                </li>
              </ul>
            </div>

            <div className="border-t border-[#e7e7e7] pt-3">
              <h3 className="font-bold text-[14px] text-[#0f1111] mb-2">Customer Review</h3>
              <button
                type="button"
                onClick={() => setRatingFilter(ratingFilter === 4 ? null : 4)}
                className={`flex items-center gap-1.5 hover:text-[#c45500] cursor-pointer text-[13px] ${
                  ratingFilter === 4 ? "font-bold text-[#c45500]" : ""
                }`}
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
              <h3 className="font-bold text-[14px] text-[#0f1111] mb-2">Pay On Delivery</h3>
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
              <h3 className="font-bold text-[14px] text-[#0f1111] mb-2">Availability</h3>
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
                  className="text-xs text-[#007185] hover:text-[#c7511f] hover:underline font-semibold"
                >
                  Clear filters
                </button>
              </div>
            )}

          </aside>

          {/* RIGHT MAIN: POPULAR PRODUCTS (EXACT 5 PRODUCTS FROM SCREENSHOT) */}
          <main className="flex-1 min-w-0">
            
            {/* Section Header */}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.map((product) => {
                const amazonRedirectUrl = product.amazonUrl || `https://www.amazon.in/dp/${product.asin}?me=A26NUGXR8IFFOO`;

                return (
                  <div
                    key={product.id}
                    className="bg-white p-2 rounded-xs flex flex-col justify-between group hover:shadow-xs transition-shadow text-left"
                  >
                    <div>
                      {/* Product Image Area */}
                      <a
                        href={amazonRedirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-[180px] bg-white rounded-xs p-2 mb-2 flex items-center justify-center overflow-hidden"
                      >
                        <img
                          src={product.image}
                          alt={product.fullName}
                          className="max-h-full max-w-full object-contain group-hover:scale-102 transition-transform duration-200"
                        />
                      </a>

                      {/* Brand */}
                      <div className="text-[12px] text-[#565959] leading-tight mb-0.5">
                        {product.brand}
                      </div>

                      {/* Short Title */}
                      <a
                        href={amazonRedirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={product.fullName}
                        className="text-[13px] text-[#007185] hover:text-[#c7511f] hover:underline font-normal line-clamp-2 leading-snug mb-1 block"
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

                      {/* Red Discount Pill (e.g. 51% Off) */}
                      <div className="mb-1.5">
                        <span className="bg-[#cc0c39] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-xs inline-block">
                          {product.discountPercent}% Off
                        </span>
                      </div>

                      {/* FREE delivery date */}
                      <div className="text-[12px] text-[#565959] leading-tight">
                        {product.deliveryDate}
                      </div>
                    </div>

                    {/* Direct Amazon Buy Action Button */}
                    <div className="mt-3 pt-2">
                      <a
                        href={amazonRedirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block text-center bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] text-[#0f1111] text-[11px] font-medium py-1.5 px-2 rounded-lg border border-[#fcd200] shadow-2xs transition-colors"
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
                    setRatingFilter(null);
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="text-[#007185] hover:underline font-semibold"
                >
                  Reset filters
                </button>
              </div>
            )}

          </main>

        </div>
      </div>

    </div>
  );
}
