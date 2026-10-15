'use strict';

/* EDIT HERE: business information, menu and image URLs. Empty contact URLs
   intentionally stay as clearly labelled placeholders; never invent details. */
const CAFE = {
  name: 'CAFÉ NAME',
  address: 'Shahar, ko‘cha, uy raqami — to‘ldiriladi',
  phoneDisplay: '+998 (XX) XXX-XX-XX',
  phone: '', // e.g. tel:+998901234567
  hours: 'Ish vaqti — to‘ldiriladi',
  telegram: '', // https://t.me/your_username
  instagram: '', // https://www.instagram.com/your_username/
  map: '', // https://www.google.com/maps?... (no embed required)
  website: 'https://example.com/', // replace before publishing
  description: 'Yaxshi taom, iliq muhit va samimiy suhbatlar uchun makon.',
};
const MENU = [
  { name: 'Gril tovuq', category: 'main', label: 'ASOSIY TAOM', description: 'Tovuq filesi, mavsumiy sabzavotlar va yengil sous. Namuna.', price: '68 000', image: 'images/menu-1.svg' },
  { name: 'Kremli pasta', category: 'main', label: 'ASOSIY TAOM', description: 'Mayin qaymoqli sous va ko‘katlar bilan pasta. Namuna.', price: '54 000', image: 'images/menu-2.svg' },
  { name: 'Yashil salat', category: 'salad', label: 'SALAT', description: 'Yangi ko‘katlar, pomidor va zaytun moyi. Namuna.', price: '38 000', image: 'images/menu-3.svg' },
  { name: 'Klassik latte', category: 'drink', label: 'ICHIMLIK', description: 'Espresso, iliq sut va mayin sut ko‘pigi. Namuna.', price: '26 000', image: 'images/menu-4.svg' },
  { name: 'Rezavorli chizkeyk', category: 'dessert', label: 'DESERT', description: 'Yumshoq pishloqli desert va rezavorlar. Namuna.', price: '36 000', image: 'images/menu-5.svg' },
  { name: 'Shokoladli tort', category: 'dessert', label: 'DESERT', description: 'To‘yingan shokolad ta’mi va nozik tekstura. Namuna.', price: '34 000', image: 'images/menu-6.svg' },
];

// Use textContent for configurable text; no HTML is evaluated from settings.
document.querySelectorAll('[data-cafe]').forEach(element => {
  element.textContent = CAFE[element.dataset.cafe] || '';
});
document.querySelectorAll('[data-link]').forEach(link => {
  const url = CAFE[link.dataset.link];
  if (url) {
    link.href = url;
    if (url.startsWith('https://')) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
  } else {
    link.href = '#contact';
    link.title = 'Namuna — haqiqiy aloqa havolasi hali kiritilmagan';
    link.dataset.placeholder = 'true';
    link.addEventListener('click', () => {
      document.querySelector('.contact-notice').textContent = 'Bu aloqa havolasi hali kiritilmagan. Kontakt ma’lumotlari hozircha namuna.';
    });
  }
});
if (CAFE.map) {
  const mapLink = document.querySelector('#map-link');
  mapLink.href = CAFE.map;
  mapLink.textContent = 'Google Maps’da ochish ↗';
  mapLink.target = '_blank';
  mapLink.rel = 'noopener noreferrer';
  document.querySelector('.map-label p').textContent = CAFE.address;
}
if (CAFE.phone && CAFE.telegram && CAFE.instagram) document.querySelector('.contact-notice').hidden = true;
document.title = `${CAFE.name} — Ta’m va xotirjamlik`;
document.querySelector('meta[name="description"]').content = `${CAFE.name} — ${CAFE.description}`;
document.querySelector('meta[property="og:title"]').content = document.title;
document.querySelector('meta[property="og:description"]').content = CAFE.description;
document.querySelector('meta[property="og:url"]').content = CAFE.website;
document.querySelector('link[rel="canonical"]').href = CAFE.website;
document.querySelector('#cafe-schema').textContent = JSON.stringify({
  '@context': 'https://schema.org', '@type': 'CafeOrCoffeeShop',
  name: CAFE.name, url: CAFE.website, description: CAFE.description,
  ...(CAFE.phone ? { telephone: CAFE.phone.replace(/^tel:/, '') } : {}),
  ...(CAFE.address.includes('to‘ldiriladi') ? {} : { address: { '@type': 'PostalAddress', streetAddress: CAFE.address } }),
  sameAs: [CAFE.instagram, CAFE.telegram].filter(Boolean),
});
document.querySelector('#year').textContent = new Date().getFullYear();

const grid = document.querySelector('#menu-items');
MENU.forEach(item => {
  const article = document.createElement('article');
  article.className = 'menu-card';
  article.dataset.category = item.category;
  const frame = document.createElement('div');
  frame.className = 'menu-photo';
  const image = document.createElement('img');
  Object.assign(image, { src: item.image, alt: `${item.name} — namunaviy illyustratsiya`, loading: 'lazy', width: 800, height: 600 });
  // Remote demo images can fail offline: keep a quiet, clearly labelled placeholder.
  image.addEventListener('error', () => { image.hidden = true; frame.classList.add('image-unavailable'); });
  const tag = document.createElement('span'); tag.className = 'menu-tag'; tag.textContent = item.label;
  frame.append(image, tag);
  const heading = document.createElement('div'); heading.className = 'menu-item-heading';
  const name = document.createElement('h3'); name.textContent = item.name;
  const price = document.createElement('span'); price.className = 'price'; price.textContent = `${item.price} so‘m`;
  heading.append(name, price);
  const description = document.createElement('p'); description.textContent = item.description;
  article.append(frame, heading, description); grid.append(article);
});
const filterButtons = document.querySelectorAll('[data-filter]');
function filterMenu(category) {
  filterButtons.forEach(button => {
    const selected = button.dataset.filter === category;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  let count = 0;
  grid.querySelectorAll('.menu-card').forEach(card => {
    card.hidden = category !== 'all' && card.dataset.category !== category;
    if (!card.hidden) count++;
  });
  document.querySelector('#menu-status').textContent = `${count} ta taom ko‘rsatilmoqda.`;
}
filterButtons.forEach(button => button.addEventListener('click', () => filterMenu(button.dataset.filter)));
document.querySelector('#full-menu').addEventListener('click', () => {
  filterMenu('all');
  document.querySelector('.menu-toolbar').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  filterButtons[0].focus({ preventScroll: true });
});

const header = document.querySelector('#header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu(returnFocus = false) {
  header.classList.remove('menu-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Menyuni ochish');
  if (returnFocus) toggle.focus();
}
toggle.addEventListener('click', () => {
  const opened = header.classList.toggle('menu-open');
  toggle.setAttribute('aria-expanded', String(opened));
  toggle.setAttribute('aria-label', opened ? 'Menyuni yopish' : 'Menyuni ochish');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && header.classList.contains('menu-open')) closeMenu(true); });
document.addEventListener('click', event => { if (!header.contains(event.target)) closeMenu(); });
matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
const updateHeader = () => header.classList.toggle('scrolled', scrollY > 35);
window.addEventListener('scroll', updateHeader, { passive: true }); updateHeader();
if ('IntersectionObserver' in window) {
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-motion');
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); reveal.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(element => reveal.observe(element));
  }
  const links = [...nav.querySelectorAll('a:not(.nav-contact)')];
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
}
