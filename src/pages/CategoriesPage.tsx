import { useMemo, useState, type SubmitEvent } from "react";

// contexts
import { useCategories } from "@/features/categories/categoryContext";
import { useTransactions } from "@/features/transactions/transactionContext";

// type imports
import type { Category, CategoryType } from "@/types/category";
import type { CategoryFilter } from "@/features/categories/categoryConstant";

// lucide icon imports
import { Pencil, Plus, Tag, Trash2 } from "lucide-react";

// shadcn components imports
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

// constant imports
import {
  CATEGORY_ICONS,
  FILTER_OPTIONS,
  ICON_OPTIONS,
} from "@/features/categories/categoryConstant";

function Categories() {
  const { categories, addCategory, updateCategory, deleteCategory } =
    useCategories();
  const { transactions } = useTransactions();

  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );

  const [name, setName] = useState("");
  const [type, setType] = useState<CategoryType>("expense");
  const [icon, setIcon] = useState("Tag");
  const [nameError, setNameError] = useState("");

  const SelectedIconComponent = CATEGORY_ICONS[icon] ?? Tag;

  const filteredCategories = useMemo(() => {
    if (filter === "all") return categories;

    return categories.filter((category) => category.type === filter);
  }, [categories, filter]);

  const incomeCount = categories.filter(
    (category) => category.type === "income",
  ).length;

  const expenseCount = categories.filter(
    (category) => category.type === "expense",
  ).length;

  const affectedTransactionCount = categoryToDelete
    ? transactions.filter(
        (transaction) => transaction.categoryId === categoryToDelete.id,
      ).length
    : 0;

  function openCreateDialog() {
    setEditingCategory(null);
    setName("");
    setType("expense");
    setIcon("Tag");
    setNameError("");
    setIsFormOpen(true);
  }

  function openEditDialog(category: Category) {
    setEditingCategory(category);
    setName(category.name);
    setType(category.type);
    setIcon(category.icon);
    setNameError("");
    setIsFormOpen(true);
  }

  function handleSave(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setNameError("نام دسته‌بندی را وارد کنید.");
      return;
    }

    const duplicate = categories.some(
      (category) =>
        category.name.trim().toLocaleLowerCase() ===
          trimmedName.toLocaleLowerCase() &&
        category.id !== editingCategory?.id,
    );

    if (duplicate) {
      setNameError("دسته‌بندی دیگری با این نام وجود دارد.");
      return;
    }

    const values = {
      name: trimmedName,
      type,
      icon,
    };

    if (editingCategory) {
      updateCategory(editingCategory.id, values);
    } else {
      addCategory(values);
    }

    setIsFormOpen(false);
  }

  function handleDelete() {
    if (!categoryToDelete) return;

    deleteCategory(categoryToDelete.id);
    setCategoryToDelete(null);
  }

  return (
    <section className="space-y-6">
      {/* section header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">دسته‌بندی‌ها</h1>
          <p className="text-sm text-muted-foreground">
            دسته‌بندی‌های درآمد و هزینه خود را مدیریت کنید.
          </p>
        </div>

        <Button onClick={openCreateDialog}>
          <Plus data-icon="inline-start" />
          دسته‌بندی جدید
        </Button>
      </div>

      {/* category count */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center justify-between py-3 gap-3">
            <span className="text-sm text-muted-foreground">
              کل دسته‌بندی‌ها
            </span>
            <span className="text-xl font-semibold tabular-nums">
              {categories.length.toLocaleString("fa-IR")}
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between py-3 gap-3">
            <span className="text-sm text-muted-foreground">
              دسته‌بندی درآمد
            </span>
            <span className="text-xl font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
              {incomeCount.toLocaleString("fa-IR")}
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between py-3 gap-3">
            <span className="text-sm text-muted-foreground">
              دسته‌بندی هزینه
            </span>
            <span className="text-xl font-semibold tabular-nums text-rose-600 dark:text-rose-400">
              {expenseCount.toLocaleString("fa-IR")}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* filter categories */}
      <Card>
        <CardContent className="flex flex-wrap items-center gap-2">
          {FILTER_OPTIONS.map((option) => (
            <Button
              key={option.value}
              type="button"
              size="sm"
              variant={filter === option.value ? "default" : "outline"}
              onClick={() => setFilter(option.value)}
            >
              {option.label}
            </Button>
          ))}

          <span className="ms-auto text-sm text-muted-foreground">
            {filteredCategories.length.toLocaleString("fa-IR")} دسته‌بندی
          </span>
        </CardContent>
      </Card>

      {/* category cards */}
      {filteredCategories.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Tag className="size-5 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <h2 className="font-semibold">دسته‌بندی‌ای وجود ندارد</h2>
              <p className="text-sm text-muted-foreground">
                برای این فیلتر دسته‌بندی‌ای پیدا نشد. می‌توانید یک دسته‌بندی
                جدید ایجاد کنید.
              </p>
            </div>
            <Button onClick={openCreateDialog}>
              <Plus data-icon="inline-start" />
              افزودن دسته‌بندی
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCategories.map((category) => {
            const Icon = CATEGORY_ICONS[category.icon] ?? Tag;
            const categoryLabel =
              category.type === "expense" ? "هزینه" : "درآمد";

            return (
              <Card key={category.id} className="min-w-0">
                <CardHeader className="flex-row items-center justify-between gap-3">
                  <div className="flex gap-3">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted">
                      <Icon className="size-6" />
                    </div>

                    <div className="flex flex-col justify-between ">
                      <CardTitle className="truncate">
                        {category.name}
                      </CardTitle>
                      <Badge
                        variant={
                          category.type === "income"
                            ? "green"
                            : category.type === "expense"
                              ? "outline"
                              : "default"
                        }
                      >
                        {categoryLabel}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => openEditDialog(category)}
                    aria-label={`ویرایش ${category.name}`}
                  >
                    <Pencil data-icon="inline-start" />
                    ویرایش
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => setCategoryToDelete(category)}
                    aria-label={`حذف ${category.name}`}
                  >
                    <Trash2 data-icon="inline-start" />
                    حذف
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* open or edit dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-bold">
              {editingCategory ? "ویرایش دسته‌بندی" : "ایجاد دسته‌بندی"}
            </DialogTitle>
            <DialogDescription>
              نام، نوع و آیکون دسته‌بندی را مشخص کنید.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave}>
            <FieldGroup>
              <Field>
                <Label>نام دسته‌بندی</Label>
                <div className="flex gap-2 items-center">
                  <SelectedIconComponent className="size-5" />
                  <Input
                    id="category-name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      if (nameError) setNameError("");
                    }}
                    placeholder="مثلاً خرید روزانه"
                    aria-invalid={Boolean(nameError)}
                    autoFocus
                  />
                </div>
                <FieldError>{nameError && <span>{nameError}</span>}</FieldError>
              </Field>
              <Field>
                <Label>نوع دسته‌بندی</Label>
                <div className="flex gap-4 p-1 rounded-md bg-mist-100">
                  <Button
                    type="button"
                    onClick={() => setType("expense")}
                    variant={type === "expense" ? "white" : "ghost"}
                    className="flex-1"
                  >
                    هزینه
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setType("income")}
                    variant={type === "income" ? "white" : "ghost"}
                    className="flex-1"
                  >
                    درآمد
                  </Button>
                </div>
              </Field>
              <Field>
                <Label>آیکون</Label>
                <div className="grid grid-cols-8 gap-6 items-center mt-2">
                  {ICON_OPTIONS.map((item) => {
                    const Icon = CATEGORY_ICONS[item.value] ?? Tag;

                    return (
                      <Button
                        type="button"
                        onClick={() => setIcon(item.value)}
                        size={"icon-lg"}
                        variant={icon === item.value ? "default" : "secondary"}
                      >
                        <Icon className="size-4" />
                      </Button>
                    );
                  })}
                </div>
              </Field>
            </FieldGroup>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
              >
                انصراف
              </Button>
              <Button type="submit">
                {editingCategory ? "ذخیره تغییرات" : "ایجاد دسته‌بندی"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* delete dialog */}
      <AlertDialog
        open={categoryToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setCategoryToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>حذف دسته‌بندی</AlertDialogTitle>
            <AlertDialogDescription>
              {categoryToDelete && (
                <>
                  آیا از حذف دسته‌بندی{" "}
                  <span className="font-semibold">
                    « {categoryToDelete.name} »
                  </span>{" "}
                  مطمئن هستید؟
                  {affectedTransactionCount > 0 ? (
                    <>
                      {affectedTransactionCount.toLocaleString("fa-IR")} تراکنش
                      مرتبط به «بدون دسته‌بندی» منتقل می‌شود. خود تراکنش‌ها حذف
                      نخواهند شد.
                    </>
                  ) : (
                    <> این دسته‌بندی تراکنش مرتبطی ندارد.</>
                  )}
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction variant={"destructive"} onClick={handleDelete}>
              حذف دسته‌بندی
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

export default Categories;
