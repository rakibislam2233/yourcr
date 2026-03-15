import { cn } from "@/lib/utils";
import React from "react";

interface StatsOverviewItem {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}

interface StatsOverviewProps {
  items: StatsOverviewItem[];
  gridClassName?: string;
  cardClassName?: string;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({
  items,
  gridClassName,
  cardClassName,
}) => {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4", gridClassName)}>
      {items.map((item) => (
        <div
          key={item.label}
          className={cn("bg-white rounded-xl p-5 border border-gray-100", cardClassName)}
        >
          <p className="text-sm text-gray-500">{item.label}</p>
          <p
            className={cn(
              "text-2xl font-bold text-gray-900 mt-1",
              item.valueClassName,
            )}
          >
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;