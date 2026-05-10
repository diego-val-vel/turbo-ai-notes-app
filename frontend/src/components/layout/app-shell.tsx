import { CategorySidebar } from "@/features/categories/category-sidebar";
import type { Category } from "@/types/category";
import type { Note } from "@/types/note";

type AppShellProps = {
  children: React.ReactNode;

  categories: Category[];

  notes: Note[];

  selectedCategoryId: string | null;

  onSelectCategory: (
    categoryId: string | null,
  ) => void;
};

export function AppShell({
  children,
  categories,
  notes,
  selectedCategoryId,
  onSelectCategory,
}: AppShellProps) {
  return (
    <main className="min-h-screen bg-[#FDF7F1]">
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        <aside className="w-[280px] border-r border-neutral-200 bg-[#FFF9F3] p-6">
          <div className="mb-10">
            <h1 className="text-2xl font-semibold text-neutral-900">
              Turbo Notes
            </h1>

            <p className="mt-2 text-sm text-neutral-500">
              Organize your thoughts beautifully.
            </p>
          </div>

          <CategorySidebar
            categories={categories}
            notes={notes}
            selectedCategoryId={
              selectedCategoryId
            }
            onSelectCategory={
              onSelectCategory
            }
          />
        </aside>

        <section className="flex-1 p-8">
          {children}
        </section>
      </div>
    </main>
  );
}
