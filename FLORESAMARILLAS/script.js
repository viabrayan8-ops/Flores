window.onload = () => {

    const setVh = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);



    const c = setTimeout(() => {
        document.body.classList.remove("not-loaded");
        clearTimeout(c);
    }, 1000);

    const poemText = [
  "Hoy las flores amarillas viajan en mi mensaje,\n" +
  "no en un ramo que se entrega con las manos,\n" +
  "sino en un gesto que cruza la distancia\n" +
  "para recordarte lo especial que eres.\n",

  "Dicen que las flores amarillas hablan de amistad,\n" +
  "de cariño sincero, de alegría compartida.\n" +
  "Y así es lo que siento:\n" +
  "agradezco tu atención, tu tiempo, tu compañía.\n",

  "Aunque aún no nos hemos visto,\n" +
  "siento que tu presencia ilumina,\n" +
  "que tu voz y tus palabras\n" +
  "son como un sol en mis días grises.\n",

  "Hoy quiero que recibas este detalle,\n" +
  "un regalo virtual pero lleno de verdad:\n" +
  "flores amarillas que te recuerden\n" +
  "cuánto te aprecio y cuánto valoro tenerte en mi vida\n" +
  "Con cariño, Brayan para Lorenita :D"
    ].join("");



    const poemElement = document.getElementById("poem-text");
    const root = document.documentElement;
    let charIndex = 0;
    const typingSpeed = 80;

    const stemHeights = {
        'flower--1': 70,
        'flower--2': 60,
        'flower--3': 55
    };

    function typeWriter() {
        if (charIndex < poemText.length) {

            poemElement.innerHTML += poemText.charAt(charIndex);
            charIndex++;

            const totalProgress = charIndex / poemText.length;
            const stemProgress = totalProgress;
            const leafProgress = Math.max(0, (totalProgress - 0.2) / 0.8);
            const flowerProgress = Math.max(0, (totalProgress - 0.5) / 0.5);

            document.querySelectorAll('.flower').forEach(flower => {
                const baseHeight = stemHeights[flower.classList[1]];
                const currentHeight = baseHeight * stemProgress;
                flower.querySelector('.flower__line').style.height = `${currentHeight}vmin`;
            });

            root.style.setProperty('--leaf-growth', leafProgress.toFixed(2));
            root.style.setProperty('--flower-growth', flowerProgress.toFixed(2));

            setTimeout(typeWriter, typingSpeed);
        } else {
            poemElement.classList.add("typing-done");

            root.style.setProperty('--leaf-growth', 1);
            root.style.setProperty('--flower-growth', 1);
            document.querySelectorAll('.flower').forEach(flower => {
                const baseHeight = stemHeights[flower.classList[1]];
                flower.querySelector('.flower__line').style.height = `${baseHeight}vmin`;
            });
        }
    }

    typeWriter();
    function createStars() {
        const night = document.querySelector('.night');
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            night.appendChild(star);
        }
    }
    createStars();
};