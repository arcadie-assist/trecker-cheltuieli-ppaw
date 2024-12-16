import { prisma } from "@/lib/prismaClient";
import { ExpenseCreateBody } from "@/types/expense.types";

export async function GET() {
  const user_id = 1;
  try {
    const expenses = await prisma.expense.findMany({
      where: { user_id },
      orderBy: { created_at: "desc" },
    });
    return Response.json(expenses);
  } catch (error) {
    return Response.json({ error: "GET EXPENSES ERROR" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user_id = 1;
  const { name, amount } = (await request.json()) as ExpenseCreateBody;

  try {
    const expense = await prisma.expense.create({
      data: {
        name,
        amount,
        currency: "RON",
        user_id,
      },
    });
    return Response.json(expense);
  } catch (error) {
    return Response.json({ error: "CREATE EXPENSE ERROR" }, { status: 500 });
  }
}
