/*
  Warnings:

  - You are about to drop the column `exmaples` on the `problem` table. All the data in the column will be lost.
  - You are about to drop the column `referanceSolution` on the `problem` table. All the data in the column will be lost.
  - Added the required column `examples` to the `problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceSolutions` to the `problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."problem" DROP COLUMN "exmaples",
DROP COLUMN "referanceSolution",
ADD COLUMN     "examples" JSONB NOT NULL,
ADD COLUMN     "referenceSolutions" JSONB NOT NULL;
