"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useUser } from "@/providers/UserProvider";
import { Bell, ChevronDown, LogOut, Search, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import { motion } from "framer-motion";

const StudentHeader: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useUser();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/auth/login");
    } catch {
      toast.error("Failed to logout");
    }
  };

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
            className={`text-[10px] font-bold tracking-wider uppercase ${isLast ? "text-gray-900" : "text-gray-400"}`}
          >
            {label}
          </span>
        </span>
      );
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full h-20 shrink-0 bg-white border-b border-gray-100 px-6 flex items-center justify-between gap-4">
      {/* Left: Nav & Context */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-9 w-9 rounded-md border border-gray-200 transition-all hover:bg-gray-50 active:scale-95" />
        <div className="h-4 w-px bg-gray-200 hidden sm:block" />
        <nav className="hidden sm:flex items-center">
          {generateBreadcrumbs()}
        </nav>
      </div>

      {/* Center: Search Portal - Clean & Minimalist */}
      <div className="flex-1 max-w-sm hidden md:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 group-focus-within:text-emerald-600 transition-colors" />
          <input
            type="text"
            placeholder="Search portal..."
            className="w-full h-10 bg-emerald-50/20 border border-emerald-100 rounded-md pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Right: Personal & Notifications */}
      <div className="flex items-center gap-3">
        <button className="h-9 w-9 flex items-center justify-center text-gray-400 rounded-md hover:bg-emerald-50 hover:text-emerald-700 border border-transparent hover:border-emerald-100 transition-all active:scale-95 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-emerald-500 rounded-full border border-white" />
        </button>

        <div className="w-px h-6 bg-gray-100 mx-1 hidden sm:block" />

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-md border border-transparent hover:border-emerald-50 hover:bg-emerald-50/50 cursor-pointer transition-all active:scale-98 group">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-gray-900 leading-tight">
                  {loading ? "Loading..." : user?.fullName || "Student"}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">
                  Student
                </span>
              </div>
              <Avatar className="size-10 rounded-full border border-emerald-200 shadow-sm transition-transform group-hover:scale-105">
                <AvatarImage
                  src={user?.profileImage || "https://github.com/shadcn.png"}
                  alt={user?.fullName || "Student"}
                />
                <AvatarFallback className="bg-emerald-600 text-white text-xs font-bold rounded-full uppercase">
                  {user?.fullName
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .slice(0, 2) || "ST"}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 mt-2 p-0 border-none shadow-none bg-transparent overflow-visible"
          >
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white rounded-xl border border-gray-100 shadow-xl p-1 overflow-hidden"
            >
              <DropdownMenuLabel className="px-2 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                Student Account
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/student/profile")}
                className="px-2 py-2.5 text-sm font-semibold text-gray-700 focus:bg-emerald-600 focus:text-white rounded-lg cursor-pointer flex items-center gap-2 transition-colors"
              >
                <User className="w-4 h-4" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-50" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="px-2 py-2.5 text-sm font-bold text-red-600 focus:bg-red-50 focus:text-red-600 rounded-lg cursor-pointer flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </DropdownMenuItem>
            </motion.div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default StudentHeader;
