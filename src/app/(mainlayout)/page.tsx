import CTA from "@/pages/Home/CTA";
import HeroSection from "@/pages/Home/HeroSection";
import HowItWorks from "@/pages/Home/HowItWorks";
import StatsSection from "@/pages/Home/StatsSection";
import TestimonialsCarousel from "@/pages/Home/TestimonialsCarousel";
import WhyChooseUs from "@/pages/Home/WhyChooseUs";

export default function HomePage() {
  return (
    <section>
      <HeroSection />
      <WhyChooseUs />
      <HowItWorks />
      <StatsSection />
      <TestimonialsCarousel />
      <CTA />
    </section>
  );
}
