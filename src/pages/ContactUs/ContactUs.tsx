"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mail, MapPin, Phone } from "lucide-react";

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
    <section className="w-full pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16">
      <h1 className="text-3xl font-semibold text-center mb-8">Contact Us</h1>

      {/* Main Form Section */}
      <div className="container mx-auto px-4 sm:px-6  pb-16">
        <div className="bg-white rounded-2xl  border border-gray-100/80 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: Illustration Area (woman with laptop) */}
            <div className="hidden md:flex items-center justify-center bg-blue-50/40 p-8 relative">
              <div className="text-center">
                {/* You can replace this with a real illustration / SVG / image */}
                <div className="text-9xl mb-6 opacity-90">💻👩‍💼</div>
                <p className="text-gray-600 text-lg font-medium">
                  We're here to help!
                </p>
              </div>
            </div>

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
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium mt-2"
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Contact Info Chips */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 md:gap-8">
          <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-sm border border-gray-100">
            <Mail className="h-5 w-5 text-blue-600" />
            <span className="text-gray-700 font-medium">support@ourcr.com</span>
          </div>

          <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-sm border border-gray-100">
            <MapPin className="h-5 w-5 text-green-600" />
            <span className="text-gray-700 font-medium">Dhaka, Bangladesh</span>
          </div>

          <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-sm border border-gray-100">
            <Phone className="h-5 w-5 text-purple-600" />
            <span className="text-gray-700 font-medium">+880 1X XXX XXXX</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
