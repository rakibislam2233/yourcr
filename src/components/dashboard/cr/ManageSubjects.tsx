"use client";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/ui/modal";
import {
  BookOpen,
  Clock,
  Edit,
  Plus,
  Search,
  Trash2,
  User,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import PageHeader from "../shared/PageHeader";

interface Subject {
  id: number;
  code: string;
  name: string;
  teacher: string;
  credits: number;
  type: string;
  schedule: string;
  color: string;
}

const initialSubjects: Subject[] = [
  {
    id: 1,
    code: "CSE-401",
    name: "Database Management System",
    teacher: "Dr. Kamal Ahmed",
    credits: 4,
    type: "Theory + Lab",
    schedule: "Sun, Tue - 10:00 AM",
    color: "bg-blue-500",
  },
  {
    id: 2,
    code: "CSE-402",
    name: "Software Engineering",
    teacher: "Prof. Rina Begum",
    credits: 3,
    type: "Theory",
    schedule: "Mon, Wed - 12:00 PM",
    color: "bg-green-500",
  },
  {
    id: 3,
    code: "CSE-403",
    name: "Computer Networks",
    teacher: "Mr. Jahid Hassan",
    credits: 4,
    type: "Theory + Lab",
    schedule: "Tue, Thu - 2:00 PM",
    color: "bg-purple-500",
  },
  {
    id: 4,
    code: "CSE-404",
    name: "Operating Systems",
    teacher: "Dr. Fatema Khatun",
    credits: 4,
    type: "Theory + Lab",
    schedule: "Wed, Fri - 9:00 AM",
    color: "bg-orange-500",
  },
  {
    id: 5,
    code: "CSE-405",
    name: "Artificial Intelligence",
    teacher: "Mr. Rezaul Karim",
    credits: 3,
    type: "Theory",
    schedule: "Sun, Thu - 11:00 AM",
    color: "bg-pink-500",
  },
  {
    id: 6,
    code: "CSE-406",
    name: "Web Development",
    teacher: "Ms. Nusrat Jahan",
    credits: 3,
    type: "Theory + Lab",
    schedule: "Mon, Fri - 3:00 PM",
    color: "bg-cyan-500",
  },
];

const ManageSubjects: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.teacher.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedSubject) {
      setSubjects(subjects.filter((s) => s.id !== selectedSubject.id));
      setSelectedSubject(null);
    }
  };

  return (
    <div className="space-y-6">
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

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search subjects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Total Subjects</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {subjects.length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Total Credits</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {subjects.reduce((sum, s) => sum + s.credits, 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Theory Subjects</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {subjects.filter((s) => s.type === "Theory").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Lab Subjects</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {subjects.filter((s) => s.type.includes("Lab")).length}
          </p>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubjects.map((subject) => (
          <div
            key={subject.id}
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center text-white`}
              >
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={`/dashboard/cr/subjects/${subject.id}/edit`}>
                  <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                    <Edit className="w-4 h-4 text-gray-500" />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(subject)}
                  className="p-2 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium text-gray-600">
                  {subject.code}
                </span>
                <span className="px-2 py-0.5 bg-primary/10 rounded text-xs font-medium text-primary">
                  {subject.credits} Credits
                </span>
              </div>
              <h3 className="font-semibold text-gray-900">{subject.name}</h3>
              <p className="text-sm text-gray-500">{subject.type}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4 text-gray-400" />
                {subject.teacher}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-gray-400" />
                {subject.schedule}
              </div>
            </div>
          </div>
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
      />
    </div>
  );
};

export default ManageSubjects;
