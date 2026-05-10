import { beforeEach, describe, expect, it, vi } from "vitest";
import { saveSession } from "@/features/auth/session";
import { apiClient } from "./client";

describe("apiClient", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("adds the authorization header when auth is enabled and an access token exists", async () => {
    saveSession({
      access: "access-token",
      refresh: "refresh-token",
    });

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1 }),
    } as Response);

    await apiClient("/notes/");

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/notes/",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer access-token",
        }),
      }),
    );
  });

  it("does not add the authorization header when auth is disabled", async () => {
    saveSession({
      access: "access-token",
      refresh: "refresh-token",
    });

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1 }),
    } as Response);

    await apiClient("/auth/login/", {
      auth: false,
    });

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/auth/login/",
      expect.objectContaining({
        headers: expect.not.objectContaining({
          Authorization: expect.any(String),
        }),
      }),
    );
  });

  it("uses detail as the API error message", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        detail: "Authentication failed.",
      }),
    } as Response);

    await expect(apiClient("/notes/")).rejects.toMatchObject({
      name: "ApiError",
      message: "Authentication failed.",
    });
  });

  it("uses the first non_field_errors item as the API error message", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        non_field_errors: ["Invalid credentials."],
      }),
    } as Response);

    await expect(apiClient("/auth/login/")).rejects.toMatchObject({
      name: "ApiError",
      message: "Invalid credentials.",
    });
  });

  it("uses the first validation array item as the API error message", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        email: ["User with this email already exists."],
      }),
    } as Response);

    await expect(apiClient("/auth/sign-up/")).rejects.toMatchObject({
      name: "ApiError",
      message: "User with this email already exists.",
    });
  });

  it("returns parsed data for successful responses", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        title: "Test note",
      }),
    } as Response);

    await expect(apiClient("/notes/1/")).resolves.toEqual({
      id: 1,
      title: "Test note",
    });
  });
});
