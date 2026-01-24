"use client";

import React, { useState, useEffect } from "react";
import { Video, ArrowLeft } from "lucide-react";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

const platformOptions = ["Google Meet", "Zoom", "Microsoft Teams", "Other"];

// Mock data for fetching class info
const mockClasses: Record<string, { subject: string; teacher: string; date: string; startTime: string; endTime: string; platform: string; link: string }> = {
  "1": { subject: "Database Management System", teacher: "Dr. Kamal Ahmed", date: "2024-12-15", startTime: "10:00", endTime: "11:30", platform: "Google Meet", link: "https://meet.google.com/abc-defg-hij" },
  "2": { subject: "Software Engineering", teacher: "Prof. Rina Begum", date: "2024-12-15", startTime: "14:00", endTime: "15:30", platform: "Zoom", link: "https://zoom.us/j/123456789" },
  "3": { subject: "Computer Networks", teacher: "Mr. Jahid Hassan", date: "2024-12-16", startTime: "11:00", endTime: "12:30", platform: "Google Meet", link: "https://meet.google.com/xyz-uvwx-rst" },
};

export default function EditClassPage() {
  const router = useRouter();
  const params = useParams();
  const classId = params?.id as string;

  const [formData, setFormData] = useState({
    subject: "",
    teacher: "",
    date: "",
    startTime: "",
    endTime: "",
    platform: "Google Meet",
    link: "",
  });

  useEffect(() => {
    const classData = mockClasses[classId];
    if (classData) {
      setFormData(classData);
    }
  }, [classId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating class:", formData);
    router.push("/dashboard/cr/classes");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Class"
        description="Update class information"
        icon={Video}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Classes", href: "/dashboard/cr/classes" },
          { label: "Edit Class" },
        ]}
        action={
          <Link href="/dashboard/cr/classes">
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
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
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
              <Label htmlFor="platform">Platform</Label>
              <select
                id="platform"
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {platformOptions.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="link">Meeting Link</Label>
              <Input
                id="link"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="e.g., https://meet.google.com/xxx-xxxx-xxx"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Link href="/dashboard/cr/classes" className="flex-1">
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
