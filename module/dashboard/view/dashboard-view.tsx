import { Card } from "@/components/ui/card";
import CompaniesLineChart from "../components/companies-line-chart/companies-line-chart";
import TasksCalendorChart from "../components/daily-tasks-line-chart/daily-tasks-line-chart";
import ProjectsLineChart from "../components/projects-line-chart/projects-line-chart";

const DashboardView = () => {
  return (
    <div className="w-full grid gap-[32px] h-full">
      <div className="grid gap-[32px] lg:grid-cols-2">
        <CompaniesLineChart />
        <div className="grid gap-[32px] flex-col">
          {/* 
          <ProjectsLineChart /> */}
          <TasksCalendorChart />
          <Card className="flex text-[28px] order-first lg:order-last font-[600] pl-10">
            Welcome, Admin 👋
          </Card>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-5">
        <ProjectsLineChart />
        <Card></Card>
        <Card></Card>
      </div>
    </div>
  );
};

export default DashboardView;
