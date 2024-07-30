CREATE DATABASE  IF NOT EXISTS `bibiloteca` /*!40100 DEFAULT CHARACTER SET utf16 COLLATE utf16_spanish2_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bibiloteca`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: bibiloteca
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_books`
--

DROP TABLE IF EXISTS `tbl_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_books` (
  `id_book` int NOT NULL AUTO_INCREMENT,
  `nombre_book` varchar(280) COLLATE armscii8_bin NOT NULL DEFAULT '0',
  `id_categoria` int NOT NULL,
  `url` varchar(400) COLLATE armscii8_bin NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_book`),
  KEY `FK_tbl_books_tbl_categoria` (`id_categoria`),
  CONSTRAINT `FK_tbl_books_tbl_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `tbl_categoria` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin COMMENT='representa los libros en pdf';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_books`
--

LOCK TABLES `tbl_books` WRITE;
/*!40000 ALTER TABLE `tbl_books` DISABLE KEYS */;
INSERT INTO `tbl_books` VALUES (5,'ejem',1,'book/ejem/dg'),(6,'linux',2,'book/linux/general'),(8,'pata2',4,'book/pata2/lectura');
/*!40000 ALTER TABLE `tbl_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_categoria`
--

DROP TABLE IF EXISTS `tbl_categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(180) CHARACTER SET ucs2 COLLATE ucs2_spanish2_ci NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_categoria`
--

LOCK TABLES `tbl_categoria` WRITE;
/*!40000 ALTER TABLE `tbl_categoria` DISABLE KEYS */;
INSERT INTO `tbl_categoria` VALUES (1,'dg'),(2,'general'),(4,'lectura');
/*!40000 ALTER TABLE `tbl_categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_libro`
--

DROP TABLE IF EXISTS `tbl_libro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_libro` (
  `id_libro` int NOT NULL AUTO_INCREMENT,
  `id_categoria` int NOT NULL DEFAULT '0',
  `tituloe_libro` varchar(120) COLLATE utf8mb3_spanish2_ci NOT NULL,
  `edicion_libro` varchar(50) COLLATE utf8mb3_spanish2_ci NOT NULL,
  `author` varchar(180) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  `Editorial` varchar(180) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  `estado` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_libro`),
  KEY `FK_tbl_libro_tbl_categoria` (`id_categoria`),
  CONSTRAINT `FK_tbl_libro_tbl_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `tbl_categoria` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci COMMENT='representa los libros fisicos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_libro`
--

LOCK TABLES `tbl_libro` WRITE;
/*!40000 ALTER TABLE `tbl_libro` DISABLE KEYS */;
INSERT INTO `tbl_libro` VALUES (4,2,'juan','blscker','juan','blacker',0),(5,4,'pedro','blscker12','juan22','blacker322',0);
/*!40000 ALTER TABLE `tbl_libro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_usuario`
--

DROP TABLE IF EXISTS `tbl_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(80) COLLATE armscii8_bin NOT NULL DEFAULT '0',
  `contraseña_usuario` varchar(80) COLLATE armscii8_bin NOT NULL DEFAULT '0',
  `rango` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_usuario`
--

LOCK TABLES `tbl_usuario` WRITE;
/*!40000 ALTER TABLE `tbl_usuario` DISABLE KEYS */;
INSERT INTO `tbl_usuario` VALUES (1,'kevin','kevin',1);
/*!40000 ALTER TABLE `tbl_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bibiloteca'
--

--
-- Dumping routines for database 'bibiloteca'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-29  6:19:40
