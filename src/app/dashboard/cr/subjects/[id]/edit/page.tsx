"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, ArrowLeft } from "lucide-react";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

const typeOptions = ["Theory", "Theory + Lab", "Lab", "Project"];

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

// Mock data - In production, this would come from database
const mockSubjects = [
  { id: 1, code: "CSE-401", name: "Database Management System", teacher: "Dr. Kamal Ahmed", credits: 4, type: "Theory + Lab", schedule: "Sun, Tue - 10:00 AM", color: "bg-blue-500" },
  { id: 2, code: "CSE-402", name: "Software Engineering", teacher: "Prof. Rina Begum", credits: 3, type: "Theory", schedule: "Mon, Wed - 12:00 PM", color: "bg-green-500" },
  { id: 3, code: "CSE-403", name: "Computer Networks", teacher: "Mr. Jahid Hassan", credits: 4, type: "Theory + Lab", schedule: "Tue, Thu - 2:00 PM", color: "bg-purple-500" },
];

export default function EditSubjectPage() {
  const router = useRouter();
  const params = useParams();
  const subjectId = parseInt(params?.id as string);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    teacher: "",
    credits: 3,
    type: "Theory",
    schedule: "",
    color: "bg-blue-500",
  });

  useEffect(() => {
    // In production, fetch from database
    const subject = mockSubjects.find((s) => s.id === subjectId);
    if (subject) {
      setFormData({
        code: subject.code,
        name: subject.name,
        teacher: subject.teacher,
        credits: subject.credits,
        type: subject.type,
        schedule: subject.schedule,
        color: subject.color,
      });
    }
  }, [subjectId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would update the database
    console.log("Updating subject:", { id: subjectId, ...formData });
    router.push("/dashboard/cr/subjects");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Subject"
        description="Update subject information"
        icon={<BookOpen />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Subjects", href: "/dashboard/cr/subjects" },
          { label: "Edit Subject" },
        ]}
        action={
          <Link href="/dashboard/cr/subjects">
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
              <Label htmlFor="code">Subject Code</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g., CSE-401"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Subject Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Database Management System"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teacher">Teacher</Label>
              <Input
                id="teacher"
                value={formData.teacher}
                onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                placeholder="e.g., Dr. Kamal Ahmed"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="credits">Credits</Label>
              <Input
                id="credits"
                type="number"
                min={1}
                max={10}
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) || 0 })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
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
                {colorOptions.map((color) => (
                  <option key={color.value} value={color.value}>{color.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="schedule">Schedule</Label>
              <Input
                id="schedule"
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                placeholder="e.g., Sun, Tue - 10:00 AM"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Link href="/dashboard/cr/subjects" className="flex-1">
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
