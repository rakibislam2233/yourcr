import UserDropdown from "@/components/common/UserDropdown";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getMyProfile } from "@/services/user.service";
import { Bell } from "lucide-react";
import Breadcrumbs from "../shared/Breadcrumbs";

const CrHeader = async () => {
  const user = await getMyProfile();
  return (
    <header className="sticky top-0 z-40 w-full h-20 shrink-0 bg-white border-b border-gray-100 px-6 flex items-center justify-between gap-4">
      {/* Left: Nav & Context */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="size-10 text-primary rounded-md border border-primary transition-all hover:bg-primary/10 cursor-pointer" />
        <div className="h-4 w-px bg-gray-200 hidden sm:block" />
        <Breadcrumbs />
      </div>

      {/* Right: Personal & Notifications */}
      <div className="flex items-center gap-3">
        <button className="size-10 text-primary rounded-md border border-primary transition-all hover:bg-primary/10 cursor-pointer flex justify-center items-center relative">
          <Bell className="size-5" />
          <span className="absolute top-2 right-2.5 size-2 bg-red-500 rounded-full border border-white" />
        </button>

        {user && <UserDropdown user={user} dashboardHref="/dashboard/cr" />}
      </div>
    </header>
  );
};

export default CrHeader;
