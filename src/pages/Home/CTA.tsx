import { Button } from "@/components/ui/button";

const CTA: React.FC = () => {
  return (
    <section className="w-full py-24 ">
      {/* Gradient Background */}
      <div className="container mx-auto bg-linear-to-r from-blue-400 via-purple-400 to-purple-500 rounded-3xl  ">
        {/* Decorative Background Shapes */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-8 sm:px-12 lg:px-16 py-16  grid md:grid-cols-2 gap-8 items-end">
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
              variant="outline"
              className="bg-transparent border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-6 h-12 text-base cursor-pointer"
            >
              Login as CR
            </Button>
            <Button className="bg-white text-purple-600 hover:bg-gray-100 px-6 h-12 text-base font-semibold cursor-pointer">
              Join as Student 
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
