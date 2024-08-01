-- DropForeignKey
ALTER TABLE "TimeCard" DROP CONSTRAINT "TimeCard_userId_fkey";

-- AddForeignKey
ALTER TABLE "TimeCard" ADD CONSTRAINT "TimeCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
