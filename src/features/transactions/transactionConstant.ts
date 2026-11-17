import type { Transaction } from "@/types/transaction";

export const SAMPLE_TRANSACTIONS: Omit<
  Transaction,
  "id" | "createdAt" | "updatedAt"
>[] = [
  {
    title: "خرید سوپرمارکت",
    amount: 850000,
    currency: "IRT",
    type: "expense",
    categoryId: "shopping",
    description: "خرید هفتگی خانه",
    tags: ["خانه", "خرید"],
    date: "2026-11-16",
  },
  {
    title: "حقوق ماهانه",
    amount: 35000000,
    currency: "IRT",
    type: "income",
    categoryId: null,
    description: "حقوق ماه مهر",
    tags: ["حقوق", "کار"],
    date: "2026-11-15",
  },
  {
    title: "هزینه تاکسی",
    amount: 180000,
    currency: "IRT",
    type: "expense",
    categoryId: "transport",
    description: "",
    tags: ["رفت‌وآمد"],
    date: "2026-11-14",
  },
];
