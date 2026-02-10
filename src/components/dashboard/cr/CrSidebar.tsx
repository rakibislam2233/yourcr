"use client";
import logo from "@/assets/logo/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import NextImage from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

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

import { UserProfile } from "@/interface/user.interface";

interface CrSidebarProps {
  user: UserProfile | null;
}

const CrSidebar: React.FC<CrSidebarProps> = ({ user }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { state, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed" && !isMobile;

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      router.push("/auth/login");
    } catch {
      toast.error("Failed to logout");
    }
  };

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
              <NextImage
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
                              isCollapsed ? "size-8" : "size-6",
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

        {/* Footer - User Profile */}
        <SidebarFooter className="p-4 border-t border-gray-50">
          <div
            className={cn(
              "flex items-center gap-3",
              isCollapsed ? "justify-center" : "px-2",
            )}
          >
            <Avatar className="h-9 w-9 rounded-md border border-gray-100">
              <AvatarImage src={user?.profileImage} alt={user?.fullName} />
              <AvatarFallback className="bg-primary text-white text-xs font-bold rounded-md uppercase">
                {user?.fullName
                  ?.split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2) || "CR"}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {user?.fullName || "CR Portal"}
                </p>
                <p className="text-[10px] font-semibold text-primary truncate uppercase tracking-tighter">
                  {user?.email || "cr.admin@yourcr.com"}
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

export default CrSidebar;
