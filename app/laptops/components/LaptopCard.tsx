"use client";

import Link from "next/link";
import { FaWhatsapp, FaArrowRight, FaMicrochip, FaMemory, FaHdd, FaTv } from "react-icons/fa";
import { LaptopProduct } from "../../data/laptopData";

interface LaptopCardProps {
  laptop: LaptopProduct;
  onOpenQuote?: (brand: string, model: string) => void;
}

export default function LaptopCard({ laptop, onOpenQuote }: LaptopCardProps) {
  const getSpecValue = (label: string) => {
    const found = laptop.specs.find((s) => s.label.toLowerCase() === label.toLowerCase());
    return found ? found.value : "";
  };

  const processor = getSpecValue("Processor") || laptop.detailedSpecs.processor;
  const ram = getSpecValue("RAM") || laptop.detailedSpecs.ram;
  const storage = getSpecValue("Storage") || laptop.detailedSpecs.storage;
  const graphics = getSpecValue("Graphics") || laptop.detailedSpecs.graphics;
  const display = getSpecValue("Display") || laptop.detailedSpecs.display;

  const productUrl = `/laptops/${laptop.brandSlug}/${laptop.slug}`;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 hover:border-slate-400 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl relative group">
      <div>
        {/* Product Image Container */}
        <Link href={productUrl} className="block relative w-full aspect-[4/3] bg-gradient-to-b from-slate-50 to-slate-100/60 rounded-2xl p-4 mb-5 overflow-hidden group-hover:bg-slate-100 transition-colors">
          <img
            src={laptop.image}
            alt={`${laptop.brand} ${laptop.model} Business Laptop`}
            width="320"
            height="240"
            loading="lazy"
            className="w-full h-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Model & Tagline */}
        <div className="mb-4">
          <p className="text-blue-600 text-[11px] font-bold uppercase tracking-wider mb-1">
            {laptop.brand}
          </p>
          <Link href={productUrl}>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 leading-snug group-hover:text-blue-900 transition-colors">
              {laptop.model}
            </h3>
          </Link>
          <p className="text-slate-600 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {laptop.tagline}
          </p>
        </div>

        {/* Specifications Matrix */}
        <div className="space-y-2 py-3.5 border-y border-slate-100 text-xs mb-4">
          {processor && (
            <div className="flex items-center justify-between text-slate-700 gap-2">
              <span className="text-slate-400 flex items-center gap-1.5 shrink-0">
                <FaMicrochip size={11} /> CPU:
              </span>
              <span className="font-semibold text-slate-900 text-right truncate">{processor}</span>
            </div>
          )}
          {ram && (
            <div className="flex items-center justify-between text-slate-700 gap-2">
              <span className="text-slate-400 flex items-center gap-1.5 shrink-0">
                <FaMemory size={11} /> RAM:
              </span>
              <span className="font-semibold text-slate-900 text-right truncate">{ram}</span>
            </div>
          )}
          {storage && (
            <div className="flex items-center justify-between text-slate-700 gap-2">
              <span className="text-slate-400 flex items-center gap-1.5 shrink-0">
                <FaHdd size={11} /> Storage:
              </span>
              <span className="font-semibold text-slate-900 text-right truncate">{storage}</span>
            </div>
          )}
          {display && (
            <div className="flex items-center justify-between text-slate-700 gap-2">
              <span className="text-slate-400 flex items-center gap-1.5 shrink-0">
                <FaTv size={11} /> Display:
              </span>
              <span className="font-semibold text-slate-900 text-right truncate">{display}</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto">
        <div className="grid grid-cols-2 gap-2.5">
          <Link
            href={productUrl}
            className="py-2.5 px-3 text-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors border border-slate-200/80 flex items-center justify-center gap-1"
          >
            <span>View Specs</span>
            <FaArrowRight size={10} className="text-slate-500" />
          </Link>
          <button
            onClick={() => {
              if (onOpenQuote) {
                onOpenQuote(laptop.brand, laptop.model);
              } else {
                const msg = `Hi Authentic Infosystem, I would like to request an official B2B quote for ${laptop.brand} ${laptop.model} (${laptop.modelNumber}).`;
                window.open(`https://wa.me/919643990077?text=${encodeURIComponent(msg)}`, "_blank");
              }
            }}
            className="py-2.5 px-3 text-center rounded-xl bg-slate-950 hover:bg-black text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <FaWhatsapp size={13} className="text-emerald-400" />
            <span>Request Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
}
