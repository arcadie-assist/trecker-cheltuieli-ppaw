import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

export async function GET() {
  try {
    const user = await prisma.user.findUnique({
      where: { id: 1 },
      include: { quick_expenses: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
