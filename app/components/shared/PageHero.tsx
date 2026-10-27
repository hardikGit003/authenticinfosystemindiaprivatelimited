"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface PageHeroProps {
  title: string;
  subtitle: string;
  miniText?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  bgImage?: string;
}

export default function PageHero({
  title,
  subtitle,
  miniText,
  primaryButtonText = "Explore Products",
  primaryButtonLink = "#products",
  secondaryButtonText = "Contact Sales",
  secondaryButtonLink = "/#contact",
  bgImage = "/placeholder-hero.jpg",
}: PageHeroProps) {
  return (
    <section className="maroon-hero-section">
      {/* Background Ambient Luxury Highlight */}
      <div className="maroon-hero-glow" />
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl z-10" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl z-10" />
      </div>

      {/* Content */}
      <div className="maroon-hero-container">
        {/* Top Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs lg:text-[13px] text-[#E2EAF5]/85 mb-2.5 select-none font-medium">
          <Link href="/" prefetch={false} className="hover:text-white transition-colors">Home</Link>
          <span className="text-[#E2EAF5]/60">&gt;</span>
          <span className="text-white font-medium">Enterprise Infrastructure Solutions</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          {miniText && (
            <p className="text-rose-300/90 text-[11px] sm:text-xs tracking-[3px] sm:tracking-[4px] uppercase mb-2 font-bold">
              {miniText}
            </p>
          )}
          
          <h1 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-bold tracking-tight text-white mb-2.5 leading-tight">
            {title}
          </h1>
          
          <p className="text-[13.5px] sm:text-[14px] lg:text-[15.5px] text-[#E2EAF5] leading-relaxed font-normal mb-5 sm:mb-6 max-w-3xl">
            {subtitle}
          </p>
          
          <div className="flex flex-row flex-wrap items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
            <Link
              href={primaryButtonLink}
              prefetch={false}
              className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white hover:bg-rose-50 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-sm text-center"
            >
              {primaryButtonText}
            </Link>
            
            <Link
              href={secondaryButtonLink}
              prefetch={false}
              className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-sm shadow-xs transition-all text-center"
            >
              {secondaryButtonText}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
