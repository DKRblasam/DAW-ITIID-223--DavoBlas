-- ============================================================
--  Script de base de datos - Portafolio (Practica No. 7)
--  Importar desde phpMyAdmin (pestaña "Importar") o ejecutar:
--      mysql -u root < DB/portafolio_db.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS portafolio_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE portafolio_db;

CREATE TABLE IF NOT EXISTS mensajes (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  nombre_usuario VARCHAR(100) NOT NULL,
  correo         VARCHAR(150) NOT NULL,
  mensaje        TEXT         NOT NULL,
  timeStaps      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);
