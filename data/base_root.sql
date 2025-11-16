-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS acapella_db;

-- Usar la base de datos
USE acapella_db;

-- Tabla para contactos
CREATE TABLE IF NOT EXISTS contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(50),
    asunto VARCHAR(255),
    mensaje TEXT NOT NULL,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para novedades (blog/noticias)
CREATE TABLE IF NOT EXISTS novedades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    fecha DATE NOT NULL,
    resumen TEXT NOT NULL,
    contenido TEXT NOT NULL,
    imagen_url VARCHAR(255),
    autor VARCHAR(100) DEFAULT 'Grupo Acappella',
    categoria VARCHAR(100)
);

-- Tabla para comentarios/testimonios
CREATE TABLE IF NOT EXISTS comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    mensaje TEXT NOT NULL,
    fuente VARCHAR(255), -- Ej: "Bodas.net", "Cliente VIP"
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- (opcional) usuario específico CAMBIAR USUARIO
CREATE USER IF NOT EXISTS 'music'@'localhost' IDENTIFIED BY 'music';
GRANT SELECT, INSERT, UPDATE, DELETE ON acapella_db.* TO 'music'@'localhost';
FLUSH PRIVILEGES;
