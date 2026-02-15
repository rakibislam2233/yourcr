"use client";

import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { ActionState } from "@/interface/action-state.interface";
import {
  BookOpen,
  Calendar,
  Clock,
  GraduationCap,
  Hash,
  Users,
} from "lucide-react";
import { useState } from "react";

interface AcademicStepProps {
  state?: ActionState;
  institutionType: string;
}

const AcademicStep: React.FC<AcademicStepProps> = ({
  state,
  institutionType,
}) => {
  const [batchType, setBatchType] = useState(
    state?.inputs?.batchType || "SEMESTER",
  );

  const isPolytechnic = institutionType === "POLYTECHNIC";
  const isUniversity = institutionType === "UNIVERSITY";
  const isCollege = institutionType === "COLLEGE";

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            id="session"
            name="session"
            label="Session"
            icon={Calendar}
            defaultValue={state?.inputs?.session || state?.inputs?.name}
            placeholder="e.g. 2021-2022"
            error={state?.errors?.session}
            className="border-gray-300 focus:border-primary focus:ring-primary"
            required
          />

          <FormSelect
            name="batchType"
            label="Batch Type"
            value={batchType}
            onValueChange={setBatchType}
            placeholder="Select type"
            // No error prop for batchType in original code, but safe to add if needed, or skip
            options={[
              { value: "SEMESTER", label: "Semester" },
              { value: "YEAR", label: "Year" },
            ]}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            id="academicYear"
            name="academicYear"
            label={
              isPolytechnic
                ? "Year"
                : isCollege
                  ? "Class Year"
                  : "Academic Year"
            }
            icon={GraduationCap}
            defaultValue={state?.inputs?.academicYear}
            placeholder={isPolytechnic ? "e.g. 1st / 2nd" : "e.g. 1st Year"}
            error={state?.errors?.academicYear}
            className="border-gray-300 focus:border-primary focus:ring-primary"
            required
          />

          <FormInput
            id="semester"
            name="semester"
            label={
              batchType === "SEMESTER"
                ? isPolytechnic
                  ? "Current Semester"
                  : "Current Semester"
                : "Current Year"
            }
            icon={Hash}
            defaultValue={state?.inputs?.semester}
            placeholder={batchType === "SEMESTER" ? "e.g. 5th" : "e.g. 2nd"}
            error={state?.errors?.semester}
            className="border-gray-300 focus:border-primary focus:ring-primary"
            // Optional field
          />
        </div>

        <FormInput
          id="department"
          name="department"
          label={isCollege ? "Group / Department" : "Department / Subject"}
          icon={BookOpen}
          defaultValue={state?.inputs?.department}
          placeholder={
            isCollege ? "e.g. Science / Commerce" : "e.g. Computer Science"
          }
          error={state?.errors?.department}
          className="border-gray-300 focus:border-primary focus:ring-primary"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            id="shift"
            name="shift"
            label={`Shift ${isUniversity || isPolytechnic ? "(Optional)" : ""}`}
            icon={Clock}
            defaultValue={state?.inputs?.shift}
            placeholder="e.g. Day / Evening"
            // error={state?.errors?.shift} // Assuming optional, but good to have if validation exists
            className="border-gray-300 focus:border-primary focus:ring-primary"
          />

          <FormInput
            id="group"
            name="group"
            label={`Group / Section ${isCollege ? "" : "(Optional)"}`}
            icon={Users}
            defaultValue={state?.inputs?.group}
            placeholder="e.g. A / B / Science"
            // error={state?.errors?.group}
            className="border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default AcademicStep;
