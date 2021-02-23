-- AlterTable
ALTER TABLE `media` MODIFY `source` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `records` MODIFY `url` TEXT NOT NULL,
    MODIFY `title` TEXT NOT NULL,
    MODIFY `description` LONGTEXT,
    MODIFY `favicon` TEXT;
