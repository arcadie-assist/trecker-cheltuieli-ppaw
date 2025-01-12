import { QuickExpenseService } from "@/services/quickExpenseService";

const quickExpenseService = new QuickExpenseService();

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user_id = 1;

  try {
    const body = await request.json();
    const quickExpense = await quickExpenseService.updateQuickExpense(
      parseInt(params.id),
      body,
      user_id
    );
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
    await quickExpenseService.deleteQuickExpense(parseInt(params.id), user_id);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return Response.json(
      { error: "DELETE QUICK EXPENSE ERROR" },
      { status: 500 }
    );
  }
}
