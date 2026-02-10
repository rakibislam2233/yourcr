"use client";
import { UserProfile } from "@/interface/user.interface";
import { cn } from "@/lib/utils";
import { logoutUser } from "@/services/auth.service";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface NavbarMobileMenuProps {
  user: UserProfile | null;
  navLinks: { href: string; label: string }[];
  dashboardHref: string;
}

const NavbarMobileMenu: React.FC<NavbarMobileMenuProps> = ({
  user,
  navLinks,
  dashboardHref,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      router.push("/auth/login");
      router.refresh();
    } catch {
      toast.error("Failed to logout");
    }
  };

  const isActiveLink = (href: string) => {
    if (href === "/") return pathName === "/";
    return pathName?.startsWith(href);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 top-[65px] bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
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
                {user ? (
                  <>
                    <Link href={dashboardHref}>
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
                    <Link href="/auth/login">
                      <Button
                        variant="outline"
                        className="w-full h-11 border-primary text-primary"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/cr-register">
                      <Button className="w-full h-11">Register as CR</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NavbarMobileMenu;
