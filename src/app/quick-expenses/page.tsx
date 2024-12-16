"use client";

import ExpenseForm from "@/components/ExpenseForm";
import QuickExpenseButton from "@/components/QuickExpenseButton";
import { Button } from "@/components/ui/button";
import { useQuickExpenses } from "@/hooks/quick-expenses.hooks";
import React from "react";

function QuickExpensesPage() {
  const { data, error, isLoading } = useQuickExpenses();

  return (
    <div>
      <h2>Quick Expenses</h2>
      <hr />
      <h1>View</h1>
      {!!data &&
        data.map((quickExpense) => (
          <QuickExpenseButton
            key={quickExpense.id}
            quickExpense={quickExpense}
          />
        ))}
      <hr />
      <h1>Add</h1>
      <ExpenseForm trigger={<Button>Add</Button>} title="Add quick expense" />
    </div>
  );
}

export default QuickExpensesPage;
