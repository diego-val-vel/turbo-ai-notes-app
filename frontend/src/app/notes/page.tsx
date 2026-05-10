"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { isAuthenticated } from "@/features/auth/session";
import { getCategories } from "@/features/categories/api";

import {
  createNote,
  getNotes,
} from "@/features/notes/api";

import { NoteCard } from "@/features/notes/note-card";
import { ROUTES } from "@/lib/constants/routes";
import type { Category } from "@/types/category";
import type { Note } from "@/types/note";

export default function NotesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedCategoryId, setSelectedCategoryId,] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace(ROUTES.LOGIN);

      return;
    }

    async function loadData() {
      try {
        const [categoriesResponse, notesResponse] =
          await Promise.all([
            getCategories(),
            getNotes(),
          ]);

        setCategories(categoriesResponse);

        setNotes(notesResponse);
      } catch (error) {
        console.error(error);
      }
    }

    loadData();
  }, [router]);

  const filteredNotes =
    selectedCategoryId === null
      ? notes
      : notes.filter(
        (note) =>
          note.category.id ===
          selectedCategoryId,
      );

  return (
    <AppShell
      categories={categories}
      notes={notes}
      selectedCategoryId={
        selectedCategoryId
      }
      onSelectCategory={
        setSelectedCategoryId
      }
    >
      {filteredNotes.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-semibold text-neutral-900">
              {notes.length === 0
                ? "No notes yet"
                : "No notes in this category"}
            </h2>

            <p className="mt-3 text-neutral-500">
              {notes.length === 0
                ? "Create your first note to start organizing your ideas."
                : "Try selecting another category or create a new note."}
            </p>

            <button
              onClick={async () => {
                try {
                  if (categories.length === 0) {
                    return;
                  }

                  const defaultCategory =
                    categories[0];

                  const note = await createNote(
                    defaultCategory.id,
                  );

                  router.push(`/notes/${note.id}`);
                } catch (error) {
                  console.error(error);
                }
              }}
              className="mt-8 h-12 rounded-2xl bg-neutral-900 px-6 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Create new note
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
            />
          ))}
        </div>
      )}
    </AppShell>
  );
}
