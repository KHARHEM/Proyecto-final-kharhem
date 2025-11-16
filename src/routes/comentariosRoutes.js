const express = require('express');
const router = express.Router();
const Comentario = require('../models/comentarioModel');

// GET all comentarios
router.get('/', async (req, res) => {
    try {
        const comentarios = await Comentario.getAll();
        res.json(comentarios);
    } catch (error) {
        console.error('Error fetching comentarios:', error);
        res.status(500).json({ message: 'Error fetching comentarios' });
    }
});

// POST create new comentario
router.post('/', async (req, res) => {
    const { nombre, mensaje, fuente } = req.body;
    if (!nombre || !mensaje) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const result = await Comentario.create(nombre, mensaje, fuente);
        res.status(201).json({ message: 'Comentario created', id: result.insertId });
    } catch (error) {
        console.error('Error creating comentario:', error);
        res.status(500).json({ message: 'Error creating comentario' });
    }
});

// PUT update comentario
router.put('/:id', async (req, res) => {
    const { nombre, mensaje, fuente } = req.body;
    const { id } = req.params;
    try {
        const result = await Comentario.update(id, nombre, mensaje, fuente);
        if (result.affectedRows > 0) {
            res.json({ message: 'Comentario updated' });
        } else {
            res.status(404).json({ message: 'Comentario not found' });
        }
    } catch (error) {
        console.error('Error updating comentario:', error);
        res.status(500).json({ message: 'Error updating comentario' });
    }
});

// DELETE comentario
router.delete('/:id', async (req, res) => {
    try {
        const result = await Comentario.delete(req.params.id);
        if (result.affectedRows > 0) {
            res.json({ message: 'Comentario deleted' });
        } else {
            res.status(404).json({ message: 'Comentario not found' });
        }
    } catch (error) {
        console.error('Error deleting comentario:', error);
        res.status(500).json({ message: 'Error deleting comentario' });
    }
});

module.exports = router;