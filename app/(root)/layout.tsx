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
      <main className="w-full h-full overflow-hidden pl-[80px] lg:pl-[300px]">
        <DashboardHeader />
        <div className="pt-[100px] m-[20px] z-1">{children}</div>
      </main>
    </div>
  );
}
