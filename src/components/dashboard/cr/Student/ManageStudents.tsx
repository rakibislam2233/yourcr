"use client";
import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import Student from "@/interface/student.interface";
import { deleteStudent } from "@/services/student.service";
import { Plus, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import PageHeader from "../../shared/PageHeader";
import { SearchFilter } from "../../shared/SearchFilter";
import StudentCard from "./StudentCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ManageStudentsProps {
  students: Student[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const ManageStudents: React.FC<ManageStudentsProps> = ({
  students = [],
  meta,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDeleteClick = (student: Student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedStudent) return;

    startTransition(async () => {
      try {
        const res = await deleteStudent(selectedStudent.id);
        if (res.success) {
          toast.success(res.message);
          setIsDeleteModalOpen(false);
          router.refresh(); // Refresh data
        } else {
          toast.error(res.message);
        }
      } catch {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Students"
        description="View and manage students in your class"
        icon={<UserPlus className="w-6 h-6" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Students" },
        ]}
        action={
          <div className="flex gap-2">
            <Link href="/dashboard/cr/students/add">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Student
              </Button>
            </Link>
          </div>
        }
      />

      <div className="bg-white rounded-md border border-gray-100 p-6 space-y-6">
        {(students.length > 0 || searchParams?.get("searchTerm")) && (
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <SearchFilter searchPlaceholder="Search students..." />
          </div>
        )}

        {students.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              {searchParams?.get("searchTerm")
                ? "No students found matching your search."
                : "No students found. Get Started by adding your first student."}
            </p>
            {!searchParams?.get("searchTerm") && (
              <Link href="/dashboard/cr/students/add">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Student
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
        {meta && meta.totalPages > 1 && (
          <Pagination currentPage={meta.page} totalPages={meta.totalPages} />
        )}
      </div>

      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Student</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {selectedStudent?.fullName}? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleConfirmDelete();
              }}
              disabled={isPending}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600 text-white"
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageStudents;
