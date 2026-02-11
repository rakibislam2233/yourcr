import StudentIssuesList from "@/components/dashboard/cr/StudentIssuesList";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { getAllIssues } from "@/services/issue.service";
import { MessageSquare } from "lucide-react";

export default async function CrIssuesPage() {
  const res = await getAllIssues();
  const initialIssues = res.data || [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Issues"
        description="View and manage student issues and requests"
        icon={<MessageSquare className="w-6 h-6" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Student Issues" },
        ]}
      />
      <StudentIssuesList initialIssues={initialIssues} />
    </div>
  );
}
