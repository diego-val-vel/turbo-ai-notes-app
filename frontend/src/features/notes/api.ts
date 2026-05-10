import { apiClient } from "@/lib/api/client";
import { getAccessToken } from "@/features/auth/session";
import type { Note } from "@/types/note";

function authHeaders() {
  const accessToken = getAccessToken();

  return {
    Authorization: `Bearer ${accessToken}`,
  };
}

export async function getNotes(): Promise<Note[]> {
  return apiClient<Note[]>("/notes/", {
    method: "GET",
    headers: authHeaders(),
  });
}

export async function createNote(): Promise<Note> {
  return apiClient<Note>("/notes/", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      title: "",
      content: "",
    }),
  });
}

export async function getNote(
  noteId: string,
): Promise<Note> {
  return apiClient<Note>(`/notes/${noteId}/`, {
    method: "GET",
    headers: authHeaders(),
  });
}

type UpdateNotePayload = {
  title?: string;
  content?: string;
  category_id?: string;
};

export async function updateNote(
  noteId: string,
  payload: UpdateNotePayload,
): Promise<Note> {
  return apiClient<Note>(`/notes/${noteId}/`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
}
