import { useMemo, useState } from "react";

// icon imports
import { ListFilter, ListPlus, PiggyBank, Plus, Search } from "lucide-react";

// shadcn imports
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// context imports
import { useCategories } from "@/features/categories/categoryContext";
import { useTransactions } from "@/features/transactions/transactionContext";

// components
import { TransactionFormDialog } from "@/features/transactions/components/TransactionFormDialog";
import { TransactionsTable } from "@/features/transactions/components/TransactionsTable";

// utils
import { formatAmount } from "@/features/transactions/transactionUtils";
import { SAMPLE_TRANSACTIONS } from "@/features/transactions/transactionConstant";

import type { Transaction, TransactionType } from "@/types/transaction";

type TransactionFilter = "all" | TransactionType;

function TransactionsPage() {
  const { transactions, deleteTransaction, addTransaction } = useTransactions();
  const { categories } = useCategories();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<TransactionFilter>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [transactionToDelete, setTransactionToDelete] =
    useState<Transaction | null>(null);

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    return transactions.filter((transaction) => {
      const matchesType = filter === "all" || transaction.type === filter;

      const searchableText = [
        transaction.title,
        transaction.description,
        ...transaction.tags,
      ]
        .join(" ")
        .toLocaleLowerCase();

      return matchesType && searchableText.includes(query);
    });
  }, [transactions, filter, search]);

  const incomeCount = transactions.filter(
    (transaction) => transaction.type === "income",
  ).length;

  const expenseCount = transactions.filter(
    (transaction) => transaction.type === "expense",
  ).length;

  function handleCreate() {
    setEditingTransaction(null);
    setFormOpen(true);
  }

  function handleEdit(transaction: Transaction) {
    setEditingTransaction(transaction);
    setFormOpen(true);
  }

  function handleFormOpenChange(open: boolean) {
    setFormOpen(open);

    if (!open) {
      setEditingTransaction(null);
    }
  }

  function handleDelete() {
    if (!transactionToDelete) return;

    deleteTransaction(transactionToDelete.id);
    setTransactionToDelete(null);
  }

  function addSampleTransactions() {
    SAMPLE_TRANSACTIONS.forEach((transaction) => {
      addTransaction(transaction);
    });
  }

  return (
    <section className="space-y-6">
      {/* header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">تراکنش‌ها</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            درآمدها و هزینه‌های خود را مدیریت کنید.
          </p>
        </div>

        <Button onClick={handleCreate}>
          <Plus className="size-4" />
          تراکنش جدید
        </Button>
      </div>

      {/* summary cards */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <CardContent className="flex py-4 items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground font-inter">
                کل تراکنش‌ها
              </p>
            </div>
            <span className="text-2xl font-semibold tabular-nums">
              {transactions.length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex py-4 items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">تراکنش‌های درآمد</p>
            </div>
            <span className="text-2xl font-semibold tabular-nums text-emerald-600">
              {incomeCount}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex py-4 items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">تراکنش‌های هزینه</p>
            </div>
            <span className="text-2xl font-semibold tabular-nums text-rose-600">
              {expenseCount}
            </span>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {/* filter */}
        <Card>
          <CardContent
            className="flex flex-col gap-4 
          lg:flex-row lg:justify-between"
          >
            <div className="relative w-full lg:max-w-sm">
              <Search className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="جستجو در عنوان، توضیحات و برچسب‌ها..."
                aria-label="جستجوی تراکنش‌ها"
                className="pe-9"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground">
                <ListFilter className="size-4" />
              </span>
              <Button
                type="button"
                size="sm"
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
              >
                همه
              </Button>
              <Button
                type="button"
                size="sm"
                variant={filter === "income" ? "default" : "outline"}
                onClick={() => setFilter("income")}
              >
                درآمد
              </Button>
              <Button
                type="button"
                size="sm"
                variant={filter === "expense" ? "default" : "outline"}
                onClick={() => setFilter("expense")}
              >
                هزینه
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* transacton table */}
        {transactions.length === 0 && !search && filter === "all" ? (
          <Card className="py-20">
            <CardHeader className="flex flex-col items-center">
              <div className="flex mb-2 size-12 items-center justify-center rounded-full bg-muted">
                <PiggyBank className="size-6 text-muted-foreground" />
              </div>
              <CardTitle>هنوز تراکنشی ثبت نشده است</CardTitle>
              <CardDescription>
                اولین درآمد یا هزینه خود را ثبت کنید.
              </CardDescription>
            </CardHeader>

            <CardFooter className="gap-2 justify-center">
              <Button onClick={handleCreate}>
                <Plus className="size-4" />
                ثبت اولین تراکنش
              </Button>
              <Button onClick={addSampleTransactions} variant={"secondary"}>
                <ListPlus className="size-4" />
                اضافه کردن نمونه تراکنش
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <TransactionsTable
            transactions={filteredTransactions}
            categories={categories}
            onEdit={handleEdit}
            onDelete={setTransactionToDelete}
          />
        )}

        {(search || filter !== "all") && (
          <p className="text-sm text-muted-foreground">
            نمایش {filteredTransactions.length} از {transactions.length} تراکنش
          </p>
        )}
      </div>

      {/* add transaction form dialog */}
      <TransactionFormDialog
        open={formOpen}
        onOpenChange={handleFormOpenChange}
        transaction={editingTransaction}
      />

      {/* delete confirmation */}
      <AlertDialog
        open={transactionToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setTransactionToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>حذف تراکنش</AlertDialogTitle>
            <AlertDialogDescription>
              آیا از حذف این تراکنش مطمئن هستید؟ این عملیات قابل بازگشت نیست.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {transactionToDelete && (
            <div className="rounded-lg border bg-muted/40 p-3">
              <p className="font-medium">{transactionToDelete.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                مبلغ:{" "}
                {formatAmount(
                  transactionToDelete.amount,
                  transactionToDelete.currency,
                )}
              </p>
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleDelete}>
              حذف تراکنش
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

export default TransactionsPage;
