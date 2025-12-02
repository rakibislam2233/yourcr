"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  BookOpen,
  Users,
  Calendar,
  UserPlus,
  Video,
  Bell,
  ClipboardList,
  MessageSquare,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import Image from "next/image";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard/cr",
  },
  {
    icon: Building2,
    label: "My Institution",
    href: "/dashboard/cr/institution",
  },
  {
    icon: BookOpen,
    label: "Manage Subjects",
    href: "/dashboard/cr/subjects",
  },
  {
    icon: Users,
    label: "Manage Teachers",
    href: "/dashboard/cr/teachers",
  },
  {
    icon: Calendar,
    label: "Manage Routine",
    href: "/dashboard/cr/routine",
  },
  {
    icon: UserPlus,
    label: "Manage Students",
    href: "/dashboard/cr/students",
  },
  {
    icon: Video,
    label: "Manage Classes",
    href: "/dashboard/cr/classes",
  },
  {
    icon: Bell,
    label: "Manage Notices",
    href: "/dashboard/cr/notices",
  },
  {
    icon: ClipboardList,
    label: "Manage Assessments",
    href: "/dashboard/cr/assessments",
  },
  {
    icon: MessageSquare,
    label: "Student Issues",
    href: "/dashboard/cr/issues",
  },
  {
    icon: Settings,
    label: "Profile Settings",
    href: "/dashboard/cr/profile",
  },
];

const CrSidebar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard/cr") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <>
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-44 h-10 mx-auto">
            <Image
              src="/logo.png"
              alt="YourCR Logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-4 rounded transition-colors ${
                    active
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      active ? "text-white" : "text-gray-500"
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                  {active && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-72 bg-white border-r border-gray-100 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <>
          <div
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
          />
          <aside className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white z-50 flex flex-col shadow-2xl">
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
};

export default CrSidebar;
