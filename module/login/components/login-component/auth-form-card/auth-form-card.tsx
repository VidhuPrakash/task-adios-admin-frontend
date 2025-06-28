import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AuthFormCard = () => {
  return (
    <div className="mt-50 shadow-2xl rounded-lg p-[48px]  w-[50%] flex flex-col gap-4 justify-center ">
      <div className="flex text-center text-[38px] font-[600] items-center justify-center">
        Welcome
      </div>
      <Input placeholder="Email" type="text" />
      <Input placeholder="Password" type="password" />
      <Button size={"lg"} variant={"secondary"} type="submit">
        Login
      </Button>
    </div>
  );
};

export default AuthFormCard;
