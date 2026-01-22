"use client";
import logo from "@/assets/logo/logo.png";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathName]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathName === "/";
    }
    return pathName.startsWith(href);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        {
          "bg-background/80 backdrop-blur-lg ": isScrolled,
          "bg-transparent border-transparent": !isScrolled,
        }
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="YourCR Logo" width={140} height={80} className="w-32 sm:w-40" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  {
                    "bg-primary text-white": isActiveLink(link.href),
                    "text-gray-700 hover:bg-gray-100": !isActiveLink(link.href),
                  }
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-5">
            <Link href="/auth/login">
              <Button
                variant="outline"
                size="default"
                className="h-10 sm:h-11 px-5 sm:px-6 border-primary text-primary hover:bg-primary/5 cursor-pointer"
              >
                Login
              </Button>
            </Link>
            <Link href="/auth/cr-register">
              <Button size="default" className="h-10 sm:h-11 px-5 sm:px-6 cursor-pointer">
                Register as CR
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 top-[65px] bg-black/20 z-40"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Content */}
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    {
                      "text-primary bg-primary/10": isActiveLink(link.href),
                      "text-gray-700 hover:bg-gray-100": !isActiveLink(link.href),
                    }
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
                <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full h-11 border-primary text-primary">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/cr-register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full h-11">
                    Register as CR
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
