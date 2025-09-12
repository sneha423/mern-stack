/*
  Warnings:

  - Made the column `compressSize` on table `Video` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Video" ALTER COLUMN "compressSize" SET NOT NULL;
