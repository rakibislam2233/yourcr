"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Globe,
  HelpCircle,
  Info,
  MessageCircle,
  Smartphone,
  UserCircle,
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
  icon: any;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "what-is-our",
    question: "What is Your CR?",
    icon: HelpCircle,
    answer:
      "Your CR is a comprehensive digital ecosystem designed to assist Class Representatives (CRs) in managing schedules, notices, assignments, and student grievances — all within a single, organized interface.",
  },
  {
    id: "who-can-use",
    question: "Who can use the platform?",
    icon: UserCircle,
    answer:
      "Primarily designed for Class Representatives, the platform also provides tailored access for students to view academic updates and for faculty members to broadcast essential information.",
  },
  {
    id: "student-login",
    question: "How do students access the system?",
    icon: Info,
    answer:
      "Students can log in using credentials securely provided by their Class Representative or the institutional administrator, typically utilizing their academic email or phone number.",
  },
  {
    id: "online-offline",
    question: "Does it support hybrid learning?",
    icon: Globe,
    answer:
      "Absolutely. CRs can manage both physical classroom details (room numbers, buildings) and virtual classroom links (Zoom, Google Meet) seamlessly in one place.",
  },
  {
    id: "personal-issues",
    question: "Can students report issues privately?",
    icon: MessageCircle,
    answer:
      "Yes, the platform includes a dedicated communication channel where students can submit queries or personal academic concerns directly to their CR for resolution.",
  },
  {
    id: "mobile",
    question: "Is there mobile support?",
    icon: Smartphone,
    answer:
      "Your CR is built with a mobile-first philosophy. It is fully responsive and optimized for a smooth experience across all smartphones, tablets, and desktop devices.",
  },
];

const Faq = () => {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 bg-white">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-secondary tracking-tight">
              Frequently Asked <span className="text-primary">Questions</span>
            </h1>
            <div className="w-16 h-1.5 bg-primary mx-auto rounded-full" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Find quick answers to common questions about Your CR and discover
              how it can transform your academic coordination.
            </p>
          </div>

          {/* Accordion List */}
          <div className="border-2 border-primary/10 rounded-[2rem] bg-white overflow-hidden">
            <Accordion
              type="single"
              collapsible
              className="w-full divide-y divide-primary/10"
            >
              {FAQ_ITEMS.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-none group"
                >
                  <AccordionTrigger className="py-6 px-8 text-left hover:no-underline data-[state=open]:bg-primary/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
                        <item.icon className="size-5" />
                      </div>
                      <span className="text-lg md:text-xl font-bold text-secondary group-data-[state=open]:text-primary transition-colors">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-8 pt-2">
                    <div className="pl-14">
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Bottom Help Note */}
          <div className="mt-12 text-center p-8 bg-secondary rounded-[2rem] text-white">
            <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
            <p className="text-white/70 mb-6">
              We're here to help you get the most out of your academic journey.
            </p>
            <button className="px-8 py-3 bg-primary text-white font-bold rounded-xl border-b-4 border-primary/20 active:translate-y-1 transition-all">
              Contact Support Team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
