"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { login } from "../../services/mutation/login-action";
import { FetchError } from "../../../../helper/error";
import { useRouter } from "nextjs-toploader/app";
import useUserStore from "@/store/user-store";

const AuthFormCard = () => {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string> | null>(
    null
  );
  const setUser = useUserStore((state) => state.setUser);
  const route = useRouter();

  const {
    mutate: loginMutate,
    isPending,
    error,
    data,
    isSuccess,
  } = useMutation<
    Awaited<ReturnType<typeof login>>,
    FetchError,
    { email: string; password: string }
  >({
    mutationFn: ({ email, password }) => login(email, password),

    onError: (err) => {
      // err is now typed as FetchError
      if (err.fieldErrors) {
        setFieldErrors(
          Object.fromEntries(
            err.fieldErrors.map((fe) => [fe.field, fe.message])
          )
        );
      }
    },

    onSuccess: (data) => {
      console.log(data);
      const { name, email, role, permissions } = data.data;
      setUser(name, email, role, permissions || []);

      route.push("/dashboard");
    },
  });

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Get form data without state
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Client-side validation
    if (!email.trim()) {
      setFieldErrors({ email: "Email is required" });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFieldErrors({ email: "Please enter a valid email address" });
      return;
    }

    if (!password.trim()) {
      setFieldErrors({ password: "Password is required" });
      return;
    }

    if (password.length < 6) {
      setFieldErrors({ password: "Password must be at least 6 characters" });
      return;
    }

    // Call mutation if validation passes
    loginMutate({ email, password });
  };

  return (
    <form
      onSubmit={handleLogin}
      onChange={() => setFieldErrors(null)}
      className="lg:mt-50  shadow-2xl rounded-lg p-[48px]  lg:w-[50%] flex flex-col gap-4 justify-center "
    >
      <div className="flex text-center text-[38px] font-[600] items-center justify-center">
        Welcome
      </div>
      <Input placeholder="Email" type="text" name="email" />
      <Input
        placeholder="Password"
        name="password"
        minLength={6}
        type="password"
      />
      <Button size={"lg"} variant={"secondary"} type="submit">
        Login
      </Button>
      {(fieldErrors?.email || fieldErrors?.password) && (
        <p className="text-sm text-red-500">
          {fieldErrors.email || fieldErrors?.password}
        </p>
      )}
    </form>
  );
};

export default AuthFormCard;
