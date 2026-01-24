"use client";

import React, { useState } from "react";
import { Calendar, Plus, Clock, MapPin, User, Edit, Trash2 } from "lucide-react";
import PageHeader from "../shared/PageHeader";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/ui/modal";
import Link from "next/link";

const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
const timeSlots = ["8:00 AM", "9:30 AM", "11:00 AM", "12:30 PM", "2:00 PM", "3:30 PM"];

interface ClassSlot {
  subject: string;
  teacher: string;
  room: string;
  type: string;
  color: string;
}

const initialRoutineData: Record<string, Record<string, ClassSlot | null>> = {
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

const ManageRoutine: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState("Saturday");
  const [routineData, setRoutineData] = useState(initialRoutineData);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null);

  const handleDeleteClick = (day: string, time: string) => {
    setSelectedSlot({ day, time });
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedSlot) {
      setRoutineData((prev) => ({
        ...prev,
        [selectedSlot.day]: {
          ...prev[selectedSlot.day],
          [selectedSlot.time]: null,
        },
      }));
      setSelectedSlot(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Routine"
        description="View and manage your class schedule"
        icon={Calendar}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Routine" },
        ]}
        action={
          <Link href="/dashboard/cr/routine/add">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Class
            </Button>
          </Link>
        }
      />

      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-6 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-colors ${
              selectedDay === day
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Grid */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-semibold text-gray-900">{selectedDay}&apos;s Schedule</h3>
        </div>
        <div className="p-4 space-y-3">
          {timeSlots.map((time) => {
            const classData = routineData[selectedDay]?.[time];
            return (
              <div
                key={time}
                className={`flex items-stretch gap-4 p-4 rounded-xl ${
                  classData ? "bg-gray-50" : "bg-gray-50/50 border-2 border-dashed border-gray-200"
                }`}
              >
                <div className="w-24 flex-shrink-0">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <Clock className="w-4 h-4" />
                    {time}
                  </div>
                </div>
                {classData ? (
                  <div className="flex-1 flex items-center gap-4">
                    <div className={`w-1.5 h-full ${classData.color} rounded-full`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">{classData.subject}</h4>
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
                    <div className="flex gap-1">
                      <Link href={`/dashboard/cr/routine/edit?day=${selectedDay}&time=${encodeURIComponent(time)}`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteClick(selectedDay, time)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-400">
                    <Link
                      href={`/dashboard/cr/routine/add?day=${selectedDay}&time=${encodeURIComponent(time)}`}
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Class
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Weekly Overview</h3>
        <div className="grid grid-cols-6 gap-2">
          {days.map((day) => {
            const classCount = Object.values(routineData[day] || {}).filter(Boolean).length;
            return (
              <div key={day} className="text-center p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">{day.slice(0, 3)}</p>
                <p className="text-lg font-bold text-gray-900">{classCount}</p>
                <p className="text-xs text-gray-400">classes</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Class"
        description={`Are you sure you want to remove the class on ${selectedSlot?.day} at ${selectedSlot?.time}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default ManageRoutine;
