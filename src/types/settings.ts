import type { Currency } from "./transaction";

export type ThemeMode = "light" | "dark" | "system";

export interface AppSettings {
  currency: Currency;
  usePersianDigits: boolean;
  theme: ThemeMode;
}
