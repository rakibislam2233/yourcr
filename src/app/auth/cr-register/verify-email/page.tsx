import StepIndicator from "@/pages/Auth/StepIndicator";
import VerifyOtpForm from "@/pages/Auth/VerifyOtpForm";

const page = () => {
  return (
    <section className="space-y-6">
      <StepIndicator currentStep={2} />
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
          Verify Email
        </h1>
        <p className="text-base text-gray-600">
          Step 2: Enter the code sent to your email.
        </p>
      </div>
      <VerifyOtpForm />
    </section>
  );
};

export default page;
