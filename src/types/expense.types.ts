import {
  Expense as PrismaExpense,
  QuickExpense as PrismaQuickExpense,
} from "@prisma/client";
import { LucideIcon } from "./icon.types";

type ExpenseCreateBody = Omit<
  PrismaExpense,
  "id" | "user_id" | "created_at" | "updated_at"
>;

type QuickExpenseCreateBody = Omit<
  PrismaQuickExpense,
  "id" | "user_id" | "created_at" | "updated_at" | "order"
> & {
  icon: LucideIcon;
};

export type {
  PrismaExpense,
  PrismaQuickExpense,
  ExpenseCreateBody,
  QuickExpenseCreateBody,
};
