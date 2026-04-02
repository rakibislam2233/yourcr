
import React from "react";

const CrRegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full flex min-h-screen flex-col lg:flex-row ">
      {/* Left Side: Form Content */}
      <div className="w-full flex flex-1 flex-col justify-center px-6 py-12 lg:px-20 xl:px-24 pb-56">
        <div className="mx-auto w-full max-w-xl border border-gray-200 rounded-lg p-6 ">
          {children}
        </div>
      </div>
    </section>
  );
};

export default CrRegisterLayout;
