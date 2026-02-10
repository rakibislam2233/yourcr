import {
  ArrowRight,
  Bell,
  Calendar,
  Clock,
  MessageSquare,
  Users,
} from "lucide-react";
import Link from "next/link";

const RecentActivity = async () => {
  //   const recentActivities = await getRecentActivities();
  const recentActivities = [
    {
      id: 1,
      action: "New student issue submitted",
      description: "Regarding exam hall allocation",
      time: "5 min ago",
      icon: MessageSquare,
      color: "text-orange-500 bg-orange-100",
    },
    {
      id: 2,
      action: "Notice published",
      description: "Mid-term exam schedule",
      time: "1 hour ago",
      icon: Bell,
      color: "text-blue-500 bg-blue-100",
    },
    {
      id: 3,
      action: "New student added",
      description: "Sakib Hasan joined the class",
      time: "2 hours ago",
      icon: Users,
      color: "text-green-500 bg-green-100",
    },
    {
      id: 4,
      action: "Routine updated",
      description: "Friday class schedule changed",
      time: "3 hours ago",
      icon: Calendar,
      color: "text-purple-500 bg-purple-100",
    },
  ];
  return (
    <section className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <Link
          href="#"
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className={`p-2.5 rounded-xl ${activity.color}`}>
              <activity.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{activity.action}</p>
              <p className="text-sm text-gray-500">{activity.description}</p>
            </div>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentActivity;
