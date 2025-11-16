const db = require('./config/db');

async function test() {
  try {
    const [rows] = await db.query('SELECT NOW() AS now');
    console.log('Conexión OK — hora del servidor MySQL:', rows[0].now);
    process.exit(0);
  } catch (err) {
    console.error('Fallo al conectar a la BD desde test_db_connection.js:', err.message);
    process.exit(1);
  }
}

test();
