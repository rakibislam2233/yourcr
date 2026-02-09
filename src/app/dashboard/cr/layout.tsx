import CrHeader from "@/components/dashboard/cr/CrHeader";
import CrSidebar from "@/components/dashboard/cr/CrSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function CrDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={{ "--sidebar-width": "19rem" } as React.CSSProperties}
    >
      <div className="flex min-h-screen w-full bg-white">
        <CrSidebar />
        <SidebarInset className="flex flex-col bg-white overflow-hidden">
          <CrHeader />
          <main className="flex-1 overflow-y-auto pt-6 pb-20 px-6">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
          <footer className="h-12 flex items-center justify-center border-t border-gray-100 bg-white">
            <p className="text-sm font-bold text-gray-400">
              © {new Date().getFullYear()} YourCR Management Systems
            </p>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
