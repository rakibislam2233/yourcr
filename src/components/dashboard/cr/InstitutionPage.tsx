"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Users,
  GraduationCap,
  Edit,
  ExternalLink,
} from "lucide-react";
import PageHeader from "../shared/PageHeader";
import { Button } from "@/components/ui/button";

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
  currentDepartment: "Computer Technology",
  currentSemester: "8th Semester",
  session: "2020-2024",
  shift: "1st Shift",
  group: "A",
};

const departmentInfo = {
  name: "Computer Technology",
  code: "CT",
  head: "Engr. Md. Abdul Karim",
  totalStudents: 450,
  totalTeachers: 25,
  labs: 8,
};

const InstitutionPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Institution"
        description="View and manage your institution details"
        icon={Building2}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "My Institution" },
        ]}
        action={
          <Button className="gap-2">
            <Edit className="w-4 h-4" />
            Edit Details
          </Button>
        }
      />

      {/* Institution Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white"
      >
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
          <div className="flex gap-3">
            <Button variant="secondary" className="gap-2 bg-white/20 hover:bg-white/30 text-white border-0">
              <Globe className="w-4 h-4" />
              Visit Website
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 border border-gray-100"
        >
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

        {/* Your Class Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Your Class Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-semibold text-gray-900 mt-1">
                {institutionData.currentDepartment}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Semester</p>
              <p className="font-semibold text-gray-900 mt-1">
                {institutionData.currentSemester}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Session</p>
              <p className="font-semibold text-gray-900 mt-1">
                {institutionData.session}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Shift</p>
              <p className="font-semibold text-gray-900 mt-1">
                {institutionData.shift}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl col-span-2">
              <p className="text-sm text-gray-500">Group</p>
              <p className="font-semibold text-gray-900 mt-1">
                Group {institutionData.group}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Department Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-6 border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Department Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <GraduationCap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {departmentInfo.totalStudents}
                </p>
                <p className="text-sm text-gray-500">Total Students</p>
              </div>
            </div>
          </div>
          <div className="p-5 bg-green-50 rounded-xl border border-green-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {departmentInfo.totalTeachers}
                </p>
                <p className="text-sm text-gray-500">Teachers</p>
              </div>
            </div>
          </div>
          <div className="p-5 bg-purple-50 rounded-xl border border-purple-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Building2 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {departmentInfo.labs}
                </p>
                <p className="text-sm text-gray-500">Labs</p>
              </div>
            </div>
          </div>
          <div className="p-5 bg-orange-50 rounded-xl border border-orange-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4</p>
                <p className="text-sm text-gray-500">Years Program</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Department Head</p>
              <p className="font-semibold text-gray-900 mt-1">
                {departmentInfo.head}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Department Code</p>
              <p className="font-semibold text-gray-900 mt-1">
                {departmentInfo.code}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InstitutionPage;
