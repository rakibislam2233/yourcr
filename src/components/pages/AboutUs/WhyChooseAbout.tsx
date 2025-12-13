import { Bell } from "lucide-react";

const WhyChooseAbout = () => {
  const reasons = [
    {
      icon: <Bell />,
      title: "Real-time Notices",
      desc: "Never miss a lecture update or exam schedule change with instant, push-notification enabled alerts directly from your CR.",
    },
    {
      icon: "rate_review",
      title: "Anonymous Feedback",
      desc: "A safe space for students to voice concerns. Democratized classroom decisions with anonymous inputs and voting systems.",
    },
    {
      icon: "poll",
      title: "Event Polls",
      desc: "Direct line to faculty and simplified event planning. Create polls for dates, venues, or topics in seconds.",
    },
  ];

  return (
    <section className="px-4 sm:px-10 lg:px-40 py-16 lg:py-24  dark:bg-[#1a190f]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-[#e9e8ce] dark:border-[#3a392a] pb-8">
          <h2 className="text-3xl lg:text-4xl font-bold leading-tight max-w-lg">
            Why universities and students choose Your CR?
          </h2>
          <a
            className="text-sm font-bold border-b-2 border-primary pb-1 hover:text-primary/80 transition-colors"
            href="#"
          >
            View all features
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="bg-background-light dark:bg-[#23220f] p-8 rounded-lg"
            >
              <div className="mb-4 text-[#1c1c0d] dark:text-primary">
                <span className="material-symbols-outlined text-5xl">
                  {item.icon}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-[#1c1c0d]/70 dark:text-white/70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseAbout;
