-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `slug` VARCHAR(191) NOT NULL,
    `recordId` INTEGER,
UNIQUE INDEX `categories.slug_unique`(`slug`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `categories` ADD FOREIGN KEY (`recordId`) REFERENCES `records`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
