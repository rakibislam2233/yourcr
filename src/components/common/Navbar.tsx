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
  const { user, loading, logout } = useUser();
  const router = useRouter();

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
    return pathName?.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await logout();
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
          "bg-background/80 backdrop-blur-lg ": isScrolled,
          "bg-transparent border-transparent": !isScrolled,
        },
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="YourCR Logo"
              width={140}
              height={80}
              className="w-32 sm:w-40"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {navLinks?.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-5 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  {
                    "bg-primary text-white": isActiveLink(link.href),
                    "text-gray-700 hover:bg-gray-100": !isActiveLink(link.href),
                  },
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons - Conditional Rendering */}
          <div className="hidden md:flex items-center gap-5">
            {!loading && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="flex flex-col text-right">
                      <span className="text-sm font-bold text-gray-900 leading-tight">
                        {user.fullName}
                      </span>
                      <span className="text-[10px] font-bold text-primary uppercase">
                        {user.role}
                      </span>
                    </div>
                    <Avatar className="h-10 w-10 rounded-full border-2 border-primary/20 group-hover:border-primary transition-colors">
                      <AvatarImage
                        src={
                          user.profileImage || "https://github.com/shadcn.png"
                        }
                      />
                      <AvatarFallback className="bg-primary text-white font-bold">
                        {user.fullName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push(getDashboardHref())}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push(`${getDashboardHref()}/profile`)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
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
                  <Button
                    size="default"
                    className="h-10 sm:h-11 px-5 sm:px-6 cursor-pointer"
                  >
                    Register as CR
                  </Button>
                </Link>
              </>
            )}
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
                      "text-gray-700 hover:bg-gray-100": !isActiveLink(
                        link.href,
                      ),
                    },
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
                {!loading && user ? (
                  <>
                    <Link
                      href={getDashboardHref()}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="w-full h-11 border-primary text-primary mb-2"
                      >
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      className="w-full h-11 text-red-600 font-bold hover:bg-red-50"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="w-full h-11 border-primary text-primary"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link
                      href="/auth/cr-register"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button className="w-full h-11">Register as CR</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
