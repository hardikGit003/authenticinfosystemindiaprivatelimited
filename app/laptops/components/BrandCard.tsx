"use client";

import Link from "next/link";
import { FaArrowRight, FaCheckCircle, FaLaptop } from "react-icons/fa";
import { LaptopBrand } from "../../data/laptopData";

interface BrandCardProps {
  brand: LaptopBrand;
  modelCount?: number;
}

export default function BrandCard({ brand, modelCount = 4 }: BrandCardProps) {
  return (
    <div className="group relative bg-white rounded-3xl border border-slate-200/80 hover:border-slate-400 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
      {/* Subtle top gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 opacity-80 group-hover:opacity-100 group-hover:h-1.5 transition-all" />

      <div>
        {/* Top bar: Brand logo */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="h-10 sm:h-12 flex items-center max-w-[140px] sm:max-w-[160px]">
            <img
              src={brand.logo}
              alt={`${brand.name} Commercial Laptops`}
              className="max-h-9 sm:max-h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        {/* Brand Name & Tagline */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight mb-2 group-hover:text-blue-900 transition-colors">
          {brand.name}
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
          {brand.description}
        </p>

        {/* Series Pill Showcase (e.g. ThinkPad · IdeaPad · Yoga · Legion) */}
        <div className="mb-6">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <FaLaptop size={11} className="text-slate-500" />
            <span>Key Series</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {brand.series.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-50 text-slate-800 border border-slate-200/80 group-hover:border-slate-300 transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Enterprise Key Highlights */}
        <div className="space-y-2 pt-4 border-t border-slate-100 mb-6">
          {brand.b2bHighlights.slice(0, 2).map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
              <FaCheckCircle className="text-blue-600 shrink-0 mt-0.5" size={12} />
              <span className="leading-snug">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Button: Explore Brand -> */}
      <div className="pt-2">
        <Link
          href={`/laptops/${brand.slug}`}
          prefetch={false}
          className="w-full inline-flex items-center justify-between py-3.5 px-5 rounded-2xl bg-slate-950 text-white font-bold text-xs sm:text-sm transition-all duration-200 hover:bg-black group-hover:shadow-md hover:translate-x-0.5"
          id={`explore-${brand.slug}-btn`}
        >
          <span>Explore {brand.name}</span>
          <FaArrowRight size={13} className="text-slate-300 group-hover:translate-x-1 group-hover:text-white transition-transform" />
        </Link>
      </div>
    </div>
  );
}
