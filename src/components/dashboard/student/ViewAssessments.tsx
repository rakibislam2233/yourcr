"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ClipboardList,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Timer,
  FileText,
  ExternalLink,
} from "lucide-react";
import PageHeader from "../shared/PageHeader";
import { Button } from "@/components/ui/button";

const assessments = [
  {
    id: 1,
    title: "Mid-Term Examination",
    subject: "Database Management System",
    type: "Exam",
    date: "Dec 15, 2024",
    time: "10:00 AM - 1:00 PM",
    totalMarks: 50,
    status: "upcoming",
    venue: "Exam Hall A",
    daysLeft: 10,
  },
  {
    id: 2,
    title: "Assignment 3",
    subject: "Software Engineering",
    type: "Assignment",
    date: "Dec 10, 2024",
    time: "11:59 PM",
    totalMarks: 20,
    status: "ongoing",
    submitted: false,
    daysLeft: 5,
  },
  {
    id: 3,
    title: "Lab Report",
    subject: "Computer Networks",
    type: "Lab",
    date: "Dec 8, 2024",
    time: "5:00 PM",
    totalMarks: 15,
    status: "ongoing",
    submitted: true,
    daysLeft: 3,
  },
  {
    id: 4,
    title: "Quiz 2",
    subject: "Operating Systems",
    type: "Quiz",
    date: "Dec 5, 2024",
    time: "9:00 AM",
    totalMarks: 10,
    status: "completed",
    score: 8,
  },
  {
    id: 5,
    title: "Presentation",
    subject: "AI & Machine Learning",
    type: "Presentation",
    date: "Dec 3, 2024",
    time: "2:00 PM",
    totalMarks: 25,
    status: "completed",
    score: 22,
  },
  {
    id: 6,
    title: "Assignment 2",
    subject: "Web Development",
    type: "Assignment",
    date: "Nov 28, 2024",
    time: "11:59 PM",
    totalMarks: 20,
    status: "completed",
    score: 18,
  },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "upcoming":
      return {
        icon: Timer,
        color: "text-blue-600",
        bg: "bg-blue-100",
        badge: "bg-blue-100 text-blue-700",
        label: "Upcoming",
      };
    case "ongoing":
      return {
        icon: AlertCircle,
        color: "text-orange-600",
        bg: "bg-orange-100",
        badge: "bg-orange-100 text-orange-700",
        label: "Ongoing",
      };
    case "completed":
      return {
        icon: CheckCircle,
        color: "text-green-600",
        bg: "bg-green-100",
        badge: "bg-green-100 text-green-700",
        label: "Completed",
      };
    default:
      return {
        icon: FileText,
        color: "text-gray-600",
        bg: "bg-gray-100",
        badge: "bg-gray-100 text-gray-700",
        label: "Draft",
      };
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "Exam":
      return "bg-red-500";
    case "Assignment":
      return "bg-blue-500";
    case "Quiz":
      return "bg-purple-500";
    case "Lab":
      return "bg-green-500";
    case "Presentation":
      return "bg-orange-500";
    default:
      return "bg-gray-500";
  }
};

const ViewAssessments: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredAssessments = assessments.filter((assessment) => {
    if (activeFilter === "all") return true;
    return assessment.status === activeFilter;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assessments"
        description="View your exams, assignments, and quizzes"
        icon={ClipboardList}
        breadcrumbs={[
          { label: "Home", href: "/dashboard/student" },
          { label: "Assessments" },
        ]}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
        </motion.div>
        <motion.div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Upcoming</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">3</p>
        </motion.div>
        <motion.div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Pending Submission</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">1</p>
        </motion.div>
        <motion.div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Avg. Score</p>
          <p className="text-2xl font-bold text-green-600 mt-1">87%</p>
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <motion.div className="flex gap-2 overflow-x-auto pb-2">
        {["all", "ongoing", "upcoming", "completed"].map((filter) => (
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
              ? "All"
              : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Assessments List */}
      <div className="space-y-4">
        {filteredAssessments.map((assessment, index) => {
          const statusConfig = getStatusConfig(assessment.status);

          return (
            <motion.div
              key={assessment.id}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 ${getTypeColor(
                      assessment.type
                    )} rounded-xl flex items-center justify-center text-white`}
                  >
                    <ClipboardList className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900">
                        {assessment.title}
                      </h3>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusConfig.badge}`}
                      >
                        {statusConfig.label}
                      </span>
                      {assessment.status === "ongoing" &&
                        !assessment.submitted && (
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700">
                            Not Submitted
                          </span>
                        )}
                      {assessment.status === "ongoing" &&
                        assessment.submitted && (
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                            Submitted
                          </span>
                        )}
                    </div>
                    <p className="text-sm text-primary font-medium mt-1">
                      {assessment.subject}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 flex-wrap">
                      <span className="px-2 py-1 bg-gray-100 rounded-lg font-medium">
                        {assessment.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {assessment.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {assessment.time}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pl-18 lg:pl-0">
                  {assessment.status === "completed" &&
                    assessment.score !== undefined && (
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Your Score</p>
                        <p className="font-bold text-2xl text-primary">
                          {assessment.score}/{assessment.totalMarks}
                        </p>
                      </div>
                    )}
                  {assessment.status === "ongoing" &&
                    assessment.daysLeft !== undefined && (
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Days Left</p>
                        <p className="font-bold text-2xl text-orange-600">
                          {assessment.daysLeft}
                        </p>
                      </div>
                    )}
                  {assessment.status === "upcoming" &&
                    assessment.daysLeft !== undefined && (
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Days Left</p>
                        <p className="font-bold text-2xl text-blue-600">
                          {assessment.daysLeft}
                        </p>
                      </div>
                    )}
                  {assessment.status === "ongoing" && !assessment.submitted && (
                    <Button className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Submit Now
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewAssessments;
