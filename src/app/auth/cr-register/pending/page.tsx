import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import Link from "next/link";

const PendingApprovalPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center justify-center text-center space-y-6 py-10">
        <div className="h-20 w-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center animate-pulse">
          <Clock className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Registration Pending
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Your CR registration has been submitted successfully! Our admin team
            is currently reviewing your documentation. You will receive an email
            once your account is approved.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-4 rounded-md text-blue-800 text-sm max-w-md">
          Typically, approval takes 24-48 hours. Thank you for your patience.
        </div>

        <Button asChild className="h-12 px-8 font-bold">
          <Link href="/auth/login">Back to Login</Link>
        </Button>
      </div>
    </div>
  );
};

export default PendingApprovalPage;
