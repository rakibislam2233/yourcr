"use client";

import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Hash, Mail, Phone, User, UserPlus } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const colorOptions = [
  { value: "bg-blue-500", label: "Blue" },
  { value: "bg-green-500", label: "Green" },
  { value: "bg-purple-500", label: "Purple" },
  { value: "bg-orange-500", label: "Orange" },
  { value: "bg-pink-500", label: "Pink" },
  { value: "bg-cyan-500", label: "Cyan" },
  { value: "bg-amber-500", label: "Amber" },
  { value: "bg-red-500", label: "Red" },
];

// Mock data
const mockStudents = [
  {
    id: 1,
    roll: "CT-8001",
    name: "Sakib Hasan",
    email: "sakib@example.com",
    phone: "+880 1711-111111",
    status: "active",
    color: "bg-blue-500",
  },
  {
    id: 2,
    roll: "CT-8002",
    name: "Fahim Rahman",
    email: "fahim@example.com",
    phone: "+880 1711-222222",
    status: "active",
    color: "bg-green-500",
  },
];

export default function EditStudentPage() {
  const router = useRouter();
  const params = useParams();
  const studentId = parseInt(params?.id as string);

  const [formData, setFormData] = useState({
    roll: "",
    name: "",
    email: "",
    phone: "",
    status: "active",
    color: "bg-blue-500",
  });

  useEffect(() => {
    const student = mockStudents.find((s) => s.id === studentId);
    if (student) {
      setFormData({
        roll: student.roll,
        name: student.name,
        email: student.email,
        phone: student.phone,
        status: student.status,
        color: student.color,
      });
    }
  }, [studentId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating student:", { id: studentId, ...formData });
    router.push("/dashboard/cr/students");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Student"
        description="Update student information"
        icon={<UserPlus />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Students", href: "/dashboard/cr/students" },
          { label: "Edit Student" },
        ]}
        action={
          <Link href="/dashboard/cr/students">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        }
      />

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="roll"
                className="text-sm font-semibold text-gray-700"
              >
                Roll Number
              </Label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="roll"
                  value={formData.roll}
                  onChange={(e) =>
                    setFormData({ ...formData, roll: e.target.value })
                  }
                  required
                  className="pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="name"
                className="text-sm font-semibold text-gray-700"
              >
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="phone"
                className="text-sm font-semibold text-gray-700"
              >
                Phone
              </Label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="status"
                className="text-sm font-semibold text-gray-700"
              >
                Status
              </Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="h-12 px-4 text-base border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/30 transition-all font-medium"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="color"
                className="text-sm font-semibold text-gray-700"
              >
                Avatar Color
              </Label>
              <select
                id="color"
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                className="h-12 px-4 text-base border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/30 transition-all font-medium"
              >
                {colorOptions.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Link href="/dashboard/cr/students" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="flex-1">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
