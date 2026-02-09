"use client";

import { Label } from "@/components/ui/label";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface DocumentationStepProps {
  idCardPreview: string | null;
  setIdCardPreview: (preview: string | null) => void;
  setSelectedFile: (file: File | null) => void;
}

const DocumentationStep: React.FC<DocumentationStepProps> = ({
  idCardPreview,
  setIdCardPreview,
  setSelectedFile,
}) => {
  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdCardPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
      <div className="space-y-4">
        <Label>Student ID Card (Front Image)</Label>
        {!idCardPreview ? (
          <div
            onDragOver={onDragOver}
            onDrop={onDrop}
            className="relative group border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 transition-all hover:border-primary hover:bg-primary/5 cursor-pointer"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <div className="size-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <UploadCloud className="size-8" />
            </div>
            <div className="text-center">
              <p className="text-base font-semibold text-gray-900">
                Click or drag & drop to upload
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG or JPEG (Max. 5MB)
              </p>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
            />
          </div>
        ) : (
          <div className="relative rounded-2xl border border-gray-200 overflow-hidden bg-gray-50 aspect-video flex items-center justify-center">
            <Image
              src={idCardPreview}
              alt="ID Card Preview"
              fill
              className="object-contain p-2"
            />
            <button
              type="button"
              onClick={() => {
                setIdCardPreview(null);
                setSelectedFile(null);
              }}
              className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-50 transition-colors shadow-sm"
            >
              <X className="size-5" />
            </button>
          </div>
        )}
        <p className="text-[10px] text-gray-500 italic">
          * This document is only used for verification purposes and will not be
          shared publically.
        </p>
      </div>
    </div>
  );
};

export default DocumentationStep;
