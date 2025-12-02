"use client";
import React from "react";
import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";

const TermsAndConditions = () => {
  const sections = [
    {
      title: "Introduction",
      content: `Welcome to YourCR ("the Platform", "we", "us", or "our"). These Terms and Conditions ("Terms", "Terms and Conditions") govern your use of the online classroom management platform accessible at https://yourcr.in (the "Service") and any related services provided by YourCR.

Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all users who access or use the Service. By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.`,
    },
    {
      title: "User Accounts",
      content: `When you create an account with us, you must provide us with accurate and complete information. You are responsible for maintaining the security of your account and for all activities that occur under your account. You agree to:`,
      list: [
        "Maintain accurate and complete information at all times",
        "Keep your account password secure",
        "Notify us immediately if you suspect unauthorized access to your account",
        "Use the Service in compliance with applicable laws",
        "Not share your account credentials with others",
      ],
    },
    {
      title: "User Responsibilities",
      content: `As a user of our Service, you agree to:`,
      list: [
        "Use the Service in a manner that is legal and consistent with applicable laws and regulations",
        "Not use the Service to upload, transmit, or distribute any harmful, illegal, or offensive content",
        "Respect the privacy rights of other users",
        "Not attempt to bypass any security measures or access controls",
        "Not use the Service to send spam or unsolicited communications",
        "Comply with all applicable academic integrity policies",
      ],
    },
    {
      title: "Acceptable Use",
      content: `You agree not to use the Service to:`,
      list: [
        "Harass, abuse, or harm other users",
        "Impersonate any person or entity",
        "Upload files that contain viruses, trojans, or malware",
        "Violate the intellectual property rights of others",
        "Post content that is defamatory, obscene, or otherwise objectionable",
        "Interfere with the operation of the Service",
        "Reverse engineer or attempt to access the source code",
      ],
    },
    {
      title: "Intellectual Property",
      content: `The Service and its content, features, and functionality are owned by YourCR and are protected by international copyright, trademark, and other intellectual property laws. You may not copy, modify, or distribute any part of the Service without our express written permission.`,
    },
    {
      title: "Data and Privacy",
      content: `Your use of the Service is also governed by our Privacy Policy, which explains how we collect, use, and share your personal information. By using the Service, you consent to the collection and use of your information as described in the Privacy Policy.`,
    },
    {
      title: "Limitation of Liability",
      content: `In no event shall YourCR, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.`,
    },
    {
      title: "Modifications to Service",
      content: `We reserve the right to modify or discontinue, temporarily or permanently, the Service or any part of it with or without notice. You agree that we shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.`,
    },
    {
      title: "Governing Law",
      content: `These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.`,
    },
    {
      title: "Termination",
      content: `We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms. If you wish to terminate your account, you may simply discontinue using the Service.`,
    },
    {
      title: "Changes to Terms",
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.`,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-primary/5 via-white to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 sm:mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">Terms & Conditions</span>
          </div>
          <div className="flex items-center gap-4 mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Terms & Conditions
              </h1>
              <p className="text-sm text-gray-500 mt-1">Last updated: December 2024</p>
            </div>
          </div>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Please read these terms and conditions carefully before using YourCR.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-xl p-5 sm:p-6 mb-8 sm:mb-12">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Table of Contents</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sections.map((section, idx) => (
                <a
                  key={idx}
                  href={`#section-${idx}`}
                  className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-5 h-5 bg-gray-200 rounded text-xs flex items-center justify-center text-gray-500">
                    {idx + 1}
                  </span>
                  {section.title}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-10 sm:space-y-12">
            {sections.map((section, idx) => (
              <div key={idx} id={`section-${idx}`} className="scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-primary/10 rounded-lg text-sm flex items-center justify-center text-primary font-medium">
                    {idx + 1}
                  </span>
                  {section.title}
                </h2>
                <div className="pl-0 sm:pl-11">
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                  {section.list && (
                    <ul className="mt-4 space-y-2">
                      {section.list.map((item, i) => (
                        <li key={i} className="text-sm sm:text-base text-gray-600 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}

            {/* Contact Section */}
            <div className="bg-primary/5 rounded-xl p-5 sm:p-6 border border-primary/10">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Contact Us</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  By email: legal@yourcr.in
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Through our{" "}
                  <Link href="/contact-us" className="text-primary hover:underline font-medium">
                    Contact Us
                  </Link>{" "}
                  page
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsAndConditions;
