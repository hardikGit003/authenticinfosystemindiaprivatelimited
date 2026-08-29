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
    <section className="relative w-full min-h-[50vh] sm:min-h-[65vh] flex items-center justify-center overflow-hidden bg-black pt-28 sm:pt-40 pb-12 sm:pb-16">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        <img
          src={bgImage}
          alt="Hero Background"
          className="w-full h-full object-cover opacity-50 blur-sm scale-105"
        />
      </div>

      {/* Content */}
      <div className="page-container relative z-20 flex flex-col items-start justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          {miniText && (
            <p className="text-blue-400 text-xs tracking-[4px] sm:tracking-[8px] uppercase mb-3 sm:mb-4 font-semibold">
              {miniText}
            </p>
          )}
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight sm:tracking-tighter leading-[1.1] mb-4 sm:mb-6">
            {title}
          </h1>
          
          <p className="text-gray-300 text-sm sm:text-base md:text-xl leading-relaxed font-light mb-8 sm:mb-10 max-w-2xl">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              href={primaryButtonLink}
              className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] text-center"
            >
              {primaryButtonText}
            </Link>
            
            <Link
              href={secondaryButtonLink}
              className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm backdrop-blur-md transition-all text-center"
            >
              {secondaryButtonText}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
