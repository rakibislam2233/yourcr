"use client";

import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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

export default function AddSubjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    teacher: "",
    credits: 3,
    type: "Theory",
    schedule: "",
    color: "bg-blue-500",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would save to database
    console.log("Adding subject:", formData);
    router.push("/dashboard/cr/subjects");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Subject"
        description="Add a new subject to your class"
        icon={<BookOpen />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Subjects", href: "/dashboard/cr/subjects" },
          { label: "Add Subject" },
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
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                placeholder="e.g., CSE-401"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Subject Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Database Management System"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teacher">Teacher</Label>
              <Input
                id="teacher"
                value={formData.teacher}
                onChange={(e) =>
                  setFormData({ ...formData, teacher: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    credits: parseInt(e.target.value) || 0,
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Select
                value={formData.color}
                onValueChange={(value) =>
                  setFormData({ ...formData, color: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      {color.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="schedule">Schedule</Label>
              <Input
                id="schedule"
                value={formData.schedule}
                onChange={(e) =>
                  setFormData({ ...formData, schedule: e.target.value })
                }
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
              Add Subject
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
