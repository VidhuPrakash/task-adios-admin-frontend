// app/api/auth/login/route.ts  (Next.js 15 App Router)
import { api } from "@/lib/api";
import { apiUrl } from "@/utils/api-url";
import { type NextRequest, NextResponse } from "next/server";

/**
 * This route forwards the request to the backend, and then forwards the response from the backend back to the client.
 * It is used to handle login requests, because the client needs to receive the session cookie set by the backend.
 * The response is forwarded 1-to-1, except for the "content-type" header which is set to "application/json" by default.
 * The "set-cookie" header is also forwarded so that the browser receives the session cookie.
 */
export async function POST(request: NextRequest) {
  const body = await request.json();

  const backend = await fetch(apiUrl(api.auth.login), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });

  // Forward body, status code, and relevant headers 1‑to‑1
  const text = await backend.text();

  const res = new NextResponse(text, {
    status: backend.status,
    headers: {
      "content-type": backend.headers.get("content-type") ?? "application/json",
    },
  });

  // Forward Set‑Cookie so the browser still receives session cookies
  const setCookie = backend.headers.get("set-cookie");
  if (setCookie) res.headers.append("set-cookie", setCookie);

  return res;
}
