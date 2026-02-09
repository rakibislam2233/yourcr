"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";

interface VerifyEmailStepProps {
  email: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
  isPending: boolean;
}

const VerifyEmailStep: React.FC<VerifyEmailStepProps> = ({
  email,
  onVerify,
  onResend,
  isPending,
}) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = () => {
    if (otp.length === 6) {
      onVerify(otp);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
          <Mail className="size-6" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Verify Your Email</h2>
        <p className="text-sm text-gray-500">
          We&apos;ve sent a 6-digit verification code to <br />
          <span className="font-semibold text-gray-900">{email}</span>
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label className="text-center">Enter Code</Label>
          <Input
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="000000"
            maxLength={6}
            className="h-14 text-center text-2xl tracking-[0.5em] font-bold border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>

        <Button
          onClick={handleVerify}
          disabled={otp.length !== 6 || isPending}
          className="w-full h-12 text-base font-bold bg-primary hover:bg-blue-700"
        >
          {isPending ? "Verifying..." : "Verify OTP"}
        </Button>

        <div className="text-center">
          <button
            type="button"
            disabled={timer > 0 || isPending}
            onClick={() => {
              onResend();
              setTimer(60);
            }}
            className={`text-sm font-semibold transition-colors ${
              timer > 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-primary hover:underline cursor-pointer"
            }`}
          >
            {timer > 0 ? `Resend code in ${timer}s` : "Resend code"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailStep;
