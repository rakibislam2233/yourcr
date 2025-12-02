"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Calendar, Check } from "lucide-react";

interface Semester {
  id: string;
  name: string;
  year: string;
  isCurrent?: boolean;
}

const mockSemesters: Semester[] = [
  { id: "1", name: "8th Semester", year: "2024", isCurrent: true },
  { id: "2", name: "7th Semester", year: "2024" },
  { id: "3", name: "6th Semester", year: "2023" },
  { id: "4", name: "5th Semester", year: "2023" },
];

const SemesterSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(mockSemesters[0]);

  const handleSelect = (semester: Semester) => {
    setSelectedSemester(semester);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-primary/50 hover:bg-gray-50 transition-all duration-200"
      >
        <div className="p-1.5 bg-primary/10 rounded-lg">
          <Calendar className="w-4 h-4 text-primary" />
        </div>
        <div className="text-left">
          <p className="text-xs text-gray-500">Current Semester</p>
          <p className="text-sm font-semibold text-gray-900">
            {selectedSemester.name}
          </p>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20"
            >
              <div className="p-2">
                <p className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Select Semester
                </p>
                {mockSemesters.map((semester) => (
                  <button
                    key={semester.id}
                    onClick={() => handleSelect(semester)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-colors ${
                      selectedSemester.id === semester.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          semester.isCurrent ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                      <div className="text-left">
                        <p className="text-sm font-medium">{semester.name}</p>
                        <p className="text-xs text-gray-400">{semester.year}</p>
                      </div>
                    </div>
                    {selectedSemester.id === semester.id && (
                      <Check className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
              <div className="border-t border-gray-100 p-2">
                <button className="w-full px-3 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  + Add New Semester
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SemesterSwitcher;
