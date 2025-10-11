/*
  Warnings:

  - You are about to drop the column `completedAt` on the `Assessment` table. All the data in the column will be lost.
  - You are about to drop the column `currentChallenges` on the `Assessment` table. All the data in the column will be lost.
  - The `goals` column on the `Assessment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `title` on the `Note` table. All the data in the column will be lost.
  - Made the column `companyName` on table `Assessment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `topProjects` on table `Assessment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `roiEstimates` on table `Assessment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `actionPlan` on table `Assessment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Assessment" DROP CONSTRAINT "Assessment_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Note" DROP CONSTRAINT "Note_userId_fkey";

-- DropIndex
DROP INDEX "public"."Assessment_userId_idx";

-- DropIndex
DROP INDEX "public"."Note_userId_idx";

-- AlterTable
ALTER TABLE "Assessment" DROP COLUMN "completedAt",
DROP COLUMN "currentChallenges",
ADD COLUMN     "challenges" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "companyName" SET NOT NULL,
DROP COLUMN "goals",
ADD COLUMN     "goals" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "topProjects" SET NOT NULL,
ALTER COLUMN "topProjects" SET DEFAULT '[]',
ALTER COLUMN "roiEstimates" SET NOT NULL,
ALTER COLUMN "roiEstimates" SET DEFAULT '{}',
ALTER COLUMN "actionPlan" SET NOT NULL,
ALTER COLUMN "actionPlan" SET DEFAULT '{}';

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "title";

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
