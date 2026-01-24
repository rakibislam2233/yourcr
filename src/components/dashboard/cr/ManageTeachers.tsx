"use client";

import React, { useState } from "react";
import {
  Users,
  Plus,
  Mail,
  Phone,
  BookOpen,
  Search,
  Edit,
  Trash2,
} from "lucide-react";
import PageHeader from "../shared/PageHeader";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/ui/modal";
import Link from "next/link";

interface Teacher {
  id: number;
  name: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  subjects: string[];
  image: string;
  color: string;
}

const initialTeachers: Teacher[] = [
  {
    id: 1,
    name: "Dr. Kamal Ahmed",
    designation: "Professor",
    department: "Computer Technology",
    email: "kamal.ahmed@dpi.edu.bd",
    phone: "+880 1711-234567",
    subjects: ["Database Management", "Data Structures"],
    image: "KA",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Prof. Rina Begum",
    designation: "Associate Professor",
    department: "Computer Technology",
    email: "rina.begum@dpi.edu.bd",
    phone: "+880 1812-345678",
    subjects: ["Software Engineering", "OOP"],
    image: "RB",
    color: "bg-green-500",
  },
  {
    id: 3,
    name: "Mr. Jahid Hassan",
    designation: "Assistant Professor",
    department: "Computer Technology",
    email: "jahid.hassan@dpi.edu.bd",
    phone: "+880 1913-456789",
    subjects: ["Computer Networks", "Network Security"],
    image: "JH",
    color: "bg-purple-500",
  },
  {
    id: 4,
    name: "Dr. Fatema Khatun",
    designation: "Professor",
    department: "Computer Technology",
    email: "fatema.khatun@dpi.edu.bd",
    phone: "+880 1614-567890",
    subjects: ["Operating Systems", "System Programming"],
    image: "FK",
    color: "bg-orange-500",
  },
  {
    id: 5,
    name: "Mr. Rezaul Karim",
    designation: "Lecturer",
    department: "Computer Technology",
    email: "rezaul.karim@dpi.edu.bd",
    phone: "+880 1515-678901",
    subjects: ["Artificial Intelligence", "Machine Learning"],
    image: "RK",
    color: "bg-pink-500",
  },
  {
    id: 6,
    name: "Ms. Nusrat Jahan",
    designation: "Lecturer",
    department: "Computer Technology",
    email: "nusrat.jahan@dpi.edu.bd",
    phone: "+880 1916-789012",
    subjects: ["Web Development", "UI/UX Design"],
    image: "NJ",
    color: "bg-cyan-500",
  },
];

const ManageTeachers: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDelete = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTeacher) {
      setTeachers(teachers.filter((t) => t.id !== selectedTeacher.id));
      setSelectedTeacher(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Teachers"
        description="View and manage teachers assigned to your class"
        icon={Users}
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

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search teachers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-16 h-16 ${teacher.color} rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg`}
              >
                {teacher.image}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
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

            <div className="mt-5 pt-5 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Subjects</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {teacher.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="px-3 py-1 bg-primary/5 text-primary text-xs font-medium rounded-full"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link href={`/dashboard/cr/teachers/${teacher.id}/edit`} className="flex-1">
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
              >
                <Trash2 className="w-3 h-3" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Teacher"
        description={`Are you sure you want to remove "${selectedTeacher?.name}" from your class? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default ManageTeachers;
