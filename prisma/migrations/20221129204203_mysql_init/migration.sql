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
CREATE TABLE `Sorts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lng` VARCHAR(191) NOT NULL DEFAULT 'fr',
    `lvls` INTEGER NOT NULL DEFAULT 0,
    `TmpInc` VARCHAR(191) NOT NULL DEFAULT '1_act',
    `Portee` INTEGER NOT NULL DEFAULT 0,
    `Compo` VARCHAR(191) NOT NULL DEFAULT 'V,S',
    `Requis` VARCHAR(191) NOT NULL DEFAULT '',
    `Duree` VARCHAR(191) NOT NULL DEFAULT 'instant',
    `Description` VARCHAR(6000) NOT NULL DEFAULT '',
    `Effet` VARCHAR(191) NOT NULL DEFAULT 'deg lvl0:deg:ice:1d6: lvl5:deg:ice:1d6: lvl11:deg:ice:1d6: lvl17:deg:ice:1d6:',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Player` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lvl` INTEGER NOT NULL DEFAULT 1,
    `alignement` VARCHAR(191) NOT NULL DEFAULT 'chaotique bon',
    `classe` VARCHAR(191) NOT NULL DEFAULT '',
    `ssclasse` VARCHAR(191) NOT NULL DEFAULT '',
    `race` VARCHAR(191) NOT NULL DEFAULT '',
    `sexe` VARCHAR(191) NOT NULL DEFAULT 'm',
    `force` INTEGER NOT NULL DEFAULT 10,
    `dexterite` INTEGER NOT NULL DEFAULT 10,
    `constitution` INTEGER NOT NULL DEFAULT 10,
    `intelligence` INTEGER NOT NULL DEFAULT 10,
    `sagesse` INTEGER NOT NULL DEFAULT 10,
    `charisme` INTEGER NOT NULL DEFAULT 10,
    `vitesse` INTEGER NOT NULL DEFAULT 9,
    `vie` INTEGER NOT NULL DEFAULT 8,
    `vie_de` INTEGER NOT NULL DEFAULT 8,
    `vie_max` INTEGER NOT NULL DEFAULT 8,
    `vie_temp` INTEGER NOT NULL DEFAULT 0,
    `jds_mort_echec` INTEGER NOT NULL DEFAULT 0,
    `jds_mort_succ` INTEGER NOT NULL DEFAULT 0,
    `armes` VARCHAR(191) NOT NULL DEFAULT 'armes courantes',
    `armure` VARCHAR(191) NOT NULL DEFAULT 'legere',
    `outils` VARCHAR(191) NOT NULL DEFAULT '',
    `PP` INTEGER NOT NULL DEFAULT 0,
    `PO` INTEGER NOT NULL DEFAULT 10,
    `PA` INTEGER NOT NULL DEFAULT 0,
    `PC` INTEGER NOT NULL DEFAULT 0,
    `apparence` TEXT NOT NULL,
    `traits` TEXT NOT NULL,
    `ideaux` TEXT NOT NULL,
    `liens` TEXT NOT NULL,
    `defaut` TEXT NOT NULL,
    `historique` TEXT NOT NULL,
    `allies` TEXT NOT NULL,
    `PX` INTEGER NOT NULL DEFAULT 0,
    `NextPX` INTEGER NOT NULL DEFAULT 300,
    `notes` TEXT NOT NULL,
    `props` TEXT NOT NULL,
    `tresor` TEXT NOT NULL,
    `details` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Langue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `lng` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SortPlayer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Player_id` INTEGER NOT NULL,
    `sort_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Acrob` INTEGER NOT NULL DEFAULT 0,
    `Arcane` INTEGER NOT NULL DEFAULT 0,
    `Athel` INTEGER NOT NULL DEFAULT 0,
    `Discr` INTEGER NOT NULL DEFAULT 0,
    `Dress` INTEGER NOT NULL DEFAULT 0,
    `Escam` INTEGER NOT NULL DEFAULT 0,
    `Hist` INTEGER NOT NULL DEFAULT 0,
    `Intim` INTEGER NOT NULL DEFAULT 0,
    `Invest` INTEGER NOT NULL DEFAULT 0,
    `Medecin` INTEGER NOT NULL DEFAULT 0,
    `Nature` INTEGER NOT NULL DEFAULT 0,
    `Percept` INTEGER NOT NULL DEFAULT 0,
    `Persuat` INTEGER NOT NULL DEFAULT 0,
    `Relig` INTEGER NOT NULL DEFAULT 0,
    `Repres` INTEGER NOT NULL DEFAULT 0,
    `Survie` INTEGER NOT NULL DEFAULT 0,
    `Tromp` INTEGER NOT NULL DEFAULT 0,
    `Player_id` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Combat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `initiative` INTEGER NOT NULL DEFAULT 0,
    `arme1Id` INTEGER NOT NULL,
    `arme2Id` INTEGER NOT NULL,
    `arme3Id` INTEGER NOT NULL,
    `arme4Id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Armes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `degat` VARCHAR(191) NOT NULL DEFAULT '1d6:contondant',
    `poids` DOUBLE NOT NULL DEFAULT 0,
    `prix` VARCHAR(191) NOT NULL DEFAULT '1pc',
    `portee` INTEGER NOT NULL DEFAULT 0,
    `props` VARCHAR(191) NOT NULL DEFAULT '',
    `typeArm` VARCHAR(191) NOT NULL DEFAULT 'polyvalente',
    `desc` VARCHAR(191) NOT NULL DEFAULT '',
    `hist` VARCHAR(191) NOT NULL DEFAULT '',
    `trigged` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sac_a_dos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `player_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL DEFAULT 0,
    `item_nmb` INTEGER NOT NULL,
    `armeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `props` VARCHAR(191) NOT NULL DEFAULT '',
    `poids` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Terrain` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `hauteur` INTEGER NOT NULL DEFAULT 0,
    `difficulte` INTEGER NOT NULL DEFAULT 0,
    `couleur` VARCHAR(191) NOT NULL DEFAULT '#000',
    `image` VARCHAR(191) NOT NULL DEFAULT '',
    `plafond` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Piege` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `niveau` INTEGER NOT NULL DEFAULT 1,
    `menace` INTEGER NOT NULL DEFAULT 1,
    `declencheur` VARCHAR(191) NOT NULL DEFAULT 'decl:pression desc:Une créature qui marche sur le piège l''active',
    `spell` INTEGER NOT NULL DEFAULT 0,
    `initiave` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Porte` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `life` INTEGER NOT NULL DEFAULT 0,
    `desc` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `desc` VARCHAR(191) NOT NULL DEFAULT '',
    `pngId` INTEGER NOT NULL DEFAULT 0,
    `typeId` INTEGER NOT NULL DEFAULT 0,
    `props` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ACL` ADD CONSTRAINT `ACL_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Langue` ADD CONSTRAINT `Langue_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SortPlayer` ADD CONSTRAINT `SortPlayer_Player_id_fkey` FOREIGN KEY (`Player_id`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SortPlayer` ADD CONSTRAINT `SortPlayer_sort_id_fkey` FOREIGN KEY (`sort_id`) REFERENCES `Sorts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jet` ADD CONSTRAINT `Jet_Player_id_fkey` FOREIGN KEY (`Player_id`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Combat` ADD CONSTRAINT `Combat_arme1Id_fkey` FOREIGN KEY (`arme1Id`) REFERENCES `Armes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Combat` ADD CONSTRAINT `Combat_arme2Id_fkey` FOREIGN KEY (`arme2Id`) REFERENCES `Armes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Combat` ADD CONSTRAINT `Combat_arme3Id_fkey` FOREIGN KEY (`arme3Id`) REFERENCES `Armes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Combat` ADD CONSTRAINT `Combat_arme4Id_fkey` FOREIGN KEY (`arme4Id`) REFERENCES `Armes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sac_a_dos` ADD CONSTRAINT `Sac_a_dos_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sac_a_dos` ADD CONSTRAINT `Sac_a_dos_armeId_fkey` FOREIGN KEY (`armeId`) REFERENCES `Armes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
