"use client";

import { useRouter } from "next/navigation";
import { formatNoteDate } from "@/lib/utils/date";
import type { Note } from "@/types/note";

type NoteCardProps = {
  note: Note;
};

export function NoteCard({
  note,
}: NoteCardProps) {
  const router = useRouter();

  return (
    <article
      onClick={() =>
        router.push(`/notes/${note.id}`)
      }
      className="cursor-pointer rounded-[28px] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
      style={{
        backgroundColor: `${note.category.color}20`,
      }}
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">
          {note.category.name}
        </span>

        <span className="text-xs text-neutral-400">
          {formatNoteDate(
            note.updated_at,
          )}
        </span>
      </div>

      <h3 className="line-clamp-2 text-xl font-semibold text-neutral-900">
        {note.title || "Untitled note"}
      </h3>

      <p className="mt-3 line-clamp-4 whitespace-pre-wrap text-sm leading-7 text-neutral-600">
        {note.content.trim() || "No content"}
      </p>
    </article>
  );
}
