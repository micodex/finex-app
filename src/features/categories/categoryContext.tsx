import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/storage";
import type { Category } from "@/types/category";

import { DEFAULT_CATEGORIES } from "./defaultCategories";

interface CategoryContextValue {
  categories: Category[];

  addCategory: (
    category: Omit<Category, "id" | "createdAt" | "updatedAt">,
  ) => void;

  updateCategory: (
    id: string,
    updates: Partial<Omit<Category, "id" | "createdAt" | "updatedAt">>,
  ) => void;

  deleteCategory: (id: string) => void;

  getCategoryById: (id: string) => Category | undefined;
}

const CategoryContext = createContext<CategoryContextValue | null>(null);

interface CategoryProviderProps {
  children: ReactNode;
}

export function CategoryProvider({ children }: CategoryProviderProps) {
  const [categories, setCategories] = useLocalStorage<Category[]>(
    STORAGE_KEYS.categories,
    DEFAULT_CATEGORIES,
  );

  const addCategory = useCallback(
    (category: Omit<Category, "id" | "createdAt" | "updatedAt">) => {
      const now = new Date().toISOString();

      const newCategory: Category = {
        ...category,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      };

      setCategories((current) => [...current, newCategory]);
    },
    [setCategories],
  );

  const updateCategory = useCallback(
    (
      id: string,
      updates: Partial<Omit<Category, "id" | "createdAt" | "updatedAt">>,
    ) => {
      setCategories((current) =>
        current.map((category) =>
          category.id === id
            ? {
                ...category,
                ...updates,
                updatedAt: new Date().toISOString(),
              }
            : category,
        ),
      );
    },
    [setCategories],
  );

  const deleteCategory = useCallback(
    (id: string) => {
      setCategories((current) =>
        current.filter((category) => category.id !== id),
      );
    },
    [setCategories],
  );

  const getCategoryById = useCallback(
    (id: string) => categories.find((category) => category.id === id),
    [categories],
  );

  const value = useMemo(
    () => ({
      categories,
      addCategory,
      updateCategory,
      deleteCategory,
      getCategoryById,
    }),
    [categories, addCategory, updateCategory, deleteCategory, getCategoryById],
  );

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useCategories must be used inside CategoryProvider");
  }

  return context;
}
