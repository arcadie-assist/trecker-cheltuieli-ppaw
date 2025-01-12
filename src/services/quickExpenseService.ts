import { prisma } from "@/lib/prismaClient";
import { QuickExpenseCreateBody } from "@/types/expense.types";

export class QuickExpenseService {
  async getQuickExpenses(userId: number) {
    return await prisma.quickExpense.findMany({
      where: { user_id: userId },
      orderBy: { order: "asc" },
    });
  }

  async createQuickExpense(data: QuickExpenseCreateBody, userId: number) {
    return await prisma.quickExpense.create({
      data: {
        ...data,
        user_id: userId,
      },
    });
  }

  async updateQuickExpense(
    id: number,
    data: QuickExpenseCreateBody,
    userId: number
  ) {
    return await prisma.quickExpense.update({
      where: {
        id,
        user_id: userId,
      },
      data,
    });
  }

  async deleteQuickExpense(id: number, userId: number) {
    return await prisma.quickExpense.delete({
      where: {
        id,
        user_id: userId,
      },
    });
  }
}
