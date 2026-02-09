"use client";

import logo from "@/assets/logo/logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useUser } from "@/providers/UserProvider";
import {
  Bell,
  BookOpen,
  Building2,
  Calendar,
  LayoutDashboard,
  MessageSquare,
  School,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const menuGroups = [
  {
    label: "Main Menu",
    items: [
      {
        icon: LayoutDashboard,
        label: "Dashboard",
        href: "/dashboard/cr",
      },
      {
        icon: Building2,
        label: "Institution",
        href: "/dashboard/cr/institution",
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        icon: Users,
        label: "Teachers",
        href: "/dashboard/cr/teachers",
      },
      {
        icon: Users,
        label: "Students",
        href: "/dashboard/cr/students",
      },
      {
        icon: BookOpen,
        label: "Subjects",
        href: "/dashboard/cr/subjects",
      },
      {
        icon: School,
        label: "Classes",
        href: "/dashboard/cr/classes",
      },
    ],
  },
  {
    label: "Academic",
    items: [
      {
        icon: Calendar,
        label: "Routine",
        href: "/dashboard/cr/routine",
      },
      {
        icon: BookOpen,
        label: "Assessments",
        href: "/dashboard/cr/assessments",
      },
      {
        icon: Bell,
        label: "Notices",
        href: "/dashboard/cr/notices",
      },
    ],
  },
  {
    label: "Support & Account",
    items: [
      {
        icon: MessageSquare,
        label: "Issues",
        href: "/dashboard/cr/issues",
      },
      {
        icon: User,
        label: "Profile",
        href: "/dashboard/cr/profile",
      },
    ],
  },
];

const CrSidebar: React.FC = () => {
  const pathname = usePathname();
  const { state, isMobile } = useSidebar();
  const { user } = useUser();
  const isCollapsed = state === "collapsed" && !isMobile;

  const isActive = (href: string) => {
    if (!href) return false;
    if (href === "/dashboard/cr") return pathname === href;
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200 bg-white">
      <div className="flex flex-col h-full">
        {/* Header - Logo */}
        <SidebarHeader
          className={cn(
            "h-20 border-b border-gray-100 flex  justify-center items-center transition-all",
          )}
        >
          <Link href="/" className="flex items-center">
            {isCollapsed ? (
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center text-white font-bold text-lg">
                CR
              </div>
            ) : (
              <Image
                src={logo}
                alt="YourCR Logo"
                width={130}
                height={100}
                className="w-32"
                priority
              />
            )}
          </Link>
        </SidebarHeader>

        {/* Content */}
        <SidebarContent className="flex-1 py-2 px-3 overflow-y-auto no-scrollbar">
          {menuGroups.map((group) => (
            <SidebarGroup key={group.label}>
              {!isCollapsed && (
                <SidebarGroupLabel className="px-3 mb-2 border-b rounded-none border-gray-200 font-semibold  tracking-widest text-gray-400">
                  {group.label}
                </SidebarGroupLabel>
              )}
              <SidebarMenu className="space-y-1">
                {group.items.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <SidebarMenuItem key={item.label}>
                      <Link href={item.href} className="w-full block">
                        <SidebarMenuButton
                          tooltip={isCollapsed ? item.label : undefined}
                          className={cn(
                            "w-full h-11  cursor-pointer flex items-center rounded-md transition-none",
                            isCollapsed ? "justify-center p-0" : "px-3 gap-3",
                            active
                              ? "bg-primary text-white hover:bg-primary hover:text-white"
                              : "text-gray-600 bg-transparent hover:bg-gray-100 hover:text-gray-600",
                          )}
                        >
                          <item.icon
                            className={cn(
                              "shrink-0",
                              isCollapsed ? "size-6" : "size-6",
                              active ? "text-white" : "text-gray-400",
                            )}
                          />
                          {!isCollapsed && (
                            <span className="text-sm font-semibold truncate leading-none">
                              {item.label}
                            </span>
                          )}
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>

        {/* Footer - User Context */}
        {!isCollapsed && (
          <SidebarFooter className="p-4 border-t border-gray-100 bg-gray-50/30">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                Institution
              </p>
              <p className="text-xs font-bold text-gray-900 truncate">
                {user?.institution?.name || "N/A"}
              </p>
            </div>
            <div className="mt-3 space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                Batch & Dept.
              </p>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded">
                  {user?.currentBatch?.name || "N/A"}
                </span>
                <span className="text-[10px] font-semibold text-gray-500 truncate">
                  {user?.currentBatch?.department || "N/A"}
                </span>
              </div>
            </div>
          </SidebarFooter>
        )}
      </div>
    </Sidebar>
  );
};

export default CrSidebar;
