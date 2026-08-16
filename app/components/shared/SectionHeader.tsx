import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  miniText?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  title,
  subtitle,
  miniText,
  align = "left",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-2xl"}`}
    >
      {miniText && (
        <p className="text-gray-400 text-xs tracking-[4px] uppercase mb-3 font-semibold">
          {miniText}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
