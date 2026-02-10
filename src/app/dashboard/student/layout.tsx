import StudentHeader from "@/components/dashboard/student/StudentHeader";
import StudentSidebar from "@/components/dashboard/student/StudentSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getMyProfile } from "@/services/user.service";

export default async function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMyProfile();
  return (
    <SidebarProvider
      style={{ "--sidebar-width": "19rem" } as React.CSSProperties}
    >
      <div className="flex min-h-screen w-full bg-white">
        <StudentSidebar user={user} />
        <SidebarInset className="flex flex-col bg-white overflow-hidden">
          <StudentHeader />
          <main className="flex-1 overflow-y-auto pt-6 pb-20 px-6">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
          <footer className="h-12 flex items-center justify-center border-t border-gray-100 bg-white">
            <p className="text-sm font-bold text-gray-400">
              © {new Date().getFullYear()} YourCR Student Portal
            </p>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
