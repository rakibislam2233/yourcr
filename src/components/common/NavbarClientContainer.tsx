"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface NavbarClientContainerProps {
  children: React.ReactNode;
}

const NavbarClientContainer: React.FC<NavbarClientContainerProps> = ({
  children,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        {
          "bg-white border-gray-100": isScrolled,
          "bg-transparent border-transparent": !isScrolled,
        },
      )}
    >
      {children}
    </nav>
  );
};

export default NavbarClientContainer;
