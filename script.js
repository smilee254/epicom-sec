
/* ── PRODUCT DATA ── */
const PRODUCTS = [
  {
    id: '01', cat: 'access', tag: 'Access Control',
    img: 'assets/smart-lock.png', alt: 'Smart Lock',
    name: 'Smart Locks & Access Control',
    desc: 'Next-gen biometric and digital locking systems with multi-mode entry.',
    specs: [
      'Fingerprint recognition — up to 100 users',
      'PIN code (4–8 digit programmable)',
      'RFID / proximity card access',
      'Bluetooth mobile app unlock (iOS & Android)',
      'Mechanical key emergency backup',
      'Real-time entry/exit logs with timestamps',
      'Anti-tamper alarm with auto-lockout',
      'Low battery alert system',
      'IP65 weatherproof rated casing',
      'CCTV & alarm system compatible'
    ]
  },
  {
    id: '02', cat: 'surveillance', tag: 'Surveillance',
    img: 'assets/cctv.png', alt: 'CCTV Cameras',
    name: 'CCTV Surveillance Systems',
    desc: 'HD camera networks with intelligent monitoring, night vision & remote viewing.',
    specs: [
      '2MP / 4MP / 8MP (4K) resolution options',
      'IR night vision up to 30m',
      'Live remote viewing via smartphone app',
      'Motion detection with instant push alerts',
      'DVR/NVR recording with loop storage',
      'H.265+ compression for efficient storage',
      'Dome, bullet, PTZ & fisheye options',
      'IP66 weatherproof outdoor rating',
      'Cloud storage and local HDD options',
      'Audio recording capable models available'
    ]
  },
  {
    id: '03', cat: 'surveillance', tag: 'Alarm Systems',
    img: 'assets/alarm.jpg', alt: 'Ajax Alarm Keypad',
    name: 'Alarm & Intrusion Detection',
    desc: 'Intelligent perimeter security with instant alerts for doors, windows & open spaces.',
    specs: [
      'Magnetic door/window contact sensors',
      'PIR passive infrared motion detectors',
      'Glass break acoustic sensors',
      'GSM/GPRS SMS & call alert system',
      '110dB siren with strobe light',
      '24/7 central monitoring station option',
      'Panic button (wired & wireless)',
      '8–12 hour battery backup',
      'Pet-immune motion sensors available',
      'Keypad arming/disarming with codes'
    ]
  },
  {
    id: '04', cat: 'automation', tag: 'Smart Home',
    img: 'assets/curtains.jpg', alt: 'Motorized Smart Curtains',
    name: 'Smart Curtain Systems',
    desc: 'Motorized, app-controlled curtain systems for privacy, comfort & energy efficiency.',
    specs: [
      'Quiet DC motor on motorized track',
      'Wi-Fi remote control via smartphone app',
      'Voice control (Alexa & Google Home)',
      'Programmable open/close schedules',
      'Sunrise/sunset auto-sync mode',
      'Manual override pull-cord backup',
      'Compatible with most curtain fabrics',
      'Silent operation (< 45dB)',
      'Works with single & double tracks',
      'Overload protection built-in'
    ]
  },
  {
    id: '05', cat: 'power', tag: 'Solar Energy',
    img: 'assets/solar.jpg', alt: 'Monocrystalline Solar Panels',
    name: 'Solar Energy Solutions',
    desc: 'High-efficiency solar power for homes & businesses, with 24/7 battery backup.',
    specs: [
      'Monocrystalline panels — 300W to 550W',
      'System sizes: 1kW to 50kW+',
      'Lithium-ion battery backup banks',
      'MPPT solar charge controllers',
      'Pure sine wave inverters (1kVA–10kVA)',
      'Grid-tie and off-grid configurations',
      'Remote monitoring via mobile app',
      '25-year panel performance warranty',
      'Full installation & commissioning included',
      'ROI within 3–5 years typical'
    ]
  },
  {
    id: '06', cat: 'automation', tag: 'Gate Automation',
    img: 'assets/gate.jpg', alt: 'Centurion D3 Smart Gate Motor',
    name: 'Gate Automation Systems',
    desc: 'Reliable automatic swing and sliding gate systems for homes and businesses.',
    specs: [
      'Automatic swing gate operators',
      'Sliding gate motor systems',
      'Remote control & GSM intercom',
      'Safety obstacle detection sensors',
      'Solar-powered motor options',
      'RFID & keypad access integration',
      'Battery backup for power outages',
      'Manual release for emergencies',
      'Heavy-duty motors (up to 500kg)',
      'Access control integration ready'
    ]
  },
  {
    id: '07', cat: 'access', tag: 'IP Telephony',
    img: 'assets/phone.png', alt: 'Yealink IP Business Phone',
    name: 'IP Phone Systems',
    desc: 'Scalable VoIP telephony solutions for businesses of all sizes.',
    specs: [
      'HD voice quality VoIP desk phones',
      'Up to 1000+ extensions scalable',
      'Auto-attendant & IVR system',
      'Call recording & voicemail to email',
      'Conference calling (up to 30 parties)',
      'Mobile softphone app included',
      'PoE powered (no power adapter needed)',
      'SIP protocol compatible',
      'Integration with existing PBX systems',
      'Remote work & branch office support'
    ]
  },
  {
    id: '08', cat: 'power', tag: 'Perimeter',
    img: 'assets/fence.jpg', alt: 'Nemtek Electric Fencing',
    name: 'Electric Fencing Systems',
    desc: 'High-voltage perimeter protection — the ultimate deterrent for intruders.',
    specs: [
      'Energiser output: 5kV to 10kV',
      'Multi-zone detection & alarm',
      'Lightning surge protection built-in',
      'Remote monitoring & SMS alerts',
      'Visible warning signs included',
      'Integration with alarm systems',
      'Battery backup for 24/7 operation',
      'Suitable for residential & industrial',
      'Compliant with Kenya safety standards',
      'Annual maintenance packages available'
    ]
  }
];

/* ── RENDER PRODUCT CARDS ── */
function renderProducts(filter = 'all') {
  const grid = document.getElementById('inventoryGrid');
  grid.innerHTML = '';

  PRODUCTS.filter(p => filter === 'all' || p.cat === filter).forEach((p, i) => {
    const imgHTML = p.img
      ? `<img src="${p.img}" alt="${p.alt}" class="product-img" loading="lazy">`
      : `<div class="product-svg-wrap">${p.svg}</div>`;

    const specsHTML = p.specs.map(s => `<li>${s}</li>`).join('');

    const card = document.createElement('div');
    card.className = 'product-card reveal-card';
    card.dataset.category = p.cat;
    card.style.transitionDelay = (i % 3) * 0.1 + 's';
    card.innerHTML = `
      <div class="product-img-wrap">
        ${imgHTML}
        <div class="product-overlay"><span class="product-tag">${p.tag}</span></div>
      </div>
      <div class="product-body">
        <div class="product-num">${p.id}</div>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <ul class="product-specs">${specsHTML}</ul>
        <div class="product-footer">
          <a href="#contact" class="product-cta">Get a Quote →</a>
        </div>
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

/* ── LOADER ── */
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
