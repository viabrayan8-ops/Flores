// ===== CONFIGURACIÓN =====
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

// ===== ELEMENTOS =====
const textoElemento = document.getElementById("texto");
const flashOverlay = document.getElementById("flash-overlay");
const cartaContainer = document.getElementById("carta-container");
const sobreExterior = document.getElementById("sobre-exterior");
const contenidoInterior = document.getElementById("contenido-interior");
const particlesContainer = document.getElementById("particles");
const musica = document.getElementById("musica");
const musicToggle = document.getElementById("music-toggle");
const musicLabel = document.querySelector('.music-label');
const btnIrMusica = document.getElementById('btn-ir-musica');
const seccionMusica = document.getElementById('seccion-musica');
const btnFinMusica = document.getElementById('btn-fin-musica');

let index = 0;

// ===== PARTÍCULAS =====
function crearParticulas() {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement("span");
        particle.style.left = Math.random() * 100 + "vw";
        particle.style.animationDuration = (5 + Math.random() * 10) + "s";
        particle.style.opacity = Math.random() * 0.8;
        particle.style.animationDelay = Math.random() * 5 + "s";
        particlesContainer.appendChild(particle);
    }
}

// ===== CONTROL MÚSICA =====
if (musicToggle && musicLabel) {
    musicToggle.addEventListener('click', () => {
        if (musica.paused) {
            musica.play();
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            musicLabel.textContent = 'Música: On';
        } else {
            musica.pause();
            musicToggle.innerHTML = '<i class="fas fa-play"></i>';
            musicLabel.textContent = 'Música: Off';
        }
    });
}

// Auto-iniciar música con interacción
document.addEventListener('click', function iniciarMusica() {
    if (musica.paused) {
        musica.play().catch(e => console.log("Música esperando interacción"));
    }
    document.removeEventListener('click', iniciarMusica);
}, { once: true });

// ===== MOSTRAR TEXTOS =====
function mostrarTexto() {
    textoElemento.style.opacity = 0;

    setTimeout(() => {
        textoElemento.textContent = textos[index];
        textoElemento.style.opacity = 1;

        index++;
        if (index < textos.length) {
            setTimeout(mostrarTexto, 4000);
        } else {
            setTimeout(activarFlash, 4000);
        }
    }, 2000);
}

// ===== FLASH =====
function activarFlash() {
    flashOverlay.style.opacity = '1';
    const duracionFlash = 4000;
    const startTime = Date.now();
    
    function animar() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duracionFlash, 1);
        
        const scale = progress * 300;
        flashOverlay.style.width = `${scale}vh`;
        flashOverlay.style.height = `${scale}vh`;
        
        if (progress < 0.7) {
            flashOverlay.style.opacity = '1';
        } else {
            flashOverlay.style.opacity = `${1 - (progress - 0.7) / 0.3}`;
        }
        
        if (progress < 1) {
            requestAnimationFrame(animar);
        } else {
            flashOverlay.style.opacity = '0';
            mostrarCarta();
        }
    }
    
    requestAnimationFrame(animar);
}

// ===== MOSTRAR CARTA =====
function mostrarCarta() {
    document.querySelector('.container').style.display = 'none';
    particlesContainer.style.display = 'none';
    document.querySelector('.music-controls').style.display = 'none';
    
    setTimeout(() => {
        cartaContainer.classList.remove('hidden');
        iniciarCarta();
    }, 500);
}

// ===== INICIAR CARTA =====
function iniciarCarta() {
    // Abrir sobre
    sobreExterior.addEventListener('click', function() {
        sobreExterior.classList.add('abriendo');
        
        setTimeout(() => {
            sobreExterior.style.display = 'none';
            contenidoInterior.classList.remove('hidden');
            efectoEscrituraCarta();
        }, 1500);
    });
    
    // Botón para ir a música
    if (btnIrMusica) {
        btnIrMusica.addEventListener('click', function() {
            // Ocultar carta
            cartaContainer.classList.add('hidden');
            
            // Mostrar música después de 0.5 segundos
            setTimeout(() => {
                seccionMusica.classList.remove('hidden');
                
                // Configurar botón final de música
                if (btnFinMusica) {
                    btnFinMusica.addEventListener('click', function() {
                        alert('🎵 Gracias por escuchar nuestra playlist especial!\n\nEl regalo continúa... ✨');
                    });
                }
            }, 500);
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

// ===== INICIAR TODO =====
function iniciarTodo() {
    console.log("🎁 Regalo especial iniciando...");
    crearParticulas();
    mostrarTexto();
}

// Esperar a que cargue la página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarTodo);
} else {
    iniciarTodo();
}

// ===== FUNCIONES DEBUG =====
window.debug = {
    saltarACarta: function() {
        index = textos.length;
        document.querySelector('.container').style.display = 'none';
        particlesContainer.style.display = 'none';
        document.querySelector('.music-controls').style.display = 'none';
        flashOverlay.style.display = 'none';
        cartaContainer.classList.remove('hidden');
        sobreExterior.style.display = 'none';
        contenidoInterior.classList.remove('hidden');
    },
    saltarAMusica: function() {
        cartaContainer.classList.add('hidden');
        seccionMusica.classList.remove('hidden');
    },
    reiniciar: function() {
        location.reload();
    }
};
