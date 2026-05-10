import { apiClient } from "@/lib/api/client";
import type { Note } from "@/types/note";

export async function getNotes(): Promise<Note[]> {
  return apiClient<Note[]>("/notes/", {
    method: "GET",
  });
}

export async function createNote(
  categoryId: string,
): Promise<Note> {
  return apiClient<Note>("/notes/create/", {
    method: "POST",
    body: JSON.stringify({
      category_id: categoryId,
    }),
  });
}

export async function getNote(
  noteId: string,
): Promise<Note> {
  return apiClient<Note>(`/notes/${noteId}/`, {
    method: "GET",
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
  return apiClient<Note>(`/notes/${noteId}/update/`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
