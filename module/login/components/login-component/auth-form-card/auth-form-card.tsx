"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const AuthFormCard = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {};

  return (
    <div className="mt-50 shadow-2xl rounded-lg p-[48px]  w-[50%] flex flex-col gap-4 justify-center ">
      <div className="flex text-center text-[38px] font-[600] items-center justify-center">
        Welcome
      </div>
      <Input
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <Button
        onClick={handleLogin}
        size={"lg"}
        variant={"secondary"}
        type="submit"
      >
        Login
      </Button>
    </div>
  );
};

export default AuthFormCard;
