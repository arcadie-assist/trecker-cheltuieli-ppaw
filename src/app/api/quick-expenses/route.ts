import { prisma } from "@/lib/prismaClient";

export async function GET() {
  const user_id = 1;

  try {
    const quickExpenses = await prisma.quickExpense.findMany({
      where: { user_id },
    });
    return Response.json(quickExpenses);
  } catch (error) {
    return Response.json(
      { error: "GET QUICK EXPENSES ERROR" },
      { status: 500 }
    );
  }
}
