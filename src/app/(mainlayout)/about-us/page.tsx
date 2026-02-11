import AboutCTA from "@/components/aboutUs/AboutCTA";
import AboutHero from "@/components/aboutUs/AboutHero";
import AboutPurpose from "@/components/aboutUs/AboutPurpose";
import WhyChooseAbout from "@/components/aboutUs/WhyChooseAbout";

const page = () => {
  return (
    <main className="w-full bg-white">
      {/* Hero Section */}
      <AboutHero />
      {/* Our Purpose Section */}
      <AboutPurpose />
      {/* Why Choose Us */}
      <WhyChooseAbout />
      {/* CTA Section */}
      <AboutCTA />
    </main>
  );
};

export default page;
