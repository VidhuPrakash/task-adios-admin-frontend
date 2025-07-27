import { FetchError } from "@/helper/error";
import { useMutation } from "@tanstack/react-query";

export interface TableType {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  description: string;
  website: string;
  requestedAt: string;
  status: string;
  country: string;
  address: string;
  total: number;
  employees: number;
  projects: number;
}

export interface Response {
  message: string;
  data: TableType[];
}

// Query params interface
export interface RequestParams {
  keyword?: string;
  page: number;
  limit: number;
  pageSize: number;
}

/**
 * Fetches a list of company requests from the API.
 * @param {RequestParams} params - Pagination and filter params
 * @returns {Promise<Response | null>}
 * @throws {FetchError} if response fails
 */
export const fetchCompanyRequests = async ({
  keyword = "",
  page,
  limit,
  pageSize,
}: RequestParams): Promise<Response | null> => {
  try {
    const res = await fetch("/api/company/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword, page, limit, pageSize }),
      credentials: "include",
    });

    const payload = await res.json().catch(() => null);

    if (!res.ok) {
      throw new FetchError(
        payload?.message ?? "API error",
        res.status,
        payload?.errors
      );
    }
    return payload;
  } catch (error) {
    console.error("Error fetching company requests:", error);
    return null;
  }
};

// Mutation hook for react-query
export const useFetchCompanyRequestsMutation = (
  onSuccessCallback: (data: TableType[]) => void
) => {
  return useMutation({
    mutationKey: ["fetchCompanyRequests"],
    mutationFn: (params: RequestParams) => fetchCompanyRequests(params),
    onSuccess: (data) => {
      onSuccessCallback(data?.data || []);
    },
    onError: (error) => {
      if (error instanceof FetchError) {
        console.error("API Error:", error.message, error.status);
      } else {
        console.error("Unknown Error:", error);
      }
    },
  });
};
