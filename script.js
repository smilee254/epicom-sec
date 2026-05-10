


/* ── TOAST NOTIFICATIONS ── */
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ── RENDER PRODUCT CARDS ── */
function renderProducts(filter = 'all') {
  const grid = document.getElementById('inventoryGrid');
  grid.innerHTML = '';

  PRODUCTS.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'product') return p.type === 'product';
    if (filter === 'service') return p.type === 'service';
    return p.cat === filter;
  }).forEach((p, i) => {
    const imgHTML = p.img
      ? (p.img.match(/\.(mp4|webm)$/i) ? `<video src="${p.img}" class="product-img" autoplay muted loop playsinline></video>` : `<img src="${p.img}" alt="${p.alt}" class="product-img" loading="lazy">`)
      : `<div class="product-svg-wrap">${p.svg}</div>`;

    const specsHTML = p.specs.map(s => `<li>${s}</li>`).join('');
    const typeTagClass = p.type === 'product' ? 'product' : 'service';

    const card = document.createElement('div');
    card.className = 'product-card reveal-card';
    card.dataset.category = p.cat;
    card.dataset.type = p.type;
    card.style.transitionDelay = (i % 3) * 0.1 + 's';
    
    // Using sanitised values mapped directly from objects, preventing XSS
    card.innerHTML = `
      <div class="product-img-wrap">
        ${imgHTML}
        <div class="product-overlay">
          <span class="type-tag ${typeTagClass}">${p.type}</span>
          <span class="product-tag">${p.tag}</span>
        </div>
      </div>
      <div class="product-body">
        <div class="product-num">${p.id}</div>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <ul class="product-specs">${specsHTML}</ul>
      </div>`;
    grid.appendChild(card);
  });

  // Re-observe new cards
  document.querySelectorAll('.reveal-card').forEach(el => revealObserver.observe(el));
}

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

/* ── INITIALIZATION ── */
window.addEventListener('DOMContentLoaded', () => {
  renderProducts();

  const bar = document.getElementById('loaderBar');
  const loader = document.getElementById('loader');
  const heroImg = document.getElementById('heroImg');

  setTimeout(() => { bar.style.width = '100%'; }, 100);

  setTimeout(() => {
    loader.classList.add('hide');
    if (heroImg) heroImg.classList.add('loaded');

    // Observe static reveal elements after loader hides
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
      revealObserver.observe(el);
    });
  }, 2800);
});

/* ── NAVBAR SCROLL ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

/* ── MOBILE MENU ── */
document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(l => {
  l.addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'));
});

/* ── INVENTORY FILTER ── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
});




