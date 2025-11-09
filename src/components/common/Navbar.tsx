"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import logo from "@/assets/logo/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

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

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    {
      href: "/contact-us",
      label: "Contact Us",
    },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathName === "/";
    }
    return pathName.startsWith(href);
  };

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        {
          "bg-background/80 backdrop-blur-lg border-border ": isScrolled,
          "bg-transparent border-transparent": !isScrolled,
        }
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-5 py-5">
        <div className="flex justify-between items-center ">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href="/"
              className="flex items-center space-x-2 text-xl font-bold"
            >
              <Image src={logo} alt="logo" width={160} height={100} />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-5">
            {navLinks.map((link, index) => {
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "relative block px-5 py-2 rounded-md text-sm font-medium transition-all duration-200",
                      {
                        "bg-primary text-white": isActiveLink(link.href),
                        "text-primary hover:bg-accent": !isActiveLink(
                          link.href
                        ),
                      }
                    )}
                  >
                    {isActiveLink(link.href) && (
                      <motion.div
                        className="absolute inset-0 bg-primary/10 rounded-md"
                        layoutId="activeNavLink"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10 text-base">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-5">
              <Link href="/auth">
                <Button
                  variant="outline"
                  size="lg"
                  className="cursor-pointer h-12 px-10 border border-primary text-primary bg-transparent hover:bg-transparent"
                >
                  Login
                </Button>
              </Link>
              <Link href="/auth/cr-register">
                <Button
                  variant="default"
                  size="lg"
                  className="cursor-pointer h-12 px-6"
                >
                  Register as CR
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-foreground hover:text-primary hover:bg-accent"
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background border-t border-border"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "block px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      {
                        "text-primary bg-primary/10": isActiveLink(link.href),
                        "text-foreground hover:text-primary hover:bg-accent":
                          !isActiveLink(link.href),
                      }
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="border-t border-border pt-3">
                <div className="space-y-3">
                  <Link
                    href="/auth/cr-login"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full cursor-pointer h-12"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link
                    href="/auth/cr-register"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="default" size="lg" className="w-full h-12">
                      Register Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
