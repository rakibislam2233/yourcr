"use client";

import React, { useState, useEffect } from "react";
import { Bell, ArrowLeft } from "lucide-react";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

const typeOptions = [
  { value: "important", label: "Important" },
  { value: "alert", label: "Alert" },
  { value: "info", label: "Information" },
  { value: "general", label: "General" },
];

// Mock data for fetching notice info
const mockNotices: Record<string, { title: string; content: string; type: string; pinned: boolean }> = {
  "1": { title: "Mid-Term Examination Schedule", content: "Mid-term examinations will be held from December 15-20, 2024. Please check the detailed schedule attached.", type: "important", pinned: true },
  "2": { title: "Class Cancelled - Software Engineering", content: "Tomorrow's Software Engineering class has been cancelled due to faculty meeting. Makeup class will be scheduled.", type: "alert", pinned: true },
  "3": { title: "Project Submission Deadline Extended", content: "The deadline for the Database project has been extended to December 10, 2024.", type: "info", pinned: false },
  "4": { title: "Industrial Visit Announcement", content: "An industrial visit to Walton Hi-Tech Industries is scheduled for December 25, 2024. Interested students please register.", type: "info", pinned: false },
  "5": { title: "Lab Equipment Guidelines", content: "New guidelines for using lab equipment have been issued. Please read and follow them strictly.", type: "general", pinned: false },
};

export default function EditNoticePage() {
  const router = useRouter();
  const params = useParams();
  const noticeId = params.id as string;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "general",
    pinned: false,
  });

  useEffect(() => {
    const noticeData = mockNotices[noticeId];
    if (noticeData) {
      setFormData(noticeData);
    }
  }, [noticeId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating notice:", formData);
    router.push("/dashboard/cr/notices");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Notice"
        description="Update notice information"
        icon={Bell}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Notices", href: "/dashboard/cr/notices" },
          { label: "Edit Notice" },
        ]}
        action={
          <Link href="/dashboard/cr/notices">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        }
      />

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Notice Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Mid-Term Examination Schedule"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type">Notice Type</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {typeOptions.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>Pin Notice</Label>
                <div className="flex items-center gap-3 h-10">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.pinned}
                      onChange={(e) => setFormData({ ...formData, pinned: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                    />
                    <span className="text-sm text-gray-600">Pin this notice to top</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Notice Content</Label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter the notice content here..."
                rows={6}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Link href="/dashboard/cr/notices" className="flex-1">
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
