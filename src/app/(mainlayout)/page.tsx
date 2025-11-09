import HeroSection from "@/components/pages/Home/HeroSection";
import HowItWorks from "@/components/pages/Home/HowItWorks";
import StatsSection from "@/components/pages/Home/StatsSection";
import TestimonialsCarousel from "@/components/pages/Home/TestimonialsCarousel";
import WhyChooseUs from "@/components/pages/Home/WhyChooseUs";

export default function HomePage() {
  return (
    <section>
      <HeroSection />
      <WhyChooseUs />
      <HowItWorks />
      <StatsSection />
      <TestimonialsCarousel />
    </section>
  );
}
