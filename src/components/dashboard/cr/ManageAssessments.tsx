"use client";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/ui/modal";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ClipboardList,
  Clock,
  Download,
  Edit,
  FileText,
  Plus,
  Timer,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import PageHeader from "../shared/PageHeader";

interface Assessment {
  id: number;
  title: string;
  subject: string;
  type: string;
  date: string;
  time: string;
  totalMarks: number;
  status: string;
  venue?: string;
  submissions?: number;
  totalStudents?: number;
  avgScore?: number;
}

const initialAssessments: Assessment[] = [
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
    submissions: 28,
    totalStudents: 45,
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
    submissions: 35,
    totalStudents: 45,
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
    avgScore: 7.5,
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
    avgScore: 20.2,
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

const ManageAssessments: React.FC = () => {
  const [assessments, setAssessments] =
    useState<Assessment[]>(initialAssessments);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] =
    useState<Assessment | null>(null);

  const handleDelete = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedAssessment) {
      setAssessments(assessments.filter((a) => a.id !== selectedAssessment.id));
      setSelectedAssessment(null);
    }
  };

  const upcomingCount = assessments.filter(
    (a) => a.status === "upcoming",
  ).length;
  const ongoingCount = assessments.filter((a) => a.status === "ongoing").length;
  const completedCount = assessments.filter(
    (a) => a.status === "completed",
  ).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Assessments"
        description="Create and manage exams, assignments, and quizzes"
        icon={<ClipboardList className="w-6 h-6" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Assessments" },
        ]}
        action={
          <Link href="/dashboard/cr/assessments/add">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Assessment
            </Button>
          </Link>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Total Assessments</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {assessments.length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Upcoming</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {upcomingCount}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Ongoing</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">
            {ongoingCount}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {completedCount}
          </p>
        </div>
      </div>

      {/* Assessments List */}
      <div className="space-y-4">
        {assessments.map((assessment) => {
          const statusConfig = getStatusConfig(assessment.status);

          return (
            <div
              key={assessment.id}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 ${getTypeColor(
                      assessment.type,
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
                      <span className="font-medium text-gray-700">
                        {assessment.totalMarks} Marks
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pl-18 lg:pl-0">
                  {assessment.status === "ongoing" && (
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Submissions</p>
                      <p className="font-semibold text-gray-900">
                        {assessment.submissions}/{assessment.totalStudents}
                      </p>
                    </div>
                  )}
                  {assessment.status === "completed" && (
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Avg. Score</p>
                      <p className="font-semibold text-gray-900">
                        {assessment.avgScore}/{assessment.totalMarks}
                      </p>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    {assessment.status === "completed" && (
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="w-4 h-4" />
                        Results
                      </Button>
                    )}
                    <Link
                      href={`/dashboard/cr/assessments/${assessment.id}/edit`}
                    >
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(assessment)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Assessment"
        description={`Are you sure you want to delete the assessment "${selectedAssessment?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default ManageAssessments;
