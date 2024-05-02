/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Type` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Account_id_key` ON `Account`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Transaction_id_key` ON `Transaction`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Type_id_key` ON `Type`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_id_key` ON `User`(`id`);
