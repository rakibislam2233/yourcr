"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Search,
  Filter,
  Calendar,
  User,
  AlertCircle,
  Info,
  CheckCircle,
  Pin,
} from "lucide-react";
import PageHeader from "../shared/PageHeader";
import { Button } from "@/components/ui/button";

const notices = [
  {
    id: 1,
    title: "Mid-Term Examination Schedule",
    content: "Mid-term examinations will be held from December 15-20, 2024. Please check the detailed schedule attached. All students must bring their ID cards.",
    type: "important",
    author: "CR - Rakib Ahmed",
    date: "2 hours ago",
    pinned: true,
    read: false,
  },
  {
    id: 2,
    title: "Class Cancelled - Software Engineering",
    content: "Tomorrow's Software Engineering class has been cancelled due to faculty meeting. Makeup class will be scheduled for next week.",
    type: "alert",
    author: "CR - Rakib Ahmed",
    date: "5 hours ago",
    pinned: true,
    read: false,
  },
  {
    id: 3,
    title: "Project Submission Deadline Extended",
    content: "The deadline for the Database project has been extended to December 10, 2024. Please utilize this extra time to improve your submissions.",
    type: "info",
    author: "CR - Rakib Ahmed",
    date: "1 day ago",
    pinned: false,
    read: true,
  },
  {
    id: 4,
    title: "Industrial Visit Announcement",
    content: "An industrial visit to Walton Hi-Tech Industries is scheduled for December 25, 2024. Interested students please register by December 15.",
    type: "info",
    author: "CR - Rakib Ahmed",
    date: "2 days ago",
    pinned: false,
    read: true,
  },
  {
    id: 5,
    title: "Lab Equipment Guidelines",
    content: "New guidelines for using lab equipment have been issued. Please read and follow them strictly to avoid any accidents.",
    type: "general",
    author: "CR - Rakib Ahmed",
    date: "3 days ago",
    pinned: false,
    read: true,
  },
  {
    id: 6,
    title: "Scholarship Application Open",
    content: "Merit-based scholarship applications are now open for the current semester. Eligible students can apply through the portal.",
    type: "info",
    author: "CR - Rakib Ahmed",
    date: "4 days ago",
    pinned: false,
    read: true,
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

const ViewNotices: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotices = notices.filter((notice) => {
    const matchesFilter = activeFilter === "all" || notice.type === activeFilter;
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notices"
        description="Stay updated with class announcements and notices"
        icon={Bell}
        breadcrumbs={[
          { label: "Home", href: "/dashboard/student" },
          { label: "Notices" },
        ]}
      />

      {/* Filter and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
      >
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {["all", "important", "alert", "info", "general"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter === "all"
                ? "All Notices"
                : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.map((notice, index) => {
          const typeConfig = getTypeConfig(notice.type);
          const TypeIcon = typeConfig.icon;

          return (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition-all cursor-pointer ${
                notice.read ? "border-gray-100" : "border-primary/30 bg-primary/5"
              }`}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${typeConfig.bg}`}>
                    <TypeIcon className={`w-6 h-6 ${typeConfig.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900">
                        {notice.title}
                      </h3>
                      {!notice.read && (
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      )}
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
                    <p className="text-gray-600 mt-2">{notice.content}</p>
                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {notice.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {notice.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewNotices;
