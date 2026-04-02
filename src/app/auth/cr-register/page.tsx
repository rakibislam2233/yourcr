import CrRegisterForm from "@/pages/Auth/CrRegisterForm";

const CrRegisterPage = () => {
  return (
    <section>
      <div className="w-full mb-10 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
          Create CR Account
        </h1>
        <p className="text-base text-gray-600">
          Step 1: Setup your personal and security information.
        </p>
      </div>
      <CrRegisterForm />
    </section>
  );
};

export default CrRegisterPage;
