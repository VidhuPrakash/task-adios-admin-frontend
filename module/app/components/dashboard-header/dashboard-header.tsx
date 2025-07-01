"use client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function DashboardHeader() {
  const path = usePathname();

  const pageTitle = useMemo(() => {
    if (path === "/" || !path) return "Home";

    const firstSegment = path.split("/")[1] ?? "";

    return firstSegment
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }, [path]);
  return (
    <div className="fixed w-[100%] p-[30px] border-b text-[24px] font-[600]">
      {pageTitle}
    </div>
  );
}
