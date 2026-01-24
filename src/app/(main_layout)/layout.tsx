import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import React, { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
