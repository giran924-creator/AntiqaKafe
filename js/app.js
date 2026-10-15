'use strict';

/* EDIT HERE: real business information; menu dishes/prices remain samples.
   The written location is confirmed; opening hours have not yet been supplied. */
const CAFE = {
  name: 'ANTIQA',
  shortDescription: 'Antiqa baliq taomlari',
  brandSubtitle: 'BALIQ TAOMLARI',
  footerSubtitle: 'Baliq taomlari · 2001-yildan beri',
  address: "Qoraqalpog‘iston Respublikasi, To‘rtko‘l shahri, To‘rtko‘l Xalq Banki yonida",
  postalAddress: {
    addressRegion: 'Qoraqalpog‘iston Respublikasi',
    addressLocality: 'To‘rtko‘l shahri',
    streetAddress: 'To‘rtko‘l Xalq Banki yonida',
    addressCountry: 'UZ',
  },
  phoneDisplay: '+998 97 788 08 68',
  phone: 'tel:+998977880868',
  hours: 'Ish vaqti — keyin kiritiladi',
  telegram: 'https://t.me/antiqa_turtkul',
  instagram: 'https://www.instagram.com/antiqaturtkul/',
  googleMaps: 'https://maps.app.goo.gl/n4H36RkJqtJH1E9J7',
  yandexMaps: 'https://yandex.uz/maps/-/CXBjmW8u',
  latitude: 41.554582,
  longitude: 61.000446,
  website: 'https://antiqakafe.giran924.workers.dev/',
  description: 'ANTIQA — asosan baliq mahsulotlaridan tayyorlanadigan taomlarga ixtisoslashgan kafe. 2001-yildan beri xalq xizmatida.',
  seoDescription: 'ANTIQA — baliq mahsulotlaridan tayyorlanadigan taomlarga ixtisoslashgan kafe. 2001-yildan beri xalq xizmatida. Telefon: +998 97 788 08 68.',
  ogDescription: '2001-yildan beri baliq taomlari va samimiy muhit.',
  since: '2001',
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
  const text = CAFE[element.dataset.cafe] || '';
  element.textContent = text;
  if (element.hasAttribute('data-address-lines')) {
    element.replaceChildren();
    const lines = text.split(', ');
    lines.forEach((line, index) => {
      element.append(document.createTextNode(line + (index < lines.length - 1 ? ',' : '')));
      if (index < lines.length - 1) element.append(document.createElement('br'));
    });
  }
});
document.querySelectorAll('[data-link]').forEach(link => {
  const url = CAFE[link.dataset.link];
  if (!url) return;
  link.href = url;
  if (url.startsWith('https://')) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
});
document.title = `${CAFE.name} — Baliq taomlari`;
document.querySelector('meta[name="description"]').content = CAFE.seoDescription;
document.querySelector('meta[property="og:title"]').content = document.title;
document.querySelector('meta[property="og:description"]').content = CAFE.ogDescription;
document.querySelector('meta[property="og:url"]').content = CAFE.website;
document.querySelector('meta[property="og:image"]').content = new URL('images/atmosphere.svg', CAFE.website).href;
document.querySelector('link[rel="canonical"]').href = CAFE.website;
document.querySelector('#cafe-schema').textContent = JSON.stringify({
  '@context': 'https://schema.org', '@type': 'Restaurant',
  name: CAFE.name, alternateName: CAFE.shortDescription,
  description: CAFE.description, telephone: CAFE.phone.replace(/^tel:/, ''),
  url: CAFE.website, servesCuisine: ['Fish', 'Seafood', 'Uzbek cuisine'],
  foundingDate: CAFE.since,
  address: { '@type': 'PostalAddress', ...CAFE.postalAddress },
  geo: { '@type': 'GeoCoordinates', latitude: CAFE.latitude, longitude: CAFE.longitude },
  sameAs: [CAFE.telegram, CAFE.instagram],
  hasMap: [CAFE.googleMaps, CAFE.yandexMaps],
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
  // Keep a labelled fallback if a menu illustration or replacement photo fails.
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
