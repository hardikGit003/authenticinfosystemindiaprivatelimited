"use client";

import { 
  FaBuilding, 
  FaBarcode, 
  FaWindows, 
  FaShieldAlt, 
  FaTruck, 
  FaHeadset, 
  FaArrowRight, 
  FaFileInvoiceDollar,
  FaWhatsapp
} from "react-icons/fa";

interface EnterpriseProcurementSectionProps {
  onOpenQuote?: () => void;
}

const enterpriseHighlights = [
  {
    icon: FaBuilding,
    title: "Bulk Fleet Procurement",
    description: "Tiered commercial volume pricing, scalable delivery schedules, and dedicated account pricing agreements.",
  },
  {
    icon: FaBarcode,
    title: "Custom Asset Tagging",
    description: "Custom barcode, QR code, and asset ID labeling matching your internal ERP & IT asset register before shipment.",
  },
  {
    icon: FaWindows,
    title: "Pre-Installed OS & Custom Images",
    description: "Factory-level OS provisioning with your company's standard corporate software baseline, domain join, and VPN profile.",
  },
  {
    icon: FaShieldAlt,
    title: "Official OEM Warranty Support",
    description: "Direct manufacturer onsite service agreements (Dell ProSupport, Lenovo Premier, HP Care Pack, AppleCare+).",
  },
  {
    icon: FaTruck,
    title: "Pan-India Secure Deployment",
    description: "Insured transit and multi-city delivery directly to regional headquarters, branch offices, or remote employees' homes.",
  },
  {
    icon: FaHeadset,
    title: "Dedicated B2B IT Account Manager",
    description: "Direct point of contact for priority RMA turnaround, spare parts sourcing, warranty claims, and repeat purchase requisitions.",
  },
];

export default function EnterpriseProcurementSection({
  onOpenQuote,
}: EnterpriseProcurementSectionProps) {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-zinc-950 text-white rounded-3xl sm:rounded-[36px] overflow-hidden my-12 border border-slate-800 shadow-2xl relative">
      {/* Subtle Background Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <FaFileInvoiceDollar size={13} />
            <span>Corporate IT Procurement & Fleet Management</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Need laptops for your organization?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
            From fast-growing tech startups to multinational enterprises, Authentic Infosystem equips your workforce with dependable, enterprise-managed mobile computing solutions.
          </p>
        </div>

        {/* 6 Feature Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {enterpriseHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 p-6 sm:p-7 rounded-2xl transition-all duration-200 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-400 mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-white mb-1">
              Ready to equip your corporate workforce?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Speak with an Authentic Infosystem enterprise account consultant for customized volume pricing and tax-deductible GST invoices.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/919643990077?text=Hi%2C%20I%20am%20looking%20for%20a%20bulk%20enterprise%20laptop%20procurement%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md"
            >
              <FaWhatsapp size={16} />
              <span>WhatsApp Procurement Desk</span>
            </a>
            <button
              onClick={() => {
                if (onOpenQuote) {
                  onOpenQuote();
                } else {
                  window.location.href = "/#contact";
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer hover:scale-105"
            >
              <span>Request B2B Quote</span>
              <FaArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
