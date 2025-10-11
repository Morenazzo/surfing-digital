/*
  Warnings:

  - You are about to drop the column `challenges` on the `Assessment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Assessment" DROP COLUMN "challenges",
ADD COLUMN     "currentChallenges" TEXT,
ALTER COLUMN "companyName" DROP NOT NULL,
ALTER COLUMN "goals" DROP NOT NULL,
ALTER COLUMN "goals" DROP DEFAULT,
ALTER COLUMN "goals" SET DATA TYPE TEXT;
