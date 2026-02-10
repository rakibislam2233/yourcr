import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const TodayClasses = async () => {
  // const data = await upcomingClasses()
  const upcomingClasses = [
    {
      subject: "Mathematics",
      teacher: "Mr. John Doe",
      time: "10:00 AM",
      room: "Room 101",
    },
    {
      subject: "Physics",
      teacher: "Ms. Jane Smith",
      time: "11:00 AM",
      room: "Room 102",
    },
    {
      subject: "Chemistry",
      teacher: "Mr. John Doe",
      time: "12:00 PM",
      room: "Room 103",
    },
  ];
  return (
    <div className="bg-white rounded-md p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Today&apos;s Classes
        </h2>
        <Link
          href="/dashboard/cr/classes"
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          View All Classes <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {upcomingClasses.map((cls) => (
          <div
            key={cls.subject}
            className="p-4 rounded-md bg-linear-to-br from-primary/10 to-primary/10 border border-primary/10"
          >
            <h3 className="font-semibold text-gray-900">{cls.subject}</h3>
            <p className="text-sm text-gray-600 mt-1">{cls.teacher}</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {cls.time}
              </span>
              <span>{cls.room}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayClasses;
