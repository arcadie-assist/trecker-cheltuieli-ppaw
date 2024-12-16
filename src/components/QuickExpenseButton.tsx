"use client";

import { useAddExpense } from "@/hooks/expense.hooks";
import { QuickExpense } from "@/types/quick-expense.types";
import * as LucideIcons from "lucide-react";
import React, { useMemo } from "react";

function QuickExpenseButton({ quickExpense }: { quickExpense: QuickExpense }) {
  const Icon = useMemo(
    () => LucideIcons[quickExpense.icon] as LucideIcons.LucideIcon,
    [quickExpense.icon]
  );

  const { trigger } = useAddExpense();

  const handleAddExpense = () => {
    trigger({
      name: quickExpense.name,
      amount: quickExpense.amount,
      currency: "RON",
    });
  };

  return (
    <button
      className="bg-blue-500 text-white rounded-lg p-4 shadow-md hover:bg-blue-600 transition"
      onClick={handleAddExpense}
    >
      <div className="flex items-center">
        <Icon className="mr-2" />
        <div className="flex flex-col">
          <div className="font-bold">{quickExpense.name}</div>
          <div className="text-sm">{quickExpense.amount}</div>
        </div>
      </div>
    </button>
  );
}

export default QuickExpenseButton;
