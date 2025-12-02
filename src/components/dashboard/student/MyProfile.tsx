"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Lock,
  Bell,
  Camera,
  Save,
  Eye,
  EyeOff,
  GraduationCap,
  Building2,
  Calendar,
} from "lucide-react";
import PageHeader from "../shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MyProfile: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    notices: true,
    classes: true,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        description="View and manage your profile settings"
        icon={User}
        breadcrumbs={[
          { label: "Home", href: "/dashboard/student" },
          { label: "My Profile" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-emerald-500 to-emerald-400 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
                  SH
                </div>
                <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mt-4">
                Sakib Hasan
              </h3>
              <p className="text-emerald-600 font-medium">Student</p>
              <p className="text-sm text-gray-500 mt-1">CT-8001</p>
            </div>

            {/* Academic Info */}
            <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Building2 className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Department</p>
                  <p className="text-sm font-medium text-gray-900">
                    Computer Technology
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <GraduationCap className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Semester</p>
                  <p className="text-sm font-medium text-gray-900">
                    8th Semester
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Calendar className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Session</p>
                  <p className="text-sm font-medium text-gray-900">2020-2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Your Stats</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Attendance</span>
                <span className="font-semibold text-green-600">94%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Avg. Grade</span>
                <span className="font-semibold text-gray-900">B+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Issues Submitted</span>
                <span className="font-semibold text-gray-900">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Issues Resolved</span>
                <span className="font-semibold text-green-600">4</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Settings Forms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Personal Information */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Personal Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input defaultValue="Sakib Hasan" />
              </div>
              <div className="space-y-2">
                <Label>Roll Number</Label>
                <Input defaultValue="CT-8001" disabled />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" defaultValue="sakib.hasan@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input type="tel" defaultValue="+880 1711-111111" />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Lock className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Change Password
              </h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label>Confirm Password</Label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button variant="outline" className="gap-2">
                <Lock className="w-4 h-4" />
                Update Password
              </Button>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <Bell className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Notification Preferences
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">
                    Receive updates via email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) =>
                      setNotifications({ ...notifications, email: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Push Notifications</p>
                  <p className="text-sm text-gray-500">
                    Browser push notifications
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={(e) =>
                      setNotifications({ ...notifications, push: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Notice Alerts</p>
                  <p className="text-sm text-gray-500">
                    When a new notice is posted
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.notices}
                    onChange={(e) =>
                      setNotifications({ ...notifications, notices: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Class Reminders</p>
                  <p className="text-sm text-gray-500">
                    30 minutes before class starts
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.classes}
                    onChange={(e) =>
                      setNotifications({ ...notifications, classes: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyProfile;
