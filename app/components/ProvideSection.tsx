"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const photos = [
  {
    id: 1,
    image: "/Provide/Provide1.png",
    alt: "Sony PS5 DualSense Controller",
    tilt: "-rotate-2 hover:rotate-0",
    offset: "lg:translate-y-0",
  },
  {
    id: 2,
    image: "/Provide/Provide2.png",
    alt: "DJI Osmo Pocket 3 Creator Kit",
    tilt: "rotate-2 hover:rotate-0",
    offset: "lg:translate-y-2",
  },
  {
    id: 3,
    image: "/Provide/Provide3.png",
    alt: "Porsche Design BlackBerry Kit",
    tilt: "-rotate-1 hover:rotate-0",
    offset: "lg:-translate-y-1",
  },
  {
    id: 4,
    image: "/Provide/Provide4.png",
    alt: "Apple iPhone 15 Pro Titanium",
    tilt: "rotate-2 hover:rotate-0",
    offset: "lg:translate-y-2",
  },
  {
    id: 5,
    image: "/Provide/Provide5.png",
    alt: "Lenovo LOQ Tactical Backpack",
    tilt: "-rotate-2 hover:rotate-0",
    offset: "lg:-translate-y-2",
  },
  {
    id: 6,
    image: "/Provide/Provide6.png",
    alt: "Apple iPad Pro OLED M-Series",
    tilt: "rotate-1 hover:rotate-0",
    offset: "lg:translate-y-2",
  },
  {
    id: 7,
    image: "/Provide/Provide7.png",
    alt: "Apple iPhone Pro Desert Titanium",
    tilt: "-rotate-1 hover:rotate-0",
    offset: "lg:-translate-y-1",
  },
  {
    id: 8,
    image: "/Provide/Provide8.png",
    alt: "Samsung EVO Plus 512GB Storage",
    tilt: "rotate-2 hover:rotate-0",
    offset: "lg:translate-y-2",
  },
  {
    id: 9,
    image: "/Provide/Provide9.jpeg",
    alt: "Samsung Galaxy Z Fold Flagship",
    tilt: "-rotate-2 hover:rotate-0",
    offset: "lg:-translate-y-1",
  },
];

export default function ProvideSection() {
  return (
    <section
      id="what-we-provide"
      className="provide-section relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-t border-slate-200"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
            What We Provide To Our Customers
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Real customer deliveries and authentic hardware procurement direct from authorised global brand channels.
          </p>
        </div>

        {/* PURE PHOTO COLLAGE - COMPACT & CLEAN */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5 lg:gap-4 items-center">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              whileHover={{ scale: 1.04, zIndex: 30 }}
              className={`relative group ${photo.offset}`}
            >
              <div
                className={`relative w-full aspect-[4/3.7] rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(0,102,204,0.12)] transition-all duration-400 ease-out transform ${photo.tilt}`}
              >
                <Image
                  src={photo.image}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
                  priority={photo.id <= 5}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
