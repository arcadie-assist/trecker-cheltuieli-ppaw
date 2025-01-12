"use client";

import { useAddExpense } from "@/hooks/expense.hooks";
import { QuickExpense } from "@/types/quick-expense.types";
import * as LucideIcons from "lucide-react";
import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import ExpenseForm from "./ExpenseForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Plus, Pencil } from "lucide-react";

function QuickExpenseButton({ quickExpense }: { quickExpense: QuickExpense }) {
  const [open, setOpen] = useState(false);
  const Icon = useMemo(
    () => LucideIcons[quickExpense.icon] as LucideIcons.LucideIcon,
    [quickExpense.icon]
  );

  const { trigger } = useAddExpense();

  const handleAddExpense = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    try {
      await trigger({
        name: quickExpense.name,
        amount: quickExpense.amount,
        currency: "RON",
      });
      toast.success("Expense added successfully!");
    } catch (error) {
      toast.error("Failed to add expense");
    }
  };

  return (
    <div className="group relative flex h-24 w-full items-center gap-4 rounded-lg border border-border bg-card transition-all hover:border-blue-500/20 hover:bg-blue-500/5 hover:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]">
      <button
        onClick={handleAddExpense}
        className="flex flex-1 items-center gap-4 p-4"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white">
          <Icon className="h-5 w-5" />
        </div>

        <div className="flex flex-1 flex-col items-start">
          <div className="text-base font-semibold tracking-tight text-foreground">
            {quickExpense.name}
          </div>
          <div className="text-sm font-medium text-blue-500">
            {quickExpense.amount} RON
          </div>
        </div>
      </button>

      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            onClick={(e) => e.stopPropagation()}
            className="absolute right-4 flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition-opacity hover:bg-blue-500/10 group-hover:opacity-100"
          >
            <MoreVertical className="h-4 w-4 text-blue-500" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleAddExpense}>
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </DropdownMenuItem>
          <ExpenseForm
            trigger={
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Expense
              </DropdownMenuItem>
            }
            title="Edit Quick Expense"
            expense={{
              id: quickExpense.id,
              name: quickExpense.name,
              amount: quickExpense.amount,
              currency: "RON",
              is_template: true,
            }}
            isTemplate
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default QuickExpenseButton;
