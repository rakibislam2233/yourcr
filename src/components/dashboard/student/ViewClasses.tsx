"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Video,
  Calendar,
  Clock,
  Users,
  ExternalLink,
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
    status: "upcoming",
  },
  {
    id: 3,
    subject: "Computer Networks",
    teacher: "Mr. Jahid Hassan",
    date: "Tomorrow",
    time: "11:00 AM - 12:30 PM",
    platform: "Google Meet",
    status: "scheduled",
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
    recording: true,
  },
  {
    id: 2,
    subject: "AI & Machine Learning",
    teacher: "Mr. Rezaul Karim",
    date: "2 days ago",
    time: "11:00 AM - 12:30 PM",
    duration: "1h 25m",
    recording: true,
  },
  {
    id: 3,
    subject: "Web Development",
    teacher: "Ms. Nusrat Jahan",
    date: "3 days ago",
    time: "3:00 PM - 4:30 PM",
    duration: "1h 30m",
    recording: false,
  },
];

const ViewClasses: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Online Classes"
        description="Join your online classes and view recordings"
        icon={Video}
        breadcrumbs={[
          { label: "Home", href: "/dashboard/student" },
          { label: "Classes" },
        ]}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <p className="text-sm text-gray-500">Classes Attended</p>
          <p className="text-2xl font-bold text-green-600 mt-1">45/48</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-5 border border-gray-100"
        >
          <p className="text-sm text-gray-500">Recordings Available</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">12</p>
        </motion.div>
      </div>

      {/* Upcoming Classes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
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
              transition={{ delay: 0.4 + index * 0.1 }}
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
                          LIVE NOW
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
                      {cls.status === "live" && cls.attendees && (
                        <span className="flex items-center gap-1 text-green-600">
                          <Users className="w-4 h-4" />
                          {cls.attendees} attending
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 pl-14 lg:pl-0">
                  <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-600">
                    {cls.platform}
                  </span>
                  <Button
                    className={`gap-2 ${
                      cls.status === "live" ? "bg-red-500 hover:bg-red-600" : ""
                    }`}
                    disabled={cls.status === "scheduled"}
                  >
                    <ExternalLink className="w-4 h-4" />
                    {cls.status === "live" ? "Join Now" : cls.status === "upcoming" ? "Join" : "Scheduled"}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Classes with Recordings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl border border-gray-100"
      >
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Classes
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {recentClasses.map((cls, index) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="p-6 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-100">
                    <Video className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {cls.subject}
                    </h4>
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
                    </div>
                  </div>
                </div>
                {cls.recording ? (
                  <Button variant="outline" className="gap-2 ml-14 lg:ml-0 w-fit">
                    <Play className="w-4 h-4" />
                    Watch Recording
                  </Button>
                ) : (
                  <span className="text-sm text-gray-400 ml-14 lg:ml-0">
                    No recording available
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ViewClasses;
