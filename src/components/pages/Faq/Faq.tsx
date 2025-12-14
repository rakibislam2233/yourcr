"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  Badge,
  Grid3X3,
  UserCog,
  CalendarClock,
  Bell,
  MessageSquare,
  CalendarIcon,
  ShieldAlert,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface Topic {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FAQItem {
  id: string;
  categoryId: string;
  question: string;
  answer: React.ReactNode;
}

// Updated CATEGORIES with Lucide icons
const CATEGORIES: Category[] = [
  {
    id: "general",
    name: "General",
    icon: <Grid3X3 className="size-5 text-gray-600" />,
  },
  {
    id: "account",
    name: "Account Management",
    icon: <UserCog className="size-5 text-gray-600" />,
  },
  {
    id: "schedules",
    name: "Class Schedules",
    icon: <CalendarClock className="size-5 text-gray-600" />,
  },
  {
    id: "exams",
    name: "Exam Updates",
    icon: <Bell className="size-5 text-gray-600" />,
  },
  {
    id: "faculty",
    name: "Faculty Communication",
    icon: <MessageSquare className="size-5 text-gray-600" />,
  },
];

// Updated TOPICS with proper Lucide icon names
const TOPICS: Topic[] = [
  {
    id: "schedule",
    title: "Update schedule",
    description: "Learn how to request changes to class timings.",
    icon: <CalendarIcon className="size-6" />,
  },
  {
    id: "cr-position",
    title: "Apply for CR position",
    description: "Requirements and application process details.",
    icon: <Badge className="size-6" />,
  },
  {
    id: "conflict",
    title: "Report conflict",
    description: "Resolve exam or lecture overlaps quickly.",
    icon: <ShieldAlert className="size-6" />,
  },
];
const FAQ_ITEMS: FAQItem[] = [
  // General
  {
    id: "apply-cr",
    categoryId: "general",
    question: "How do I apply to become a Class Representative?",
    answer: (
      <>
        <p className="mb-3">
          To apply for a Class Representative position, navigate to your{" "}
          <span className="text-primary font-medium cursor-pointer">
            Dashboard
          </span>{" "}
          and look for the CR Applications widget during the open enrollment
          period.
        </p>
        <p>
          You will need to submit a brief statement of purpose and may need
          endorsements from at least 3 faculty members.
        </p>
      </>
    ),
  },
  {
    id: "missed-meeting",
    categoryId: "general",
    question: "What happens if I miss a mandatory CR meeting?",
    answer:
      'Missing a mandatory meeting may result in a warning. If you have a valid reason, please submit an excuse form through the "Messages" tab at least 24 hours in advance.',
  },
  // Account
  {
    id: "reset-password",
    categoryId: "account",
    question: "How do I reset my portal password?",
    answer:
      'Go to the login page and click "Forgot Password". A reset link will be sent to your university email address immediately.',
  },
  {
    id: "update-profile",
    categoryId: "account",
    question: "Can I change my display name?",
    answer:
      "Yes, go to Settings > Profile > Personal Information. Note that your official name must match university records.",
  },
  // Schedules
  {
    id: "timetable",
    categoryId: "schedules",
    question: "Where can I find the updated semester timetable?",
    answer:
      'You can find the updated timetable in the "Classes" section of your dashboard. It is updated in real-time by the administration.',
  },
  {
    id: "conflict-report",
    categoryId: "schedules",
    question: "How do I report a scheduling conflict?",
    answer:
      'Navigate to the "Report Conflict" section in your sidebar, select the conflicting courses, and submit a ticket. The administration usually resolves these within 24 hours.',
  },
  // Exams
  {
    id: "exam-dates",
    categoryId: "exams",
    question: "When will the final exam dates be released?",
    answer:
      'Final exam schedules are typically released 4 weeks before the end of the semester. Check the "Exams" tab for the PDF download.',
  },
  {
    id: "grading",
    categoryId: "exams",
    question: "What is the policy for re-checking grades?",
    answer:
      "You must submit a formal request to the Controller of Examinations within 7 days of result publication along with the required fee.",
  },
  // Faculty
  {
    id: "announcements",
    categoryId: "faculty",
    question: "Can faculty members edit posted announcements?",
    answer:
      "Yes, faculty members can edit announcements. You will receive a notification if a major change is made to an existing announcement.",
  },
  {
    id: "contact-faculty",
    categoryId: "faculty",
    question: "Best way to contact a professor?",
    answer:
      'Use the official "Messages" system in the portal. It ensures a record of communication is kept for administrative purposes.',
  },
];
const Hero: React.FC = () => {
  return (
    <div className="bg-surface pb-12 pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-black tracking-tight text-text-primary sm:text-5xl">
            How can we help you today?
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            Find answers to common questions.
          </p>
        </div>
      </div>
    </div>
  );
};

const TopicCard: React.FC<{ topic: Topic }> = ({ topic }) => {
  return (
    <div className="flex flex-col items-start gap-3 rounded-xl border border-border bg-white p-5 cursor-pointer ">
      <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary">
        {topic.icon}
      </div>
      <div>
        <h3 className="font-bold text-text-primary">{topic.title}</h3>
        <p className="text-sm text-text-secondary mt-1 leading-relaxed">
          {topic.description}
        </p>
      </div>
    </div>
  );
};

interface SidebarProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="sticky top-24 rounded-xl border border-border bg-white p-4">
        <div className="mb-4 px-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
            Categories
          </h2>
        </div>
        <nav className="space-y-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full flex items-center gap-3 cursor-pointer rounded-md px-3 py-3 text-sm font-medium transition-colors text-left ${
                activeCategory === cat.id
                  ? "bg-blue-50 text-primary"
                  : "text-text-secondary hover:bg-gray-50"
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

const AccordionItem: React.FC<{
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ item, isOpen, onToggle }) => {
  return (
    <div
      className={`w-full rounded-xl border bg-white cursor-pointer  overflow-hidden transition-colors ${
        isOpen ? "border-primary shadow-sm" : "border-border"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span
          className={`text-base font-medium cursor-pointer ${
            isOpen ? "text-primary font-semibold" : "text-text-primary"
          }`}
        >
          {item.question}
        </span>
        <ChevronDown
          className={`size-5 text-text-secondary cursor-pointer transition-transform ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="border-t border-border bg-surface px-6 py-4">
          <div className="text-sm leading-relaxed text-text-secondary">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
};

const Faq: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("general");
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

  const handleCategorySelect = (id: string) => {
    setActiveCategory(id);
    setOpenAccordionId(null); // Close all when switching category
  };

  const filteredItems = FAQ_ITEMS.filter(
    (item) => item.categoryId === activeCategory
  );
  const currentCategoryName =
    CATEGORIES.find((c) => c.id === activeCategory)?.name || "General";

  return (
    <main className="relative flex min-h-screen flex-col font-display bg-background-light pt-16 md:pt-20">
      <Hero />

      {/* Popular Topics Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Popular Topics
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar
            activeCategory={activeCategory}
            onSelectCategory={handleCategorySelect}
          />

          {/* FAQ Accordion Content */}
          <div className="flex-1">
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="text-2xl font-bold text-text-primary">
                {currentCategoryName} Questions
              </h2>
              <span className="text-sm text-text-secondary">
                {filteredItems.length} result
                {filteredItems.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="space-y-4">
              {filteredItems?.length > 0 ? (
                filteredItems.map((item) => (
                  <AccordionItem
                    key={item.id}
                    item={item}
                    isOpen={openAccordionId === item.id}
                    onToggle={() => toggleAccordion(item.id)}
                  />
                ))
              ) : (
                <div className="rounded-xl border border-border bg-white p-8 text-center text-text-secondary">
                  No questions found for this category.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Faq;
