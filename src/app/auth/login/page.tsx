import LoginForm from "@/pages/Auth/LoginForm";

const page = () => {
  return (
    <section className="w-full bg-white flex justify-center items-center min-h-screen px-6 py-12 lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-lg border border-gray-200 rounded-lg p-6">
        {/* Text Content */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl sm:text-4xl  leading-tight tracking-tight text-gray-900">
            Login to Your Account
          </h1>
          <p className="text-base text-gray-600">
            Welcome back! Please enter your credentials to access class
            schedules and announcements.
          </p>
        </div>
        {/* Form */}
        <LoginForm />
      </div>
    </section>
  );
};

export default page;
