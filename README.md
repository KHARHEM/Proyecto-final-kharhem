# 🎶 New Name · Página Web Oficial

    Sitio web desarrollado para el grupo vocal New Name, con secciones públicas (inicio, repertorio, novedades, contacto) y un panel de administración para gestionar contenido dinámico.

# 📌 Descripción del Proyecto

    Este proyecto consiste en una página web completa construida con Node.js + Express + MySQL, diseñada para presentar al grupo vocal New Name.
    Incluye un sitio público para visitantes y un panel privado para la administración del contenido.

## El sitio permite mostrar:

- Información principal del grupo.
- Repertorio musical.
- Últimas novedades y eventos.
- Formulario de contacto funcional.

## Además, incorpora un /admin para que el propietario gestione:

- Formularios enviados desde “Contáctenos”.
- Novedades y eventos del blog (crear / editar / eliminar).
- Opiniones o comentarios de los visitantes.

# 🖼️ Capturas del Sitio
## 🏠 Página Principal
![Página inicial](/capturas_proyecto/principal.png)

## Sobre Nosotros
![Quienes somos](/capturas_proyecto/sobre_nosotros.png)

## testimonio
![Lo que piensan nuestros cientes](/capturas_proyecto/testimonios.png)

## Repertorio
![Repertorio_audios](/capturas_proyecto/repertorio_audios.png)

## Repertorio
![Repertorio_videos](/capturas_proyecto/repertorio_videos.png)

## Novedades
![Blog de novedades](/capturas_proyecto/novedades.png)

## Contacto
![Contáctanos](/capturas_proyecto/contacto.png)

## footer
![Pie de página](/capturas_proyecto/footer.png)

## Administración
Area de administración a través del */admin*
![Admin](/capturas_proyecto/area_admin.png)

## Administración de Novedades
![Admin1](/capturas_proyecto/admin_novedades.png)
![Admin2](/capturas_proyecto/admin_novedades_2.png)

## Administración de Testimonios
![Admin3](/capturas_proyecto/admin_testimonios.png)
![Admin4](/capturas_proyecto/admin_testimonio_2.png)

## Administración de Contactos
![Admin5](/capturas_proyecto/admin_contactos.png)

# 📁 Estructura del Proyecto

    Aquí se muestra una vista simplificada y clara de la estructura del proyecto:
![estructura](/capturas_proyecto/estructura_proyecto.png)

# ⚙️ Tecnologías Utilizadas
### Backend
- Node.js
- Express.js
- MySQL
- Dotenv

### Frontend
- HTML5 + EJS
- CSS
- JavaScript

# 🚀 Funcionalidades
## ⭐ Sitio Público

- ✔ Página de inicio con presentación del grupo
- ✔ Sección “Sobre Nosotros”
- ✔ Repertorio musical con videos incrustados
- ✔ Novedades (eventos, publicaciones)
- ✔ Formulario funcional de contacto
- ✔ Diseño moderno y adaptable

## 🔐 Panel de Administración (/admin)

- ✔ Gestión de mensajes enviados desde Contacto
- ✔ Creación, edición y eliminación de novedades
- ✔ Gestión de comentarios/opiniones
- ✔ Interfaz sencilla para administradores

---

# 🧩 Instalación y Uso
## 1️⃣ Clonar el repositorio
*git clone https://github.com/usuario/tu-repositorio.git*
*cd tu-repositorio*

## 2️⃣ Instalar dependencias
*npm install*

## 3️⃣ Configurar variables de entorno
- Crear un archivo .env:<br>
*DB_HOST=localhost* <br>
*DB_USER=tu_usuario*<br>
*DB_PASSWORD=tu_contraseña*<br>
*DB_NAME=nombre_base*<br>
*PORT=3000*

## 4️⃣ Importar las bases SQL
- Los archivos SQL están en /data/.
- Ejecutarlos en tu servidor MySQL.

## 5️⃣ Iniciar el servidor
*npm start*

## El sitio quedará accesible en:
- 📍 http://localhost:3000

## 🔒 Acceso al Panel de Administración
- El panel se encuentra en:<br>
    */admin*

## 📬 Contacto
    Este proyecto fue desarrollado por Kharhem Montilla como página oficial para el grupo vocal New Name.

## 🎤 Agradecimientos
    Gracias a New Name por permitir el desarrollo de su sitio web oficial.