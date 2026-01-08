// ===== CONFIGURACIÓN SIMPLE =====
const textos = [
    "Para mi persona especial...",
    "La que ilumina mis días desde Colombia 🇨🇴",
    "Desde Perú a Colombia ...",
    "🇵🇪🫂🇨🇴",
    "Hola, mi pequeña 🤍",
    "Estos 4 meses han sido mágicos",
    "Cada mensaje, cada chismesito, cada momento...",
    "Todo contigo es especial ✨",
    "Grax por todo :3",
    "Eso seria todo :D",
    "...",
    "Nah jaja , falta algo más ",
    "¡Espero te guste!",
    "3... 2... 1... 💫"
];

// ===== VARIABLES GLOBALES =====
let indexTexto = 0;
let musicaFondo;

// ===== INICIAR TODO CUANDO LA PÁGINA CARGUE =====
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Página cargada, iniciando...");
    
    // Iniciar música de fondo
    iniciarMusicaFondo();
    
    // Crear partículas
    crearParticulas();
    
    // Mostrar primer texto
    mostrarSiguienteTexto();
    
    // Configurar TODOS los botones de una sola vez
    configurarTodosLosBotones();
});

// ===== MÚSICA DE FONDO =====
function iniciarMusicaFondo() {
    musicaFondo = document.getElementById('musica');
    const musicToggle = document.getElementById('music-toggle');
    const musicLabel = document.querySelector('.music-label');
    
    if (!musicaFondo || !musicToggle) return;
    
    // Auto-iniciar con primer clic
    document.addEventListener('click', function iniciarConClick() {
        musicaFondo.play().catch(e => console.log("Esperando interacción..."));
        document.removeEventListener('click', iniciarConClick);
    });
    
    // Control de play/pause
    musicToggle.addEventListener('click', function() {
        if (musicaFondo.paused) {
            musicaFondo.play();
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            if (musicLabel) musicLabel.textContent = 'Música: On';
        } else {
            musicaFondo.pause();
            musicToggle.innerHTML = '<i class="fas fa-play"></i>';
            if (musicLabel) musicLabel.textContent = 'Música: Off';
        }
    });
}

// ===== PARTÍCULAS =====
function crearParticulas() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement("span");
        particle.style.left = Math.random() * 100 + "vw";
        particle.style.animationDuration = (5 + Math.random() * 10) + "s";
        particle.style.opacity = Math.random() * 0.8;
        particle.style.animationDelay = Math.random() * 5 + "s";
        particlesContainer.appendChild(particle);
    }
}

// ===== MOSTRAR TEXTOS =====
function mostrarSiguienteTexto() {
    const textoElemento = document.getElementById('texto');
    if (!textoElemento || indexTexto >= textos.length) {
        // Terminados los textos, activar flash
        setTimeout(activarFlash, 2000);
        return;
    }
    
    // Efecto fade out
    textoElemento.style.opacity = '0';
    
    setTimeout(() => {
        // Cambiar texto
        textoElemento.textContent = textos[indexTexto];
        
        // Efecto fade in
        textoElemento.style.opacity = '1';
        
        // Pasar al siguiente
        indexTexto++;
        
        // Programar siguiente texto (4 segundos)
        if (indexTexto < textos.length) {
            setTimeout(mostrarSiguienteTexto, 4000);
        } else {
            // Último texto, esperar y mostrar flash
            setTimeout(activarFlash, 4000);
        }
    }, 2000);
}

// ===== FLASH =====
function activarFlash() {
    const flashOverlay = document.getElementById('flash-overlay');
    if (!flashOverlay) {
        mostrarCarta();
        return;
    }
    
    flashOverlay.style.opacity = '1';
    let scale = 0;
    const velocidad = 5;
    
    function animarFlash() {
        scale += velocidad;
        flashOverlay.style.width = `${scale}vh`;
        flashOverlay.style.height = `${scale}vh`;
        
        if (scale < 300) {
            requestAnimationFrame(animarFlash);
        } else {
            flashOverlay.style.opacity = '0';
            setTimeout(() => {
                mostrarCarta();
            }, 500);
        }
    }
    
    animarFlash();
}

// ===== MOSTRAR CARTA =====
function mostrarCarta() {
    // Ocultar elementos iniciales
    const container = document.querySelector('.container');
    const particles = document.getElementById('particles');
    const musicControls = document.querySelector('.music-controls');
    
    if (container) container.style.display = 'none';
    if (particles) particles.style.display = 'none';
    if (musicControls) musicControls.style.display = 'none';
    
    // Mostrar carta
    const cartaContainer = document.getElementById('carta-container');
    if (cartaContainer) {
        cartaContainer.classList.remove('hidden');
        configurarCarta();
    }
}

// ===== CONFIGURAR CARTA =====
function configurarCarta() {
    const sobreExterior = document.getElementById('sobre-exterior');
    const contenidoInterior = document.getElementById('contenido-interior');
    const btnIrMusica = document.getElementById('btn-ir-musica');
    
    // Abrir sobre
    if (sobreExterior) {
        sobreExterior.addEventListener('click', function() {
            this.classList.add('abriendo');
            
            setTimeout(() => {
                if (contenidoInterior) {
                    contenidoInterior.classList.remove('hidden');
                    efectoEscrituraCarta();
                }
            }, 1500);
        });
    }
    
    // Botón para ir a música
    if (btnIrMusica) {
        btnIrMusica.addEventListener('click', function() {
            const cartaContainer = document.getElementById('carta-container');
            const seccionMusica = document.getElementById('seccion-musica');
            
            if (cartaContainer && seccionMusica) {
                cartaContainer.classList.add('hidden');
                seccionMusica.classList.remove('hidden');
            }
        });
    }
}

// ===== EFECTO ESCRITURA CARTA =====
function efectoEscrituraCarta() {
    const parrafos = document.querySelectorAll('.papel-carta p');
    parrafos.forEach((parrafo, index) => {
        const textoOriginal = parrafo.textContent;
        parrafo.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            function escribir() {
                if (i < textoOriginal.length) {
                    parrafo.textContent += textoOriginal.charAt(i);
                    i++;
                    setTimeout(escribir, 30);
                }
            }
            escribir();
        }, index * 2000);
    });
}

// ===== CONFIGURAR TODOS LOS BOTONES (FUNCIÓN ÚNICA) =====
function configurarTodosLosBotones() {
    console.log("🔧 Configurando TODOS los botones...");
    
    // 1. BOTÓN DE MÚSICA A FOTOS
    const btnFinMusica = document.getElementById('btn-fin-musica');
    console.log("¿Botón btn-fin-musica encontrado?", btnFinMusica ? "✅ Sí" : "❌ No");
    
    if (btnFinMusica) {
        // REMOVER cualquier evento anterior
        btnFinMusica.replaceWith(btnFinMusica.cloneNode(true));
        const btnNuevo = document.getElementById('btn-fin-musica');
        
        btnNuevo.addEventListener('click', function() {
            console.log("🎵 Botón 'Gracias por escuchar' clickeado");
            const seccionMusica = document.getElementById('seccion-musica');
            const seccionFotos = document.getElementById('seccion-fotos');
            
            if (seccionMusica && seccionFotos) {
                console.log("📸 Redirigiendo a sección de fotos...");
                seccionMusica.classList.add('hidden');
                seccionFotos.classList.remove('hidden');
                inicializarGaleriaSimple();
            } else {
                console.log("❌ No se encontraron secciones");
            }
        });
    }
    
    // 2. BOTÓN DE FOTOS A MÚSICA
    const btnVolverMusica = document.getElementById('btn-volver-musica');
    if (btnVolverMusica) {
        btnVolverMusica.addEventListener('click', function() {
            const seccionMusica = document.getElementById('seccion-musica');
            const seccionFotos = document.getElementById('seccion-fotos');
            
            if (seccionMusica && seccionFotos) {
                seccionFotos.classList.add('hidden');
                seccionMusica.classList.remove('hidden');
            }
        });
    }
    
    // 3. BOTÓN PARTE FINAL
    const btnParteFinal = document.getElementById('btn-parte-final');
    if (btnParteFinal) {
        btnParteFinal.addEventListener('click', function() {
            alert('✨ La parte final se mostrará pronto...');
            console.log('Botón "Parte Final" clickeado');
        });
    }
}

// ===== GALERÍA DE FOTOS =====
function inicializarGaleriaSimple() {
    console.log("🖼️ Inicializando galería de fotos...");
    
    // CONFIGURACIÓN GITHUB
    const USUARIO = "viabrayan8-ops";
    const REPO = "Fotos-especiales";
    const TOTAL_FOTOS = 40;
    
    const contenedorFotos = document.getElementById('contenedor-fotos');
    const btnAnterior = document.getElementById('btn-anterior');
    const btnSiguiente = document.getElementById('btn-siguiente');
    const fotoActualSpan = document.getElementById('foto-actual');
    const totalFotosSpan = document.getElementById('total-fotos');
    
    if (!contenedorFotos) {
        console.log("❌ No se encontró contenedor de fotos");
        return;
    }
    
    console.log("✅ Elementos de galería encontrados");
    
    // Variables
    let fotoActual = 1;
    
    // Actualizar contador
    totalFotosSpan.textContent = TOTAL_FOTOS;
    
    // Función para construir URL
    function getFotoURL(numero) {
        const url = `https://raw.githubusercontent.com/${USUARIO}/${REPO}/main/IMG${numero}.jpg`;
        console.log(`🔗 URL ${numero}: ${url}`);
        return url;
    }
    
    // Mostrar foto
    function mostrarFoto(numero) {
        if (numero < 1) numero = 1;
        if (numero > TOTAL_FOTOS) numero = TOTAL_FOTOS;
        
        fotoActual = numero;
        fotoActualSpan.textContent = fotoActual;
        
        // Actualizar botones
        if (btnAnterior) btnAnterior.disabled = (fotoActual === 1);
        if (btnSiguiente) btnSiguiente.disabled = (fotoActual === TOTAL_FOTOS);
        
        // URL de la imagen
        const fotoURL = getFotoURL(numero);
        
        // Crear imagen
        const img = document.createElement('img');
        img.className = 'foto-grande';
        img.alt = `Recuerdo ${numero}`;
        img.loading = 'lazy';
        
        // Efecto de carga
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s';
        
        // Mostrar en contenedor
        contenedorFotos.innerHTML = '';
        contenedorFotos.appendChild(img);
        
        // Cargar imagen
        img.onload = function() {
            this.style.opacity = '1';
            console.log(`✅ Imagen ${numero} cargada exitosamente`);
        };
        
        img.onerror = function() {
            console.log(`⚠️ Imagen ${numero} no encontrada, usando placeholder`);
            this.src = `https://picsum.photos/800/600?random=${numero}&blur=1`;
            this.alt = `Placeholder ${numero}`;
            this.style.opacity = '1';
        };
        
        // Asignar fuente
        img.src = fotoURL;
    }
    
    // Configurar eventos de navegación
    if (btnAnterior) {
        btnAnterior.addEventListener('click', function() {
            if (fotoActual > 1) mostrarFoto(fotoActual - 1);
        });
    }
    
    if (btnSiguiente) {
        btnSiguiente.addEventListener('click', function() {
            if (fotoActual < TOTAL_FOTOS) mostrarFoto(fotoActual + 1);
        });
    }
    
    // Navegación con teclado
    document.addEventListener('keydown', function(event) {
        if (document.getElementById('seccion-fotos').classList.contains('hidden')) return;
        
        if (event.key === 'ArrowLeft' || event.key === 'a') {
            if (fotoActual > 1) mostrarFoto(fotoActual - 1);
        } else if (event.key === 'ArrowRight' || event.key === 'd') {
            if (fotoActual < TOTAL_FOTOS) mostrarFoto(fotoActual + 1);
        }
    });
    
    // Mostrar primera foto
    mostrarFoto(1);
    
    // Precargar todas las imágenes
    function precargarImagenes() {
        console.log('🔄 Precargando imágenes...');
        for (let i = 1; i <= TOTAL_FOTOS; i++) {
            const img = new Image();
            img.src = getFotoURL(i);
        }
    }
    
    // Iniciar precarga
    setTimeout(precargarImagenes, 1000);
}

// ===== DEBUG =====
window.debug = {
    saltarACarta: function() {
        document.querySelector('.container').style.display = 'none';
        document.getElementById('particles').style.display = 'none';
        document.querySelector('.music-controls').style.display = 'none';
        document.getElementById('carta-container').classList.remove('hidden');
    },
    saltarAMusica: function() {
        document.getElementById('carta-container').classList.add('hidden');
        document.getElementById('seccion-musica').classList.remove('hidden');
    },
    saltarAFotos: function() {
        document.getElementById('seccion-musica').classList.add('hidden');
        document.getElementById('seccion-fotos').classList.remove('hidden');
        inicializarGaleriaSimple();
    },
    testBoton: function() {
        const btn = document.getElementById('btn-fin-musica');
        console.log("🔍 Test botón:", btn);
        console.log("📍 Posición:", btn ? btn.getBoundingClientRect() : "No existe");
    },
    reiniciar: function() {
        location.reload();
    }
};
// ===== PARTE FINAL COMPLETA =====
function configurarParteFinal() {
    console.log("✨ Configurando parte final...");
    
    // 1. Botón "Parte Final" de la sección de fotos
    const btnParteFinal = document.getElementById('btn-parte-final');
    if (btnParteFinal) {
        btnParteFinal.addEventListener('click', function() {
            const seccionFotos = document.getElementById('seccion-fotos');
            const seccionFinal = document.getElementById('seccion-final');
            
            if (seccionFotos && seccionFinal) {
                seccionFotos.classList.add('hidden');
                seccionFinal.classList.remove('hidden');
                iniciarFuegosArtificiales();
                configurarAudioPersonal();
            }
        });
    }
    
    // 2. Botón "Volver a Fotos"
    const btnVolverFotos = document.getElementById('btn-volver-fotos');
    if (btnVolverFotos) {
        btnVolverFotos.addEventListener('click', function() {
            const seccionFotos = document.getElementById('seccion-fotos');
            const seccionFinal = document.getElementById('seccion-final');
            
            if (seccionFotos && seccionFinal) {
                seccionFinal.classList.add('hidden');
                seccionFotos.classList.remove('hidden');
            }
        });
    }
    
    // 3. Botón "Repetir Todo"
    const btnRepetirTodo = document.getElementById('btn-repetir-todo');
    if (btnRepetirTodo) {
        btnRepetirTodo.addEventListener('click', function() {
            if (confirm('¿Quieres ver todo el regalo desde el inicio?')) {
                location.reload();
            }
        });
    }
}

// ===== AUDIO PERSONAL CONFIGURADO =====
function configurarAudioPersonal() {
    const audio = document.getElementById('audio-personal');
    if (!audio) return;
    
    console.log("🎤 Configurando audio personal...");
    
    // Forzar carga del audio
    audio.load();
    
    // Eventos para verificar estado
    audio.addEventListener('canplaythrough', function() {
        console.log("✅ Audio cargado completamente");
    });
    
    audio.addEventListener('error', function(e) {
        console.error("❌ Error en audio:", e);
        console.log("Código de error:", audio.error ? audio.error.code : "desconocido");
        
        // Mostrar mensaje amigable
        const descargaDiv = document.querySelector('.descarga-directa');
        if (descargaDiv) {
            descargaDiv.style.display = 'block';
        }
    });
    
    // Intentar reproducir automáticamente al entrar
    const seccionFinal = document.getElementById('seccion-final');
    if (seccionFinal) {
        seccionFinal.addEventListener('click', function iniciarAudio() {
            audio.play().then(() => {
                console.log("▶️ Audio reproducido automáticamente");
            }).catch(e => {
                console.log("⏸️ Necesita interacción completa del usuario");
            });
            this.removeEventListener('click', iniciarAudio);
        });
    }
}

// ===== FUEGOS ARTIFICIALES =====
function iniciarFuegosArtificiales() {
    const fuegosContainer = document.getElementById('fuegos-artificiales');
    if (!fuegosContainer) return;
    
    fuegosContainer.innerHTML = '';
    
    // Crear 10 fuegos artificiales iniciales
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            crearFuegoArtificial();
        }, i * 300);
    }
    
    // Continuar creando fuegos cada 2.5 segundos
    const intervaloFuegos = setInterval(() => {
        crearFuegoArtificial();
    }, 2500);
    
    // Guardar intervalo para limpiar después
    window.fuegosInterval = intervaloFuegos;
}

function crearFuegoArtificial() {
    const fuegosContainer = document.getElementById('fuegos-artificiales');
    if (!fuegosContainer) return;
    
    const fuego = document.createElement('div');
    fuego.className = 'fuego-artificial';
    
    // Posición aleatoria
    const x = Math.random() * 100;
    
    fuego.style.left = `${x}vw`;
    fuego.style.setProperty('--y', '30vh'); // Altura de explosión
    
    // Color aleatorio (tonos amarillos/naranjas)
    const colores = ['#FFD700', '#FFA500', '#FF8C00', '#FF4500'];
    const color = colores[Math.floor(Math.random() * colores.length)];
    
    fuego.style.background = color;
    fuego.style.boxShadow = `0 0 8px ${color}, 0 0 16px ${color}`;
    
    // Tamaño pequeño (no exagerado)
    const size = Math.random() * 2 + 1; // 1-3px
    fuego.style.width = `${size}px`;
    fuego.style.height = `${size}px`;
    
    // Duración
    const duracion = Math.random() * 1 + 1.5; // 1.5-2.5s
    fuego.style.animationDuration = `${duracion}s`;
    
    fuegosContainer.appendChild(fuego);
    
    // Eliminar después de animación
    setTimeout(() => {
        if (fuego.parentNode === fuegosContainer) {
            fuegosContainer.removeChild(fuego);
        }
    }, duracion * 1000);
}

// ===== ACTUALIZAR configurarTodosLosBotones =====
function configurarTodosLosBotones() {
    console.log("🔧 Configurando TODOS los botones...");
    
    // 1. BOTÓN DE MÚSICA A FOTOS
    const btnFinMusica = document.getElementById('btn-fin-musica');
    
    if (btnFinMusica) {
        // Clonar para eliminar eventos anteriores
        btnFinMusica.replaceWith(btnFinMusica.cloneNode(true));
        const btnNuevo = document.getElementById('btn-fin-musica');
        
        btnNuevo.addEventListener('click', function() {
            console.log("🎵 Botón 'Gracias por escuchar' clickeado");
            const seccionMusica = document.getElementById('seccion-musica');
            const seccionFotos = document.getElementById('seccion-fotos');
            
            if (seccionMusica && seccionFotos) {
                seccionMusica.classList.add('hidden');
                seccionFotos.classList.remove('hidden');
                inicializarGaleriaSimple();
            }
        });
    }
    
    // 2. Configurar la parte final
    configurarParteFinal();
}

// ===== LIMPIAR FUEGOS AL SALIR =====
// Agregar al inicio del script, después de las variables globales
window.addEventListener('beforeunload', function() {
    if (window.fuegosInterval) {
        clearInterval(window.fuegosInterval);
    }
});

console.log("🎁 Script cargado correctamente!");
console.log("Usa debug.saltarACarta(), debug.saltarAMusica() o debug.saltarAFotos() para probar");
console.log("Usa debug.testBoton() para verificar el botón");



