import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/storage";
import type { Transaction } from "@/types/transaction";

interface TransactionContextValue {
  transactions: Transaction[];

  addTransaction: (
    transaction: Omit<Transaction, "id" | "createdAt" | "updatedAt">,
  ) => void;

  updateTransaction: (
    id: string,
    updates: Partial<Omit<Transaction, "id" | "createdAt" | "updatedAt">>,
  ) => void;

  deleteTransaction: (id: string) => void;

  getTransactionById: (id: string) => Transaction | undefined;
}

const TransactionContext = createContext<TransactionContextValue | null>(null);

interface TransactionProviderProps {
  children: ReactNode;
}

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    STORAGE_KEYS.transactions,
    [],
  );

  const addTransaction = useCallback(
    (transaction: Omit<Transaction, "id" | "createdAt" | "updatedAt">) => {
      const now = new Date().toISOString();

      const newTransaction: Transaction = {
        ...transaction,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      };

      setTransactions((current) => [newTransaction, ...current]);
    },
    [setTransactions],
  );

  const updateTransaction = useCallback(
    (
      id: string,
      updates: Partial<Omit<Transaction, "id" | "createdAt" | "updatedAt">>,
    ) => {
      setTransactions((current) =>
        current.map((transaction) =>
          transaction.id === id
            ? {
                ...transaction,
                ...updates,
                updatedAt: new Date().toISOString(),
              }
            : transaction,
        ),
      );
    },
    [setTransactions],
  );

  const deleteTransaction = useCallback(
    (id: string) => {
      setTransactions((current) =>
        current.filter((transaction) => transaction.id !== id),
      );
    },
    [setTransactions],
  );

  const getTransactionById = useCallback(
    (id: string) => transactions.find((transaction) => transaction.id === id),
    [transactions],
  );

  const value = useMemo(
    () => ({
      transactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      getTransactionById,
    }),
    [
      transactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      getTransactionById,
    ],
  );

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error("useTransactions must be used inside TransactionProvider");
  }

  return context;
}
