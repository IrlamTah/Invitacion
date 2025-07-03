// Contador Regresivo
    function updateCountdown() {
      const weddingDate = new Date('2025-09-06T18:30:00').getTime();
      const now = new Date().getTime();
      const timeLeft = weddingDate - now;

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
      } else {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        document.querySelector('.countdown-title').textContent = '¡Es hoy!';
      }
    }

    // Control de Música con <audio>
    const musicControl = document.getElementById('musicControl');
    const backgroundMusic = document.getElementById('backgroundMusic');
    let isPlaying = false;

    musicControl.addEventListener('click', function() {
      if (!isPlaying) {
        backgroundMusic.play().then(() => {
          musicControl.textContent = '🔇';
          musicControl.style.background = 'rgba(220, 20, 60, 0.9)';
          isPlaying = true;
        }).catch((err) => {
          console.log('Error al reproducir música:', err);
        });
      } else {
        backgroundMusic.pause();
        musicControl.textContent = '🎵';
        musicControl.style.background = 'rgba(184, 134, 11, 0.9)';
        isPlaying = false;
      }
    });

    // Inicialización
    document.addEventListener('DOMContentLoaded', function() {
      updateCountdown();
      setInterval(updateCountdown, 1000);

      // Animaciones y efectos
      const namesElement = document.querySelector('.couples-names');
      namesElement.style.opacity = '0';
      namesElement.style.transform = 'translateY(20px)';
      setTimeout(() => {
        namesElement.style.transition = 'all 1.5s ease-out';
        namesElement.style.opacity = '1';
        namesElement.style.transform = 'translateY(0)';
      }, 500);

      document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        btn.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0) scale(1)';
        });
      });

      document.querySelectorAll('.section').forEach(section => {
        section.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-2px)';
          this.style.filter = 'brightness(1.05)';
        });
        section.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
          this.style.filter = 'brightness(1)';
        });
      });

      // Indicador visual de botón de música
      setTimeout(() => {
        if (!isPlaying) {
        container.style.width = `${slide.offsetWidth}px`;
          musicControl.style.animation = 'pulse 2s infinite';
        }
      }, 3000);
      // Carrusel de imágenes
      const container = document.querySelector(".carousel-container");
    const track = container.querySelector(".carousel-track");
    const slides = Array.from(track.querySelectorAll("img"));
    let currentIndex = 0;

    Promise.all(
      slides.map(img => {
        return new Promise(resolve => {
          if (img.complete) resolve();
          else img.onload = resolve;
        });
      })
    ).then(() => {
      // Establece tamaño inicial
      const setContainerSize = (index) => {
        const slide = slides[index];
        const maxWidth = container.parentElement.clientWidth;
        const newWidth = Math.min(slide.offsetWidth, maxWidth);
        container.style.width = `${newWidth}px`;
        container.style.height = `${slide.offsetHeight}px`;
      };

      setContainerSize(0);

      setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;

        const offset = slides[currentIndex].offsetLeft;
        track.style.transform = `translateX(-${offset}px)`;
        setContainerSize(currentIndex);
      }, 3000);
    });

    });

    // Animación del contador
    setInterval(() => {
      const countdownItems = document.querySelectorAll('.countdown-item');
      countdownItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.transform = 'scale(1.1)';
          setTimeout(() => {
            item.style.transform = 'scale(1)';
          }, 200);
        }, index * 100);
      });
    }, 5000);
    for (let i = 0; i < 25; i++) {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.textContent = '💞';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = (8 + Math.random() * 5) + 's';
      heart.style.fontSize = (1 + Math.random() * 2) + 'em';
      document.getElementById('welcomeScreen').appendChild(heart);
    }

    document.getElementById('enterBtn').addEventListener('click', function () {
      const welcome = document.getElementById('welcomeScreen');
      const container = document.querySelector('.container');
      const audio = document.getElementById('backgroundMusic');
      const musicBtn = document.getElementById('musicControl');

      // Mostrar control de música como activo
      audio.muted = false;
      audio.play().then(() => {
        musicBtn.textContent = '🔇';
        musicBtn.style.background = 'rgba(220, 20, 60, 0.9)';
        isPlaying = true;
      }).catch(err => {
        console.log("No se pudo reproducir el audio", err);
      });

      // Ocultar pantalla de bienvenida
      welcome.style.transition = 'opacity 1s ease';
      welcome.style.opacity = '0';
      setTimeout(() => {
        welcome.remove();
        container.classList.add('visible');
      }, 1000);
      
      startPetalRain()
    });

    function createPetal() {
      const container = document.getElementById('petal-container');
      const petal = document.createElement('div');
      petal.classList.add('petal');
      petal.textContent = '🌸';

      // Posición horizontal aleatoria
      petal.style.left = `${Math.random() * 100}vw`;

      // Tamaño aleatorio
      petal.style.fontSize = `${1 + Math.random()}em`;

      // Duración aleatoria
      petal.style.animationDuration = `${5 + Math.random() * 5}s`;

      // Opcional: retraso aleatorio para dar variedad
      petal.style.animationDelay = `${Math.random() * 2}s`;

      container.appendChild(petal);

      // Remover el pétalo después de que termine su animación (~12s)
      setTimeout(() => {
        petal.remove();
      }, 12000);
    }

    function startPetalRain() {
      // Crear un pétalo cada 300ms
      setInterval(() => {
        createPetal();
      }, 300);
    }


    function revealOnScrollOnce() {
      const sections = document.querySelectorAll('.section');
      const windowHeight = window.innerHeight;
      const revealPoint = 150;

      sections.forEach(section => {
        if (section.classList.contains('visible')) return; // ya visible

        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - revealPoint) {
          section.classList.add('visible');
        }
      });
    }

    window.addEventListener('scroll', revealOnScrollOnce);
    window.addEventListener('load', revealOnScrollOnce);
