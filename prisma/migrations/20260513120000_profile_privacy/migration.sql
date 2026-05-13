-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "privacyAccepted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "privacyAnswers" JSONB;

