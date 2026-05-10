import { describe, expect, it } from "vitest";

import {
  clearSession,
  getAccessToken,
  getRefreshToken,
  isAuthenticated,
  saveSession,
} from "./session";

describe("session", () => {
  it("saves access and refresh tokens", () => {
    saveSession({
      access: "access-token",
      refresh: "refresh-token",
    });

    expect(getAccessToken()).toBe("access-token");
    expect(getRefreshToken()).toBe("refresh-token");
  });

  it("clears stored tokens", () => {
    saveSession({
      access: "access-token",
      refresh: "refresh-token",
    });

    clearSession();

    expect(getAccessToken()).toBeNull();
    expect(getRefreshToken()).toBeNull();
  });

  it("returns true when an access token exists", () => {
    saveSession({
      access: "access-token",
      refresh: "refresh-token",
    });

    expect(isAuthenticated()).toBe(true);
  });

  it("returns false when there is no access token", () => {
    expect(isAuthenticated()).toBe(false);
  });
});
