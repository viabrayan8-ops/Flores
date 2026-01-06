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
    
    // Configurar botones
    configurarBotones();
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

// ===== CONFIGURAR BOTONES MUSICA =====
function configurarBotones() {
    const btnFinMusica = document.getElementById('btn-fin-musica');
    if (btnFinMusica) {
        btnFinMusica.addEventListener('click', function() {
            alert('🎵 ¡Gracias por escuchar nuestra playlist especial!\n\nEl viaje continúa... ✨');
        });
    }
}

// ===== FUNCIONES DE DEBUG (para probar) =====
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
    reiniciar: function() {
        location.reload();
    }
};

console.log("🎁 Script cargado correctamente!");
console.log("Usa debug.saltarACarta() o debug.saltarAMusica() para probar");
