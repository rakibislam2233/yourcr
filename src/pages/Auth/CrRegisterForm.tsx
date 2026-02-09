"use client";

import { Button } from "@/components/ui/button";
import { registrationSchema, RegistrationValues } from "@/lib/auth-schemas";
import { registerCr } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  Badge,
  CheckCircle2,
  FileText,
  Mail,
  School,
  ShieldCheck,
  User,
} from "lucide-react";
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

// Import step components
import AcademicStep from "./steps/AcademicStep";
import DocumentationStep from "./steps/DocumentationStep";
import InstitutionStep from "./steps/InstitutionStep";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import VerifyEmailStep from "./steps/VerifyEmailStep";

// --- Types & Constants ---
enum RegistrationStep {
  PERSONAL_INFO = 1,
  VERIFY_EMAIL = 2,
  INSTITUTION_INFO = 3,
  BATCH_INFO = 4,
  DOCUMENT_PROOF = 5,
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
    description: "Account Info",
    icon: <User className="w-4 h-4" />,
  },
  {
    id: RegistrationStep.VERIFY_EMAIL,
    title: "Verify",
    description: "Email Code",
    icon: <Mail className="w-4 h-4" />,
  },
  {
    id: RegistrationStep.INSTITUTION_INFO,
    title: "Institution",
    description: "Identity",
    icon: <School className="w-4 h-4" />,
  },
  {
    id: RegistrationStep.BATCH_INFO,
    title: "Academic",
    description: "Class Info",
    icon: <Badge className="w-4 h-4" />,
  },
  {
    id: RegistrationStep.DOCUMENT_PROOF,
    title: "Document",
    description: "Verification",
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
  const [isPendingTransitions, startTransition] = useTransition();
  const [idCardPreview, setIdCardPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);

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

  const email = watch("email");

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setIsRegistrationComplete(true);
    } else if (state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state]);

  const handleContinue = async () => {
    let isValid = false;

    if (currentStep === RegistrationStep.PERSONAL_INFO) {
      isValid = await trigger(["fullName", "email", "phone", "password"]);
      if (isValid) {
        // Here you would typically trigger OTP send
        toast.success("Verification code sent to your email!");
        setCurrentStep(RegistrationStep.VERIFY_EMAIL);
        return;
      }
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

  const onVerifyOtp = (otp: string) => {
    startTransition(async () => {
      // Mock OTP Verification
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success("Email verified successfully!");
      setCurrentStep(RegistrationStep.INSTITUTION_INFO);
    });
  };

  const handleBack = () => {
    if (currentStep > RegistrationStep.PERSONAL_INFO) {
      // Skip OTP step if going back from Institution
      if (currentStep === RegistrationStep.INSTITUTION_INFO) {
        setCurrentStep(RegistrationStep.PERSONAL_INFO);
      } else {
        setCurrentStep((prev) => (prev - 1) as RegistrationStep);
      }
    }
  };

  if (isRegistrationComplete) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="size-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 animate-bounce">
          <ShieldCheck className="size-12" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">
          Registration Completed!
        </h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8 font-medium">
          Your application has been received. Our team will verify your
          documents. You will be notified via email within 24-48 hours once
          approved.
        </p>
        <Button
          onClick={() => router.push("/auth/login")}
          className="h-12 px-10 bg-primary hover:bg-blue-700 font-bold shadow-lg shadow-primary/20"
        >
          Back to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Stepper Header */}
      <div className="relative mb-12 px-2">
        <div className="absolute top-5 left-10 right-10 h-0.5 bg-gray-100 z-0" />
        <div
          className="absolute top-5 left-10 h-0.5 bg-primary z-0 transition-all duration-700"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 80}%` }}
        />
        <div className="relative z-10 flex justify-between">
          {STEPS.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            return (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div
                  className={`size-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    isActive
                      ? "bg-primary border-primary text-white scale-110 shadow-lg shadow-primary/30"
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
                  className={`text-[10px] sm:text-xs font-bold transition-colors ${isActive ? "text-primary" : "text-gray-400"}`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="min-h-[400px]">
        {currentStep === RegistrationStep.PERSONAL_INFO && (
          <PersonalInfoStep
            register={register}
            errors={errors}
            stateErrors={state.errors}
          />
        )}

        {currentStep === RegistrationStep.VERIFY_EMAIL && (
          <VerifyEmailStep
            email={email}
            onVerify={onVerifyOtp}
            onResend={() => toast.success("OTP resent successfully!")}
            isPending={isPending}
          />
        )}

        {currentStep === RegistrationStep.INSTITUTION_INFO && (
          <InstitutionStep
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        )}

        {currentStep === RegistrationStep.BATCH_INFO && (
          <AcademicStep
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        )}

        {currentStep === RegistrationStep.DOCUMENT_PROOF && (
          <DocumentationStep
            idCardPreview={idCardPreview}
            setIdCardPreview={setIdCardPreview}
            setSelectedFile={setSelectedFile}
          />
        )}
      </div>

      {/* Navigation */}
      {currentStep !== RegistrationStep.VERIFY_EMAIL && (
        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
          {currentStep > RegistrationStep.PERSONAL_INFO && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="h-12 px-6 border-gray-300 font-bold hover:bg-gray-50"
              disabled={isPending}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <Button
            type="button"
            onClick={handleContinue}
            className="flex-1 h-12 text-base font-bold bg-primary hover:bg-blue-700 shadow-lg shadow-primary/20"
            disabled={isPending}
          >
            {currentStep === RegistrationStep.DOCUMENT_PROOF
              ? isPending
                ? "Processing..."
                : "Complete Registration"
              : "Continue"}
            {currentStep !== RegistrationStep.DOCUMENT_PROOF && (
              <ArrowRight className="w-4 h-4 ml-2" />
            )}
          </Button>
        </div>
      )}

      {currentStep === RegistrationStep.PERSONAL_INFO && (
        <div className="text-center">
          <p className="text-sm text-gray-500 font-medium">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-bold text-primary hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default CrRegisterForm;
