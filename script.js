// Valores iniciales editables: cambia el número de cada habilidad (0 a 100).
const skills = [
  { title: 'Backend & APIs', icon: '⌘', items: [['NestJS', 75], ['Spring Boot', 75], ['APIs REST', 80], ['Autenticación JWT', 70]] },
  { title: 'Lenguajes', icon: '</>', items: [['Java', 75], ['TypeScript', 75], ['JavaScript', 70]] },
  { title: 'Bases de datos', icon: '▤', items: [['PostgreSQL', 75], ['SQL Server', 60], ['JPA / Spring Data', 70]] },
  { title: 'Frontend', icon: '◈', items: [['React', 60], ['Tailwind CSS', 65], ['HTML / CSS', 65]] },
  { title: 'Herramientas & Cloud', icon: '☁', items: [['Git / GitHub', 75], ['Postman', 80], ['Railway', 65], ['Cloudinary', 65]] },
  { title: 'Metodologías & Modelado', icon: '◇', items: [['Scrum', 75], ['UML', 70], ['Análisis de requisitos', 70], ['XP', 55]] }
];
const grid = document.querySelector('#skills-grid');
skills.forEach(category => {
  const card = document.createElement('article');
  card.className = 'skill-category reveal';
  const title = document.createElement('h3');
  const icon = document.createElement('span');
  icon.className = 'card-icon'; icon.textContent = category.icon; icon.setAttribute('aria-hidden', 'true');
  title.append(icon, document.createTextNode(category.title)); card.append(title);
  category.items.forEach(([name, value]) => {
    const item = document.createElement('div'); item.className = 'skill-item';
    const label = document.createElement('div'); label.className = 'skill-header';
    const text = document.createElement('span'); text.textContent = name;
    const percentage = document.createElement('span'); percentage.textContent = `${value}%`;
    label.append(text, percentage);
    const bar = document.createElement('div'); bar.className = 'skill-bar'; bar.setAttribute('role', 'meter');
    bar.setAttribute('aria-label', name); bar.setAttribute('aria-valuemin', '0'); bar.setAttribute('aria-valuemax', '100'); bar.setAttribute('aria-valuenow', value);
    const progress = document.createElement('div'); progress.className = 'skill-progress'; progress.style.setProperty('--level', `${value}%`);
    bar.append(progress); item.append(label, bar); card.append(item);
  });
  grid.append(card);
});
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#nav-menu');
function closeMenu() { menu.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Abrir menú'); }
menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});
menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); menuButton.focus(); } });
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window) {
  document.body.classList.add('motion-ready');
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
}
const links = [...document.querySelectorAll('.nav-menu a')];
const sections = [...document.querySelectorAll('main > section')];
const topLink = document.querySelector('.back-to-top');
function updateScroll() {
  topLink.classList.toggle('shown', scrollY > 500);
  const marker = scrollY + 160;
  let current = sections[0].id;
  sections.forEach(section => { if (section.offsetTop <= marker) current = section.id; });
  links.forEach(link => { const active = link.hash === `#${current}`; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
}
addEventListener('scroll', updateScroll, { passive: true }); updateScroll();
const particles = document.querySelector('.particles');
for (let i = 0; i < 24; i++) {
  const dot = document.createElement('span'); dot.className = 'particle';
  dot.style.left = `${(i * 37) % 100}%`; dot.style.top = `${(i * 23) % 100}%`; dot.style.animationDelay = `${-(i % 9)}s`;
  particles.append(dot);
}
// Efecto de escritura. La versión sin movimiento conserva el texto completo.
const typing = document.querySelector('#typing-text');
const roles = ['Desarrollador backend', 'Java · Spring Boot · NestJS', 'Estudiante de Ingeniería de Sistemas'];
let role = 0, position = roles[0].length, deleting = true;
function type() {
  if (reducedMotion.matches) { typing.textContent = roles[0]; return; }
  const word = roles[role];
  position += deleting ? -1 : 1;
  typing.textContent = word.slice(0, position);
  let delay = deleting ? 40 : 75;
  if (position === 0) { deleting = false; role = (role + 1) % roles.length; delay = 300; }
  else if (position === word.length && !deleting) { deleting = true; delay = 2200; }
  setTimeout(type, delay);
}
if (!reducedMotion.matches) setTimeout(type, 2200);
