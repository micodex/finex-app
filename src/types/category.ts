export type CategoryType = "income" | "expense" | "both";

export interface Category {
  id: string;
  name: string;
  icon: string;
  type: CategoryType;
  createdAt: string;
  updatedAt: string;
}
