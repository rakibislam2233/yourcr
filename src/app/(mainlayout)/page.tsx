import HeroSection from "@/components/pages/Home/HeroSection";
import HowItWorks from "@/components/pages/Home/HowItWorks";
import WhyChooseUs from "@/components/pages/Home/WhyChooseUs";

export default function HomePage() {
  return (
    <section>
      <HeroSection />
      <WhyChooseUs />
      <HowItWorks />
    </section>
  );
}
