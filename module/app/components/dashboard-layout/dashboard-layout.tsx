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
  return (
    <div className="flex gap-4 flex-col w-[300px] min-w[300px] border-r min-h-screen p-4">
      <div className=" font-[700] text-[48px] text-[var(--title-color)]">
        <span className="text-[var(--title-color-second)]">T</span>ask
        <span className="text-[var(--title-color-second)]">A</span>
        dios
      </div>
      <div className="grow flex flex-col gap-5">
        <Link
          href={"/dashboard"}
          className="font-[500] text=[12px] w-[100%]  h-[40px] flex gap-2 text-center p-2 rounded-[8px] transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:bg-[var(--background-second)]"
        >
          <LayoutDashboard /> Dashboard
        </Link>
        <Link
          href={"/companies"}
          className="font-[500] text=[12px] w-[100%] gap-2 h-[40px] flex text-center p-2 rounded-[8px] transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:bg-[var(--background-second)]"
        >
          <Building2 /> Companies
        </Link>
        <Link
          href={"/users"}
          className="font-[500] text=[12px] w-[100%] gap-2 h-[40px] flex text-center p-2 rounded-[8px] transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:bg-[var(--background-second)]"
        >
          <IdCardLanyard /> Users
        </Link>
        <Link
          href={"/projects"}
          className="font-[500] text=[12px] w-[100%] gap-2 h-[40px] flex text-center p-2 rounded-[8px] transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:bg-[var(--background-second)]"
        >
          <FolderGit /> Projects
        </Link>
        <Link
          href={"/company-requests"}
          className="font-[500] text=[12px] w-[100%] gap-2 h-[40px] flex text-center p-2 rounded-[8px] transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:bg-[var(--background-second)]"
        >
          <SmilePlus /> New Company Requests
        </Link>
        <Link
          href={"/settings"}
          className="font-[500] text=[12px] w-[100%] gap-2 h-[40px] flex text-center p-2 rounded-[8px] transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:bg-[var(--background-second)]"
        >
          <Bolt /> Settings
        </Link>
      </div>
      <ProfileSection />
    </div>
  );
};

export default DashboardRouteLayout;
