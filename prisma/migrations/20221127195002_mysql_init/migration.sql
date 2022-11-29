-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pseudo` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwd` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL DEFAULT '',

    UNIQUE INDEX `User_pseudo_key`(`pseudo`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ACL` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `table` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sorts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lng` VARCHAR(191) NOT NULL DEFAULT 'fr',
    `lvl` INTEGER NOT NULL DEFAULT 0,
    `TmpInc` VARCHAR(191) NOT NULL DEFAULT '1_act',
    `Portee` INTEGER NOT NULL DEFAULT 0,
    `Compo` VARCHAR(191) NOT NULL DEFAULT 'V,S',
    `Requis` VARCHAR(191) NOT NULL DEFAULT '',
    `Duree` VARCHAR(191) NOT NULL DEFAULT 'instant',
    `Description` VARCHAR(6000) NOT NULL DEFAULT '',
    `Effet` VARCHAR(191) NOT NULL DEFAULT 'deg lvl0:deg:ice:1d6: lvl5:deg:ice:1d6: lvl11:deg:ice:1d6: lvl17:deg:ice:1d6:',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ACL` ADD CONSTRAINT `ACL_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
