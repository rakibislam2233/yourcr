"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface FilterOption {
  label: string;
  value: string;
}

interface SearchFilterProps {
  searchPlaceholder?: string;
  filters?: {
    name: string;
    label: string;
    options: FilterOption[];
    defaultValue?: string;
  }[];
}

export function SearchFilter({
  searchPlaceholder = "Search...",
  filters = [],
}: SearchFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams?.get("search") || "",
  );

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      updateSearchParams("search", searchValue);
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const updateSearchParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      // Reset to page 1 when searching/filtering
      if (key !== "page") {
        params.delete("page");
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const clearFilters = () => {
    setSearchValue("");
    if (pathname) {
      router.push(pathname, { scroll: false });
    }
  };

  const hasActiveFilters =
    searchValue || filters.some((filter) => searchParams?.get(filter.name));

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="search"
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10 h-11 border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30"
            />
          </div>
        </div>

        {/* Filter Dropdowns */}
        {filters.map((filter) => (
          <div key={filter.name} className="min-w-[180px]">
            <Label htmlFor={filter.name} className="sr-only">
              {filter.label}
            </Label>
            <Select
              value={
                searchParams?.get(filter.name) || filter.defaultValue || ""
              }
              onValueChange={(value) => updateSearchParams(filter.name, value)}
            >
              <SelectTrigger className="h-11 bg-gray-50/30 border-gray-200 font-medium">
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{filter.label}</SelectItem>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            type="button"
            variant="outline"
            onClick={clearFilters}
            className="h-11 px-4 gap-2 whitespace-nowrap"
          >
            <X className="w-4 h-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
