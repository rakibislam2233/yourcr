"use client";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { completeCrRegistration } from "@/services/auth.service";
import {
  academicStepSchema,
  institutionStepSchema,
} from "@/validation/auth.validation";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
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

export default function CompleteProfileForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "";
  const formRef = useRef<HTMLFormElement>(null);

  const [step, setStep] = useState(1);
  const [institutionType, setInstitutionType] = useState<string>("");
  const [idCardPreview, setIdCardPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPendingTransitions, startTransition] = useTransition();

  const [localErrors, setLocalErrors] = useState<Record<string, string[]>>({});

  const [state, formAction, isPendingAction] = useActionState(
    completeCrRegistration,
    initialState,
  );

  const isPending = isPendingAction || isPendingTransitions;

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setIsSuccessModalOpen(true);
    } else if (state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state]);

  const validateLocalStep = (data: Record<string, unknown>) => {
    let result;
    if (step === 1) {
      result = institutionStepSchema.safeParse(data);
    } else if (step === 2) {
      result = academicStepSchema.safeParse(data);
    } else {
      return true;
    }

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

  return (
    <div className="w-full space-y-8">
      <StepIndicator currentStep={step + 2} />
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => router.push("/auth/login")}
        title="Registration Submitted"
      >
        <div className="flex flex-col items-center text-center py-2">
          <div className="size-16 bg-green-50 text-green-600 rounded-md flex items-center justify-center mb-6 border border-green-100">
            <ShieldCheck className="size-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Registration Successful
          </h3>

          <p className="text-gray-500 text-sm leading-relaxed mb-8 px-2 font-medium">
            Your profile details have been submitted for review. Our
            administrators will verify your information shortly. We will notify
            you via email as soon as your account is approved.
          </p>

          <div className="w-full pt-2">
            <Button
              onClick={() => router.push("/auth/login")}
              className="w-full h-12 bg-primary cursor-pointer text-white font-semibold rounded-md transition-all active:scale-[0.98]"
            >
              Back to Login
            </Button>
          </div>
        </div>
      </Modal>

      <form ref={formRef}>
        <div className={step !== 1 ? "hidden" : ""}>
          <InstitutionStep
            state={{ ...state, errors: { ...state.errors, ...localErrors } }}
            setInstitutionType={setInstitutionType}
          />
        </div>
        <div className={step !== 2 ? "hidden" : ""}>
          <AcademicStep
            state={{ ...state, errors: { ...state.errors, ...localErrors } }}
            institutionType={institutionType}
          />
        </div>
        <div className={step !== 3 ? "hidden" : ""}>
          <DocumentationStep
            idCardPreview={idCardPreview}
            setIdCardPreview={setIdCardPreview}
            setSelectedFile={setSelectedFile}
          />
        </div>
      </form>

      <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
        {step > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep(step - 1)}
            className="h-11 px-6 font-bold border-gray-200 text-gray-600 hover:bg-gray-50 rounded-md shadow-sm transition-all active:scale-[0.98]"
            disabled={isPending}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
        )}
        <Button
          type="button"
          onClick={handleContinue}
          className="flex-1 h-11 text-base font-bold bg-primary hover:bg-blue-700 text-white rounded-md shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          disabled={isPending}
        >
          {step === 3 ? (
            isPending ? (
              "Submitting Info..."
            ) : (
              "Complete Registration"
            )
          ) : (
            <>
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
