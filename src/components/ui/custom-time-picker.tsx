"use client";

import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomTimePickerProps {
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
    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
    {value || placeholder || "Select time"}
  </button>
));

CustomInput.displayName = "CustomInput";

export function CustomTimePicker({
  value,
  onChange,
  placeholder = "Select time",
  className,
  disabled,
  error,
}: CustomTimePickerProps) {
  return (
    <div className={cn("relative", className)}>
      <DatePicker
        selected={value}
        onChange={onChange}
        customInput={<CustomInput placeholder={placeholder} error={error} />}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        disabled={disabled}
        calendarClassName="!font-sans"
        wrapperClassName="w-full"
        popperClassName="!z-50"
      />
    </div>
  );
}
