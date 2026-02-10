"use client";
import { Button } from "@/components/ui/button";
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
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { InputField } from "./InstitutionInputField";
import LogoUploadField from "./LogoUploadField";
import { updateInstitutionBatch } from "@/services/user.service";

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
  };
}

const EditInstitutionForm = ({ defaultData }: EditInstitutionFormProps) => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    updateInstitutionBatch,
    initialState,
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
          <InputField
            id="institutionName"
            name="institutionName"
            label="Institution Name"
            icon={School}
            placeholder="e.g. Dhaka Polytechnic Institute"
            defaultValue={defaultData.name}
          />
          <InputField
            id="shortName"
            name="shortName"
            label="Short Name"
            icon={Hash}
            placeholder="e.g. DPI"
            defaultValue={defaultData.shortName}
          />
          <InputField
            id="institutionType"
            name="institutionType"
            label="Institution Type"
            icon={Building2}
            placeholder="e.g. Polytechnic Institute"
            defaultValue={defaultData.type}
          />
          <InputField
            id="establisYear"
            name="establisYear"
            label="Established Year"
            icon={CalendarDays}
            placeholder="e.g. 1955"
            defaultValue={defaultData.establishedYear}
            type="number"
          />
          <div className="md:col-span-2">
            <InputField
              id="address"
              name="address"
              label="Full Address"
              icon={MapPin}
              placeholder="e.g. Tejgaon Industrial Area, Dhaka"
              defaultValue={defaultData.address}
            />
          </div>
          <InputField
            id="contactPhone"
            name="contactPhone"
            label="Contact Phone"
            icon={Phone}
            placeholder="e.g. +880..."
            defaultValue={defaultData.phone}
          />
          <InputField
            id="contactEmail"
            name="contactEmail"
            label="Contact Email"
            icon={Mail}
            placeholder="e.g. info@institution.edu"
            defaultValue={defaultData.email}
            type="email"
          />
          <div className="md:col-span-2">
            <InputField
              id="website"
              name="website"
              label="Official Website"
              icon={Globe}
              placeholder="e.g. www.institution.edu"
              defaultValue={defaultData.website}
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
          <InputField
            id="department"
            name="department"
            label="Department / Subject"
            icon={BookOpen}
            placeholder="e.g. Computer Science"
            defaultValue={defaultData.department}
          />
          <InputField
            id="semester"
            name="semester"
            label="Current Semester / Year"
            icon={CalendarDays}
            placeholder="e.g. 8th Semester"
            defaultValue={defaultData.semester}
          />
          <InputField
            id="academicYear"
            name="academicYear"
            label="Academic Session"
            icon={Users}
            placeholder="e.g. 2020-2024"
            defaultValue={defaultData.session}
          />
          <InputField
            id="shift"
            name="shift"
            label="Shift (if any)"
            icon={Timer}
            placeholder="e.g. 1st Shift"
            defaultValue={defaultData.shift}
            required={false}
          />
          <InputField
            id="group"
            name="group"
            label="Group / Section"
            icon={Users}
            placeholder="e.g. A"
            defaultValue={defaultData.group}
            required={false}
          />
          <InputField
            id="batchType"
            name="batchType"
            label="Batch Type"
            icon={Users}
            placeholder="e.g. Regular"
            defaultValue="Regular"
            required={true}
          />
          <InputField
            id="session"
            name="session"
            label="Session"
            icon={Users}
            placeholder="e.g. 2020-2021"
            defaultValue={defaultData.session}
            required={true}
          />
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
