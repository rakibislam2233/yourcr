import QuickActions from "@/components/dashboard/cr/Dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/cr/Dashboard/RecentActivity";
import Stats from "@/components/dashboard/cr/Dashboard/Stats";
import TodayClasses from "@/components/dashboard/cr/Dashboard/TodayClasses";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { TrendingUp } from "lucide-react";

const CrDashboardPage = () => {
  return (
    <section className="w-full space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your class today."
        icon={<TrendingUp className="w-6 h-6" />}
      />
      {/* Stats Grid */}
      <Stats />
      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <RecentActivity />
        {/* Quick Actions */}
        <QuickActions />
      </div>
      {/* Today's Classes */}
      <TodayClasses />
    </section>
  );
};

export default CrDashboardPage;
