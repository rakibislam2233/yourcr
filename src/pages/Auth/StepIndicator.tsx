import {
  Badge,
  CheckCircle2,
  FileText,
  Mail,
  School,
  User,
} from "lucide-react";
import React from "react";

interface StepIndicatorProps {
  currentStep: number; // 1: Personal, 2: Verify, 3: Institution, 4: Academic, 5: Document
}

const STEPS = [
  { id: 1, title: "Account", icon: <User className="w-4 h-4" /> },
  { id: 2, title: "Verify", icon: <Mail className="w-4 h-4" /> },
  { id: 3, title: "Institution", icon: <School className="w-4 h-4" /> },
  { id: 4, title: "Academic", icon: <Badge className="w-4 h-4" /> },
  { id: 5, title: "Document", icon: <FileText className="w-4 h-4" /> },
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="relative mb-12 px-2">
      {/* Background Line */}
      <div className="absolute top-5 left-10 right-10 h-0.5 bg-gray-100 z-0" />

      {/* Progress Line */}
      <div
        className="absolute top-5 left-10 h-0.5 bg-primary z-0 transition-all duration-700 ease-in-out"
        style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
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
                {isCompleted ? <CheckCircle2 className="size-5" /> : step.icon}
              </div>
              <span
                className={`text-[10px] sm:text-xs font-bold transition-colors duration-300 ${
                  isActive
                    ? "text-primary"
                    : isCompleted
                      ? "text-green-600"
                      : "text-gray-400"
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
