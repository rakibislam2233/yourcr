"use client";
import React from "react";
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact form submitted:", data);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-primary/5 via-white to-white overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 sm:mb-6">
              Contact Us
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
              Have questions? We&apos;re here to help. Reach out and let&apos;s make
              classroom management easier together.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Left: Contact Info */}
            <div className="space-y-8 sm:space-y-10">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Let&apos;s Talk
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                  Whether you&apos;re a CR needing support or a student with feedback —
                  we&apos;d love to hear from you!
                </p>
              </div>

              <div className="space-y-5 sm:space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                      Email Us
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">support@yourcr.in</p>
                    <p className="text-sm sm:text-base text-gray-600">partnership@yourcr.in</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                      Call Us
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">+91 98765 43210</p>
                    <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      10 AM - 6 PM IST
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                      Office Address
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Kolkata, West Bengal, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-primary/5 rounded-xl p-4 sm:p-5 border border-primary/10">
                <div className="flex items-center gap-3 mb-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Quick Response</h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 text-sm sm:text-base">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className={`h-11 sm:h-12 text-sm sm:text-base bg-white ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 text-sm sm:text-base">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`h-11 sm:h-12 text-sm sm:text-base bg-white ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-700 text-sm sm:text-base">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="What is this about?"
                    className={`h-11 sm:h-12 text-sm sm:text-base bg-white ${
                      errors.subject ? "border-red-500" : ""
                    }`}
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700 text-sm sm:text-base">
                    Your Message
                  </Label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Type your message here..."
                    className={`w-full px-4 py-3 border border-gray-200 rounded-lg text-sm sm:text-base bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all ${
                      errors.message ? "border-red-500" : ""
                    }`}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full h-12 sm:h-14 text-base sm:text-lg font-medium gap-2">
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
            Can&apos;t find what you&apos;re looking for? Check our FAQ section or reach out directly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 text-left">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">How do I register as a CR?</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Click on &quot;Register as CR&quot; button and fill in your details to get started.
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 text-left">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">How can students join?</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Students are added by their Class Representative. Contact your CR for access.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
