/*
  Warnings:

  - Made the column `birth_day` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `birth_day` DATETIME(3) NOT NULL;
