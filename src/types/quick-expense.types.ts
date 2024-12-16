import { QuickExpense as PrismaQuickExpense } from "@prisma/client";
import { LucideIcon } from "@/types/icon.types";

export type QuickExpense = Omit<PrismaQuickExpense, "icon"> & {
  icon: LucideIcon;
};
