import UserDropdown from "@/components/common/UserDropdown";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getMyProfile } from "@/services/user.service";
import { Bell, Search } from "lucide-react";
import Breadcrumbs from "../shared/Breadcrumbs";

const CrHeader = async () => {
  const user = await getMyProfile();
  return (
    <header className="sticky top-0 z-40 w-full h-20 shrink-0 bg-white border-b border-gray-100 px-6 flex items-center justify-between gap-4">
      {/* Left: Nav & Context */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-9 w-9 rounded-md border border-gray-200 transition-all hover:bg-gray-50 active:scale-95" />
        <div className="h-4 w-px bg-gray-200 hidden sm:block" />
        <Breadcrumbs />
      </div>

      {/* Center: Search - Clean & Minimalist */}
      <div className="flex-1 max-w-sm hidden md:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full h-10 bg-gray-50/50 border border-gray-200 rounded-md pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Right: Personal & Notifications */}
      <div className="flex items-center gap-3">
        <button className="h-9 w-9 flex items-center justify-center text-gray-400 rounded-md hover:bg-gray-50 hover:text-gray-900 border border-transparent hover:border-gray-100 transition-all active:scale-95 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
        </button>

        <div className="w-px h-6 bg-gray-100 mx-1 hidden sm:block" />

        {user && <UserDropdown user={user} dashboardHref="/dashboard/cr" />}
      </div>
    </header>
  );
};

export default CrHeader;
