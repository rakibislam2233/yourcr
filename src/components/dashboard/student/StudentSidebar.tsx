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
import { logoutUser } from "@/services/auth.service";
import {
  Bell,
  BookOpen,
  Building2,
  Calendar,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  School,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuGroups = [
  {
    label: "Main Menu",
    items: [
      {
        icon: LayoutDashboard,
        label: "Dashboard",
        href: "/dashboard/student",
      },
      {
        icon: Building2,
        label: "Institution",
        href: "/dashboard/student/institution",
      },
    ],
  },
  {
    label: "Academic Info",
    items: [
      {
        icon: Users,
        label: "Teachers",
        href: "/dashboard/student/teachers",
      },
      {
        icon: BookOpen,
        label: "Subjects",
        href: "/dashboard/student/subjects",
      },
      {
        icon: School,
        label: "Classes",
        href: "/dashboard/student/classes",
      },
    ],
  },
  {
    label: "Learning",
    items: [
      {
        icon: Calendar,
        label: "Routine",
        href: "/dashboard/student/routine",
      },
      {
        icon: BookOpen,
        label: "Assessments",
        href: "/dashboard/student/assessments",
      },
      {
        icon: Bell,
        label: "Notices",
        href: "/dashboard/student/notices",
      },
    ],
  },
  {
    label: "Preferences",
    items: [
      {
        icon: MessageSquare,
        label: "Issues",
        href: "/dashboard/student/issues",
      },
      {
        icon: User,
        label: "Profile",
        href: "/dashboard/student/profile",
      },
    ],
  },
];

const StudentSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { state, isMobile } = useSidebar();
  const { user, loading } = useUser();
  const isCollapsed = state === "collapsed" && !isMobile;

  const isActive = (href: string) => {
    if (!href) return false;
    if (href === "/dashboard/student") return pathname === href;
    return pathname === href || pathname?.startsWith(href + "/");
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

  return (
    <Sidebar collapsible="icon" className="border-r border-emerald-50 bg-white">
      <div className="flex flex-col h-full">
        {/* Header - Logo */}
        <SidebarHeader
          className={cn(
            "h-20 border-b border-emerald-50 flex justify-center items-center transition-all",
          )}
        >
          <Link href="/" className="flex items-center">
            {isCollapsed ? (
              <div className="w-10 h-10 bg-emerald-600 rounded-md flex items-center justify-center text-white font-bold text-lg shadow-sm">
                ST
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
        <SidebarContent className="flex-1 py-4 px-3 overflow-y-auto no-scrollbar">
          {menuGroups.map((group) => (
            <SidebarGroup key={group.label} className="mb-4 last:mb-0">
              {!isCollapsed && (
                <SidebarGroupLabel className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
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
                            "w-full h-10 cursor-pointer flex items-center rounded-md transition-all active:scale-[0.98]",
                            isCollapsed ? "justify-center" : "px-3 gap-3",
                            active
                              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                              : "text-gray-500 hover:bg-emerald-50 hover:text-emerald-700",
                          )}
                        >
                          <item.icon
                            className={cn(
                              "shrink-0",
                              isCollapsed ? "size-6" : "size-5",
                              active ? "text-white" : "text-emerald-400",
                            )}
                          />
                          {!isCollapsed && (
                            <span className="text-sm font-semibold tracking-tight">
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

        {/* Footer - User Profile */}
        <SidebarFooter className="p-4 border-t border-emerald-50">
          <div
            className={cn(
              "flex items-center gap-3",
              isCollapsed ? "justify-center" : "px-2",
            )}
          >
            <Avatar className="h-9 w-9 rounded-md border border-emerald-100">
              <AvatarImage src={user?.profileImage} alt={user?.fullName} />
              <AvatarFallback className="bg-emerald-600 text-white text-xs font-bold rounded-md">
                {user?.fullName
                  ?.split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2) || "ST"}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {loading ? "Loading..." : user?.fullName || "Student Account"}
                </p>
                <p className="text-[10px] font-semibold text-emerald-500 truncate uppercase tracking-tighter">
                  {user?.email || "student.portal@yourcr.com"}
                </p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button
              onClick={handleLogout}
              className="mt-4 w-full h-10 flex items-center gap-3 px-3 rounded-md text-red-500 font-bold text-sm hover:bg-red-50 transition-colors active:scale-95 group"
            >
              <LogOut className="size-5 group-hover:translate-x-0.5 transition-transform" />
              Sign Out
            </button>
          )}
          {isCollapsed && (
            <button
              onClick={handleLogout}
              className="mt-4 h-10 w-full flex items-center justify-center rounded-md text-red-500 hover:bg-red-50 transition-colors"
              title="Sign Out"
            >
              <LogOut className="size-6" />
            </button>
          )}
        </SidebarFooter>
      </div>
    </Sidebar>
  );
};

export default StudentSidebar;
