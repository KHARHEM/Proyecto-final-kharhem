const db = require('../config/db'); // Ruta ajustada

class Contacto {
    static async create(nombre, email, telefono, asunto, mensaje) {
        const [result] = await db.query(
            'INSERT INTO contactos (nombre, email, telefono, asunto, mensaje) VALUES (?, ?, ?, ?, ?)',
            [nombre, email, telefono, asunto, mensaje]
        );
        return result;
    }

    static async getAll() {
        const [rows] = await db.query('SELECT * FROM contactos ORDER BY fecha_envio DESC');
        return rows;
    }
}

module.exports = Contacto;