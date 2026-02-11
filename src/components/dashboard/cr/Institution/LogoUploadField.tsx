"use client";
import { Trash2, UploadCloud } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
interface LogoUploadFieldProps {
  defaultLogo?: string;
}
export default function LogoUploadField({ defaultLogo }: LogoUploadFieldProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(
    defaultLogo || null,
  );

  useEffect(() => {
    if (defaultLogo) {
      setLogoPreview(defaultLogo);
    }
  }, [defaultLogo]);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
      toast.success("Logo uploaded successfully");
    };
    reader.readAsDataURL(file);
  }, []);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const fileInput = document.querySelector(
        'input[name="logo"]',
      ) as HTMLInputElement;
      if (fileInput) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;
        handleFile(file);
      }
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLogoPreview(null);
    const fileInput = document.querySelector(
      'input[name="logo"]',
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
    toast.success("Logo removed successfully");
  };

  return (
    <div
      className={`relative h-48 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden ${
        isDragging
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-gray-200 bg-gray-50 hover:bg-gray-100/50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        name="logo"
        className="absolute inset-0 opacity-0 cursor-pointer z-10"
        onChange={handleLogoChange}
        accept="image/*"
      />
      {logoPreview ? (
        <div className="relative size-full group">
          <Image
            src={logoPreview}
            alt="Logo Preview"
            fill
            className="object-contain p-4"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  document
                    .querySelector<HTMLInputElement>('input[name="logo"]')
                    ?.click();
                }}
                className="px-4 py-2 bg-white text-gray-900 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <UploadCloud className="w-4 h-4" />
                Change Logo
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
            <p className="text-white text-xs">
              Click to change or drag & drop new image
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="p-4 bg-white rounded-full shadow-sm">
            <UploadCloud className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center px-4">
            <p className="text-base font-bold text-gray-900">
              Drag & Drop or Click to Upload
            </p>
            <p className="text-xs text-gray-500 mt-1">
              SVG, PNG, JPG or GIF (max. 2MB)
            </p>
          </div>
        </>
      )}
    </div>
  );
}
