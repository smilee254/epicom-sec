/* ── CONFIG (From config.js) ── */
const ADMIN_HASH = CONFIG.ADMIN_HASH;
const WHITELIST_EMAIL = CONFIG.WHITELIST_EMAIL;
const DB_KEY = 'epicom_admin_orders';
const AUTH_KEY = 'epicom_admin_auth';
/* ── DOM ELEMENTS ── */
const loginGate = document.getElementById('loginGate');
const adminDashboard = document.getElementById('adminDashboard');
const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');
/* ── STATE ── */
let lastDataStr = '';
let ordersCache = [];
let deleteTargetId = null;
/* ── AUTHENTICATION & RATE LIMITING ── */
function checkAuth() {
  if (sessionStorage.getItem(AUTH_KEY) === 'true') {
    showDashboard();
    loadData();
    startPolling();
  } else {
    showLogin();
  }
}
function showLogin() {
  loginGate.classList.remove('hidden');
  adminDashboard.classList.add('hidden');
}
function showDashboard() {
  loginGate.classList.add('hidden');
  adminDashboard.classList.remove('hidden');
}

function getLockoutStatus() {
  const attempts = parseInt(localStorage.getItem('admin_login_attempts') || '0');
  const lockoutTime = parseInt(localStorage.getItem('admin_lockout_time') || '0');
  return { attempts, lockoutTime };
}
async function hashString(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const status = getLockoutStatus();
  const now = Date.now();

  if (status.attempts >= 5 && now < status.lockoutTime) {
    const minsLeft = Math.ceil((status.lockoutTime - now) / 60000);
    loginError.textContent = `Too many attempts. Locked out for ${minsLeft} minutes.`;
    return;
  }

  if (now > status.lockoutTime && status.attempts >= 5) {
    localStorage.setItem('admin_login_attempts', '0');
  }
  const keyInput = document.getElementById('adminKey').value;
  const hashedInput = await hashString(keyInput);
  if (hashedInput === ADMIN_HASH) {

    localStorage.setItem('admin_login_attempts', '0');
    sessionStorage.setItem(AUTH_KEY, 'true');
    loginError.textContent = '';
    document.getElementById('adminKey').value = '';
    showDashboard();
    loadData();
    startPolling();
  } else {

    const newAttempts = (parseInt(localStorage.getItem('admin_login_attempts') || '0')) + 1;
    localStorage.setItem('admin_login_attempts', newAttempts.toString());
    if (newAttempts >= 5) {

      localStorage.setItem('admin_lockout_time', (now + 15 * 60000).toString());
      loginError.textContent = `Too many attempts. Locked out for 15 minutes.`;
    } else {
      loginError.textContent = `Invalid Authorization Key. (${5 - newAttempts} attempts left)`;
    }
  }
});
document.getElementById('logoutBtn').addEventListener('click', () => {
  sessionStorage.removeItem(AUTH_KEY);
  showLogin();
});
/* ── DATA LOADING & RENDERING ── */
function loadData() {
  const rawData = localStorage.getItem(DB_KEY) || '[]';

  if (rawData === lastDataStr) return false;
  lastDataStr = rawData;
  ordersCache = JSON.parse(rawData);
  renderTables();
  return true; // indicates data was fresh
}
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
function formatDate(isoStr) {
  const d = new Date(isoStr);
  return d.toLocaleDateString() + ' <br><span style="font-size:0.7em;color:var(--text-muted)">' + d.toLocaleTimeString() + '</span>';
}
function renderTables() {
  const ordersTbody = document.getElementById('ordersTbody');
  const servicesTbody = document.getElementById('servicesTbody');
  const ordersEmpty = document.getElementById('ordersEmpty');
  const servicesEmpty = document.getElementById('servicesEmpty');
  ordersTbody.innerHTML = '';
  servicesTbody.innerHTML = '';
  let hasOrders = false;
  let hasServices = false;
  ordersCache.forEach(order => {

    const productItems = order.items.filter(i => i.type === 'product');
    const serviceItems = order.items.filter(i => i.type === 'service');
    const customerHtml = `
      <div class="td-client">${escapeHTML(order.customer.name)}</div>
      <div><a href="mailto:${escapeHTML(order.customer.email)}" style="color:var(--text-muted);text-decoration:none;">${escapeHTML(order.customer.email)}</a></div>
    `;
    const contactHtml = `<a href="tel:${escapeHTML(order.customer.phone)}" style="color:var(--white);text-decoration:none;">${escapeHTML(order.customer.phone)}</a>`;
    const notesHtml = `<div class="td-notes">${escapeHTML(order.customer.notes) || '—'}</div>`;

    if (productItems.length > 0) {
      hasOrders = true;
      const itemsHtml = `<ul class="td-items">` + productItems.map(i => `<li>${i.qty}x ${escapeHTML(i.name)}</li>`).join('') + `</ul>`;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="td-date">${formatDate(order.date)}</td>
        <td class="td-id">${order.id}-P</td>
        <td>${customerHtml}</td>
        <td>${contactHtml}</td>
        <td>${itemsHtml}</td>
        <td>${notesHtml}</td>
        <td><button class="btn-delete" onclick="triggerDelete('${order.id}')" title="Delete Record">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button></td>
      `;
      ordersTbody.appendChild(tr);
    }

    if (serviceItems.length > 0) {
      hasServices = true;
      const itemsHtml = `<ul class="td-items">` + serviceItems.map(i => `<li>${escapeHTML(i.name)}</li>`).join('') + `</ul>`;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="td-date">${formatDate(order.date)}</td>
        <td class="td-id">${order.id}-S</td>
        <td>${customerHtml}</td>
        <td>${contactHtml}</td>
        <td>${itemsHtml}</td>
        <td>${notesHtml}</td>
        <td><button class="btn-delete" onclick="triggerDelete('${order.id}')" title="Delete Record">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button></td>
      `;
      servicesTbody.appendChild(tr);
    }
  });
  ordersEmpty.style.display = hasOrders ? 'none' : 'block';
  servicesEmpty.style.display = hasServices ? 'none' : 'block';
  document.getElementById('ordersTable').style.display = hasOrders ? 'table' : 'none';
  document.getElementById('servicesTable').style.display = hasServices ? 'table' : 'none';
}
/* ── REAL-TIME POLLING ── */
let pollInterval;
function startPolling() {
  if (pollInterval) clearInterval(pollInterval);

  pollInterval = setInterval(() => {
    const wasFresh = loadData();
    if (wasFresh) {

      const notifs = document.querySelectorAll('.notification-dot');
      notifs.forEach(n => {
        n.classList.remove('pulse');
        void n.offsetWidth; // trigger reflow
        n.classList.add('pulse');
      });

      setTimeout(() => {
        notifs.forEach(n => n.classList.remove('pulse'));
      }, 5000);
    }
  }, 5000);
}
/* ── TABS LOGIC ── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');

    btn.querySelector('.notification-dot').classList.remove('pulse');
  });
});
/* ── DELETE LOGIC ── */
const deleteModal = document.getElementById('deleteModal');
window.triggerDelete = function(orderId) {
  deleteTargetId = orderId;
  deleteModal.classList.remove('hidden');
};
document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
  deleteModal.classList.add('hidden');
  deleteTargetId = null;
});
document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
  if (deleteTargetId) {
    ordersCache = ordersCache.filter(o => o.id !== deleteTargetId);
    localStorage.setItem(DB_KEY, JSON.stringify(ordersCache));
    lastDataStr = JSON.stringify(ordersCache); // prevent polling from immediately reloading old state
    renderTables();
    deleteModal.classList.add('hidden');
    deleteTargetId = null;
  }
});
/* ── CSV EXPORT ── */
window.exportCSV = function(tab) {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Date,Time,Order ID,Customer Name,Phone,Email,Requested Items,Notes\n";
  ordersCache.forEach(order => {
    const isProductTab = tab === 'orders';
    const relevantItems = order.items.filter(i => i.type === (isProductTab ? 'product' : 'service'));
    if (relevantItems.length > 0) {
      const d = new Date(order.date);
      const dateStr = d.toLocaleDateString();
      const timeStr = d.toLocaleTimeString();
      const idStr = order.id + (isProductTab ? '-P' : '-S');
      const itemsStr = relevantItems.map(i => `${i.qty ? i.qty+'x ' : ''}${i.name}`).join(' | ');

      const row = [
        `"${dateStr}"`,
        `"${timeStr}"`,
        `"${idStr}"`,
        `"${order.customer.name.replace(/"/g, '""')}"`,
        `"${order.customer.phone}"`,
        `"${order.customer.email}"`,
        `"${itemsStr.replace(/"/g, '""')}"`,
        `"${order.customer.notes.replace(/"/g, '""')}"`
      ].join(",");
      csvContent += row + "\r\n";
    }
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `epicom_${tab}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
/* ── INIT ── */
checkAuth();
