"use client";

import {
  ArrowRight,
  Bell,
  BookOpen,
  Calendar,
  ClipboardList,
  Clock,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import PageHeader from "../shared/PageHeader";
import StatsCard from "../shared/StatsCard";

const recentActivities = [
  {
    id: 1,
    action: "New student issue submitted",
    description: "Regarding exam hall allocation",
    time: "5 min ago",
    icon: MessageSquare,
    color: "text-orange-500 bg-orange-100",
  },
  {
    id: 2,
    action: "Notice published",
    description: "Mid-term exam schedule",
    time: "1 hour ago",
    icon: Bell,
    color: "text-blue-500 bg-blue-100",
  },
  {
    id: 3,
    action: "New student added",
    description: "Sakib Hasan joined the class",
    time: "2 hours ago",
    icon: Users,
    color: "text-green-500 bg-green-100",
  },
  {
    id: 4,
    action: "Routine updated",
    description: "Friday class schedule changed",
    time: "3 hours ago",
    icon: Calendar,
    color: "text-purple-500 bg-purple-100",
  },
];

const quickActions = [
  {
    label: "Add Student",
    href: "/dashboard/cr/students/add",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    label: "Create Notice",
    href: "/dashboard/cr/notices/add",
    icon: Bell,
    color: "bg-green-500",
  },
  {
    label: "Update Routine",
    href: "/dashboard/cr/routine",
    icon: Calendar,
    color: "bg-purple-500",
  },
  {
    label: "View Issues",
    href: "/dashboard/cr/issues",
    icon: MessageSquare,
    color: "bg-orange-500",
  },
];

const upcomingClasses = [
  {
    subject: "Database Management",
    teacher: "Dr. Kamal Ahmed",
    time: "10:00 AM - 11:30 AM",
    room: "Room 301",
  },
  {
    subject: "Software Engineering",
    teacher: "Prof. Rina Begum",
    time: "12:00 PM - 1:30 PM",
    room: "Room 205",
  },
  {
    subject: "Computer Networks",
    teacher: "Mr. Jahid Hassan",
    time: "2:00 PM - 3:30 PM",
    room: "Lab 102",
  },
];

const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your class today."
        icon={<TrendingUp className="w-6 h-6" />}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Students"
          value={45}
          icon={Users}
          color="blue"
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Active Subjects"
          value={8}
          icon={BookOpen}
          color="green"
        />
        <StatsCard
          title="Pending Issues"
          value={3}
          icon={MessageSquare}
          color="orange"
          trend={{ value: 2, isPositive: false }}
        />
        <StatsCard
          title="Assessments"
          value={12}
          icon={ClipboardList}
          color="purple"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>
            <Link
              href="#"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className={`p-2.5 rounded-xl ${activity.color}`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">
                    {activity.description}
                  </p>
                </div>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href} className="group">
                <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className={`p-3 rounded-xl ${action.color} text-white`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {action.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Classes */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Today&apos;s Classes
          </h2>
          <Link
            href="/dashboard/cr/classes"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            View All Classes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingClasses.map((cls) => (
            <div
              key={cls.subject}
              className="p-4 rounded-xl bg-linear-to-br from-primary/5 to-primary/10 border border-primary/10"
            >
              <h3 className="font-semibold text-gray-900">{cls.subject}</h3>
              <p className="text-sm text-gray-600 mt-1">{cls.teacher}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {cls.time}
                </span>
                <span>{cls.room}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
