/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteCookie, getCookie, setCookie } from "@/utils/tokenHandlers";
const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

type FetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  status: number;
}

const serverFetchHelper = async (
  endpoint: string,
  options: FetchOptions,
): Promise<ApiResponse> => {
  const { headers, ...restOptions } = options;
  const accessToken = await getCookie("accessToken");

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
    let response = await fetch(`${BACKEND_API_URL}${endpoint}`, config);

    // Refresh Token Logic - Handle 401 by attempting token refresh
    if (
      response.status === 401 &&
      endpoint !== "/auth/login" &&
      endpoint !== "/auth/refresh-token"
    ) {
      const refreshToken = await getCookie("refreshToken");

      if (refreshToken) {
        try {
          // Attempt to refresh the token
          const refreshResponse = await fetch(
            `${BACKEND_API_URL}/auth/refresh-token`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ refreshToken }),
            },
          );
          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            console.log("Refresh Data", refreshData);
            const newAccessToken = refreshData.data?.accessToken;
            const newRefreshToken = refreshData.data?.refreshToken;

            if (newAccessToken) {
              // Update the authorization header with new token
              (config.headers as Record<string, string>)["Authorization"] =
                `Bearer ${newAccessToken}`;
              const isProduction = process.env.NODE_ENV === "production";

              await setCookie("accessToken", newAccessToken, {
                secure: isProduction,
                httpOnly: true,
                maxAge: 3600,
                path: "/",
              });

              if (newRefreshToken) {
                await setCookie("refreshToken", newRefreshToken, {
                  secure: isProduction,
                  httpOnly: true,
                  maxAge: 3600 * 24 * 90,
                  path: "/",
                });
              }
              // Update role cookie if available
              if (refreshData.data?.user?.role) {
                await setCookie("userRole", refreshData.data.user.role, {
                  secure: isProduction,
                  httpOnly: true,
                  maxAge: 3600 * 24 * 90,
                  path: "/",
                });
              }
              // Retry the original request with new token
              response = await fetch(`${BACKEND_API_URL}${endpoint}`, config);
            }
          } else {
            // Refresh token is invalid or expired - clear all cookies
            await deleteCookie("accessToken");
            await deleteCookie("refreshToken");
            await deleteCookie("userRole");
          }
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          await deleteCookie("accessToken");
          await deleteCookie("refreshToken");
          await deleteCookie("userRole");
        }
      }
    }

    const data = await response.json().catch(() => ({}));

    if (response.status === 204) {
      return {
        success: true,
        message: "Success",
        data: {} as any,
        status: 204,
      };
    }

    return {
      success: response.ok,
      message:
        data?.message ||
        (response.ok ? "Success" : `HTTP error! status: ${response.status}`),
      data: data?.data ?? data,
      status: response.status,
    };
  } catch (error: any) {
    console.error(`API Request Failed: ${endpoint}`, error);
    return {
      success: false,
      message: error.message || "Something went wrong",
      data: null as any,
      status: 500,
    };
  }
};

export const api = {
  get: async <T = any>(
    endpoint: string,
    options: FetchOptions = {},
  ): Promise<ApiResponse<T>> =>
    serverFetchHelper(endpoint, { ...options, method: "GET" }),

  post: async <T = any>(
    endpoint: string,
    body: any,
    options: FetchOptions = {},
  ): Promise<ApiResponse<T>> => {
    const isFormData = body instanceof FormData;
    return serverFetchHelper(endpoint, {
      ...options,
      method: "POST",
      body: isFormData ? body : JSON.stringify(body),
    });
  },

  put: async <T = any>(
    endpoint: string,
    body: any,
    options: FetchOptions = {},
  ): Promise<ApiResponse<T>> => {
    const isFormData = body instanceof FormData;
    return serverFetchHelper(endpoint, {
      ...options,
      method: "PUT",
      body: isFormData ? body : JSON.stringify(body),
    });
  },

  patch: async <T = any>(
    endpoint: string,
    body: any,
    options: FetchOptions = {},
  ): Promise<ApiResponse<T>> => {
    const isFormData = body instanceof FormData;
    return serverFetchHelper(endpoint, {
      ...options,
      method: "PATCH",
      body: isFormData ? body : JSON.stringify(body),
    });
  },

  delete: async <T = any>(
    endpoint: string,
    options: FetchOptions = {},
  ): Promise<ApiResponse<T>> =>
    serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
};
