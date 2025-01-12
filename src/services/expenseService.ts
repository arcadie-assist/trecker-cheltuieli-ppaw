import { prisma } from "@/lib/prismaClient";
import { ExpenseCreateBody } from "@/types/expense.types";

export class ExpenseService {
  async getExpenses(userId: number) {
    return await prisma.expense.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
    });
  }

  async createExpense(data: ExpenseCreateBody, userId: number) {
    return await prisma.expense.create({
      data: {
        ...data,
        user_id: userId,
      },
    });
  }

  async updateExpense(id: number, data: ExpenseCreateBody, userId: number) {
    return await prisma.expense.update({
      where: {
        id,
        user_id: userId,
      },
      data,
    });
  }

  async deleteExpense(id: number, userId: number) {
    return await prisma.expense.delete({
      where: {
        id,
        user_id: userId,
      },
    });
  }
}
