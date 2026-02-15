"use client";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/ui/modal";
import { Subject } from "@/interface/subject.interface";
import { deleteSubject } from "@/services/subject.service";
import { BookOpen, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import PageHeader from "../../shared/PageHeader";
import SubjectCard from "./SubjectCard";

interface ManageSubjectsProps {
  subjects: Subject[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const ManageSubjects: React.FC<ManageSubjectsProps> = ({ subjects }) => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedSubject) return;

    setIsDeleting(true);
    try {
      const result = await deleteSubject(selectedSubject.id);
      if (result.success) {
        toast.success(result.message);
        router.refresh();
        setIsDeleteModalOpen(false);
        setSelectedSubject(null);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to delete subject");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="space-y-6">
      <PageHeader
        title="Manage Subjects"
        description="View and manage all subjects for your class"
        icon={<BookOpen className="w-6 h-6" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Subjects" },
        ]}
        action={
          <Link href="/dashboard/cr/subjects/add">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Subject
            </Button>
          </Link>
        }
      />

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Total Subjects</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {subjects?.length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Total Credits</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {subjects?.reduce((sum, s) => sum + s.credit, 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Departmental</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {subjects?.filter((s) => s.isDepartmental).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Non-Departmental</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {subjects?.filter((s) => !s.isDepartmental).length}
          </p>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects?.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Subject"
        description={`Are you sure you want to delete "${selectedSubject?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
    </section>
  );
};

export default ManageSubjects;
