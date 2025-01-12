import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useAddExpense,
  useUpdateExpense,
  useDeleteExpense,
} from "@/hooks/expense.hooks";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import {
  useAddQuickExpense,
  useUpdateQuickExpense,
  useDeleteQuickExpense,
} from "@/hooks/quick-expenses.hooks";
import * as LucideIcons from "lucide-react";
import { EXPENSE_ICONS } from "@/utils/expenseIcons";
import { mutate } from "swr";

interface ExpenseFormProps {
  trigger: React.ReactNode;
  title: string;
  isTemplate?: boolean;
  expense?: {
    id: number;
    name: string;
    amount: number;
    currency: string;
    is_template?: boolean;
    icon?: string;
  };
}

const ExpenseForm = ({
  trigger,
  title,
  isTemplate = false,
  expense,
}: ExpenseFormProps) => {
  const [name, setName] = useState(expense?.name ?? "");
  const [amount, setAmount] = useState(expense?.amount?.toString() ?? "");
  const [selectedIcon, setSelectedIcon] = useState(
    expense?.icon ?? EXPENSE_ICONS[0].icon
  );
  const [open, setOpen] = useState(false);

  // Regular expense mutations
  const { trigger: addExpense, isMutating: isAdding } = useAddExpense();
  const { trigger: updateExpense, isMutating: isUpdating } = useUpdateExpense();
  const { trigger: deleteExpense, isMutating: isDeleting } = useDeleteExpense();

  // Quick expense mutations
  const { trigger: addQuickExpense, isMutating: isAddingTemplate } =
    useAddQuickExpense();
  const { trigger: updateQuickExpense, isMutating: isUpdatingTemplate } =
    useUpdateQuickExpense();
  const { trigger: deleteQuickExpense, isMutating: isDeletingTemplate } =
    useDeleteQuickExpense();

  const isEditMode = !!expense;
  const isMutating =
    isAdding ||
    isUpdating ||
    isDeleting ||
    isAddingTemplate ||
    isUpdatingTemplate ||
    isDeletingTemplate;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !amount) {
      toast.error("Please fill in all fields");
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      toast.error("Please enter a valid amount");
      return;
    }

    const data = {
      name,
      amount: numericAmount,
      currency: "RON",
      ...(isTemplate && { icon: selectedIcon }),
    };

    try {
      if (isEditMode && expense) {
        if (expense.is_template) {
          await updateQuickExpense({ id: expense.id, data });
          await mutate("/api/quick-expenses");
          toast.success("Quick expense template updated!");
        } else {
          await updateExpense({ id: expense.id, data });
          await mutate("/api/expenses");
          toast.success("Expense updated successfully!");
        }
      } else {
        if (isTemplate) {
          await addQuickExpense(data);
          await mutate("/api/quick-expenses");
          toast.success("Quick expense template created!");
        } else {
          await addExpense(data);
          await mutate("/api/expenses");
          toast.success("Expense added successfully!");
        }
      }
      setName("");
      setAmount("");
      setOpen(false);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(
        isEditMode ? "Failed to update expense" : "Failed to add expense"
      );
    }
  };

  const handleDelete = async () => {
    if (!expense) return;

    try {
      if (expense.is_template) {
        await deleteQuickExpense({ id: expense.id });
        // Refetch quick expenses
        await mutate("/api/quick-expenses");
        toast.success("Quick expense template deleted!");
      } else {
        await deleteExpense({ id: expense.id });
        // Refetch regular expenses
        await mutate("/api/expenses");
        toast.success("Expense deleted successfully!");
      }
      setOpen(false);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(
        expense.is_template
          ? "Failed to delete quick expense template"
          : "Failed to delete expense"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {isTemplate
                ? "Create a template for frequently used expenses"
                : "Add a new expense to your records"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder="Enter expense name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-3"
                placeholder="Enter amount"
              />
            </div>
            {isTemplate && (
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Icon</Label>
                <div className="col-span-3 grid grid-cols-5 gap-2">
                  {EXPENSE_ICONS.map(({ icon, label }) => {
                    const IconComponent = LucideIcons[icon];
                    return (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setSelectedIcon(icon)}
                        className={`flex flex-col justify-center items-center gap-1 rounded-lg aspect-square transition-colors hover:bg-blue-500/5 ${
                          selectedIcon === icon
                            ? "bg-blue-500/10 text-blue-500"
                            : "text-muted-foreground"
                        }`}
                      >
                        {/* @ts-ignore */}
                        <IconComponent className="h-5 w-5" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="flex items-center justify-between">
            {isEditMode && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isMutating}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            )}
            <Button type="submit" disabled={isMutating}>
              {isMutating
                ? isEditMode
                  ? "Updating..."
                  : "Adding..."
                : isEditMode
                ? "Update"
                : isTemplate
                ? "Save Template"
                : "Add Expense"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseForm;
