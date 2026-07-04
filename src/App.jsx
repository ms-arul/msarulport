import { Routes, Route } from "react-router-dom";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import ServicesSection from "./components/sections/ServicesSection";
import WorkSection from "./components/sections/WorkSection";
import TestimonialsSection from "./components/sections/TestimonialsSection";
import ContactSection from "./components/sections/ContactSection";
import SectionDivider from "./components/sections/SectionDivider";
import ScrollDots from "./components/sections/ScrollDots";
import ScrollToTop from "./components/sections/ScrollToTop";
import ReviewPage from "./components/ReviewPage";

const Home = () => {
  return (
    <div className="single-page-scroll">
      <ScrollDots />
      <ScrollToTop />

      <HeroSection />

      <SectionDivider number="02" label="About" color="#61DAFB" />
      <AboutSection />

      <SectionDivider number="03" label="Services" color="#FBBF24" />
      <ServicesSection />

      <SectionDivider number="04" label="Work" color="#34D399" />
      <WorkSection />

      <SectionDivider number="05" label="Testimonials" color="#A78BFA" />
      <TestimonialsSection />

      <SectionDivider number="06" label="Contact" color="#F24E1E" />
      <ContactSection />
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/review" element={<ReviewPage />} />
    </Routes>
  );
};

export default App;
