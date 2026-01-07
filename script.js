// TEXTO
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

let indice = 0;

// CUANDO CARGA LA PÁGINA
window.onload = function() {
    console.log("✅ Página cargada");
    
    // Música
    const musica = document.getElementById('musica');
    const toggleBtn = document.getElementById('music-toggle');
    
    if (toggleBtn && musica) {
        toggleBtn.addEventListener('click', function() {
            if (musica.paused) {
                musica.play();
                toggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                musica.pause();
                toggleBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        
        // Auto iniciar con click
        document.addEventListener('click', function() {
            if (musica.paused) {
                musica.play().catch(e => console.log("Click para música"));
            }
        }, { once: true });
    }
    
    // Partículas
    crearParticulas();
    
    // Iniciar texto
    mostrarTexto();
    
    // Botones
    document.getElementById('btn-fin-musica').addEventListener('click', function() {
        alert('🎵 Continuaremos pronto...');
    });
};

// PARTÍCULAS
function crearParticulas() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('span');
        p.style.left = Math.random() * 100 + 'vw';
        p.style.animationDuration = (5 + Math.random() * 10) + 's';
        p.style.opacity = Math.random() * 0.8;
        p.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(p);
    }
}

// MOSTRAR TEXTO
function mostrarTexto() {
    const textoElem = document.getElementById('texto');
    if (!textoElem || indice >= textos.length) {
        setTimeout(flash, 2000);
        return;
    }
    
    textoElem.style.opacity = 0;
    
    setTimeout(() => {
        textoElem.textContent = textos[indice];
        textoElem.style.opacity = 1;
        indice++;
        
        if (indice < textos.length) {
            setTimeout(mostrarTexto, 4000);
        } else {
            setTimeout(flash, 4000);
        }
    }, 2000);
}

// FLASH
function flash() {
    const flashElem = document.getElementById('flash-overlay');
    flashElem.style.opacity = 1;
    
    let size = 0;
    function animar() {
        size += 5;
        flashElem.style.width = size + 'vh';
        flashElem.style.height = size + 'vh';
        
        if (size < 300) {
            requestAnimationFrame(animar);
        } else {
            flashElem.style.opacity = 0;
            mostrarCarta();
        }
    }
    animar();
}

// MOSTRAR CARTA
function mostrarCarta() {
    document.getElementById('pantalla-inicio').style.display = 'none';
    document.getElementById('carta-container').classList.remove('oculto');
    
    // Configurar sobre
    const sobre = document.getElementById('sobre-exterior');
    const contenido = document.getElementById('contenido-interior');
    
    sobre.addEventListener('click', function() {
        this.classList.add('abriendo');
        setTimeout(() => {
            contenido.classList.remove('oculto');
        }, 1500);
    });
    
    // Botón a música
    document.getElementById('btn-ir-musica').addEventListener('click', function() {
        document.getElementById('carta-container').classList.add('oculto');
        document.getElementById('seccion-musica').classList.remove('oculto');
    });
}

// DEBUG
window.debug = {
    saltarACarta: function() {
        document.getElementById('pantalla-inicio').style.display = 'none';
        document.getElementById('carta-container').classList.remove('oculto');
    },
    saltarAMusica: function() {
        document.getElementById('carta-container').classList.add('oculto');
        document.getElementById('seccion-musica').classList.remove('oculto');
    }
};
