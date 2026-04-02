import VerifyOtpForm from "@/pages/Auth/VerifyOtpForm";

const VerifyOtpPage = () => {
  return (
    <section className="w-full bg-white flex justify-center items-center min-h-screen px-6 py-12 lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-lg border border-gray-200 rounded-lg p-6">
        {/* Text Content */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
            Verify Your Account
          </h1>
          <p className="text-base text-gray-600">
            We&apos;ve sent a 6-digit verification code to your email. Please
            enter it below to continue.
          </p>
        </div>
        {/* Form */}
        <VerifyOtpForm />
      </div>
    </section>
  );
};

export default VerifyOtpPage;
