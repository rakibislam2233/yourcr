import React from "react";

const CrRegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-[480px]">
        <div className="bg-white border border-gray-100/80 rounded-2xl shadow-2xl shadow-blue-900/[0.06] p-6 sm:p-8">
          {children}
        </div>
      </div>
    </section>
  );
};

export default CrRegisterLayout;
