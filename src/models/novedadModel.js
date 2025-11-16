const db = require('../config/db');

class Novedad {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM novedades ORDER BY fecha DESC');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM novedades WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(titulo, fecha, resumen, contenido, imagen_url, autor, categoria) {
        const [result] = await db.query(
            'INSERT INTO novedades (titulo, fecha, resumen, contenido, imagen_url, autor, categoria) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [titulo, fecha, resumen, contenido, imagen_url, autor, categoria]
        );
        return result;
    }

    static async update(id, titulo, fecha, resumen, contenido, imagen_url, autor, categoria) {
        const [result] = await db.query(
            'UPDATE novedades SET titulo = ?, fecha = ?, resumen = ?, contenido = ?, imagen_url = ?, autor = ?, categoria = ? WHERE id = ?',
            [titulo, fecha, resumen, contenido, imagen_url, autor, categoria, id]
        );
        return result;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM novedades WHERE id = ?', [id]);
        return result;
    }
}

module.exports = Novedad;