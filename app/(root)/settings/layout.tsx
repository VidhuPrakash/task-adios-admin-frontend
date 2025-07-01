import SettingsLayout from "@/module/app/components/settings-layout/settings-layout";

export default function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pt-[30px]">
      <SettingsLayout />
      {children}
    </div>
  );
}
