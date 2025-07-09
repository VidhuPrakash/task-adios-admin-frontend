import Link from "next/link";
import ProfileSection from "./profile-section/profile-section";
import {
  LayoutDashboard,
  Building2,
  SmilePlus,
  Bolt,
  IdCardLanyard,
  FolderGit,
} from "lucide-react";
const DashboardRouteLayout = () => {
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/companies", label: "Companies", icon: Building2 },
    { href: "/users", label: "Users", icon: IdCardLanyard },
    { href: "/projects", label: "Projects", icon: FolderGit },
    {
      href: "/company-requests",
      label: "New Company Requests",
      icon: SmilePlus,
    },
    { href: "/settings/account", label: "Settings", icon: Bolt },
  ];
  return (
    <div className="fixed flex  w-[80px] min-w-[80px]  gap-4 flex-col lg:w-[300px] lg:min-w[300px] border-r min-h-screen p-2 lg:p-4">
      <ProfileSection />
      <div className="grow flex flex-col gap-5">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="
              flex items-center justify-center lg:justify-start
              gap-0 lg:gap-2
              h-[40px] rounded-[8px] p-2 font-medium text-[12px]
              transition-transform duration-300
              hover:scale-[1.03] hover:bg-[var(--background-second)]
            "
          >
            <Icon className="shrink-0" size={20} />
            <span className="hidden lg:inline text-[16px]">{label}</span>
          </Link>
        ))}
      </div>
      <div className="font-[700] text-[48px] text-[var(--title-color)]">
        <span className="text-[var(--title-color-second)]">T</span>
        <span className="hidden lg:inline">ask</span>
        <span className="text-[var(--title-color-second)]">A</span>
        <span className="hidden lg:inline">dios</span>
      </div>
    </div>
  );
};

export default DashboardRouteLayout;
