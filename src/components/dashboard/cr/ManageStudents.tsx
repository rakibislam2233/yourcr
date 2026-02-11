"use client";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/ui/modal";
import {
  Download,
  Edit,
  Filter,
  Mail,
  Phone,
  Plus,
  Search,
  Trash2,
  Upload,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import PageHeader from "../shared/PageHeader";

interface Student {
  id: number;
  roll: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  avatar: string;
  color: string;
}

const initialStudents: Student[] = [
  {
    id: 1,
    roll: "CT-8001",
    name: "Sakib Hasan",
    email: "sakib@example.com",
    phone: "+880 1711-111111",
    status: "active",
    avatar: "SH",
    color: "bg-blue-500",
  },
  {
    id: 2,
    roll: "CT-8002",
    name: "Fahim Rahman",
    email: "fahim@example.com",
    phone: "+880 1711-222222",
    status: "active",
    avatar: "FR",
    color: "bg-green-500",
  },
  {
    id: 3,
    roll: "CT-8003",
    name: "Nadia Islam",
    email: "nadia@example.com",
    phone: "+880 1711-333333",
    status: "active",
    avatar: "NI",
    color: "bg-purple-500",
  },
  {
    id: 4,
    roll: "CT-8004",
    name: "Tanvir Ahmed",
    email: "tanvir@example.com",
    phone: "+880 1711-444444",
    status: "active",
    avatar: "TA",
    color: "bg-orange-500",
  },
  {
    id: 5,
    roll: "CT-8005",
    name: "Mim Akter",
    email: "mim@example.com",
    phone: "+880 1711-555555",
    status: "inactive",
    avatar: "MA",
    color: "bg-pink-500",
  },
  {
    id: 6,
    roll: "CT-8006",
    name: "Rafiq Uddin",
    email: "rafiq@example.com",
    phone: "+880 1711-666666",
    status: "active",
    avatar: "RU",
    color: "bg-cyan-500",
  },
  {
    id: 7,
    roll: "CT-8007",
    name: "Sadia Khan",
    email: "sadia@example.com",
    phone: "+880 1711-777777",
    status: "active",
    avatar: "SK",
    color: "bg-amber-500",
  },
  {
    id: 8,
    roll: "CT-8008",
    name: "Imran Hossain",
    email: "imran@example.com",
    phone: "+880 1711-888888",
    status: "active",
    avatar: "IH",
    color: "bg-red-500",
  },
];

const ManageStudents: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.roll.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleSelectStudent = (id: number) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map((s) => s.id));
    }
  };

  const handleDelete = (student: Student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedStudent) {
      setStudents(students.filter((s) => s.id !== selectedStudent.id));
      setSelectedStudent(null);
    }
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
            <Button variant="outline" className="gap-2">
              <Upload className="w-4 h-4" />
              Import
            </Button>
            <Link href="/dashboard/cr/students/add">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Student
              </Button>
            </Link>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {students.length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {students.filter((s) => s.status === "active").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Inactive</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {students.filter((s) => s.status === "inactive").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Avg. Attendance</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">89%</p>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-1 gap-4 w-full sm:w-auto">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, roll, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
        {selectedStudents.length > 0 && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export Selected
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedStudents.length === filteredStudents.length &&
                      filteredStudents.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Roll
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => toggleSelectStudent(student.id)}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 ${student.color} rounded-xl flex items-center justify-center text-white font-semibold text-sm`}
                      >
                        {student.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {student.name}
                        </p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-gray-600">
                      {student.roll}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {student.phone}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        student.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {student.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                        <Mail className="w-4 h-4 text-gray-500" />
                      </button>
                      <Link href={`/dashboard/cr/students/${student.id}/edit`}>
                        <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                          <Edit className="w-4 h-4 text-gray-500" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(student)}
                        className="p-2 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {filteredStudents.length} of {students.length} students
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-primary text-white"
            >
              1
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Student"
        description={`Are you sure you want to remove "${selectedStudent?.name}" from your class? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default ManageStudents;
