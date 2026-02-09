"use client";
import { Button } from "@/components/ui/button";
import { completeCrRegistration } from "@/services/auth.service";
import { registrationSchema } from "@/validation/auth.validation";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Suspense,
  useActionState,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";
import StepIndicator from "./StepIndicator";
import AcademicStep from "./steps/AcademicStep";
import DocumentationStep from "./steps/DocumentationStep";
import InstitutionStep from "./steps/InstitutionStep";

interface ActionState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  inputs?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const initialState: ActionState = {
  success: false,
  message: "",
  errors: {},
  inputs: {},
};

const CompleteProfileFormContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "";
  const formRef = useRef<HTMLFormElement>(null);

  const [step, setStep] = useState(1);
  const [idCardPreview, setIdCardPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPendingTransitions, startTransition] = useTransition();

  const [localErrors, setLocalErrors] = useState<Record<string, string[]>>({});

  const [state, formAction, isPendingAction] = useActionState(
    completeCrRegistration,
    initialState,
  );

  const isPending = isPendingAction || isPendingTransitions;

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else if (state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state]);

  const validateLocalStep = (data: Record<string, unknown>) => {
    const fieldsByStep: Record<
      number,
      (keyof typeof registrationSchema.shape)[]
    > = {
      1: ["institutionName", "institutionType", "department", "district"],
      2: ["batchSession", "section", "classRoll", "crPosition"],
    };

    const currentFields = fieldsByStep[step];
    if (!currentFields) return true;

    // Build the mask for picking fields
    const mask = currentFields.reduce((acc, field) => {
      acc[field] = true;
      return acc;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as any);

    const stepSchema = registrationSchema.pick(mask);

    const result = stepSchema.safeParse(data);
    if (!result.success) {
      const formattedErrors: Record<string, string[]> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        if (!formattedErrors[path]) {
          formattedErrors[path] = [];
        }
        formattedErrors[path].push(issue.message);
      });
      setLocalErrors(formattedErrors);
      return false;
    }

    setLocalErrors({});
    return true;
  };

  const handleContinue = async () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    if (step < 3) {
      if (!validateLocalStep(data)) return;
      setStep((prev) => prev + 1);
    } else {
      setLocalErrors({});
      if (!selectedFile) {
        toast.error("Please upload your student ID card");
        return;
      }
      formData.append("email", email);
      formData.append("studentIdCard", selectedFile);
      startTransition(() => formAction(formData));
    }
  };

  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="size-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 animate-bounce">
          <ShieldCheck className="size-12" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">
          Profile Completed!
        </h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8 font-medium">
          Thank you! Our administrators are now reviewing your application. You
          will receive an email once your account is approved.
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
    <div className="space-y-8 font-outfit">
      <StepIndicator currentStep={step + 2} />
      <form ref={formRef}>
        {step === 1 && (
          <InstitutionStep
            state={{ ...state, errors: { ...state.errors, ...localErrors } }}
          />
        )}
        {step === 2 && (
          <AcademicStep
            state={{ ...state, errors: { ...state.errors, ...localErrors } }}
          />
        )}
        {step === 3 && (
          <DocumentationStep
            idCardPreview={idCardPreview}
            setIdCardPreview={setIdCardPreview}
            setSelectedFile={setSelectedFile}
          />
        )}
      </form>

      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        {step > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep(step - 1)}
            className="h-12 px-6 font-bold"
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
          {step === 3
            ? isPending
              ? "Submitting..."
              : "Finish Registration"
            : "Next Step"}
          {step !== 3 && <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
};

export default function CompleteProfileForm() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <CompleteProfileFormContent />
    </Suspense>
  );
}
