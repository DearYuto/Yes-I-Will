import { createQueryString, QueryValue } from "../utils/query-string";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface RequestConfig extends RequestInit {
  params?: Record<string, unknown>;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getTokenFromBrowser(): string | null {
    if (typeof document === "undefined") return null;

    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((row) => row.startsWith("token="));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
  }

  private async getTokenFromServer(): Promise<string | null> {
    try {
      const { cookies } = await import("next/headers");
      const cookiesList = await cookies();
      return cookiesList.get("token")?.value || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private async getToken(): Promise<string | null> {
    // client
    if (typeof window !== "undefined") {
      return this.getTokenFromBrowser();
    }

    // Server
    return await this.getTokenFromServer();
  }

  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { params, ...fetchConfig } = config;

    let url = `${this.baseURL}${endpoint}`;

    if (params) {
      const queryString = createQueryString(
        params as Record<string, QueryValue>
      );

      if (queryString) url += `?${queryString}`;
    }

    const token = await this.getToken();

    const defaultHeaders: HeadersInit = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(url, {
      ...fetchConfig,
      headers: {
        ...defaultHeaders,
        ...fetchConfig.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));

      throw new Error(
        error.message || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return await response.json();
  }

  async get<T>(
    endpoint: string,
    params?: Record<string, QueryValue>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: "GET",
      cache: "no-store",
      params,
    });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
