/* ── SECURITY / CSRF ── */

function generateCSRF() {
  if (!sessionStorage.getItem('csrf_token')) {
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem('csrf_token', token);
  }
  const tokenInput = document.getElementById('csrfToken');
  if (tokenInput) tokenInput.value = sessionStorage.getItem('csrf_token');
}
/* ── CART STATE MANAGEMENT ── */
let cart = JSON.parse(localStorage.getItem('epicom_cart')) || [];
function saveCart() {
  localStorage.setItem('epicom_cart', JSON.stringify(cart));
  updateCartUI();
}
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      type: product.type,
      cat: product.cat,
      img: product.img || null,
      qty: 1
    });
  }
  saveCart();
  showToast(`${product.name} added to enquiry.`);

  const badge = document.getElementById('cartBadge');
  badge.classList.remove('bump');
  void badge.offsetWidth; // trigger reflow
  badge.classList.add('bump');
}
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}
function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
    }
  }
}
function clearCart() {
  cart = [];
  saveCart();
}
/* ── CART UI ── */
const cartPanel = document.getElementById('cartPanel');
const cartOverlay = document.getElementById('cartOverlay');
function toggleCart() {
  const isOpen = cartPanel.classList.contains('open');
  if (isOpen) {
    cartPanel.classList.remove('open');
    cartOverlay.classList.remove('open');
  } else {
    cartPanel.classList.add('open');
    cartOverlay.classList.add('open');
    updateCartUI(); // ensure up to date when opened
  }
}
document.getElementById('cartToggleBtn').addEventListener('click', toggleCart);
document.getElementById('cartCloseBtn').addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);
function updateCartUI() {

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cartBadge').textContent = totalItems;
  document.getElementById('cartSummaryCount').textContent = totalItems;
  const wrap = document.getElementById('cartItemsWrap');
  const emptyMsg = document.getElementById('cartEmpty');

  Array.from(wrap.children).forEach(child => {
    if (child.id !== 'cartEmpty') child.remove();
  });
  if (cart.length === 0) {
    emptyMsg.classList.remove('hide');
    document.getElementById('enquirySubmitBtn').disabled = true;
  } else {
    emptyMsg.classList.add('hide');
    document.getElementById('enquirySubmitBtn').disabled = false;
    cart.forEach(item => {
      const el = document.createElement('div');
      el.className = 'cart-item';
      const imgHTML = item.img 
        ? (item.img.match(/\.(mp4|webm)$/i) ? `<video src="${item.img}" class="cart-item-img" autoplay muted loop playsinline></video>` : `<img src="${item.img}" alt="" class="cart-item-img">`)
        : `<div class="cart-item-img" style="display:flex;align-items:center;justify-content:center;background:var(--bg3);border:1px solid var(--border);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--grey)" stroke-width="1.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></div>`;
      el.innerHTML = `
        ${imgHTML}
        <div class="cart-item-details">
          <span class="cart-item-type">${item.type}</span>
          <h4 class="cart-item-name">${item.name}</h4>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" aria-label="Remove item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      `;
      wrap.appendChild(el);
    });
  }
}
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
      </div>
      <button class="product-add-btn" onclick="addToCart('${p.id}')">
        <span>Add to Enquiry</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>`;
    grid.appendChild(card);
  });

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
  updateCartUI();
  generateCSRF();
  const bar = document.getElementById('loaderBar');
  const loader = document.getElementById('loader');
  const heroImg = document.getElementById('heroImg');
  setTimeout(() => { bar.style.width = '100%'; }, 100);
  setTimeout(() => {
    loader.classList.add('hide');
    if (heroImg) heroImg.classList.add('loaded');

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
/* ── EMAILJS FORM SUBMISSION ── */

(function() {

  emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
})();
document.getElementById('enquiryForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const token = document.getElementById('csrfToken').value;
  if (token !== sessionStorage.getItem('csrf_token')) {
    showToast('Security validation failed. Please refresh the page.');
    return;
  }
  const btn = document.getElementById('enquirySubmitBtn');
  const btnText = document.getElementById('enquiryBtnText');
  if (cart.length === 0) {
    showToast("Your enquiry cart is empty.");
    return;
  }

  const cartDetailsList = cart.map(item => `- ${item.qty}x [${item.type.toUpperCase()}] ${item.name}`).join('\n');


  saveOrderToAdminDB(cart, new FormData(this));

  const templateParams = {
    from_name: document.getElementById('enquiryName').value,
    phone: document.getElementById('enquiryPhone').value,
    reply_to: document.getElementById('enquiryEmail').value || 'Not provided',
    message: document.getElementById('enquiryMsg').value || 'No additional notes.',
    cart_details: cartDetailsList,
    total_items: cart.reduce((sum, item) => sum + item.qty, 0)
  };
  btn.disabled = true;
  btnText.textContent = 'Sending...';

  emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ID, templateParams)
    .then(function() {
      showToast('Enquiry sent successfully! Our team will contact you shortly.');
      clearCart();
      toggleCart();
      document.getElementById('enquiryForm').reset();
      btn.disabled = false;
      btnText.textContent = 'Send Enquiry';
    }, function(error) {
      console.error('EmailJS Error:', error);

      showToast('Error sending email. Order saved to admin system.');
      clearCart();
      toggleCart();
      document.getElementById('enquiryForm').reset();
      btn.disabled = false;
      btnText.textContent = 'Send Enquiry';
    });
});
/* ── ADMIN DB MOCK (LOCAL STORAGE) ── */
function saveOrderToAdminDB(cartData, formData) {

  let orders = JSON.parse(localStorage.getItem('epicom_admin_orders')) || [];
  const newOrder = {
    id: 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
    date: new Date().toISOString(),
    customer: {
      name: formData.get('from_name'),
      phone: formData.get('phone'),
      email: formData.get('reply_to'),
      notes: formData.get('message')
    },
    items: cartData,
    status: 'new'
  };
  orders.unshift(newOrder); // Add to top
  localStorage.setItem('epicom_admin_orders', JSON.stringify(orders));
}
