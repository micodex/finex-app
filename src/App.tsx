import { useCategories } from "@/features/categories/categoryContext";
import { useTransactions } from "@/features/transactions/transactionContext";

function App() {
  const { categories, addCategory } = useCategories();
  const { transactions } = useTransactions();

  return (
    <main dir="rtl" className="min-h-screen bg-background p-8 text-foreground">
      <h1 className="text-2xl font-bold">مدیریت هزینه</h1>

      <div className="mt-6 space-y-2">
        <p>تعداد دسته‌بندی‌ها: {categories.length}</p>

        <p>تعداد تراکنش‌ها: {transactions.length}</p>

        <button
          className="px-2 py-1 rounded-md bg-gray-800 text-gray-100"
          onClick={() =>
            addCategory({
              icon: "Utensils",
              name: "new food",
              type: "expense",
            })
          }
        >
          add
        </button>
      </div>
    </main>
  );
}

export default App;
