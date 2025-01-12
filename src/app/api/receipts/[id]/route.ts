import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

// Get receipt
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: 1 },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const receipt = await prisma.receipt.findFirst({
    where: {
      id: parseInt(params.id),
      user_id: 1,
    },
    include: {
      items: true,
    },
  });

  if (!receipt) {
    return NextResponse.json({ error: "Receipt not found" }, { status: 404 });
  }

  return NextResponse.json(receipt);
}

// Delete receipt
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: 1 },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await prisma.receiptItem.deleteMany({
    where: {
      receipt_id: parseInt(params.id),
    },
  });

  await prisma.receipt.delete({
    where: {
      id: parseInt(params.id),
      user_id: user.id,
    },
  });

  return NextResponse.json({ success: true });
}

// Approve receipt
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.receipt.update({
    where: { id: parseInt(params.id) },
    data: { approved: true },
  });

  return NextResponse.json({ success: true });
}
