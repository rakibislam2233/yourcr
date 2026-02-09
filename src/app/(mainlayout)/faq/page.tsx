import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "what-is-our",
    question: "What is OUR?",
    answer:
      "OUR CR is a digital platform that helps Class Representatives (CRs) manage class schedules, notices, assignments, and student issues — all in one organized place.",
  },
  {
    id: "who-can-use",
    question: "Who can use OUR CR?",
    answer:
      "Class Representatives (CRs) of different batches use this platform to manage their class-related activities. Students can view notices, schedules, and submit issues through their CR.",
  },
  {
    id: "student-login",
    question: "How does a student log in?",
    answer:
      "Students log in using the credentials provided by their Class Representative or institution admin (usually email/phone + password).",
  },
  {
    id: "online-offline",
    question: "Can CRs manage both online and offline classes?",
    answer:
      "Yes, CRs can manage both online (Zoom/Google Meet links) and offline (venue/room details) classes in the same platform.",
  },
  {
    id: "personal-issues",
    question: "Can students submit personal issues?",
    answer:
      "Yes, students can submit personal queries, problems or requests directly to their CR through the platform's issue/message section.",
  },
  {
    id: "mobile",
    question: "Is OUR CR available on mobile?",
    answer:
      "Yes, OUR CR is fully mobile-responsive and works smoothly on phones and tablets.",
  },
];

const page = () => {
  return (
    <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-linear-to-b from-primary/5 via-white to-white">
      {/* Header - matching your original screenshot style */}
      <div className="mx-auto max-w-4xl text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Frequently <span className="text-primary">Asked</span> Questions
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Help talented youth access elite coaching and competitive programs.
          <br />
          Every contribution ignites their potential.
        </p>
      </div>

      {/* Shadcn Accordion - single mode (only one open at a time), collapsible */}
      <div className="mx-auto max-w-4xl">
        <Accordion type="single" collapsible className="w-full">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border rounded-md mb-2"
            >
              <AccordionTrigger className="py-5 px-6 text-left text-lg font-medium text-gray-900 hover:no-underline cursor-pointer">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 text-gray-600 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default page;
