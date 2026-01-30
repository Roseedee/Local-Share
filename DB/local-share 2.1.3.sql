-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 30, 2026 at 01:01 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `local-share`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_visible_files` (IN `p_viewer_device_id` INT, IN `p_owner_device_id` INT)   SELECT
        f.file_id,
        f.file_org_name,
        f.file_new_name,
        f.file_type,
        f.file_size,
        f.access_scope,
        f.create_at,
        f.uploader_device_id,
        f.owner_device_id,
        CASE
    		WHEN p_viewer_device_id = f.owner_device_id
         		THEN 'rwx'
    		-- 🎯 permission เฉพาะบุคคล
    		WHEN fp.permissions_code IS NOT NULL
         		THEN fp.permissions_code
    		-- 🌍 public / protected default
    		WHEN f.access_scope IN ('PUBLIC','PROTECTED')
         		THEN 'r--'
    		ELSE NULL
		END AS permission_code

        
    FROM files f
    LEFT JOIN files_permissions fp
        ON fp.file_id = f.file_id
       AND fp.device_id = p_viewer_device_id
    WHERE f.owner_device_id = p_owner_device_id
      AND (
            -- 👑 1) OWNER เห็นทุกไฟล์ของตัวเอง
            p_viewer_device_id = f.owner_device_id

         OR -- 🌍 2) PUBLIC ใครก็เห็น
            f.access_scope = 'PUBLIC'

         OR -- 🛡 3) PROTECTED + mutual trust
            (
                f.access_scope = 'PROTECTED'
                AND EXISTS (
                    SELECT 1
                    FROM devices_protected_access dpa
                    WHERE
                        dpa.owner_device_id   = f.owner_device_id
                        AND dpa.allowed_device_id = p_viewer_device_id
                     
                )
            )
        )$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `client_id` int(11) NOT NULL,
  `client_uuid` varchar(255) NOT NULL,
  `client_name` varchar(30) NOT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'Client',
  `storage_limit` bigint(11) UNSIGNED NOT NULL DEFAULT 10737418240
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `devices_protected_access`
--

CREATE TABLE `devices_protected_access` (
  `owner_device_id` int(10) NOT NULL,
  `allowed_device_id` int(10) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `file_id` int(10) NOT NULL,
  `file_org_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `file_new_name` varchar(255) NOT NULL,
  `file_type` varchar(64) NOT NULL,
  `file_size` bigint(20) UNSIGNED NOT NULL COMMENT 'byte',
  `access_scope` enum('PRIVATE','PROTECTED','PUBLIC') NOT NULL DEFAULT 'PRIVATE',
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `uploader_device_id` int(10) NOT NULL,
  `owner_device_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `files_permissions`
--

CREATE TABLE `files_permissions` (
  `device_id` int(10) NOT NULL,
  `file_id` int(10) NOT NULL,
  `permissions_code` char(3) NOT NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp()
) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`client_id`),
  ADD UNIQUE KEY `device_uuid` (`client_uuid`);

--
-- Indexes for table `devices_protected_access`
--
ALTER TABLE `devices_protected_access`
  ADD PRIMARY KEY (`owner_device_id`,`allowed_device_id`),
  ADD KEY `allowed_device_id` (`allowed_device_id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`file_id`),
  ADD KEY `client_uuid_source` (`uploader_device_id`),
  ADD KEY `client_uuid_target` (`owner_device_id`);

--
-- Indexes for table `files_permissions`
--
ALTER TABLE `files_permissions`
  ADD PRIMARY KEY (`device_id`,`file_id`),
  ADD UNIQUE KEY `device_id` (`device_id`,`file_id`),
  ADD KEY `file_id` (`file_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `file_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `devices_protected_access`
--
ALTER TABLE `devices_protected_access`
  ADD CONSTRAINT `devices_protected_access_ibfk_1` FOREIGN KEY (`owner_device_id`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `devices_protected_access_ibfk_2` FOREIGN KEY (`allowed_device_id`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `files_ibfk_1` FOREIGN KEY (`uploader_device_id`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `files_ibfk_2` FOREIGN KEY (`owner_device_id`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `files_permissions`
--
ALTER TABLE `files_permissions`
  ADD CONSTRAINT `files_permissions_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `files_permissions_ibfk_2` FOREIGN KEY (`file_id`) REFERENCES `files` (`file_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
