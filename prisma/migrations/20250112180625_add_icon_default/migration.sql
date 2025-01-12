-- AlterTable
ALTER TABLE "QuickExpense" ALTER COLUMN "order" SET DEFAULT 0,
ALTER COLUMN "icon" SET DEFAULT 'ShoppingCart';

-- CreateIndex
CREATE INDEX "QuickExpense_user_id_idx" ON "QuickExpense"("user_id");
