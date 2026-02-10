"use client";

import { SearchFilter } from "@/components/shared/SearchFilter";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/ui/modal";
import { deleteTeacher, Teacher } from "@/services/teacher.service";
import { BookOpen, Edit, Mail, Phone, Plus, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import PageHeader from "../shared/PageHeader";

interface ManageTeachersProps {
  initialTeachers: Teacher[];
}

const ManageTeachers: React.FC<ManageTeachersProps> = ({ initialTeachers }) => {
  const router = useRouter();
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
      const result = await deleteTeacher(selectedTeacher.id);

      if (result.success) {
        toast.success(result.message);
        setIsDeleteModalOpen(false);
        setSelectedTeacher(null);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
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

      {/* Search and Filters */}
      <SearchFilter
        searchPlaceholder="Search teachers by name, designation, or subject..."
        filters={[
          {
            name: "department",
            label: "All Departments",
            options: [
              { label: "Computer Technology", value: "Computer Technology" },
              { label: "Electronics", value: "Electronics" },
              { label: "Mechanical", value: "Mechanical" },
              { label: "Civil", value: "Civil" },
            ],
          },
          {
            name: "designation",
            label: "All Designations",
            options: [
              { label: "Professor", value: "Professor" },
              { label: "Associate Professor", value: "Associate Professor" },
              { label: "Assistant Professor", value: "Assistant Professor" },
              { label: "Lecturer", value: "Lecturer" },
            ],
          },
        ]}
      />

      {/* Teachers Grid */}
      {initialTeachers.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No teachers found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by adding your first teacher.
          </p>
          <Link href="/dashboard/cr/teachers/add">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Teacher
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-16 h-16 ${teacher.color} rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg`}
                >
                  {teacher.photo ? (
                    <img
                      src={teacher.photo}
                      alt={teacher.name}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    getInitials(teacher.name)
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {teacher.name}
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    {teacher.designation}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {teacher.department}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 text-gray-400" />
                  </div>
                  <span>{teacher.phone}</span>
                </div>
              </div>

              {teacher.subjects && teacher.subjects.length > 0 && (
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      Subjects
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {teacher.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/5 text-primary text-xs font-medium rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-5 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  href={`/dashboard/cr/teachers/${teacher.id}/edit`}
                  className="flex-1"
                >
                  <Button variant="outline" size="sm" className="w-full gap-1">
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDelete(teacher)}
                  disabled={isPending}
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

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
        disabled={isPending}
      />
    </div>
  );
};

export default ManageTeachers;
