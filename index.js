document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Menu Toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const mobileBackdrop = document.querySelector('.mobile-backdrop');

  menuToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  mobileBackdrop?.addEventListener('click', () => {
    navLinks?.classList.remove('active');
    menuToggle?.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navLinks?.classList.remove('active');
      menuToggle?.classList.remove('active');
    }
  });

  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('active');
      menuToggle?.classList.remove('active');
    });
  });

  // --- Hero Text Rotator ---
  const textSets = document.querySelectorAll('.text-set');
  let currentIndex = 0;
  setInterval(() => {
    if (textSets.length) {
      textSets[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % textSets.length;
      textSets[currentIndex].classList.add('active');
    }
  }, 3500);

 

  // --- Back To Top ---
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.hidden = window.scrollY < 300;
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Nav styling on scroll ---
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });
  }

  // Initial setup
  updateTeamBoxDisplay();
});
