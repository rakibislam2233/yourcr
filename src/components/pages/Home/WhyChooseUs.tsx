
import {
  Users,
  Calendar,
  Bell,
  FileText,
  MessageCircle,
  Network,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Users,
    color: "text-green-500",
    bg: "bg-green-50",
    title: "Manage Students Effortlessly",
    desc: "Add, edit, or remove students with secure login credentials — keep your class organized in one place.",
  },
  {
    icon: Calendar,
    color: "text-red-500",
    bg: "bg-red-50",
    title: "Offline & Online Class Planner",
    desc: "Schedule, update, and track both online and offline classes seamlessly, with reminders for everyone.",
  },
  {
    icon: Bell,
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    title: "Stay Informed Instantly",
    desc: "Post important updates and academic notices that reach every student in seconds.",
  },
  {
    icon: FileText,
    color: "text-blue-500",
    bg: "bg-blue-50",
    title: "Easy Assignment Handling",
    desc: "Upload assignments, share resources, and track submissions without confusion.",
  },
  {
    icon: MessageCircle,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    title: "Listen & Solve Quickly",
    desc: "Students can submit personal issues, and CRs can mark them as resolved — ensuring smooth communication.",
  },
  {
    icon: Network,
    color: "text-purple-500",
    bg: "bg-purple-50",
    title: "Build a Connected Class",
    desc: "A dedicated space where students and CRs can discuss classes, share notes, and stay engaged.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-60 sm:w-80 h-60 sm:h-80 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-primary/10 border border-primary rounded-lg mx-auto mb-8 sm:mb-10">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          <span className="text-primary font-semibold text-xs sm:text-sm">
            Key Features
          </span>
        </div>

        {/* Title */}
        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Why Choose <span className="text-primary">YourCR?</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed px-4 sm:px-0">
            From class scheduling to student communication, YourCR gives Class
            Representatives the power to manage everything effortlessly — all
            from one simple, intuitive dashboard.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 text-left hover:bg-primary/5 transition-colors duration-300 hover:border-primary "
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${feature.bg} rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-105 transition-transform duration-300`}
                >
                  <Icon
                    className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${feature.color}`}
                  />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
