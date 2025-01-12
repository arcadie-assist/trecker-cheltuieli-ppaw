import {
  Receipt as PrismaReceipt,
  ReceiptItem as PrismaReceiptItem,
} from "@prisma/client";

type ReceiptCreateBody = Omit<
  PrismaReceipt,
  "id" | "created_at" | "updated_at"
>;

export type { PrismaReceipt, PrismaReceiptItem, ReceiptCreateBody };
