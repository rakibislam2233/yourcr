"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Video,
  Plus,
  ExternalLink,
  Calendar,
  Clock,
  Users,
  Link as LinkIcon,
  Copy,
  Play,
} from "lucide-react";
import PageHeader from "../shared/PageHeader";
import { Button } from "@/components/ui/button";

const upcomingClasses = [
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

const recentClasses = [
  {
    id: 1,
    subject: "Operating Systems",
    teacher: "Dr. Fatema Khatun",
    date: "Yesterday",
    time: "9:00 AM - 10:30 AM",
    duration: "1h 28m",
    attendees: 38,
    recording: true,
  },
  {
    id: 2,
    subject: "AI & Machine Learning",
    teacher: "Mr. Rezaul Karim",
    date: "2 days ago",
    time: "11:00 AM - 12:30 PM",
    duration: "1h 25m",
    attendees: 40,
    recording: true,
  },
  {
    id: 3,
    subject: "Web Development",
    teacher: "Ms. Nusrat Jahan",
    date: "3 days ago",
    time: "3:00 PM - 4:30 PM",
    duration: "1h 30m",
    attendees: 35,
    recording: false,
  },
];

const ManageClasses: React.FC = () => {
  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Classes"
        description="Manage online class schedules and meeting links"
        icon={Video}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Classes" },
        ]}
        action={
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Schedule Class
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-5 border border-gray-100"
        >
          <p className="text-sm text-gray-500">Today&apos;s Classes</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-5 border border-gray-100"
        >
          <p className="text-sm text-gray-500">This Week</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">15</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-5 border border-gray-100"
        >
          <p className="text-sm text-gray-500">Total Hours</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">42h</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-5 border border-gray-100"
        >
          <p className="text-sm text-gray-500">Avg. Attendance</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">89%</p>
        </motion.div>
      </div>

      {/* Upcoming Classes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl border border-gray-100"
      >
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            Upcoming Classes
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {upcomingClasses.map((cls, index) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
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
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                    <LinkIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{cls.platform}</span>
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
                  <Button
                    size="sm"
                    className={`gap-1 ${
                      cls.status === "live" ? "bg-red-500 hover:bg-red-600" : ""
                    }`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    {cls.status === "live" ? "Join Now" : "Open Link"}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Classes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl border border-gray-100"
      >
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent Classes</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {recentClasses.map((cls, index) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="p-6 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-100">
                    <Video className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{cls.subject}</h4>
                    <p className="text-sm text-gray-500 mt-1">{cls.teacher}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {cls.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {cls.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {cls.attendees} attended
                      </span>
                    </div>
                  </div>
                </div>
                {cls.recording && (
                  <Button variant="outline" size="sm" className="gap-2 ml-14 lg:ml-0 w-fit">
                    <Play className="w-4 h-4" />
                    Watch Recording
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ManageClasses;
