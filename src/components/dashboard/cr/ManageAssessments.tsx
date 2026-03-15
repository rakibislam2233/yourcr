"use client";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/ui/modal";
import { Assessment } from "@/interface/assessment.interface";
import { deleteAssessment } from "@/services/assessment.service";
import {
  Calendar,
  ClipboardList,
  Clock,
  Edit,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import PageHeader from "../shared/PageHeader";
import StatsOverview from "../shared/StatsOverview";

interface ManageAssessmentsProps {
  initialAssessments: Assessment[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "EXAM":
      return "bg-red-500";
    case "ASSIGNMENT":
      return "bg-blue-500";
    case "QUIZ":
      return "bg-purple-500";
    case "LAB":
      return "bg-green-500";
    case "PRESENTATION":
      return "bg-orange-500";
    default:
      return "bg-gray-500";
  }
};

const formatDate = (value?: string) => {
  if (!value) return "N/A";
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (value?: string) => {
  if (!value) return "N/A";
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const getSubjectName = (assessment: Assessment) => {
  if (typeof assessment.subject === "string") {
    return assessment.subject;
  }

  return assessment.subject?.name || "Unknown Subject";
};

const formatTypeLabel = (type: string) =>
  type
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const ManageAssessments: React.FC<ManageAssessmentsProps> = ({
  initialAssessments,
}) => {
  const [assessments, setAssessments] =
    useState<Assessment[]>(initialAssessments);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] =
    useState<Assessment | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedAssessment) return;

    setIsDeleting(true);
    try {
      const result = await deleteAssessment(selectedAssessment.id);
      if (result.success) {
        setAssessments((prev) =>
          prev.filter((assessment) => assessment.id !== selectedAssessment.id),
        );
        toast.success(result.message || "Assessment deleted successfully");
        setIsDeleteModalOpen(false);
        setSelectedAssessment(null);
      } else {
        toast.error(result.message || "Failed to delete assessment");
      }
    } catch {
      toast.error("Failed to delete assessment");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="space-y-6">
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

      <StatsOverview
        items={[
          {
            label: "Total Assessments",
            value: assessments.length,
          },
        ]}
        gridClassName="grid-cols-1"
      />

      {/* Assessments List */}
      <div className="space-y-4">
        {assessments.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No assessments found yet</p>
            <Link href="/dashboard/cr/assessments/add">
              <Button className="mt-4">Create Your First Assessment</Button>
            </Link>
          </div>
        ) : (
          assessments.map((assessment) => {
            const deadlineValue = assessment.deadline || assessment.date;
            const marks = Number(assessment.totalMarks) || 0;

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
                      </div>
                      <p className="text-sm text-primary font-medium mt-1">
                        {getSubjectName(assessment)}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 flex-wrap">
                        <span className="px-2 py-1 bg-gray-100 rounded-md font-medium">
                          {formatTypeLabel(assessment.type)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(deadlineValue)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatTime(deadlineValue)}
                        </span>
                        <span className="font-medium text-gray-700">
                          {marks} Marks
                        </span>
                        <span className="font-medium text-gray-600">
                          Files: {assessment.fileUrls?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 pl-18 lg:pl-0">
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
            );
          })
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Assessment"
        description={`Are you sure you want to delete the assessment "${selectedAssessment?.title}"? This action cannot be undone.`}
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
    </section>
  );
};

export default ManageAssessments;
