import CTA from "@/components/home/CTA";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import WhyChooseUs from "@/components/home/WhyChooseUs";

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
