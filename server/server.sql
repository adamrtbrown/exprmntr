-- Adminer 4.7.7 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `goals`;
CREATE TABLE `goals` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL,
  `title` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `success` tinytext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  CONSTRAINT `goals_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `metrics`;
CREATE TABLE `metrics` (
  `goal_id` bigint unsigned NOT NULL,
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(256) NOT NULL,
  `value` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `goal_id` (`goal_id`),
  CONSTRAINT `metrics_ibfk_1` FOREIGN KEY (`goal_id`) REFERENCES `goals` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `signing_keys`;
CREATE TABLE `signing_keys` (
  `id` int NOT NULL,
  `latest` varchar(4096) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `previous` varchar(4096) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- 2020-08-28 19:44:01
