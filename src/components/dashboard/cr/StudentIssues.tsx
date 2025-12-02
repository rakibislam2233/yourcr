"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Search,
  Filter,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  XCircle,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import PageHeader from "../shared/PageHeader";
import { Button } from "@/components/ui/button";

const issues = [
  {
    id: 1,
    title: "Exam Hall Allocation Issue",
    description: "The exam hall assigned for Database exam is too small for our batch. Please consider reallocating to a larger hall.",
    student: "Sakib Hasan",
    studentId: "CT-8001",
    date: "2 hours ago",
    status: "open",
    priority: "high",
    responses: 2,
    avatar: "SH",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Lab Equipment Not Working",
    description: "Several computers in Lab 102 are not functioning properly. This is affecting our practical sessions.",
    student: "Nadia Islam",
    studentId: "CT-8003",
    date: "5 hours ago",
    status: "in_progress",
    priority: "medium",
    responses: 3,
    avatar: "NI",
    color: "bg-purple-500",
  },
  {
    id: 3,
    title: "Request for Extra Class",
    description: "Can we have an extra class for Computer Networks before the exam? Many students are struggling with the routing concepts.",
    student: "Fahim Rahman",
    studentId: "CT-8002",
    date: "1 day ago",
    status: "open",
    priority: "medium",
    responses: 1,
    avatar: "FR",
    color: "bg-green-500",
  },
  {
    id: 4,
    title: "Project Deadline Extension",
    description: "Requesting an extension for the Software Engineering project deadline due to overlapping with other exams.",
    student: "Tanvir Ahmed",
    studentId: "CT-8004",
    date: "2 days ago",
    status: "resolved",
    priority: "low",
    responses: 4,
    avatar: "TA",
    color: "bg-orange-500",
  },
  {
    id: 5,
    title: "Attendance Record Correction",
    description: "My attendance for the last week shows absent but I was present in all classes. Please verify and correct.",
    student: "Sadia Khan",
    studentId: "CT-8007",
    date: "3 days ago",
    status: "resolved",
    priority: "low",
    responses: 2,
    avatar: "SK",
    color: "bg-amber-500",
  },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "open":
      return {
        icon: AlertCircle,
        color: "text-red-600",
        bg: "bg-red-100",
        label: "Open",
      };
    case "in_progress":
      return {
        icon: Clock,
        color: "text-orange-600",
        bg: "bg-orange-100",
        label: "In Progress",
      };
    case "resolved":
      return {
        icon: CheckCircle,
        color: "text-green-600",
        bg: "bg-green-100",
        label: "Resolved",
      };
    default:
      return {
        icon: XCircle,
        color: "text-gray-600",
        bg: "bg-gray-100",
        label: "Closed",
      };
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700";
    case "medium":
      return "bg-yellow-100 text-yellow-700";
    case "low":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const StudentIssues: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredIssues = issues.filter((issue) => {
    if (activeFilter === "all") return true;
    return issue.status === activeFilter;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Issues"
        description="View and manage student issues and requests"
        icon={MessageSquare}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Student Issues" },
        ]}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-5 border border-gray-100"
        >
          <p className="text-sm text-gray-500">Total Issues</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">18</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-5 border border-gray-100"
        >
          <p className="text-sm text-gray-500">Open</p>
          <p className="text-2xl font-bold text-red-600 mt-1">5</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-5 border border-gray-100"
        >
          <p className="text-sm text-gray-500">In Progress</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">3</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-5 border border-gray-100"
        >
          <p className="text-sm text-gray-500">Resolved</p>
          <p className="text-2xl font-bold text-green-600 mt-1">10</p>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
      >
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {["all", "open", "in_progress", "resolved"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter === "all"
                ? "All Issues"
                : filter === "in_progress"
                ? "In Progress"
                : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search issues..."
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
      </motion.div>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.map((issue, index) => {
          const statusConfig = getStatusConfig(issue.status);
          const StatusIcon = statusConfig.icon;

          return (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 ${issue.color} rounded-xl flex items-center justify-center text-white font-semibold`}
                >
                  {issue.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-gray-900">
                          {issue.title}
                        </h3>
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusConfig.bg} ${statusConfig.color}`}
                        >
                          {statusConfig.label}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPriorityColor(
                            issue.priority
                          )}`}
                        >
                          {issue.priority.charAt(0).toUpperCase() +
                            issue.priority.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2 line-clamp-2">
                        {issue.description}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {issue.student} ({issue.studentId})
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {issue.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {issue.responses} responses
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentIssues;
