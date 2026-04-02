"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface DatePickerProps {
  value?: Date | string;
  onChange: (date: Date) => void;
  placeholder?: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  name?: string;
  id?: string;
}

type ViewMode = "calendar" | "month" | "year";

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "Select date",
  className = "",
  minDate,
  maxDate,
  disabled = false,
  name,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize value to Date object
  const dateValue = value
    ? typeof value === "string"
      ? new Date(value)
      : value
    : undefined;

  const [currentMonth, setCurrentMonth] = useState(dateValue || new Date());
  const [yearRangeStart, setYearRangeStart] = useState(
    Math.floor((dateValue || new Date()).getFullYear() / 12) * 12
  );

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    selectedDate.setHours(12, 0, 0, 0);

    if (!isDateDisabled(selectedDate)) {
      onChange(selectedDate);
      setIsOpen(false);
    }
  };

  const handleMonthSelect = (monthIndex: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex, 1));
    setViewMode("calendar");
  };

  const handleYearSelect = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
    setViewMode("month");
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMode === "calendar") {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    } else if (viewMode === "year") {
      setYearRangeStart(yearRangeStart - 12);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMode === "calendar") {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    } else if (viewMode === "year") {
      setYearRangeStart(yearRangeStart + 12);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setViewMode("calendar");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderCalendar = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth);
    const firstDay = firstDayOfMonth(currentMonth);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isDisabled = isDateDisabled(date);
      const isSelected = dateValue && isSameDay(date, dateValue);
      const isToday = isSameDay(date, new Date());

      days.push(
        <button
          type="button"
          key={day}
          onClick={() => handleDateClick(day)}
          disabled={isDisabled}
          className={cn(
            "w-full aspect-square flex items-center cursor-pointer justify-center text-sm rounded-md transition-all",
            isSelected
              ? "bg-primary text-white font-bold shadow-md transform scale-105"
              : isToday
                ? "border border-primary text-primary font-semibold bg-primary/5"
                : "hover:bg-gray-100 text-gray-700",
            isDisabled && "text-gray-300 cursor-not-allowed hover:bg-transparent opacity-50",
          )}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  const renderMonths = () => {
    return months.map((month, index) => (
      <button
        key={month}
        type="button"
        onClick={() => handleMonthSelect(index)}
        className={cn(
          "py-3 text-sm font-medium rounded-lg transition-all hover:bg-gray-100",
          currentMonth.getMonth() === index && "bg-primary/10 text-primary font-bold"
        )}
      >
        {month.slice(0, 3)}
      </button>
    ));
  };

  const renderYears = () => {
    const years = [];
    for (let i = 0; i < 12; i++) {
      const year = yearRangeStart + i;
      years.push(
        <button
          key={year}
          type="button"
          onClick={() => handleYearSelect(year)}
          className={cn(
            "py-3 text-sm font-medium rounded-lg transition-all hover:bg-gray-100",
            currentMonth.getFullYear() === year && "bg-primary/10 text-primary font-bold"
          )}
        >
          {year}
        </button>
      );
    }
    return years;
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {name && (
        <input
          type="hidden"
          name={name}
          value={dateValue ? dateValue.toISOString().split("T")[0] : ""}
        />
      )}
      <button
        type="button"
        id={id}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "flex items-center h-12 w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-left focus:outline-hidden focus:border-primary transition-all disabled:opacity-50 disabled:bg-gray-50",
          className
        )}
      >
        {dateValue ? (
          <span className="text-gray-900 font-medium">{formatDate(dateValue)}</span>
        ) : (
          <span className="text-gray-400 font-medium">{placeholder}</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute z-60 mt-2 left-0 w-full sm:w-[320px] bg-white border border-gray-100 rounded-xl shadow-2xl p-4 animate-in fade-in-0 zoom-in-95 duration-200 origin-top-left overflow-hidden h-[340px] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              className={cn(
                "p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors",
                viewMode === "month" && "invisible"
              )}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setViewMode(viewMode === "calendar" ? "year" : "calendar")}
              className="px-3 py-1.5 hover:bg-gray-100 rounded-lg text-sm font-bold text-gray-900 transition-colors flex items-center gap-1"
            >
              {viewMode === "year" ? (
                `${yearRangeStart} - ${yearRangeStart + 11}`
              ) : viewMode === "month" ? (
                currentMonth.getFullYear()
              ) : (
                <>
                  {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleNext}
              className={cn(
                "p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors",
                viewMode === "month" && "invisible"
              )}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grow overflow-y-auto custom-scrollbar pt-1">
            {viewMode === "calendar" && (
              <>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div key={day} className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
              </>
            )}

            {viewMode === "month" && (
              <div className="grid grid-cols-3 gap-2">{renderMonths()}</div>
            )}

            {viewMode === "year" && (
              <div className="grid grid-cols-3 gap-2">{renderYears()}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
