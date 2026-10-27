"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

interface ProductCardProps {
  id: string;
  name: string;
  brand?: string;
  modelNumber: string;
  image: string;
  description?: string;
  price?: number;
  specs: { label: string; value: string }[];
  badges: string[];
  warranty: string;
  delay?: number;
}

export default function ProductCard({
  id,
  name,
  brand,
  modelNumber,
  image,
  description,
  price,
  specs,
  badges,
  warranty,
  delay = 0,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white border border-slate-200 hover:border-black rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] bg-slate-50 p-6 flex items-center justify-center overflow-hidden border-b border-slate-100">
        <img
          src={image}
          alt={`${name} ${modelNumber ? `(${modelNumber})` : ""} - Authentic Infosystem`}
          width="320"
          height="240"
          loading="lazy"
          className="object-contain w-full h-full max-h-[160px] relative z-10 drop-shadow-md transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <p className="text-blue-600 text-[11px] tracking-wider uppercase mb-1 font-bold">{brand || modelNumber}</p>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight mb-2">{name}</h3>
          {description && (
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* Specs List */}
        <div className="flex-1 mb-6">
          <ul className="space-y-2">
            {specs.map((spec, idx) => (
              <li key={idx} className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                <span className="text-slate-500">{spec.label}</span>
                <span className="text-slate-900 font-semibold text-right max-w-[60%] truncate">{spec.value}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Buttons */}
        <div className="mt-auto">
          <div className="grid grid-cols-2 gap-3">
            <Link
              href={`#details-${id}`}
              prefetch={false}
              className="py-2.5 px-4 text-center rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-sm font-semibold transition-all"
            >
              View Details
            </Link>
            <a 
              href={`https://wa.me/919643990077?text=${encodeURIComponent(`Hi Authentic Infosystem, I would like to request the latest quote and availability for ${name} (${modelNumber || ""}).`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 text-center block rounded-xl bg-black hover:bg-zinc-800 text-white text-sm font-semibold transition-all shadow-sm"
            >
              Request Quote
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
