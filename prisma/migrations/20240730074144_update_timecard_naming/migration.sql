/*
  Warnings:

  - You are about to drop the column `clockIn` on the `TimeCard` table. All the data in the column will be lost.
  - You are about to drop the column `clockOut` on the `TimeCard` table. All the data in the column will be lost.
  - Added the required column `date` to the `TimeCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TimeCard" DROP COLUMN "clockIn",
DROP COLUMN "clockOut",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3),
ADD COLUMN     "startTime" TIMESTAMP(3);
