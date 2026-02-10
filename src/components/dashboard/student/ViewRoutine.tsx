"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Download,
  ExternalLink,
  FileText,
  Inbox,
} from "lucide-react";
import React, { useState } from "react";
import PageHeader from "../shared/PageHeader";

type RoutineType = "class" | "exam";

interface RoutineFile {
  name: string;
  url: string;
  type: "pdf" | "image";
  uploadedAt: string;
}

const ViewRoutine: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RoutineType>("class");

  // Mock data initialization
  const [routines] = useState<Record<RoutineType, RoutineFile | null>>({
    class: {
      name: "Class Routine Fall 2025",
      url: "https://i.ibb.co/vzKq5X9/routine-preview.png",
      type: "image",
      uploadedAt: "Oct 25, 2025",
    },
    exam: null,
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <PageHeader
        title="Institutional Routine"
        description="View your latest class and exam schedules"
        icon={Calendar}
        breadcrumbs={[
          { label: "Home", href: "/dashboard/student" },
          { label: "Routine" },
        ]}
      />

      {/* Primary Tab Switcher - Styled like User's Image */}
      <div className="flex gap-4">
        {(["class", "exam"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-6 py-2.5 rounded-md text-sm font-bold transition-all duration-200",
              activeTab === tab
                ? "bg-emerald-600 text-white shadow-md font-bold"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200",
            )}
          >
            {tab === "class" ? "Class Routine" : "Exams Routine"}
          </button>
        ))}
      </div>

      {/* Dynamic Title */}
      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <span className="text-gray-400">—</span>
        Current {activeTab === "class" ? "Class" : "Exam"} Routine PDF
      </h2>

      {/* Routine Display Area */}
      <AnimatePresence mode="wait">
        {routines[activeTab] ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl border border-emerald-50 p-6 shadow-sm overflow-hidden min-h-[500px] flex flex-col items-center"
          >
            <div className="w-full flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span className="size-2 bg-emerald-500 rounded-full animate-pulse" />
                Authorized Schedule
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="font-bold border-gray-200 gap-2"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </Button>
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 font-bold gap-2"
                >
                  <ExternalLink className="w-4 h-4" /> Full View
                </Button>
              </div>
            </div>

            {routines[activeTab]?.type === "image" ? (
              <img
                src={routines[activeTab]?.url}
                alt="Routine"
                className="max-w-full h-auto rounded-lg shadow-sm border border-gray-100"
              />
            ) : (
              <div className="w-full h-[500px] bg-white rounded-xl overflow-hidden border border-gray-100 shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 animate-pulse -z-10">
                  <FileText className="w-10 h-10 text-emerald-100" />
                </div>
                <iframe
                  src={`${routines[activeTab]?.url}#view=FitH&toolbar=0&navpanes=0&scrollbar=1`}
                  className="w-full h-full border-none rounded-xl"
                  title="PDF Routine Preview"
                />
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl border border-emerald-50 p-24 flex flex-col items-center justify-center text-center shadow-sm"
          >
            <div className="size-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
              <Inbox className="w-10 h-10 text-emerald-200" />
            </div>
            <h4 className="text-lg font-bold text-gray-600">
              No Routine Available Yet.
            </h4>
            <p className="text-sm text-gray-400 mt-2 max-w-[320px]">
              Your CR hasn&apos;t uploaded the {activeTab} routine for this
              semester yet.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewRoutine;
