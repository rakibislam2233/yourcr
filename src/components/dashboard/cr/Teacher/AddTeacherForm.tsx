"use client";
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
import {
  createTeacher,
  type TeacherActionState,
} from "@/services/teacher.service";
import { Building2, Camera, Mail, Phone, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect, useState } from "react";
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

const initialState: TeacherActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: undefined,
  timestamp: 0,
};

const AddTeacherForm = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    createTeacher,
    initialState,
  );
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (state.timestamp && state.timestamp > 0) {
      if (state.success) {
        toast.success(state.message);
        router.push("/dashboard/cr/teachers");
      } else if (state.message && !state.errors) {
        toast.error(state.message);
      }
    }
  }, [state, router]);

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    const fileInput = document.getElementById("photo") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-6">
      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="name"
                className="text-sm font-semibold text-gray-700"
              >
                Full Name <span className="text-red-500">*</span>
              </Label>
            </div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="name"
                name="name"
                defaultValue={state.inputs?.name}
                placeholder="e.g., Dr. Kamal Ahmed"
                className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.name
                    ? "border-red-500 bg-red-50/10"
                    : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.name && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {state.errors.name[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="designation"
                className="text-sm font-semibold text-gray-700"
              >
                Designation <span className="text-red-500">*</span>
              </Label>
            </div>
            <Select name="designation" defaultValue={state.inputs?.designation}>
              <SelectTrigger
                className={`h-12 border-gray-200 ${
                  state.errors?.designation
                    ? "border-red-500 bg-red-50/10"
                    : "bg-gray-50/30"
                } font-medium`}
              >
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
            {state.errors?.designation && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {state.errors.designation[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="department"
                className="text-sm font-semibold text-gray-700"
              >
                Department <span className="text-red-500">*</span>
              </Label>
            </div>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="department"
                name="department"
                defaultValue={state.inputs?.department}
                placeholder="e.g., Computer Technology"
                className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.department
                    ? "border-red-500 bg-red-50/10"
                    : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.department && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {state.errors.department[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                Email Address <span className="text-red-500">*</span>
              </Label>
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={state.inputs?.email}
                placeholder="e.g., kamal.ahmed@dpi.edu.bd"
                className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.email
                    ? "border-red-500 bg-red-50/10"
                    : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.email && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {state.errors.email[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="phone"
                className="text-sm font-semibold text-gray-700"
              >
                Phone Number <span className="text-red-500">*</span>
              </Label>
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={state.inputs?.phone}
                placeholder="e.g., +880 1711-234567"
                className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.phone
                    ? "border-red-500 bg-red-50/10"
                    : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.phone && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {state.errors.phone[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="photo"
                className="text-sm font-semibold text-gray-700"
              >
                Profile Photo
              </Label>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Photo Upload Area */}
              <div className="flex-1">
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-gray-300 hover:border-gray-400 bg-gray-50/30"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("photo")?.click()}
                >
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <Camera className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {isDragging
                      ? "Drop photo here"
                      : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>

              {/* Photo Preview */}
              <div className="flex items-center justify-center">
                {photoPreview ? (
                  <div className="relative group">
                    <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden border-2 border-gray-200">
                      <Image
                        src={photoPreview}
                        alt="Profile preview"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
            {state.errors?.photo && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {state.errors.photo[0]}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4 justify-end">
          <Link href="/dashboard/cr/teachers">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              className="w-full h-12"
            >
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isPending} className="h-12">
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Adding Teacher...
              </span>
            ) : (
              "Add Teacher"
            )}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddTeacherForm;
