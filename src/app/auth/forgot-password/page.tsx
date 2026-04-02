import ForgotPasswordForm from "@/pages/Auth/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <section className="w-full bg-white flex justify-center items-center min-h-screen px-6 py-12 lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-lg border border-gray-200 rounded-lg p-6">
        {/* Text Content */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl sm:text-4xl leading-tight tracking-tight text-gray-900">
            Forgot Password?
          </h1>
          <p className="text-base text-gray-600">
            No worries! Enter your email address and we&apos;ll send you a link
            to reset your password.
          </p>
        </div>

        {/* Form */}
        <ForgotPasswordForm />
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
