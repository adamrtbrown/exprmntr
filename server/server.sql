SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `goals`;
CREATE TABLE `goals` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL,
  `goal` tinytext NOT NULL,
  `success` tinytext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  CONSTRAINT `goals_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `signing_keys`;
CREATE TABLE `signing_keys` (
  `id` int NOT NULL,
  `latest` varchar(4096) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `previous` varchar(4096) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;