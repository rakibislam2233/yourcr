"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: boolean;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
  disabled,
  error,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative">
          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
          <Button
            type="button"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-medium h-12 pl-10 border-gray-200 bg-gray-50/30 transition-all",
              "hover:bg-gray-50 hover:border-gray-300",
              !value && "text-gray-400",
              value && "text-gray-900",
              error && "border-red-500",
              className,
            )}
            disabled={disabled}
          >
            {value ? (
              format(value, "MMMM dd, yyyy")
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
