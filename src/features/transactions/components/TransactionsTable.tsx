import {
  ArrowDownLeft,
  ArrowUpRight,
  MoreHorizontalIcon,
  Pencil,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Category } from "@/types/category";
import type { Transaction } from "@/types/transaction";

import { formatDate } from "../transactionUtils";

interface TransactionsTableProps {
  transactions: Transaction[];
  categories: Category[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

export function TransactionsTable({
  transactions,
  categories,
  onEdit,
  onDelete,
}: TransactionsTableProps) {
  const categoryNameById = new Map(
    categories.map((category) => [category.id, category.name]),
  );

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-16 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <ArrowDownLeft className="size-5 text-muted-foreground" />
        </div>
        <p className="font-medium">تراکنشی پیدا نشد</p>
        <p className="text-sm text-muted-foreground">
          با تغییر فیلترها یا ثبت تراکنش جدید شروع کنید.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold min-w-44">عنوان</TableHead>
              <TableHead className="font-semibold min-w-32">
                دسته‌بندی
              </TableHead>
              <TableHead className="font-semibold min-w-28">تاریخ</TableHead>
              <TableHead className="font-semibold min-w-24">نوع</TableHead>
              <TableHead className="font-semibold min-w-36 text-end">
                مبلغ
              </TableHead>
              <TableHead className="font-bold w-24 text-end">عملیات</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((transaction) => {
              const isIncome = transaction.type === "income";

              return (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col gap-1">
                      <span>{transaction.title}</span>
                      {transaction.description && (
                        <span className="max-w-56 truncate text-xs font-normal text-muted-foreground">
                          {transaction.description}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    {transaction.categoryId
                      ? (categoryNameById.get(transaction.categoryId) ??
                        "دسته حذف شده")
                      : "بدون دسته‌بندی"}
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    {formatDate(new Date(transaction.date))}
                  </TableCell>

                  <TableCell>
                    <Badge variant={isIncome ? "default" : "outline"}>
                      {isIncome ? (
                        <ArrowDownLeft className="size-3.5" />
                      ) : (
                        <ArrowUpRight className="size-3.5" />
                      )}
                      {isIncome ? "درآمد" : "هزینه"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-end">
                    <div
                      className={
                        isIncome
                          ? "font-semibold text-emerald-600 dark:text-emerald-400"
                          : "font-semibold"
                      }
                    >
                      {isIncome ? "+" : "−"}
                      {transaction.amount}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {transaction.currency === "IRT" ? "تومان" : "ریال"}
                    </span>
                  </TableCell>
                  <TableCell className="text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                          >
                            <MoreHorizontalIcon />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onEdit(transaction)}
                          aria-label={`ویرایش ${transaction.title}`}
                        >
                          <Pencil className="size-4" />
                          ویرایش
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onDelete(transaction)}
                          aria-label={`حذف ${transaction.title}`}
                          variant="destructive"
                        >
                          <Trash2 className="size-4" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
