import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  miniText?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  miniText,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-6 sm:mb-8 ${align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-2xl"} ${className}`}
    >
      {miniText && (
        <p className="text-gray-400 text-xs tracking-[4px] uppercase mb-2 font-semibold">
          {miniText}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-2 sm:mb-3 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed font-light">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
