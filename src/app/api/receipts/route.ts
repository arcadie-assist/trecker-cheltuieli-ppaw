import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

export async function GET() {
  const user = await prisma.user.findUnique({
    where: { id: 1 },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const receipts = await prisma.receipt.findMany({
    where: {
      user_id: user.id,
      created_at: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    include: {
      items: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return NextResponse.json(receipts);
}
