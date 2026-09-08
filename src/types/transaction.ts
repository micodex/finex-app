export type TransactionType = "income" | "expense";

export type Currency = "IRT" | "IRR";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  currency: Currency;
  type: TransactionType;
  categoryId: string;
  description: string;
  tags: string[];

  // date selected by the user
  jalaliDate: string;

  // When did the user add this record?
  createdAt: string;
  updatedAt: string;
}
