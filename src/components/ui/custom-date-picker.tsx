"use client";

import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomDatePickerProps {
  value?: Date;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: boolean;
}

const CustomInput = forwardRef<
  HTMLButtonElement,
  {
    value?: string;
    onClick?: () => void;
    placeholder?: string;
    error?: boolean;
  }
>(({ value, onClick, placeholder, error }, ref) => (
  <button
    type="button"
    onClick={onClick}
    ref={ref}
    className={cn(
      "w-full h-12 px-3 pl-10 text-left border rounded-md bg-gray-50/30 border-gray-200 hover:bg-gray-50 transition-all font-medium",
      error && "border-red-500",
      !value && "text-gray-400",
    )}
  >
    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
    {value || placeholder || "Select date"}
  </button>
));

CustomInput.displayName = "CustomInput";

export function CustomDatePicker({
  value,
  onChange,
  placeholder = "Select date",
  className,
  disabled,
  error,
}: CustomDatePickerProps) {
  return (
    <div className={cn("relative", className)}>
      <DatePicker
        selected={value}
        onChange={onChange}
        customInput={<CustomInput placeholder={placeholder} error={error} />}
        dateFormat="MMMM dd, yyyy"
        disabled={disabled}
        calendarClassName="!font-sans"
        wrapperClassName="w-full"
        popperClassName="!z-50"
      />
    </div>
  );
}
