"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Mail, Phone, BookOpen, Search } from "lucide-react";
import PageHeader from "../shared/PageHeader";
import { Button } from "@/components/ui/button";

const teachers = [
  {
    id: 1,
    name: "Dr. Kamal Ahmed",
    designation: "Professor",
    department: "Computer Technology",
    email: "kamal.ahmed@dpi.edu.bd",
    phone: "+880 1711-234567",
    subjects: ["Database Management", "Data Structures"],
    avatar: "KA",
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
    avatar: "RB",
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
    avatar: "JH",
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
    avatar: "FK",
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
    avatar: "RK",
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
    avatar: "NJ",
    color: "bg-cyan-500",
  },
];

const ViewTeachers: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Teachers"
        description="View teachers assigned to your class"
        icon={<Users />}
        breadcrumbs={[
          { label: "Home", href: "/dashboard/student" },
          { label: "Teachers" },
        ]}
      />

      {/* Search */}
      <motion.div
        className="relative max-w-md"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search teachers..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </motion.div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher, index) => (
          <motion.div
            key={teacher.id}
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-16 h-16 ${teacher.color} rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg`}
              >
                {teacher.avatar}
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
                <span className="text-sm font-medium text-gray-700">
                  Teaches
                </span>
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

            <div className="mt-5">
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Mail className="w-4 h-4" />
                Send Email
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ViewTeachers;
