import RecentIssues from "@/components/dashboard/student/RecentIssues";
import { MessageSquare } from "lucide-react";
import React from "react";
import PageHeader from "../shared/PageHeader";
import SubmitIssueForm from "./SubmitIssueForm";

const SubmitIssue: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Submit Issue"
        description="Report an issue or request to your Class Representative"
        icon={<MessageSquare />}
        breadcrumbs={[
          { label: "Home", href: "/dashboard/student" },
          { label: "Submit Issue" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SubmitIssueForm />
        </div>

        <div>
          <RecentIssues />
          <TipsCard />
        </div>
      </div>
    </div>
  );
};

const TipsCard = () => (
  <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6 mt-6">
    <h4 className="font-semibold text-gray-900 mb-3">
      Tips for Submitting Issues
    </h4>
    <ul className="space-y-2 text-sm text-gray-600">
      <li className="flex items-start gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
        Be specific and clear about your issue
      </li>
      <li className="flex items-start gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
        Select the appropriate category
      </li>
      <li className="flex items-start gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
        Set priority based on urgency
      </li>
      <li className="flex items-start gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
        Check your previous issues before submitting
      </li>
    </ul>
  </div>
);

export default SubmitIssue;
