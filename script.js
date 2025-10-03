const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

if (track) {
  let autoSlideInterval = null;
  let cardWidth = 250;
  const AUTO_DELAY = 4000; // 4 detik

  function calcCardWidth() {
    const card = track.querySelector('.team-card');
    const gapStr = getComputedStyle(track).gap || '20px';
    const gap = parseInt(gapStr) || 20;
    if (card) cardWidth = card.offsetWidth + gap;
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => {
      if (Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth - 2) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, AUTO_DELAY);
  }

  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      calcCardWidth();
      if (Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth - 2) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      calcCardWidth();
      if (track.scrollLeft <= 2) {
        track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      }
    });
  }

  // Pause saat hover
  track.addEventListener('mouseenter', stopAutoSlide);
  track.addEventListener('mouseleave', startAutoSlide);

  // Start saat load
  window.addEventListener('load', () => {
    calcCardWidth();
    startAutoSlide();
  });
  window.addEventListener('resize', calcCardWidth);
}

// Animasi hero kedua muncul saat discroll
document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll('.slide-in-right-on-scroll');
  
  function handleScroll() {
    targets.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // cek pertama kali
});

// Back to Top Button
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Toggle Navbar Mobile
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("open");
  });
}
