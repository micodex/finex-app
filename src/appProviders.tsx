import type { ReactNode } from "react";

import { CategoryProvider } from "@/features/categories/categoryContext";
import { TransactionProvider } from "@/features/transactions/transactionContext";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <CategoryProvider>
      <TransactionProvider>{children}</TransactionProvider>
    </CategoryProvider>
  );
}
