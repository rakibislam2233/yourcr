import Image from "next/image";
import { Button } from "@/components/ui/button";
const AboutHero = () => {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-left space-y-8">
            <h1 className="text-5xl md:text-6xl font-semibold leading-tight tracking-tight text-secondary">
              Bridging the Gap Between{" "}
              <span className="text-primary">Students</span> and Faculty
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Your CR is the ultimate digital bridge, empowering Class
              Representatives with centralized tools to streamline communication
              and academic leadership.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="px-8 py-4 h-12 cursor-pointer">
                Get Started Now
              </Button>
              <Button
                variant="outline"
                className="px-8 py-4 h-12 cursor-pointer"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex-1 w-full max-w-2xl">
            <div className="relative p-1 border border-primary/10 rounded-lg bg-white">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Students collaborating"
                width={800}
                height={600}
                className="rounded-lg object-cover w-full aspect-4/3"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
