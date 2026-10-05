"use client";

import { useState } from "react";
import { FaTimes, FaBuilding, FaUser, FaEnvelope, FaPhoneAlt, FaLaptop, FaCheckCircle, FaWhatsapp, FaShieldAlt } from "react-icons/fa";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBrand?: string;
  initialModel?: string;
}

export default function QuoteModal({
  isOpen,
  onClose,
  initialBrand = "",
  initialModel = "",
}: QuoteModalProps) {
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(initialBrand || "Lenovo");
  const [modelRequirement, setModelRequirement] = useState(initialModel || "");
  const [quantity, setQuantity] = useState("5-20 Units");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const whatsappMessage = `*Enterprise Laptop B2B Quote Request*
---------------------------------------
*Company:* ${companyName || "N/A"}
*Contact Person:* ${contactPerson || "N/A"}
*Phone:* ${phone || "N/A"}
*Email:* ${email || "N/A"}
*Brand Requested:* ${selectedBrand}
*Model / Specs:* ${modelRequirement || "Standard Enterprise Configuration"}
*Quantity:* ${quantity}
*Notes:* ${additionalNotes || "Please provide latest enterprise price & availability."}`;

    const whatsappUrl = `https://wa.me/919643990077?text=${encodeURIComponent(whatsappMessage)}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-scale-up max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-zinc-900 text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes size={18} />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-2">
            <FaShieldAlt size={11} />
            <span>AUTHENTIC INFOSYSTEM B2B SOURCING DESK</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Request Enterprise Laptop Quote
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-lg">
            Direct OEM pricing, bulk GST invoicing, custom imaging, and Pan-India deployment.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-2">
                <FaCheckCircle size={36} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">Quote Request Initiated!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Opening WhatsApp to connect you directly with our enterprise procurement specialist with your configured specs.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <FaBuilding className="text-slate-400" size={12} />
                    <span>Company / Organization Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Technologies Pvt Ltd"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-black focus:bg-white text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <FaUser className="text-slate-400" size={12} />
                    <span>Contact Person Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-black focus:bg-white text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <FaPhoneAlt className="text-slate-400" size={12} />
                    <span>Mobile / WhatsApp Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-black focus:bg-white text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <FaEnvelope className="text-slate-400" size={12} />
                    <span>Official Work Email *</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="procurement@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-black focus:bg-white text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Brand
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-black focus:bg-white text-slate-900"
                  >
                    <option value="Lenovo">Lenovo (ThinkPad, IdeaPad, Yoga, Legion)</option>
                    <option value="HP">HP (EliteBook, ProBook, Pavilion, OMEN)</option>
                    <option value="Dell">Dell (Latitude, Vostro, Inspiron, XPS)</option>
                    <option value="ASUS">ASUS (ExpertBook, VivoBook, Zenbook, ROG)</option>
                    <option value="Acer">Acer (TravelMate, Aspire, Swift, Nitro)</option>
                    <option value="Apple">Apple (MacBook Air, MacBook Pro)</option>
                    <option value="Multi-brand">Multi-Brand Fleet Evaluation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Procurement Quantity
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-black focus:bg-white text-slate-900"
                  >
                    <option value="1-4 Units">1 - 4 Units (Sample / Initial Trial)</option>
                    <option value="5-20 Units">5 - 20 Units (Team Batch)</option>
                    <option value="20-50 Units">20 - 50 Units (Department Fleet)</option>
                    <option value="50-200 Units">50 - 200 Units (Corporate Scale)</option>
                    <option value="200+ Enterprise Fleet">200+ Units (Enterprise Rollout)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <FaLaptop className="text-slate-400" size={12} />
                  <span>Specific Model / Required Specs</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. ThinkPad E14 i5 16GB 512GB SSD or MacBook Air 13 M3"
                  value={modelRequirement}
                  onChange={(e) => setModelRequirement(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-black focus:bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Additional Fleet Customizations & Delivery Timelines
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need Windows 11 Pro pre-configured, Asset tagging required, Delivery across Gurugram and Bengaluru offices."
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-black focus:bg-white text-slate-900 resize-none"
                />
              </div>

              {/* Service inclusions */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-slate-600 font-medium">
                <span className="flex items-center gap-1 text-slate-900 font-semibold">
                  <FaCheckCircle className="text-emerald-500" size={11} /> 100% Genuine OEM Warranty
                </span>
                <span className="flex items-center gap-1 text-slate-900 font-semibold">
                  <FaCheckCircle className="text-emerald-500" size={11} /> Bulk GST Invoicing
                </span>
                <span className="flex items-center gap-1 text-slate-900 font-semibold">
                  <FaCheckCircle className="text-emerald-500" size={11} /> Pan-India Secure Delivery
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-950 hover:bg-black text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer hover:scale-[1.02]"
                >
                  <FaWhatsapp size={14} className="text-emerald-400" />
                  <span>Request Official B2B Quote</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
