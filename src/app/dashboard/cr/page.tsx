import Stats from "@/components/dashboard/cr/Dashboard/Stats";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { TrendingUp } from "lucide-react";
import React from "react";

const CrDashboardPage = () => {
  return (
    <section>
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your class today."
        icon={<TrendingUp className="w-6 h-6" />}
      />
      {/* Stats Grid */}
      <Stats />
    </section>
  );
};

export default CrDashboardPage;
