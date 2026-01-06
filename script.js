// ===== CONFIGURACIÓN =====
const textos = [
    "Para mi persona especial...",
    "La que ilumina mis días desde Colombia 🇨🇴",
    "Aunque Perú y Colombia nos separen...",
    "Nada puede separar nuestros corazones 💖",
    "Hola, mi pequeña 🤍",
    "Estos 4 meses han sido mágicos",
    "Cada chat, cada llamada, cada risa...",
    "Todo contigo es especial ✨",
    "¡Prepárate para tu sorpresa!",
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
    
    // Botón final
    if (btnFinal) {
        btnFinal.addEventListener('click', function() {
            alert('💖 Este momento queda guardado para siempre en nuestro corazón.\n\n¡Gracias por estos 4 meses increíbles! 💫');
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
        mostrarTexto();
    }
};
// ===== VIAJE ESPACIAL =====

// Configuración
const configViaje = {
    totalFotos: 5, // Cambia esto al número de fotos que tengas
    velocidadEstrellas: 100,
    zoomFoto: 1.5,
    duracionViaje: 60000 // 60 segundos
};

// Estado del viaje
let viajeActivo = false;
let fotosCargadas = 0;
let fotosTotal = configViaje.totalFotos;
let posicionCamara = { x: 0, y: 0, z: -500 };
let rotacionCamara = { x: 0, y: 0 };
let objetosEspacio = [];
let estrellaInterval;
let tiempoInicioViaje;

// Elementos
const viajeEspacial = document.getElementById('viaje-espacial');
const pantallaCarga = document.querySelector('.pantalla-carga');
const contenedor3D = document.getElementById('contenedor-3d');
const espacio3d = document.getElementById('espacio3d');
const contadorFotos = document.getElementById('contador-fotos');
const mensajeActual = document.getElementById('mensaje-actual');
const finalViaje = document.getElementById('final-viaje');

// Datos de las fotos y mensajes (REMPLAZA ESTOS CON TUS DATOS)
const datosViaje = [
    {
        id: 1,
        tipo: 'foto',
        // URL de tu foto - CAMBIA ESTO
        url: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=400&fit=crop',
        mensaje: 'Nuestro primer chat 💬',
        posicion: { x: -300, y: 100, z: 200 }
    },
    {
        id: 2,
        tipo: 'texto',
        texto: '4 meses increíbles juntos 💖',
        mensaje: 'Cada día a tu lado es especial',
        posicion: { x: 300, y: -50, z: 150 }
    },
    {
        id: 3,
        tipo: 'foto',
        // URL de tu foto - CAMBIA ESTO
        url: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400&h=400&fit=crop',
        mensaje: 'Risas que cruzan fronteras 😂',
        posicion: { x: -150, y: -150, z: 300 }
    },
    {
        id: 4,
        tipo: 'texto',
        texto: 'Perú ❤️ Colombia',
        mensaje: 'La distancia no puede con nuestro amor',
        posicion: { x: 200, y: 200, z: 100 }
    },
    {
        id: 5,
        tipo: 'foto',
        // URL de tu foto - CAMBIA ESTO
        url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=400&fit=crop',
        mensaje: 'Sueños de futuras aventuras ✨',
        posicion: { x: 0, y: 0, z: 400 }
    }
    // Agrega más objetos aquí...
];

// ===== FUNCIONES PRINCIPALES =====

// 1. Iniciar viaje (llamado desde el botón de la carta)
function iniciarViajeEspacial() {
    console.log("🚀 Iniciando viaje espacial...");
    
    // Ocultar carta
    document.getElementById('carta-container').classList.add('hidden');
    
    // Mostrar pantalla de carga del viaje
    viajeEspacial.classList.remove('hidden');
    
    // Iniciar carga
    cargarRecursosViaje();
}

// 2. Cargar recursos (fotos, etc.)
function cargarRecursosViaje() {
    fotosCargadas = 0;
    fotosTotal = datosViaje.filter(item => item.tipo === 'foto').length;
    
    // Simular carga de recursos
    const intervalo = setInterval(() => {
        fotosCargadas++;
        contadorFotos.textContent = `Cargando ${fotosCargadas}/${fotosTotal}`;
        
        if (fotosCargadas >= fotosTotal) {
            clearInterval(intervalo);
            setTimeout(() => {
                pantallaCarga.style.display = 'none';
                iniciarExperiencia3D();
            }, 1000);
        }
    }, 500);
}

// 3. Crear experiencia 3D
function iniciarExperiencia3D() {
    viajeActivo = true;
    tiempoInicioViaje = Date.now();
    
    // Crear estrellas de fondo
    crearEstrellasFondo();
    
    // Crear objetos espaciales (fotos y textos)
    crearObjetosEspaciales();
    
    // Crear efecto warp
    iniciarEfectoWarp();
    
    // Mensaje inicial
    mostrarMensaje("¡Explora nuestros recuerdos! 🌟");
    
    // Configurar controles táctiles/mouse
    configurarControles();
    
    // Iniciar animación
    animarEscena();
    
    // Auto-fin del viaje después del tiempo configurado
    setTimeout(finalizarViaje, configViaje.duracionViaje);
}

// 4. Crear estrellas de fondo
function crearEstrellasFondo() {
    // Estrellas rápidas (efecto warp)
    for (let i = 0; i < 200; i++) {
        const estrella = document.createElement('div');
        estrella.className = 'estrella-rapida';
        
        // Posición inicial aleatoria
        estrella.style.left = `${Math.random() * 100}%`;
        estrella.style.top = `${Math.random() * 100}%`;
        
        // Velocidad aleatoria
        const velocidad = 0.5 + Math.random() * 2;
        estrella.style.animationDuration = `${velocidad}s`;
        estrella.style.animationDelay = `${Math.random() * 2}s`;
        
        // Tamaño aleatorio
        const tamaño = 1 + Math.random() * 3;
        estrella.style.width = `${tamaño}px`;
        estrella.style.height = `${tamaño}px`;
        
        // Opacidad
        estrella.style.opacity = 0.3 + Math.random() * 0.7;
        
        document.body.appendChild(estrella);
        objetosEspacio.push(estrella);
    }
}

// 5. Crear objetos espaciales (fotos y textos)
function crearObjetosEspaciales() {
    datosViaje.forEach((dato, index) => {
        setTimeout(() => {
            const objeto = crearObjetoEspacial(dato, index);
            contenedor3D.appendChild(objeto);
            objetosEspacio.push(objeto);
            
            // Animación de entrada
            objeto.style.opacity = '0';
            objeto.style.transform = `translate3d(${dato.posicion.x}px, ${dato.posicion.y}px, ${dato.posicion.z}px) scale(0.5)`;
            
            setTimeout(() => {
                objeto.style.transition = 'all 1s ease-out';
                objeto.style.opacity = '1';
                objeto.style.transform = `translate3d(${dato.posicion.x}px, ${dato.posicion.y}px, ${dato.posicion.z}px) scale(1)`;
                
                // Mostrar mensaje de la foto
                mostrarMensaje(dato.mensaje);
            }, index * 300);
        }, index * 500);
    });
}

function crearObjetoEspacial(dato, id) {
    const objeto = document.createElement('div');
    objeto.className = 'objeto-espacial';
    objeto.dataset.id = id;
    
    if (dato.tipo === 'foto') {
        const img = document.createElement('img');
        img.className = 'foto-espacio';
        img.src = dato.url;
        img.alt = dato.mensaje;
        img.loading = 'lazy';
        
        // Evento para hacer zoom
        img.addEventListener('click', () => {
            hacerZoomObjeto(objeto, dato);
        });
        
        objeto.appendChild(img);
        
        // Texto descriptivo debajo
        const texto = document.createElement('div');
        texto.className = 'texto-foto';
        texto.textContent = dato.mensaje;
        texto.style.cssText = `
            color: white;
            text-align: center;
            margin-top: 10px;
            font-size: 1rem;
            text-shadow: 0 0 5px black;
        `;
        objeto.appendChild(texto);
        
    } else if (dato.tipo === 'texto') {
        const divTexto = document.createElement('div');
        divTexto.className = 'texto-espacio';
        divTexto.textContent = dato.texto;
        divTexto.style.cssText = `
            color: white;
            font-size: 1.8rem;
            text-align: center;
            padding: 20px;
            border-radius: 15px;
            background: rgba(255, 107, 157, 0.3);
            border: 2px solid #ff6b9d;
            backdrop-filter: blur(10px);
        `;
        
        objeto.appendChild(divTexto);
    }
    
    // Posición inicial
    objeto.style.cssText = `
        position: absolute;
        transform: translate3d(${dato.posicion.x}px, ${dato.posicion.y}px, ${dato.posicion.z}px);
        transition: transform 0.5s ease-out;
        cursor: pointer;
    `;
    
    return objeto;
}

// 6. Efecto warp (estrellas que pasan rápido)
function iniciarEfectoWarp() {
    estrellaInterval = setInterval(() => {
        // Crear nuevas estrellas ocasionales
        if (Math.random() > 0.7) {
            const estrella = document.createElement('div');
            estrella.className = 'estrella-rapida';
            estrella.style.left = `${Math.random() * 100}%`;
            estrella.style.top = `${Math.random() * 100}%`;
            estrella.style.animationDuration = `${0.3 + Math.random() * 0.7}s`;
            estrella.style.opacity = '0.8';
            
            document.body.appendChild(estrella);
            
            // Auto-eliminar después de la animación
            setTimeout(() => {
                if (estrella.parentNode) {
                    estrella.remove();
                }
            }, 1000);
        }
    }, 100);
}

// 7. Controles de movimiento
function configurarControles() {
    // Mouse/touch para mover la cámara
    let mouseDown = false;
    let lastX = 0;
    let lastY = 0;
    
    // Eventos de mouse
    document.addEventListener('mousedown', (e) => {
        mouseDown = true;
        lastX = e.clientX;
        lastY = e.clientY;
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!mouseDown || !viajeActivo) return;
        
        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;
        
        // Mover cámara
        posicionCamara.x += deltaX * 0.5;
        posicionCamara.y -= deltaY * 0.5;
        
        // Rotar cámara ligeramente
        rotacionCamara.y += deltaX * 0.002;
        rotacionCamara.x += deltaY * 0.002;
        
        // Limitar rotación
        rotacionCamara.x = Math.max(-Math.PI/4, Math.min(Math.PI/4, rotacionCamara.x));
        
        lastX = e.clientX;
        lastY = e.clientY;
        
        actualizarCamara();
    });
    
    document.addEventListener('mouseup', () => {
        mouseDown = false;
    });
    
    // Eventos táctiles para móviles
    document.addEventListener('touchstart', (e) => {
        mouseDown = true;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!mouseDown || !viajeActivo) return;
        
        const deltaX = e.touches[0].clientX - lastX;
        const deltaY = e.touches[0].clientY - lastY;
        
        posicionCamara.x += deltaX * 0.5;
        posicionCamara.y -= deltaY * 0.5;
        
        rotacionCamara.y += deltaX * 0.002;
        rotacionCamara.x += deltaY * 0.002;
        rotacionCamara.x = Math.max(-Math.PI/4, Math.min(Math.PI/4, rotacionCamara.x));
        
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
        
        actualizarCamara();
        e.preventDefault();
    });
    
    document.addEventListener('touchend', () => {
        mouseDown = false;
    });
    
    // Zoom con rueda del mouse
    document.addEventListener('wheel', (e) => {
        if (!viajeActivo) return;
        
        posicionCamara.z += e.deltaY * 0.5;
        posicionCamara.z = Math.max(-1000, Math.min(-100, posicionCamara.z));
        
        actualizarCamara();
        e.preventDefault();
    });
}

// 8. Mover cámara con botones
function moverCamara(direccion) {
    if (!viajeActivo) return;
    
    const velocidad = 50;
    
    switch(direccion) {
        case 'izquierda':
            posicionCamara.x -= velocidad;
            break;
        case 'derecha':
            posicionCamara.x += velocidad;
            break;
        case 'arriba':
            posicionCamara.y += velocidad;
            break;
        case 'abajo':
            posicionCamara.y -= velocidad;
            break;
    }
    
    actualizarCamara();
}

// 9. Actualizar posición de la cámara
function actualizarCamara() {
    // Aplicar transformación a todos los objetos
    objetosEspacio.forEach(obj => {
        if (obj.className === 'objeto-espacial') {
            const dataId = obj.dataset.id;
            if (dataId && datosViaje[dataId]) {
                const pos = datosViaje[dataId].posicion;
                
                // Calcular posición relativa a la cámara
                const relX = pos.x - posicionCamara.x;
                const relY = pos.y - posicionCamara.y;
                const relZ = pos.z - posicionCamara.z;
                
                // Aplicar transformación 3D
                obj.style.transform = `
                    translate3d(${relX}px, ${relY}px, ${relZ}px)
                    rotateX(${rotacionCamara.x}rad)
                    rotateY(${rotacionCamara.y}rad)
                `;
                
                // Efecto de parallax basado en profundidad
                const scale = 1 + (relZ / 2000);
                obj.style.transform += ` scale(${scale})`;
                
                // Opacidad basada en distancia
                const distancia = Math.sqrt(relX*relX + relY*relY + relZ*relZ);
                const opacity = Math.max(0.3, Math.min(1, 1000 / distancia));
                obj.style.opacity = opacity;
            }
        }
    });
}

// 10. Animación principal
function animarEscena() {
    if (!viajeActivo) return;
    
    // Rotación suave automática
    rotacionCamara.y += 0.001;
    
    // Movimiento leve de cámara
    const tiempo = Date.now() - tiempoInicioViaje;
    posicionCamara.x = Math.sin(tiempo / 10000) * 100;
    posicionCamara.y = Math.cos(tiempo / 15000) * 50;
    
    actualizarCamara();
    
    requestAnimationFrame(animarEscena);
}

// 11. Hacer zoom a un objeto
function hacerZoomObjeto(objeto, dato) {
    if (!viajeActivo) return;
    
    // Mover cámara hacia el objeto
    posicionCamara.x = dato.posicion.x * 0.8;
    posicionCamara.y = dato.posicion.y * 0.8;
    posicionCamara.z = dato.posicion.z - 200;
    
    // Mostrar mensaje
    mostrarMensaje(dato.mensaje);
    
    // Volver a posición normal después de 3 segundos
    setTimeout(() => {
        posicionCamara.x = 0;
        posicionCamara.y = 0;
        posicionCamara.z = -500;
    }, 3000);
}

// 12. Mostrar mensaje flotante
function mostrarMensaje(texto) {
    mensajeActual.textContent = texto;
    mensajeActual.style.opacity = '1';
    
    // Ocultar después de 4 segundos
    setTimeout(() => {
        mensajeActual.style.opacity = '0';
    }, 4000);
}

// 13. Finalizar viaje
function finalizarViaje() {
    if (!viajeActivo) return;
    
    viajeActivo = false;
    clearInterval(estrellaInterval);
    
    // Limpiar objetos
    objetosEspacio.forEach(obj => {
        if (obj.parentNode) {
            obj.remove();
        }
    });
    objetosEspacio = [];
    
    // Ocultar viaje
    viajeEspacial.classList.add('hidden');
    
    // Mostrar pantalla final
    setTimeout(() => {
        finalViaje.classList.remove('hidden');
    }, 1000);
}

// 14. Repetir viaje
function repetirViaje() {
    finalViaje.classList.add('hidden');
    viajeEspacial.classList.remove('hidden');
    pantallaCarga.style.display = 'flex';
    
    // Reiniciar variables
    viajeActivo = false;
    fotosCargadas = 0;
    posicionCamara = { x: 0, y: 0, z: -500 };
    rotacionCamara = { x: 0, y: 0 };
    
    // Limpiar estrellas rápidas
    document.querySelectorAll('.estrella-rapida').forEach(star => {
        star.remove();
    });
    
    // Volver a cargar
    setTimeout(cargarRecursosViaje, 500);
}

// 15. Compartir viaje
function compartirViaje() {
    const mensaje = "¡Mira el viaje especial que me hicieron! ✨💖";
    const url = window.location.href;
    
     if (navigator.share) {
        navigator.share({
            title: 'Nuestro Viaje Espacial',
            text: mensaje,
            url: url
        });
    } else {
        // Copiar al portapapeles
        navigator.clipboard.writeText(`${mensaje}\n${url}`)
            .then(() => {
                alert('¡Link copiado al portapapeles! 📋\nPégalo donde quieras compartirlo.');
            });
    }
}


