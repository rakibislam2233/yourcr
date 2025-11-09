import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Copyright,
} from "lucide-react";
import Link from "next/link";
import logo from "@/assets/logo/logo.png";
import Image from "next/image";
const Footer = () => {
  const quickLinks = [
    "Home",
    "About Us",
    "Contact Us",
    "FAQ",
    "Privacy Policy",
    "Terms of Condition",
  ];

  const socialLinks = [
    {
      Icon: Facebook,
      href: "https://facebook.com",
      hover: "hover:bg-primary",
    },
    {
      Icon: Instagram,
      href: "https://instagram.com",
      hover: "hover:bg-pink-600",
    },
    { Icon: Twitter, href: "https://x.com", hover: "hover:bg-black" },
    {
      Icon: Linkedin,
      href: "https://linkedin.com",
      hover: "hover:bg-primary",
    },
  ];

  return (
    <footer className="relative w-full bg-[#1E293B] text-white overflow-hidden">
      {/* Gradient Circles Background */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <div className="absolute -left-10 top-1/2  size-56 bg-gradient-to-t from-[#3A4050] to-[#1E293B] rounded-full "></div>
        <div className="absolute right-16 top-20 size-16 bg-gradient-to-r from-[#6D788B] to-[#1E293B] rounded-full "></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left: Logo + Description */}
          <div className="space-y-6">
            <div>
              <Link
                href="/"
                className="flex items-center space-x-2 text-xl font-bold"
              >
                <Image src={logo} alt="logo" width={160} height={100} />
              </Link>
            </div>

            <p className="text-2xl font-semibold text-white">
              Smart Classroom Management for Every CR
            </p>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              OUR CR helps Class Representatives manage students, classes,
              notices, and assignments all in one easy-to-use platform — built
              for better communication and organization.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <Link
                    href={
                      link === "Home"
                        ? "/"
                        : `/${link.toLowerCase().replace(/\s+/g, "-")}`
                    }
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm block"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Social + Copyright */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Follow Us On</h4>
              <div className="flex gap-4">
                {socialLinks.map(({ Icon, href, hover }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl ${hover}`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Copyright className="w-4 h-4" />
              <span>2025 OUR CR. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
