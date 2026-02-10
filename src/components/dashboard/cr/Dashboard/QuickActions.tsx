import { Bell, Calendar, MessageSquare, Users } from "lucide-react";
import Link from "next/link";

const QuickActions = () => {
  const quickActions = [
    {
      label: "Add Student",
      href: "/dashboard/cr/students/add",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Create Notice",
      href: "/dashboard/cr/notices/add",
      icon: Bell,
      color: "bg-green-500",
    },
    {
      label: "Update Routine",
      href: "/dashboard/cr/routine",
      icon: Calendar,
      color: "bg-purple-500",
    },
    {
      label: "View Issues",
      href: "/dashboard/cr/issues",
      icon: MessageSquare,
      color: "bg-orange-500",
    },
  ];
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <Link key={action.label} href={action.href} className="group">
            <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className={`p-3 rounded-xl ${action.color} text-white`}>
                <action.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {action.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
