import { Button } from "@/components/ui/button";

const AboutCTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="bg-linear-to-r from-[#2456C4]  to-[#1E293B] p-12 md:p-20 rounded-md text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl ">
              Ready to Lead Your Class Better?
            </h2>
            <p className="text-xl text-primary-foreground/80">
              Join thousands of CRs and students who are already using Your CR
              to simplify their academic lives.
            </p>
            <Button
              variant="ghost"
              className="px-10 py-5 h-12 bg-white text-primary cursor-pointer"
            >
              Join Our Mission
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
