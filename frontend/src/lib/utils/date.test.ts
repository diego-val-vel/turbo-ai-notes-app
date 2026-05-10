import { describe, expect, it, vi } from "vitest";
import { formatNoteDate } from "./date";

describe("formatNoteDate", () => {
  it("returns Today when the note was edited today", () => {
    vi.setSystemTime(new Date("2026-05-10T15:30:00"));

    expect(formatNoteDate("2026-05-10T01:00:00")).toBe("Today");
  });

  it("returns Yesterday when the note was edited yesterday", () => {
    vi.setSystemTime(new Date("2026-05-10T15:30:00"));

    expect(formatNoteDate("2026-05-09T23:59:00")).toBe("Yesterday");
  });

  it("returns month and day without year for older notes", () => {
    vi.setSystemTime(new Date("2026-05-10T15:30:00"));

    expect(formatNoteDate("2026-04-15T12:00:00")).toBe("Apr 15");
  });

  it("compares dates by calendar day instead of elapsed hours", () => {
    vi.setSystemTime(new Date("2026-05-10T00:10:00"));

    expect(formatNoteDate("2026-05-09T23:50:00")).toBe("Yesterday");
  });
});
