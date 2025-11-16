const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config({ path: path.resolve(__dirname, '../.env') }); // Asegúrate de cargar .env desde la raíz

const app = express();
const PORT = process.env.PORT || 3000;

// Importar la conexión a la base de datos
const db = require('./config/db'); // Ajustada la ruta

// Importar las rutas de la API
const contactoRoutes = require('./routes/contactoRoutes');
const novedadesRoutes = require('./routes/novedadesRoutes');
const comentariosRoutes = require('./routes/comentariosRoutes'); // Necesitarás crear este archivo


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar EJS como motor de plantillas y la ruta de las vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views')); // La raíz de tus vistas está en /views

// Servir archivos estáticos desde la carpeta 'static'
app.use(express.static(path.join(__dirname, '../static')));

// === Rutas de la Aplicación ===
// Ruta para la página principal (INICIO)
app.get('/', async (req, res) => {
    try {
        // Ejemplo de datos para el carrusel de novedades en la página principal
        const [novedades] = await db.query('SELECT id, titulo, resumen, imagen_url FROM novedades ORDER BY fecha DESC LIMIT 3');
        // Ejemplo de datos para testimonios
        const [comentarios] = await db.query('SELECT nombre, mensaje, fuente FROM comentarios ORDER BY fecha DESC LIMIT 3');

        res.render('principal', {
            title: 'Grupo New Name - Armonía Vocal',
            section: 'inicio', // Para activar el enlace correcto en el menú
            novedadesDestacadas: novedades,
            testimonios: comentarios
        });
    } catch (error) {
        console.error('Error al cargar datos para la página principal:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para la sección BLOG (Novedades)
app.get('/novedades', async (req, res) => {
    try {
        const [novedades] = await db.query('SELECT id, titulo, fecha, resumen, imagen_url, autor, categoria FROM novedades ORDER BY fecha DESC');
        res.render('blog', {
            title: 'Novedades - Grupo New Name',
            section: 'novedades',
            novedades: novedades
        });
    } catch (error) {
        console.error('Error al cargar novedades:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para un artículo de novedad individual
app.get('/novedades/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM novedades WHERE id = ?', [req.params.id]);
        if (rows.length > 0) {
            res.render('articulo', { // Necesitarás crear un archivo 'articulo.ejs'
                title: rows[0].titulo,
                section: 'novedades',
                articulo: rows[0]
            });
        } else {
            res.status(404).render('404_error', { title: 'Artículo no encontrado' });
        }
    } catch (error) {
        console.error('Error al cargar artículo:', error);
        res.status(500).send('Error interno del servidor');
    }
});


// Ruta para la sección REPERTORIO (Media)
app.get('/repertorio', async (req, res) => {
    try {
        // Aquí podrías cargar datos de audios/videos/partituras desde la DB si tuvieras tablas para ello
        // Por ahora, usaremos datos estáticos o hardcodeados como ejemplos
        const videos = [
            { id: 1, title: 'Yo Veré su Santa Gloria', artist: 'New Name (Cover)', embedUrl: 'https://www.youtube.com/embed/B4vuhicpXTk?si=1wM6yhMmZff09oRF', cover: '/img/cuatro_1.jpg' },
            { id: 2, title: 'Dulce Amistad', artist: 'New Name (Cover)', embedUrl: 'https://www.youtube.com/embed/CYWgfXlcbLo?si=1wC_NPFFQkyl6rRj', cover: '/img/cuantro_3.jpg' },
            { id: 3, title: 'He Is Risen', artist: 'New Name (Cover)', embedUrl: 'https://www.youtube.com/embed/zgbSMWNwI5A?si=Eriobaqlgk0mQoN3', cover: '/img/cuatro_2.jpg' },
            { id: 4, title: 'Glory And Honor', artist: 'New Name (Cover)', embedUrl: 'https://www.youtube.com/embed/la9CX9ED858?si=vP6qcrMbBN1E5ZUz', cover: '/img/portada_1.jpg' },
            { id: 5, title: 'In that great getting up morning', artist: 'New Name (Cover)', embedUrl: 'https://www.youtube.com/embed/69qdLvIKUHs?si=cxjJXDBFzdB0_4_7', cover: '/img/cuatro_2.jpg' },
            { id: 6, title: 'El Volverá. Hombres de Valor', artist: 'New Name (Cover)', embedUrl: 'https://www.youtube.com/embed/jSg_-oIPKRw?si=Sw_ZwbOCGDi3SuAh', cover: '/img/portada_1.jpg' }
        ];
        const audios = [
            { id: 1, title: "Lead Me To Rest", artist: 'New Name (cover)', embedUrl: 'https://www.youtube.com/embed/3xwuzLvJ0lg?si=v9SdR_oIqY6cZdrU', cover: '/img/portada_2.jpg' },
            { id: 2, title: 'Camino con él', artist: 'New Name (cover)', embedUrl: 'https://www.youtube.com/embed/GzjgYWT71FI?si=CM6v2dJXFUeWQx2z', cover: '/img/portada_3ojos.jpg' },
            { id: 3, title: "If There Were No God", artist: 'New Name (cover)', embedUrl: 'https://www.youtube.com/embed/r2YgLEhWJrA?si=Aez6z0t0VTaoK9hD', cover: '/img/portada_4.jpg' },
            { id: 4, title: 'La verdad', artist: 'New Name (cover)', embedUrl: 'https://www.youtube.com/embed/xa30PVL822E?si=X_EdfKPO32ETIZqY', cover: '/img/portada_4.1.jpg' },
            { id: 5, title: "Jamás hables mal", artist: 'New Name (cover)', embedUrl: 'https://www.youtube.com/embed/GO4cYNj98V4?si=-_28oFGHdVafxCwr', cover: '/img/portada_4.jpg' },
            { id: 6, title: 'Jesús sabe', artist: 'New Name (cover)', embedUrl: 'https://www.youtube.com/embed/9QwUEoXjpDM?si=p-dDWXdy37ldeQKx', cover: '/img/portada_4.1.jpg' }
        ];
        // Partituras y Videoclips podrían ser similares

        res.render('media', {
            title: 'Repertorio - Grupo New Name',
            section: 'repertorio',
            audios: audios,
            videos: videos
        });
    } catch (error) {
        console.error('Error al cargar el repertorio:', error);
        res.status(500).send('Error interno del servidor');
    }
});


// Ruta para procesar el formulario de contacto (POST)
app.post('/api/contactos', async (req, res) => {
    const { nombre, email, telefono, asunto, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
        return res.status(400).json({ success: false, message: 'Nombre, Email y Mensaje son campos obligatorios.' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO contactos (nombre, email, telefono, asunto, mensaje) VALUES (?, ?, ?, ?, ?)',
            [nombre, email, telefono, asunto, mensaje]
        );
        res.json({ success: true, message: 'Mensaje enviado con éxito. Gracias por contactarnos.', id: result.insertId });
    } catch (error) {
        console.error('Error al guardar contacto:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor al enviar el mensaje.' });
    }
});


// === Rutas de Administración (CRUD) ===
// (Implementaremos un panel de administración básico en los siguientes pasos)
// Ejemplo para listar contactos
app.get('/admin/contactos', async (req, res) => {
    try {
        const [contactos] = await db.query('SELECT * FROM contactos ORDER BY fecha_envio DESC');
        res.render('admin_contactos', { // Crear esta vista en src/views
            title: 'Admin Contactos',
            contactos: contactos
        });
    } catch (error) {
        console.error('Error al cargar contactos para admin:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Usar las rutas de la API
app.use('/api/contactos', contactoRoutes);
app.use('/api/novedades', novedadesRoutes);
app.use('/api/comentarios', comentariosRoutes);


// Ruta para el panel de administración (puedes añadir más vistas de admin aquí)
app.get('/admin', (req, res) => {
    res.render('admin', { title: 'Panel de Administración' });
});

// Ruta para el admin de novedades
app.get('/admin/novedades', async (req, res) => {
    try {
        const [novedades] = await db.query('SELECT * FROM novedades ORDER BY fecha DESC');
        res.render('admin_novedades', {
            title: 'Administrar Novedades',
            novedades: novedades
        });
    } catch (error) {
        console.error('Error al cargar novedades para admin:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para el admin de comentarios
app.get('/admin/comentarios', async (req, res) => {
    try {
        const [comentarios] = await db.query('SELECT * FROM comentarios ORDER BY fecha DESC');
        res.render('admin_comentarios', {
            title: 'Administrar Comentarios',
            comentarios: comentarios
        });
    } catch (error) {
        console.error('Error al cargar comentarios para admin:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Puedes añadir más rutas de API y administración aquí para novedades y comentarios
// ... (POST, PUT, DELETE para /api/novedades y /api/comentarios)

// Manejo de errores 404
app.use((req, res, next) => {
    res.status(404).render('404_error', { title: 'Página no encontrada' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

