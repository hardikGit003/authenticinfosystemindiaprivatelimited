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
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />

      <PageHero
        title="End-to-End IT Procurement for Modern Enterprises."
        subtitle="Authentic Infosystem delivers complete technology procurement, deployment, asset lifecycle management, and IT infrastructure solutions for organizations across India."
        miniText="B2B ENTERPRISE SOLUTIONS"
        primaryButtonText="Schedule Consultation"
        secondaryButtonText="Request Proposal"
      />

      {/* Statistics Section */}
      <section className="py-12 sm:py-16 page-container border-b border-white/10 bg-white/5">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 text-center">
          {[
            { label: "Projects", value: "500+" },
            { label: "Enterprise Clients", value: "120+" },
            { label: "Brands", value: "25+" },
            { label: "Support", value: "24×7" },
            { label: "Years Experience", value: "10+" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-500 mb-1 sm:mb-2">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-12 sm:py-16 page-container border-b border-white/5">
        <SectionHeader title="Industries We Empower" align="center" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
          {['Startups', 'SMEs', 'Large Enterprises', 'Educational Institutions', 'Healthcare', 'Manufacturing', 'Government', 'Retail Chains'].map((industry, i) => (
            <div key={i} className="glass-card p-5 sm:p-7 text-center hover:bg-blue-600/10 transition-colors cursor-pointer border border-white/5 hover:border-blue-500/30">
              <h4 className="text-base sm:text-lg font-bold">{industry}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Our Services */}
      <section className="py-12 sm:py-16 page-container">
        <SectionHeader title="Enterprise IT Services" subtitle="Comprehensive solutions to manage your entire technology lifecycle." />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-6">
          {enterpriseServices.map((service, i) => (
            <a
              key={i}
              href={`https://wa.me/919643990077?text=${encodeURIComponent(`Hi, I am interested in ${service.title} enterprise services from Authentic Infosystem.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-[20px] overflow-hidden min-h-[140px] sm:min-h-[150px] flex items-center justify-center p-4 border border-white/10 shadow-[0_6px_24px_rgba(0,0,0,0.35)] cursor-pointer group hover:shadow-[0_10px_35px_rgba(77,163,255,0.25)] hover:border-blue-500/40 hover:-translate-y-1.5 transition-all duration-300 block"
            >
              {/* Background Image */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Light Vignette / Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

              {/* Centered Heading with White Text */}
              <h4 className="relative z-10 text-white font-semibold text-xs sm:text-sm text-center px-2 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,1)] [text-shadow:_0_2px_12px_rgba(0,0,0,0.95)] group-hover:text-blue-100 group-hover:scale-105 transition-all duration-300">
                {service.title}
              </h4>
            </a>
          ))}
        </div>
      </section>

      {/* Procurement Process */}
      <section className="py-12 sm:py-16 bg-white/5 page-container">
        <SectionHeader title="Streamlined Procurement Process" align="center" />
        <div className="relative mt-8 sm:mt-10 max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-500/20 via-blue-500 to-blue-500/20 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 relative z-10">
            {['Requirement', 'Consultation', 'Vendor Select', 'Quotation', 'Approval', 'Delivery', 'Deployment', 'Support'].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-black border-2 border-blue-500 rounded-full flex items-center justify-center text-xs font-bold mb-2 sm:mb-3 shadow-[0_0_10px_rgba(37,99,235,0.4)]">
                  {i + 1}
                </div>
                <span className="text-xs font-semibold text-gray-300">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Inquiry Form */}
      <section className="py-12 sm:py-16 page-container border-b border-white/10" id="contact">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          <div>
            <SectionHeader title="Request a Custom Quote" subtitle="Partner with us for reliable, scalable, and cost-effective IT infrastructure." />
            <div className="mt-6 space-y-4 sm:space-y-6 text-gray-300">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-full flex items-center justify-center text-lg sm:text-xl">📧</div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Email Us</p>
                  <p className="font-medium text-base sm:text-lg">b2b@authenticinfosystem.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-full flex items-center justify-center text-lg sm:text-xl">📞</div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Call Us</p>
                  <p className="font-medium text-base sm:text-lg">+91 9643990077</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 sm:p-8 md:p-10">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Company Name</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 sm:py-3 text-sm focus:border-blue-500 outline-none transition-colors" placeholder="Acme Corp" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Business Email</label>
                  <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 sm:py-3 text-sm focus:border-blue-500 outline-none transition-colors" placeholder="you@company.com" value={businessEmail} onChange={(e) => setBusinessEmail(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Phone Number</label>
                  <input type="tel" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 sm:py-3 text-sm focus:border-blue-500 outline-none transition-colors" placeholder="+91 xxxxx xxxxx" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Company Size</label>
                  <select className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 sm:py-3 text-sm focus:border-blue-500 outline-none transition-colors appearance-none" value={companySize} onChange={(e) => setCompanySize(e.target.value)}>
                    <option>1-50 Employees</option>
                    <option>51-200 Employees</option>
                    <option>201-500 Employees</option>
                    <option>500+ Employees</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Products/Services Interested In</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 sm:py-3 text-sm focus:border-blue-500 outline-none transition-colors" placeholder="Laptops, Networking, AMC..." value={productsInterested} onChange={(e) => setProductsInterested(e.target.value)} />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Message Details</label>
                <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 sm:py-3 text-sm focus:border-blue-500 outline-none transition-colors" placeholder="Tell us about your project requirements..." value={messageDetails} onChange={(e) => setMessageDetails(e.target.value)}></textarea>
              </div>

              <button type="submit" className="w-full py-3.5 sm:py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-sm sm:text-base transition-colors mt-2">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 page-container">
        <SectionHeader title="Our Leadership Vision" align="center" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
          {[
            { quote: "Our technological infrastructure is built on a foundation of innovation and absolute reliability. We are committed to pushing the boundaries of what enterprise IT can achieve.", author: "Vikas Verma", role: "Chief Technology Officer (CTO)" },
            { quote: "Security and strategic growth are at the core of our operations. We prioritize providing our clients with robust security solutions that give them complete peace of mind.", author: "Ankit Singh", role: "Chief Security Officer (CSO)" },
            { quote: "We deeply understand our clients' unique challenges and translate them into impactful, market-leading solutions that drive true business transformation.", author: "Chesta Sharma", role: "Chief Marketing Officer (CMO)" },
          ].map((testi, i) => (
            <div key={i} className="glass-panel p-6 sm:p-8 relative">
              <div className="text-4xl text-blue-500/30 absolute top-3 left-4">"</div>
              <p className="text-gray-300 relative z-10 leading-relaxed italic text-sm sm:text-base mb-6 mt-2">{testi.quote}</p>
              <div className="border-t border-white/10 pt-3 sm:pt-4">
                <h4 className="font-bold text-white text-sm sm:text-base">{testi.author}</h4>
                <p className="text-xs text-gray-400">{testi.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brands Carousel (Placeholder) */}
      <section className="py-10 sm:py-12 bg-white/5 border-y border-white/10 overflow-hidden">
        <div className="page-container">
           <p className="text-center text-xs sm:text-sm font-semibold uppercase tracking-widest text-gray-400 mb-6">Authorized Partners</p>
           <div className="flex justify-between items-center opacity-50 grayscale gap-6 sm:gap-8 overflow-x-auto scrollbar-hide">
             {['Dell', 'HP', 'Lenovo', 'Cisco', 'Microsoft', 'Acer', 'Asus', 'Intel', 'AMD'].map((brand, i) => (
               <div key={i} className="text-xl sm:text-2xl font-bold font-sans shrink-0 px-3 sm:px-4">{brand}</div>
             ))}
           </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 page-container">
        <SectionHeader title="Frequently Asked Questions" align="center" />
        <div className="max-w-3xl mx-auto mt-6 space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center font-semibold text-sm sm:text-base focus:outline-none"
              >
                {faq.q}
                <span className={`transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 sm:px-6 pb-4 sm:pb-5 text-gray-400 text-xs sm:text-sm leading-relaxed"
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
      <section className="py-14 sm:py-20 text-center bg-[url('/placeholder-hero.jpg')] bg-cover bg-center relative border-t border-white/10">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0"></div>
        <div className="relative z-10 page-container">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 tracking-tight">Let's Build Your Next IT Infrastructure Together.</h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-3xl mx-auto font-light">From a single laptop to enterprise-wide digital transformation, Authentic Infosystem is your trusted technology partner.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              Schedule a Consultation
            </button>
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-white/10 border border-white/20 text-white rounded-full font-bold text-sm hover:bg-white/20 transition-all backdrop-blur-md">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
