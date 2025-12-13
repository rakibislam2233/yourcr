import AboutHero from "@/components/pages/AboutUs/AboutHero";
import AboutStats from "@/components/pages/AboutUs/AboutStats";
import AboutUs from "@/components/pages/AboutUs/AboutUs";
import MissionVision from "@/components/pages/AboutUs/MissionVision";
import WhyChooseAbout from "@/components/pages/AboutUs/WhyChooseAbout";
import React from "react";

const page = () => {
  return (
    <>
      <AboutHero />
      <AboutStats />
      <MissionVision />
      <WhyChooseAbout />
    </>
  );
};

export default page;
