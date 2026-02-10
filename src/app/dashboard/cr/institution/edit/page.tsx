"use client";

import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  BookOpen,
  Building2,
  CalendarDays,
  Globe,
  Hash,
  Loader2,
  LucideIcon,
  Mail,
  MapPin,
  Phone,
  School,
  Timer,
  UploadCloud,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "sonner";

export default function EditInstitutionPage() {
  const router = useRouter();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "Dhaka Polytechnic Institute",
    shortName: "DPI",
    type: "Polytechnic Institute",
    establishedYear: "1955",
    address: "Tejgaon Industrial Area, Dhaka-1208, Bangladesh",
    phone: "+880-2-8870553",
    email: "info@dpi.gov.bd",
    website: "www.dpi.gov.bd",
    department: "Computer Technology",
    semester: "8th Semester",
    session: "2020-2024",
    shift: "1st Shift",
    group: "A",
  });

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
      toast.success("Logo uploaded successfully");
    };
    reader.readAsDataURL(file);
  }, []);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Updating institution:", formData);
    toast.success("Institution details updated successfully");
    setIsSubmitting(false);
    router.push("/dashboard/cr/institution");
  };

  interface InputFieldProps {
    id: string;
    label: string;
    icon: LucideIcon;
    placeholder: string;
    value: string;
    type?: string;
    required?: boolean;
  }

  const InputField: React.FC<InputFieldProps> = ({
    id,
    label,
    icon: Icon,
    placeholder,
    value,
    type = "text",
    required = true,
  }) => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-sm font-semibold text-gray-700">
        {label}
      </Label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
          required={required}
          className="pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <PageHeader
        title="Edit Institution"
        description="Update your institution and class details"
        icon={<Building2 className="w-6 h-6" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "My Institution", href: "/dashboard/cr/institution" },
          { label: "Edit" },
        ]}
        action={
          <Link href="/dashboard/cr/institution">
            <Button variant="outline" className="gap-2 h-10">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        }
      />

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Logo Upload Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">
              Institution Logo
            </h3>
            <div
              className={`relative h-48 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden ${
                isDragging
                  ? "border-primary bg-primary/5 scale-[1.02]"
                  : "border-gray-200 bg-gray-50 hover:bg-gray-100/50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                onChange={handleLogoChange}
                accept="image/*"
              />
              {logoPreview ? (
                <div className="relative size-full group">
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="size-full object-contain p-4"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm font-bold flex items-center gap-2">
                      <UploadCloud className="w-5 h-5" />
                      Replace Logo
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-4 bg-white rounded-full shadow-sm">
                    <UploadCloud className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center px-4">
                    <p className="text-base font-bold text-gray-900">
                      Drag & Drop or Click to Upload
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      SVG, PNG, JPG or GIF (max. 2MB)
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Institution Details */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-8 w-1.5 bg-primary rounded-full" />
            <h3 className="text-xl font-bold text-gray-900">
              Institution Details
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <InputField
              id="name"
              label="Institution Name"
              icon={School}
              placeholder="e.g. Dhaka Polytechnic Institute"
              value={formData.name}
            />
            <InputField
              id="shortName"
              label="Short Name"
              icon={Hash}
              placeholder="e.g. DPI"
              value={formData.shortName}
            />
            <InputField
              id="type"
              label="Institution Type"
              icon={Building2}
              placeholder="e.g. Polytechnic Institute"
              value={formData.type}
            />
            <InputField
              id="establishedYear"
              label="Established Year"
              icon={CalendarDays}
              placeholder="e.g. 1955"
              value={formData.establishedYear}
              type="number"
            />
            <div className="md:col-span-2">
              <InputField
                id="address"
                label="Full Address"
                icon={MapPin}
                placeholder="e.g. Tejgaon Industrial Area, Dhaka"
                value={formData.address}
              />
            </div>
            <InputField
              id="phone"
              label="Contact Phone"
              icon={Phone}
              placeholder="e.g. +880..."
              value={formData.phone}
            />
            <InputField
              id="email"
              label="Contact Email"
              icon={Mail}
              placeholder="e.g. info@institution.edu"
              value={formData.email}
              type="email"
            />
            <div className="md:col-span-2">
              <InputField
                id="website"
                label="Official Website"
                icon={Globe}
                placeholder="e.g. www.institution.edu"
                value={formData.website}
              />
            </div>
          </div>
        </div>

        {/* Class Information */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-8 w-1.5 bg-blue-500 rounded-full" />
            <h3 className="text-xl font-bold text-gray-900">
              Class Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <InputField
              id="department"
              label="Department / Subject"
              icon={BookOpen}
              placeholder="e.g. Computer Science"
              value={formData.department}
            />
            <InputField
              id="semester"
              label="Current Semester / Year"
              icon={CalendarDays}
              placeholder="e.g. 8th Semester"
              value={formData.semester}
            />
            <InputField
              id="session"
              label="Academic Session"
              icon={Users}
              placeholder="e.g. 2020-2024"
              value={formData.session}
            />
            <InputField
              id="shift"
              label="Shift (if any)"
              icon={Timer}
              placeholder="e.g. 1st Shift"
              value={formData.shift}
              required={false}
            />
            <InputField
              id="group"
              label="Group / Section"
              icon={Users}
              placeholder="e.g. A"
              value={formData.group}
              required={false}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link href="/dashboard/cr/institution" className="flex-1">
            <Button
              type="button"
              variant="outline"
              className="w-full h-14 text-base font-bold border-gray-200 hover:bg-gray-50 transition-all rounded-xl"
            >
              Cancel Changes
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-[2] h-14 text-base font-bold bg-primary hover:bg-blue-700 text-white shadow-lg shadow-primary/20 transition-all active:scale-[0.98] rounded-xl cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Saving Updates...
              </span>
            ) : (
              "Save Institution Details"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
