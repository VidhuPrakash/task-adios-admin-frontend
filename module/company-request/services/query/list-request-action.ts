import { FetchError } from "@/helper/error";
import { useMutation } from "@tanstack/react-query";

interface Response {
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    description: string;
    website: string;
    requestedAt: string;
    country: string;
    address: string;
    total: number;
  }[];
}

interface tableType {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  description: string;
  website: string;
  requestedAt: string;
  country: string;
  address: string;
  total: number;
}
[];

interface RequestParams {
  keyword?: string;
  page: number;
  limit: number;
  pageSize: number;
}
/**
 * Fetches a list of company requests from the API.
 *
 * Sends a POST request to the "api/company/requests" endpoint with
 * the specified parameters and returns the response payload. Handles
 * potential errors by throwing a FetchError if the response is not
 * successful.
 *
 * @param {Object} options - The options for the request.
 * @param {string} [options.keyword=""] - The search keyword to filter company requests.
 * @param {number} options.page - The current page number for pagination.
 * @param {number} options.limit - The maximum number of requests per page.
 * @param {number} options.pageSize - The page size for pagination.
 * @returns {Promise<any>} The payload from the API response.
 * @throws {FetchError} Throws an error if the fetch operation fails.
 */
export const fetchCompanyRequests = async ({
  keyword = "",
  page,
  limit,
  pageSize,
}: {
  keyword?: string;
  page: number;
  limit: number;
  pageSize: number;
}): Promise<Response | null> => {
  try {
    const res = await fetch("api/company/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword, page, limit, pageSize }),
      credentials: "include",
    });
    const payload = await res.json().catch(() => null);

    if (!res.ok) {
      throw new FetchError(
        payload?.message ?? "Login failed",
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

export const useFetchCompanyRequestsMutation = (
  onSuccessCallback: (data: tableType[]) => void
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
