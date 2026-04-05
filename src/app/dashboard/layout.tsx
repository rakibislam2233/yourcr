import CrHeader from "@/components/dashboard/cr/CrHeader";
import CrSidebar from "@/components/dashboard/cr/CrSidebar";
import StudentHeader from "@/components/dashboard/student/StudentHeader";
import StudentSidebar from "@/components/dashboard/student/StudentSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getMyProfile } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMyProfile();

  if (!user) {
    redirect("/auth/login");
  }

  const isCR = user.role === "CR";
  const isStudent = user.role === "STUDENT";

  // If user is neither CR nor STUDENT, or you want to handle ADMIN differently, you can redirect or handle it here
  if (!isCR && !isStudent) {
    redirect("/auth/login"); // Or wherever you want to route non-allowed roles
  }

  return (
    <SidebarProvider
      style={{ "--sidebar-width": "19rem" } as React.CSSProperties}
    >
      <div className="flex min-h-screen w-full bg-white">
        {isCR ? <CrSidebar /> : <StudentSidebar user={user} />}
        
        <SidebarInset className="flex flex-col bg-white overflow-hidden">
          {isCR ? <CrHeader /> : <StudentHeader />}
          
          <main className="flex-1 overflow-y-auto pt-6 pb-20 px-6">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
          
          <footer className="h-12 flex items-center justify-center border-t border-gray-100 bg-white">
            <p className="text-sm font-bold text-gray-400">
              © {new Date().getFullYear()} All rights reserved by YourCR {isStudent && "Student Portal"}
            </p>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
