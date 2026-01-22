import { Button } from "@/components/ui/button";
import React from "react";

const CTA: React.FC = () => {
  return (
    <section className="py-32 bg-gray-50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl sm:text-5xl   dark:text-white mb-8 tracking-tight">
          Ready to lead your class better?
        </h2>
        <p className="text-xl text-text-muted dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join thousands of student leaders across Bangladesh who are saving
          time and staying organized with Your CR.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Button className="px-5 h-12 cursor-pointer text-base">
            Join Your CR Today
          </Button>
          <Button
            variant="outline"
            className="px-5 h-12 cursor-pointer text-base"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
