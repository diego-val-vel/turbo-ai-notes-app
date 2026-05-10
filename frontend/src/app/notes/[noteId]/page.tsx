"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  getNote,
  updateNote,
} from "@/features/notes/api";

import { getCategories } from "@/features/categories/api";
import { formatNoteDate } from "@/lib/utils/date";

import {
  clearSession,
  isAuthenticated,
} from "@/features/auth/session";

import type { Note } from "@/types/note";
import type { Category } from "@/types/category";

export default function NoteEditorPage() {
  const params = useParams();
  const router = useRouter();
  const noteId = params.noteId as string;
  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [isReadyToAutosave, setIsReadyToAutosave] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    async function loadNote() {
      try {
        const response = await getNote(noteId);

        setNote(response);
        setTitle(response.title);
        setContent(response.content);

        setSelectedCategoryId(
          response.category.id,
        );

        const categoriesResponse =
          await getCategories();

        setCategories(categoriesResponse);

        setIsReadyToAutosave(true);
      } catch (error) {
        console.error(error);
        clearSession();
        router.replace("/login");
      }
    }

    loadNote();
  }, [noteId, router]);

  const saveNote = useCallback(
    async function saveNote() {
      try {
        setSaveStatus("saving");

        const updatedNote =
          await updateNote(noteId, {
            title,
            content,
            category_id:
              selectedCategoryId,
          });

        setNote(updatedNote);
        setHasUnsavedChanges(false);
        setSaveStatus("saved");
      } catch (error) {
        console.error(error);
        setSaveStatus("error");
      }
    },
    [
      noteId,
      title,
      content,
      selectedCategoryId,
    ],
  );

  useEffect(() => {
    if (
      !isReadyToAutosave ||
      !hasUnsavedChanges
    ) {
      return;
    }

    const timeout = setTimeout(() => {
      saveNote();
    }, 800);

    return () => clearTimeout(timeout);
  }, [
    isReadyToAutosave,
    hasUnsavedChanges,
    saveNote,
  ]);

  useEffect(() => {
    if (saveStatus !== "saved") {
      return;
    }

    const timeout = setTimeout(() => {
      setSaveStatus("idle");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [saveStatus]);

  if (!note) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FDF7F1]">
        <p className="text-neutral-500">
          Loading note...
        </p>
      </main>
    );
  }

  const selectedCategory = categories.find(
    (category) =>
      category.id === selectedCategoryId,
  );

  return (
    <main
      className="min-h-screen px-6 py-10 transition-colors"
      style={{
        backgroundColor:
          selectedCategory?.color ??
          "#FDF7F1",
      }}
    >
      <div className="mx-auto max-w-4xl rounded-[32px] bg-white p-10 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="space-y-1">
              <p className="text-sm text-neutral-400">
                Last edited{" "}
                {formatNoteDate(
                  note.updated_at,
                )}
              </p>

              {saveStatus === "saving" && (
                <p className="text-sm text-amber-500">
                  Saving...
                </p>
              )}

              {saveStatus === "saved" && (
                <p className="text-sm text-emerald-600">
                  Saved
                </p>
              )}

              {saveStatus === "error" && (
                <p className="text-sm text-red-500">
                  Error saving note
                </p>
              )}
            </div>
          </div>

          <Link
            href="/notes"
            className="rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Back to notes
          </Link>
        </div>

        <input
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setHasUnsavedChanges(true);
          }}
          placeholder="Note title"
          className="w-full border-none bg-transparent text-4xl font-semibold text-neutral-900 outline-none"
        />

        <select
          value={selectedCategoryId}
          onChange={(event) => {
            setSelectedCategoryId(
              event.target.value,
            );
            setHasUnsavedChanges(true);
          }}
          className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-700 outline-none"
        >
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>

        <textarea
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
            setHasUnsavedChanges(true);
          }}
          placeholder="Start typing..."
          className="mt-8 min-h-[400px] w-full resize-none border-none bg-transparent text-lg leading-8 text-neutral-600 outline-none"
        />
      </div>
    </main>
  );
}
