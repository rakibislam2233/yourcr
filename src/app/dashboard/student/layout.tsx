import StudentSidebar from "@/components/dashboard/student/StudentSidebar";
import StudentHeader from "@/components/dashboard/student/StudentHeader";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <StudentSidebar />
      <div className="flex-1 flex flex-col lg:ml-0">
        <StudentHeader />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
