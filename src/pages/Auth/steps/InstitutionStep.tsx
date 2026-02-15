"use client";

import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { ActionState } from "@/interface/action-state.interface";
import { Mail, MapPin, Phone, School } from "lucide-react";
import { useState } from "react";

interface InstitutionStepProps {
  state?: ActionState;
  setInstitutionType: (type: string) => void;
}

const InstitutionStep: React.FC<InstitutionStepProps> = ({
  state,
  setInstitutionType,
}) => {
  const [localInstitutionType, setLocalInstitutionType] = useState(
    state?.inputs?.institutionType || "",
  );

  const handleTypeChange = (value: string) => {
    setLocalInstitutionType(value);
    setInstitutionType(value);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
      <div className="space-y-4">
        <FormInput
          id="institutionName"
          name="institutionName"
          label="Institution Name"
          icon={School}
          defaultValue={state?.inputs?.institutionName}
          placeholder="e.g. Dhaka University"
          error={state?.errors?.institutionName}
          className="border-gray-300 focus:border-primary focus:ring-primary"
          required
        />

        <div className="flex flex-col gap-1.5">
          <input
            type="hidden"
            name="institutionType"
            value={localInstitutionType}
          />
          <FormSelect
            name="institutionType"
            label="Institution Type"
            value={localInstitutionType}
            onValueChange={handleTypeChange}
            placeholder="Select type"
            error={state?.errors?.institutionType}
            options={[
              { value: "UNIVERSITY", label: "University" },
              { value: "COLLEGE", label: "College" },
              { value: "POLYTECHNIC", label: "Polytechnic" },
            ]}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            id="contactEmail"
            name="contactEmail"
            type="email"
            label="Contact Email"
            icon={Mail}
            defaultValue={
              state?.inputs?.contactEmail ||
              state?.inputs?.institutionEmail ||
              state?.inputs?.email
            }
            placeholder="institution@example.com"
            error={state?.errors?.contactEmail}
            className="border-gray-300 focus:border-primary focus:ring-primary"
            required
          />

          <FormInput
            id="contactPhone"
            name="contactPhone"
            label="Contact Phone"
            icon={Phone}
            defaultValue={
              state?.inputs?.contactPhone ||
              state?.inputs?.institutionPhone ||
              state?.inputs?.phoneNumber
            }
            placeholder="e.g. 01XXXXXXXXX"
            error={state?.errors?.contactPhone}
            className="border-gray-300 focus:border-primary focus:ring-primary"
            // Optional field, no required prop
          />
        </div>

        <FormInput
          id="address"
          name="address"
          label="Institution Address"
          icon={MapPin}
          defaultValue={state?.inputs?.address}
          placeholder="Full address (e.g. 123 Street, Dhaka)"
          error={state?.errors?.address}
          className="border-gray-300 focus:border-primary focus:ring-primary"
          required
        />
      </div>
    </div>
  );
};

export default InstitutionStep;
