import { NextResponse } from "next/server";
import { dummyItems, markets } from "@/utils/dummyItems";
import { prisma } from "@/lib/prismaClient";

export async function POST() {
  const user = await prisma.user.findUnique({
    where: { id: 1 },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (user.scans_remaining <= 0) {
    return NextResponse.json({ error: "No scans remaining" }, { status: 403 });
  }

  // Generate random receipt data
  const numItems = Math.floor(Math.random() * 5) + 3; // 3-7 items
  const selectedItems = [];

  for (let i = 0; i < numItems; i++) {
    const item = dummyItems[Math.floor(Math.random() * dummyItems.length)];
    const quantity = Math.floor(Math.random() * 3) + 1;
    const price =
      item.priceRange[0] +
      Math.random() * (item.priceRange[1] - item.priceRange[0]);

    selectedItems.push({
      name: item.name,
      quantity,
      amount: Number(price.toFixed(2)),
      unit: item.unit,
    });
  }

  // Create receipt in database
  const receipt = await prisma.receipt.create({
    data: {
      user_id: user.id,
      name: `Receipt ${new Date().toLocaleDateString()}`,
      market: markets[Math.floor(Math.random() * markets.length)],
      currency: "USD",
      items: {
        create: selectedItems,
      },
    },
    include: {
      items: true,
    },
  });

  // Decrease remaining scans
  await prisma.user.update({
    where: { id: user.id },
    data: { scans_remaining: user.scans_remaining - 1 },
  });

  return NextResponse.json(receipt);
}
