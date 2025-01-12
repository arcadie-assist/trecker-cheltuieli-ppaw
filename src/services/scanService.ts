import { prisma } from "@/lib/prismaClient";
import { dummyItems, markets } from "@/utils/dummyItems";
import { Logger } from "@/utils/logger";

export class ScanService {
  private logger: Logger;

  constructor() {
    this.logger = new Logger("ScanService");
  }

  async validateAndDecrementScans(userId: number) {
    this.logger.info(`Validating scans for user ${userId}`);

    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          scans_remaining: true,
        },
      });

      if (!user) {
        this.logger.error(`User not found: ${userId}`);
        throw new Error("User not found");
      }

      if (user.scans_remaining <= 0) {
        this.logger.warn(`No scans remaining for user ${userId}`);
        throw new Error("No scans remaining");
      }

      this.logger.info(`Decrementing scans for user ${userId}`, {
        before: user.scans_remaining,
        after: user.scans_remaining - 1,
      });

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          scans_remaining: {
            decrement: 1,
          },
        },
      });

      return updatedUser;
    });
  }

  async processReceipt(userId: number) {
    this.logger.info(`Processing receipt for user ${userId}`);

    try {
      const user = await this.validateAndDecrementScans(userId);

      // Generate random receipt data
      const numItems = Math.floor(Math.random() * 5) + 3;
      this.logger.info(`Generating ${numItems} items for receipt`);

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

      this.logger.info(`Creating receipt in database`, {
        itemCount: selectedItems.length,
      });

      const receipt = await prisma.receipt.create({
        data: {
          user_id: userId,
          name: `Receipt ${new Date().toLocaleDateString()}`,
          market: markets[Math.floor(Math.random() * markets.length)],
          currency: "RON",
          approved: false,
          items: {
            create: selectedItems,
          },
        },
        include: {
          items: true,
        },
      });

      this.logger.info(`Receipt created successfully`, {
        receiptId: receipt.id,
        scansRemaining: user.scans_remaining - 1,
      });

      return {
        receipt,
        scansRemaining: user.scans_remaining - 1,
      };
    } catch (error) {
      this.logger.error(`Failed to process receipt`, error);
      if (error instanceof Error) {
        throw new Error(`Scan failed: ${error.message}`);
      }
      throw error;
    }
  }

  async approveReceipt(receiptId: number, userId: number) {
    this.logger.info(`Approving receipt`, { receiptId, userId });

    try {
      const receipt = await prisma.receipt.update({
        where: {
          id: receiptId,
          user_id: userId,
        },
        data: {
          approved: true,
        },
        include: {
          items: true,
        },
      });

      this.logger.info(`Receipt approved successfully`, { receiptId });
      return receipt;
    } catch (error) {
      this.logger.error(`Failed to approve receipt`, { receiptId, error });
      throw error;
    }
  }

  async softDeleteReceipt(receiptId: number, userId: number) {
    this.logger.info(`Soft deleting receipt`, { receiptId, userId });

    try {
      const receipt = await prisma.receipt.update({
        where: {
          id: receiptId,
          user_id: userId,
        },
        data: {
          approved: false,
        },
      });

      this.logger.info(`Receipt soft deleted successfully`, { receiptId });
      return receipt;
    } catch (error) {
      this.logger.error(`Failed to soft delete receipt`, { receiptId, error });
      throw error;
    }
  }

  async getReceipts(userId: number, includeUnapproved: boolean = false) {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    return await prisma.receipt.findMany({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfDay,
          lte: endOfDay,
        },
        ...(includeUnapproved ? {} : { approved: true }),
      },
      include: {
        items: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  async getReceiptById(
    receiptId: number,
    userId: number,
    includeUnapproved: boolean = true
  ) {
    return await prisma.receipt.findFirst({
      where: {
        id: receiptId,
        user_id: userId,
        ...(includeUnapproved ? {} : { approved: true }),
      },
      include: {
        items: true,
      },
    });
  }

  async getRemainingScans(userId: number): Promise<number> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { scans_remaining: true },
    });

    return user?.scans_remaining ?? 0;
  }
}
