import Navbar from "@/components/common/Navbar";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
