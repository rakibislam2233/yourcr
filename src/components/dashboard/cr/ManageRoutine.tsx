"use client";
import { Button } from "@/components/ui/button";
import {
  RoutineType as ApiRoutineType,
  Routine,
} from "@/interface/routine.interface";
import { cn } from "@/lib/utils";
import { createRoutine, updateRoutine } from "@/services/routine.service";
import {
  Calendar,
  ExternalLink,
  FileText,
  FileUp,
  Inbox,
  PencilLine,
} from "lucide-react";
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

    initialRoutines?.forEach((routine) => {
      const isPdf = routine.fileUrl.toLowerCase().endsWith(".pdf");
      const displayData: RoutineDisplay = {
        id: routine.id,
        name: routine.name,
        url: routine.fileUrl,
        type: isPdf ? "pdf" : "image",
        uploadedAt: routine.updatedAt,
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
      formData.append("fileUrl", file);
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
            type: newRoutine.fileUrl.toLowerCase().endsWith(".pdf")
              ? "pdf"
              : "image",
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

  // Get the current routine data
  const currentRoutine = routines[activeTab];

  return (
    <section className="w-full mx-auto space-y-6 pb-16 px-4">
      <PageHeader
        title="Institutional Routine"
        description="Access and manage your schedules in one place"
        icon={<Calendar className="w-5 h-5 text-primary" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Routine" },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Primary Tab Switcher */}
        <div className="flex bg-gray-100 p-1 rounded-md w-fit border border-gray-200">
          {(["class", "exam"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setIsUploading(false);
              }}
              className={cn(
                "px-6 py-2 rounded-md text-sm font-bold cursor-pointer",
                activeTab === tab
                  ? "bg-white text-primary border border-gray-200"
                  : "text-gray-500",
              )}
            >
              {tab === "class" ? "Class Routine" : "Exam Routine"}
            </button>
          ))}
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 bg-gray-50 px-4 py-2 rounded-md border border-gray-200">
          <div className="size-2 rounded-full bg-primary" />
          {activeTab === "class" ? "Class" : "Exam"} Routine
        </div>
      </div>

      {/* Routine Display Area / Upload Zone */}
      <div className="min-h-[300px]">
        {isUploading ? (
          <div
            className={cn(
              "relative bg-white rounded-md border-2 border-dashed p-10 sm:p-20 flex flex-col items-center justify-center min-h-[400px]",
              isDragging ? "border-primary bg-primary/5" : "border-gray-200",
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
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              accept="image/*,.pdf"
              onChange={(e) =>
                e.target.files?.[0] && handleFileUpload(e.target.files[0])
              }
            />
            <div className="size-16 bg-gray-50 rounded-md flex items-center justify-center mb-6 border border-gray-200">
              <FileUp className="w-8 h-8 text-primary" />
            </div>
            <p className="text-xl font-bold text-gray-900 text-center mb-2">
              Upload New Routine
            </p>
            <p className="text-sm text-gray-500 text-center font-medium max-w-xs">
              Drag and drop your PDF or Image file here
            </p>

            <div className="flex gap-4 mt-10">
              <Button
                variant="outline"
                className="font-bold border-gray-200 text-gray-600 rounded-md"
                onClick={() => setIsUploading(false)}
              >
                Go Back
              </Button>
              <Button
                disabled={isPending}
                className="bg-primary text-white font-bold rounded-md"
              >
                {isPending ? "Uploading..." : "Select File"}
              </Button>
            </div>
          </div>
        ) : currentRoutine ? (
          <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-bold text-gray-900">
                  {activeTab === "class" ? "Class" : "Exam"} Routine
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="bg-primary text-white font-bold rounded-md h-9 px-4 gap-2"
                  onClick={() => setIsUploading(true)}
                >
                  <PencilLine className="w-4 h-4" />
                  Change
                </Button>
              </div>
            </div>

            {/* Content Display */}
            <div className="w-full bg-white p-4 sm:p-5">
              {currentRoutine.type === "image" ? (
                <div className="flex justify-center bg-gray-50/50 rounded-md border border-gray-100 overflow-hidden max-h-[600px] sm:max-h-[800px] overflow-y-auto custom-scrollbar">
                  <Image
                    src={currentRoutine.url}
                    alt="Routine"
                    width={1200}
                    height={1600}
                    className="w-full h-auto max-w-full object-contain"
                    priority
                    unoptimized // Some external images might benefit from this if they are already optimized
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 bg-gray-50/50 rounded-md border border-gray-200 border-dashed">
                  <FileText className="w-12 h-12 text-primary mb-4" />
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Official PDF {activeTab === "class" ? "Class" : "Exam"}{" "}
                    Schedule
                  </h4>
                  <p className="text-sm text-gray-500 font-medium mb-6 text-center px-4">
                    Download or view the high-quality PDF version below.
                  </p>
                  <Button
                    asChild
                    className="bg-primary text-white font-bold h-11 px-8 rounded-md flex gap-2"
                  >
                    <a
                      href={currentRoutine.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View PDF Routine
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-md border-2 border-dashed border-gray-200 p-16 flex flex-col items-center justify-center text-center">
            <Inbox className="w-12 h-12 text-gray-300 mb-6" />
            <h4 className="text-xl font-bold text-gray-900">
              No Routine Uploaded
            </h4>
            <p className="text-sm text-gray-500 mt-2 max-w-sm">
              Upload your Batch Routine here for everyone to see.
            </p>
            <Button
              onClick={() => setIsUploading(true)}
              className="mt-8 bg-primary text-white font-bold h-11 px-8 rounded-md"
            >
              Upload Routine Now
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageRoutine;
