"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelectedLayoutSegment } from "next/navigation";
import { useRouter } from "next/navigation";

export default function SettingsLayout() {
  const segment = useSelectedLayoutSegment();
  const router = useRouter();

  const currentTab = segment ?? "account";

  return (
    <Tabs
      value={currentTab}
      onValueChange={(value) => router.push(`/settings/${value}`)}
      className="w-full overflow-scroll pl-[30px]"
    >
      <TabsList>
        <TabsTrigger className="w-[300px] " value="account">
          Account
        </TabsTrigger>
        <TabsTrigger value="task-status" className="w-[300px]">
          Task&nbsp;status
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
