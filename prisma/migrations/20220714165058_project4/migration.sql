-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_budget_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "Budget_Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
