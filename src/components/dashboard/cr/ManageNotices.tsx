"use client";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/ui/modal";
import {
    AlertCircle,
    Bell,
    Calendar,
    CheckCircle,
    Edit,
    Eye,
    Info,
    Pin,
    Plus,
    Trash2,
    User,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import PageHeader from "../shared/PageHeader";
import StatsOverview from "../shared/StatsOverview";

interface Notice {
  id: number;
  title: string;
  content: string;
  type: string;
  author: string;
  date: string;
  pinned: boolean;
  views: number;
}

const initialNotices: Notice[] = [
  {
    id: 1,
    title: "Mid-Term Examination Schedule",
    content: "Mid-term examinations will be held from December 15-20, 2024. Please check the detailed schedule attached.",
    type: "important",
    author: "CR - Rakib Ahmed",
    date: "2 hours ago",
    pinned: true,
    views: 45,
  },
  {
    id: 2,
    title: "Class Cancelled - Software Engineering",
    content: "Tomorrow's Software Engineering class has been cancelled due to faculty meeting. Makeup class will be scheduled.",
    type: "alert",
    author: "CR - Rakib Ahmed",
    date: "5 hours ago",
    pinned: true,
    views: 38,
  },
  {
    id: 3,
    title: "Project Submission Deadline Extended",
    content: "The deadline for the Database project has been extended to December 10, 2024.",
    type: "info",
    author: "CR - Rakib Ahmed",
    date: "1 day ago",
    pinned: false,
    views: 42,
  },
  {
    id: 4,
    title: "Industrial Visit Announcement",
    content: "An industrial visit to Walton Hi-Tech Industries is scheduled for December 25, 2024. Interested students please register.",
    type: "info",
    author: "CR - Rakib Ahmed",
    date: "2 days ago",
    pinned: false,
    views: 35,
  },
  {
    id: 5,
    title: "Lab Equipment Guidelines",
    content: "New guidelines for using lab equipment have been issued. Please read and follow them strictly.",
    type: "general",
    author: "CR - Rakib Ahmed",
    date: "3 days ago",
    pinned: false,
    views: 28,
  },
];

const getTypeConfig = (type: string) => {
  switch (type) {
    case "important":
      return {
        icon: AlertCircle,
        color: "text-red-600",
        bg: "bg-red-100",
        badge: "bg-red-100 text-red-700",
        label: "Important",
      };
    case "alert":
      return {
        icon: AlertCircle,
        color: "text-orange-600",
        bg: "bg-orange-100",
        badge: "bg-orange-100 text-orange-700",
        label: "Alert",
      };
    case "info":
      return {
        icon: Info,
        color: "text-blue-600",
        bg: "bg-blue-100",
        badge: "bg-blue-100 text-blue-700",
        label: "Information",
      };
    default:
      return {
        icon: CheckCircle,
        color: "text-green-600",
        bg: "bg-green-100",
        badge: "bg-green-100 text-green-700",
        label: "General",
      };
  }
};

const ManageNotices: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const handleDelete = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedNotice) {
      setNotices(notices.filter((n) => n.id !== selectedNotice.id));
      setSelectedNotice(null);
    }
  };

  const togglePin = (id: number) => {
    setNotices(notices.map((n) =>
      n.id === id ? { ...n, pinned: !n.pinned } : n
    ));
  };

  const pinnedCount = notices.filter((n) => n.pinned).length;
  const totalViews = notices.reduce((sum, n) => sum + n.views, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Notices"
        description="Create and manage class notices and announcements"
        icon={<Bell className="w-6 h-6" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Notices" },
        ]}
        action={
          <Link href="/dashboard/cr/notices/add">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Notice
            </Button>
          </Link>
        }
      />

      <StatsOverview
        items={[
          { label: "Total Notices", value: notices.length },
          { label: "Pinned", value: pinnedCount, valueClassName: "text-orange-600" },
          { label: "This Week", value: 5 },
          { label: "Total Views", value: totalViews },
        ]}
      />

      {/* Notices List */}
      <div className="space-y-4">
        {notices.map((notice) => {
          const typeConfig = getTypeConfig(notice.type);
          const TypeIcon = typeConfig.icon;

          return (
            <div
              key={notice.id}
              className={`bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow ${
                notice.pinned ? "ring-2 ring-primary/20" : ""
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${typeConfig.bg}`}>
                      <TypeIcon className={`w-6 h-6 ${typeConfig.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-gray-900">
                          {notice.title}
                        </h3>
                        {notice.pinned && (
                          <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                            <Pin className="w-3 h-3" />
                            Pinned
                          </span>
                        )}
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded-full ${typeConfig.badge}`}
                        >
                          {typeConfig.label}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2 line-clamp-2">
                        {notice.content}
                      </p>
                      <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {notice.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {notice.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {notice.views} views
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`gap-1 ${notice.pinned ? "text-yellow-600" : ""}`}
                      onClick={() => togglePin(notice.id)}
                    >
                      <Pin className="w-4 h-4" />
                    </Button>
                    <Link href={`/dashboard/cr/notices/${notice.id}/edit`}>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(notice)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Notice"
        description={`Are you sure you want to delete the notice "${selectedNotice?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default ManageNotices;
