import DashboardHeader from "@/module/app/components/dashboard-header/dashboard-header";
import DashboardRouteLayout from "@/module/app/components/dashboard-layout/dashboard-layout";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-start justify-between">
      <DashboardRouteLayout />
      <main className="w-full h-full pl-[300px]">
        <DashboardHeader />
        <div className="pt-[77px]">{children}</div>
      </main>
    </div>
  );
}
