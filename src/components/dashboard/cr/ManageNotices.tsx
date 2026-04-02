"use client";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/ui/modal";
import { Notice } from "@/interface/notice.interface";
import { deleteNotice } from "@/services/notice.service";
import {
    AlertCircle,
    Bell,
    Calendar,
    CheckCircle,
    Edit,
    Eye,
    Info,
    Plus,
    Trash2,
    User,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import PageHeader from "../shared/PageHeader";
import StatsOverview from "../shared/StatsOverview";

const getTypeConfig = (type: string) => {
  switch (type) {
    case "URGENT":
      return {
        icon: AlertCircle,
        color: "text-red-600",
        bg: "bg-red-100",
        badge: "bg-red-100 text-red-700",
        label: "Urgent",
      };
    case "EXAM":
      return {
        icon: CheckCircle,
        color: "text-orange-600",
        bg: "bg-orange-100",
        badge: "bg-orange-100 text-orange-700",
        label: "Exam",
      };
    case "EVENT":
      return {
        icon: Info,
        color: "text-blue-600",
        bg: "bg-blue-100",
        badge: "bg-blue-100 text-blue-700",
        label: "Event",
      };
    case "HOLIDAY":
      return {
        icon: Calendar,
        color: "text-purple-600",
        bg: "bg-purple-100",
        badge: "bg-purple-100 text-purple-700",
        label: "Holiday",
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

const formatDate = (value?: string) => {
  if (!value) return "N/A";
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

interface ManageNoticesProps {
  initialNotices: Notice[];
}

const ManageNotices: React.FC<ManageNoticesProps> = ({ initialNotices }) => {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedNotice) return;

    setIsDeleting(true);
    try {
      const result = await deleteNotice(selectedNotice.id);
      if (result.success) {
        setNotices((prev) => prev.filter((notice) => notice.id !== selectedNotice.id));
        toast.success(result.message || "Notice deleted successfully");
        setSelectedNotice(null);
        setIsDeleteModalOpen(false);
      } else {
        toast.error(result.message || "Failed to delete notice");
      }
    } catch {
      toast.error("Failed to delete notice");
    } finally {
      setIsDeleting(false);
    }
  };

  const activeCount = notices.filter((n) => n.isActive).length;
  const totalViews = notices.reduce((sum, notice) => sum + (notice.viewCount || 0), 0);

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
          { label: "Active", value: activeCount, valueClassName: "text-green-600" },
          {
            label: "This Week",
            value: notices.filter((n) => {
              const createdAt = new Date(n.createdAt);
              if (Number.isNaN(createdAt.getTime())) return false;
              return Date.now() - createdAt.getTime() <= 7 * 24 * 60 * 60 * 1000;
            }).length,
          },
          {
            label: "Total Views",
            value: totalViews,
          },
        ]}
        gridClassName="grid-cols-2 md:grid-cols-4"
      />

      {/* Notices List */}
      <div className="space-y-4">
        {notices.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No notices found yet</p>
            <Link href="/dashboard/cr/notices/add">
              <Button className="mt-4">Create Your First Notice</Button>
            </Link>
          </div>
        ) : (
        notices.map((notice) => {
          const typeConfig = getTypeConfig(notice.type);
          const TypeIcon = typeConfig.icon;

          return (
            <div
              key={notice.id}
              className={`bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow ${notice.isActive ? "ring-2 ring-primary/20" : ""}`}
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
                        {notice.isActive && (
                          <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            Active
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
                          {notice.postedById || "CR"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(notice.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {notice.viewCount || 0} views
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
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
        }))}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Notice"
        description={`Are you sure you want to delete the notice "${selectedNotice?.title}"? This action cannot be undone.`}
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ManageNotices;
