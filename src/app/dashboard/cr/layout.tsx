import CrSidebar from "@/components/dashboard/cr/CrSidebar";
import CrHeader from "@/components/dashboard/cr/CrHeader";

export default function CrDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <CrSidebar />
      <div className="flex-1 flex flex-col lg:ml-0">
        <CrHeader />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
