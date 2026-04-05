import React from "react";

const CrRegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full flex flex-col justify-center items-center mt-20 py-10 md:py-20">
      {/* Left Side: Form Content */}
      <div className="w-full flex-1 flex flex-col justify-center items-center px-6 md:px-10 lg:px-20 xl:px-24 pt-4">
        <div className="w-full max-w-xl border border-gray-200 rounded-xl p-8 md:p-10  bg-white">
          {children}
        </div>
      </div>
    </section>
  );
};

export default CrRegisterLayout;
