"use client";
import React from "react";
import { motion } from "framer-motion";

const TermsAndConditions = () => {
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
              Terms & Conditions
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-medium">
              Please read these terms and conditions carefully before using OurCR.
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
            className="prose prose-lg max-w-none"
          >
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                Welcome to YourCR ("the Platform", "we", "us", or "our"). These Terms and Conditions ("Terms", "Terms and Conditions") 
                govern your use of the online classroom management platform accessible at https://yourcr.in (the "Service") and any 
                related services provided by YourCR.
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These 
                Terms apply to all users who access or use the Service. By accessing or using the Service, you agree to be bound by 
                these Terms. If you disagree with any part of the terms, then you may not access the Service.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">User Accounts</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                When you create an account with us, you must provide us with accurate and complete information. You are responsible 
                for maintaining the security of your account and for all activities that occur under your account. You agree to:
              </p>
              <ul className="text-gray-600 list-disc pl-6 space-y-2">
                <li>Maintain accurate and complete information at all times</li>
                <li>Keep your account password secure</li>
                <li>Notify us immediately if you suspect unauthorized access to your account</li>
                <li>Use the Service in compliance with applicable laws</li>
                <li>Not share your account credentials with others</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                As a user of our Service, you agree to:</p>
              <ul className="text-gray-600 list-disc pl-6 space-y-2">
                <li>Use the Service in a manner that is legal and consistent with applicable laws and regulations</li>
                <li>Not use the Service to upload, transmit, or distribute any harmful, illegal, or offensive content</li>
                <li>Respect the privacy rights of other users</li>
                <li>Not attempt to bypass any security measures or access controls</li>
                <li>Not use the Service to send spam or unsolicited communications</li>
                <li>Comply with all applicable academic integrity policies</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Acceptable Use</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You agree not to use the Service to:</p>
              <ul className="text-gray-600 list-disc pl-6 space-y-2">
                <li>Harass, abuse, or harm other users</li>
                <li>Impersonate any person or entity</li>
                <li>Upload files that contain viruses, trojans, or malware</li>
                <li>Violate the intellectual property rights of others</li>
                <li>Post content that is defamatory, obscene, or otherwise objectionable</li>
                <li>Interfere with the operation of the Service</li>
                <li>Reverse engineer or attempt to access the source code</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed">
                The Service and its content, features, and functionality are owned by YourCR and are protected by international 
                copyright, trademark, and other intellectual property laws. You may not copy, modify, or distribute any part of 
                the Service without our express written permission.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Data and Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                Your use of the Service is also governed by our Privacy Policy, which explains how we collect, use, and share 
                your personal information. By using the Service, you consent to the collection and use of your information 
                as described in the Privacy Policy.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                In no event shall YourCR, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable 
                for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss 
                of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability 
                to access or use the Service.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Modifications to Service</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify or discontinue, temporarily or permanently, the Service or any part of it with 
                or without notice. You agree that we shall not be liable to you or any third party for any modification, 
                suspension, or discontinuation of the Service.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict 
                of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver 
                of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining 
                provisions of these Terms will remain in effect.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-600 leading-relaxed">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or 
                liability, under our sole discretion, for any reason whatsoever and without limitation, including but not 
                limited to a breach of the Terms. If you wish to terminate your account, you may simply discontinue using the Service.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is 
                material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes 
                a material change will be determined at our sole discretion. By continuing to access or use our Service after 
                those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <ul className="text-gray-600 list-disc pl-6 mt-4 space-y-2">
                <li>By email: legal@ourcr.in</li>
                <li>Through our <a href="/contact-us" className="text-blue-600 hover:underline">Contact Us</a> page</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TermsAndConditions;