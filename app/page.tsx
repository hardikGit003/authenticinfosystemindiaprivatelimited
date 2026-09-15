import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Iphone18ProAdSection from "./components/Iphone18ProAdSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ConfigurationSection from "./components/ConfigurationSection";
import BrandsSection from "./components/BrandsSection";
import WhyChooseUs from "./components/WhyChooseUs";
import ContactSection from "./components/ContactSection";
import FinalSection from "./components/FinalSection";
import ProvideSection from "./components/ProvideSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      {/* iPhone 18 Pro Advertisement & Pre-Order Showcase */}
      <Iphone18ProAdSection />

      <AboutSection />

      <ServicesSection />

      <ConfigurationSection />

      <BrandsSection />

      <WhyChooseUs />

      <ContactSection />

      <FinalSection />

      <ProvideSection />

      <Footer />
    </main>
  );
}