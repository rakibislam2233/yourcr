"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, User, Download } from "lucide-react";
import PageHeader from "../shared/PageHeader";
import { Button } from "@/components/ui/button";

const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
const timeSlots = [
  "8:00 AM",
  "9:30 AM",
  "11:00 AM",
  "12:30 PM",
  "2:00 PM",
  "3:30 PM",
];

const routineData: Record<string, Record<string, { subject: string; teacher: string; room: string; type: string; color: string } | null>> = {
  Saturday: {
    "8:00 AM": null,
    "9:30 AM": { subject: "Database Management", teacher: "Dr. Kamal Ahmed", room: "Room 301", type: "Theory", color: "bg-blue-500" },
    "11:00 AM": { subject: "Software Engineering", teacher: "Prof. Rina Begum", room: "Room 205", type: "Theory", color: "bg-green-500" },
    "12:30 PM": null,
    "2:00 PM": { subject: "Computer Networks Lab", teacher: "Mr. Jahid Hassan", room: "Lab 102", type: "Lab", color: "bg-purple-500" },
    "3:30 PM": null,
  },
  Sunday: {
    "8:00 AM": { subject: "Operating Systems", teacher: "Dr. Fatema Khatun", room: "Room 301", type: "Theory", color: "bg-orange-500" },
    "9:30 AM": null,
    "11:00 AM": { subject: "AI & ML", teacher: "Mr. Rezaul Karim", room: "Room 205", type: "Theory", color: "bg-pink-500" },
    "12:30 PM": null,
    "2:00 PM": null,
    "3:30 PM": { subject: "Web Development Lab", teacher: "Ms. Nusrat Jahan", room: "Lab 103", type: "Lab", color: "bg-cyan-500" },
  },
  Monday: {
    "8:00 AM": null,
    "9:30 AM": { subject: "Database Lab", teacher: "Dr. Kamal Ahmed", room: "Lab 101", type: "Lab", color: "bg-blue-500" },
    "11:00 AM": null,
    "12:30 PM": { subject: "Software Engineering", teacher: "Prof. Rina Begum", room: "Room 205", type: "Theory", color: "bg-green-500" },
    "2:00 PM": { subject: "Professional Ethics", teacher: "Dr. Shamsul Alam", room: "Room 401", type: "Theory", color: "bg-amber-500" },
    "3:30 PM": null,
  },
  Tuesday: {
    "8:00 AM": { subject: "Computer Networks", teacher: "Mr. Jahid Hassan", room: "Room 301", type: "Theory", color: "bg-purple-500" },
    "9:30 AM": null,
    "11:00 AM": { subject: "Database Management", teacher: "Dr. Kamal Ahmed", room: "Room 301", type: "Theory", color: "bg-blue-500" },
    "12:30 PM": null,
    "2:00 PM": { subject: "OS Lab", teacher: "Dr. Fatema Khatun", room: "Lab 104", type: "Lab", color: "bg-orange-500" },
    "3:30 PM": null,
  },
  Wednesday: {
    "8:00 AM": null,
    "9:30 AM": { subject: "Operating Systems", teacher: "Dr. Fatema Khatun", room: "Room 301", type: "Theory", color: "bg-orange-500" },
    "11:00 AM": { subject: "AI & ML", teacher: "Mr. Rezaul Karim", room: "Room 205", type: "Theory", color: "bg-pink-500" },
    "12:30 PM": null,
    "2:00 PM": null,
    "3:30 PM": { subject: "Project Work", teacher: "Faculty", room: "Lab 105", type: "Project", color: "bg-red-500" },
  },
  Thursday: {
    "8:00 AM": { subject: "Web Development", teacher: "Ms. Nusrat Jahan", room: "Room 202", type: "Theory", color: "bg-cyan-500" },
    "9:30 AM": null,
    "11:00 AM": { subject: "Computer Networks", teacher: "Mr. Jahid Hassan", room: "Room 301", type: "Theory", color: "bg-purple-500" },
    "12:30 PM": null,
    "2:00 PM": { subject: "Project Work", teacher: "Faculty", room: "Lab 105", type: "Project", color: "bg-red-500" },
    "3:30 PM": null,
  },
};

const ViewRoutine: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState("Saturday");

  const getTodayDay = () => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return dayNames[new Date().getDay()];
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Class Routine"
        description="View your weekly class schedule"
        icon={Calendar}
        breadcrumbs={[
          { label: "Home", href: "/dashboard/student" },
          { label: "Routine" },
        ]}
        action={
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        }
      />

      {/* Day Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-2 overflow-x-auto pb-2"
      >
        {days.map((day) => {
          const isToday = day === getTodayDay();
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-6 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all relative ${
                selectedDay === day
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {day}
              {isToday && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </button>
          );
        })}
      </motion.div>

      {/* Schedule for Selected Day */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
      >
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{selectedDay}&apos;s Classes</h3>
          <span className="text-sm text-gray-500">
            {Object.values(routineData[selectedDay] || {}).filter(Boolean).length} classes
          </span>
        </div>
        <div className="p-4 space-y-3">
          {timeSlots.map((time, index) => {
            const classData = routineData[selectedDay]?.[time];
            return (
              <motion.div
                key={time}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-stretch gap-4 p-4 rounded-xl ${
                  classData ? "bg-gray-50" : "bg-gray-50/30"
                }`}
              >
                <div className="w-20 flex-shrink-0">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <Clock className="w-4 h-4" />
                    {time}
                  </div>
                </div>
                {classData ? (
                  <div className="flex-1 flex items-center gap-4">
                    <div className={`w-1.5 h-full min-h-[60px] ${classData.color} rounded-full`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">
                          {classData.subject}
                        </h4>
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded ${
                            classData.type === "Lab"
                              ? "bg-purple-100 text-purple-600"
                              : classData.type === "Project"
                              ? "bg-red-100 text-red-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {classData.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {classData.teacher}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {classData.room}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                    No class scheduled
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Weekly Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-gray-100 p-6"
      >
        <h3 className="font-semibold text-gray-900 mb-4">Weekly Overview</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {days.map((day) => {
            const classCount = Object.values(routineData[day] || {}).filter(Boolean).length;
            const isToday = day === getTodayDay();
            return (
              <div
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`text-center p-4 rounded-xl cursor-pointer transition-all ${
                  selectedDay === day
                    ? "bg-primary/10 border-2 border-primary"
                    : isToday
                    ? "bg-green-50 border-2 border-green-300"
                    : "bg-gray-50 border-2 border-transparent hover:border-gray-200"
                }`}
              >
                <p className="text-xs text-gray-500 mb-1">{day.slice(0, 3)}</p>
                <p className="text-2xl font-bold text-gray-900">{classCount}</p>
                <p className="text-xs text-gray-400">classes</p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default ViewRoutine;
