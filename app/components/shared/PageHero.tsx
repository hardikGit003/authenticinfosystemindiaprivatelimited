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
    <section className="relative w-full flex items-center justify-center overflow-hidden bg-black border-b border-white/10 pt-28 sm:pt-32 md:pt-36 pb-8 sm:pb-10 md:pb-12">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-zinc-950/90 z-10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl z-10 pointer-events-none" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-zinc-700/10 rounded-full blur-3xl z-10 pointer-events-none" />
        <img
          src={bgImage}
          alt={`${title} - Authentic Infosystem IT Hardware`}
          width="1920"
          height="600"
          loading="eager"
          className="w-full h-full object-cover opacity-20 blur-[2px] scale-105"
        />
      </div>

      {/* Content */}
      <div className="page-container relative z-20 flex flex-col items-start justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          {miniText && (
            <p className="text-zinc-400 text-[11px] sm:text-xs tracking-[3px] sm:tracking-[5px] uppercase mb-2 sm:mb-2.5 font-bold">
              {miniText}
            </p>
          )}
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-2 sm:mb-3">
            {title}
          </h1>
          
          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal mb-5 sm:mb-6 max-w-2xl">
            {subtitle}
          </p>
          
          <div className="flex flex-row flex-wrap items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
            <Link
              href={primaryButtonLink}
              className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white hover:bg-zinc-200 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-sm text-center"
            >
              {primaryButtonText}
            </Link>
            
            <Link
              href={secondaryButtonLink}
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
