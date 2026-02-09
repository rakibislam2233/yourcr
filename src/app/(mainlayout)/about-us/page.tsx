import AboutCTA from "@/pages/AboutUs/AboutCTA";
import AboutHero from "@/pages/AboutUs/AboutHero";
import AboutPurpose from "@/pages/AboutUs/AboutPurpose";
import WhyChooseAbout from "@/pages/AboutUs/WhyChooseAbout";

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
