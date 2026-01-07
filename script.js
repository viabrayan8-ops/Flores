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

// ===== VARIABLES =====
let indexTexto = 0;

// ===== INICIAR CUANDO LA PÁGINA CARGUE =====
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Página cargada");
    
    // Iniciar música
    iniciarMusicaFondo();
    
    // Crear partículas
    crearParticulas();
    
    // Mostrar primer texto
    mostrarSiguienteTexto();
    
    // Configurar botón final de música
    const btnFinMusica = document.getElementById('btn-fin-musica');
    if (btnFinMusica) {
        btnFinMusica.addEventListener('click', function() {
            alert('🎵 ¡Gracias por escuchar! El regalo continúa...');
        });
    }
});

// ===== MÚSICA DE FONDO =====
function iniciarMusicaFondo() {
    const musica = document.getElementById('musica');
    const musicToggle = document.getElementById('music-toggle');
    const musicLabel = document.querySelector('.music-label');
    
    if (!musica || !musicToggle) return;
    
    // Auto-iniciar con primer clic
    document.addEventListener('click', function iniciarConClick() {
        musica.play().catch(e => console.log("Esperando interacción..."));
        document.removeEventListener('click', iniciarConClick);
    });
    
    // Control play/pause
    musicToggle.addEventListener('click', function() {
        if (musica.paused) {
            musica.play();
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            if (musicLabel) musicLabel.textContent = 'Música: On';
        } else {
            musica.pause();
            musicToggle.innerHTML = '<i class="fas fa-play"></i>';
            if (musicLabel) musicLabel.textContent = 'Música: Off';
        }
    });
}

// ===== PARTÍCULAS =====
function crearParticulas() {
    const particles = document.getElementById('particles');
    if (!particles) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement("span");
        particle.style.left = Math.random() * 100 + "vw";
        particle.style.animationDuration = (5 + Math.random() * 10) + "s";
        particle.style.opacity = Math.random() * 0.8;
        particle.style.animationDelay = Math.random() * 5 + "s";
        particles.appendChild(particle);
    }
}

// ===== MOSTRAR TEXTOS =====
function mostrarSiguienteTexto() {
    const textoElemento = document.getElementById('texto');
    if (!textoElemento || indexTexto >= textos.length) {
        setTimeout(activarFlash, 2000);
        return;
    }
    
    textoElemento.style.opacity = '0';
    
    setTimeout(() => {
        textoElemento.textContent = textos[indexTexto];
        textoElemento.style.opacity = '1';
        indexTexto++;
        
        if (indexTexto < textos.length) {
            setTimeout(mostrarSiguienteTexto, 4000);
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
    let escala = 0;
    
    function animar() {
        escala += 5;
        flash.style.width = `${escala}vh`;
        flash.style.height = `${escala}vh`;
        
        if (escala < 300) {
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
    
    // Crear 25 emojis (15 perros, 10 gatos)
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.className = 'emoji-flotante';
            
            // Alternar entre perro y gato (más perros porque es Snoopy)
            const esPerro = i < 15;
            emoji.textContent = esPerro ? '🐶' : '🐱';
            
            // Tamaño aleatorio
            const tamaño = 30 + Math.random() * 50;
            emoji.style.fontSize = `${tamaño}px`;
            
            // Posición horizontal aleatoria
            emoji.style.left = `${Math.random() * 100}vw`;
            
            // Velocidad aleatoria (más lenta para algunos)
            const velocidad = 15 + Math.random() * 25;
            emoji.style.animationDuration = `${velocidad}s`;
            
            // Retraso inicial aleatorio
            emoji.style.animationDelay = `${Math.random() * 15}s`;
            
            // Opacidad aleatoria
            emoji.style.opacity = `${0.3 + Math.random() * 0.5}`;
            
            // Algunos giran
            if (Math.random() > 0.7) {
                emoji.style.animation += ', girar 20s linear infinite';
            }
            
            fondo.appendChild(emoji);
        }, i * 150);
    }
    
    // Agregar animación de giro si no existe
    if (!document.getElementById('estilo-giro')) {
        const estilo = document.createElement('style');
        estilo.id = 'estilo-giro';
        estilo.textContent = `
            @keyframes girar {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(estilo);
    }
}

// ===== MOSTRAR CARTA =====
function mostrarCarta() {
    const container = document.querySelector('.container');
    const particles = document.getElementById('particles');
    const controls = document.querySelector('.music-controls');
    
    if (container) container.style.display = 'none';
    if (particles) particles.style.display = 'none';
    if (controls) controls.style.display = 'none';
    
    const carta = document.getElementById('carta-container');
    if (carta) {
        carta.classList.remove('hidden');
        crearEmojisFlotantes(); // <- ¡EMOJIS AQUÍ!
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
                    contenido.classList.remove('hidden');
                    efectoEscrituraCarta();
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
                carta.classList.add('hidden');
                musicaSection.classList.remove('hidden');
            }
        });
    }
}

// ===== EFECTO ESCRITURA =====
function efectoEscrituraCarta() {
    const parrafos = document.querySelectorAll('.papel-carta p');
    parrafos.forEach((parrafo, index) => {
        const texto = parrafo.textContent;
        parrafo.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            function escribir() {
                if (i < texto.length) {
                    parrafo.textContent += texto.charAt(i);
                    i++;
                    setTimeout(escribir, 30);
                }
            }
            escribir();
        }, index * 2000);
    });
}

// ===== DEBUG =====
window.debug = {
    saltarACarta: function() {
        document.querySelector('.container').style.display = 'none';
        document.getElementById('particles').style.display = 'none';
        document.querySelector('.music-controls').style.display = 'none';
        document.getElementById('carta-container').classList.remove('hidden');
        crearEmojisFlotantes();
    },
    saltarAMusica: function() {
        document.getElementById('carta-container').classList.add('hidden');
        document.getElementById('seccion-musica').classList.remove('hidden');
    },
    reiniciar: function() {
        location.reload();
    }
};

console.log("🎁 Script listo! Usa debug.saltarACarta() para probar");
