"use client";

import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Bell, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const typeOptions = [
  { value: "important", label: "Important" },
  { value: "alert", label: "Alert" },
  { value: "info", label: "Information" },
  { value: "general", label: "General" },
];

export default function AddNoticePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "general",
    pinned: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating notice:", formData);
    router.push("/dashboard/cr/notices");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Notice"
        description="Create a new notice or announcement"
        icon={<Bell />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Notices", href: "/dashboard/cr/notices" },
          { label: "Create Notice" },
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
          <div className="grid grid-cols-1 gap-x-8 gap-y-6">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="title"
                className="text-sm font-semibold text-gray-700"
              >
                Notice Title
              </Label>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Mid-Term Examination Schedule"
                  required
                  className="pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="type"
                  className="text-sm font-semibold text-gray-700"
                >
                  Notice Type
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
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-semibold text-gray-700">
                  Pin Notice
                </Label>
                <div className="flex items-center gap-3 h-12">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.pinned}
                      onChange={(e) =>
                        setFormData({ ...formData, pinned: e.target.checked })
                      }
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                    />
                    <span className="text-sm text-gray-600">
                      Pin this notice to top
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="content"
                className="text-sm font-semibold text-gray-700"
              >
                Notice Content
              </Label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Enter the notice content here..."
                rows={6}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/30 resize-none transition-all font-medium"
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
              Create Notice
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
