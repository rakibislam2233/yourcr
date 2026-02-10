"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label }) => {
  const pathName = usePathname();

  const isActiveLink = (href: string) => {
    if (href === "/") return pathName === "/";
    return pathName?.startsWith(href);
  };

  return (
    <Link
      href={href}
      className={cn(
        "relative px-5 py-2 rounded-md text-sm font-medium transition-all duration-200",
        {
          "bg-primary text-white": isActiveLink(href),
          "text-gray-700 hover:bg-gray-100": !isActiveLink(href),
        },
      )}
    >
      {label}
    </Link>
  );
};

export default NavLink;
