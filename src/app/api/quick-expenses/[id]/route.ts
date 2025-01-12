import { prisma } from "@/lib/prismaClient";
import { QuickExpenseCreateBody } from "@/types/expense.types";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user_id = 1;
  const { name, amount, currency, icon } =
    (await request.json()) as QuickExpenseCreateBody;

  try {
    const quickExpense = await prisma.quickExpense.update({
      where: {
        id: parseInt(params.id),
        user_id,
      },
      data: {
        name,
        amount,
        currency,
        icon,
      },
    });
    return Response.json(quickExpense);
  } catch (error) {
    return Response.json(
      { error: "UPDATE QUICK EXPENSE ERROR" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user_id = 1;

  try {
    await prisma.quickExpense.delete({
      where: {
        id: parseInt(params.id),
        user_id,
      },
    });
    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: "DELETE QUICK EXPENSE ERROR" },
      { status: 500 }
    );
  }
}
