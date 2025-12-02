"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Bell,
  Calendar,
  ClipboardList,
  Video,
  BookOpen,
  Users,
  Building2,
  MessageSquare,
  User,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import Image from "next/image";

const menuItems = [
  {
    icon: Home,
    label: "Home",
    href: "/dashboard/student",
  },
  {
    icon: Bell,
    label: "Notices",
    href: "/dashboard/student/notices",
  },
  {
    icon: Calendar,
    label: "Routine",
    href: "/dashboard/student/routine",
  },
  {
    icon: ClipboardList,
    label: "Assessments",
    href: "/dashboard/student/assessments",
  },
  {
    icon: Video,
    label: "Classes",
    href: "/dashboard/student/classes",
  },
  {
    icon: BookOpen,
    label: "Subjects",
    href: "/dashboard/student/subjects",
  },
  {
    icon: Users,
    label: "Teachers",
    href: "/dashboard/student/teachers",
  },
  {
    icon: Building2,
    label: "My Institute",
    href: "/dashboard/student/institution",
  },
  {
    icon: MessageSquare,
    label: "Submit Issue",
    href: "/dashboard/student/issues",
  },
  {
    icon: User,
    label: "My Profile",
    href: "/dashboard/student/profile",
  },
];

const StudentSidebar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard/student") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <>
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image
              src="/logo.png"
              alt="YourCR Logo"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary">YourCR</h1>
            <p className="text-xs text-gray-500">Student Portal</p>
          </div>
        </Link>
      </div>

      {/* Student Badge */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-3 px-3 py-2.5 bg-emerald-50 rounded-xl">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <User className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Student</p>
            <p className="text-xs text-gray-500">View Access</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    active
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                      active ? "text-white" : "text-gray-500"
                    }`}
                  />
                  <span className="font-medium text-sm">{item.label}</span>
                  {active && (
                    <motion.div
                      layoutId="studentActiveIndicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                    />
                  )}
                </Link>
              </motion.li>
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
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white z-50 flex flex-col shadow-2xl"
            >
              <button
                onClick={() => setIsMobileOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default StudentSidebar;
