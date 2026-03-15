"use client";
import { Button } from "@/components/ui/button";
import { FormDatePicker } from "@/components/ui/form-date-picker";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormTextarea } from "@/components/ui/form-textarea";
import { Label } from "@/components/ui/label";
import { Subject } from "@/interface/subject.interface";
import {
  createAssessment,
  type AssessmentActionState,
} from "@/services/assessment.service";
import { FileText, Hash, Paperclip, Upload, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const typeOptions = [
  {
    value: "EXAM",
    label: "Exam",
  },
  {
    value: "ASSIGNMENT",
    label: "Assignment",
  },
  {
    value: "QUIZ",
    label: "Quiz",
  },
  {
    value: "LAB",
    label: "Lab",
  },
  {
    value: "PRESENTATION",
    label: "Presentation",
  },
  {
    value: "PROJECT",
    label: "Project",
  },
  {
    value: "OTHER",
    label: "Other",
  },
];

const initialState: AssessmentActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: undefined,
  timestamp: 0,
};

interface AddAssessmentFormProps {
  subjects: Subject[];
}

const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const AddAssessmentForm: React.FC<AddAssessmentFormProps> = ({ subjects }) => {
  const router = useRouter();
  const [deadlineDate, setDeadlineDate] = useState<Date>();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDraggingFiles, setIsDraggingFiles] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, formAction, isPending] = useActionState(
    createAssessment,
    initialState,
  );
  const lastToastTimestamp = useRef(state.timestamp);

  useEffect(() => {
    if (
      state.timestamp &&
      state.timestamp > (lastToastTimestamp.current || 0)
    ) {
      if (state.success) {
        toast.success(state.message);
        router.push("/dashboard/cr/assessments");
      } else if (state.message && !state.errors) {
        toast.error(state.message);
      }
      lastToastTimestamp.current = state.timestamp;
    }
  }, [state, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (deadlineDate) {
      const deadlineDateString = formatLocalDate(deadlineDate);
      formData.set("date", deadlineDateString);
      formData.set("deadline", `${deadlineDateString}T23:59:00`);
    }

    formData.delete("files");
    uploadedFiles.forEach((file) => {
      formData.append("files", file);
    });

    startTransition(() => {
      formAction(formData);
    });
  };

  const addFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploadedFiles((prev) => {
      const next = [...prev];

      Array.from(files).forEach((file) => {
        if (file.type.startsWith("video/")) {
          return;
        }

        const alreadyExists = next.some(
          (item) =>
            item.name === file.name &&
            item.size === file.size &&
            item.lastModified === file.lastModified,
        );

        if (!alreadyExists) {
          next.push(file);
        }
      });

      return next;
    });

    const hasVideo = Array.from(files).some((file) =>
      file.type.startsWith("video/"),
    );
    if (hasVideo) {
      toast.error("Video upload is not allowed");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingFiles(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingFiles(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingFiles(false);
    addFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const viewFile = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    window.open(objectUrl, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(objectUrl), 10000);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <FormInput
            id="title"
            name="title"
            label="Assessment Title"
            icon={FileText}
            defaultValue={state.inputs?.title}
            placeholder="e.g., Mid-Term Examination"
            error={state.errors?.title}
            className="bg-gray-50/30 font-medium"
            required
          />

          <FormSelect
            name="subjectId"
            label="Subject"
            defaultValue={state.inputs?.subjectId}
            options={subjects.map((s) => ({ value: s.id, label: s.name }))}
            placeholder="Select a subject"
            error={state.errors?.subjectId}
            required
          />

          <FormSelect
            name="type"
            label="Assessment Type"
            defaultValue={state.inputs?.type ?? "ASSIGNMENT"}
            options={typeOptions}
            placeholder="Select type"
            error={state.errors?.type}
            required
          />

          <FormInput
            id="totalMarks"
            name="totalMarks"
            type="number"
            label="Total Marks"
            icon={Hash}
            defaultValue={state.inputs?.totalMarks}
            placeholder="e.g., 50"
            error={state.errors?.totalMarks}
            className="bg-gray-50/30 font-medium"
            required
          />

          <FormDatePicker
            id="deadline"
            name="deadline"
            label="Deadline"
            value={deadlineDate}
            onChange={setDeadlineDate}
            placeholder="Select deadline date"
            error={state.errors?.deadline || state.errors?.date}
            required
          />

          <div className="md:col-span-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="files" className="text-sm font-semibold text-gray-700">
                Attachment (Optional)
              </Label>
              <input
                ref={fileInputRef}
                id="files"
                name="files"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.webp,.zip,.rar"
                onChange={handleFileChange}
                className="hidden"
              />
              <div
                className={`rounded-lg border-2 border-dashed p-6 transition-all cursor-pointer ${
                  isDraggingFiles
                    ? "border-primary bg-primary/5"
                    : "border-gray-300 bg-gray-50/30 hover:border-gray-400"
                }`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200">
                    <Upload className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700">
                    Drag & drop files here, or click to upload
                  </p>
                  <p className="text-xs text-gray-500">
                    Multiple attachments supported
                  </p>
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-2 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={`${file.name}-${file.size}-${file.lastModified}`}
                      className="flex items-center justify-between gap-3 rounded-md border border-gray-200 bg-white px-3 py-2"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                          <Paperclip className="w-4 h-4 text-gray-500" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => viewFile(file)}
                          className="px-2 py-1 rounded text-xs font-semibold text-primary hover:bg-primary/10"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="w-7 h-7 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 flex items-center justify-center"
                          aria-label={`Remove ${file.name}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {state.errors?.files && (
                <p className="text-xs font-medium text-red-500 mt-1">
                  {Array.isArray(state.errors.files)
                    ? state.errors.files[0]
                    : state.errors.files}
                </p>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <FormTextarea
              id="description"
              name="description"
              label="Description (Optional)"
              defaultValue={state.inputs?.description}
              placeholder="Add any additional instructions or details..."
              rows={4}
              error={state.errors?.description}
              className="bg-gray-50/30 resize-none font-medium"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4 justify-end">
          <Button asChild type="button" variant="outline" className="h-12">
            <Link href="/dashboard/cr/assessments">
              Cancel
            </Link>
          </Button>
          <Button type="submit" className="h-12" disabled={isPending}>
            {isPending ? "Creating..." : "Create Assessment"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAssessmentForm;
