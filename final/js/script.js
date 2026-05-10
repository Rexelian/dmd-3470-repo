// Scroll-triggered fade-in animation
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings inside the same parent
        const siblings = entry.target.parentElement.querySelectorAll('.fade-in');
        siblings.forEach((el, idx) => {
          setTimeout(() => el.classList.add('visible'), idx * 100);
        });
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

fadeEls.forEach((el) => observer.observe(el));

// Play button interaction
const playBtn = document.querySelector('.play-btn');
if (playBtn) {
  playBtn.addEventListener('click', () => {
    window.open("https://www.youtube.com/watch?v=itYW-9td0RQ", "_blank");
  });
}

//drop-down
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(26, 5, 51, 0.92)';
  } else {
    nav.style.background = 'rgba(255,255,255,0.08)';
  }
});

const dropdownBtn = document.getElementById("drop-down-button");
const navLinks = document.querySelector(".nav-links");

dropdownBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

