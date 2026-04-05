import CrRegisterForm from "@/pages/Auth/CrRegisterForm";

const CrRegisterPage = () => {
  return (
    <section>
      <div className="w-full mb-8 text-center px-4">
        <h1 className="mb-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
          Create CR Account
        </h1>
        <p className="text-sm sm:text-base text-gray-500 font-medium">
          Step 1: Setup your personal and security information.
        </p>
      </div>
      <CrRegisterForm />
    </section>
  );
};

export default CrRegisterPage;
