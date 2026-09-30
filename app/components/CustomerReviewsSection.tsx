"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar, FaGoogle, FaCheckCircle, FaQuoteLeft } from "react-icons/fa";

interface ReviewItem {
  id: number;
  image: string;
  name: string;
  rating: number;
  timeAgo: string;
  tilt: string;
  desktopOffset: string;
}

const reviewsData: ReviewItem[] = [
  {
    id: 1,
    image: "/reviews/review-1.png",
    name: "Anshika Dhiman",
    rating: 5,
    timeAgo: "2 months ago",
    tilt: "-rotate-1 hover:rotate-0",
    desktopOffset: "lg:translate-y-0",
  },
  {
    id: 2,
    image: "/reviews/review-2.png",
    name: "Roshani Yadav",
    rating: 5,
    timeAgo: "2 months ago",
    tilt: "rotate-1 hover:rotate-0",
    desktopOffset: "lg:translate-y-4",
  },
  {
    id: 3,
    image: "/reviews/review-3.png",
    name: "Sadhna Kumari",
    rating: 5,
    timeAgo: "2 months ago",
    tilt: "-rotate-1 hover:rotate-0",
    desktopOffset: "lg:-translate-y-2",
  },
  {
    id: 4,
    image: "/reviews/review-4.png",
    name: "Nidhi Verma",
    rating: 5,
    timeAgo: "2 months ago",
    tilt: "rotate-1 hover:rotate-0",
    desktopOffset: "lg:translate-y-3",
  },
  {
    id: 5,
    image: "/reviews/review-5.png",
    name: "Mannu Tyagi",
    rating: 5,
    timeAgo: "2 months ago",
    tilt: "-rotate-1 hover:rotate-0",
    desktopOffset: "lg:-translate-y-3",
  },
  {
    id: 6,
    image: "/reviews/review-6.png",
    name: "Pragati Gupta",
    rating: 5,
    timeAgo: "a month ago",
    tilt: "rotate-1 hover:rotate-0",
    desktopOffset: "lg:translate-y-2",
  },
  {
    id: 7,
    image: "/reviews/review-7.png",
    name: "Aadesh Pal",
    rating: 5,
    timeAgo: "2 months ago",
    tilt: "-rotate-1 hover:rotate-0",
    desktopOffset: "lg:-translate-y-1",
  },
];

export default function CustomerReviewsSection() {
  return (
    <section
      id="customer-reviews"
      className="relative py-12 sm:py-18 px-4 sm:px-6 lg:px-8 bg-slate-50/60 overflow-hidden border-t border-slate-200"
    >
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:22px_22px] opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* SECTION HEADER - COMPACT & CLEAN */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-slate-800 text-xs font-bold mb-3"
          >
            <span className="flex items-center text-amber-400 gap-0.5 text-[11px]">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1.5 font-semibold text-slate-700 text-xs">
              <FaGoogle className="text-blue-500 text-xs" /> 5.0 Google Rating
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-2.5"
          >
            What Customer Say About Us
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="text-xs sm:text-sm md:text-base text-slate-600 max-w-xl mx-auto leading-relaxed"
          >
            Real feedback and genuine Google reviews from our valued customers & enterprise clients across India.
          </motion.p>
        </div>

        {/* COMPACT ZIGZAG COLLAGE GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 items-start">
          {reviewsData.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className={`relative group ${review.desktopOffset} transition-all duration-300`}
            >
              <div
                className={`relative bg-white rounded-xl sm:rounded-2xl p-2 sm:p-2.5 border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] group-hover:shadow-[0_12px_28px_rgba(15,23,42,0.1)] group-hover:border-slate-300 transition-all duration-300 transform ${review.tilt}`}
              >
                {/* Screenshot Photo - Natural & Compact */}
                <div className="relative w-full rounded-lg overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center">
                  <Image
                    src={review.image}
                    alt={`Google review by ${review.name}`}
                    width={400}
                    height={400}
                    className="w-full h-auto object-contain"
                    priority={review.id <= 4}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM SUBTLE GOOGLE LINK */}
        <div className="mt-10 sm:mt-12 text-center">
          <a
            href="https://maps.google.com/?q=Authentic+Infosystem+India+Private+Limited"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-900 text-slate-700 hover:text-white font-bold text-xs border border-slate-200 shadow-sm transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <FaGoogle className="text-blue-500 text-xs" />
            <span>Read more reviews on Google</span>
          </a>
        </div>

      </div>
    </section>
  );
}
