"use client";

import { useExpenses } from "@/hooks/expense.hooks";
import { useTodayReceipts } from "@/hooks/receipt.hooks";
import { Banknote, Receipt, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import ExpenseForm from "./ExpenseForm";

function ExpensesAside() {
  const router = useRouter();
  const { data: expenses, isLoading: isLoadingExpenses } = useExpenses();
  const { data: receipts, isLoading: isLoadingReceipts } = useTodayReceipts();

  const handleItemClick = (item: { id: string; type: string }) => {
    if (item.type === "receipt") {
      const receiptId = item.id.replace("receipt-", "");
      router.push(`/scan/${receiptId}`);
    }
    // We don't need any click handler here anymore as the ExpenseForm trigger will handle it
  };

  // Show loading state while fetching data
  if (isLoadingExpenses || isLoadingReceipts) {
    return (
      <aside className="relative w-80">
        <div className="absolute flex flex-col inset-0">
          <div className="flex items-center justify-between flex-shrink-0 p-4 border border-border bg-card rounded-t-md">
            <div className="h-7 w-24 bg-muted rounded animate-pulse" />
            <div className="h-7 w-20 bg-muted rounded animate-pulse" />
          </div>

          <ul className="bg-background rounded-b-md border border-t-0 border-border overflow-y-scroll">
            {[1, 2, 3].map((i) => (
              <li
                key={i}
                className="flex items-center gap-4 p-4 border-b border-border last:border-b-0"
              >
                <div className="h-8 w-8 bg-muted rounded-full animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 w-24 bg-muted rounded mb-2 animate-pulse" />
                  <div className="h-3 w-16 bg-muted rounded animate-pulse" />
                </div>
                <div className="h-4 w-16 bg-muted rounded animate-pulse" />
              </li>
            ))}
          </ul>
        </div>
      </aside>
    );
  }

  // Calculate total for each receipt
  const receiptExpenses = (receipts ?? []).map((receipt) => ({
    id: `receipt-${receipt.id}`,
    name: receipt.name,
    amount: receipt.items.reduce(
      (sum, item) => sum + item.amount * item.quantity,
      0
    ),
    type: "receipt" as const,
    itemCount: receipt.items.length,
    currency: receipt.currency,
    created_at: receipt.created_at,
  }));

  // Format simple expenses
  const simpleExpenses = (expenses ?? []).map((expense) => ({
    id: `expense-${expense.id}`,
    name: expense.name,
    amount: expense.amount,
    type: "expense" as const,
    currency: expense.currency,
    created_at: expense.created_at,
  }));

  // Combine and sort by newest first
  const allExpenses = [...simpleExpenses, ...receiptExpenses].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const totalSpent = allExpenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <aside className="relative w-80">
      <div className="absolute flex flex-col inset-0">
        <div className="flex items-center justify-between flex-shrink-0 p-4 border border-border bg-card rounded-t-md">
          <h2 className="text-lg font-bold">Spent Today</h2>
          <div className="text-blue-500 border border-border font-bold bg-background px-2 py-1 rounded-md">
            {formatCurrency(totalSpent, "RON")}
          </div>
        </div>

        <ul className="bg-background rounded-b-md border border-t-0 border-border overflow-y-scroll">
          {allExpenses.map((item) => (
            <li
              key={item.id}
              className="cursor-pointer flex items-center gap-4 bg-background hover:bg-blue-500/5 p-4 border-b border-border last:border-b-0 select-none transition-colors"
            >
              {item.type === "receipt" ? (
                <div
                  onClick={() => handleItemClick(item)}
                  className="flex items-center gap-4 flex-1"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                    <Receipt className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                  </div>
                  <p className="text-sm font-semibold whitespace-nowrap">
                    {formatCurrency(item.amount, item.currency)}
                  </p>
                </div>
              ) : (
                <ExpenseForm
                  trigger={
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                        <Banknote className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.name}
                        </p>
                      </div>
                      <p className="text-sm font-semibold whitespace-nowrap">
                        {formatCurrency(item.amount, item.currency)}
                      </p>
                    </div>
                  }
                  title="Edit Expense"
                  expense={{
                    id: parseInt(item.id.replace("expense-", "")),
                    name: item.name,
                    amount: item.amount,
                    currency: item.currency,
                  }}
                />
              )}
            </li>
          ))}

          {allExpenses.length === 0 && (
            <li className="p-8 text-center text-muted-foreground">
              <p className="text-sm">No expenses today</p>
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
}

export default ExpensesAside;
