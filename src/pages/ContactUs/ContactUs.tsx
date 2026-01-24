"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LocateIcon, Mail, MapPin, Phone, PhoneCall } from "lucide-react";
import contactUsImage from "@/assets/contact/contact-us.png";
import Image from "next/image";
import { MdEmail, MdLocationOn } from "react-icons/md";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  description: z.string().min(10, "Please describe your query"),
});

type FormData = z.infer<typeof formSchema>;

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      description: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // You can add email sending logic here (e.g., via API)
  };

  return (
    <section className="w-full pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
      {/* Header - matching your original screenshot style */}
      <div className="mx-auto max-w-4xl text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          We&apos;d love to hear from you! Please fill out the form below and we
          will get back to you as soon as possible.
        </p>
      </div>

      {/* Main Form Section */}
      <div className="w-full container mx-auto   pb-16">
        <div className="bg-white rounded-2xl  border border-gray-100/80 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <Image
              src={contactUsImage}
              alt="Contact Us"
              width={500}
              height={500}
              className="object-cover mx-auto"
            />

            {/* Right: Form */}
            <div className="p-6 md:p-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <Label htmlFor="fullName" className="text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    className="mt-1.5 h-11"
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="mt-1.5 h-11"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+880 1X XXX XXXX"
                    className="mt-1.5 h-11"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description" className="text-gray-700">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us how we can help you..."
                    rows={4}
                    className="mt-1.5 resize-none"
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary cursor-pointer text-white font-medium mt-2"
                >
                  Submit
                </Button>
              </form>
            </div>
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

export default ContactUs;
