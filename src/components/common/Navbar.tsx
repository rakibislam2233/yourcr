"use client";
import logo from "@/assets/logo/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useUser } from "@/providers/UserProvider";
import { logoutUser } from "@/services/auth.service";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, loading } = useUser();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    return pathName?.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const getDashboardHref = () => {
    if (user?.role === "CR") return "/dashboard/cr";
    if (user?.role === "STUDENT") return "/dashboard/student";
    return "/dashboard";
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        {
          "bg-white/90 backdrop-blur-lg border-gray-100 shadow-sm": isScrolled,
          "bg-transparent border-transparent": !isScrolled,
        },
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center active:scale-95 transition-transform"
          >
            <Image
              src={logo}
              alt="YourCR Logo"
              width={130}
              height={70}
              className="w-28 sm:w-32"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-gray-50/50 p-1 rounded-lg border border-gray-100/50">
            {navLinks?.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-bold transition-all duration-200",
                  {
                    "bg-white text-primary shadow-sm": isActiveLink(link.href),
                    "text-gray-500 hover:text-gray-900": !isActiveLink(
                      link.href,
                    ),
                  },
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons / Profile */}
          <div className="hidden md:flex items-center gap-4">
            {!loading && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-md border border-gray-100 bg-white hover:bg-gray-50 cursor-pointer transition-all active:scale-98 group shadow-sm">
                    <div className="flex flex-col text-right">
                      <span className="text-xs font-bold text-gray-900 leading-tight">
                        {user.fullName || "User Account"}
                      </span>
                      <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">
                        {user.role}
                      </span>
                    </div>
                    <Avatar className="h-8 w-8 rounded-md border border-gray-100 shadow-sm group-hover:scale-105 transition-transform">
                      <AvatarImage src={user.profileImage} />
                      <AvatarFallback className="bg-primary text-white text-[10px] font-bold rounded-md">
                        {user.fullName
                          ?.split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase() || "CR"}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 mt-2 rounded-md border-gray-100 shadow-xl p-1"
                >
                  <DropdownMenuLabel className="px-2 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Quick Access
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => router.push(getDashboardHref())}
                    className="px-2 py-2 text-sm font-bold text-gray-700 rounded-md hover:bg-gray-50 cursor-pointer flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4 text-gray-400" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push(`${getDashboardHref()}/profile`)}
                    className="px-2 py-2 text-sm font-bold text-gray-700 rounded-md hover:bg-gray-50 cursor-pointer flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-gray-400" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-50" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="px-2 py-2 text-sm font-bold text-red-600 rounded-md hover:bg-red-50 cursor-pointer flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/auth/login">
                  <Button
                    variant="ghost"
                    className="text-sm font-bold text-gray-700 hover:text-primary hover:bg-transparent"
                  >
                    Log In
                  </Button>
                </Link>
                <Link href="/auth/cr-register">
                  <Button className="h-10 px-6 font-bold rounded-md shadow-lg shadow-primary/20 active:scale-95 transition-all">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-6 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-center h-11 rounded-lg text-sm font-bold transition-all",
                    {
                      "text-primary bg-primary/5 border border-primary/10":
                        isActiveLink(link.href),
                      "text-gray-600 border border-transparent": !isActiveLink(
                        link.href,
                      ),
                    },
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-6">
              {!loading && user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Avatar className="h-10 w-10 rounded-md border border-gray-200">
                      <AvatarImage src={user.profileImage} />
                      <AvatarFallback className="bg-primary text-white font-bold rounded-md">
                        {user.fullName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900">
                        {user.fullName}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <Link href={getDashboardHref()} className="block">
                    <Button
                      variant="outline"
                      className="w-full h-11 border-gray-200 font-bold"
                    >
                      Go to Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full h-11 text-red-600 font-bold hover:bg-red-50 hover:text-red-700"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link href="/auth/login">
                    <Button
                      variant="outline"
                      className="w-full h-11 border-gray-200 font-bold"
                    >
                      Log In
                    </Button>
                  </Link>
                  <Link href="/auth/cr-register">
                    <Button className="w-full h-11 font-bold">Join Now</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
