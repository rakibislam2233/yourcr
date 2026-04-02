import ResetPasswordForm from "@/pages/Auth/ResetPasswordForm";
import { Suspense } from "react";

const ResetPasswordPage = () => {
  return (
    <section className="w-full bg-white flex justify-center items-center min-h-screen px-6 py-12 lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-lg border border-gray-200 rounded-lg p-6">
        {/* Text Content */}
        <div className="mb-8 text-center lg:text-left">
          <h1 className="mb-2 text-3xl sm:text-4xl leading-tight tracking-tight text-gray-900">
            Reset Your Password
          </h1>
          <p className="text-base text-gray-600">
            Almost there! Please choose a new, strong password for your account.
          </p>
        </div>

        {/* Form */}
        <Suspense fallback={<div className="text-center py-4">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
