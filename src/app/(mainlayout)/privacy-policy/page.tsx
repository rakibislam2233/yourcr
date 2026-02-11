import Link from "next/link";
import { Shield, ChevronRight } from "lucide-react";

const page = () => {
  const sections = [
    {
      title: "Introduction",
      content: `At YourCR, accessible from https://yourcr.in, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by YourCR and how we use it.`,
    },
    {
      title: "Information We Collect",
      content: `We collect personal information that you voluntarily provide to us when registering at the Services, expressing an interest in obtaining information about us or our products and Services, when participating in activities on the Services, or otherwise contacting us.

The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.`,
    },
    {
      title: "How We Use Your Information",
      content: `We use the information we collect in various ways, including to:`,
      list: [
        "Provide, operate, and maintain our services",
        "Improve, personalize, and expand our services",
        "Understand and analyze how you use our services",
        "Develop new products, services, features, and functionality",
        "Communicate with you, either directly or through one of our partners",
        "Send you emails and other communications",
        "Find and prevent fraud",
      ],
    },
    {
      title: "Log Files",
      content: `YourCR follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.`,
    },
    {
      title: "Cookies and Web Beacons",
      content: `Like any other website, YourCR uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.`,
    },
    {
      title: "Third Party Privacy Policies",
      content: `YourCR's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.`,
    },
    {
      title: "Children's Information",
      content: `Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.

YourCR does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately.`,
    },
    {
      title: "Data Retention",
      content: `We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).`,
    },
    {
      title: "Security of Your Personal Information",
      content: `We use appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please remember that no transmission over the internet is completely secure and we cannot guarantee the security of your information transmitted to our site.`,
    },
    {
      title: "Changes to This Privacy Policy",
      content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.`,
    },
  ];

  return (
    <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-linear-to-b from-primary/5 via-white to-white">
      <div className="w-full container mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 sm:mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Privacy Policy</span>
        </div>
        <div className="flex items-center gap-4 mb-4 sm:mb-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Last updated: December 2024
            </p>
          </div>
        </div>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Your privacy is important to us. Learn how we collect, use, and
          protect your information.
        </p>
      </div>
      <div className="w-full container mx-auto">
        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-xl p-5 sm:p-6 mb-8 sm:mb-12">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">
            Table of Contents
          </h3>
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
                      <li
                        key={i}
                        className="text-sm sm:text-base text-gray-600 flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
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
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
              Contact Us
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              If you have any questions about this Privacy Policy, you can
              contact us:
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                By email: privacy@yourcr.in
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Through our{" "}
                <Link
                  href="/contact-us"
                  className="text-primary hover:underline font-medium"
                >
                  Contact Us
                </Link>{" "}
                page
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
