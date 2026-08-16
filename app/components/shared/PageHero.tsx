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
    <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden bg-black pt-40">
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
            <p className="text-blue-400 text-xs tracking-[8px] uppercase mb-4 font-semibold">
              {miniText}
            </p>
          )}
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-[1.1] mb-6">
            {title}
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light mb-10 max-w-2xl">
            {subtitle}
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={primaryButtonLink}
              className="px-8 py-4 bg-white text-black rounded-full font-semibold transition-all hover:bg-gray-200 hover:-translate-y-1 shadow-lg"
            >
              {primaryButtonText}
            </Link>
            
            <Link
              href={secondaryButtonLink}
              className="px-8 py-4 bg-white/10 text-white border border-white/20 backdrop-blur-md rounded-full font-semibold transition-all hover:bg-white/20 hover:-translate-y-1"
            >
              {secondaryButtonText}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
