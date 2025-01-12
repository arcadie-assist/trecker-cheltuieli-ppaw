"use client";

import ExpenseForm from "@/components/ExpenseForm";
import QuickExpenseButton from "@/components/QuickExpenseButton";
import { useQuickExpenses } from "@/hooks/quick-expenses.hooks";
import { Plus, Receipt } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const AddQuickExpenseButton = () => {
  return (
    <ExpenseForm
      trigger={
        <button className="group relative flex h-24 w-full items-center gap-4 rounded-lg border border-dashed border-border bg-card p-4 transition-all hover:border-blue-500/20 hover:bg-blue-500/5 hover:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] active:scale-[0.98]">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white">
            <Plus className="h-5 w-5" />
          </div>
          <div className="flex flex-1 flex-col items-start">
            <div className="text-base font-semibold tracking-tight text-foreground">
              Add Quick Expense
            </div>
            <div className="text-sm font-medium text-blue-500">
              Create a new template
            </div>
          </div>
        </button>
      }
      title="Add Quick Expense"
      isTemplate={true}
    />
  );
};

const Separator = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-white px-2 text-muted-foreground">or</span>
      </div>
    </div>
  );
};

export default function Home() {
  const { data: quickExpenses, error, isLoading } = useQuickExpenses();

  return (
    <div className="space-y-12 p-8">
      {/* Quick Expenses Section */}
      <section>
        <PageHeader
          title="Quick Expenses"
          description="Add your frequently used expenses with a single click"
        />

        {isLoading || error || !quickExpenses ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-24 bg-muted rounded-lg border border-border"
              />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickExpenses.map((quickExpense) => (
                <QuickExpenseButton
                  key={quickExpense.id}
                  quickExpense={quickExpense}
                />
              ))}
              <AddQuickExpenseButton />
            </div>
          </>
        )}
      </section>

      <Separator />

      {/* Normal Expense Section */}
      <section>
        <PageHeader
          title="Add Expense"
          description="Record a one-time expense manually"
        />

        <div className="max-w-md">
          <ExpenseForm
            trigger={
              <button className="group relative flex h-24 w-full items-center gap-4 rounded-lg border border-dashed border-border bg-card p-4 transition-all hover:border-green-500/20 hover:bg-green-500/5 hover:shadow-[0_0_0_4px_rgba(34,197,94,0.1)] active:scale-[0.98]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-500 transition-colors group-hover:bg-green-500 group-hover:text-white">
                  <Receipt className="h-5 w-5" />
                </div>
                <div className="flex flex-1 flex-col items-start">
                  <div className="text-base font-semibold tracking-tight text-foreground">
                    New Expense
                  </div>
                  <div className="text-sm font-medium text-green-500">
                    Add a one-time expense
                  </div>
                </div>
              </button>
            }
            title="Add expense"
          />
        </div>
      </section>
    </div>
  );
}
