"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Bell,
  ClipboardList,
  Video,
  Clock,
  ArrowRight,
  BookOpen,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import StatsCard from "../shared/StatsCard";

const upcomingItems = [
  {
    type: "class",
    title: "Database Management System",
    subtitle: "Dr. Kamal Ahmed",
    time: "10:00 AM - 11:30 AM",
    icon: Video,
    color: "bg-blue-500",
  },
  {
    type: "assessment",
    title: "Software Engineering Quiz",
    subtitle: "Due today at 11:59 PM",
    time: "3 hours left",
    icon: ClipboardList,
    color: "bg-orange-500",
  },
  {
    type: "class",
    title: "Computer Networks Lab",
    subtitle: "Mr. Jahid Hassan",
    time: "2:00 PM - 3:30 PM",
    icon: Video,
    color: "bg-purple-500",
  },
];

const recentNotices = [
  {
    id: 1,
    title: "Mid-Term Examination Schedule",
    type: "important",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Class Cancelled - Software Engineering",
    type: "alert",
    time: "5 hours ago",
  },
  {
    id: 3,
    title: "Project Submission Deadline Extended",
    type: "info",
    time: "1 day ago",
  },
];

const todayClasses = [
  {
    subject: "Database Management",
    time: "10:00 AM",
    room: "Room 301",
    status: "upcoming",
  },
  {
    subject: "Software Engineering",
    time: "12:00 PM",
    room: "Room 205",
    status: "upcoming",
  },
  {
    subject: "Computer Networks Lab",
    time: "2:00 PM",
    room: "Lab 102",
    status: "upcoming",
  },
];

const StudentHome: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white"
      >
        <h1 className="text-2xl font-bold">Welcome back, Sakib! 👋</h1>
        <p className="text-white/80 mt-2">
          Here&apos;s what&apos;s happening in your class today.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <div className="px-4 py-2 bg-white/20 rounded-xl">
            <p className="text-sm">8th Semester • Group A</p>
          </div>
          <div className="px-4 py-2 bg-white/20 rounded-xl">
            <p className="text-sm">Computer Technology</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Today's Classes"
          value={3}
          icon={Video}
          color="blue"
          delay={0}
        />
        <StatsCard
          title="Pending Assignments"
          value={2}
          icon={ClipboardList}
          color="orange"
          delay={0.1}
        />
        <StatsCard
          title="Unread Notices"
          value={4}
          icon={Bell}
          color="purple"
          delay={0.2}
        />
        <StatsCard
          title="Active Subjects"
          value={8}
          icon={BookOpen}
          color="green"
          delay={0.3}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Today&apos;s Schedule
            </h2>
            <Link
              href="/dashboard/student/routine"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View routine <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className={`p-3 rounded-xl ${item.color} text-white`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {item.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Notices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Notices
            </h2>
            <Link
              href="/dashboard/student/notices"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentNotices.map((notice, index) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-1.5 rounded-lg ${
                      notice.type === "important"
                        ? "bg-red-100"
                        : notice.type === "alert"
                        ? "bg-orange-100"
                        : "bg-blue-100"
                    }`}
                  >
                    {notice.type === "important" ? (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    ) : notice.type === "alert" ? (
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {notice.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{notice.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Today's Classes Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-2xl p-6 border border-gray-100"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Class Timeline
        </h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
          <div className="space-y-6">
            {todayClasses.map((cls, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center gap-4 pl-2"
              >
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <div className="flex-1 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {cls.subject}
                      </h3>
                      <p className="text-sm text-gray-500">{cls.room}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-primary">{cls.time}</p>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                        Upcoming
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentHome;
