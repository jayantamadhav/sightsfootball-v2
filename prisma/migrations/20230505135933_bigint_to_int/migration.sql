-- AlterTable
ALTER TABLE `Post` ADD COLUMN `views` INTEGER NULL DEFAULT 0,
    MODIFY `content` VARCHAR(191) NULL;
