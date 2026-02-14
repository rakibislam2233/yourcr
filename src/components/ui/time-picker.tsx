"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface TimePickerProps {
  value?: string; // Format: "10:00 AM"
  onChange?: (time: string) => void;
  className?: string;
  disabled?: boolean;
  error?: boolean;
}

export function TimePicker({
  value,
  onChange,
  className,
  disabled,
  error,
}: TimePickerProps) {
  // Parse the time value
  const parseTime = (timeStr?: string) => {
    if (!timeStr) return { hour: "12", minute: "00", period: "AM" };

    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return { hour: "12", minute: "00", period: "AM" };

    return {
      hour: match[1],
      minute: match[2],
      period: match[3].toUpperCase(),
    };
  };

  const { hour, minute, period } = parseTime(value);

  const updateTime = (
    newHour: string,
    newMinute: string,
    newPeriod: string,
  ) => {
    const formattedTime = `${newHour}:${newMinute} ${newPeriod}`;
    onChange?.(formattedTime);
  };

  // Generate hours (1-12)
  const hours = Array.from({ length: 12 }, (_, i) => {
    const h = i + 1;
    return h.toString();
  });

  // Generate minutes (00, 15, 30, 45)
  const minutes = ["00", "15", "30", "45"];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex-1">
        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
        <Select
          value={hour}
          onValueChange={(h) => updateTime(h, minute, period)}
          disabled={disabled}
        >
          <SelectTrigger
            className={cn(
              "pl-10 h-12 border-gray-200 bg-gray-50/30 font-medium",
              error && "border-red-500",
            )}
          >
            <SelectValue placeholder="Hour" />
          </SelectTrigger>
          <SelectContent>
            {hours.map((h) => (
              <SelectItem key={h} value={h}>
                {h}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <span className="text-2xl font-bold text-gray-400">:</span>

      <Select
        value={minute}
        onValueChange={(m) => updateTime(hour, m, period)}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn(
            "flex-1 h-12 border-gray-200 bg-gray-50/30 font-medium",
            error && "border-red-500",
          )}
        >
          <SelectValue placeholder="Min" />
        </SelectTrigger>
        <SelectContent>
          {minutes.map((m) => (
            <SelectItem key={m} value={m}>
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={period}
        onValueChange={(p) => updateTime(hour, minute, p)}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn(
            "w-24 h-12 border-gray-200 bg-gray-50/30 font-medium",
            error && "border-red-500",
          )}
        >
          <SelectValue placeholder="AM/PM" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AM">AM</SelectItem>
          <SelectItem value="PM">PM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
