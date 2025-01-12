import { ExpenseService } from "@/services/expenseService";
import { ExpenseCreateBody } from "@/types/expense.types";

const expenseService = new ExpenseService();

export async function GET() {
  const user_id = 1;

  try {
    const expenses = await expenseService.getExpenses(user_id);
    return Response.json(expenses);
  } catch (error) {
    console.error("Expense fetch error:", error);
    return Response.json({ error: "FETCH EXPENSES ERROR" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user_id = 1;

  try {
    const body = (await request.json()) as ExpenseCreateBody;
    const expense = await expenseService.createExpense(body, user_id);
    return Response.json(expense);
  } catch (error) {
    console.error("Expense creation error:", error);
    return Response.json({ error: "CREATE EXPENSE ERROR" }, { status: 500 });
  }
}
