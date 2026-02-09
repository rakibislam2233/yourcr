import contactUsImage from "@/assets/contact/contact-us.png";
import ContactUsForm from "@/pages/ContactUs/ContactUsForm";
import { PhoneCall } from "lucide-react";
import Image from "next/image";
import { MdEmail, MdLocationOn } from "react-icons/md";

const page = () => {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 bg-white">
      <div className="mx-auto max-w-4xl text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Contact <span className="text-primary">Us</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          We&apos;d love to hear from you! Please fill out the form below and we
          will get back to you as soon as possible.
        </p>
      </div>

      {/* Main Form Section */}
      <div className="w-full container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl  border border-gray-100/80 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <Image
              src={contactUsImage}
              alt="Contact Us"
              width={500}
              height={500}
              className="object-cover mx-auto"
            />
            <ContactUsForm />
          </div>
        </div>

        {/* Bottom Contact Info Chips */}
        <div className="mt-16 flex flex-col md:flex-row justify-center gap-4 md:gap-8">
          {/* Contact Chips */}
          <div className="w-full border border-[#DBEAFE] p-5 rounded-lg flex items-center gap-3">
            <div className="size-12 flex justify-center items-center rounded-full bg-[#DBEAFE]">
              <MdEmail className="size-5 text-primary" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-900 mt-2">
                Contact Email
              </h2>
              <p className="text-sm text-gray-600 text-center">
                <a href="mailto:0u9tD@example.com">0u9tD@example.com</a>
              </p>
            </div>
          </div>
          {/* Contact Chips */}
          <div className="w-full border border-[#DBEAFE] p-5 rounded-lg flex items-center gap-3">
            <div className="size-12 flex justify-center items-center rounded-full bg-[#DBEAFE]">
              <MdLocationOn className="size-5 text-primary" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-900 mt-2">
                Location
              </h2>
              <p className="text-sm text-gray-600 text-center">
                Dhaka Bangladesh
              </p>
            </div>
          </div>
          {/* Contact Chips */}
          <div className="w-full border border-[#DBEAFE] p-5 rounded-lg flex items-center gap-3">
            <div className="size-12 flex justify-center items-center rounded-full bg-[#DBEAFE]">
              <PhoneCall className="size-5 text-primary" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-900 mt-2">
                Contact Phone
              </h2>
              <p className="text-sm text-gray-600 text-center">
                +880 1319101179
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
