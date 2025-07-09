import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";

const SettingsAccount = () => {
  return (
    <div className="  m-[35px] gap-10 grid lg:grid-cols-2">
      <div className="bg-[var(--background-second)] rounded-2xl p-[40px] flex flex-col gap-[10px]">
        <div className="avatar rounded-full bg-[var(--title-color)] min-h-44 w-44 flex justify-center items-center text-[40px] font-[700]">
          NA
        </div>
        <Input placeholder="Name" />
        <Input type="email" placeholder="Email" />
        <Input type="tel" placeholder="Phone number" />
        <Input type="password" placeholder="Password" />
        <button className="bg-[var(--primary)] text-white rounded-[8px] py-[12px] px-[20px] font-[500] text-[14px] mt-[20px]">
          Save
        </button>
      </div>
      <div
        className="w-[50%] h-fit  items-center
        relative flex  gap-3 p-6 rounded-xl border border-amber-300
        bg-amber-50 text-amber-800 shadow-sm
        animate-[fadeIn_300ms_ease-out]
        dark:bg-amber-900/20 dark:text-amber-200 dark:border-amber-600
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      "
      >
        <AlertTriangle className=" shrink-0 mt-0.5" />
        <div className="flex items-center flex-col">
          <span className="flex items-center font-semibold">Heads‑up!</span>
          <span className=" text-sm leading-snug">
            <p className="font-semibold mb-1">
              Important: Account Changes Affect Your Access
            </p>
            <p className="text-sm leading-snug">
              Updating your name, email, phone number, or password will
              automatically sign you out from all other devices for security
              reasons.
              <br />
              <br />
              You will be required to sign in again to continue using your
              account. Make sure you remember your updated login credentials
              before saving the changes.
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SettingsAccount;
