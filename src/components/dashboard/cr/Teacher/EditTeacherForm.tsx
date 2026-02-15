"use client";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { Label } from "@/components/ui/label";
import { Teacher } from "@/interface/teacher.interface";
import {
  updateTeacher,
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

const initialState: TeacherActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: undefined,
  timestamp: 0,
};

interface EditTeacherFormProps {
  teacher: Teacher;
}

const EditTeacherForm: React.FC<EditTeacherFormProps> = ({ teacher }) => {
  const router = useRouter();
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    teacher.photoUrl || null,
  );
  const [isDragging, setIsDragging] = useState(false);

  const updateTeacherWithId = updateTeacher.bind(null, teacher.id);
  const [state, formAction, isPending] = useActionState(
    updateTeacherWithId,
    initialState,
  );

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
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <FormInput
            id="name"
            name="name"
            label="Full Name"
            icon={User}
            defaultValue={state.inputs?.name ?? teacher.name}
            placeholder="e.g., Dr. Kamal Ahmed"
            required
            error={state.errors?.name}
            className="bg-gray-50/30 font-medium"
          />

          <FormSelect
            name="designation"
            label="Designation"
            defaultValue={state.inputs?.designation ?? teacher.designation}
            options={designationOptions.map((opt) => ({
              value: opt,
              label: opt,
            }))}
            placeholder="Select designation"
            required
            error={state.errors?.designation}
          />

          <FormInput
            id="department"
            name="department"
            label="Department"
            icon={Building2}
            defaultValue={state.inputs?.department ?? teacher.department}
            placeholder="e.g., Computer Technology"
            required
            error={state.errors?.department}
            className="bg-gray-50/30 font-medium"
          />

          <FormInput
            id="email"
            name="email"
            type="email"
            label="Email Address"
            icon={Mail}
            defaultValue={state.inputs?.email ?? teacher.email}
            placeholder="e.g., kamal.ahmed@dpi.edu.bd"
            required
            error={state.errors?.email}
            className="bg-gray-50/30 font-medium"
          />

          <FormInput
            id="phone"
            name="phone"
            type="tel"
            label="Phone Number"
            icon={Phone}
            defaultValue={state.inputs?.phone ?? teacher.phone}
            placeholder="e.g., +880 1711-234567"
            required
            error={state.errors?.phone}
            className="bg-gray-50/30 font-medium"
          />
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <Label>Profile Photo</Label>
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
              <p className="text-xs text-red-500 mt-2">
                {state.errors.photo[0]}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Link href="/dashboard/cr/teachers">
            <Button type="button" variant="outline" className="h-12">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="h-12" disabled={isPending}>
            {isPending ? "Updating Teacher..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditTeacherForm;
