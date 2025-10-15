-- AlterTable
ALTER TABLE "Assessment" ADD COLUMN     "aiBudget" TEXT,
ADD COLUMN     "aiCapabilities" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "aiMaturityLevel" TEXT,
ADD COLUMN     "aiMaturityScore" INTEGER,
ADD COLUMN     "aiStrategy" TEXT,
ADD COLUMN     "aiTalent" TEXT,
ADD COLUMN     "currentAIUsage" TEXT,
ADD COLUMN     "dataQuality" TEXT;
