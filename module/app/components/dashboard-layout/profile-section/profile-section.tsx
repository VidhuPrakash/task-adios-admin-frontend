import { LogOutIcon } from "lucide-react";

const ProfileSection = () => {
  return (
    <div className="relative overflow-hidden group cursor-pointer border-[#aeaeae] bg-[var(--background-second)] flex items-center gap-2 rounded-[8px] p-4 transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg min-h-16">
      <div className="flex items-center gap-2 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
        <div className="avatar rounded-full bg-[var(--title-color)] min-h-12 min-w-12 flex justify-center items-center  font-[700]">
          NA
        </div>
        <div>
          <div className="text-[16px] font-bold ">Namejjjjj</div>
          <div className="text-[12px] ">emaihhhhhhhhhhhhl@emailjjj.com</div>
        </div>
      </div>

      <div className="absolute inset-0 flex gap-4 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
        <span className=" font-bold text-[16px]">Logout</span>
        <LogOutIcon color="var(--primary)" />
      </div>
    </div>
  );
};

export default ProfileSection;
