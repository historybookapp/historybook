/*
  Warnings:

  - You are about to drop the `record_categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `record_categories` DROP FOREIGN KEY `record_categories_ibfk_1`;

-- DropForeignKey
ALTER TABLE `record_categories` DROP FOREIGN KEY `record_categories_ibfk_2`;

-- AlterTable
ALTER TABLE `categories` ADD COLUMN     `recordId` INTEGER;

-- DropTable
DROP TABLE `record_categories`;

-- AddForeignKey
ALTER TABLE `categories` ADD FOREIGN KEY (`recordId`) REFERENCES `records`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
