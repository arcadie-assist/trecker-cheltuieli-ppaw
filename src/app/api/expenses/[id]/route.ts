import { prisma } from "@/lib/prismaClient";
import { ExpenseCreateBody } from "@/types/expense.types";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user_id = 1;
  const { name, amount } = (await request.json()) as ExpenseCreateBody;

  try {
    const expense = await prisma.expense.update({
      where: {
        id: parseInt(params.id),
        user_id,
      },
      data: {
        name,
        amount,
      },
    });
    return Response.json(expense);
  } catch (error) {
    return Response.json({ error: "UPDATE EXPENSE ERROR" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user_id = 1;

  try {
    // First check if it's a quick expense
    const quickExpense = await prisma.quickExpense.findUnique({
      where: {
        id: parseInt(params.id),
        user_id,
      },
    });

    if (quickExpense) {
      await prisma.quickExpense.delete({
        where: {
          id: parseInt(params.id),
          user_id,
        },
      });
    } else {
      // If not a quick expense, try to delete regular expense
      await prisma.expense.delete({
        where: {
          id: parseInt(params.id),
          user_id,
        },
      });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return Response.json(
      { error: "DELETE ERROR", details: error },
      { status: 500 }
    );
  }
}
