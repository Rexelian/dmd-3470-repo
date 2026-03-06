/*
const snapContainer = document.querySelector('.card-container');

let timeout;
snapContainer.addEventListener('scroll', () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    AOS.refresh();
  }, 120); // fires after snapping settles
});*/

/*AOS.init({
  once: false,
  mirror: true   // important for upward scroll
});

const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
    }
  });
}, { threshold: 0.6 });

cards.forEach(card => observer.observe(card));


const snapContainer = document.querySelector('.card-container');

let timeout;
snapContainer.addEventListener('scroll', () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    AOS.refresh();
  }, 120); // fires when snapping settles
});


const container = document.querySelector('.card-container');

let snapTimeout;
container.addEventListener('scroll', () => {
  clearTimeout(snapTimeout);
  snapTimeout = setTimeout(() => {
    AOS.refreshHard();   // stronger than refresh()
  }, 80);
});


const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
    } else {
      entry.target.classList.remove('aos-animate');
    }
  });
}, { threshold: 0.6 });

cards.forEach(card => observer.observe(card));
*/


const flipSound = new Audio('sound/682449__geoff-bremner-audio__card_deck_flick_click.mp3'); 
flipSound.volume = 0.75; // optional: adjust volume

window.addEventListener('click', () => {
  flipSound.play().catch(() => {});
}, { once: true });


const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('flip-in');

      flipSound.currentTime = 0;
      flipSound.play().catch(() => {
      flipSound.playbackRate = 1.25; // normal speed
      
      });

    } else {
      entry.target.classList.remove('flip-in');
    }
  });
}, {
  threshold: 0.6
});

cards.forEach(card => observer.observe(card));