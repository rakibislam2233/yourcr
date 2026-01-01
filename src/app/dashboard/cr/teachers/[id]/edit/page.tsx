"use client";

import React, { useState, useEffect } from "react";
import { Users, ArrowLeft, Plus, X } from "lucide-react";
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
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const teacherSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  designation: z.string().min(1, "Designation is required"),
  department: z.string().min(2, "Department is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  color: z.string().min(1, "Color is required"),
});

type TeacherFormData = z.infer<typeof teacherSchema>;

const designationOptions = ["Professor", "Associate Professor", "Assistant Professor", "Lecturer", "Instructor"];

const colorOptions = [
  { value: "bg-blue-500", label: "Blue" },
  { value: "bg-green-500", label: "Green" },
  { value: "bg-purple-500", label: "Purple" },
  { value: "bg-orange-500", label: "Orange" },
  { value: "bg-pink-500", label: "Pink" },
  { value: "bg-cyan-500", label: "Cyan" },
];

// Mock data
const mockTeachers = [
  { id: 1, name: "Dr. Kamal Ahmed", designation: "Professor", department: "Computer Technology", email: "kamal.ahmed@dpi.edu.bd", phone: "+880 1711-234567", subjects: ["Database Management", "Data Structures"], color: "bg-blue-500" },
  { id: 2, name: "Prof. Rina Begum", designation: "Associate Professor", department: "Computer Technology", email: "rina.begum@dpi.edu.bd", phone: "+880 1812-345678", subjects: ["Software Engineering", "OOP"], color: "bg-green-500" },
];

export default function EditTeacherPage() {
  const router = useRouter();
  const params = useParams();
  const teacherId = parseInt(params.id as string);
  const [subjectInput, setSubjectInput] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TeacherFormData>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      name: "",
      designation: "Lecturer",
      department: "Computer Technology",
      email: "",
      phone: "",
      color: "bg-blue-500",
    },
  });

  useEffect(() => {
    const teacher = mockTeachers.find((t) => t.id === teacherId);
    if (teacher) {
      setValue("name", teacher.name);
      setValue("designation", teacher.designation);
      setValue("department", teacher.department);
      setValue("email", teacher.email);
      setValue("phone", teacher.phone);
      setValue("color", teacher.color);
      setSubjects(teacher.subjects);
    }
  }, [teacherId, setValue]);

  const handleAddSubject = () => {
    if (subjectInput.trim() && !subjects.includes(subjectInput.trim())) {
      setSubjects([...subjects, subjectInput.trim()]);
      setSubjectInput("");
    }
  };

  const handleRemoveSubject = (subject: string) => {
    setSubjects(subjects.filter((s) => s !== subject));
  };

  const onSubmit = (data: TeacherFormData) => {
    // Add subjects to the form data
    const teacherData = {
      ...data,
      subjects: subjects,
      id: teacherId,
    };
    console.log("Updating teacher:", teacherData);
    router.push("/dashboard/cr/teachers");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Teacher"
        description="Update teacher information"
        icon={Users}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Teachers", href: "/dashboard/cr/teachers" },
          { label: "Edit Teacher" },
        ]}
        action={
          <Link href="/dashboard/cr/teachers">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        }
      />

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                className={errors.name ? "border-red-500" : ""}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Select
                value={watch("designation")}
                onValueChange={(value) => setValue("designation", value)}
              >
                <SelectTrigger className={errors.designation ? "border-red-500" : ""}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {designationOptions.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.designation && (
                <p className="text-red-500 text-sm mt-1">{errors.designation.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                className={errors.department ? "border-red-500" : ""}
                {...register("department")}
              />
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Avatar Color</Label>
              <Select
                value={watch("color")}
                onValueChange={(value) => setValue("color", value)}
              >
                <SelectTrigger className={errors.color ? "border-red-500" : ""}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.color && (
                <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className={errors.email ? "border-red-500" : ""}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                className={errors.phone ? "border-red-500" : ""}
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Subjects</Label>
              <div className="flex gap-2">
                <Input
                  value={subjectInput}
                  onChange={(e) => setSubjectInput(e.target.value)}
                  placeholder="Enter subject name and press Add"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSubject())}
                />
                <Button type="button" onClick={handleAddSubject} className="gap-1">
                  <Plus className="w-4 h-4" />
                  Add
                </Button>
              </div>
              {subjects.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {subjects.map((subject) => (
                    <span
                      key={subject}
                      className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full flex items-center gap-2"
                    >
                      {subject}
                      <button
                        type="button"
                        onClick={() => handleRemoveSubject(subject)}
                        className="hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Link href="/dashboard/cr/teachers" className="flex-1">
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
