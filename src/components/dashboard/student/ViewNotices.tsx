"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Search,
  Filter,
  Calendar,
  AlertCircle,
  CheckCircle,
  Star,
  BookOpen,
  Sun,
  FileText,
} from "lucide-react";
import PageHeader from "../shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Notice } from "@/interface/notice.interface";

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
        icon: BookOpen,
        color: "text-orange-600",
        bg: "bg-orange-100",
        badge: "bg-orange-100 text-orange-700",
        label: "Exam",
      };
    case "EVENT":
      return {
        icon: Star,
        color: "text-blue-600",
        bg: "bg-blue-100",
        badge: "bg-blue-100 text-blue-700",
        label: "Event",
      };
    case "HOLIDAY":
      return {
        icon: Sun,
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

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

interface ViewNoticesProps {
  initialNotices: Notice[];
}

const ViewNotices: React.FC<ViewNoticesProps> = ({ initialNotices }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotices = initialNotices.filter((notice) => {
    const matchesFilter =
      activeFilter === "all" || notice.type === activeFilter;
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filters = [
    { value: "all", label: "All Notices" },
    { value: "URGENT", label: "Urgent" },
    { value: "EXAM", label: "Exam" },
    { value: "EVENT", label: "Event" },
    { value: "HOLIDAY", label: "Holiday" },
    { value: "GENERAL", label: "General" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notices"
        description="Stay updated with class announcements and notices"
        icon={<Bell />}
        breadcrumbs={[
          { label: "Home", href: "/dashboard/student" },
          { label: "Notices" },
        ]}
      />

      {/* Filter and Search */}
      <motion.div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === filter.value
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter.label}
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
      {filteredNotices.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No notices found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotices.map((notice) => {
            const typeConfig = getTypeConfig(notice.type);
            const TypeIcon = typeConfig.icon;

            return (
              <motion.div
                key={notice.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all cursor-pointer"
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
                        {notice.isActive && (
                          <span className="w-2 h-2 rounded-full bg-primary" />
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
                          <Calendar className="w-4 h-4" />
                          {formatDate(notice.createdAt)}
                        </span>
                        {notice.fileUrl && (
                          <a
                            href={notice.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FileText className="w-4 h-4" />
                            Attachment
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewNotices;
