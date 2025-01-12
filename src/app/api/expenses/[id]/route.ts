import { ExpenseService } from "@/services/expenseService";

const expenseService = new ExpenseService();

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user_id = 1;

  try {
    const body = await request.json();
    const expense = await expenseService.updateExpense(
      parseInt(params.id),
      body,
      user_id
    );
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
    await expenseService.deleteExpense(parseInt(params.id), user_id);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return Response.json({ error: "DELETE ERROR" }, { status: 500 });
  }
}
