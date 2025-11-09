"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const PrivacyPolicy = () => {
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
              Privacy Policy
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-medium">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
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
                At YourCR, accessible from https://yourcr.in, one of our main priorities is the privacy of our visitors. 
                This Privacy Policy document contains types of information that is collected and recorded by YourCR and how we use it.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We collect personal information that you voluntarily provide to us when registering at the Services, 
                expressing an interest in obtaining information about us or our products and Services, when participating 
                in activities on the Services, or otherwise contacting us.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, 
                will be made clear to you at the point we ask you to provide your personal information.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use the information we collect in various ways, including to:
              </p>
              <ul className="text-gray-600 list-disc pl-6 space-y-2">
                <li>Provide, operate, and maintain our services</li>
                <li>Improve, personalize, and expand our services</li>
                <li>Understand and analyze how you use our services</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners</li>
                <li>Send you emails and other communications</li>
                <li>Find and prevent fraud</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Log Files</h2>
              <p className="text-gray-600 leading-relaxed">
                YourCR follows a standard procedure of using log files. These files log visitors when they visit websites. 
                All hosting companies do this and a part of hosting services&apos; analytics. The information collected by log files 
                include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, 
                referring/exit pages, and possibly the number of clicks. These are not linked to any information that is 
                personally identifiable. The purpose of the information is for analyzing trends, administering the site, 
                tracking users&apos; movement on the website, and gathering demographic information.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Cookies and Web Beacons</h2>
              <p className="text-gray-600 leading-relaxed">
                Like any other website, YourCR uses &apos;cookies&apos;. These cookies are used to store information including 
                visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information 
                is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser 
                type and/or other information.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Third Party Privacy Policies</h2>
              <p className="text-gray-600 leading-relaxed">
                YourCR&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to 
                consult the respective Privacy Policies of these third-party ad servers for more detailed information. 
                It may include their practices and instructions about how to opt-out of certain options.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Children&apos;s Information</h2>
              <p className="text-gray-600 leading-relaxed">
                Another part of our priority is adding protection for children while using the internet. We encourage 
                parents and guardians to observe, participate in, and/or monitor and guide their online activity.
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                YourCR does not knowingly collect any Personal Identifiable Information from children under the age 
                of 13. If you think that your child provided this kind of information on our website, we strongly 
                encourage you to contact us immediately and we will do our best efforts to promptly remove such 
                information from our records.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Data Retention</h2>
              <p className="text-gray-600 leading-relaxed">
                We will retain your personal information only for as long as is necessary for the purposes set out 
                in this Privacy Policy, unless a longer retention period is required or permitted by law (such as 
                tax, accounting, or other legal requirements).
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Security of Your Personal Information</h2>
              <p className="text-gray-600 leading-relaxed">
                We use appropriate technical and organizational security measures designed to protect the security 
                of any personal information we process. However, please remember that no transmission over the 
                internet is completely secure and we cannot guarantee the security of your information transmitted 
                to our site.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically 
                for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about this Privacy Policy, You can contact us:
              </p>
              <ul className="text-gray-600 list-disc pl-6 mt-4 space-y-2">
                <li>By email: privacy@ourcr.in</li>
                <li>Through our <Link href="/contact-us" className="text-blue-600 hover:underline">Contact Us</Link> page</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;