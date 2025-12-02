"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const mockNotifications = [
  {
    id: 1,
    title: "New notice posted",
    message: "Mid-term exam schedule has been published",
    time: "10 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "Class cancelled",
    message: "Tomorrow's Math class has been cancelled",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    title: "Assignment due",
    message: "Database assignment submission deadline tomorrow",
    time: "2 hours ago",
    unread: false,
  },
];

const StudentHeader: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const unreadCount = mockNotifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Side - Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search notices, subjects..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Center - Semester Info (Read-only for students) */}
        <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-xl">
          <div className="text-left">
            <p className="text-xs text-gray-500">Current Semester</p>
            <p className="text-sm font-semibold text-gray-900">8th Semester</p>
          </div>
        </div>

        {/* Right Side - Notifications & Profile */}
        <div className="flex items-center gap-3 ml-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
              className="relative p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowNotifications(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20"
                  >
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-900">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {mockNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                            notification.unread ? "bg-blue-50/50" : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {notification.unread && (
                              <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                            )}
                            <div className={notification.unread ? "" : "ml-5"}>
                              <p className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-100">
                      <button className="w-full py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center text-white font-semibold text-sm">
                SH
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-900">
                  Sakib Hasan
                </p>
                <p className="text-xs text-gray-500">Student</p>
              </div>
              <ChevronDown
                className={`hidden md:block w-4 h-4 text-gray-400 transition-transform ${
                  showProfile ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {showProfile && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowProfile(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20"
                  >
                    <div className="p-4 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">Sakib Hasan</p>
                      <p className="text-sm text-gray-500">
                        sakib@example.com
                      </p>
                    </div>
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <User className="w-4 h-4" />
                        My Profile
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                    </div>
                    <div className="p-2 border-t border-gray-100">
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
