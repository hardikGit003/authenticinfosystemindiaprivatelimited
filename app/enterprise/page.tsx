"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/shared/PageHero";
import SectionHeader from "../components/shared/SectionHeader";
import { motion, AnimatePresence } from "framer-motion";

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
      <section className="py-20 page-container border-b border-white/10 bg-white/5">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          {[
            { label: "Projects", value: "500+" },
            { label: "Enterprise Clients", value: "120+" },
            { label: "Brands", value: "25+" },
            { label: "Support", value: "24×7" },
            { label: "Years Experience", value: "10+" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-24 page-container border-b border-white/5">
        <SectionHeader title="Industries We Empower" align="center" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {['Startups', 'SMEs', 'Large Enterprises', 'Educational Institutions', 'Healthcare', 'Manufacturing', 'Government', 'Retail Chains'].map((industry, i) => (
            <div key={i} className="glass-card p-8 text-center hover:bg-blue-600/10 transition-colors cursor-pointer border border-white/5 hover:border-blue-500/30">
              <h4 className="text-lg font-bold">{industry}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Our Services */}
      <section className="py-24 page-container">
        <SectionHeader title="Enterprise IT Services" subtitle="Comprehensive solutions to manage your entire technology lifecycle." />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-12">
          {['IT Procurement', 'Annual IT Supply', 'Asset Management', 'Deployment', 'Cloud Consulting', 'Networking', 'AMC Services', 'Onsite Support', 'Software Licensing', 'Device Lifecycle'].map((service, i) => (
            <div key={i} className="glass-panel p-6 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 text-blue-400 text-xl">
                ⚙
              </div>
              <h4 className="font-semibold text-sm">{service}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Procurement Process */}
      <section className="py-24 bg-white/5 page-container">
        <SectionHeader title="Streamlined Procurement Process" align="center" />
        <div className="relative mt-16 max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-500/20 via-blue-500 to-blue-500/20 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 relative z-10">
            {['Requirement', 'Consultation', 'Vendor Select', 'Quotation', 'Approval', 'Delivery', 'Deployment', 'Support'].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-black border-2 border-blue-500 rounded-full flex items-center justify-center text-xs font-bold mb-3 shadow-[0_0_10px_rgba(37,99,235,0.4)]">
                  {i + 1}
                </div>
                <span className="text-xs font-semibold text-gray-300">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Inquiry Form */}
      <section className="py-24 page-container border-b border-white/10" id="contact">
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          <div>
            <SectionHeader title="Request a Custom Quote" subtitle="Partner with us for reliable, scalable, and cost-effective IT infrastructure." />
            <div className="mt-8 space-y-6 text-gray-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-xl">📧</div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Email Us</p>
                  <p className="font-medium text-lg">b2b@authenticinfosystem.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-xl">📞</div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Call Us</p>
                  <p className="font-medium text-lg">+91 83038 11370</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 md:p-10">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Company Name</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors" placeholder="Acme Corp" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Business Email</label>
                  <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors" placeholder="you@company.com" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Phone Number</label>
                  <input type="tel" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors" placeholder="+91 xxxxx xxxxx" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Company Size</label>
                  <select className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors appearance-none">
                    <option>1-50 Employees</option>
                    <option>51-200 Employees</option>
                    <option>201-500 Employees</option>
                    <option>500+ Employees</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Products/Services Interested In</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors" placeholder="Laptops, Networking, AMC..." />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Message Details</label>
                <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors" placeholder="Tell us about your project requirements..."></textarea>
              </div>

              <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-colors mt-4">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 page-container">
        <SectionHeader title="Our Leadership Vision" align="center" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[
            { quote: "Our technological infrastructure is built on a foundation of innovation and absolute reliability. We are committed to pushing the boundaries of what enterprise IT can achieve.", author: "Saurabh Rai", role: "Chief Technology Officer (CTO)" },
            { quote: "Security and strategic growth are at the core of our operations. We prioritize providing our clients with robust security solutions that give them complete peace of mind.", author: "Sourav Sharma", role: "Chief Security Officer (CSO)" },
            { quote: "We deeply understand our clients' unique challenges and translate them into impactful, market-leading solutions that drive true business transformation.", author: "Hardik Prajapati", role: "Chief Marketing Officer (CMO)" },
          ].map((testi, i) => (
            <div key={i} className="glass-panel p-8 relative">
              <div className="text-5xl text-blue-500/30 absolute top-4 left-6">"</div>
              <p className="text-gray-300 relative z-10 leading-relaxed italic mb-8 mt-4">{testi.quote}</p>
              <div className="border-t border-white/10 pt-4">
                <h4 className="font-bold text-white">{testi.author}</h4>
                <p className="text-xs text-gray-400">{testi.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brands Carousel (Placeholder) */}
      <section className="py-16 bg-white/5 border-y border-white/10 overflow-hidden">
        <div className="page-container">
           <p className="text-center text-sm font-semibold uppercase tracking-widest text-gray-400 mb-8">Authorized Partners</p>
           <div className="flex justify-between items-center opacity-50 grayscale gap-8 overflow-x-auto scrollbar-hide">
             {['Dell', 'HP', 'Lenovo', 'Cisco', 'Microsoft', 'Acer', 'Asus', 'Intel', 'AMD'].map((brand, i) => (
               <div key={i} className="text-2xl font-bold font-sans shrink-0 px-4">{brand}</div>
             ))}
           </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 page-container">
        <SectionHeader title="Frequently Asked Questions" align="center" />
        <div className="max-w-3xl mx-auto mt-12 space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-6 py-5 text-left flex justify-between items-center font-semibold focus:outline-none"
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
                    className="px-6 pb-5 text-gray-400 text-sm leading-relaxed"
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
      <section className="py-32 text-center bg-[url('/placeholder-hero.jpg')] bg-cover bg-center relative border-t border-white/10">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0"></div>
        <div className="relative z-10 page-container">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Let's Build Your Next IT Infrastructure Together.</h2>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-3xl mx-auto font-light">From a single laptop to enterprise-wide digital transformation, Authentic Infosystem is your trusted technology partner.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              Schedule a Consultation
            </button>
            <button className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-bold hover:bg-white/20 transition-all backdrop-blur-md">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
