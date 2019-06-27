-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 26 juin 2019 à 21:59
-- Version du serveur :  5.7.24
-- Version de PHP :  7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `e_comerce`
--

-- --------------------------------------------------------

--
-- Structure de la table `article`
--

DROP TABLE IF EXISTS `article`;
CREATE TABLE IF NOT EXISTS `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `price` int(10) UNSIGNED NOT NULL,
  `images` longtext COLLATE utf8mb4_unicode_ci COMMENT '(DC2Type:json)',
  `nb_views` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_23A0E66A76ED395` (`user_id`),
  KEY `IDX_23A0E6612469DE2` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `article`
--

INSERT INTO `article` (`id`, `user_id`, `category_id`, `title`, `description`, `price`, `images`, `nb_views`, `stock`) VALUES
(3, 3, 4, 'Asus ROG Swift PG35VQ', 'Le moniteur PC ASUS ROG Swift PG35VQ est un écran gaming incurvé haut de gamme dédié aux joueurs PC les plus exigeants ! Parmi ses attributs techniques, se dégagent une imposante dalle VA 35 pouces à la résolution UWQHD (3440 x 1440 pixels), un incroyable taux de rafraîchissement de 200 Hz et la compatibilité avec la technologie G-SYNC Ultimate pour une fluidité inégalée !', 2750, '[\"17ea6054b7150a7dd395381141853ba3.png\",\"66fdab3ea211a121e2e3a04e79f983dd.png\",\"0824e7dd039e78f6d79ae41693debad7.png\"]', 2, 20),
(4, 3, 4, 'Samsung C49RG90', 'Bienvenue dans l\'univers de la 5K ! L\'écran gamer Samsung C49RG90 (LC49RG90SSUXEN) ultra large de 49 pouces incurvé à 1800R et au format 32:9 assure des expériences gaming ultra-réalistes. Ce moniteur prend en charge des fonctionnalités et des technologies avancées comme l\'Upscalling, la Quantum Dot, la compatibilité FreeSync 2, un taux de rafraîchissement à 120Hz ou la résolution 5K 5120 x 1440.', 1484, '[\"3d9ea8be353e1b981de834e7efad4ce5.png\",\"4a7e5bf869e187cfb98646530be99bd5.png\"]', 1, 14),
(6, 3, 3, 'Duality', ' Non content d\'être massif, le boitier Corsair 1000D offre une possibilité unique parmi les PC de notre gamme : celle de pouvoir monter dans le même boitier deux PC complets ! Un processeur Intel, un processeur AMD, 3 cartes graphiques, plus de 16 To de stockage, 48 Go de RAM et 2 circuits de watercooling distincts, voilà ce que nous avons intégré dans ce monstre, et il reste de la place ! Outre le fait un peu trivial de pouvoir jouer en LAN à deux sur la même machine, le PC gamer Duality est également la config rêvées des streamers. Mais si votre passion ou votre travail vous impose l\'usage de plusieurs PC en même temps, la Duality est également pour vous.', 8500, '[\"f7d151a41785d17f9f3aa5d63027c832.png\",\"94a7ac26d78b20946622161fb2671362.png\"]', 1, 5),
(7, 3, 3, 'ACER Predator Helios 500 PH517-51-92N7', 'Avec son PC Portable Helios 500 PH517-51-92N7, Acer continue d\'étoffer sa gamme Predator ! Pas d\'inquiétude, elle conserve tous les éléments qui ont fait son succès et sa renommée. En plus d\'un châssis taillé pour le jeu, vous retrouverez tous les composants nécessaires à une expérience de jeu unique : dalle IPS Gsync 144Hz, SSD PCIe de 256 Go et processeur Intel i9 de dernière génération !', 2499, '[\"71daa0a9fef40524dc0c5fd044581fc9.png\",\"0b84668a7492df65c184dd7a30384166.png\",\"3a44064a0228014cfc22c24371302e19.png\"]', 0, 10);

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_64C19C1727ACA70` (`parent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `parent_id`, `name`) VALUES
(3, NULL, 'Desktops & Laptops'),
(4, NULL, 'Peripheral device'),
(5, NULL, 'PC Components'),
(6, NULL, 'Accessories'),
(11, 5, 'Graphic Card'),
(12, 5, 'Processor'),
(13, 5, 'Motherboards'),
(14, 5, 'Ram'),
(15, 5, 'Storages'),
(16, 5, 'PC Boxes'),
(23, 4, 'Computer Screen'),
(24, 4, 'Keyboards & Mouses'),
(25, 4, 'Micro Headsets'),
(26, 4, 'Joysticks'),
(31, 3, 'Laptops'),
(32, 3, 'Computers');

-- --------------------------------------------------------

--
-- Structure de la table `migration_versions`
--

DROP TABLE IF EXISTS `migration_versions`;
CREATE TABLE IF NOT EXISTS `migration_versions` (
  `version` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `executed_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migration_versions`
--

INSERT INTO `migration_versions` (`version`, `executed_at`) VALUES
('20190614170252', '2019-06-16 06:53:55');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:json)',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token_expiration` datetime DEFAULT NULL,
  `token` longtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `token_expiration`, `token`) VALUES
(3, 'so@mail.com', '[\"ROLE_ADMIN\"]', '$argon2i$v=19$m=1024,t=2,p=2$aWRuS0RWMG1xMk5yOE91ag$hEDi8ofe9CgMmUysjswmnIpMnh+sKu5EMgO08hfP3IM', '2019-06-28 22:22:38', 'YTozOntzOjQ6InJhbmQiO3M6NDM6IjBFcFYyS19SeWYwTEtsSGcwQXMyOFZQNGhObnFzZE1PcFVKdXZqWm5YS0UiO3M6NzoiZXhwaXJlcyI7aToxNTYxNzUzMzU4O3M6NToiZW1haWwiO3M6MTE6InNvQG1haWwuY29tIjt9');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `FK_23A0E6612469DE2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `FK_23A0E66A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `FK_64C19C1727ACA70` FOREIGN KEY (`parent_id`) REFERENCES `category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
