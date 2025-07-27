import { api } from "@/lib/api";
import { apiUrl } from "@/utils/api-url";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const backend = await fetch(apiUrl(api.auth.session), {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
      credentials: "include",
    });
    console.log(backend.status);
    // Create response with proper headers
    const response = new NextResponse(backend.body, {
      status: backend.status,
      headers: new Headers({
        "content-type":
          backend.headers.get("content-type") || "application/json",
      }),
    });

    // Forward set-cookie header if present
    const setCookie = backend.headers.get("set-cookie");
    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
      
    }

    return response;
  } catch (error) {
    console.error("Session endpoint error:", error);
    return NextResponse.json(
      { message: "Backend service unavailable" },
      { status: 503 }
    );
  }
}
