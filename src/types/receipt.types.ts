import { Receipt as PrismaReceipt } from "@prisma/client";

type ReceiptCreateBody = Omit<
  PrismaReceipt,
  "id" | "created_at" | "updated_at"
>;

export type { PrismaReceipt, ReceiptCreateBody };
