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
import { registrationSchema, RegistrationValues } from "@/lib/auth-schemas";
import { registerCr } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  Badge,
  CheckCircle2,
  Eye,
  EyeOff,
  FileText,
  Lock,
  Mail,
  Phone,
  School,
  UploadCloud,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {
  useActionState,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// --- Types & Constants ---
enum RegistrationStep {
  PERSONAL_INFO = 1,
  INSTITUTION_INFO = 2,
  BATCH_INFO = 3,
  DOCUMENT_PROOF = 4,
}

interface StepInfo {
  id: RegistrationStep;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const STEPS: StepInfo[] = [
  {
    id: RegistrationStep.PERSONAL_INFO,
    title: "Personal",
    description: "Information",
    icon: <User className="w-4 h-4" />,
  },
  {
    id: RegistrationStep.INSTITUTION_INFO,
    title: "Institution",
    description: "Information",
    icon: <School className="w-4 h-4" />,
  },
  {
    id: RegistrationStep.BATCH_INFO,
    title: "Academic",
    description: "Information",
    icon: <Badge className="w-4 h-4" />,
  },
  {
    id: RegistrationStep.DOCUMENT_PROOF,
    title: "Document",
    description: "Proof",
    icon: <FileText className="w-4 h-4" />,
  },
];

const initialState = {
  success: false,
  message: "",
  inputs: {},
};

const CrRegisterForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<RegistrationStep>(
    RegistrationStep.PERSONAL_INFO,
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isPendingTransitions, startTransition] = useTransition();
  const [idCardPreview, setIdCardPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [state, formAction, isPendingAction] = useActionState(
    registerCr,
    initialState,
  );

  const isPending = isPendingAction || isPendingTransitions;

  const {
    register,
    formState: { errors },
    setValue,
    watch,
    trigger,
    getValues,
  } = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      institutionName: "",
      institutionType: "",
      department: "",
      district: "",
      batchSession: "",
      section: "",
      classRoll: "",
      crPosition: "",
    },
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/auth/login");
    } else if (state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state, router]);

  const handleContinue = async () => {
    let isValid = false;

    if (currentStep === RegistrationStep.PERSONAL_INFO) {
      isValid = await trigger(["fullName", "email", "phone", "password"]);
    } else if (currentStep === RegistrationStep.INSTITUTION_INFO) {
      isValid = await trigger([
        "institutionName",
        "institutionType",
        "department",
        "district",
      ]);
    } else if (currentStep === RegistrationStep.BATCH_INFO) {
      isValid = await trigger([
        "batchSession",
        "section",
        "classRoll",
        "crPosition",
      ]);
    } else if (currentStep === RegistrationStep.DOCUMENT_PROOF) {
      if (!selectedFile) {
        toast.error("Please upload your student ID card image");
        return;
      }
      isValid = true;
    }

    if (isValid) {
      if (currentStep < RegistrationStep.DOCUMENT_PROOF) {
        setCurrentStep((prev) => (prev + 1) as RegistrationStep);
      } else {
        const data = getValues();
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value as string);
          }
        });

        if (selectedFile) {
          formData.append("studentIdCard", selectedFile);
        }

        startTransition(() => {
          formAction(formData);
        });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > RegistrationStep.PERSONAL_INFO) {
      setCurrentStep((prev) => (prev - 1) as RegistrationStep);
    }
  };

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
    <div className="w-full space-y-8">
      {/* Stepper Header */}
      <div className="relative mb-12">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
        <div className="relative z-10 flex justify-between">
          {STEPS.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            return (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div
                  className={`size-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isActive
                      ? "bg-primary border-primary text-white scale-110 "
                      : isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : "bg-white border-gray-200 text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="size-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <span
                  className={`text-[10px] sm:text-xs font-bold ${isActive ? "text-primary" : "text-gray-400"}`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        {/* Step 1: Personal info */}
        {currentStep === RegistrationStep.PERSONAL_INFO && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <Label>Full Name</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    {...register("fullName")}
                    placeholder="e.g. Rahim Ahmed"
                    className={`pl-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
                      errors.fullName ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-sm text-red-500">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="rahim@example.com"
                    className={`pl-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
                      errors.email || state.errors?.email
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </div>
                {(errors.email || state.errors?.email) && (
                  <p className="text-sm text-red-500">
                    {errors.email?.message || state.errors?.email?.[0]}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    {...register("phone")}
                    placeholder="01XXXXXXXXX"
                    className={`pl-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className={`pl-12 pr-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Institution info */}
        {currentStep === RegistrationStep.INSTITUTION_INFO && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <Label>Institution Name</Label>
                <div className="relative">
                  <School className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    {...register("institutionName")}
                    placeholder="e.g. Dhaka University"
                    className={`pl-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
                      errors.institutionName ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.institutionName && (
                  <p className="text-sm text-red-500">
                    {errors.institutionName.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Institution Type</Label>
                <Select
                  value={watch("institutionType")}
                  onValueChange={(val) => setValue("institutionType", val)}
                >
                  <SelectTrigger
                    className={`h-12 border-gray-300 ${errors.institutionType ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="university">University</SelectItem>
                    <SelectItem value="college">College</SelectItem>
                    <SelectItem value="school">School</SelectItem>
                    <SelectItem value="madrasa">Madrasa</SelectItem>
                  </SelectContent>
                </Select>
                {errors.institutionType && (
                  <p className="text-sm text-red-500">
                    {errors.institutionType.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label>Department</Label>
                  <Input
                    {...register("department")}
                    placeholder="e.g. CSE"
                    className={`h-12 border-gray-300 ${errors.department ? "border-red-500" : ""}`}
                  />
                  {errors.department && (
                    <p className="text-xs text-red-500">
                      {errors.department.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>District</Label>
                  <Input
                    {...register("district")}
                    placeholder="e.g. Dhaka"
                    className={`h-12 border-gray-300 ${errors.district ? "border-red-500" : ""}`}
                  />
                  {errors.district && (
                    <p className="text-xs text-red-500">
                      {errors.district.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Batch Info */}
        {currentStep === RegistrationStep.BATCH_INFO && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label>Batch/Session</Label>
                  <Input
                    {...register("batchSession")}
                    placeholder="2023-24"
                    className={`h-12 border-gray-300 ${errors.batchSession ? "border-red-500" : ""}`}
                  />
                  {errors.batchSession && (
                    <p className="text-xs text-red-500">
                      {errors.batchSession.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Section</Label>
                  <Input
                    {...register("section")}
                    placeholder="e.g. A"
                    className={`h-12 border-gray-300 ${errors.section ? "border-red-500" : ""}`}
                  />
                  {errors.section && (
                    <p className="text-xs text-red-500">
                      {errors.section.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Class Roll</Label>
                <Input
                  {...register("classRoll")}
                  placeholder="e.g. 01"
                  className={`h-12 border-gray-300 ${errors.classRoll ? "border-red-500" : ""}`}
                />
                {errors.classRoll && (
                  <p className="text-sm text-red-500">
                    {errors.classRoll.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>CR Position</Label>
                <Select
                  value={watch("crPosition")}
                  onValueChange={(val) => setValue("crPosition", val)}
                >
                  <SelectTrigger
                    className={`h-12 border-gray-300 ${errors.crPosition ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main CR</SelectItem>
                    <SelectItem value="assistant">Assistant CR</SelectItem>
                    <SelectItem value="coordinator">Coordinator</SelectItem>
                  </SelectContent>
                </Select>
                {errors.crPosition && (
                  <p className="text-sm text-red-500">
                    {errors.crPosition.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Document Proof */}
        {currentStep === RegistrationStep.DOCUMENT_PROOF && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
            <div className="space-y-4">
              <Label>Student ID Card (Front Image)</Label>
              {!idCardPreview ? (
                <div
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  className="relative group border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 transition-all hover:border-primary hover:bg-primary/5 cursor-pointer"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
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
                * This document is only used for verification purposes and will
                not be shared publically.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 pt-4">
        {currentStep > RegistrationStep.PERSONAL_INFO && (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="h-12 px-6 cursor-pointer border-gray-300"
            disabled={isPending}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}
        <Button
          type="button"
          onClick={handleContinue}
          className="flex-1 h-12 text-base font-bold bg-primary hover:bg-blue-700 cursor-pointer "
          disabled={isPending}
        >
          {currentStep === RegistrationStep.DOCUMENT_PROOF
            ? isPending
              ? "Registering..."
              : "Finish Registration"
            : "Continue"}
          {currentStep !== RegistrationStep.DOCUMENT_PROOF && (
            <ArrowRight className="w-4 h-4 ml-2" />
          )}
        </Button>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-primary hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CrRegisterForm;
