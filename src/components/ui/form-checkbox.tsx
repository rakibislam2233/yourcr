"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";

interface FormCheckboxProps extends Omit<
  React.ComponentProps<typeof Checkbox>,
  "error"
> {
  label: string;
  description?: string;
  error?: string | string[];
}

const FormCheckbox = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  FormCheckboxProps
>(({ label, description, error, className, id, name, ...props }, ref) => {
  const uniqueId =
    id || name || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-row items-center space-x-3 space-y-0">
        <Checkbox
          id={uniqueId}
          name={name}
          ref={ref}
          className={cn(
            "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
            error ? "border-red-500" : "border-gray-200",
            className,
          )}
          {...props}
        />
        <div className="space-y-1 leading-none">
          <Label
            htmlFor={uniqueId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-700"
          >
            {label}
          </Label>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>
      {error && (
        <p className="text-xs font-medium text-red-500 mt-1">
          {Array.isArray(error) ? error[0] : error}
        </p>
      )}
    </div>
  );
});
FormCheckbox.displayName = "FormCheckbox";

export { FormCheckbox };
