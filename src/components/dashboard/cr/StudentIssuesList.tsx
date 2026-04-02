"use client";

import { Button } from "@/components/ui/button";
import { Issue } from "@/interface/issue.interface";
import {
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Clock,
  Filter,
  MessageCircle,
  Search,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const getStatusConfig = (status: string) => {
  switch (status) {
    case "NEW":
      return {
        icon: AlertCircle,
        color: "text-red-600",
        bg: "bg-red-100",
        label: "New",
      };
    case "IN_PROGRESS":
      return {
        icon: Clock,
        color: "text-orange-600",
        bg: "bg-orange-100",
        label: "In Progress",
      };
    case "RESOLVED":
      return {
        icon: CheckCircle,
        color: "text-green-600",
        bg: "bg-green-100",
        label: "Resolved",
      };
    case "CLOSED":
      return {
        icon: XCircle,
        color: "text-gray-600",
        bg: "bg-gray-100",
        label: "Closed",
      };
    default:
      return {
        icon: AlertCircle,
        color: "text-gray-600",
        bg: "bg-gray-100",
        label: status,
      };
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "HIGH":
    case "URGENT":
      return "bg-red-100 text-red-700";
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-700";
    case "LOW":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

interface StudentIssuesListProps {
  initialIssues: Issue[];
}

const StudentIssuesList: React.FC<StudentIssuesListProps> = ({
  initialIssues,
}) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIssues = initialIssues.filter((issue) => {
    const matchesFilter =
      activeFilter === "all" || issue.status === activeFilter;
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const newCount = initialIssues.filter(
    (i) => i.status === "NEW",
  ).length;
  const inProgressCount = initialIssues.filter(
    (i) => i.status === "IN_PROGRESS",
  ).length;
  const resolvedCount = initialIssues.filter(
    (i) => i.status === "RESOLVED",
  ).length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Total Issues</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {initialIssues.length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">New</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{newCount}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">In Progress</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">
            {inProgressCount}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Resolved</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {resolvedCount}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {[
            { value: "all", label: "All Issues" },
            { value: "NEW", label: "New" },
            { value: "IN_PROGRESS", label: "In Progress" },
            { value: "RESOLVED", label: "Resolved" },
            { value: "CLOSED", label: "Closed" },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter.value
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No issues found</p>
          </div>
        ) : (
          filteredIssues.map((issue) => {
            const statusConfig = getStatusConfig(issue.status);
            const date = new Date(issue.createdAt).toLocaleDateString();

            return (
              <Link key={issue.id} href={`/dashboard/cr/issues/${issue.id}`}>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white font-semibold flex-shrink-0">
                      I
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                              {issue.title}
                            </h3>
                            <span
                              className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusConfig.bg} ${statusConfig.color}`}
                            >
                              {statusConfig.label}
                            </span>
                            <span
                              className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPriorityColor(
                                issue.priority,
                              )}`}
                            >
                              {issue.priority.charAt(0).toUpperCase() +
                                issue.priority.slice(1).toLowerCase()}
                            </span>
                          </div>
                          <p className="text-gray-600 mt-2 line-clamp-2">
                            {issue.description}
                          </p>
                          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {date}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default StudentIssuesList;
