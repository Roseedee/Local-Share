-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2025 at 05:43 PM
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
CREATE DATABASE IF NOT EXISTS `local-share` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `local-share`;

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `client_id` int(11) NOT NULL,
  `client_uuid` varchar(255) NOT NULL,
  `client_name` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'Client'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`client_id`, `client_uuid`, `client_name`, `role`) VALUES
(76, '34a29e19-fb45-4198-9c57-17bb995b243b', 'asdfasdfasdf', 'Client'),
(77, '9b9bd2ac-daa4-46b5-98af-c6642ec74736', 'fasdfasdf', 'Client'),
(78, 'fbb14f5c-6186-477b-98a3-8fd5ae29ecf7', 'asdwerw2rd', 'Client'),
(79, '25fe8214-1448-4754-a4ee-11a71c84cae2', 'Post Server', 'Client');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `file_id` int(10) NOT NULL,
  `file_org_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `file_new_name` varchar(255) NOT NULL,
  `file_type` varchar(100) NOT NULL,
  `file_size` int(11) NOT NULL COMMENT 'byte',
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `client_uuid_source` int(11) NOT NULL,
  `client_uuid_target` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`file_id`, `file_org_name`, `file_new_name`, `file_type`, `file_size`, `create_at`, `client_uuid_source`, `client_uuid_target`) VALUES
(1, 'video_20251027_135921.mp4', 'ff37f99d-7ecb-4408-b38a-f5d12b82dbe9.mp4', 'video/mp4', 71569506, '2025-11-04 16:34:00', 79, 79),
(2, 'video_20251027_135921.mp4', 'cc3172c6-d8fb-4027-9ccb-8c3a2b080c7d.mp4', 'video/mp4', 71569506, '2025-11-04 16:42:32', 79, 79),
(3, 'IMG_20251027_143017.jpg', '7bff8b1d-259a-407c-a9d8-31b9d20f1c92.jpg', 'image/jpeg', 2830611, '2025-11-04 16:42:33', 79, 79),
(4, 'IMG_20251027_143017-2.jpg', 'c6bf4922-7793-4449-9a0e-fd53843f11d0.jpg', 'image/jpeg', 2830611, '2025-11-04 16:42:33', 79, 79),
(5, 'IMG_20251027_143002.jpg', '7da88989-5cee-4867-a4a0-a16f052bdcc0.jpg', 'image/jpeg', 3868800, '2025-11-04 16:43:26', 79, 76),
(6, 'IMG_20251027_143002-2.jpg', 'a53aa472-9d2f-4bdf-8bcf-49e977cd1844.jpg', 'image/jpeg', 3868800, '2025-11-04 16:43:26', 79, 76),
(7, 'edit - Copy.png', '90823029-6eea-4a7f-8a6b-17b83d246a92.png', 'image/png', 1012, '2025-11-04 16:43:38', 79, 77),
(8, 'edit.png', 'b1707873-4fe3-4cc3-b0eb-4c604ba335eb.png', 'image/png', 1012, '2025-11-04 16:43:38', 79, 77),
(9, 'test2.jpg', 'f2f42d50-0d67-4458-aadf-fa0b34ac61ce.jpg', 'image/jpeg', 676469, '2025-11-04 16:43:49', 79, 78),
(10, 'TaskDataEx.ts', '1bfe0453-31c6-48cd-9940-1acadd98a7b5.ts', 'text/plain', 0, '2025-11-04 16:43:49', 79, 78),
(11, 'React Image.png', 'b7e66961-3175-485c-9eeb-36b53eb4648e.png', 'image/png', 240893, '2025-11-04 16:43:50', 79, 78),
(12, 'IMG_20251027_143017.jpg', '5c21974d-0965-4cb1-a3a2-ce9a05ca7cb7.jpg', 'image/jpeg', 2830611, '2025-11-05 00:24:24', 79, 79),
(13, 'IMG_20251027_143017-2.jpg', '0fc07f85-2a43-4d9e-86d8-53bd7c878a09.jpg', 'image/jpeg', 2830611, '2025-11-05 00:24:24', 79, 79),
(14, 'IMG_20251027_143002.jpg', '203da34d-45ba-413f-85d5-7b94f2657aa2.jpg', 'image/jpeg', 3868800, '2025-11-05 00:24:24', 79, 79),
(15, 'IMG_20251027_143002-2.jpg', 'd8a8bca8-cc24-442a-991f-d8f296cc5b19.jpg', 'image/jpeg', 3868800, '2025-11-05 00:24:24', 79, 79),
(16, 'IMG_20251027_143017.jpg', '1c2d01b8-e8e1-488a-ac62-bc5bc3ce4dbe.jpg', 'image/jpeg', 2830611, '2025-11-05 00:24:25', 79, 79),
(17, 'IMG_20251027_143017-2.jpg', '2ecf45ef-201e-46f9-8a47-1b382916fab5.jpg', 'image/jpeg', 2830611, '2025-11-05 00:24:25', 79, 79),
(18, 'IMG_20251027_143002.jpg', '4ea7b530-8642-46db-87e1-06d5b5c73b07.jpg', 'image/jpeg', 3868800, '2025-11-05 00:24:25', 79, 79),
(19, 'IMG_20251027_143002-2.jpg', '5d514fae-76df-4ff0-96c0-4364536d04ef.jpg', 'image/jpeg', 3868800, '2025-11-05 00:24:25', 79, 79),
(20, 'IDM6.42B42.rar', 'fe0bc14c-1e5e-4eef-bd67-714389e0afe6.rar', 'application/x-compressed', 12370046, '2025-11-05 00:26:52', 79, 79),
(21, 'live-streaming.png', 'a25efd9d-56d6-4c31-9231-65ad79940e99.png', 'image/png', 7624, '2025-11-05 00:26:52', 79, 79),
(22, 'setting.png', 'c8a9d985-f79a-48d4-9622-01c2e7f1e849.png', 'image/png', 494, '2025-11-05 00:26:52', 79, 79),
(23, 'settings.psd', 'ea7edd2e-b7fe-4b8d-b37b-3b508167e240.psd', 'application/octet-stream', 25112, '2025-11-05 00:26:52', 79, 79),
(24, 'IMG_20251027_143017.jpg', 'dcb7ebc1-5faf-456d-a212-c1f8bb7193eb.jpg', 'image/jpeg', 2830611, '2025-11-05 00:32:48', 79, 79),
(25, 'IMG_20251027_143017-2.jpg', '06025ba3-b9bd-4274-b247-e027776a5bcd.jpg', 'image/jpeg', 2830611, '2025-11-05 00:32:48', 79, 79),
(26, 'IMG_20251027_143002.jpg', 'b872d277-1c6f-4835-9ff1-069c0b3b4e83.jpg', 'image/jpeg', 3868800, '2025-11-05 00:32:48', 79, 79),
(27, 'IMG_20251027_143002-2.jpg', '3064f01a-d56e-4891-8b15-821b178c9235.jpg', 'image/jpeg', 3868800, '2025-11-05 00:32:48', 79, 79),
(28, 'IMG_20251027_142959.jpg', 'd45f48f0-ce2f-4295-8850-b212ebecd638.jpg', 'image/jpeg', 2855524, '2025-11-05 00:32:48', 79, 79),
(29, 'IMG_20251027_142959-2.jpg', 'f045d54b-0a22-4c19-8fa8-bad0363d34cd.jpg', 'image/jpeg', 2855524, '2025-11-05 00:32:48', 79, 79),
(30, 'IMG_20251027_143017.jpg', 'af7737db-ea24-427c-bb3e-f7f3a38027bc.jpg', 'image/jpeg', 2830611, '2025-11-05 00:34:15', 79, 79),
(31, 'video-player.png', '6a8b92f1-a98d-4dac-8ab5-280194b2df83.png', 'image/png', 695, '2025-11-05 00:34:43', 79, 79),
(32, 'IMG_20251027_143017-2.jpg', 'c33da362-ed02-4c13-89c5-85a42a0b35aa.jpg', 'image/jpeg', 2830611, '2025-11-05 00:34:54', 79, 79),
(33, 'IMG_20251027_143002.jpg', 'f0071070-ea97-4dc5-b391-7c03c9ee4877.jpg', 'image/jpeg', 3868800, '2025-11-05 00:34:54', 79, 79),
(34, 'IMG_20251027_143002-2.jpg', '121ce2ca-78a6-4586-bc48-08183d80027c.jpg', 'image/jpeg', 3868800, '2025-11-05 00:34:54', 79, 79),
(35, 'IMG_20251027_142959.jpg', 'a74b28e6-a015-45ef-9d54-3f06df478260.jpg', 'image/jpeg', 2855524, '2025-11-05 00:34:54', 79, 79),
(36, 'IMG_20251027_142959-2.jpg', '73b268ec-e9aa-4ecf-8842-b31fc8de2e53.jpg', 'image/jpeg', 2855524, '2025-11-05 00:34:54', 79, 79),
(37, 'IMG_20251027_143017-2.jpg', '9832d8b1-b07a-4692-bceb-8df85d3bff92.jpg', 'image/jpeg', 2830611, '2025-11-05 00:35:45', 79, 79),
(38, 'IMG_20251027_143002.jpg', '1289b141-db44-4485-91dd-0aa4e262bf93.jpg', 'image/jpeg', 3868800, '2025-11-05 00:35:45', 79, 79),
(39, 'IMG_20251027_143002-2.jpg', 'ac0aecb1-4435-416a-92f1-9d2a332138d2.jpg', 'image/jpeg', 3868800, '2025-11-05 00:35:46', 79, 79),
(40, 'IMG_20251027_142959.jpg', '6beab8ef-cb3c-4317-802a-5654b02c8228.jpg', 'image/jpeg', 2855524, '2025-11-05 00:35:46', 79, 79),
(41, 'video_20251027_135921.mp4', '06fb9a71-a6d4-4626-be08-87ca924527c2.mp4', 'video/mp4', 71569506, '2025-11-05 00:35:59', 79, 79),
(42, 'IMG_20251027_143002.jpg', 'f3c8539e-2349-4042-ae43-d78749af9a5f.jpg', 'image/jpeg', 3868800, '2025-11-05 00:46:27', 79, 79),
(43, 'IMG_20251027_143002-2.jpg', 'ad5e1c20-441c-403e-aaa9-4ac40883be51.jpg', 'image/jpeg', 3868800, '2025-11-05 00:46:27', 79, 79),
(44, 'IMG_20251027_142959.jpg', '75ca0aef-a51c-4f3d-aab9-9dbf51e0b7b9.jpg', 'image/jpeg', 2855524, '2025-11-05 00:46:27', 79, 79),
(45, 'IMG_20251027_142959-2.jpg', '1ba6448a-7577-4e20-97c4-d2cf1a4a850c.jpg', 'image/jpeg', 2855524, '2025-11-05 00:46:27', 79, 79),
(46, 'IMG_20251027_143017.jpg', 'a72fc01b-3a7d-45a0-ae15-86227f177395.jpg', 'image/jpeg', 2830611, '2025-11-06 16:01:32', 79, 79),
(47, 'IMG_20251027_143017-2.jpg', '96b61acb-686c-4f40-b2ff-4b5dbc26787a.jpg', 'image/jpeg', 2830611, '2025-11-06 16:01:32', 79, 79),
(48, 'IMG_20251027_143002.jpg', '22fc73f9-6d69-46dc-bed1-9fa1d98109b6.jpg', 'image/jpeg', 3868800, '2025-11-06 16:01:32', 79, 79),
(49, 'IMG_20251027_143002-2.jpg', '7d868b99-1e94-4917-8fe5-cb6924c95d2c.jpg', 'image/jpeg', 3868800, '2025-11-06 16:01:32', 79, 79),
(50, 'IMG_20251027_142959.jpg', 'b25e66ea-2c1d-49e2-9a6c-6c90aaf8af28.jpg', 'image/jpeg', 2855524, '2025-11-06 16:01:32', 79, 79),
(51, 'IMG_20251027_142959-2.jpg', '63a56e46-32f0-4870-a5b9-1a5c6f67f141.jpg', 'image/jpeg', 2855524, '2025-11-06 16:01:32', 79, 79),
(52, 'UF5400.PDF', 'c754d04a-47f3-495d-92c9-7308e83c5a96.PDF', 'application/pdf', 58799, '2025-11-06 16:09:38', 79, 79),
(53, 'TaskDataEx (1).ts', '6b7f1a70-d113-44a0-8e2b-fa4003a46691.ts', 'text/plain', 297, '2025-11-06 16:09:51', 79, 76),
(54, 'invoice.pdf', '90c8e479-e427-4a97-9867-c2f0bfeda16a.pdf', 'application/pdf', 1020559, '2025-11-06 16:09:51', 79, 76),
(55, 'sound.png', '8a84b122-fe9b-446b-8b56-62824ee20708.png', 'image/png', 687, '2025-11-06 16:13:32', 79, 79),
(56, 'document.png', '14a59f4a-ff27-43cb-ac88-70fb7fafeb8d.png', 'image/png', 618, '2025-11-06 16:48:11', 79, 76),
(57, 'other.png', '4435f814-d4c0-43f5-a027-e9b29dcad63a.png', 'image/png', 640, '2025-11-06 16:48:44', 79, 76),
(58, 'document.png', '71d1772b-76d6-4db9-b40a-c0ddd720ebfb.png', 'image/png', 618, '2025-11-06 16:49:48', 79, 76),
(59, 'sound.png', '1e4fedbd-3ef2-4018-b56c-1a59d1abdab3.png', 'image/png', 687, '2025-11-06 16:49:48', 79, 76),
(60, 'other.png', 'a54a525b-798e-470d-89fc-3bb4613b2e65.png', 'image/png', 640, '2025-11-06 16:50:01', 79, 76),
(61, 'document.png', '95de75bf-484e-4259-ad2a-a385b5b2379d.png', 'image/png', 618, '2025-11-06 16:50:01', 79, 76),
(62, 'sound.png', '23ea0dc1-b570-4fe0-a2ab-898fddea61c6.png', 'image/png', 687, '2025-11-06 16:50:01', 79, 76),
(63, 'other.png', '696608c3-c7ff-4b64-963d-132a8b09a9a5.png', 'image/png', 640, '2025-11-06 16:50:14', 79, 76),
(64, 'document.png', '3ccfa151-f5b7-48f7-9fad-aa5bdf3e55e0.png', 'image/png', 618, '2025-11-06 16:50:14', 79, 76),
(65, 'sound.png', '3ed89773-10dd-41ea-8ee7-68843624b3d5.png', 'image/png', 687, '2025-11-06 16:50:14', 79, 76),
(66, 'document.png', 'bfb47c46-3fdd-4137-87d3-cf828c83ed22.png', 'image/png', 618, '2025-11-06 16:59:54', 79, 76),
(67, 'sound.png', '0c67a660-03b7-4e96-aa0e-bea50d2ef68a.png', 'image/png', 687, '2025-11-06 16:59:54', 79, 76),
(68, 'sound.png', '9f1a1040-8003-4d79-b9de-10b4220c155b.png', 'image/png', 687, '2025-11-06 17:09:10', 79, 76),
(69, 'other.png', '9be11839-25f4-4850-9fa7-79d9cc54ef70.png', 'image/png', 640, '2025-11-06 17:14:05', 79, 76),
(70, 'document.png', '092ddffb-98a5-42a3-8d06-d220598b0075.png', 'image/png', 618, '2025-11-06 17:14:05', 79, 76),
(71, 'sound.png', '9fa1ff35-16a8-4ed3-939d-e8c62fc75613.png', 'image/png', 687, '2025-11-06 17:14:05', 79, 76),
(72, 'document.png', '7780a65f-97b2-4c1b-9b38-22c89c5c63e1.png', 'image/png', 618, '2025-11-06 17:14:31', 79, 76),
(73, 'sound.png', '5d676194-7b93-420d-9b3f-6251aa7bd84b.png', 'image/png', 687, '2025-11-06 17:14:31', 79, 76),
(74, 'document.png', '96c4a404-3ad8-4fd3-9d91-ffd52c7bfaf6.png', 'image/png', 618, '2025-11-06 17:20:46', 79, 76),
(75, 'sound.png', '90142f6b-08ad-4777-aa96-94f5b2ca7061.png', 'image/png', 687, '2025-11-06 17:20:46', 79, 76),
(76, 'other.png', '8c7ac831-93b0-4ee0-8212-f91b69da5dc6.png', 'image/png', 640, '2025-11-06 17:21:05', 79, 77),
(77, 'document.png', '68255177-86d1-4ef1-a143-cd7789bc0328.png', 'image/png', 618, '2025-11-06 17:21:05', 79, 77),
(78, 'sound.png', '18f02c27-8996-41b5-bc70-9a70774efbf6.png', 'image/png', 687, '2025-11-06 17:21:05', 79, 77),
(79, 'document.png', 'f6231073-fa76-4b52-8725-62d0db9ed119.png', 'image/png', 618, '2025-11-06 17:22:14', 79, 78),
(80, 'sound.png', 'ff5d774b-eb7d-4c60-8093-458fbf20ec3f.png', 'image/png', 687, '2025-11-06 17:22:14', 79, 78),
(81, 'document.png', '9199835f-c78e-49c8-8076-7bf62ca58bf9.png', 'image/png', 618, '2025-11-06 17:22:34', 79, 79),
(82, 'sound.png', 'cf496e59-ba8d-4d99-bbcb-3082480fdf27.png', 'image/png', 687, '2025-11-06 17:22:34', 79, 79),
(83, 'sound.png', 'b3203f49-8b17-4320-8a5f-2e51c7f59c00.png', 'image/png', 687, '2025-11-06 17:22:40', 79, 76),
(84, 'document.png', '86da0f22-050b-4463-b1bb-68e4291f3ad8.png', 'image/png', 618, '2025-11-06 17:22:48', 79, 79),
(85, 'sound.png', '59135ec1-d571-4e7b-9ca8-8d4fa836ca25.png', 'image/png', 687, '2025-11-06 17:22:48', 79, 79),
(86, 'document.png', '4735dc35-0909-4c0f-84f8-b38ca154a7de.png', 'image/png', 618, '2025-11-06 17:22:59', 79, 76),
(87, 'sound.png', '81d2343f-d2fd-4212-8ec3-a0371f6d8092.png', 'image/png', 687, '2025-11-06 17:22:59', 79, 76),
(88, 'document.png', 'b3bdc0cf-59c2-4927-aec7-ed6368a42644.png', 'image/png', 618, '2025-11-06 17:39:04', 79, 79),
(89, 'sound.png', '69abf73f-1d90-4459-aa89-879a8d09e17f.png', 'image/png', 687, '2025-11-06 17:39:04', 79, 79),
(90, 'other.png', '1bf4de9f-ce6c-43cc-ab1a-9c899b293eaa.png', 'image/png', 640, '2025-11-06 17:39:21', 79, 77),
(91, 'document.png', '0fe187f3-21cd-4e01-a948-07471401b420.png', 'image/png', 618, '2025-11-06 17:39:21', 79, 77),
(92, 'sound.png', '6c2ae28d-f801-450b-81f1-ee6e53c07565.png', 'image/png', 687, '2025-11-06 17:39:21', 79, 77),
(93, 'document.png', 'b0567f51-befd-4c52-b0d8-973ffa23c90c.png', 'image/png', 618, '2025-11-06 17:39:38', 79, 79),
(94, 'sound.png', 'e5cc32b5-b6cd-46fd-ae99-3390ec7bfa09.png', 'image/png', 687, '2025-11-06 17:39:38', 79, 79),
(95, 'other.png', '9f34decc-7a1a-485b-87fc-476f08554c9d.png', 'image/png', 640, '2025-11-06 17:40:19', 79, 79),
(96, 'document.png', 'af6da67f-7c80-4551-9fda-752bf8e72bcf.png', 'image/png', 618, '2025-11-06 17:40:19', 79, 79),
(97, 'sound.png', 'd30e0ffc-f82d-40a6-9f7e-8d9aff0afec6.png', 'image/png', 687, '2025-11-06 17:40:19', 79, 79),
(98, 'other.png', '683d8b86-151e-4257-9185-2774c117b8f6.png', 'image/png', 640, '2025-11-06 17:40:45', 79, 79),
(99, 'document.png', '67d6d882-d87e-487f-a434-9f428814d09e.png', 'image/png', 618, '2025-11-06 17:40:45', 79, 79),
(100, 'sound.png', '09ffbb1a-dd84-47c7-96f9-94e07a50dcd9.png', 'image/png', 687, '2025-11-06 17:40:45', 79, 79),
(101, 'other.png', 'c244a5d6-7f72-4eda-bb81-120b27e5bf92.png', 'image/png', 640, '2025-11-06 17:51:55', 79, 79),
(102, 'document.png', '87612a32-62a7-4b52-854d-444078a9b6c8.png', 'image/png', 618, '2025-11-06 17:51:55', 79, 79),
(103, 'sound.png', '221a492f-3db9-4ab4-96ce-9f9b19fb6260.png', 'image/png', 687, '2025-11-06 17:51:55', 79, 79),
(104, 'video-player.png', '38036868-6af7-4bcb-a1dc-19014313b7fb.png', 'image/png', 695, '2025-11-06 17:51:55', 79, 79),
(105, 'IMG_20251027_143002-2.jpg', 'd39cc1c9-fba8-430f-a459-f26e6dc3719b.jpg', 'image/jpeg', 3868800, '2025-11-11 00:33:12', 79, 78),
(106, 'IMG_20251027_142959.jpg', '7db61163-e4df-4514-a76e-0a264de4b71b.jpg', 'image/jpeg', 2855524, '2025-11-11 00:33:12', 79, 78),
(107, 'IMG_20251027_142959-2.jpg', 'd42112c7-5d41-4a17-96f8-1054d56c7312.jpg', 'image/jpeg', 2855524, '2025-11-11 00:33:12', 79, 78),
(108, 'IMG_20251027_143017.jpg', 'b8d1f48a-9267-4c5b-a703-bddaf4e3b646.jpg', 'image/jpeg', 2830611, '2025-11-11 00:33:27', 79, 78),
(109, 'IMG_20251027_143017-2.jpg', '067e90c0-77bf-4119-ac2c-996ca7b8f820.jpg', 'image/jpeg', 2830611, '2025-11-11 00:33:27', 79, 78),
(110, 'IMG_20251027_143002.jpg', 'ac39ea79-e1e1-4d58-913e-3bb5f29bbcd7.jpg', 'image/jpeg', 3868800, '2025-11-11 00:33:27', 79, 78),
(111, 'IMG_20251027_143002-2.jpg', '374d0826-37ce-447b-b8eb-55e799fab8a7.jpg', 'image/jpeg', 3868800, '2025-11-11 00:33:27', 79, 78),
(112, 'IMG_20251027_143017-2.jpg', '8239e437-dc79-4135-b9e1-ab5da6cc1233.jpg', 'image/jpeg', 2830611, '2025-11-11 00:33:38', 79, 78),
(113, 'IMG_20251027_143002.jpg', 'b7ca559e-c10c-433e-826f-8fbaaba56f2a.jpg', 'image/jpeg', 3868800, '2025-11-11 00:33:38', 79, 78),
(114, 'IMG_20251027_143002-2.jpg', 'b878c78b-95ff-4a71-a1e8-53106186296c.jpg', 'image/jpeg', 3868800, '2025-11-11 00:33:38', 79, 78),
(115, 'IMG_20251027_142959.jpg', '949d8912-b444-4260-a446-a220206347ab.jpg', 'image/jpeg', 2855524, '2025-11-11 00:33:38', 79, 78),
(116, 'IMG_20251027_142959-2.jpg', '959cf308-1e7d-4533-954c-476de4811186.jpg', 'image/jpeg', 2855524, '2025-11-11 00:33:38', 79, 78),
(117, 'IMG_20251027_143002-2.jpg', '68c04895-e8f9-426c-b71d-8421090d9b34.jpg', 'image/jpeg', 3868800, '2025-11-11 00:34:02', 79, 79),
(118, '495072123_637253805940535_7413149436008914458_n.jpg', 'd7cf0931-c2e5-499b-a235-b7227b3fba33.jpg', 'image/jpeg', 9215, '2025-11-11 00:34:47', 79, 78),
(119, 'à¹à¸à¸² - à¸§à¸à¸à¸²à¸à¹à¸à¸ [OFFICIAL AUDIO].flac', 'b84a14b5-96c9-4db8-b3a3-33bae69576c9.flac', 'audio/flac', 26233235, '2025-11-11 00:37:58', 79, 78),
(120, 'à¹à¸à¸² - à¸§à¸à¸à¸²à¸à¹à¸à¸ [OFFICIAL AUDIO].flac', '7f35319a-c4e6-44e4-ae62-20826895879d.flac', 'audio/flac', 26233235, '2025-11-11 00:40:22', 79, 78),
(121, 'test.bmp', '81fa7795-02df-422a-950f-1ae22ba81493.bmp', 'image/bmp', 51254, '2025-11-13 14:06:00', 79, 79);

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
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`file_id`),
  ADD KEY `client_uuid_source` (`client_uuid_source`),
  ADD KEY `client_uuid_target` (`client_uuid_target`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `file_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `files_ibfk_1` FOREIGN KEY (`client_uuid_source`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `files_ibfk_2` FOREIGN KEY (`client_uuid_target`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
