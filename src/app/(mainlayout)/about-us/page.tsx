import AboutHero from "@/components/pages/AboutUs/AboutHero";
import AboutStats from "@/components/pages/AboutUs/AboutStats";
import MissionVision from "@/components/pages/AboutUs/MissionVision";
import WhyChooseAbout from "@/components/pages/AboutUs/WhyChooseAbout";
import React from "react";

const page = () => {
  return (
    <section>
      <AboutHero />
      <AboutStats />
      <MissionVision />
      <WhyChooseAbout />
    </section>
  );
};

export default page;
