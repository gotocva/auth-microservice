


// DROP TABLE `auth`;

// DROP TABLE IF EXISTS `auth`;
// CREATE TABLE `auth` (
//   `id` int unsigned NOT NULL AUTO_INCREMENT,
//   `username` varchar(30) NOT NULL,
//   `email` varchar(30) NOT NULL,
//   `token` varchar(250) NOT NULL,
//   `otp` varchar(6) NOT NULL,
//   `email_verified` int DEFAULT '0',
//   `password` varchar(150) DEFAULT NULL,
//   `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//   PRIMARY KEY (`id`),
//   UNIQUE KEY `username` (`username`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;