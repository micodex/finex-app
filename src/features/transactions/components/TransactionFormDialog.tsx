import { useEffect, useMemo, useState, type SubmitEvent } from "react";

import { useCategories } from "@/features/categories/categoryContext";
import { useTransactions } from "@/features/transactions/transactionContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/storage";

import type { Transaction, TransactionType } from "@/types/transaction";
import type { AppSettings } from "@/types/settings";

// shadcn imports
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

interface TransactionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction?: Transaction | null;
}

const DEFAULT_SETTINGS: AppSettings = {
  currency: "IRT",
  usePersianDigits: true,
  theme: "system",
};

function getTodayJalali() {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function TransactionFormDialog({
  open,
  onOpenChange,
  transaction,
}: TransactionFormDialogProps) {
  const { categories } = useCategories();
  const { addTransaction, updateTransaction } = useTransactions();

  const [settings] = useLocalStorage<AppSettings>(
    STORAGE_KEYS.settings,
    DEFAULT_SETTINGS,
  );

  // form states
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("expense");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [jalaliDate, setJalaliDate] = useState(getTodayJalali);
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  // form error states
  const [titleError, setTitleError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [dateError, setDateError] = useState("");

  const availableCategories = useMemo(
    () => categories.filter((category) => category.type === type),
    [categories, type],
  );

  useEffect(() => {
    if (!open) return;

    setTitle(transaction?.title ?? "");
    setAmount(transaction ? String(transaction.amount) : "");
    setType(transaction?.type ?? "expense");
    setCategoryId(transaction?.categoryId ?? null);
    setJalaliDate(transaction?.jalaliDate ?? getTodayJalali());
    setDescription(transaction?.description ?? "");
    setTagsInput(transaction?.tags.join(", ") ?? "");
    setTitleError("");
    setAmountError("");
    setDateError("");
  }, [open, transaction]);

  // If the transaction type changes, clear an incompatible category.
  useEffect(() => {
    if (
      categoryId &&
      !availableCategories.some((category) => category.id === categoryId)
    ) {
      setCategoryId(null);
    }
  }, [availableCategories, categoryId]);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setTitleError("");
    setAmountError("");
    setDateError("");

    const parsedAmount = Number(amount);

    if (!title.trim()) {
      setTitleError("عنوان تراکنش را وارد کنید.");
      return;
    }

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setAmountError("مبلغ باید عددی بزرگ‌تر از صفر باشد.");
      return;
    }

    if (!jalaliDate.trim()) {
      setDateError("تاریخ تراکنش را وارد کنید.");
      return;
    }

    const payload = {
      title: title.trim(),
      amount: parsedAmount,
      currency: settings.currency,
      type,
      categoryId,
      jalaliDate: jalaliDate.trim(),
      description: description.trim(),
      tags: [
        ...new Set(
          tagsInput
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        ),
      ],
    };

    if (transaction) {
      updateTransaction(transaction.id, payload);
    } else {
      addTransaction(payload);
    }

    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {transaction ? "ویرایش تراکنش" : "تراکنش جدید"}
          </DialogTitle>
          <DialogDescription>اطلاعات تراکنش را وارد کنید.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <Label>نوع تراکنش</Label>
              <div className="grid grid-cols-2 gap-2 bg-muted/80 p-1 rounded-full">
                <Button
                  className={`rounded-full ${type === "expense" ? "" : "text-muted-foreground"}`}
                  type="button"
                  variant={type === "expense" ? "white" : "ghost"}
                  onClick={() => setType("expense")}
                >
                  <ArrowDownLeft />
                  هزینه
                </Button>
                <Button
                  className={`rounded-full ${type === "income" ? "" : "text-muted-foreground"}`}
                  type="button"
                  variant={type === "income" ? "white" : "ghost"}
                  onClick={() => setType("income")}
                >
                  <ArrowUpRight />
                  درآمد
                </Button>
              </div>
            </Field>

            <Field>
              <Label htmlFor="transaction-title">عنوان</Label>
              <Input
                id="transaction-title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  setTitleError("");
                }}
                aria-invalid={!!titleError}
                placeholder="مثلاً خرید سوپرمارکت"
              />
              <FieldError>{titleError}</FieldError>
            </Field>

            <Field>
              <Label htmlFor="transaction-amount">
                مبلغ ({settings.currency === "IRT" ? "تومان" : "ریال"})
              </Label>
              <Input
                id="transaction-amount"
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                value={amount}
                onChange={(event) => {
                  setAmount(event.target.value);
                  setAmountError("");
                }}
                placeholder="مثلاً ۵۰۰۰۰۰"
                aria-invalid={!!amountError}
              />
              <FieldError>{amountError}</FieldError>
            </Field>

            <Field>
              <Label>دسته‌بندی</Label>
              <Select
                value={categoryId}
                onValueChange={(value) =>
                  setCategoryId(value === "__none__" ? null : value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="انتخاب دسته‌بندی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">بدون دسته‌بندی</SelectItem>
                  {availableCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Label htmlFor="transaction-date">تاریخ شمسی</Label>
              <Input
                id="transaction-date"
                value={jalaliDate}
                onChange={(event) => {
                  setJalaliDate(event.target.value);
                  setDateError("");
                }}
                placeholder="۱۴۰۵/۰۸/۰۹"
                dir="ltr"
                className="text-right"
                aria-invalid={!!dateError}
              />
              <FieldError>{dateError}</FieldError>
            </Field>
            <Field>
              <Label htmlFor="transaction-description">توضیحات</Label>
              <Textarea
                id="transaction-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="توضیحات اختیاری..."
                rows={3}
              />
            </Field>

            <Field>
              <Label htmlFor="transaction-tags">برچسب‌ها</Label>
              <Input
                id="transaction-tags"
                value={tagsInput}
                onChange={(event) => setTagsInput(event.target.value)}
                placeholder="مثلاً خانه، خرید، ضروری"
              />
              <p className="text-xs text-muted-foreground">
                برچسب‌ها را با ویرگول انگلیسی جدا کنید.
              </p>
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              انصراف
            </Button>
            <Button type="submit">
              {transaction ? "ذخیره تغییرات" : "ثبت تراکنش"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
