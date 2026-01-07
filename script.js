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

// ===== ESTADO =====
let textoIndex = 0;
let musicaFondo;

// ===== INICIAR CUANDO PÁGINA CARGUE =====
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Iniciando regalo...");
    
    iniciarMusica();
    crearParticulas();
    iniciarTexto();
    configurarBotones();
});

// ===== MÚSICA =====
function iniciarMusica() {
    musicaFondo = document.getElementById('musica');
    const toggleBtn = document.getElementById('music-toggle');
    const label = document.querySelector('.music-label');
    
    if (!musicaFondo || !toggleBtn) {
        console.log("⚠️ No se encontró el audio");
        return;
    }
    
    console.log("🎵 Audio encontrado:", musicaFondo.src);
    
    // Intentar carrar tu audio personalizado
    musicaFondo.load();
    
    // Control play/pause
    toggleBtn.addEventListener('click', function() {
        if (musicaFondo.paused) {
            musicaFondo.play().then(() => {
                console.log("▶️ Música iniciada");
                toggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
                if (label) label.textContent = 'Música: On';
            }).catch(error => {
                console.log("❌ Error al reproducir:", error);
                // Intentar con audio de respaldo
                const fallback = document.querySelector('.fallback-audio');
                if (fallback) {
                    musicaFondo.src = fallback.src;
                    musicaFondo.play();
                }
            });
        } else {
            musicaFondo.pause();
            toggleBtn.innerHTML = '<i class="fas fa-play"></i>';
            if (label) label.textContent = 'Música: Off';
        }
    });
    
    // Auto-iniciar con primer clic en la página
    document.body.addEventListener('click', function autoIniciar() {
        if (musicaFondo.paused) {
            musicaFondo.play().catch(e => {
                console.log("Esperando interacción...");
            });
        }
        document.body.removeEventListener('click', autoIniciar);
    }, { once: true });
}

// ===== PARTÍCULAS =====
function crearParticulas() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const particula = document.createElement('span');
        particula.style.left = Math.random() * 100 + 'vw';
        particula.style.animationDuration = (5 + Math.random() * 10) + 's';
        particula.style.opacity = Math.random() * 0.8;
        particula.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(particula);
    }
}

// ===== TEXTO =====
function iniciarTexto() {
    const textoElem = document.getElementById('texto');
    if (!textoElem) return;
    
    mostrarTexto(textoElem);
}

function mostrarTexto(elemento) {
    if (textoIndex >= textos.length) {
        setTimeout(activarFlash, 2000);
        return;
    }
    
    elemento.style.opacity = '0';
    
    setTimeout(() => {
        elemento.textContent = textos[textoIndex];
        elemento.style.opacity = '1';
        
        textoIndex++;
        
        if (textoIndex < textos.length) {
            setTimeout(() => mostrarTexto(elemento), 4000);
        } else {
            setTimeout(activarFlash, 4000);
        }
    }, 2000);
}

// ===== FLASH =====
function activarFlash() {
    const flash = document.getElementById('flash-overlay');
    if (!flash) {
        mostrarCarta();
        return;
    }
    
    flash.style.opacity = '1';
    let tamaño = 0;
    
    function animar() {
        tamaño += 5;
        flash.style.width = tamaño + 'vh';
        flash.style.height = tamaño + 'vh';
        
        if (tamaño < 300) {
            requestAnimationFrame(animar);
        } else {
            flash.style.opacity = '0';
            setTimeout(mostrarCarta, 500);
        }
    }
    
    animar();
}

// ===== EMOJIS FLOTANTES =====
function crearEmojisFlotantes() {
    const fondo = document.getElementById('fondo-animado');
    if (!fondo) return;
    
    fondo.innerHTML = '';
    
    // Crear emojis (15 perros, 10 gatos)
    for (let i = 0; i < 25; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'emoji-flotante';
        
        // 60% perros, 40% gatos
        const esPerro = i < 15;
        emoji.textContent = esPerro ? '🐶' : '🐱';
        
        // Tamaño aleatorio
        const tamaño = 30 + Math.random() * 50;
        emoji.style.fontSize = tamaño + 'px';
        
        // Posición
        emoji.style.left = Math.random() * 100 + 'vw';
        
        // Velocidad
        const velocidad = 15 + Math.random() * 25;
        emoji.style.animationDuration = velocidad + 's';
        
        // Retraso
        emoji.style.animationDelay = Math.random() * 15 + 's';
        
        // Opacidad
        emoji.style.opacity = 0.3 + Math.random() * 0.5;
        
        // Algunos giran
        if (Math.random() > 0.7) {
            emoji.style.animation += ', girarEmoji 20s linear infinite';
        }
        
        fondo.appendChild(emoji);
    }
}

// ===== MOSTRAR CARTA =====
function mostrarCarta() {
    // Ocultar pantalla inicial
    const pantallaInicial = document.getElementById('pantalla-inicial');
    const controls = document.querySelector('.music-controls');
    
    if (pantallaInicial) pantallaInicial.style.display = 'none';
    if (controls) controls.style.display = 'flex';
    
    // Mostrar carta
    const carta = document.getElementById('carta-container');
    if (carta) {
        carta.classList.remove('pantalla-oculta');
        crearEmojisFlotantes();
        configurarCarta();
    }
}

// ===== CONFIGURAR CARTA =====
function configurarCarta() {
    const sobre = document.getElementById('sobre-exterior');
    const contenido = document.getElementById('contenido-interior');
    const btnMusica = document.getElementById('btn-ir-musica');
    
    // Abrir sobre
    if (sobre) {
        sobre.addEventListener('click', function() {
            this.classList.add('abriendo');
            
            setTimeout(() => {
                if (contenido) {
                    contenido.classList.remove('oculto');
                    contenido.style.animation = 'aparecerContenido 1s ease-out forwards';
                    efectoEscritura();
                }
            }, 1500);
        });
    }
    
    // Botón para música
    if (btnMusica) {
        btnMusica.addEventListener('click', function() {
            const carta = document.getElementById('carta-container');
            const musicaSection = document.getElementById('seccion-musica');
            
            if (carta && musicaSection) {
                carta.classList.add('pantalla-oculta');
                musicaSection.classList.remove('pantalla-oculta');
            }
        });
    }
}

// ===== EFECTO ESCRITURA =====
function efectoEscritura() {
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

// ===== CONFIGURAR BOTONES =====
function configurarBotones() {
    const btnFinMusica = document.getElementById('btn-fin-musica');
    
    if (btnFinMusica) {
        btnFinMusica.addEventListener('click', function() {
            alert('🎵 ¡Gracias por escuchar nuestra playlist!\n\nPronto: Nuestras aventuras en juegos 🎮');
        });
    }
}

// ===== DEBUG =====
window.debug = {
    saltarACarta: function() {
        document.getElementById('pantalla-inicial').style.display = 'none';
        document.getElementById('carta-container').classList.remove('pantalla-oculta');
        crearEmojisFlotantes();
    },
    saltarAMusica: function() {
        document.getElementById('carta-container').classList.add('pantalla-oculta');
        document.getElementById('seccion-musica').classList.remove('pantalla-oculta');
    },
    reiniciar: function() {
        location.reload();
    },
    probarAudio: function() {
        const audio = document.getElementById('musica');
        if (audio) {
            audio.play().then(() => {
                console.log("✅ Audio funcionando");
            }).catch(e => {
                console.log("❌ Error audio:", e);
            });
        }
    }
};

console.log("✅ Todo cargado. Usa debug.saltarACarta() para probar");
