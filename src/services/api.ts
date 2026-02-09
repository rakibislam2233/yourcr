/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie } from "@/utils/tokenHandlers";
import { getNewAccessToken } from "./auth.service";

const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

type FetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

const serverFetchHelper = async (
  endpoint: string,
  options: FetchOptions,
): Promise<any> => {
  const { headers, ...restOptions } = options;
  const accessToken = await getCookie("accessToken");

  //to stop recursion loop
  if (endpoint !== "/auth/refresh-token") {
    await getNewAccessToken();
  }

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...headers,
  };

  if (restOptions.body instanceof FormData) {
    delete requestHeaders["Content-Type"];
  }

  const config: RequestInit = {
    headers: requestHeaders,
    ...restOptions,
    cache: options.cache || "no-store",
  };

  try {
    const response = await fetch(`${BACKEND_API_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`,
      );
    }

    if (response.status === 204) {
      return {};
    }

    return await response.json();
  } catch (error) {
    console.error(`API Request Failed: ${endpoint}`, error);
    throw error;
  }
};

export const api = {
  get: async (endpoint: string, options: FetchOptions = {}): Promise<any> =>
    serverFetchHelper(endpoint, { ...options, method: "GET" }),

  post: async (
    endpoint: string,
    body: any,
    options: FetchOptions = {},
  ): Promise<any> => {
    const isFormData = body instanceof FormData;
    return serverFetchHelper(endpoint, {
      ...options,
      method: "POST",
      body: isFormData ? body : JSON.stringify(body),
    });
  },

  put: async (
    endpoint: string,
    body: any,
    options: FetchOptions = {},
  ): Promise<any> => {
    const isFormData = body instanceof FormData;
    return serverFetchHelper(endpoint, {
      ...options,
      method: "PUT",
      body: isFormData ? body : JSON.stringify(body),
    });
  },

  patch: async (
    endpoint: string,
    body: any,
    options: FetchOptions = {},
  ): Promise<any> => {
    const isFormData = body instanceof FormData;
    return serverFetchHelper(endpoint, {
      ...options,
      method: "PATCH",
      body: isFormData ? body : JSON.stringify(body),
    });
  },

  delete: async (endpoint: string, options: FetchOptions = {}): Promise<any> =>
    serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
};
