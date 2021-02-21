/*
  Warnings:

  - The migration will remove the values [admin] on the enum `media_mediaType`. If these variants are still used in the database, the migration will fail.

*/
-- AlterTable
ALTER TABLE `media` MODIFY `mediaType` ENUM('image', 'video') NOT NULL;
