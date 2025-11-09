"use client";
import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Faq = () => {
  const faqs = [
    {
      question: "What is YourCR?",
      answer:
        "YourCR is a comprehensive classroom management platform designed to help Class Representatives manage classroom activities, student interactions, and academic tasks more efficiently.",
    },
    {
      question: "How does the system work?",
      answer:
        "OurCR provides a centralized platform where CRs can manage attendance, announcements, assignments, and communication with classmates and faculty members.",
    },
    {
      question: "Is there a mobile app?",
      answer:
        "Currently, we offer a responsive web application that works seamlessly across all devices. A dedicated mobile app is planned for future development.",
    },
    {
      question: "How secure is my data?",
      answer:
        "We take data security seriously. All user data is encrypted and stored securely with industry-standard security measures to protect your privacy.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can reach our support team through the Contact Us page or by emailing support@ourcr.in during business hours (10 AM - 6 PM IST).",
    },
    {
      question: "Can I customize my dashboard?",
      answer:
        "Yes, our dashboard is highly customizable. You can organize widgets, set up notifications, and configure settings according to your preferences.",
    },
    {
      question: "Is training provided for new users?",
      answer:
        "Yes, we offer comprehensive onboarding materials and video tutorials to help new users get started quickly with our platform.",
    },
    {
      question: "How often do you update the platform?",
      answer:
        "We release updates monthly with new features, improvements, and bug fixes based on user feedback.",
    },
  ];

  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
              FAQ
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-medium">
              Find answers to commonly asked questions about YourCR.
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
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  className="w-full flex justify-between items-center p-6 text-left"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-xl font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-600 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Still have questions?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Can&apos;t find the answer you&apos;re looking for? Reach out to our support
              team.
            </p>
            <a
              href="/contact-us"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Faq;
