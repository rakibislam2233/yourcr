"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactUs = () => {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[60vh] md:h-[70vh] bg-gradient-to-t from-primary/10 via-secondary/5 to-primary/20 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-medium">
              Have questions? We&apos;re here to help. Reach out and let’s make
              classroom management easier together.
            </p>
          </motion.div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 200" className="w-full">
            <path
              fill="#ffffff"
              d="M0,100 C320,200 1120,0 1440,100 L1440,200 L0,200 Z"
            ></path>
          </svg>
        </div>
      </section>
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <h2 className="text-4xl font-bold text-gray-900">Get in Touch</h2>
            <p className="text-lg text-gray-600">
              Whether you’re a CR needing support or a student with feedback —
              we’d love to hear from you!
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center ">
                  <Mail className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Email Us
                  </h3>
                  <p className="text-gray-600">support@ourcr.in</p>
                  <p className="text-gray-600">partnership@ourcr.in</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center ">
                  <Phone className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Call Us
                  </h3>
                  <p className="text-gray-600">
                    +91 98765 43210 (10 AM - 6 PM IST)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center ">
                  <MapPin className="w-7 h-7 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Office
                  </h3>
                  <p className="text-gray-600">Kolkata, West Bengal, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-10"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Send us a Message
            </h2>
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-6 py-4 "
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-6 py-4 "
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-6 py-4 "
              />
              <textarea
                rows={6}
                placeholder="Your Message"
                className="w-full px-6 py-4  resize-none"
              />
              <Button type="submit" className="w-full h-12 ">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
