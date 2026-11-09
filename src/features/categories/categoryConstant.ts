// icon maps
export const ICON_OPTIONS = [
  { value: "Utensils", label: "غذا و رستوران" },
  { value: "ShoppingBag", label: "خرید" },
  { value: "Car", label: "حمل‌ونقل" },
  { value: "House", label: "خانه" },
  { value: "HeartPulse", label: "سلامت" },
  { value: "GraduationCap", label: "آموزش" },
  { value: "Gamepad2", label: "تفریح" },
  { value: "Shirt", label: "پوشاک" },
  { value: "Laptop", label: "تکنولوژی" },
  { value: "Receipt", label: "قبوض و اشتراک‌ها" },
  { value: "Wallet", label: "حقوق" },
  { value: "BriefcaseBusiness", label: "کسب‌وکار" },
  { value: "Gift", label: "هدیه" },
  { value: "ChartNoAxesCombined", label: "سرمایه‌گذاری" },
  { value: "CircleDollarSign", label: "درآمد" },
  { value: "Coffee", label: "کافه" },
  { value: "PiggyBank", label: "پس‌انداز" },
  { value: "Tag", label: "سایر" },
];

export type CategoryFilter = "all" | "income" | "expense";
export const FILTER_OPTIONS: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "همه" },
  { value: "expense", label: "هزینه‌ها" },
  { value: "income", label: "درآمدها" },
];

import {
  BriefcaseBusiness,
  Car,
  ChartNoAxesCombined,
  CircleDollarSign,
  Coffee,
  Ellipsis,
  Gift,
  Gamepad2,
  HeartPulse,
  House,
  Laptop,
  Receipt,
  ShoppingBag,
  Shirt,
  Tag,
  Utensils,
  Wallet,
  GraduationCap,
  PiggyBank,
  type LucideIcon,
} from "lucide-react";
export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Utensils,
  ShoppingBag,
  Car,
  House,
  HeartPulse,
  GraduationCap,
  Gamepad2,
  Shirt,
  Laptop,
  Receipt,
  Ellipsis,
  Wallet,
  BriefcaseBusiness,
  Gift,
  ChartNoAxesCombined,
  CircleDollarSign,
  Coffee,
  PiggyBank,
  Tag,
};

import type { Category } from "@/types/category";

export const DEFAULT_CATEGORIES: Category[] = [
  // ─────────────────────────────
  // Expenses
  // ─────────────────────────────

  {
    id: "food",
    name: "غذا و رستوران",
    icon: "Utensils",
    type: "expense",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "shopping",
    name: "خرید",
    icon: "ShoppingBag",
    type: "expense",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "transport",
    name: "حمل‌ونقل",
    icon: "Car",
    type: "expense",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "home",
    name: "خانه",
    icon: "House",
    type: "expense",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "health",
    name: "سلامت",
    icon: "HeartPulse",
    type: "expense",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "education",
    name: "آموزش",
    icon: "GraduationCap",
    type: "expense",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "entertainment",
    name: "تفریح",
    icon: "Gamepad2",
    type: "expense",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "clothing",
    name: "پوشاک",
    icon: "Shirt",
    type: "expense",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "technology",
    name: "تکنولوژی",
    icon: "Laptop",
    type: "expense",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "bills",
    name: "قبوض و اشتراک‌ها",
    icon: "Receipt",
    type: "expense",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "other-expense",
    name: "سایر هزینه‌ها",
    icon: "Ellipsis",
    type: "expense",
    createdAt: "",
    updatedAt: "",
  },

  // ─────────────────────────────
  // Income
  // ─────────────────────────────

  {
    id: "salary",
    name: "حقوق",
    icon: "Wallet",
    type: "income",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "business",
    name: "درآمد کسب‌وکار",
    icon: "BriefcaseBusiness",
    type: "income",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "gift",
    name: "هدیه",
    icon: "Gift",
    type: "income",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "investment",
    name: "سرمایه‌گذاری",
    icon: "ChartNoAxesCombined",
    type: "income",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "other-income",
    name: "سایر درآمدها",
    icon: "CircleDollarSign",
    type: "income",
    createdAt: "",
    updatedAt: "",
  },
];
