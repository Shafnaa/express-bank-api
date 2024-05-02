/*
  Warnings:

  - You are about to drop the column `accountId` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `fromAccountId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toAccountId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_accountId_fkey`;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `accountId`,
    ADD COLUMN `fromAccountId` INTEGER NOT NULL,
    ADD COLUMN `toAccountId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_fromAccountId_fkey` FOREIGN KEY (`fromAccountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_toAccountId_fkey` FOREIGN KEY (`toAccountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
