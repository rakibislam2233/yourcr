"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Calendar, ArrowLeft } from "lucide-react";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
const timeSlots = ["8:00 AM", "9:30 AM", "11:00 AM", "12:30 PM", "2:00 PM", "3:30 PM"];
const typeOptions = ["Theory", "Lab", "Project"];
const colorOptions = [
  { value: "bg-blue-500", label: "Blue" },
  { value: "bg-green-500", label: "Green" },
  { value: "bg-purple-500", label: "Purple" },
  { value: "bg-orange-500", label: "Orange" },
  { value: "bg-pink-500", label: "Pink" },
  { value: "bg-cyan-500", label: "Cyan" },
  { value: "bg-amber-500", label: "Amber" },
  { value: "bg-red-500", label: "Red" },
];

// Mock data for fetching class info
const mockRoutineData: Record<string, Record<string, { subject: string; teacher: string; room: string; type: string; color: string }>> = {
  Saturday: {
    "9:30 AM": { subject: "Database Management", teacher: "Dr. Kamal Ahmed", room: "Room 301", type: "Theory", color: "bg-blue-500" },
    "11:00 AM": { subject: "Software Engineering", teacher: "Prof. Rina Begum", room: "Room 205", type: "Theory", color: "bg-green-500" },
  },
};

function EditRoutineContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const day = searchParams?.get("day") || "Saturday";
  const time = searchParams?.get("time") || "8:00 AM";

  const [formData, setFormData] = useState({
    day: day,
    time: time,
    subject: "",
    teacher: "",
    room: "",
    type: "Theory",
    color: "bg-blue-500",
  });

  useEffect(() => {
    const classData = mockRoutineData[day]?.[time];
    if (classData) {
      setFormData({
        day,
        time,
        subject: classData.subject,
        teacher: classData.teacher,
        room: classData.room,
        type: classData.type,
        color: classData.color,
      });
    }
  }, [day, time]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating class:", formData);
    router.push("/dashboard/cr/routine");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Class"
        description="Update class information"
        icon={<Calendar />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Routine", href: "/dashboard/cr/routine" },
          { label: "Edit Class" },
        ]}
        action={
          <Link href="/dashboard/cr/routine">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        }
      />

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="day">Day</Label>
              <select
                id="day"
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {days.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time Slot</Label>
              <select
                id="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {timeSlots.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teacher">Teacher</Label>
              <Input
                id="teacher"
                value={formData.teacher}
                onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="room">Room</Label>
              <Input
                id="room"
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Class Type</Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {typeOptions.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <select
                id="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {colorOptions.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Link href="/dashboard/cr/routine" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="flex-1">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function EditRoutinePage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <EditRoutineContent />
    </Suspense>
  );
}
