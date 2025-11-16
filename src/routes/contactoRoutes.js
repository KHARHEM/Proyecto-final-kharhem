const express = require('express');
const router = express.Router();
const Contacto = require('../models/contactoModel');

router.post('/', async (req, res) => {
    const { nombre, email, telefono, asunto, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
        return res.status(400).json({ success: false, message: 'Nombre, Email y Mensaje son campos obligatorios.' });
    }

    try {
        const result = await Contacto.create(nombre, email, telefono, asunto, mensaje);
        res.json({ success: true, message: 'Mensaje enviado con éxito. Gracias por contactarnos.', id: result.insertId });
    } catch (error) {
        console.error('Error al guardar contacto:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor al enviar el mensaje.' });
    }
});

module.exports = router;