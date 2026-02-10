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
import { UserProfile } from "@/interface/user.interface";
import { cn } from "@/lib/utils";
import { logoutUser } from "@/services/auth.service";
import { motion } from "framer-motion";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface UserDropdownProps {
  user: UserProfile;
  dashboardHref: string;
  theme?: "default" | "emerald";
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  user,
  dashboardHref,
  theme = "default",
}) => {
  const router = useRouter();

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

  const isEmerald = theme === "emerald";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-md border border-transparent cursor-pointer transition-all group">
          {isEmerald && (
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-gray-900 leading-tight">
                {user?.fullName || "Student"}
              </span>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">
                Student
              </span>
            </div>
          )}
          <Avatar
            className={cn(
              "size-10 rounded-full border shadow-sm transition-transform group-hover:scale-105",
              isEmerald ? "border-emerald-200" : "border-gray-200",
            )}
          >
            <AvatarImage
              src={user?.profileImage || "https://github.com/shadcn.png"}
              alt={user?.fullName || "User"}
            />
            <AvatarFallback
              className={cn(
                "text-white text-xs font-bold rounded-full uppercase",
                isEmerald ? "bg-emerald-600" : "bg-primary",
              )}
            >
              {user?.fullName
                ?.split(" ")
                .map((n: string) => n[0])
                .join("")
                .slice(0, 2) || "UR"}
            </AvatarFallback>
          </Avatar>
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 text-gray-400 group-hover:text-gray-900 transition-transform duration-200 group-data-[state=open]:rotate-180",
              isEmerald && "group-hover:text-emerald-600",
            )}
          />
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
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="bg-white rounded-md border border-gray-100 shadow-md p-1 overflow-hidden"
        >
          <DropdownMenuLabel className="px-2 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">
            {isEmerald ? "Student Account" : "My Account"}
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(dashboardHref)}
            className={cn(
              "px-2 py-2.5 text-sm font-semibold text-gray-700 rounded-lg cursor-pointer flex items-center gap-2 transition-colors focus:text-white",
              isEmerald ? "focus:bg-emerald-600" : "focus:bg-primary",
            )}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`${dashboardHref}/profile`)}
            className={cn(
              "px-2 py-2.5 text-sm font-semibold text-gray-700 rounded-lg cursor-pointer flex items-center gap-2 transition-colors focus:text-white",
              isEmerald ? "focus:bg-emerald-600" : "focus:bg-primary",
            )}
          >
            <UserIcon className="w-4 h-4" />
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
  );
};

export default UserDropdown;
