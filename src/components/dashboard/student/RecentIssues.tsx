"use client";

import { AlertCircle, CheckCircle, ChevronRight, Clock } from "lucide-react";

const previousIssues = [
  {
    id: 1,
    title: "Project Deadline Extension Request",
    status: "resolved",
    date: "2 days ago",
    response: "Extended to Dec 10",
  },
  {
    id: 2,
    title: "Attendance Record Correction",
    status: "resolved",
    date: "5 days ago",
    response: "Corrected",
  },
  {
    id: 3,
    title: "Lab Equipment Issue",
    status: "in_progress",
    date: "1 week ago",
    response: "Being addressed",
  },
];

const RecentIssues = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Your Recent Issues
      </h3>
      <div className="space-y-4">
        {previousIssues.map((issue) => (
          <div
            key={issue.id}
            className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {issue.status === "resolved" ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                  )}
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      issue.status === "resolved"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {issue.status === "resolved" ? "Resolved" : "In Progress"}
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 mt-2 text-sm">
                  {issue.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {issue.date}
                </p>
                {issue.response && (
                  <p className="text-xs text-primary mt-2">
                    Response: {issue.response}
                  </p>
                )}
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentIssues;
