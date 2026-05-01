/* ── PRODUCT & SERVICE DATA ── */
const PRODUCTS = [
  // Products (Hardware)
  {
    id: '01', type: 'product', cat: 'access', tag: 'Access Control',
    img: 'assets/smart-lock.png', alt: 'Smart Lock',
    name: 'Smart Locks & Access Control',
    desc: 'Next-gen biometric and digital locking systems with multi-mode entry.',
    specs: [
      'Fingerprint recognition — up to 100 users',
      'PIN code (4–8 digit programmable)',
      'RFID / proximity card access',
      'Bluetooth mobile app unlock'
    ]
  },
  {
    id: '02', type: 'product', cat: 'surveillance', tag: 'Surveillance',
    img: 'assets/cctv.png', alt: 'CCTV Cameras',
    name: 'CCTV Surveillance Systems',
    desc: 'HD camera networks with intelligent monitoring, night vision & remote viewing.',
    specs: [
      '2MP / 4MP / 8MP (4K) resolution options',
      'IR night vision up to 30m',
      'Live remote viewing via app',
      'Motion detection with instant alerts'
    ]
  },
  {
    id: '03', type: 'product', cat: 'surveillance', tag: 'Alarm Systems',
    img: 'assets/image.png', alt: 'Ajax Alarm Keypad',
    name: 'Alarm & Intrusion Detection',
    desc: 'Intelligent perimeter security with instant alerts for doors, windows & open spaces.',
    specs: [
      'Magnetic door/window contact sensors',
      'PIR passive infrared motion detectors',
      'GSM/GPRS SMS & call alert system',
      '110dB siren with strobe light'
    ]
  },
  {
    id: '04', type: 'product', cat: 'automation', tag: 'Smart Home',
    img: 'assets/image copy.png', alt: 'Motorized Smart Curtains',
    name: 'Smart Curtain Systems',
    desc: 'Motorized, app-controlled curtain systems for privacy, comfort & energy efficiency.',
    specs: [
      'Quiet DC motor on motorized track',
      'Wi-Fi remote control via smartphone app',
      'Voice control (Alexa & Google Home)',
      'Programmable open/close schedules'
    ]
  },
  {
    id: '05', type: 'product', cat: 'power', tag: 'Solar Energy',
    img: 'assets/solar.jpg', alt: 'Monocrystalline Solar Panels',
    name: 'Solar Energy Solutions',
    desc: 'High-efficiency solar power for homes & businesses, with 24/7 battery backup.',
    specs: [
      'Monocrystalline panels — 300W to 550W',
      'Lithium-ion battery backup banks',
      'Pure sine wave inverters (1kVA–10kVA)',
      'Remote monitoring via mobile app'
    ]
  },
  {
    id: '06', type: 'product', cat: 'automation', tag: 'Gate Automation',
    img: 'assets/gate.jpg', alt: 'Centurion D3 Smart Gate Motor',
    name: 'Gate Automation Systems',
    desc: 'Reliable automatic swing and sliding gate systems for homes and businesses.',
    specs: [
      'Automatic swing gate operators',
      'Sliding gate motor systems',
      'Remote control & GSM intercom',
      'Safety obstacle detection sensors'
    ]
  },
  {
    id: '07', type: 'product', cat: 'access', tag: 'IP Telephony',
    img: 'assets/phone.png', alt: 'Yealink IP Business Phone',
    name: 'IP Phone Systems',
    desc: 'Scalable VoIP telephony solutions for businesses of all sizes.',
    specs: [
      'HD voice quality VoIP desk phones',
      'Up to 1000+ extensions scalable',
      'Auto-attendant & IVR system',
      'Call recording & voicemail to email'
    ]
  },
  {
    id: '08', type: 'product', cat: 'power', tag: 'Perimeter',
    img: 'assets/image copy 2.png', alt: 'Nemtek Electric Fencing',
    name: 'Electric Fencing Systems',
    desc: 'High-voltage perimeter protection — the ultimate deterrent for intruders.',
    specs: [
      'Energiser output: 5kV to 10kV',
      'Multi-zone detection & alarm',
      'Lightning surge protection built-in',
      'Remote monitoring & SMS alerts'
    ]
  },

  // Services (Labor & Consultation)
  {
    id: 'S01', type: 'service', cat: 'service', tag: 'Consultation',
    img: 'assets/image copy 3.png', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
    name: 'Security Site Survey',
    desc: 'Professional on-site assessment to identify vulnerabilities and design custom solutions.',
    specs: [
      'Comprehensive property audit',
      'Risk and vulnerability assessment',
      'System design blueprint',
      'Detailed project cost estimation'
    ]
  },
  {
    id: 'S02', type: 'service', cat: 'service', tag: 'Installation',
    img: 'assets/image copy 4.png', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m14.7 6.3-1.4-1.4a2 2 0 0 0-2.8 0L3.2 12.2a2 2 0 0 0 0 2.8l1.4 1.4M22 12l-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/></svg>',
    name: 'Full System Installation',
    desc: 'Expert installation of security hardware by certified EPICOM technicians.',
    specs: [
      'Clean cable routing and concealment',
      'Configuration and calibration',
      'System stress testing',
      'Client handover & training'
    ]
  },
  {
    id: 'S03', type: 'service', cat: 'service', tag: 'Maintenance',
    img: 'assets/image copy 5.png', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 9.36l-7.1 7.1a1 1 0 0 1-1.41-1.41l7.1-7.1a6 6 0 0 1 9.36-7.94z"/></svg>',
    name: 'Preventive Maintenance',
    desc: 'Annual or bi-annual maintenance contracts to keep your systems running flawlessly.',
    specs: [
      'Hardware cleaning & inspection',
      'Firmware and software updates',
      'Battery testing & replacement',
      'Sensor calibration checks'
    ]
  },
  {
    id: 'S04', type: 'service', cat: 'service', tag: 'Upgrade',
    img: 'assets/image copy 6.png', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    name: 'System Upgrade',
    desc: 'Modernize legacy security systems with current generation smart technology.',
    specs: [
      'Analog to IP CCTV conversion',
      'Smart home integration',
      'Storage capacity expansion',
      'Mobile app remote control setup'
    ]
  },
  {
    id: 'S05', type: 'service', cat: 'service', tag: 'Support',
    img: 'assets/image copy 7.png', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    name: '24/7 Remote Support',
    desc: 'Priority remote troubleshooting and technical support package.',
    specs: [
      'Dedicated support hotline',
      'Remote system diagnostics',
      'Configuration assistance',
      'Emergency call-out priority'
    ]
  }
];

/* ── SECURITY / CSRF ── */
// Generate a simple CSRF token for the session to prevent basic cross-site submission
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
  
  // Bump animation on badge
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
  // Update badge
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cartBadge').textContent = totalItems;
  document.getElementById('cartSummaryCount').textContent = totalItems;

  const wrap = document.getElementById('cartItemsWrap');
  const emptyMsg = document.getElementById('cartEmpty');
  
  // Clear current list (keeping empty msg)
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
        ? `<img src="${item.img}" alt="" class="cart-item-img">`
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
      ? `<img src="${p.img}" alt="${p.alt}" class="product-img" loading="lazy">`
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
      </div>
      <button class="product-add-btn" onclick="addToCart('${p.id}')">
        <span>Add to Enquiry</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>`;
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
  updateCartUI();
  generateCSRF();

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

/* ── EMAILJS FORM SUBMISSION ── */
// IMPORTANT: Initialize EmailJS with Public Key
(function() {
  // TODO: Replace with real Public Key from EmailJS
  emailjs.init("PLACEHOLDER_PUBLIC_KEY");
})();

document.getElementById('enquiryForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // CSRF Check
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

  // Format cart items for the email template
  const cartDetailsList = cart.map(item => `- ${item.qty}x [${item.type.toUpperCase()}] ${item.name}`).join('\n');
  
  // Save order to LocalStorage for Admin Dashboard BEFORE sending email
  // This acts as our "Database"
  saveOrderToAdminDB(cart, new FormData(this));

  // Prepare template parameters matching the EmailJS template variables
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

  // TODO: Replace with real Service ID and Template ID
  emailjs.send('PLACEHOLDER_SERVICE_ID', 'PLACEHOLDER_TEMPLATE_ID', templateParams)
    .then(function() {
      showToast('Enquiry sent successfully! Our team will contact you shortly.');
      clearCart();
      toggleCart();
      document.getElementById('enquiryForm').reset();
      btn.disabled = false;
      btnText.textContent = 'Send Enquiry';
    }, function(error) {
      console.error('EmailJS Error:', error);
      // Fallback message if keys aren't set up yet
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
  // Retrieve existing orders
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
