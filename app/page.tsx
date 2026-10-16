import Navbar from "./components/Navbar";
import FeaturedShowcaseGrid from "./components/FeaturedShowcaseGrid";
import Hero from "./components/Hero";
import BenQSmartBoardBanner from "./components/BenQSmartBoardBanner";
import Iphone18ProAdSection from "./components/Iphone18ProAdSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ConfigurationSection from "./components/ConfigurationSection";
import BrandsSection from "./components/BrandsSection";
import WhyChooseUs from "./components/WhyChooseUs";
import ContactSection from "./components/ContactSection";
import FinalSection from "./components/FinalSection";
import CustomerReviewsSection from "./components/CustomerReviewsSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* 1. First Look: 6-Card Advertising Showcase (BenQ, Logitech, LOQ Laptop, 18 Pro Series, Customize Your PC, Accessories) */}
      <FeaturedShowcaseGrid />

      {/* 2. Intro Section (Hero with Video Background & Company Introduction) */}
      <Hero />

      {/* BenQ Smart Board Top Banner Showcase */}
      <BenQSmartBoardBanner />

      {/* iPhone 18 Pro Advertisement & Pre-Order Showcase */}
      <Iphone18ProAdSection />

      <AboutSection />

      <ServicesSection />

      <ConfigurationSection />

      <BrandsSection />

      <WhyChooseUs />

      <FinalSection />

      {/* What Customer Say About Us - Google Reviews Showcase */}
      <CustomerReviewsSection />

      <ContactSection />

      <Footer />
    </main>
  );
}