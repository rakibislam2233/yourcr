"use client";

import React, { useState } from "react";
import {
  Bell,
  Search,
  Check,
  CheckCheck,
  Trash2,
  Calendar,
  MessageSquare,
  AlertCircle,
  Info,
  Clock,
} from "lucide-react";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  date: string;
  type: "issue" | "reminder" | "assessment" | "general" | "alert";
  unread: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "New student issue",
    message:
      "Rahul submitted a new issue about exam schedule. Please review and respond.",
    time: "5 min ago",
    date: "Today",
    type: "issue",
    unread: true,
  },
  {
    id: 2,
    title: "Class reminder",
    message:
      "Database class starts in 30 minutes. Room: 301, Teacher: Md. Karim",
    time: "25 min ago",
    date: "Today",
    type: "reminder",
    unread: true,
  },
  {
    id: 3,
    title: "Assessment deadline",
    message:
      "Mid-term exam schedule has been published. Check the assessments page for details.",
    time: "1 hour ago",
    date: "Today",
    type: "assessment",
    unread: false,
  },
  {
    id: 4,
    title: "New student joined",
    message: "Fatima Rahman has joined your class. Roll: CT-8046",
    time: "2 hours ago",
    date: "Today",
    type: "general",
    unread: false,
  },
  {
    id: 5,
    title: "Important Notice",
    message:
      "Holiday announcement: Institute will remain closed on 15th December for Victory Day.",
    time: "3 hours ago",
    date: "Today",
    type: "alert",
    unread: false,
  },
  {
    id: 6,
    title: "Assignment submission",
    message:
      "15 students have submitted the Database Assignment. 30 submissions pending.",
    time: "5 hours ago",
    date: "Today",
    type: "assessment",
    unread: false,
  },
  {
    id: 7,
    title: "Issue resolved",
    message: "Your response to Karim's issue has been marked as resolved.",
    time: "Yesterday",
    date: "Yesterday",
    type: "issue",
    unread: false,
  },
  {
    id: 8,
    title: "Routine updated",
    message:
      "Thursday's routine has been updated. New class added at 11:00 AM.",
    time: "Yesterday",
    date: "Yesterday",
    type: "reminder",
    unread: false,
  },
  {
    id: 9,
    title: "Quiz results published",
    message:
      "Web Technology quiz results have been published. Average score: 78%",
    time: "2 days ago",
    date: "Dec 1, 2024",
    type: "assessment",
    unread: false,
  },
  {
    id: 10,
    title: "Student issue",
    message: "Aminul submitted an issue regarding lab schedule conflict.",
    time: "2 days ago",
    date: "Dec 1, 2024",
    type: "issue",
    unread: false,
  },
];

const getTypeIcon = (type: Notification["type"]) => {
  switch (type) {
    case "issue":
      return MessageSquare;
    case "reminder":
      return Clock;
    case "assessment":
      return Calendar;
    case "alert":
      return AlertCircle;
    default:
      return Info;
  }
};

const getTypeColor = (type: Notification["type"]) => {
  switch (type) {
    case "issue":
      return "bg-purple-100 text-purple-600";
    case "reminder":
      return "bg-blue-100 text-blue-600";
    case "assessment":
      return "bg-green-100 text-green-600";
    case "alert":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterRead, setFilterRead] = useState<string>("all");

  const unreadCount = notifications.filter((n) => n.unread).length;

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      filterType === "all" || notification.type === filterType;
    const matchesRead =
      filterRead === "all" ||
      (filterRead === "unread" && notification.unread) ||
      (filterRead === "read" && !notification.unread);
    return matchesSearch && matchesType && matchesRead;
  });

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  // Group notifications by date
  const groupedNotifications = filteredNotifications.reduce(
    (groups, notification) => {
      const date = notification.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(notification);
      return groups;
    },
    {} as Record<string, Notification[]>,
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="View and manage all your notifications"
        icon={<Bell />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Notifications" },
        ]}
        action={
          unreadCount > 0 ? (
            <Button onClick={markAllAsRead} variant="outline" className="gap-2">
              <CheckCheck className="w-4 h-4" />
              Mark all as read
            </Button>
          ) : undefined
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-md">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.length}
              </p>
              <p className="text-sm text-gray-500">Total Notifications</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-md">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
              <p className="text-sm text-gray-500">Unread</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-md">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.length - unreadCount}
              </p>
              <p className="text-sm text-gray-500">Read</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Types</option>
              <option value="issue">Issues</option>
              <option value="reminder">Reminders</option>
              <option value="assessment">Assessments</option>
              <option value="alert">Alerts</option>
              <option value="general">General</option>
            </select>
            <select
              value={filterRead}
              onChange={(e) => setFilterRead(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-6">
        {Object.entries(groupedNotifications).length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notifications found
            </h3>
            <p className="text-gray-500">
              {searchQuery || filterType !== "all" || filterRead !== "all"
                ? "Try adjusting your filters"
                : "You're all caught up!"}
            </p>
          </div>
        ) : (
          Object.entries(groupedNotifications).map(([date, items]) => (
            <div key={date}>
              <h3 className="text-sm font-medium text-gray-500 mb-3">{date}</h3>
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                {items.map((notification, index) => {
                  const Icon = getTypeIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 flex items-start gap-4 ${
                        index !== items.length - 1
                          ? "border-b border-gray-100"
                          : ""
                      } ${notification.unread ? "bg-blue-50/50" : ""}`}
                    >
                      <div
                        className={`p-2.5 rounded-md ${getTypeColor(notification.type)}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              {notification.unread && (
                                <div className="w-2 h-2 rounded-full bg-primary" />
                              )}
                              <h4 className="font-medium text-gray-900">
                                {notification.title}
                              </h4>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {notification.time}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {notification.unread && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                                title="Mark as read"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
