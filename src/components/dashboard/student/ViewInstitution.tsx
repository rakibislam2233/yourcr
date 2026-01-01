"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Building2,
  Calendar,
  ExternalLink,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import React from "react";
import PageHeader from "../shared/PageHeader";

const institutionData = {
  name: "Dhaka Polytechnic Institute",
  shortName: "DPI",
  type: "Polytechnic Institute",
  establishedYear: 1955,
  address: "Tejgaon Industrial Area, Dhaka-1208, Bangladesh",
  phone: "+880-2-8870553",
  email: "info@dpi.gov.bd",
  website: "www.dpi.gov.bd",
  totalStudents: 5000,
  totalDepartments: 12,
};

const yourInfo = {
  department: "Computer Technology",
  semester: "8th Semester",
  session: "2020-2024",
  shift: "1st Shift",
  group: "A",
  roll: "CT-8001",
  cr: "Rakib Ahmed",
};

const ViewInstitution: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Institute"
        description="View your institution details"
        icon={Building2}
        breadcrumbs={[
          { label: "Home", href: "/dashboard/student" },
          { label: "My Institute" },
        ]}
      />

      {/* Institution Overview Card */}
      <motion.div className="bg-linear-to-r from-primary to-primary/80 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <Building2 className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{institutionData.name}</h2>
              <p className="text-white/80 mt-1">{institutionData.type}</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  Est. {institutionData.establishedYear}
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {institutionData.shortName}
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="secondary"
            className="gap-2 bg-white/20 hover:bg-white/30 text-white border-0"
          >
            <Globe className="w-4 h-4" />
            Visit Website
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <motion.div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Contact Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="p-2.5 bg-blue-100 text-blue-600 rounded-lg">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium text-gray-900">
                  {institutionData.address}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="p-2.5 bg-green-100 text-green-600 rounded-lg">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">
                  {institutionData.phone}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="p-2.5 bg-purple-100 text-purple-600 rounded-lg">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">
                  {institutionData.email}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="p-2.5 bg-orange-100 text-orange-600 rounded-lg">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <p className="font-medium text-gray-900">
                  {institutionData.website}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Your Information */}
        <motion.div
          className="bg-white rounded-2xl p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Your Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-semibold text-gray-900 mt-1">
                {yourInfo.department}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Semester</p>
              <p className="font-semibold text-gray-900 mt-1">
                {yourInfo.semester}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Session</p>
              <p className="font-semibold text-gray-900 mt-1">
                {yourInfo.session}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Shift</p>
              <p className="font-semibold text-gray-900 mt-1">
                {yourInfo.shift}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Group</p>
              <p className="font-semibold text-gray-900 mt-1">
                Group {yourInfo.group}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Roll Number</p>
              <p className="font-semibold text-gray-900 mt-1">
                {yourInfo.roll}
              </p>
            </div>
            <div className="p-4 bg-primary/5 rounded-xl col-span-2 border border-primary/20">
              <p className="text-sm text-gray-500">Class Representative</p>
              <p className="font-semibold text-primary mt-1">{yourInfo.cr}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Institution Stats */}
      <motion.div
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <GraduationCap className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {institutionData.totalStudents.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">Total Students</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Building2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {institutionData.totalDepartments}
              </p>
              <p className="text-sm text-gray-500">Departments</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">250+</p>
              <p className="text-sm text-gray-500">Faculty Members</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">69+</p>
              <p className="text-sm text-gray-500">Years Legacy</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewInstitution;
