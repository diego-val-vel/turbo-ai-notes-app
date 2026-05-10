import { getAccessToken } from "@/features/auth/session";

const API_BASE_URL = "http://localhost:8000/api";

type ApiClientOptions = RequestInit & {
  auth?: boolean;
};

export async function apiClient<T>(
  endpoint: string,
  options: ApiClientOptions = {},
): Promise<T> {
  const {
    auth = true,
    headers,
    ...fetchOptions
  } = options;

  const accessToken = getAccessToken();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...(auth && accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {}),
      ...(headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json() as Promise<T>;
}
