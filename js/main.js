// Mobile menu toggle
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
const header = document.getElementById('header');

function setMenu(open) {
  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.textContent = open ? '✕' : '☰';
}
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
window.addEventListener('resize', () => { if (window.innerWidth > 820) setMenu(false); });

// Header style on scroll
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Reveal on scroll
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(el => io.observe(el));
} else {
  items.forEach(el => el.classList.add('visible'));
}

// Active nav link highlighting
const links = [...menu.querySelectorAll('a')];
const sections = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  let current = sections[0];
  sections.forEach(s => { if (s.offsetTop <= y) current = s; });
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current.id));
}, { passive: true });
