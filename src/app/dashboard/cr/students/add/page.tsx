"use client";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Hash, Mail, Phone, User, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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

export default function AddStudentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    roll: "",
    name: "",
    email: "",
    phone: "",
    status: "active",
    color: "bg-blue-500",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding student:", formData);
    router.push("/dashboard/cr/students");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Student"
        description="Add a new student to your class"
        icon={<UserPlus className="w-6 h-6" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Students", href: "/dashboard/cr/students" },
          { label: "Add Student" },
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
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="roll"
                  value={formData.roll}
                  onChange={(e) =>
                    setFormData({ ...formData, roll: e.target.value })
                  }
                  placeholder="e.g., CT-8001"
                  required
                  className="pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium"
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
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Sakib Hasan"
                  required
                  className="pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium"
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
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="e.g., student@example.com"
                  required
                  className="pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium"
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
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="e.g., +880 1711-111111"
                  required
                  className="pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Avatar Color</Label>
              <Select
                value={formData.color}
                onValueChange={(value) =>
                  setFormData({ ...formData, color: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Link href="/dashboard/cr/students" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="flex-1">
              Add Student
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
