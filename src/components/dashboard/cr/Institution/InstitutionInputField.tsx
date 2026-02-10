import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideIcon } from "lucide-react";
import React from "react";

interface InputFieldProps {
  id: string; // Used as name
  label: string;
  icon: LucideIcon;
  placeholder: string;
  defaultValue: string;
  type?: string;
  required?: boolean;
  name?: string;
  error?: string[] | string;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  icon: Icon,
  placeholder,
  defaultValue,
  type = "text",
  required = true,
  name,
  error,
}) => (
  <div className="flex flex-col gap-1.5">
    <Label htmlFor={id} className="text-sm font-semibold text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <Input
        id={id}
        name={name || id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all ${
          error ? "border-red-500 focus-visible:ring-red-500" : ""
        }`}
      />
    </div>
    {error && (
      <p className="text-sm text-red-500">
        {Array.isArray(error) ? error[0] : error}
      </p>
    )}
  </div>
);
