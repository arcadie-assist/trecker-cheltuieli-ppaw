import { prisma } from "@/lib/prismaClient";
import { QuickExpenseCreateBody } from "@/types/expense.types";

export async function GET() {
  const user_id = 1;

  try {
    const quickExpenses = await prisma.quickExpense.findMany({
      where: {
        user_id,
      },
      orderBy: {
        order: "asc",
      },
    });
    return Response.json(quickExpenses);
  } catch (error) {
    console.error("Quick expense fetch error:", error);
    return Response.json(
      { error: "FETCH QUICK EXPENSES ERROR" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const user_id = 1;
  const { name, amount, currency, icon } =
    (await request.json()) as QuickExpenseCreateBody;

  try {
    const quickExpense = await prisma.quickExpense.create({
      data: {
        name,
        amount,
        currency,
        icon,
        user_id,
      },
    });
    return Response.json(quickExpense);
  } catch (error) {
    return Response.json(
      { error: "CREATE QUICK EXPENSE ERROR" },
      { status: 500 }
    );
  }
}
