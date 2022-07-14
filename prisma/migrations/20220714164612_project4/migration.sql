-- DropForeignKey
ALTER TABLE "Budget_Category" DROP CONSTRAINT "Budget_Category_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Budget_Category" ADD CONSTRAINT "Budget_Category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
