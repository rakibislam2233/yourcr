"use client";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/ui/modal";
import {
  Calendar,
  Clock,
  Copy,
  Edit,
  ExternalLink,
  Link as LinkIcon,
  Plus,
  Trash2,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import PageHeader from "../../shared/PageHeader";

interface OnlineClass {
  id: number;
  subject: string;
  teacher: string;
  date: string;
  time: string;
  platform: string;
  link: string;
  status: string;
  attendees: number;
}

const initialClasses: OnlineClass[] = [
  {
    id: 1,
    subject: "Database Management System",
    teacher: "Dr. Kamal Ahmed",
    date: "Today",
    time: "10:00 AM - 11:30 AM",
    platform: "Google Meet",
    link: "https://meet.google.com/abc-defg-hij",
    status: "live",
    attendees: 42,
  },
  {
    id: 2,
    subject: "Software Engineering",
    teacher: "Prof. Rina Begum",
    date: "Today",
    time: "2:00 PM - 3:30 PM",
    platform: "Zoom",
    link: "https://zoom.us/j/123456789",
    status: "upcoming",
    attendees: 0,
  },
  {
    id: 3,
    subject: "Computer Networks",
    teacher: "Mr. Jahid Hassan",
    date: "Tomorrow",
    time: "11:00 AM - 12:30 PM",
    platform: "Google Meet",
    link: "https://meet.google.com/xyz-uvwx-rst",
    status: "scheduled",
    attendees: 0,
  },
];

const ManageClasses: React.FC = () => {
  const [classes, setClasses] = useState<OnlineClass[]>(initialClasses);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<OnlineClass | null>(null);

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
  };

  const handleDelete = (cls: OnlineClass) => {
    setSelectedClass(cls);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedClass) {
      setClasses(classes.filter((c) => c.id !== selectedClass.id));
      setSelectedClass(null);
    }
  };

  return (
    <section className="w-full space-y-6">
      <PageHeader
        title="Manage Classes"
        description="Manage online class schedules and meeting links"
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
          <p className="text-sm text-gray-500">Today&apos;s Classes</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {classes.filter((c) => c.date === "Today").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Live Now</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {classes.filter((c) => c.status === "live").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Upcoming</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {
              classes.filter(
                (c) => c.status === "upcoming" || c.status === "scheduled",
              ).length
            }
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <p className="text-sm text-gray-500">Total Scheduled</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {classes.length}
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
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="p-6 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl ${
                      cls.status === "live"
                        ? "bg-red-100"
                        : cls.status === "upcoming"
                          ? "bg-green-100"
                          : "bg-gray-100"
                    }`}
                  >
                    <Video
                      className={`w-6 h-6 ${
                        cls.status === "live"
                          ? "text-red-600"
                          : cls.status === "upcoming"
                            ? "text-green-600"
                            : "text-gray-600"
                      }`}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">
                        {cls.subject}
                      </h4>
                      {cls.status === "live" && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                          LIVE
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{cls.teacher}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {cls.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {cls.time}
                      </span>
                      {cls.status === "live" && (
                        <span className="flex items-center gap-1 text-green-600">
                          <Users className="w-4 h-4" />
                          {cls.attendees} attending
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 pl-14 lg:pl-0">
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-md">
                    <LinkIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {cls.platform}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyLink(cls.link)}
                    className="gap-1"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
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
                  <Button
                    size="sm"
                    className={`gap-1 ${cls.status === "live" ? "bg-red-500 hover:bg-red-600" : ""}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    {cls.status === "live" ? "Join Now" : "Open Link"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Class"
        description={`Are you sure you want to delete the class "${selectedClass?.subject}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </section>
  );
};

export default ManageClasses;
