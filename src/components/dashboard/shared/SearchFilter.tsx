"use client";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
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
    <div className="w-full space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <FormInput
            id="search"
            type="text"
            placeholder={searchPlaceholder}
            icon={Search}
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.target.value)
            }
            className="h-11 bg-gray-50/30"
          />
        </div>

        {/* Filter Dropdowns */}
        {filters.map((filter) => (
          <div key={filter.name} className="min-w-[180px]">
            <FormSelect
              name={filter.name}
              value={
                searchParams?.get(filter.name) || filter.defaultValue || ""
              }
              onValueChange={(value: string) =>
                updateSearchParams(filter.name, value)
              }
              options={[
                { value: "", label: `All ${filter.label}` },
                ...filter.options,
              ]}
              placeholder={filter.label}
              triggerClassName="h-11 bg-gray-50/30 font-medium"
            />
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
