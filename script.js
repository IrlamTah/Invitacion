// script.js

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

    $('#days').text(days.toString().padStart(2, '0'));
    $('#hours').text(hours.toString().padStart(2, '0'));
    $('#minutes').text(minutes.toString().padStart(2, '0'));
    $('#seconds').text(seconds.toString().padStart(2, '0'));
  } else {
    $('#days, #hours, #minutes, #seconds').text('00');
    $('.countdown-title').text('¡Es hoy!');
  }
}

// Control de Música
let isPlaying = false;

$('#musicControl').on('click', function () {
  const audio = $('#backgroundMusic')[0];
  if (!isPlaying) {
    audio.play().then(() => {
      $(this).html('<i class="bi bi-volume-mute"></i>');
      $(this).removeClass('btn-warning').addClass('btn-danger');
      isPlaying = true;
    }).catch(err => console.error('Error al reproducir música:', err));
  } else {
    audio.pause();
    $(this).html('<i class="bi bi-music-note-beamed"></i>');
    $(this).removeClass('btn-danger').addClass('btn-warning');
    isPlaying = false;
  }
});

// Animación bienvenida
$('#enterBtn').on('click', function () {
  const $welcome = $('#welcomeScreen');
  const $container = $('#mainContainer');
  const $audio = $('#backgroundMusic')[0];

  $audio.muted = false;
  $audio.play().then(() => {
    $('#musicControl').html('<i class="bi bi-volume-mute"></i>').removeClass('btn-warning').addClass('btn-danger');
    isPlaying = true;
  }).catch(err => console.warn('No se pudo reproducir el audio:', err));

  $welcome.fadeOut(1000, function () {
    $welcome.remove();
    $container.addClass('visible');
  });


  startPetalRain();
});

// Lluvia de pétalos
function createPetal() {
  const container = $('#petal-container');
  const petal = $('<div class="petal">🌸</div>');

  petal.css({
    left: `${Math.random() * 100}vw`,
    fontSize: `${1 + Math.random()}em`,
    animationDuration: `${5 + Math.random() * 5}s`,
    animationDelay: `${Math.random() * 2}s`
  });

  container.append(petal);
  setTimeout(() => petal.remove(), 12000);
}

function startPetalRain() {
  setInterval(createPetal, 1500);
}

// Reveal on Scroll
function revealOnScrollOnce() {
  $('.section').each(function () {
    if ($(this).hasClass('visible')) return;
    const top = this.getBoundingClientRect().top;
    if (top < window.innerHeight - 150) {
      $(this).addClass('visible');
    }
  });
}

// Inicialización
$(document).ready(function () {
  updateCountdown();
  setInterval(updateCountdown, 1000);

  revealOnScrollOnce();
  $(window).on('scroll load', revealOnScrollOnce);

  // Animación en botones y secciones
  $('.btn').hover(
    function () { $(this).addClass('shadow-lg'); },
    function () { $(this).removeClass('shadow-lg'); }
  );

  $('.section').hover(
    function () {
      $(this).css({ transform: 'translateY(-2px)', filter: 'brightness(1.05)' });
    },
    function () {
      $(this).css({ transform: 'translateY(0)', filter: 'brightness(1)' });
    }
  );

  // Animación del contador
  setInterval(() => {
    $('.countdown-item').each(function (index) {
      setTimeout(() => {
        $(this).css('transform', 'scale(1.1)');
        setTimeout(() => {
          $(this).css('transform', 'scale(1)');
        }, 200);
      }, index * 100);
    });
  }, 5000);

  // Indicador de animación del botón música si no se ha activado
  setTimeout(() => {
    if (!isPlaying) {
      $('#musicControl').addClass('animate__animated animate__pulse animate__infinite');
    }
  }, 3000);
});
