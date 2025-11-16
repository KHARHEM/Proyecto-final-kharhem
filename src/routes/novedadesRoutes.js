const express = require('express');
const router = express.Router();
const Novedad = require('../models/novedadModel');

// GET all novedades
router.get('/', async (req, res) => {
    try {
        const novedades = await Novedad.getAll();
        res.json(novedades);
    } catch (error) {
        console.error('Error fetching novedades:', error);
        res.status(500).json({ message: 'Error fetching novedades' });
    }
});

// GET novedad by ID
router.get('/:id', async (req, res) => {
    try {
        const novedad = await Novedad.getById(req.params.id);
        if (novedad) {
            res.json(novedad);
        } else {
            res.status(404).json({ message: 'Novedad not found' });
        }
    } catch (error) {
        console.error('Error fetching novedad by ID:', error);
        res.status(500).json({ message: 'Error fetching novedad' });
    }
});

// POST create new novedad
router.post('/', async (req, res) => {
    const { titulo, fecha, resumen, contenido, imagen_url, autor, categoria } = req.body;
    if (!titulo || !fecha || !resumen || !contenido) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const result = await Novedad.create(titulo, fecha, resumen, contenido, imagen_url, autor, categoria);
        res.status(201).json({ message: 'Novedad created', id: result.insertId });
    } catch (error) {
        console.error('Error creating novedad:', error);
        res.status(500).json({ message: 'Error creating novedad' });
    }
});

// PUT update novedad
router.put('/:id', async (req, res) => {
    const { titulo, fecha, resumen, contenido, imagen_url, autor, categoria } = req.body;
    const { id } = req.params;
    try {
        const result = await Novedad.update(id, titulo, fecha, resumen, contenido, imagen_url, autor, categoria);
        if (result.affectedRows > 0) {
            res.json({ message: 'Novedad updated' });
        } else {
            res.status(404).json({ message: 'Novedad not found' });
        }
    } catch (error) {
        console.error('Error updating novedad:', error);
        res.status(500).json({ message: 'Error updating novedad' });
    }
});

// DELETE novedad
router.delete('/:id', async (req, res) => {
    try {
        const result = await Novedad.delete(req.params.id);
        if (result.affectedRows > 0) {
            res.json({ message: 'Novedad deleted' });
        } else {
            res.status(404).json({ message: 'Novedad not found' });
        }
    } catch (error) {
        console.error('Error deleting novedad:', error);
        res.status(500).json({ message: 'Error deleting novedad' });
    }
});

module.exports = router;