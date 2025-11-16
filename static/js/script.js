document.addEventListener('DOMContentLoaded', () => {
    // === Navegación Sticky y Toggle ===
    const header = document.getElementById('main-header');
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.getElementById('main-nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Cerrar menú móvil al hacer clic en un enlace
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });


    // === Animación de números en la sección de estadísticas ===
    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
        const stats = document.querySelectorAll('.stat-item .number');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Cuando el 50% de la sección es visible
        };

        const animateNumbers = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stats.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        let current = 0;
                        const duration = 2000; // milisegundos
                        const increment = target / (duration / 10); // Ajusta la velocidad

                        const updateCount = () => {
                            if (current < target) {
                                current += increment;
                                stat.textContent = Math.floor(current);
                                requestAnimationFrame(updateCount);
                            } else {
                                stat.textContent = target;
                            }
                        };
                        updateCount();
                    });
                    observer.unobserve(statsSection); // Deja de observar una vez animado
                }
            });
        };

        const statsObserver = new IntersectionObserver(animateNumbers, observerOptions);
        statsObserver.observe(statsSection);
    }


    // === Carrusel de Testimonios ===
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const carouselDots = document.querySelectorAll('.carousel-nav .dot');
    let currentIndex = 0;

    function showTestimonial(index) {
        if (testimonialCarousel && testimonialItems.length > 0) {
            // Eliminar clase 'active' de todos los elementos
            testimonialItems.forEach(item => item.classList.remove('active'));
            carouselDots.forEach(dot => dot.classList.remove('active'));

            // Calcular el desplazamiento
            const itemWidth = testimonialItems[0].offsetWidth + 20; // Ancho del item + gap
            testimonialCarousel.scrollTo({
                left: itemWidth * index,
                behavior: 'smooth'
            });

            // Añadir clase 'active' al elemento y al dot actual
            testimonialItems[index].classList.add('active');
            carouselDots[index].classList.add('active');
            currentIndex = index;
        }
    }

    if (testimonialItems.length > 0) {
        showTestimonial(0); // Muestra el primer testimonio al cargar

        // Control manual con puntos (dots)
        carouselDots.forEach((dot, index) => {
            dot.addEventListener('click', () => showTestimonial(index));
        });

        // Autoplay del carrusel
        setInterval(() => {
            let nextIndex = (currentIndex + 1) % testimonialItems.length;
            showTestimonial(nextIndex);
        }, 8000); // Cambia cada 8 segundos
    }


    // === Validación y Envío del Formulario de Contacto ===
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Validación básica en frontend
            if (!data.nombre || !data.email || !data.mensaje) {
                formMessage.textContent = 'Por favor, rellena todos los campos obligatorios (*).';
                formMessage.style.backgroundColor = 'rgba(231, 76, 60, 0.2)'; // Rojo claro
                formMessage.style.color = '#e74c3c'; // Rojo
                formMessage.style.display = 'block';
                return;
            }

            // Validación de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                formMessage.textContent = 'Por favor, introduce un email válido.';
                formMessage.style.backgroundColor = 'rgba(231, 76, 60, 0.2)';
                formMessage.style.color = '#e74c3c';
                formMessage.style.display = 'block';
                return;
            }

            try {
                const response = await fetch('/api/contactos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (result.success) {
                    formMessage.textContent = result.message;
                    formMessage.style.backgroundColor = 'rgba(46, 204, 113, 0.2)'; // Verde claro
                    formMessage.style.color = '#2ecc71'; // Verde
                    contactForm.reset();
                } else {
                    formMessage.textContent = result.message || 'Hubo un error al enviar el mensaje.';
                    formMessage.style.backgroundColor = 'rgba(231, 76, 60, 0.2)';
                    formMessage.style.color = '#e74c3c';
                }
                formMessage.style.display = 'block';
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
                formMessage.textContent = 'Error de conexión. Inténtalo de nuevo más tarde.';
                formMessage.style.backgroundColor = 'rgba(231, 76, 60, 0.2)';
                formMessage.style.color = '#e74c3c';
                formMessage.style.display = 'block';
            } finally {
                // Ocultar mensaje después de unos segundos
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        });
    }

    // === Scroll Reveal (Intersection Observer) ===
    const revealElements = document.querySelectorAll('.common-section, .hero-content > *, .news-card');

    const scrollRevealOptions = {
        root: null, // Observa el viewport
        rootMargin: '0px',
        threshold: 0.1 // El elemento se activa cuando el 10% es visible
    };

    const scrollRevealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Dejar de observar una vez que se ha revelado
            }
        });
    };

    const scrollRevealObserver = new IntersectionObserver(scrollRevealCallback, scrollRevealOptions);

    revealElements.forEach(el => {
        el.classList.add('reveal'); // Añade la clase base para el efecto
        scrollRevealObserver.observe(el);
    });

    // === Hero Carousel (Cambio automático de imágenes de fondo) ===
    const heroSlides = document.querySelectorAll('.hero-bg-slide');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    let currentSlide = 0;
    let autoChangeInterval;

    function showSlide(index) {
        if (heroSlides.length === 0) return;
        
        // Asegurarse de que el índice esté dentro del rango válido
        if (index >= heroSlides.length) currentSlide = 0;
        if (index < 0) currentSlide = heroSlides.length - 1;

        // Remover clase 'active' de todos los slides e indicadores
        heroSlides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Añadir clase 'active' al slide e indicador actual
        heroSlides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    // Cambiar slide manualmente
    window.changeHeroSlide = function(direction) {
        currentSlide += direction;
        if (currentSlide >= heroSlides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = heroSlides.length - 1;
        showSlide(currentSlide);
        resetAutoChange();
    };

    // Ir a un slide específico
    window.goToHeroSlide = function(index) {
        currentSlide = index;
        showSlide(currentSlide);
        resetAutoChange();
    };

    // Función para cambiar automáticamente cada 5 segundos
    function autoChangeSlide() {
        currentSlide++;
        if (currentSlide >= heroSlides.length) currentSlide = 0;
        showSlide(currentSlide);
    }

    function startAutoChange() {
        autoChangeInterval = setInterval(autoChangeSlide, 5000); // Cambiar cada 5 segundos
    }

    function resetAutoChange() {
        clearInterval(autoChangeInterval);
        startAutoChange();
    }

    // Iniciar el carrusel automático cuando se carga el página
    if (heroSlides.length > 0) {
        showSlide(0);
        startAutoChange();
    }

});