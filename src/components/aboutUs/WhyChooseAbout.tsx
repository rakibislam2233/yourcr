import { MessageSquare, School, Users } from "lucide-react";

const WhyChooseAbout = () => {
  const reasons = [
    {
      title: "For Class Representatives",
      description:
        "Manage tasks effortlessly, organize real-time polls, and distribute materials with precision and speed.",
      icon: Users,
      color: "bg-blue-100/50",
      textColor: "text-blue-700",
    },
    {
      title: "For Students",
      description:
        "Centralized notifications and automated calendars ensure you never miss a deadline or an important announcement.",
      icon: School,
      color: "bg-purple-100/50",
      textColor: "text-purple-700",
    },
    {
      title: "For Faculty Members",
      description:
        "Instantly broadcast updates to entire batches, ensuring critical information reaches every student without delay.",
      icon: MessageSquare,
      color: "bg-emerald-100/50",
      textColor: "text-emerald-700",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3 space-y-6 lg:sticky lg:top-32">
            <h2 className="text-4xl font-bold text-secondary">
              Why <span className="text-primary">Your CR?</span>
            </h2>
            <p className="text-muted-foreground">
              We&apos;ve built a platform that understands the unique needs of
              every stakeholder in the academic journey.
            </p>
            <div className="h-1 w-24 bg-primary" />
          </div>

          <div className="lg:w-2/3 grid gap-6">
            {reasons?.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-6 p-8 bg-white border border-border rounded-md items-start"
              >
                <div
                  className={`p-4 rounded-md ${item.color} ${item.textColor} shrink-0`}
                >
                  <item.icon className="size-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-secondary">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseAbout;
