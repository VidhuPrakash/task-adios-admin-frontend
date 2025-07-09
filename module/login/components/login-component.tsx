import Image from "next/image";
import AuthFormCard from "./auth-form-card/auth-form-card";

const LoginComponent = () => {
  return (
    <div className="overflow-hidden flex flex-col p-[48px] h-screen">
      <div className="px-[50px] font-[700] text-[48px] text-[var(--title-color)]">
        <span className="text-[var(--title-color-second)]">T</span>ask
        <span className="text-[var(--title-color-second)]">A</span>
        dios
      </div>
      <div className="px-[100px] w-full flex items-start justify-between gap-[100px] min-h-screen">
        <Image src={"/auth-bg.png"} alt="task" width={700} height={700} />
        <AuthFormCard />
      </div>
    </div>
  );
};

export default LoginComponent;
