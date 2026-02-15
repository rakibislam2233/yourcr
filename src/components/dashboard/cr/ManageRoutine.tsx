"use client";

import { Button } from "@/components/ui/button";
import {
  RoutineType as ApiRoutineType,
  Routine,
} from "@/interface/routine.interface";
import { cn } from "@/lib/utils";
import { createRoutine, updateRoutine } from "@/services/routine.service";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, FileText, FileUp, Inbox, PencilLine } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "sonner";
import PageHeader from "../shared/PageHeader";

type RoutineTab = "class" | "exam";

interface RoutineDisplay {
  id?: string;
  name: string;
  url: string;
  type: "pdf" | "image";
  uploadedAt: string;
}

interface ManageRoutineProps {
  initialRoutines: Routine[];
}

const ManageRoutine: React.FC<ManageRoutineProps> = ({ initialRoutines }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<RoutineTab>("class");
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // Initialize state from props
  const getInitialState = () => {
    const state: Record<RoutineTab, RoutineDisplay | null> = {
      class: null,
      exam: null,
    };

    initialRoutines.forEach((routine) => {
      const isPdf = routine.fileUrl.endsWith(".pdf");
      const displayData: RoutineDisplay = {
        id: routine.id,
        name: routine.name,
        url: routine.fileUrl,
        type: isPdf ? "pdf" : "image",
        uploadedAt: new Date().toLocaleDateString(), // You might want to use routine.updatedAt
      };

      if (routine.type === ApiRoutineType.CLASS) {
        state.class = displayData;
      } else if (routine.type === ApiRoutineType.EXAM) {
        state.exam = displayData;
      }
    });
    return state;
  };

  const [routines, setRoutines] =
    useState<Record<RoutineTab, RoutineDisplay | null>>(getInitialState());

  const handleFileUpload = useCallback(
    async (file: File) => {
      const isImage = file.type.startsWith("image/");
      const isPdf = file.type === "application/pdf";

      if (!isImage && !isPdf) {
        toast.error("Please upload an image or PDF file");
        return;
      }

      setIsPending(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "name",
        activeTab === "class" ? "Class Routine" : "Exam Routine",
      );
      formData.append(
        "type",
        activeTab === "class" ? ApiRoutineType.CLASS : ApiRoutineType.EXAM,
      );

      try {
        let result;
        const currentRoutine = routines[activeTab];

        // Mock previous state for server action
        const prevState = { success: false, message: "", timestamp: 0 };

        if (currentRoutine?.id) {
          // Update existing routine
          result = await updateRoutine(currentRoutine.id, prevState, formData);
        } else {
          // Create new routine
          result = await createRoutine(prevState, formData);
        }

        if (result.success && result.data) {
          const newRoutine = result.data as Routine;
          const displayData: RoutineDisplay = {
            id: newRoutine.id,
            name: newRoutine.name,
            url: newRoutine.fileUrl,
            type: newRoutine.fileUrl.endsWith(".pdf") ? "pdf" : "image",
            uploadedAt: new Date().toLocaleDateString(),
          };

          setRoutines((prev) => ({ ...prev, [activeTab]: displayData }));
          setIsUploading(false);
          toast.success(result.message);
          router.refresh();
        } else {
          toast.error(result.message || "Failed to upload routine");
        }
      } catch {
        toast.error("An error occurred during upload");
      } finally {
        setIsPending(false);
      }
    },
    [activeTab, routines, router],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileUpload(file);
    },
    [handleFileUpload],
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <PageHeader
        title="Institutional Routine"
        description="Share and manage batch routines"
        icon={<Calendar className="w-6 h-6" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Routine" },
        ]}
      />

      {/* Primary Tab Switcher - Styled like User's Image */}
      <div className="flex gap-4">
        {(["class", "exam"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setIsUploading(false);
            }}
            className={cn(
              "px-6 py-2.5 rounded-md text-sm font-bold transition-all duration-200 cursor-pointer",
              activeTab === tab
                ? "bg-primary text-white"
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

      {/* Routine Display Area / Upload Zone */}
      <AnimatePresence mode="wait">
        {isUploading ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "bg-white rounded-2xl border-2 border-dashed p-20 flex flex-col items-center justify-center transition-all",
              isDragging
                ? "border-primary bg-blue-50/50 scale-[1.01]"
                : "border-gray-200",
            )}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
          >
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) =>
                e.target.files?.[0] && handleFileUpload(e.target.files[0])
              }
            />
            <div className="size-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <FileUp className="w-8 h-8 text-primary" />
            </div>
            <p className="text-lg font-bold text-gray-900">
              Drop the Routine File here
            </p>
            <p className="text-sm text-gray-400 mt-1">
              PDF or image files up to 5MB
            </p>
            <Button
              variant="ghost"
              className="mt-4 text-red-500 font-bold"
              onClick={() => setIsUploading(false)}
            >
              Cancel Upload
            </Button>
          </motion.div>
        ) : routines[activeTab] ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl border border-blue-50 p-6 shadow-sm overflow-hidden min-h-[600px] w-full flex flex-col items-center"
          >
            {routines[activeTab]?.type === "image" ? (
              <Image
                src={routines[activeTab]?.url}
                alt="Routine"
                width={1000}
                height={1000}
                className="max-w-full h-auto rounded-md shadow-sm"
              />
            ) : (
              <div className="w-full h-[500px] bg-white rounded-xl overflow-hidden border border-gray-100 shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 animate-pulse -z-10">
                  <FileText className="w-10 h-10 text-gray-200" />
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
            className="bg-white rounded-2xl border border-blue-50 p-24 flex flex-col items-center justify-center text-center shadow-sm"
          >
            <div className="size-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <Inbox className="w-10 h-10 text-blue-200" />
            </div>
            <h4 className="text-lg font-bold text-gray-600">
              No Routine Available Yet.
            </h4>
            <p className="text-sm text-gray-400 mt-2 max-w-[320px]">
              Upload A Routine PDF To Make It Accessible For All Students.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Button - Bottom Left as per Image */}
      {!isUploading && (
        <div className="pt-4 flex justify-start">
          <Button
            onClick={() => setIsUploading(true)}
            className="bg-primary hover:bg-blue-700 text-white font-bold h-12 px-8 rounded-md flex gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
          >
            <PencilLine className="w-5 h-5" />
            {isPending ? "Updating..." : "Update Routine"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ManageRoutine;
