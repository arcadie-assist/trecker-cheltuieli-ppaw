import { Expense as PrismaExpense } from "@prisma/client";

type ExpenseCreateBody = Omit<
  PrismaExpense,
  "id" | "user_id" | "created_at" | "updated_at"
>;

export type { PrismaExpense, ExpenseCreateBody };
