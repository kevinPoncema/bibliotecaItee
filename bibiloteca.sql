-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-07-2024 a las 20:18:45
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bibiloteca`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_books`
--

CREATE TABLE `tbl_books` (
  `id_book` int(11) NOT NULL,
  `nombre_book` varchar(280) NOT NULL DEFAULT '0',
  `id_categoria` int(11) NOT NULL,
  `url` varchar(400) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin COMMENT='representa los libros en pdf';

--
-- Volcado de datos para la tabla `tbl_books`
--

INSERT INTO `tbl_books` (`id_book`, `nombre_book`, `id_categoria`, `url`) VALUES
(5, 'ejem', 1, 'book/ejem/dg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_categoria`
--

CREATE TABLE `tbl_categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(180) CHARACTER SET ucs2 COLLATE ucs2_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

--
-- Volcado de datos para la tabla `tbl_categoria`
--

INSERT INTO `tbl_categoria` (`id_categoria`, `nombre_categoria`) VALUES
(1, 'dg'),
(2, 'general'),
(4, 'lectura');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_libro`
--

CREATE TABLE `tbl_libro` (
  `id_libro` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL DEFAULT 0,
  `tituloe_libro` varchar(120) NOT NULL,
  `edicion_libro` varchar(50) NOT NULL,
  `author` varchar(180) DEFAULT NULL,
  `Editorial` varchar(180) DEFAULT NULL,
  `estado` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci COMMENT='representa los libros fisicos';

--
-- Volcado de datos para la tabla `tbl_libro`
--

INSERT INTO `tbl_libro` (`id_libro`, `id_categoria`, `tituloe_libro`, `edicion_libro`, `author`, `Editorial`, `estado`) VALUES
(4, 2, 'juan', 'blscker', 'juan', 'blacker', 0),
(5, 2, 'juan2', 'blscker2', 'juan', 'blacker3', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_usuario`
--

CREATE TABLE `tbl_usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(80) NOT NULL DEFAULT '0',
  `contraseña_usuario` varchar(80) NOT NULL DEFAULT '0',
  `rango` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

--
-- Volcado de datos para la tabla `tbl_usuario`
--

INSERT INTO `tbl_usuario` (`id_usuario`, `nombre_usuario`, `contraseña_usuario`, `rango`) VALUES
(1, 'kevin', 'kevin', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_books`
--
ALTER TABLE `tbl_books`
  ADD PRIMARY KEY (`id_book`),
  ADD KEY `FK_tbl_books_tbl_categoria` (`id_categoria`);

--
-- Indices de la tabla `tbl_categoria`
--
ALTER TABLE `tbl_categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `tbl_libro`
--
ALTER TABLE `tbl_libro`
  ADD PRIMARY KEY (`id_libro`),
  ADD KEY `FK_tbl_libro_tbl_categoria` (`id_categoria`);

--
-- Indices de la tabla `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbl_books`
--
ALTER TABLE `tbl_books`
  MODIFY `id_book` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tbl_categoria`
--
ALTER TABLE `tbl_categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tbl_libro`
--
ALTER TABLE `tbl_libro`
  MODIFY `id_libro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbl_books`
--
ALTER TABLE `tbl_books`
  ADD CONSTRAINT `FK_tbl_books_tbl_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `tbl_categoria` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbl_libro`
--
ALTER TABLE `tbl_libro`
  ADD CONSTRAINT `FK_tbl_libro_tbl_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `tbl_categoria` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
