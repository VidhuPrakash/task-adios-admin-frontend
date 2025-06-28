import DashboardRouteLayout from "@/module/app/components/dashboard-layout/dashboard-layout";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-start justify-between">
      <DashboardRouteLayout />
      <main className="w-full h-full">{children}</main>
    </div>
  );
}
