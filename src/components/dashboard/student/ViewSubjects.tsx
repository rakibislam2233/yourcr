"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, User } from "lucide-react";
import PageHeader from "../shared/PageHeader";

const subjects = [
  {
    id: 1,
    code: "CSE-401",
    name: "Database Management System",
    teacher: "Dr. Kamal Ahmed",
    credits: 4,
    type: "Theory + Lab",
    schedule: "Sun, Tue - 10:00 AM",
    color: "bg-blue-500",
    progress: 65,
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
    progress: 70,
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
    progress: 55,
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
    progress: 60,
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
    progress: 50,
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
    progress: 75,
  },
  {
    id: 7,
    code: "HUM-401",
    name: "Professional Ethics",
    teacher: "Dr. Shamsul Alam",
    credits: 2,
    type: "Theory",
    schedule: "Tue - 4:00 PM",
    color: "bg-amber-500",
    progress: 80,
  },
  {
    id: 8,
    code: "CSE-407",
    name: "Project Work",
    teacher: "All Faculty",
    credits: 6,
    type: "Project",
    schedule: "As Scheduled",
    color: "bg-red-500",
    progress: 40,
  },
];

const ViewSubjects: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Subjects"
        description="View all subjects for this semester"
        icon={BookOpen}
        breadcrumbs={[
          { label: "Home", href: "/dashboard/student" },
          { label: "Subjects" },
        ]}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-5 border border-gray-100"
        >
          <p className="text-sm text-gray-500">Total Subjects</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-5 border border-gray-100"
        >
          <p className="text-sm text-gray-500">Total Credits</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">29</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-5 border border-gray-100"
        >
          <p className="text-sm text-gray-500">Theory</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">3</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-5 border border-gray-100"
        >
          <p className="text-sm text-gray-500">Theory + Lab</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">4</p>
        </motion.div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject, index) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.05 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center text-white`}>
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium text-gray-600">
                  {subject.code}
                </span>
                <span className="px-2 py-0.5 bg-primary/10 rounded text-xs font-medium text-primary">
                  {subject.credits} Credits
                </span>
              </div>
            </div>

            <h3 className="font-semibold text-gray-900">{subject.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{subject.type}</p>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4 text-gray-400" />
                {subject.teacher}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-gray-400" />
                {subject.schedule}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-500">Syllabus Progress</span>
                <span className="font-medium text-gray-900">{subject.progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${subject.color} rounded-full transition-all duration-500`}
                  style={{ width: `${subject.progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ViewSubjects;
