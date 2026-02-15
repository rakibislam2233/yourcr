"use client";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/ui/modal";
import { Class } from "@/interface/class.interface";
import { deleteClass } from "@/services/class.service";
import {
  Calendar,
  Clock,
  Copy,
  Edit,
  ExternalLink,
  MapPin,
  Plus,
  Trash2,
  Video,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import PageHeader from "../../shared/PageHeader";

interface ManageClassesProps {
  initialClasses: Class[];
}

const ManageClasses: React.FC<ManageClassesProps> = ({ initialClasses }) => {
  const [classes, setClasses] = useState<Class[]>(initialClasses);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard");
  };

  const handleDelete = (cls: Class) => {
    setSelectedClass(cls);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedClass) return;

    setIsDeleting(true);
    try {
      const result = await deleteClass(selectedClass.id);
      if (result.success) {
        setClasses(classes.filter((c) => c.id !== selectedClass.id));
        toast.success(result.message);
        setIsDeleteModalOpen(false);
        setSelectedClass(null);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to delete class");
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      SCHEDULED: "bg-gray-100 text-gray-600",
      ONGOING: "bg-red-100 text-red-600",
      COMPLETED: "bg-green-100 text-green-600",
      CANCELLED: "bg-yellow-100 text-yellow-600",
    };
    return (
      statusColors[status as keyof typeof statusColors] ||
      statusColors.SCHEDULED
    );
  };

  const getClassTypeIcon = (classType: string) => {
    return classType === "ONLINE" ? (
      <Video className="w-6 h-6" />
    ) : (
      <MapPin className="w-6 h-6" />
    );
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return "";

    // Check if it's already in 12h format
    if (timeStr.match(/^\d{1,2}:\d{2}\s?(AM|PM)$/i)) return timeStr;

    // Check if it's 24h format (HH:MM)
    if (timeStr.match(/^\d{1,2}:\d{2}$/)) {
      const [hours, minutes] = timeStr.split(":").map(Number);
      const period = hours >= 12 ? "PM" : "AM";
      const hours12 = hours % 12 || 12;
      return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
    }

    // Try parsing as ISO date
    const date = new Date(timeStr);
    if (!isNaN(date.getTime())) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }

    return timeStr;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;

    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="w-full space-y-6">
      <PageHeader
        title="Manage Classes"
        description="Manage class schedules and meeting links"
        icon={<Video className="w-6 h-6" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Classes" },
        ]}
        action={
          <Link href="/dashboard/cr/classes/add">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Schedule Class
            </Button>
          </Link>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Total Classes</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {classes.length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Ongoing</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {classes.filter((c) => c.status === "ONGOING").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Scheduled</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {classes.filter((c) => c.status === "SCHEDULED").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {classes.filter((c) => c.status === "COMPLETED").length}
          </p>
        </div>
      </div>

      {/* Classes List */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            Scheduled Classes
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {classes.length === 0 ? (
            <div className="p-12 text-center">
              <Video className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No classes scheduled yet</p>
              <Link href="/dashboard/cr/classes/add">
                <Button className="mt-4">Schedule Your First Class</Button>
              </Link>
            </div>
          ) : (
            classes.map((cls) => (
              <div
                key={cls.id}
                className="p-6 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl ${
                        cls.status === "ONGOING"
                          ? "bg-red-100 text-red-600"
                          : cls.status === "SCHEDULED"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {getClassTypeIcon(cls.classType)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">
                          {cls.subject?.name || "Unknown Subject"}
                        </h4>
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusBadge(cls.status)}`}
                        >
                          {cls.status}
                        </span>
                        {cls.status === "ONGOING" && (
                          <span className="flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                            LIVE
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {cls.teacher?.name || "Unknown Teacher"}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5 text-gray-600 bg-gray-50 px-2.5 py-1 rounded-md">
                          <Calendar className="w-4 h-4 text-primary" />
                          {formatDate(cls.classDate.toString())}
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-600 bg-gray-50 px-2.5 py-1 rounded-md">
                          <Clock className="w-4 h-4 text-primary" />
                          {formatTime(cls.startTime)} -{" "}
                          {formatTime(cls.endTime)}
                        </span>
                        {cls.classType === "ONLINE" && cls.platform && (
                          <span className="flex items-center gap-1.5 text-gray-600 bg-gray-50 px-2.5 py-1 rounded-md">
                            <Video className="w-4 h-4 text-primary" />
                            {cls.platform}
                          </span>
                        )}
                        {cls.classType === "OFFLINE" && cls.roomNumber && (
                          <span className="flex items-center gap-1.5 text-gray-600 bg-gray-50 px-2.5 py-1 rounded-md">
                            <MapPin className="w-4 h-4 text-primary" />
                            {cls.roomNumber}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pl-14 lg:pl-0">
                    {cls.classType === "ONLINE" && cls.joinLink && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyLink(cls.joinLink!)}
                          className="gap-1"
                        >
                          <Copy className="w-4 h-4" />
                          Copy
                        </Button>
                        <Button
                          size="sm"
                          className={`gap-1 ${cls.status === "ONGOING" ? "bg-red-500 hover:bg-red-600" : ""}`}
                          onClick={() => window.open(cls.joinLink, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4" />
                          {cls.status === "ONGOING" ? "Join Now" : "Open Link"}
                        </Button>
                      </>
                    )}
                    <Link href={`/dashboard/cr/classes/${cls.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(cls)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Class"
        description={`Are you sure you want to delete the class "${selectedClass?.subject?.name || "this class"}"? This action cannot be undone.`}
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        variant="danger"
      />
    </section>
  );
};

export default ManageClasses;
