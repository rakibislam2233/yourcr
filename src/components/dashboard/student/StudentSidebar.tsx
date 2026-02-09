"use client";

import logo from "@/assets/logo/logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  Calendar,
  ChevronDown,
  ClipboardList,
  Home,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const menuItems = [
  {
    icon: Home,
    label: "Gateway",
    href: "/dashboard/student",
    subItems: [
      { label: "Home Overview", href: "/dashboard/student" },
      { label: "Performance", href: "/dashboard/student/performance" },
    ],
  },
  {
    icon: BookOpen,
    label: "Study Hub",
    subItems: [
      { label: "My Subjects", href: "/dashboard/student/subjects" },
      { label: "Materials", href: "/dashboard/student/subjects/materials" },
    ],
  },
  {
    icon: ClipboardList,
    label: "Exercises",
    subItems: [
      { label: "Assignments", href: "/dashboard/student/assessments" },
      { label: "Results", href: "/dashboard/student/results" },
    ],
  },
  {
    icon: Calendar,
    label: "Planning",
    subItems: [
      { label: "Routine", href: "/dashboard/student/routine" },
      { label: "Attendance", href: "/dashboard/student/attendance" },
    ],
  },
  {
    icon: Video,
    label: "Live Connect",
    subItems: [
      { label: "Live Classes", href: "/dashboard/student/classes" },
      { label: "Notices", href: "/dashboard/student/notices" },
    ],
  },
];

const StudentSidebar: React.FC = () => {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = React.useState<string[]>([]);
  const { state, setOpen, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed" && !isMobile;

  const isActive = (href: string) => {
    if (href === "/dashboard/student") return pathname === href;
    return (
      pathname === href ||
      (href !== "/dashboard/student" && pathname?.startsWith(href + "/"))
    );
  };

  const isGroupActive = (item: (typeof menuItems)[0]) => {
    return (
      item.subItems?.some((sub) => isActive(sub.href)) ||
      (item.href ? isActive(item.href) : false)
    );
  };

  React.useEffect(() => {
    const activeGroup = menuItems.find(
      (group) =>
        group.subItems?.some((sub) => pathname === sub.href) ||
        (group.href && pathname === group.href),
    );
    if (activeGroup && !openGroups.includes(activeGroup.label)) {
      setOpenGroups((prev) => [...prev, activeGroup.label]);
    }
  }, [pathname, openGroups]);

  const toggleGroup = (label: string) => {
    if (isCollapsed) {
      setOpen(true);
      if (!openGroups.includes(label)) {
        setOpenGroups((prev) => [...prev, label]);
      }
    } else {
      setOpenGroups((prev) =>
        prev.includes(label)
          ? prev.filter((l) => l !== label)
          : [...prev, label],
      );
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-gray-200 bg-white shadow-none transition-all duration-300"
    >
      <div className="flex flex-col h-full overflow-x-hidden">
        <SidebarHeader
          className={`p-[25px] border-b border-gray-100 flex flex-col justify-center items-center gap-5 shrink-0 transition-all`}
        >
          <Link href="/" className="flex items-center gap-4 px-2">
            {isCollapsed ? (
              <div className="w-12 h-12 bg-emerald-600 rounded-md flex items-center justify-center text-white font-bold text-lg shrink-0 transition-all">
                ST
              </div>
            ) : (
              <Image
                src={logo}
                alt="YourCR Logo"
                width={140}
                height={80}
                className="w-40 transition-all"
              />
            )}
          </Link>
        </SidebarHeader>

        <SidebarContent className="p-3 no-scrollbar flex-1">
          <SidebarMenu className="space-y-1.5">
            {menuItems.map((item) => {
              const groupActive = isGroupActive(item);
              const exactActive = item.href ? isActive(item.href) : false;
              const isOpen = openGroups.includes(item.label) && !isCollapsed;

              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    onClick={() => toggleGroup(item.label)}
                    tooltip={
                      isCollapsed
                        ? {
                            children: item.label,
                            className:
                              "bg-emerald-600 text-white border-emerald-600 font-bold text-[14px] px-5 py-2.5",
                          }
                        : undefined
                    }
                    className={`w-full transition-all font-bold text-sm flex items-center gap-5 ${
                      isCollapsed ? "h-16 justify-center" : "h-14 px-4"
                    } ${
                      exactActive && !item.subItems
                        ? "bg-emerald-600 text-white"
                        : groupActive
                          ? "text-emerald-600 bg-emerald-50"
                          : "text-gray-600 active:bg-emerald-50"
                    } rounded-md`}
                  >
                    <item.icon
                      className={`shrink-0 transition-all ${isCollapsed ? "size-9" : "size-8"}`}
                    />
                    {!isCollapsed && (
                      <span className="flex-1 text-left">{item.label}</span>
                    )}
                    {!isCollapsed && item.subItems && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </SidebarMenuButton>

                  {isOpen && item.subItems && (
                    <div className="mt-1.5 ml-5 border-l-2 border-emerald-100/60 pl-4 py-1.5 space-y-1.5">
                      {item.subItems.map((sub) => {
                        const activeSub = isActive(sub.href);
                        return (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className={`flex items-center h-11 px-4 rounded-md text-[13px] font-bold transition-all relative ${
                              activeSub
                                ? "bg-emerald-600 text-white"
                                : "text-gray-500 active:bg-gray-50"
                            }`}
                          >
                            {!activeSub && (
                              <div
                                className={`absolute -left-[17px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-white bg-gray-300 transition-all`}
                              />
                            )}
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
      </div>
    </Sidebar>
  );
};

export default StudentSidebar;
