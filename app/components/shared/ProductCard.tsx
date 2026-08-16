import { motion } from "framer-motion";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

interface ProductCardProps {
  id: string;
  name: string;
  modelNumber: string;
  image: string;
  price?: number;
  specs: { label: string; value: string }[];
  badges: string[];
  warranty: string;
  delay?: number;
}

export default function ProductCard({
  id,
  name,
  modelNumber,
  image,
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
      className="glass-card flex flex-col h-full relative"
    >
      {/* Badges Removed per user request */}

      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] bg-white/5 p-6 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-0"></div>
        <img
          src={image}
          alt={name}
          className="object-contain w-full h-full max-h-[160px] relative z-10 drop-shadow-2xl transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <p className="text-gray-400 text-xs tracking-widest uppercase mb-1">{modelNumber}</p>
          <h3 className="text-xl font-semibold text-white leading-tight mb-2">{name}</h3>
          {price && (
            <p className="text-2xl font-bold text-blue-400">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(price)}
            </p>
          )}
        </div>

        {/* Specs List */}
        <div className="flex-1 mb-6">
          <ul className="space-y-2">
            {specs.map((spec, idx) => (
              <li key={idx} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                <span className="text-gray-400">{spec.label}</span>
                <span className="text-white font-medium text-right max-w-[60%] truncate">{spec.value}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer info & Buttons */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 text-sm text-green-400 mb-4 bg-green-400/10 w-fit px-3 py-1.5 rounded-full border border-green-400/20">
            <FaCheckCircle />
            <span>{warranty}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href={`#details-${id}`}
              className="py-2.5 px-4 text-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all"
            >
              View Details
            </Link>
            <Link 
              href="/#contact"
              className="py-2.5 px-4 text-center block rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
