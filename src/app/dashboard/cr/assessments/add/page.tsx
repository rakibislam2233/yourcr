"use client";

import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Calendar,
  ClipboardList,
  Clock,
  FileText,
  Hash,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const typeOptions = [
  "Exam",
  "Assignment",
  "Quiz",
  "Lab",
  "Presentation",
  "Project",
];
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="title"
                className="text-sm font-semibold text-gray-700"
              >
                Assessment Title
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Mid-Term Examination"
                  required
                  className="pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="subject"
                className="text-sm font-semibold text-gray-700"
              >
                Subject
              </Label>
              <select
                id="subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="h-12 px-4 text-base border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/30 transition-all font-medium"
                required
              >
                <option value="">Select a subject</option>
                {subjectOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="type"
                className="text-sm font-semibold text-gray-700"
              >
                Assessment Type
              </Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="h-12 px-4 text-base border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/30 transition-all font-medium"
              >
                {typeOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="totalMarks"
                className="text-sm font-semibold text-gray-700"
              >
                Total Marks
              </Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="totalMarks"
                  type="number"
                  value={formData.totalMarks}
                  onChange={(e) =>
                    setFormData({ ...formData, totalMarks: e.target.value })
                  }
                  placeholder="e.g., 50"
                  required
                  className="pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="date"
                className="text-sm font-semibold text-gray-700"
              >
                Date
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                  className="pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="time"
                className="text-sm font-semibold text-gray-700"
              >
                Time
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  placeholder="e.g., 10:00 AM - 1:00 PM or 11:59 PM"
                  required
                  className="pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <Label
                htmlFor="venue"
                className="text-sm font-semibold text-gray-700"
              >
                Venue (Optional)
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="venue"
                  value={formData.venue}
                  onChange={(e) =>
                    setFormData({ ...formData, venue: e.target.value })
                  }
                  placeholder="e.g., Exam Hall A"
                  className="pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <Label
                htmlFor="description"
                className="text-sm font-semibold text-gray-700"
              >
                Description (Optional)
              </Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Add any additional instructions or details..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/30 resize-none transition-all font-medium"
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
