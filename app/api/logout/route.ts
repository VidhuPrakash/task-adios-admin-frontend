import { api } from "@/lib/api";
import { apiUrl } from "@/utils/api-url";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Handles HTTP POST requests by forwarding them to the backend service
 * and returns the backend's response to the client. The function extracts
 * the request body, sends it to the backend, and constructs a new response
 * based on the backend's response, including the status code and headers.
 * It sets the "Content-Type" header to "application/json" by default if
 * not provided by the backend. The response body is forwarded as-is.
 *
 * @param request - The incoming Next.js request object containing the request details.
 * @returns A NextResponse object containing the backend's response data.
 */

export async function POST(request: NextRequest) {
  const cookie = request.headers.get("cookie") ?? "";

  const backend = await fetch(apiUrl(api.auth.logout), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie,
    },
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

  const setCookie = backend.headers.get("set-cookie");
  if (setCookie) {
    res.headers.set("set-cookie", setCookie);
  }
  return res;
}
