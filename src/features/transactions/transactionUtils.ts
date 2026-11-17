// formatting and reusable helpers

import type { Currency } from "@/types/transaction";

export function formatAmount(amount: number, currency: Currency) {
  return `${amount} ${currency === "IRT" ? "تومان" : "ریال"}`;
}

// Date object -> format -> YY-MM-DD
export const getLocalDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// format Date object to Persian Jalali date -> ۱۴۰۵/۸/۲۵
export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(date);
}
