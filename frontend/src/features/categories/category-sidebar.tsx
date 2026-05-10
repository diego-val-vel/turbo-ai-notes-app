import type { Category } from "@/types/category";
import type { Note } from "@/types/note";

type CategorySidebarProps = {
  categories: Category[];

  notes: Note[];

  selectedCategoryId: string | null;

  onSelectCategory: (
    categoryId: string | null,
  ) => void;
};

export function CategorySidebar({
  categories,
  notes,
  selectedCategoryId,
  onSelectCategory,
}: CategorySidebarProps) {
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() =>
          onSelectCategory(null)
        }
        className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
          selectedCategoryId === null
            ? "bg-neutral-900 text-white"
            : "border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
        }`}
      >
        <span>All Notes</span>

        <span>{notes.length}</span>
      </button>

      {categories.map((category) => {
        const totalNotes =
          notes.filter(
            (note) =>
              note.category.id ===
              category.id,
          ).length;

        const isSelected =
          selectedCategoryId ===
          category.id;

        return (
          <button
            key={category.id}
            onClick={() =>
              onSelectCategory(
                category.id,
              )
            }
            className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
              isSelected
                ? "bg-neutral-900 text-white"
                : "border border-neutral-200 bg-white hover:border-neutral-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor:
                    category.color,
                }}
              />

              <span
                className={`text-sm font-medium ${
                  isSelected
                    ? "text-white"
                    : "text-neutral-700"
                }`}
              >
                {category.name}
              </span>
            </div>

            <span
              className={`text-sm ${
                isSelected
                  ? "text-neutral-200"
                  : "text-neutral-400"
              }`}
            >
              {totalNotes}
            </span>
          </button>
        );
      })}
    </div>
  );
}
