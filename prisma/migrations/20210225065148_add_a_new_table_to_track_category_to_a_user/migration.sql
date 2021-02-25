/*
  Warnings:

  - You are about to drop the column `recordId` on the `categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `categories` DROP FOREIGN KEY `categories_ibfk_1`;

-- AlterTable
ALTER TABLE `categories` DROP COLUMN `recordId`;

-- CreateTable
CREATE TABLE `record_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `recordId` INTEGER NOT NULL,
INDEX `userId`(`user_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `record_categories` ADD FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `record_categories` ADD FOREIGN KEY (`recordId`) REFERENCES `records`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
