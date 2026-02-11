import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="w-full py-16 overflow-hidden">
      <div className="w-full container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-r from-[#2456C4]  to-[#1E293B] rounded-md relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="relative z-10 px-8  py-16  grid md:grid-cols-2 gap-8 items-end">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl  text-white mb-6 leading-tight">
                Make Class Management Smarter with OUR CR
              </h2>
              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                Join hundreds of Class Representatives and students already
                simplifying their daily academic life. From announcements to
                assignments – manage everything in one easy, organized platform.
              </p>
            </div>
            {/* Buttons */}
            <div className="flex flex-col justify-center sm:flex-row gap-4 ">
              <Button
                variant="default"
                className="bg-transparent border border-white/30 text-white hover:bg-transparent  backdrop-blur-sm px-6 h-12 text-base cursor-pointer"
              >
                Login as Student
              </Button>
              <Button className="bg-white text-primary hover:bg-gray-100 px-6 h-12 text-base font-semibold cursor-pointer">
                Join as CR
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
