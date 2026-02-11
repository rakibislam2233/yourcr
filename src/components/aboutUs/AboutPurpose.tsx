import React from "react";
import { Eye, Target } from "lucide-react";
const AboutPurpose = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary">
            Our Core Purpose
          </h2>
          <p className="text-lg text-muted-foreground">
            We are driven by a singular commitment: to remove administrative
            hurdles, ensuring that every minute of academic life is spent on
            growth and learning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-10 bg-primary/5 rounded-md border border-primary/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 bg-primary/5 rounded-full -mr-16 -mt-16" />
            <div className="relative z-10 space-y-6">
              <div className="p-4 bg-primary text-white rounded-md w-fit">
                <Target className="size-8" />
              </div>
              <h3 className="text-3xl font-bold text-secondary">Our Mission</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To revolutionize academic coordination by equipping Class
                Representatives with a powerful digital ecosystem that
                transforms chaos into clarity.
              </p>
            </div>
          </div>

          <div className="p-10 bg-secondary/5 rounded-md border border-secondary/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 bg-secondary/5 rounded-full -mr-16 -mt-16" />
            <div className="relative z-10 space-y-6">
              <div className="p-4 bg-secondary text-white rounded-md w-fit">
                <Eye className="size-8" />
              </div>
              <h3 className="text-3xl font-bold text-secondary">Our Vision</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A global academic landscape where communication is seamless,
                deadlines are transparent, and every student has equal access to
                opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPurpose;
