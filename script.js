// Shared interactions: mobile menu, project details, certificate flips, contact form.
const sidebar = document.querySelector('#sidebar');
document.querySelector('#menuToggle').addEventListener('click', () => sidebar.classList.add('open'));
document.querySelector('#closeMenu').addEventListener('click', () => sidebar.classList.remove('open'));

// Project cards reveal their case-study details on hover, click, Enter or Space.
document.querySelectorAll('.project-card').forEach(card => {
  const toggle = () => {
    const open = card.classList.toggle('is-open');
    card.setAttribute('aria-expanded', String(open));
  };
  card.addEventListener('click', event => {
    if (event.target.closest('a')) {
      if (event.target.closest('a').getAttribute('href') === '#') event.preventDefault();
      return;
    }
    toggle();
  });
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggle(); }
  });
});

// Certificates flip on click/tap; keyboard works automatically because each card is a button.
document.querySelectorAll('.certificate-card').forEach(card => card.addEventListener('click', () => {
  const flipped = card.classList.toggle('flipped');
  card.setAttribute('aria-pressed', String(flipped));
}));

// Contact form opens the visitor's email app with the message pre-filled (no backend needed).
// Replace this with a form service (Formspree, Netlify Forms…) if you want direct delivery.
const CONTACT_EMAIL = 'hello@example.com';
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const subject = data.get('subject') || `Portfolio message from ${data.get('name')}`;
    const body = `${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    document.querySelector('#formStatus').textContent = 'Opening your email app… thank you!';
  });
}

document.querySelectorAll('.year').forEach(el => { el.textContent = new Date().getFullYear(); });

// Scroll-to-turn-page: pushing past the bottom/top of a page moves to the next/previous page.
const PAGES = ['index.html', 'projects.html', 'skills.html', 'about.html', 'certificates.html', 'contact.html'];
const currentName = location.pathname.split('/').pop() || 'index.html';
const pageIndex = Math.max(0, PAGES.indexOf(currentName));
const prevPage = PAGES[pageIndex - 1];
const nextPage = PAGES[pageIndex + 1];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let navigating = false;
let lastScrollMove = 0;
let pushed = 0;
let pushTimer;

const atBottom = () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
const atTop = () => window.scrollY <= 0;

// Arriving from the next page by scrolling up: start at the bottom of this one.
if (sessionStorage.getItem('arrive') === 'bottom') {
  sessionStorage.removeItem('arrive');
  window.scrollTo(0, document.documentElement.scrollHeight);
}

function goTo(page, arrive) {
  if (navigating || !page) return;
  navigating = true;
  sessionStorage.setItem('arrive', arrive);
  document.body.classList.add('page-leaving');
  setTimeout(() => { location.href = page; }, reduceMotion ? 0 : 280);
}

function nudge(direction, amount) {
  if (navigating) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(() => { pushed = 0; }, 400);
  // Ignore momentum from the scroll that just reached the edge.
  if (Date.now() - lastScrollMove < 250) { pushed = 0; return; }
  if (direction > 0 && atBottom() && nextPage) pushed += amount;
  else if (direction < 0 && atTop() && prevPage) pushed += amount;
  else { pushed = 0; return; }
  if (pushed >= 160) goTo(direction > 0 ? nextPage : prevPage, direction > 0 ? 'top' : 'bottom');
}

window.addEventListener('scroll', () => { lastScrollMove = Date.now(); pushed = 0; }, { passive: true });
window.addEventListener('wheel', event => {
  if (event.target.closest('textarea')) return;
  nudge(Math.sign(event.deltaY), Math.abs(event.deltaY));
}, { passive: true });

let touchY = null;
window.addEventListener('touchstart', event => { touchY = event.touches[0].clientY; }, { passive: true });
window.addEventListener('touchend', event => {
  if (touchY === null) return;
  const delta = touchY - event.changedTouches[0].clientY;
  touchY = null;
  if (Math.abs(delta) < 70 || Date.now() - lastScrollMove < 250) return;
  if (delta > 0 && atBottom()) goTo(nextPage, 'top');
  else if (delta < 0 && atTop()) goTo(prevPage, 'bottom');
}, { passive: true });

window.addEventListener('keydown', event => {
  if (event.target.closest('input, textarea')) return;
  if (['ArrowDown', 'PageDown', 'End'].includes(event.key) && atBottom()) nudge(1, 160);
  if (['ArrowUp', 'PageUp', 'Home'].includes(event.key) && atTop()) nudge(-1, 160);
});
