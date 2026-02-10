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
import { updateInstitutionBatch } from "@/services/user.service";
import {
  BookOpen,
  Building2,
  CalendarDays,
  Globe,
  Hash,
  Loader2,
  Mail,
  MapPin,
  Phone,
  School,
  Timer,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import LogoUploadField from "./LogoUploadField";

const initialState = {
  success: false,
  message: "",
  data: null,
  timestamp: Date.now(),
};

interface EditInstitutionFormProps {
  defaultData: {
    name: string;
    shortName: string;
    type: string;
    establishedYear: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    department: string;
    semester: string;
    session: string;
    shift: string;
    group: string;
    batchType: string;
  };
}

const EditInstitutionForm = ({ defaultData }: EditInstitutionFormProps) => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    updateInstitutionBatch,
    initialState,
  );

  const [institutionType, setInstitutionType] = useState(
    defaultData.type || "",
  );
  const [batchType, setBatchType] = useState(
    defaultData.batchType || "SEMESTER",
  );

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message);
      router.push("/dashboard/cr/institution");
    } else if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-8">
      {/* Logo Upload Section */}
      <LogoUploadField />
      {/* Institution Details */}
      <div className="bg-white rounded-md border border-gray-200 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-8">
          Institution Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="institutionName"
              className="text-sm font-semibold text-gray-700"
            >
              Institution Name <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <School className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="institutionName"
                name="institutionName"
                placeholder="e.g. Dhaka Polytechnic Institute"
                defaultValue={
                  (state.inputs?.institutionName as string) || defaultData.name
                }
                className={`pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all ${
                  state.errors?.institutionName
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
            </div>
            {state.errors?.institutionName && (
              <p className="text-sm text-red-500">
                {state.errors.institutionName[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="shortName"
              className="text-sm font-semibold text-gray-700"
            >
              Short Name
            </Label>
            <div className="relative">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="shortName"
                name="shortName"
                placeholder="e.g. DPI"
                defaultValue={
                  (state.inputs?.shortName as string) || defaultData.shortName
                }
                className="pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="institutionType"
              className="text-sm font-semibold text-gray-700"
            >
              Institution Type <span className="text-red-500">*</span>
            </Label>
            <input
              type="hidden"
              name="institutionType"
              value={institutionType}
            />
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <Select
                value={institutionType}
                onValueChange={setInstitutionType}
              >
                <SelectTrigger
                  className={`pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 w-full transition-all ${state.errors?.institutionType ? "border-red-500 focus:ring-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UNIVERSITY">University</SelectItem>
                  <SelectItem value="COLLEGE">College</SelectItem>
                  <SelectItem value="POLYTECHNIC">Polytechnic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {state.errors?.institutionType && (
              <p className="text-sm text-red-500">
                {state.errors.institutionType[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="establisYear"
              className="text-sm font-semibold text-gray-700"
            >
              Established Year
            </Label>
            <div className="relative">
              <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="establisYear"
                name="establisYear"
                type="number"
                placeholder="e.g. 1955"
                defaultValue={
                  (state.inputs?.establisYear as string) ||
                  defaultData.establishedYear
                }
                className="pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="address"
                className="text-sm font-semibold text-gray-700"
              >
                Full Address <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="address"
                  name="address"
                  placeholder="e.g. Tejgaon Industrial Area, Dhaka"
                  defaultValue={
                    (state.inputs?.address as string) || defaultData.address
                  }
                  className={`pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all ${
                    state.errors?.address
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
              </div>
              {state.errors?.address && (
                <p className="text-sm text-red-500">
                  {state.errors.address[0]}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="contactPhone"
              className="text-sm font-semibold text-gray-700"
            >
              Contact Phone
            </Label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="contactPhone"
                name="contactPhone"
                placeholder="e.g. +880..."
                defaultValue={
                  (state.inputs?.contactPhone as string) || defaultData.phone
                }
                className="pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="contactEmail"
              className="text-sm font-semibold text-gray-700"
            >
              Contact Email <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                placeholder="e.g. info@institution.edu"
                defaultValue={
                  (state.inputs?.contactEmail as string) || defaultData.email
                }
                className={`pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all ${
                  state.errors?.contactEmail
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
            </div>
            {state.errors?.contactEmail && (
              <p className="text-sm text-red-500">
                {state.errors.contactEmail[0]}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="website"
                className="text-sm font-semibold text-gray-700"
              >
                Official Website
              </Label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="website"
                  name="website"
                  placeholder="e.g. www.institution.edu"
                  defaultValue={
                    (state.inputs?.website as string) || defaultData.website
                  }
                  className="pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Class Information */}
      <div className="bg-white rounded-md border border-gray-200 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-8">
          Class Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="department"
              className="text-sm font-semibold text-gray-700"
            >
              Department / Subject <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="department"
                name="department"
                placeholder="e.g. Computer Science"
                defaultValue={
                  (state.inputs?.department as string) || defaultData.department
                }
                className={`pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all ${
                  state.errors?.department
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
            </div>
            {state.errors?.department && (
              <p className="text-sm text-red-500">
                {state.errors.department[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="batchType"
              className="text-sm font-semibold text-gray-700"
            >
              Batch Type <span className="text-red-500">*</span>
            </Label>
            <input type="hidden" name="batchType" value={batchType} />
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <Select value={batchType} onValueChange={setBatchType}>
                <SelectTrigger
                  className={`pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 w-full transition-all ${state.errors?.batchType ? "border-red-500 focus:ring-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SEMESTER">Semester</SelectItem>
                  <SelectItem value="YEAR">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {state.errors?.batchType && (
              <p className="text-sm text-red-500">
                {state.errors.batchType[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="semester"
              className="text-sm font-semibold text-gray-700"
            >
              Current Semester / Year
            </Label>
            <div className="relative">
              <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="semester"
                name="semester"
                placeholder="e.g. 8th Semester"
                defaultValue={
                  (state.inputs?.semester as string) || defaultData.semester
                }
                className="pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="academicYear"
              className="text-sm font-semibold text-gray-700"
            >
              Academic Session/Year <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="academicYear"
                name="academicYear"
                placeholder="e.g. 2020-2024"
                defaultValue={
                  (state.inputs?.academicYear as string) || defaultData.session
                }
                className={`pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all ${
                  state.errors?.academicYear
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
            </div>
            {state.errors?.academicYear && (
              <p className="text-sm text-red-500">
                {state.errors.academicYear[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="session"
              className="text-sm font-semibold text-gray-700"
            >
              Session <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="session"
                name="session"
                placeholder="e.g. 2020-2021"
                defaultValue={
                  (state.inputs?.session as string) || defaultData.session
                }
                className={`pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all ${
                  state.errors?.session
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
            </div>
            {state.errors?.session && (
              <p className="text-sm text-red-500">{state.errors.session[0]}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="shift"
              className="text-sm font-semibold text-gray-700"
            >
              Shift (if any)
            </Label>
            <div className="relative">
              <Timer className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="shift"
                name="shift"
                placeholder="e.g. 1st Shift"
                defaultValue={
                  (state.inputs?.shift as string) || defaultData.shift
                }
                className="pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="group"
              className="text-sm font-semibold text-gray-700"
            >
              Group / Section
            </Label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="group"
                name="group"
                placeholder="e.g. A"
                defaultValue={
                  (state.inputs?.group as string) || defaultData.group
                }
                className="pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex justify-end gap-4 pt-4">
        <Link href="/dashboard/cr/institution">
          <Button
            type="button"
            variant="outline"
            className="px-5 h-12 text-base cursor-pointer"
          >
            Cancel Changes
          </Button>
        </Link>
        <Button
          type="submit"
          disabled={isPending}
          className="px-5 h-12 text-base cursor-pointer bg-primary"
        >
          {isPending ? (
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
  );
};

export default EditInstitutionForm;
