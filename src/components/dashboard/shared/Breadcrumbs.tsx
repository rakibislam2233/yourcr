"use client";

import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    if (!pathname) return null;
    const paths = pathname.split("/").filter((p) => p);
    return paths.slice(0, 3).map((path, index) => {
      const label =
        path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
      const isLast = index === paths.length - 1;

      return (
        <span key={index} className="flex items-center">
          {index > 0 && <span className="text-gray-300 mx-2">/</span>}
          <span
            className={`text-[10px] font-bold tracking-wider uppercase ${
              isLast ? "text-gray-900" : "text-gray-400"
            }`}
          >
            {label}
          </span>
        </span>
      );
    });
  };

  return (
    <nav className="hidden sm:flex items-center">{generateBreadcrumbs()}</nav>
  );
};

export default Breadcrumbs;
