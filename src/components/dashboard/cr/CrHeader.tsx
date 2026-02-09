"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, ChevronDown, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

const CrHeader: React.FC = () => {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    if (!pathname) return null;
    const paths = pathname.split("/").filter((p) => p);
    return paths.slice(0, 3).map((path, index) => {
      const label =
        path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
      const isLast = index === paths.length - 1;

      return (
        <span key={index} className="flex items-center">
          {index > 0 && <span className="text-gray-300 mx-2">/</span>}
          <span
            className={`text-xs font-bold ${isLast ? "text-gray-900" : "text-gray-400"}`}
          >
            {label}
          </span>
        </span>
      );
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full h-20 shrink-0 bg-white border-b border-gray-200 px-4 flex items-center justify-between gap-4">
      {/* Left: Nav & Context */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-8 w-8 rounded-md border border-gray-200 transition-none" />
        <div className="h-4 w-px bg-gray-200 hidden sm:block" />
        <nav className="hidden sm:flex items-center">
          {generateBreadcrumbs()}
        </nav>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-9 bg-gray-50 border border-gray-200 rounded-md pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-none"
          />
        </div>
      </div>

      {/* Right: Personal */}
      <div className="flex items-center gap-2">
        <button className="p-2 text-gray-400 rounded-md transition-none active:bg-gray-100">
          <Bell className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block" />
        <div className="flex items-center gap-2 px-2 py-1 rounded-md border border-transparent active:bg-gray-50 cursor-pointer">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-bold text-gray-900">Rakib Ahmed</span>
            <span className="text-[10px] text-gray-400">Admin</span>
          </div>
          <Avatar className="h-8 w-8 rounded-md border border-gray-200">
            <AvatarImage src="/avatar-placeholder.png" alt="User" />
            <AvatarFallback className="bg-primary text-white text-[10px] font-bold rounded-md">
              RA
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default CrHeader;
