import {
  Badge,
  Eye,
  MessageSquare,
  School,
  Target,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";

const AboutUsPage = () => {
  return (
    <main className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider">
                <Zap className="size-3" />
                Empowering Education
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-secondary">
                Bridging the Gap Between{" "}
                <span className="text-primary italic">Students</span> and
                Faculty
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Your CR is the ultimate digital bridge, empowering Class
                Representatives with centralized tools to streamline
                communication and academic leadership.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-primary text-white font-bold rounded-xl border-b-4 border-primary/20 active:translate-y-1 transition-all">
                  Get Started Now
                </button>
                <button className="px-8 py-4 bg-white text-secondary font-bold rounded-xl border border-secondary active:translate-y-1 transition-all">
                  Learn More
                </button>
              </div>
            </div>
            <div className="flex-1 w-full max-w-2xl">
              <div className="relative p-2 border-2 border-primary/10 rounded-3xl bg-white">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Students collaborating"
                  width={800}
                  height={600}
                  className="rounded-2xl object-cover w-full aspect-4/3"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Partner Universities", value: "50+", icon: School },
              { label: "Active Students", value: "10k+", icon: Users },
              { label: "Daily Messages", value: "500k+", icon: MessageSquare },
              { label: "Tasks Completed", value: "1M+", icon: Badge },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-8 border border-white/10 rounded-2xl bg-white/5"
              >
                <stat.icon className="size-8 text-primary mb-4" />
                <div className="text-4xl font-black text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-white/60 tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Purpose Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-secondary">
              Our Core Purpose
            </h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
            <p className="text-lg text-muted-foreground">
              We are driven by a singular commitment: to remove administrative
              hurdles, ensuring that every minute of academic life is spent on
              growth and learning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 bg-primary/5 rounded-3xl border-2 border-primary/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 bg-primary/5 rounded-full -mr-16 -mt-16" />
              <div className="relative z-10 space-y-6">
                <div className="p-4 bg-primary text-white rounded-2xl w-fit">
                  <Target className="size-8" />
                </div>
                <h3 className="text-3xl font-bold text-secondary">
                  Our Mission
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To revolutionize academic coordination by equipping Class
                  Representatives with a powerful digital ecosystem that
                  transforms chaos into clarity.
                </p>
              </div>
            </div>

            <div className="p-10 bg-secondary/5 rounded-3xl border-2 border-secondary/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 bg-secondary/5 rounded-full -mr-16 -mt-16" />
              <div className="relative z-10 space-y-6">
                <div className="p-4 bg-secondary text-white rounded-2xl w-fit">
                  <Eye className="size-8" />
                </div>
                <h3 className="text-3xl font-bold text-secondary">
                  Our Vision
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A global academic landscape where communication is seamless,
                  deadlines are transparent, and every student has equal access
                  to opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3 space-y-6 lg:sticky lg:top-32">
              <h2 className="text-4xl font-bold text-secondary">
                Why <span className="text-primary italic">Your CR?</span>
              </h2>
              <p className="text-muted-foreground">
                We&apos;ve built a platform that understands the unique needs of
                every stakeholder in the academic journey.
              </p>
              <div className="h-1 w-24 bg-primary" />
            </div>

            <div className="lg:w-2/3 grid gap-6">
              {[
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
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-6 p-8 bg-white border border-border rounded-3xl items-start"
                >
                  <div
                    className={`p-4 rounded-2xl ${item.color} ${item.textColor} shrink-0`}
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

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-primary p-12 md:p-20 rounded-[3rem] text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-black">
                Ready to Lead Your Class Better?
              </h2>
              <p className="text-xl text-primary-foreground/80">
                Join thousands of CRs and students who are already using Your CR
                to simplify their academic lives.
              </p>
              <button className="px-10 py-5 bg-white text-primary font-black text-lg rounded-2xl active:translate-y-1 transition-all">
                Join Our Mission
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;
