// formatting and reusable helpers

import type { Currency } from "@/types/transaction";

export function formatAmount(amount: number, currency: Currency) {
  return `${amount} ${currency === "IRT" ? "تومان" : "ریال"}`;
}
