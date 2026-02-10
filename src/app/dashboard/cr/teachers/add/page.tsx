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
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  BookOpen,
  Building2,
  Mail,
  Phone,
  Plus,
  User,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

const designationOptions = [
  "Professor",
  "Associate Professor",
  "Assistant Professor",
  "Lecturer",
  "Instructor",
];

const colorOptions = [
  { value: "bg-blue-500", label: "Blue" },
  { value: "bg-green-500", label: "Green" },
  { value: "bg-purple-500", label: "Purple" },
  { value: "bg-orange-500", label: "Orange" },
  { value: "bg-pink-500", label: "Pink" },
  { value: "bg-cyan-500", label: "Cyan" },
];

export default function AddTeacherPage() {
  const router = useRouter();
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
    };
    console.log("Adding teacher:", teacherData);
    router.push("/dashboard/cr/teachers");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Teacher"
        description="Add a new teacher to your class"
        icon={<Users />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Teachers", href: "/dashboard/cr/teachers" },
          { label: "Add Teacher" },
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
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
                  placeholder="e.g., Dr. Kamal Ahmed"
                  className={`pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium ${errors.name ? "border-red-500" : ""}`}
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs font-medium mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="designation"
                className="text-sm font-semibold text-gray-700"
              >
                Designation
              </Label>
              <Select
                value={watch("designation")}
                onValueChange={(value) => setValue("designation", value)}
              >
                <SelectTrigger
                  className={`h-12 border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 ${errors.designation ? "border-red-500" : ""}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {designationOptions.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.designation && (
                <p className="text-red-500 text-xs font-medium mt-1">
                  {errors.designation.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="department"
                className="text-sm font-semibold text-gray-700"
              >
                Department
              </Label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="department"
                  placeholder="e.g., Computer Technology"
                  className={`pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium ${errors.department ? "border-red-500" : ""}`}
                  {...register("department")}
                />
              </div>
              {errors.department && (
                <p className="text-red-500 text-xs font-medium mt-1">
                  {errors.department.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="color"
                className="text-sm font-semibold text-gray-700"
              >
                Avatar Color
              </Label>
              <Select
                value={watch("color")}
                onValueChange={(value) => setValue("color", value)}
              >
                <SelectTrigger
                  className={`h-12 border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 ${errors.color ? "border-red-500" : ""}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.color && (
                <p className="text-red-500 text-xs font-medium mt-1">
                  {errors.color.message}
                </p>
              )}
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
                  placeholder="e.g., teacher@dpi.edu.bd"
                  className={`pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium ${errors.email ? "border-red-500" : ""}`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs font-medium mt-1">
                  {errors.email.message}
                </p>
              )}
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
                  placeholder="e.g., +880 1711-234567"
                  className={`pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium ${errors.phone ? "border-red-500" : ""}`}
                  {...register("phone")}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs font-medium mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <Label className="text-sm font-semibold text-gray-700">
                Subjects
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    value={subjectInput}
                    onChange={(e) => setSubjectInput(e.target.value)}
                    placeholder="Enter subject name and press Add"
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleAddSubject())
                    }
                    className="pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium"
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleAddSubject}
                  className="gap-1 h-12"
                >
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
              Add Teacher
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
