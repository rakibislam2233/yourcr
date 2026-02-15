import DatePicker from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CalendarIcon, LucideIcon } from "lucide-react";
import React from "react";

interface FormDatePickerProps extends Omit<
  React.ComponentProps<typeof DatePicker>,
  "error"
> {
  label?: string;
  icon?: LucideIcon;
  error?: string | string[];
  required?: boolean;
}

const FormDatePicker: React.FC<FormDatePickerProps> = ({
  label,
  icon: Icon = CalendarIcon,
  error,
  required,
  className,
  id,
  name,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label
          htmlFor={id || name}
          className="text-sm font-semibold text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        <DatePicker
          id={id}
          name={name}
          className={cn(
            "h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary transition-all font-medium",
            "pl-10",
            error ? "border-red-500 bg-red-50/10" : "bg-gray-50/30",
            className,
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs font-medium text-red-500 mt-1">
          {Array.isArray(error) ? error[0] : error}
        </p>
      )}
    </div>
  );
};

export { FormDatePicker };
