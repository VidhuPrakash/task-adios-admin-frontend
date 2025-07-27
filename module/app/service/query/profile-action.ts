import { FetchError } from "../../../../helper/error";

interface PayLoadResponse {
  message: string;
}

export const logout = async (): Promise<PayLoadResponse> => {
  const res = await fetch("api/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    cache: "no-store",
  });

  const payload = await res.json().catch(() => null);
  if (!res.ok) {
    throw new FetchError(
      payload?.message ?? "data fetch failed",
      res.status,
      payload?.errors
    );
  }

  return payload;
};
