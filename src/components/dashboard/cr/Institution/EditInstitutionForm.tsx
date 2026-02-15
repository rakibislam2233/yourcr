"use client";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import {
  updateInstitutionBatch,
  type UserActionState,
} from "@/services/user.service";
import {
  BookOpen,
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

const initialState: UserActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: undefined,
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
    logo?: string;
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
    } else if (!state.success && state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-8">
      {/* Logo Upload Section */}
      <LogoUploadField defaultLogo={defaultData?.logo} />
      {/* Institution Details */}
      <div className="bg-white rounded-md border border-gray-200 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-8">
          Institution Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <FormInput
            id="institutionName"
            name="institutionName"
            label="Institution Name"
            icon={School}
            placeholder="e.g. Dhaka Polytechnic Institute"
            defaultValue={
              (state.inputs?.institutionName as string) || defaultData.name
            }
            error={state.errors?.institutionName}
            required
            className="bg-gray-50/30"
          />

          <FormInput
            id="shortName"
            name="shortName"
            label="Short Name"
            icon={Hash}
            placeholder="e.g. DPI"
            defaultValue={
              (state.inputs?.shortName as string) || defaultData.shortName
            }
            className="bg-gray-50/30"
          />

          <FormSelect
            name="institutionType"
            label="Institution Type"
            value={institutionType}
            onValueChange={setInstitutionType}
            options={[
              { value: "UNIVERSITY", label: "University" },
              { value: "COLLEGE", label: "College" },
              { value: "POLYTECHNIC", label: "Polytechnic" },
            ]}
            placeholder="Select type"
            error={state.errors?.institutionType}
            required
          />

          <FormInput
            id="establishedYear"
            name="establishedYear"
            label="Established Year"
            icon={CalendarDays}
            type="number"
            placeholder="e.g. 1955"
            defaultValue={
              (state.inputs?.establishedYear as string) ||
              defaultData.establishedYear
            }
            className="bg-gray-50/30"
          />

          <div className="md:col-span-2">
            <FormInput
              id="address"
              name="address"
              label="Full Address"
              icon={MapPin}
              placeholder="e.g. Tejgaon Industrial Area, Dhaka"
              defaultValue={
                (state.inputs?.address as string) || defaultData.address
              }
              error={state.errors?.address}
              required
              className="bg-gray-50/30"
            />
          </div>

          <FormInput
            id="contactPhone"
            name="contactPhone"
            label="Contact Phone"
            icon={Phone}
            placeholder="e.g. +880..."
            defaultValue={
              (state.inputs?.contactPhone as string) || defaultData.phone
            }
            className="bg-gray-50/30"
          />

          <FormInput
            id="contactEmail"
            name="contactEmail"
            label="Contact Email"
            type="email"
            icon={Mail}
            placeholder="e.g. info@institution.edu"
            defaultValue={
              (state.inputs?.contactEmail as string) || defaultData.email
            }
            error={state.errors?.contactEmail}
            required
            className="bg-gray-50/30"
          />

          <div className="md:col-span-2">
            <FormInput
              id="website"
              name="website"
              label="Official Website"
              icon={Globe}
              placeholder="e.g. www.institution.edu"
              defaultValue={
                (state.inputs?.website as string) || defaultData.website
              }
              className="bg-gray-50/30"
            />
          </div>
        </div>
      </div>

      {/* Class Information */}
      <div className="bg-white rounded-md border border-gray-200 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-8">
          Class Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <FormInput
            id="department"
            name="department"
            label="Department / Subject"
            icon={BookOpen}
            placeholder="e.g. Computer Science"
            defaultValue={
              (state.inputs?.department as string) || defaultData.department
            }
            error={state.errors?.department}
            required
            className="bg-gray-50/30"
          />

          <FormSelect
            name="batchType"
            label="Batch Type"
            value={batchType}
            onValueChange={setBatchType}
            options={[
              { value: "SEMESTER", label: "Semester" },
              { value: "YEAR", label: "Year" },
            ]}
            placeholder="Select type"
            error={state.errors?.batchType}
            required
          />

          <FormInput
            id="semester"
            name="semester"
            label="Current Semester / Year"
            icon={CalendarDays}
            placeholder="e.g. 8th Semester"
            defaultValue={
              (state.inputs?.semester as string) || defaultData.semester
            }
            className="bg-gray-50/30"
          />

          <FormInput
            id="academicYear"
            name="academicYear"
            label="Academic Session/Year"
            icon={Users}
            placeholder="e.g. 2020-2024"
            defaultValue={
              (state.inputs?.academicYear as string) || defaultData.session
            }
            error={state.errors?.academicYear}
            required
            className="bg-gray-50/30"
          />

          <FormInput
            id="session"
            name="session"
            label="Session"
            icon={Users}
            placeholder="e.g. 2020-2021"
            defaultValue={
              (state.inputs?.session as string) || defaultData.session
            }
            error={state.errors?.session}
            required
            className="bg-gray-50/30"
          />

          <FormInput
            id="shift"
            name="shift"
            label="Shift (if any)"
            icon={Timer}
            placeholder="e.g. 1st Shift"
            defaultValue={(state.inputs?.shift as string) || defaultData.shift}
            className="bg-gray-50/30"
          />

          <FormInput
            id="group"
            name="group"
            label="Group / Section"
            icon={Users}
            placeholder="e.g. A"
            defaultValue={(state.inputs?.group as string) || defaultData.group}
            className="bg-gray-50/30"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex justify-end gap-4">
        <Link href="/dashboard/cr/institution">
          <Button
            type="button"
            variant="outline"
            className="px-5 h-12  cursor-pointer"
          >
            Cancel Changes
          </Button>
        </Link>
        <Button
          type="submit"
          disabled={isPending}
          className="px-5 h-12  cursor-pointer bg-primary"
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
