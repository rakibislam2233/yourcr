"use client";

import React, { useState } from "react";
import { ClipboardList, ArrowLeft } from "lucide-react";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";

const typeOptions = ["Exam", "Assignment", "Quiz", "Lab", "Presentation", "Project"];
const subjectOptions = [
  "Database Management System",
  "Software Engineering",
  "Computer Networks",
  "Operating Systems",
  "AI & Machine Learning",
  "Web Development",
];

export default function AddAssessmentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    type: "Assignment",
    date: "",
    time: "",
    totalMarks: "",
    venue: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating assessment:", formData);
    router.push("/dashboard/cr/assessments");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Assessment"
        description="Create a new exam, assignment, or quiz"
        icon={<ClipboardList />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Assessments", href: "/dashboard/cr/assessments" },
          { label: "Create Assessment" },
        ]}
        action={
          <Link href="/dashboard/cr/assessments">
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
              <Label htmlFor="title">Assessment Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Mid-Term Examination"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <select
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              >
                <option value="">Select a subject</option>
                {subjectOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Assessment Type</Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {typeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalMarks">Total Marks</Label>
              <Input
                id="totalMarks"
                type="number"
                value={formData.totalMarks}
                onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
                placeholder="e.g., 50"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="e.g., 10:00 AM - 1:00 PM or 11:59 PM"
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="venue">Venue (Optional)</Label>
              <Input
                id="venue"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                placeholder="e.g., Exam Hall A"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Add any additional instructions or details..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Link href="/dashboard/cr/assessments" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="flex-1">
              Create Assessment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
