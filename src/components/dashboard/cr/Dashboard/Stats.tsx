import StatsCard from "../../shared/StatsCard";
const Stats = async () => {
  // const stats = await getStats();
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Students"
        value={45}
        icon="Users"
        color="blue"
      />
      <StatsCard
        title="Active Subjects"
        value={8}
        icon="BookOpen"
        color="green"
      />
      <StatsCard
        title="Pending Issues"
        value={3}
        icon="MessageSquare"
        color="orange"
      />
      <StatsCard
        title="Assessments"
        value={12}
        icon="ClipboardList"
        color="purple"
      />
    </section>
  );
};

export default Stats;
