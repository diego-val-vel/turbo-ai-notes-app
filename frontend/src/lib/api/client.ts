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

  const data = await response.json();

  if (!response.ok) {
    let errorMessage = "API request failed";

    if (data.detail) {
      errorMessage = data.detail;
    } else if (
      data.non_field_errors?.length
    ) {
      errorMessage = data.non_field_errors[0];
    } else {
      const firstKey = Object.keys(data)[0];
      const firstValue = data[firstKey];

      if (
        Array.isArray(firstValue) &&
        firstValue.length
      ) {
        errorMessage = firstValue[0];
      }
    }

    const apiError = new Error(
      errorMessage,
    );

    apiError.name = "ApiError";

    throw apiError;
  }

  return data as T;
}
