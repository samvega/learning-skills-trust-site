// Header scroll state
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
onScroll();
window.addEventListener('scroll', onScroll, {passive:true});

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
    '<a class="btn btn-gold mm-cta" href="contact.html">Get in touch <span class="arrow">&rarr;</span></a>';
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
