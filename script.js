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
const btnFinal = document.getElementById('btn-final');

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

// ===== FONDO ANIMADO SNOOPY Y GATITOS =====
function crearFondoAnimado() {
    const fondo = document.getElementById('fondo-animado');
    if (!fondo) return;
    
    // Limpiar fondo por si hay elementos previos
    fondo.innerHTML = '';
    
    // Crear 15 elementos flotantes (puedes ajustar)
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const esSnoopy = Math.random() > 0.5;
            const elemento = document.createElement('div');
            
            // Usar emojis como fallback si no hay imágenes
            elemento.className = esSnoopy ? 'snoopy-flotante' : 'gatito-flotante';
            
            // Tamaño aleatorio
            const tamaño = 50 + Math.random() * 60;
            elemento.style.width = `${tamaño}px`;
            elemento.style.height = `${tamaño}px`;
            
            // Posición horizontal aleatoria
            elemento.style.left = `${Math.random() * 100}vw`;
            
            // Velocidad aleatoria
            const velocidades = ['flotar-lento', 'flotar-medio', 'flotar-rapido'];
            const velocidad = velocidades[Math.floor(Math.random() * velocidades.length)];
            elemento.classList.add(velocidad);
            
            // Retraso aleatorio
            elemento.style.animationDelay = `${Math.random() * 20}s`;
            
            // Opacidad aleatoria
            elemento.style.opacity = `${0.4 + Math.random() * 0.4}`;
            
            // Girar aleatoriamente
            if (Math.random() > 0.5) {
                elemento.classList.add('girando');
            }
            
            // Si tienes imágenes con esos nombres, descomenta esto:
            // if (esSnoopy) {
            //     elemento.style.backgroundImage = "url('snoopy.png')";
            //     elemento.innerHTML = ''; // Quita el emoji
            // } else {
            //     elemento.style.backgroundImage = "url('gatito.png')";
            //     elemento.innerHTML = '';
            // }
            
            fondo.appendChild(elemento);
        }, i * 300);
    }
}

// ===== MOSTRAR CARTA =====
function mostrarCarta() {
    document.querySelector('.container').style.display = 'none';
    particlesContainer.style.display = 'none';
    document.querySelector('.music-controls').style.display = 'none';
    
    setTimeout(() => {
        cartaContainer.classList.remove('hidden');
        crearFondoAnimado();
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
            // Mostrar el botón después de abrir el sobre
            if (btnFinal) {
                btnFinal.style.display = 'flex';
            }
        }, 1500);
    });
    
    // Botón final - inicialmente oculto
    if (btnFinal) {
        btnFinal.style.display = 'none'; // Oculto hasta abrir el sobre
        btnFinal.addEventListener('click', function() {
            alert('✨ Este momento queda guardado para siempre.\n\n¡Gracias por estos 4 meses increíbles! 🤍');
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
        crearFondoAnimado();
        sobreExterior.style.display = 'none';
        contenidoInterior.classList.remove('hidden');
        if (btnFinal) btnFinal.style.display = 'flex';
    },
    reiniciar: function() {
        index = 0;
        document.querySelector('.container').style.display = 'block';
        particlesContainer.style.display = 'block';
        document.querySelector('.music-controls').style.display = 'flex';
        flashOverlay.style.display = 'block';
        flashOverlay.style.width = '0';
        flashOverlay.style.height = '0';
        flashOverlay.style.opacity = '0';
        cartaContainer.classList.add('hidden');
        sobreExterior.style.display = 'block';
        sobreExterior.classList.remove('abriendo');
        contenidoInterior.classList.add('hidden');
        if (btnFinal) btnFinal.style.display = 'none';
        document.getElementById('fondo-animado').innerHTML = '';
        mostrarTexto();
    }
    // ===== CONTROL SECCIÓN MÚSICA =====
function iniciarSeccionMusica() {
    const btnSiguienteFotos = document.getElementById('btn-siguiente-fotos');
    
    if (btnSiguienteFotos) {
        btnSiguienteFotos.addEventListener('click', function() {
            // Ocultar sección música con efecto
            const seccionMusica = document.getElementById('seccion-musica');
            seccionMusica.style.opacity = '0';
            seccionMusica.style.transform = 'translateY(50px)';
            seccionMusica.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                seccionMusica.classList.add('hidden');
                
                // Aquí irá la sección de fotos de juegos
                // mostrarSeccionFotos();
                console.log("Ir a sección de fotos...");
                
                // TEMPORAL: Mostrar alerta
                alert("🎮 Próximamente: Nuestras aventuras en juegos! (Siguiente sección)");
                
                // O puedes crear una sección temporal:
                crearSeccionTemporalFotos();
            }, 800);
        });
    }
    
    // Efecto especial al pasar mouse sobre tarjetas
    const tarjetas = document.querySelectorAll('.cancion-card');
    tarjetas.forEach((tarjeta, index) => {
        // Retraso escalonado para animación de entrada
        setTimeout(() => {
            tarjeta.style.opacity = '1';
            tarjeta.style.transform = 'translateY(0)';
        }, index * 200);
        
        tarjeta.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(255, 107, 157, 0.25)';
            this.style.transform = 'translateY(-8px)';
        });
        
        tarjeta.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Animación de entrada para toda la sección
    setTimeout(() => {
        const seccionMusica = document.getElementById('seccion-musica');
        if (seccionMusica) {
            seccionMusica.style.opacity = '1';
            seccionMusica.style.transform = 'translateY(0)';
        }
    }, 100);
}

// ===== SECCIÓN TEMPORAL DE FOTOS (para probar) =====
function crearSeccionTemporalFotos() {
    // Crear sección temporal
    const seccionFotos = document.createElement('div');
    seccionFotos.id = 'seccion-temporal-fotos';
    seccionFotos.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1a1a2e, #16213e);
        z-index: 30000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        color: white;
        text-align: center;
    `;
    
    seccionFotos.innerHTML = `
        <h2 style="font-family: 'Dancing Script', cursive; font-size: 3rem; color: #ff6b9d; margin-bottom: 20px;">
            <i class="fas fa-gamepad"></i> Nuestras Aventuras en Juegos
        </h2>
        <p style="font-size: 1.2rem; margin-bottom: 30px; max-width: 600px;">
            Pronto aquí estarán todas nuestras capturas épicas de Roblox y otros juegos 🎮
        </p>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; max-width: 500px; margin: 30px 0;">
            <div style="background: rgba(255,107,157,0.2); padding: 20px; border-radius: 15px;">
                <i class="fas fa-robot" style="font-size: 2.5rem; margin-bottom: 10px;"></i>
                <p>Roblox</p>
            </div>
            <div style="background: rgba(0,150,255,0.2); padding: 20px; border-radius: 15px;">
                <i class="fas fa-dragon" style="font-size: 2.5rem; margin-bottom: 10px;"></i>
                <p>Otros Juegos</p>
            </div>
            <div style="background: rgba(255,200,0,0.2); padding: 20px; border-radius: 15px;">
                <i class="fas fa-camera" style="font-size: 2.5rem; margin-bottom: 10px;"></i>
                <p>Momentos Épicos</p>
            </div>
        </div>
        <button id="btn-volver-musica" style="
            background: #ff6b9d;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            color: white;
            font-size: 1.1rem;
            cursor: pointer;
            margin-top: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        ">
            <i class="fas fa-arrow-left"></i> Volver a la Música
        </button>
    `;
    
    document.body.appendChild(seccionFotos);
    
    // Botón para volver
    document.getElementById('btn-volver-musica').addEventListener('click', function() {
        document.body.removeChild(seccionFotos);
        document.getElementById('seccion-musica').classList.remove('hidden');
    });
}
};

