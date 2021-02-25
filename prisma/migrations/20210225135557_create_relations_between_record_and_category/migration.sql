/*
  Warnings:

  - You are about to drop the column `recordId` on the `categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `categories` DROP FOREIGN KEY `categories_ibfk_1`;

-- AlterTable
ALTER TABLE `categories` DROP COLUMN `recordId`;

-- CreateTable
CREATE TABLE `_CategoryToRecord` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,
UNIQUE INDEX `_CategoryToRecord_AB_unique`(`A`, `B`),
INDEX `_CategoryToRecord_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CategoryToRecord` ADD FOREIGN KEY (`A`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToRecord` ADD FOREIGN KEY (`B`) REFERENCES `records`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
