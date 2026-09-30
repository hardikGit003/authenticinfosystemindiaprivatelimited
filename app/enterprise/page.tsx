"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/shared/PageHero";
import SectionHeader from "../components/shared/SectionHeader";
import { motion, AnimatePresence } from "framer-motion";

const enterpriseServices = [
  { title: "IT Procurement", image: "/Enterprise/IT%20Procurement.jpg" },
  { title: "Annual IT Supply", image: "/Enterprise/Annual%20IT%20Supply.jpg" },
  { title: "Asset Management", image: "/Enterprise/Asset%20Management.jpg" },
  { title: "Deployment", image: "/Enterprise/Deployment.jpg" },
  { title: "Cloud Consulting", image: "/Enterprise/Cloud%20Consulting.jpg" },
  { title: "Networking", image: "/Enterprise/Networking.jpg" },
  { title: "AMC Services", image: "/Enterprise/AMC%20Services.jpg" },
  { title: "Onsite Support", image: "/Enterprise/Onsite%20Support.jpg" },
  { title: "Software Licensing", image: "/Enterprise/Software%20Licensing.jpg" },
  { title: "Device Lifecycle", image: "/Enterprise/Device%20Lifecycle.jpg" },
];

const faqs = [
  { q: "How long does deployment take?", a: "Deployment timelines vary based on the scale and complexity of the project. A standard office setup typically takes 1-2 weeks from procurement to final installation." },
  { q: "Do you provide PAN India delivery?", a: "Yes, we have a robust logistics network that ensures safe and timely delivery of enterprise hardware across all major cities and remote locations in India." },
  { q: "Can you customize configurations?", a: "Absolutely. We specialize in custom configurations for workstations, servers, and networking equipment to perfectly match your specific workload requirements." },
  { q: "Do you offer onsite installation?", a: "Yes, our certified engineers provide comprehensive onsite installation, testing, and configuration services for all enterprise deployments." },
  { q: "What brands do you support?", a: "We are authorized partners with Dell, HP, Lenovo, Cisco, Apple, Microsoft, ASUS, Acer, and many other leading enterprise technology brands." },
  { q: "Is financing available?", a: "We offer flexible payment terms and leasing options for qualified enterprise customers and large procurement orders." },
  { q: "Do you provide AMC?", a: "Yes, we offer comprehensive Annual Maintenance Contracts (AMC) with customizable SLAs, including 24x7 support and rapid hardware replacement." },
  { q: "Can you manage IT assets?", a: "Our IT asset lifecycle management services cover everything from procurement and tagging to secure data wiping and e-waste disposal." },
];

export default function EnterprisePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [companyName, setCompanyName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companySize, setCompanySize] = useState("1-50 Employees");
  const [productsInterested, setProductsInterested] = useState("");
  const [messageDetails, setMessageDetails] = useState("");



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage =
`Enterprise Inquiry

Company Name: ${companyName}
Business Email: ${businessEmail}
Phone Number: ${phoneNumber}
Company Size: ${companySize}
Products Interested: ${productsInterested}

Details:
${messageDetails}`;

    const whatsappURL = `https://wa.me/919643990077?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <PageHero
        title="End-to-End IT Procurement for Modern Enterprises."
        subtitle="Authentic Infosystem delivers complete technology procurement, deployment, asset lifecycle management, and IT infrastructure solutions for organizations across India."
        miniText="B2B ENTERPRISE SOLUTIONS"
        primaryButtonText="Schedule Consultation"
        secondaryButtonText="Request Proposal"
      />


      {/* Who We Serve */}
      <section className="py-8 sm:py-10 page-container border-b border-slate-200">
        <SectionHeader title="Industries We Empower" align="center" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-5">
          {['Startups', 'SMEs', 'Large Enterprises', 'Educational Institutions', 'Healthcare', 'Manufacturing', 'Government', 'Retail Chains'].map((industry, i) => (
            <div key={i} className="bg-white rounded-xl p-4 sm:p-6 text-center hover:bg-slate-50 hover:border-slate-400 transition-all cursor-pointer border border-slate-200 shadow-xs hover:shadow-md">
              <h4 className="text-sm sm:text-base font-bold text-slate-800">{industry}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Our Services */}
      <section className="py-8 sm:py-10 page-container">
        <SectionHeader title="Enterprise IT Services" subtitle="Comprehensive solutions to manage your entire technology lifecycle." />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-5">
          {enterpriseServices.map((service, i) => (
            <a
              key={i}
              href={`https://wa.me/919643990077?text=${encodeURIComponent(`Hi, I am interested in ${service.title} enterprise services from Authentic Infosystem.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-[16px] overflow-hidden min-h-[130px] sm:min-h-[140px] flex items-center justify-center p-4 border border-slate-200 shadow-[0_4px_16px_rgba(0,0,0,0.06)] cursor-pointer group hover:shadow-xl hover:border-slate-800 hover:-translate-y-1 transition-all duration-300 block"
            >
              {/* Background Image */}
              <img
                src={service.image}
                alt={service.title}
                width="400"
                height="200"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Light Vignette / Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

              {/* Centered Heading with White Text */}
              <h4 className="relative z-10 text-white font-semibold text-xs sm:text-sm text-center px-2 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,1)] [text-shadow:_0_2px_12px_rgba(0,0,0,0.95)] group-hover:text-white group-hover:scale-105 transition-all duration-300">
                {service.title}
              </h4>
            </a>
          ))}
        </div>
      </section>

      {/* Procurement Process */}
      <section className="py-8 sm:py-10 bg-slate-50 page-container border-y border-slate-200">
        <SectionHeader title="Streamlined Procurement Process" align="center" />
        <div className="relative mt-6 sm:mt-8 max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 relative z-10">
            {['Requirement', 'Consultation', 'Vendor Select', 'Quotation', 'Approval', 'Delivery', 'Deployment', 'Support'].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white border-2 border-black text-black rounded-full flex items-center justify-center text-xs font-bold mb-1.5 sm:mb-2 shadow-xs">
                  {i + 1}
                </div>
                <span className="text-xs font-semibold text-slate-700">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Inquiry Form */}
      <section className="py-10 sm:py-14 w-full bg-[#000000] border-y border-white/10 relative overflow-hidden" id="contact">
        {/* Ambient Glows */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />

        <div className="page-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
            <div>
              <SectionHeader 
                dark
                miniText="GET IN TOUCH"
                title="Request a Custom Quote" 
                subtitle="Partner with us for reliable, scalable, and cost-effective IT infrastructure." 
              />
              <div className="mt-6 space-y-3 sm:space-y-4">
                <a 
                  href="mailto:b2b@authenticinfosystem.com" 
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 bg-white/10 text-white border border-white/20 rounded-full flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">📧</div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold group-hover:text-zinc-300">Email Us</p>
                    <p className="font-semibold text-sm sm:text-base text-white group-hover:text-blue-300 transition-colors">b2b@authenticinfosystem.com</p>
                  </div>
                </a>
                <a 
                  href="tel:+919643990077" 
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 bg-white/10 text-white border border-white/20 rounded-full flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">📞</div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold group-hover:text-zinc-300">Call Us</p>
                    <p className="font-semibold text-sm sm:text-base text-white group-hover:text-emerald-300 transition-colors">+91 9643990077</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-7 md:p-8">
              <form className="space-y-3.5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-600 font-bold mb-1.5">Company Name</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-black outline-none transition-colors" placeholder="Acme Corp" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-600 font-bold mb-1.5">Business Email</label>
                    <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-black outline-none transition-colors" placeholder="you@company.com" value={businessEmail} onChange={(e) => setBusinessEmail(e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-600 font-bold mb-1.5">Phone Number</label>
                    <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-black outline-none transition-colors" placeholder="+91 xxxxx xxxxx" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-600 font-bold mb-1.5">Company Size</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-black outline-none transition-colors appearance-none" value={companySize} onChange={(e) => setCompanySize(e.target.value)}>
                      <option>1-50 Employees</option>
                      <option>51-200 Employees</option>
                      <option>201-500 Employees</option>
                      <option>500+ Employees</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-600 font-bold mb-1.5">Products/Services Interested In</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-black outline-none transition-colors" placeholder="Laptops, Networking, AMC..." value={productsInterested} onChange={(e) => setProductsInterested(e.target.value)} />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-600 font-bold mb-1.5">Message Details</label>
                  <textarea rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-black outline-none transition-colors" placeholder="Tell us about your project requirements..." value={messageDetails} onChange={(e) => setMessageDetails(e.target.value)}></textarea>
                </div>

                <button type="submit" className="w-full py-3 bg-black hover:bg-zinc-800 text-white rounded-lg font-bold text-sm transition-colors mt-1 shadow-md hover:shadow-lg">
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 sm:py-10 page-container">
        <SectionHeader title="Our Leadership Vision" align="center" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-5">
          {[
            { quote: "Our technological infrastructure is built on a foundation of innovation and absolute reliability. We are committed to pushing the boundaries of what enterprise IT can achieve.", author: "Vikas Verma", role: "Chief Technology Officer (CTO)" },
            { quote: "Security and strategic growth are at the core of our operations. We prioritize providing our clients with robust security solutions that give them complete peace of mind.", author: "Ankit Singh", role: "Chief Security Officer (CSO)" },
            { quote: "We deeply understand our clients' unique challenges and translate them into impactful, market-leading solutions that drive true business transformation.", author: "Chesta Sharma", role: "Chief Marketing Officer (CMO)" },
          ].map((testi, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 relative shadow-xs">
              <div className="text-3xl text-slate-300 absolute top-2 left-3 font-serif">"</div>
              <p className="text-slate-700 relative z-10 leading-relaxed italic text-xs sm:text-sm mb-4 mt-1">{testi.quote}</p>
              <div className="border-t border-slate-200 pt-2.5 sm:pt-3">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{testi.author}</h4>
                <p className="text-[11px] text-slate-500 font-medium">{testi.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brands Carousel */}
      <section className="py-8 sm:py-10 bg-[#000000] border-y border-white/10 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-32 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />

        <div className="page-container relative z-10">
          <p className="text-center text-xs uppercase tracking-[3px] sm:tracking-[5px] font-bold text-zinc-400 mb-4 sm:mb-6">
            Authorized Partners
          </p>
          <div className="flex justify-between items-center gap-6 sm:gap-10 overflow-x-auto scrollbar-hide py-2">
            {['Dell', 'HP', 'Lenovo', 'Cisco', 'Microsoft', 'Acer', 'Asus', 'Intel', 'AMD'].map((brand, i) => (
              <div 
                key={i} 
                className="text-lg sm:text-xl md:text-2xl font-extrabold font-sans shrink-0 px-3 sm:px-5 py-2 text-white/75 hover:text-white hover:scale-105 transition-all cursor-default tracking-wide"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 sm:py-10 page-container">
        <SectionHeader title="Frequently Asked Questions" align="center" />
        <div className="max-w-3xl mx-auto mt-5 space-y-2.5 sm:space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-4 sm:px-5 py-3.5 sm:py-4 text-left flex justify-between items-center font-semibold text-slate-900 text-sm focus:outline-none hover:text-black transition-colors"
              >
                {faq.q}
                <span className={`text-slate-900 transition-transform duration-300 font-bold ${openFaq === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 sm:px-5 pb-3.5 sm:pb-4 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-2.5"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 sm:py-14 text-center bg-black text-white relative">
        <div className="relative z-10 page-container">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2.5 sm:mb-3 tracking-tight">Let&apos;s Build Your Next IT Infrastructure Together.</h2>
          <p className="text-zinc-400 text-xs sm:text-sm md:text-base mb-5 sm:mb-6 max-w-3xl mx-auto font-normal">From a single laptop to enterprise-wide digital transformation, Authentic Infosystem is your trusted technology partner.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md sm:max-w-none mx-auto">
            <a href="/#contact" className="w-full sm:w-auto px-6 sm:px-7 py-2.5 sm:py-3 bg-white text-black hover:bg-zinc-200 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm">
              Schedule a Consultation
            </a>
            <a href="https://wa.me/919643990077" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-6 sm:px-7 py-2.5 sm:py-3 bg-zinc-900 border border-zinc-700 text-white rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm hover:bg-zinc-800 transition-all">
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
