"use client";

import { logout } from "@/module/app/service/query/profile-action";
import { useMutation } from "@tanstack/react-query";
import { LogOutIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import useUserStore from "@/store/user-store";
import { useRouter } from "nextjs-toploader/app";

const ProfileSection = () => {
  const { name, email } = useUserStore();
  const clearUser = useUserStore((state) => state.clearUser);
  const route = useRouter();
  const {
    mutate: logoutMutate,
    isPending,
    isError,
  } = useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      clearUser();
      route.push("/");
    },
  });

  return (
    <div className="relative overflow-hidden group cursor-pointer lg:border  flex items-center gap-2 rounded-[8px] p-2 lg:p-4 transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg min-h-16">
      {isPending ? (
        <div className="flex items-center space-x-2">
          <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px] bg-gray-300" />
            <Skeleton className="h-4 w-[150px] bg-gray-300" />
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
            <div className="avatar rounded-full bg-[var(--title-color)] min-h-12 min-w-12 flex justify-center items-center  font-[700]">
              {name?.slice(0, 2).toUpperCase()}
            </div>
            <div className="hidden lg:inline">
              <div className=" text-[16px] font-bold ">{name}</div>
              <div className="text-[12px] ">{email}</div>
            </div>
          </div>
          <div
            onClick={() => logoutMutate()}
            className="absolute inset-0 flex gap-4 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
          >
            <span className=" hidden lg:inline font-bold text-[16px]">
              Logout
            </span>
            <LogOutIcon color="var(--primary)" />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileSection;
