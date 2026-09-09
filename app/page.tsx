import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ConfigurationSection from "./components/ConfigurationSection";
import BrandsSection from "./components/BrandsSection";
import WhyChooseUs from "./components/WhyChooseUs";
import ContactSection from "./components/ContactSection";
import FinalSection from "./components/FinalSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <AboutSection />

      <ServicesSection />

      <ConfigurationSection />

      <BrandsSection />

      <WhyChooseUs />

      <ContactSection />

      <FinalSection />

      <Footer />
    </main>
  );
}