import { api } from "@/lib/api";
import { apiUrl } from "@/utils/api-url";
import { LoginError } from "../helper/login-error";

export const login = async (email: string, password: string) => {
  const res = await fetch("api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
    cache: "no-store",
  });

  const payload = await res.json().catch(() => null);
  if (!res.ok) {
    throw new LoginError(
      payload?.message ?? "Login failed",
      res.status,
      payload?.errors
    );
  }

  return payload;
};
