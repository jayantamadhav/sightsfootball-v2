-- AlterTable
ALTER TABLE `users` ADD COLUMN `accessToken` VARCHAR(191) NULL,
    ADD COLUMN `refreshToken` VARCHAR(191) NULL;
