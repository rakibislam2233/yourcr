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
import { createTeacher, type ActionState } from "@/services/teacher.service";
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
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

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

const initialState: ActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: undefined,
  timestamp: 0,
};

export default function AddTeacherPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    createTeacher,
    initialState,
  );
  const [subjectInput, setSubjectInput] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Handle success/error messages
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        router.push("/dashboard/cr/teachers");
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  const handleAddSubject = () => {
    if (subjectInput.trim() && !subjects.includes(subjectInput.trim())) {
      setSubjects([...subjects, subjectInput.trim()]);
      setSubjectInput("");
    }
  };

  const handleRemoveSubject = (subject: string) => {
    setSubjects(subjects.filter((s) => s !== subject));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (formData: FormData) => {
    // Add subjects as a JSON string
    if (subjects.length > 0) {
      formData.append("subjects", JSON.stringify(subjects));
    }
    formAction(formData);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Teacher"
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
        <form action={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Name */}
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
                  name="name"
                  placeholder="e.g., Dr. Kamal Ahmed"
                  required
                  className="pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium"
                />
              </div>
            </div>

            {/* Designation */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="designation"
                className="text-sm font-semibold text-gray-700"
              >
                Designation
              </Label>
              <Select name="designation" required>
                <SelectTrigger className="h-12 bg-gray-50/30 border-gray-200 font-medium">
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  {designationOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Department */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="department"
                className="text-sm font-semibold text-gray-700"
              >
                Department
              </Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="department"
                  name="department"
                  placeholder="e.g., Computer Technology"
                  required
                  className="pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g., kamal.ahmed@dpi.edu.bd"
                  required
                  className="pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="phone"
                className="text-sm font-semibold text-gray-700"
              >
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="e.g., +880 1711-234567"
                  required
                  className="pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium"
                />
              </div>
            </div>

            {/* Color */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="color"
                className="text-sm font-semibold text-gray-700"
              >
                Avatar Color
              </Label>
              <Select name="color" required>
                <SelectTrigger className="h-12 bg-gray-50/30 border-gray-200 font-medium">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Photo Upload */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <Label
                htmlFor="photo"
                className="text-sm font-semibold text-gray-700"
              >
                Photo (Optional)
              </Label>
              <Input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium"
              />
              {photoPreview && (
                <div className="mt-2">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              )}
            </div>

            {/* Subjects */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <Label
                htmlFor="subjectInput"
                className="text-sm font-semibold text-gray-700"
              >
                Subjects (Optional)
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="subjectInput"
                    value={subjectInput}
                    onChange={(e) => setSubjectInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleAddSubject())
                    }
                    placeholder="e.g., Database Management"
                    className="pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium"
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleAddSubject}
                  className="h-12 px-6 gap-2"
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
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/5 text-primary text-sm font-medium rounded-lg"
                    >
                      {subject}
                      <button
                        type="button"
                        onClick={() => handleRemoveSubject(subject)}
                        className="hover:bg-primary/10 rounded-full p-0.5 transition-colors"
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
              <Button type="button" variant="outline" className="w-full h-12">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="flex-1 h-12" disabled={isPending}>
              {isPending ? "Adding Teacher..." : "Add Teacher"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
