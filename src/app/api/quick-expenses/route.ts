import { QuickExpenseService } from "@/services/quickExpenseService";
import { QuickExpenseCreateBody } from "@/types/expense.types";

const quickExpenseService = new QuickExpenseService();

export async function GET() {
  const user_id = 1;

  try {
    const quickExpenses = await quickExpenseService.getQuickExpenses(user_id);
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

  try {
    const body = (await request.json()) as QuickExpenseCreateBody;
    const quickExpense = await quickExpenseService.createQuickExpense(
      body,
      user_id
    );
    return Response.json(quickExpense);
  } catch (error) {
    console.error("Quick expense creation error:", error);
    return Response.json(
      { error: "CREATE QUICK EXPENSE ERROR" },
      { status: 500 }
    );
  }
}
