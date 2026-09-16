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
  secondaryButtonLink = "#contact",
  bgImage = "/placeholder-hero.jpg",
}: PageHeroProps) {
  return (
    <section className="relative w-full min-h-[42vh] sm:min-h-[50vh] flex items-center justify-center overflow-hidden bg-black border-b border-white/10 pt-36 sm:pt-44 pb-12 sm:pb-16">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-zinc-950/90 z-10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl z-10 pointer-events-none" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-zinc-700/10 rounded-full blur-3xl z-10 pointer-events-none" />
        <img
          src={bgImage}
          alt="Hero Background"
          className="w-full h-full object-cover opacity-20 blur-[2px] scale-105"
        />
      </div>

      {/* Content */}
      <div className="page-container relative z-20 flex flex-col items-start justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {miniText && (
            <p className="text-zinc-400 text-xs tracking-[4px] sm:tracking-[6px] uppercase mb-3 sm:mb-4 font-bold">
              {miniText}
            </p>
          )}
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-4 sm:mb-6">
            {title}
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal mb-8 sm:mb-10 max-w-2xl">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              href={primaryButtonLink}
              className="px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white hover:bg-zinc-200 text-slate-950 font-semibold text-sm transition-all shadow-md text-center"
            >
              {primaryButtonText}
            </Link>
            
            <Link
              href={secondaryButtonLink}
              className="px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm backdrop-blur-sm shadow-xs transition-all text-center"
            >
              {secondaryButtonText}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
