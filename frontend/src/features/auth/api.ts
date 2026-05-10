import { apiClient } from "@/lib/api/client";
import type { AuthTokens, AuthUser } from "@/types/auth";

type AuthResponse = {
  user: AuthUser;
  tokens: AuthTokens;
};

type LoginPayload = {
  email: string;
  password: string;
};

type SignUpPayload = {
  email: string;
  password: string;
};

export async function login(
  payload: LoginPayload,
): Promise<AuthResponse> {
  return apiClient<AuthResponse>("/auth/login/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function signUp(
  payload: SignUpPayload,
): Promise<AuthResponse> {
  return apiClient<AuthResponse>("/auth/signup/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getMe(
  accessToken: string,
): Promise<AuthUser> {
  return apiClient<AuthUser>("/auth/me/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
