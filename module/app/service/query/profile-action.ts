import { LoginError } from "../../../../helper/login-error";

type Profile = {
  email: string;
  name: string;
};

interface PayLoadResponse {
  message: string;
  data: Profile;
}

export const profileSession = async (): Promise<PayLoadResponse> => {
  const res = await fetch("api/auth/session", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    cache: "no-store",
  });

  const payload = await res.json().catch(() => null);
  if (!res.ok) {
    throw new LoginError(
      payload?.message ?? "data fetch failed",
      res.status,
      payload?.errors
    );
  }

  return payload;
};
