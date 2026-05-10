import type { Category } from "./category";

export type Note = {
  id: string;
  title: string;
  content: string;
  category: Category;
  created_at: string;
  updated_at: string;
};
