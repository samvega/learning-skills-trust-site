// Header scroll state
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
onScroll();
window.addEventListener('scroll', onScroll, {passive:true});

// Shared social icons (Instagram, LinkedIn, email, phone)
var SOCIAL_ICONS =
  '<a href="https://www.instagram.com/learningskillstrust" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>' +
  '<a href="https://www.linkedin.com/company/learningskillstrust/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4z"/></svg></a>' +
  '<a href="mailto:hello@learningskillstrust.com" aria-label="Email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg></a>' +
  '<a href="tel:07737145603" aria-label="Phone"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>';

// Consistent footer social row on every page
document.querySelectorAll('.site-footer .foot-bottom').forEach(function(fb){
  var old = fb.querySelector('.socials');
  if(old) old.remove();
  var s = document.createElement('div');
  s.className = 'socials';
  s.innerHTML = SOCIAL_ICONS;
  fb.appendChild(s);
});

// Full-screen mobile menu
const toggle = document.querySelector('.nav-toggle');
if(toggle){
  const navLinks = document.querySelector('.nav-links');
  const menu = document.createElement('div');
  menu.className = 'mobile-menu';
  menu.innerHTML =
    '<div class="mm-top">' +
      '<img class="mm-logo" src="assets/logo/lst-white.png" alt="The Learning Skills Trust">' +
      '<button class="mm-close" aria-label="Close menu">&times;</button>' +
    '</div>' +
    '<nav class="mm-links"></nav>' +
    '<a class="btn btn-gold mm-cta" href="contact.html">Get in touch <span class="arrow">&rarr;</span></a>' +
    '<div class="mm-social">' + SOCIAL_ICONS + '</div>';
  document.body.appendChild(menu);
  const mmLinks = menu.querySelector('.mm-links');
  navLinks.querySelectorAll('a').forEach(a => {
    const clone = document.createElement('a');
    clone.href = a.getAttribute('href');
    clone.textContent = a.textContent.trim();
    if(a.classList.contains('active')) clone.classList.add('active');
    mmLinks.appendChild(clone);
  });
  const open = () => { menu.classList.add('open'); document.body.classList.add('menu-open'); };
  const close = () => { menu.classList.remove('open'); document.body.classList.remove('menu-open'); };
  toggle.addEventListener('click', open);
  menu.querySelector('.mm-close').addEventListener('click', close);
  mmLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  menu.querySelector('.mm-cta').addEventListener('click', close);
  document.addEventListener('keydown', e => { if(e.key === 'Escape') close(); });
}

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Count-up stats
const nums = document.querySelectorAll('[data-count]');
const cio = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count, suffix = el.dataset.suffix || '';
    let start = 0, dur = 1400, t0 = null;
    const step = (ts) => {
      if(!t0) t0 = ts;
      const p = Math.min((ts - t0)/dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
      if(p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    cio.unobserve(el);
  });
}, {threshold:0.5});
nums.forEach(el => cio.observe(el));

// Hero cursor parallax
const collage = document.querySelector('#heroCollage');
if(collage && matchMedia('(pointer:fine)').matches){
  const items = collage.querySelectorAll('[data-depth]');
  const hero = collage.closest('.hero');
  let raf = null, cx = 0, cy = 0;
  const apply = () => {
    items.forEach(el => {
      const d = parseFloat(el.dataset.depth) || 0;
      el.style.setProperty('--px', (cx * d).toFixed(1) + 'px');
      el.style.setProperty('--py', (cy * d).toFixed(1) + 'px');
    });
    raf = null;
  };
  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect();
    cx = (e.clientX - r.left) / r.width - 0.5;
    cy = (e.clientY - r.top) / r.height - 0.5;
    collage.classList.add('hero-parallax');
    if(!raf) raf = requestAnimationFrame(apply);
  });
  hero.addEventListener('pointerleave', () => {
    collage.classList.remove('hero-parallax');
    items.forEach(el => { el.style.setProperty('--px','0px'); el.style.setProperty('--py','0px'); });
  });
}

// Team bio modal
const bioModal = document.querySelector('#bioModal');
if(bioModal){
  const img = document.querySelector('#bioImg'),
        nm = document.querySelector('#bioName'),
        rl = document.querySelector('#bioRole'),
        tx = document.querySelector('#bioText');
  const open = (el) => {
    const bioEl = el.querySelector('.bio-full');
    img.src = el.dataset.photo || ''; img.alt = el.dataset.name || '';
    nm.textContent = el.dataset.name || '';
    rl.textContent = el.dataset.role || '';
    tx.textContent = bioEl ? bioEl.textContent : '';
    bioModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const close = () => { bioModal.classList.remove('open'); document.body.style.overflow = ''; };
  document.querySelectorAll('[data-name]').forEach(el => el.addEventListener('click', () => open(el)));
  bioModal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', close));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') close(); });
}

// Contact form (preview only)
const form = document.querySelector('#contactForm');
if(form){
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const note = document.querySelector('#formNote');
    if(note) note.style.display = 'block';
    form.reset();
  });
}
