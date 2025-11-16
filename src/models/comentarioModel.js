const db = require('../config/db');

class Comentario {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM comentarios ORDER BY fecha DESC');
        return rows;
    }

    static async create(nombre, mensaje, fuente) {
        const [result] = await db.query(
            'INSERT INTO comentarios (nombre, mensaje, fuente) VALUES (?, ?, ?)',
            [nombre, mensaje, fuente]
        );
        return result;
    }

    static async update(id, nombre, mensaje, fuente) {
        const [result] = await db.query(
            'UPDATE comentarios SET nombre = ?, mensaje = ?, fuente = ? WHERE id = ?',
            [nombre, mensaje, fuente, id]
        );
        return result;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM comentarios WHERE id = ?', [id]);
        return result;
    }
}

module.exports = Comentario;