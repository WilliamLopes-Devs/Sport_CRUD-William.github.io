/*
  Warnings:

  - You are about to drop the `alunos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `alunos`;

-- CreateTable
CREATE TABLE `Modalidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aluno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `dataNascimento` DATETIME(3) NULL,
    `modalidadeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Aluno` ADD CONSTRAINT `Aluno_modalidadeId_fkey` FOREIGN KEY (`modalidadeId`) REFERENCES `Modalidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
