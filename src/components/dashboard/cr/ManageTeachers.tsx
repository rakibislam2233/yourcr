"use client";
import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/ui/modal";
import { Teacher } from "@/interface/teacher.interface";
import { deleteTeacher } from "@/services/teacher.service";
import { Plus, Users } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import PageHeader from "../shared/PageHeader";
import { SearchFilter } from "../shared/SearchFilter";
import TeacherCard from "./TeacherCard";

interface ManageTeachersProps {
  initialTeachers: Teacher[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const ManageTeachers: React.FC<ManageTeachersProps> = ({
  initialTeachers = [],
  meta,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const handleDelete = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedTeacher) return;

    startTransition(async () => {
      try {
        const result = await deleteTeacher(selectedTeacher.id);

        if (result.success) {
          toast.success(result.message);
          setIsDeleteModalOpen(false);
          setSelectedTeacher(null);
          router.refresh();
        } else {
          toast.error(result.message);
        }
      } catch {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Teachers"
        description="View and manage teachers assigned to your class"
        icon={<Users className="w-6 h-6" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Teachers" },
        ]}
        action={
          <Link href="/dashboard/cr/teachers/add">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Teacher
            </Button>
          </Link>
        }
      />

      <div className="bg-white rounded-md border border-gray-100 p-6 space-y-6">
        {(initialTeachers.length > 0 || searchParams?.get("searchTerm")) && (
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <SearchFilter searchPlaceholder="Search teachers..." />
          </div>
        )}

        {initialTeachers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">
              {searchParams?.get("searchTerm")
                ? "No teachers found matching your search."
                : "No teachers found. Get started by adding your first teacher."}
            </p>
            {!searchParams?.get("searchTerm") && (
              <Link href="/dashboard/cr/teachers/add">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Teacher
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialTeachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {meta && meta.totalPages > 1 && (
          <Pagination currentPage={meta.page} totalPages={meta.totalPages} />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Teacher"
        description={`Are you sure you want to remove "${selectedTeacher?.name}" from your class? This action cannot be undone.`}
        confirmText={isPending ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        variant="danger"
        isLoading={isPending}
      />
    </div>
  );
};

export default ManageTeachers;
