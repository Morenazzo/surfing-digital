-- AlterTable
ALTER TABLE "Assessment" ADD COLUMN     "country" TEXT,
ADD COLUMN     "formResponses" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "primaryGoal" TEXT,
ADD COLUMN     "role" TEXT,
ADD COLUMN     "strategicThreats" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "topKPI" TEXT,
ADD COLUMN     "urgency" TEXT,
ADD COLUMN     "website" TEXT;
