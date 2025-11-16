const mysql = require('mysql2/promise');
require('dotenv').config(); // Asegúrate de que .env esté en la raíz del proyecto

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then(connection => {
    console.log('Conexión exitosa a la base de datos MySQL');
    connection.release();
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err.message);
    // Podrías salir de la aplicación si la conexión a la DB es crítica
    // process.exit(1);
  });

module.exports = pool;