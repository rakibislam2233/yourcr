"use client";
import {
  ArrowLeft,
  ArrowRight,
  Badge,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Group,
  IdCard,
  Lock,
  Mail,
  MapPin,
  Phone,
  School,
  Tag,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { MdCalendarMonth, MdCategory } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// --- Validation Schema ---
const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  institutionName: z.string().min(2, "Institution name is required"),
  institutionType: z.string().min(1, "Institution type is required"),
  department: z.string().min(2, "Department is required"),
  district: z.string().min(2, "District is required"),
  batchSession: z.string().min(4, "Batch/Session is required"),
  section: z.string().min(1, "Section is required"),
  classRoll: z.string().min(1, "Class roll is required"),
  crPosition: z.string().min(1, "CR position is required"),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

// --- Types & Constants ---
enum RegistrationStep {
  PERSONAL_INFO = 1,
  INSTITUTION_INFO = 2,
  CR_DETAILS = 3,
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
    title: "Personal Info",
    description: "Your basic details",
    icon: <User className="w-4 h-4" />,
  },
  {
    id: RegistrationStep.INSTITUTION_INFO,
    title: "Institution Info",
    description: "School & Department",
    icon: <School className="w-4 h-4" />,
  },
  {
    id: RegistrationStep.CR_DETAILS,
    title: "CR Details",
    description: "Class specific info",
    icon: <Badge className="w-4 h-4" />,
  },
];

// --- Layout Component ---
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f6f8]">
    <main className="flex grow flex-col items-center justify-start py-10 px-4 sm:px-6 mt-16">
      <div className="flex w-full container mx-auto flex-col gap-8">
        {children}
        <footer className="mt-8 text-center text-sm text-[#536793] py-4 border-t border-transparent">
          <p>© 2026 Your CR. Built for students in Bangladesh.</p>
        </footer>
      </div>
    </main>
  </div>
);

// --- Stepper Component ---
const Stepper: React.FC<{ currentStep: RegistrationStep }> = ({
  currentStep,
}) => {
  const progress = Math.round((currentStep / STEPS.length) * 100);

  return (
    <div className="lg:sticky lg:top-24 lg:w-64 flex-none">
      <div className="rounded-2xl border border-[#e8ebf2] bg-white p-6">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#536793]">
          Registration Steps
        </h3>
        <nav className="flex flex-col gap-6">
          {STEPS.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            const isLast = index === STEPS.length - 1;

            return (
              <div
                key={step.id}
                className={`relative flex items-start gap-3 ${
                  !isActive && !isCompleted ? "opacity-60" : ""
                }`}
              >
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm ring-1 transition-all ${
                    isActive
                      ? "bg-[#2458c6] text-white ring-[#2458c6]/20 ring-4"
                      : isCompleted
                        ? "bg-green-500 text-white ring-green-100"
                        : "bg-gray-100 text-[#536793] ring-[#e8ebf2]"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    step.icon
                  )}
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-sm font-bold ${
                      isActive ? "text-[#2458c6]" : "text-[#0f121a]"
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="text-xs text-[#536793]">
                    {step.description}
                  </span>
                </div>
                {!isLast && (
                  <div
                    className={`absolute left-3 top-8 h-8 w-px ${
                      isCompleted ? "bg-green-500" : "bg-[#e8ebf2]"
                    }`}
                  ></div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="mt-6 rounded-2xl bg-[#2458c6]/5 p-4 border border-[#2458c6]/10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-[#2458c6]">
            Completion
          </span>
          <span className="text-xs font-bold text-[#2458c6]">{progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-[#2458c6]/10 overflow-hidden">
          <div
            className="h-2 rounded-full bg-[#2458c6] transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// --- Main CrRegister Component ---
const CrRegister: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>(
    RegistrationStep.PERSONAL_INFO,
  );
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<RegistrationFormData>({
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

  const handleContinue = async () => {
    // Validate current step fields before proceeding
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
    } else if (currentStep === RegistrationStep.CR_DETAILS) {
      isValid = await trigger([
        "batchSession",
        "section",
        "classRoll",
        "crPosition",
      ]);
    }

    if (isValid && currentStep < RegistrationStep.CR_DETAILS) {
      setCurrentStep((prev) => (prev + 1) as RegistrationStep);
    } else if (isValid && currentStep === RegistrationStep.CR_DETAILS) {
      // Final submission
      handleSubmit(onSubmit)();
    }
  };

  const handleBack = () => {
    if (currentStep > RegistrationStep.PERSONAL_INFO) {
      setCurrentStep((prev) => (prev - 1) as RegistrationStep);
    }
  };

  const onSubmit = (data: RegistrationFormData) => {
    alert("Registration Successful!");
    console.log("Submitted Data:", data);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center gap-2 text-center mb-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#0f121a] sm:text-4xl">
          Create your CR Account
        </h1>
        <p className="text-base text-[#536793]">
          Join thousands of Class Representatives managing their classrooms
          efficiently.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <Stepper currentStep={currentStep} />

        <div className="flex-1 rounded-2xl border border-[#e8ebf2] bg-white  overflow-hidden min-h-[500px]">
          <div className="p-6 sm:p-8">
            {/* Step 1: Personal Info */}
            <div
              className={`transition-all duration-300 ${
                currentStep !== RegistrationStep.PERSONAL_INFO ? "hidden" : ""
              }`}
            >
              <div className="mb-6 flex items-center gap-3 border-b border-[#e8ebf2] pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2458c6]/10 text-[#2458c6]">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0f121a]">
                    Personal Information
                  </h2>
                  <p className="text-sm text-[#536793]">
                    Please provide your legal name and contact details.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <div className="relative">
                    <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#536793] opacity-50 pointer-events-none" />
                    <Input
                      {...register("fullName")}
                      placeholder="e.g. Rahim Ahmed"
                      className={`pl-10 h-12 bg-[#f6f6f8] ${
                        errors.fullName ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#536793] opacity-50 pointer-events-none" />
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="rahim@example.com"
                      className={`pl-10 h-12 bg-[#f6f6f8] ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <div className="relative flex">
                    <div className="flex items-center rounded-l-lg border border-r-0 border-[#d1d8e5] bg-gray-50 px-3 text-sm text-[#536793] h-12">
                      <span className="mr-1">🇧🇩</span> +880
                    </div>
                    <Phone className="absolute left-20 top-1/2 -translate-y-1/2 w-5 h-5 text-[#536793] opacity-50 pointer-events-none z-10" />
                    <Input
                      {...register("phone")}
                      type="tel"
                      placeholder="1XXX-XXXXXX"
                      className={`rounded-l-none pl-16 h-12 bg-[#f6f6f8] ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#536793] opacity-50 pointer-events-none" />
                    <Input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className={`pl-10 pr-12 h-12 bg-[#f6f6f8] ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#536793] hover:text-[#0f121a]"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Institution Info */}
            <div
              className={`transition-all duration-300 ${
                currentStep !== RegistrationStep.INSTITUTION_INFO
                  ? "hidden"
                  : ""
              }`}
            >
              <div className="mb-6 flex items-center gap-3 border-b border-[#e8ebf2] pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2458c6]/10 text-[#2458c6]">
                  <School className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0f121a]">
                    Institution Information
                  </h2>
                  <p className="text-sm text-[#536793]">
                    Details about your school, college, or university.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Institution Name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#536793] opacity-50 pointer-events-none" />
                    <Input
                      {...register("institutionName")}
                      placeholder="e.g. Dhaka University"
                      className={`pl-10 h-12 bg-[#f6f6f8] ${
                        errors.institutionName ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.institutionName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.institutionName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Institution Type</Label>
                  <Select
                    value={watch("institutionType")}
                    onValueChange={(value) =>
                      setValue("institutionType", value)
                    }
                  >
                    <SelectTrigger
                      className={`w-full h-12 bg-[#f6f6f8] border-[#d1d8e5] focus:border-[#2458c6] focus:ring-1 focus:ring-[#2458c6] ${
                        errors.institutionType ? "border-red-500" : ""
                      }`}
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.institutionType.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Department</Label>
                  <div className="relative">
                    <MdCategory className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#536793] opacity-50 pointer-events-none" />
                    <Input
                      {...register("department")}
                      placeholder="e.g. CSE, EEE, BBA"
                      className={`pl-10 h-12 bg-[#f6f6f8] ${
                        errors.department ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.department && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.department.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>District</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#536793] opacity-50 pointer-events-none" />
                    <Input
                      {...register("district")}
                      placeholder="e.g. Dhaka"
                      className={`pl-10 h-12 bg-[#f6f6f8] ${
                        errors.district ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.district && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.district.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Step 3: CR Details */}
            <div
              className={`transition-all duration-300 ${
                currentStep !== RegistrationStep.CR_DETAILS ? "hidden" : ""
              }`}
            >
              <div className="mb-6 flex items-center gap-3 border-b border-[#e8ebf2] pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2458c6]/10 text-[#2458c6]">
                  <Badge className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0f121a]">
                    CR Information
                  </h2>
                  <p className="text-sm text-[#536793]">
                    Verification details for your role.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Batch/Session</Label>
                  <div className="relative">
                    <MdCalendarMonth className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#536793] opacity-50 pointer-events-none" />
                    <Input
                      {...register("batchSession")}
                      placeholder="e.g. 2023-24"
                      className={`pl-10 h-12 bg-[#f6f6f8] ${
                        errors.batchSession ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.batchSession && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.batchSession.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Section</Label>
                  <div className="relative">
                    <Group className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#536793] opacity-50 pointer-events-none" />
                    <Input
                      {...register("section")}
                      placeholder="e.g. A"
                      className={`pl-10 h-12 bg-[#f6f6f8] ${
                        errors.section ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.section && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.section.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Class Roll</Label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#536793] opacity-50 pointer-events-none" />
                    <Input
                      {...register("classRoll")}
                      placeholder="e.g. 01"
                      className={`pl-10 h-12 bg-[#f6f6f8] ${
                        errors.classRoll ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.classRoll && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.classRoll.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>CR Position</Label>
                  <Select
                    value={watch("crPosition")}
                    onValueChange={(value) => setValue("crPosition", value)}
                  >
                    <SelectTrigger
                      className={`h-12 bg-[#f6f6f8] border-[#d1d8e5] focus:border-[#2458c6] focus:ring-1 focus:ring-[#2458c6] ${
                        errors.crPosition ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Main CR</SelectItem>
                      <SelectItem value="assistant">Assistant CR</SelectItem>
                      <SelectItem value="coordinator">
                        Class Coordinator
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.crPosition && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.crPosition.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#e8ebf2] pt-6 sm:flex-row">
              <button
                onClick={handleBack}
                disabled={currentStep === RegistrationStep.PERSONAL_INFO}
                className={`group flex items-center gap-2 text-sm font-medium transition-colors ${
                  currentStep === RegistrationStep.PERSONAL_INFO
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-[#536793] hover:text-[#0f121a]"
                }`}
                type="button"
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                Previous Step
              </button>

              <button
                onClick={handleContinue}
                className="flex h-12 w-full min-w-[200px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#2458c6] px-8 text-base font-bold text-white shadow-lg shadow-[#2458c6]/20 transition-all hover:bg-blue-700 hover:shadow-[#2458c6]/30 sm:w-auto"
                type="button"
              >
                {currentStep === RegistrationStep.CR_DETAILS
                  ? "Finish Registration"
                  : "Continue"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CrRegister;
