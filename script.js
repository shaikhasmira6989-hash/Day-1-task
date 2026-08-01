// ---------- DATA ----------
const products = [
  { id: 1, name: 'Mask Fit Cushion', price: 899, category: 'cushion', img: 'https://via.placeholder.com/300x300/ff1744/fff?text=Cushion', rating: 4.5 },
  { id: 2, name: 'Lip Tint Dewy', price: 549, category: 'tint', img: 'https://via.placeholder.com/300x300/e63946/fff?text=Lip+Tint', rating: 4.2 },
  { id: 3, name: 'Hydro Serum', price: 1299, category: 'skincare', img: 'https://via.placeholder.com/300x300/ff6b6b/fff?text=Serum', rating: 4.8 },
  { id: 4, name: 'Glow Cushion', price: 999, category: 'cushion', img: 'https://via.placeholder.com/300x300/ff1744/fff?text=Glow+Cushion', rating: 4.7 },
  { id: 5, name: 'Velvet Tint', price: 649, category: 'tint', img: 'https://via.placeholder.com/300x300/e63946/fff?text=Velvet+Tint', rating: 4.3 },
  { id: 6, name: 'Revitalizing Cream', price: 1599, category: 'skincare', img: 'https://via.placeholder.com/300x300/ff6b6b/fff?text=Cream', rating: 4.6 },
  { id: 7, name: 'Watery Tint', price: 599, category: 'tint', img: 'https://via.placeholder.com/300x300/e63946/fff?text=Watery+Tint', rating: 4.4 },
  { id: 8, name: 'Cover Cushion', price: 799, category: 'cushion', img: 'https://via.placeholder.com/300x300/ff1744/fff?text=Cover+Cushion', rating: 4.1 },
  { id: 9, name: 'Lip Sleeping Mask', price: 699, category: 'lipcare', img: 'https://via.placeholder.com/300x300/ff6b6b/fff?text=Lip+Mask', rating: 4.9 },
  { id: 10, name: 'Sheet Mask Set', price: 499, category: 'facemask', img: 'https://via.placeholder.com/300x300/ff1744/fff?text=Sheet+Mask', rating: 4.4 },
  { id: 11, name: 'Tint Gloss', price: 749, category: 'lipcare', img: 'https://via.placeholder.com/300x300/e63946/fff?text=Tint+Gloss', rating: 4.6 },
  { id: 12, name: 'Calming Mask', price: 899, category: 'facemask', img: 'https://via.placeholder.com/300x300/ff6b6b/fff?text=Calming+Mask', rating: 4.3 },
];

let cart = [];
let wishlist = [];
let currentCategory = 'all';
let slideIndex = 0;
let appliedOffer = '';

// ---------- DOM REFS ----------
const grid = document.getElementById('productGrid');
const cartCount = document.getElementById('cartCount');
const wishCount = document.getElementById('wishCount');
const cartPopup = document.getElementById('cartPopup');
const wishPopup = document.getElementById('wishPopup');
const cartItemsDiv = document.getElementById('cartItems');
const wishItemsDiv = document.getElementById('wishItems');
const cartTotalDiv = document.getElementById('cartTotal');
const paymentMsg = document.getElementById('paymentMsg');
const upiPinSection = document.getElementById('upiPinSection');
const upiPin = document.getElementById('upiPin');
const pinError = document.getElementById('pinError');
const celebrationPopup = document.getElementById('celebrationPopup');
const celebrationTotal = document.getElementById('celebrationTotal');
const offerAppliedDiv = document.getElementById('offerApplied');

// ---------- TOGGLE PASSWORD ----------
function togglePassword(inputId, element) {
  const input = document.getElementById(inputId);
  const icon = element.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fas fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fas fa-eye';
  }
}

// ---------- SLIDESHOW ----------
function changeSlide(n) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slideIndex = (slideIndex + n + slides.length) % slides.length;
  slides[slideIndex].classList.add('active');
  dots[slideIndex].classList.add('active');
}

function currentSlide(n) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slideIndex = n;
  slides[slideIndex].classList.add('active');
  dots[slideIndex].classList.add('active');
}

// Auto slide
setInterval(() => changeSlide(1), 5000);

// ---------- NAVIGATION ----------
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const page = this.dataset.page;
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    document.getElementById(page + 'Page').classList.add('active');
    // Scroll to top
    document.querySelector('.site-header').scrollIntoView({ behavior: 'smooth' });
  });
});

// ---------- RENDER PRODUCTS ----------
function renderProducts(category = 'all') {
  const filtered = category === 'all' ? products : products.filter(p => p.category === category);
  grid.innerHTML = filtered.map(p => {
    const stars = '★'.repeat(Math.floor(p.rating)) + '☆'.repeat(5 - Math.floor(p.rating));
    return `
      <div class="product-card" data-id="${p.id}">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <h4>${p.name}</h4>
        <div class="rating">${stars} ${p.rating}</div>
        <div class="price">₹${p.price}</div>
        <div class="actions">
          <button onclick="addToCart(${p.id})"><i class="fas fa-cart-plus"></i> Cart</button>
          <button onclick="addToWishlist(${p.id})"><i class="fas fa-heart"></i> Wish</button>
        </div>
      </div>
    `;
  }).join('');
}

// ---------- CART ----------
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(item => item.id === id);
  if (existing) existing.qty = (existing.qty || 1) + 1;
  else cart.push({ ...product, qty: 1 });
  updateCartUI();
  showToast(`🛒 ${product.name} added to cart!`);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
  renderCartPopup();
  showToast('🗑️ Item removed from cart.');
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  cartCount.textContent = totalItems;
  renderCartPopup();
}

function renderCartPopup() {
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    cartTotalDiv.textContent = '';
    offerAppliedDiv.textContent = '';
    return;
  }
  cartItemsDiv.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="item-details">
        <strong>${item.name}</strong>
        <br><span style="color: var(--accent);">₹${(item.price * (item.qty || 1)).toFixed(2)}</span>
      </div>
      <div class="item-actions">
        <button class="qty-btn" onclick="updateCartQty(${item.id}, ${(item.qty || 1) - 1})"><i class="fas fa-minus"></i></button>
        <span style="min-width: 30px; text-align: center; font-weight: bold;">${item.qty || 1}</span>
        <button class="qty-btn" onclick="updateCartQty(${item.id}, ${(item.qty || 1) + 1})"><i class="fas fa-plus"></i></button>
        <button onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');
  let total = cart.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
  // Apply offer discount if any
  if (appliedOffer === 'SUMMER20') total = total * 0.8;
  else if (appliedOffer === 'TINT3') {
    // Buy 2 get 1 free: discount 1/3 of tint items
    const tintItems = cart.filter(item => item.category === 'tint');
    if (tintItems.length >= 3) {
      const freeItems = Math.floor(tintItems.length / 3);
      const discount = tintItems.slice(0, freeItems).reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
      total = total - discount;
    }
  } else if (appliedOffer === 'FIRST15') total = total * 0.85;
  
  cartTotalDiv.textContent = `Total: ₹${total.toFixed(2)}`;
  if (appliedOffer) {
    offerAppliedDiv.textContent = `🎯 Offer Applied: ${appliedOffer}`;
  } else {
    offerAppliedDiv.textContent = '';
  }
}

function updateCartQty(id, newQty) {
  if (newQty <= 0) { removeFromCart(id); return; }
  const item = cart.find(i => i.id === id);
  if (item) item.qty = newQty;
  updateCartUI();
  renderCartPopup();
}

// ---------- WISHLIST ----------
function addToWishlist(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  if (wishlist.some(item => item.id === id)) { showToast(`💔 ${product.name} already in wishlist.`); return; }
  wishlist.push({ ...product });
  updateWishlistUI();
  showToast(`❤️ ${product.name} added to wishlist!`);
}

function removeFromWishlist(id) {
  wishlist = wishlist.filter(item => item.id !== id);
  updateWishlistUI();
  renderWishPopup();
  showToast('🗑️ Item removed from wishlist.');
}

function updateWishlistUI() {
  wishCount.textContent = wishlist.length;
  renderWishPopup();
}

function renderWishPopup() {
  if (wishlist.length === 0) {
    wishItemsDiv.innerHTML = '<p>Your wishlist is empty.</p>';
    return;
  }
  wishItemsDiv.innerHTML = wishlist.map(item => `
    <div class="cart-item">
      <div class="item-details">
        <strong>${item.name}</strong>
        <br><span style="color: var(--accent);">₹${item.price}</span>
      </div>
      <div class="item-actions">
        <button onclick="addToCart(${item.id}); removeFromWishlist(${item.id});"><i class="fas fa-cart-plus"></i></button>
        <button onclick="removeFromWishlist(${item.id})"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

// ---------- OFFERS ----------
function applyOffer(code) {
  appliedOffer = code;
  renderCartPopup();
  showToast(`🎯 Offer ${code} applied!`);
}

// ---------- PAYMENT ----------
function processPayment(method) {
  if (cart.length === 0) { paymentMsg.textContent = '❌ Cart is empty!'; return; }
  let total = cart.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
  if (appliedOffer === 'SUMMER20') total = total * 0.8;
  else if (appliedOffer === 'TINT3') {
    const tintItems = cart.filter(item => item.category === 'tint');
    if (tintItems.length >= 3) {
      const freeItems = Math.floor(tintItems.length / 3);
      const discount = tintItems.slice(0, freeItems).reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
      total = total - discount;
    }
  } else if (appliedOffer === 'FIRST15') total = total * 0.85;
  
  paymentMsg.textContent = `✅ ${method} payment of ₹${total.toFixed(2)} successful!`;
  setTimeout(() => {
    cart = [];
    appliedOffer = '';
    updateCartUI();
    paymentMsg.textContent = '';
    cartPopup.classList.add('hidden');
    upiPinSection.classList.add('hidden');
    showCelebration(total);
    showToast('🎉 Order placed successfully!');
    setTimeout(() => {
      if (!localStorage.getItem('feedbackShown')) {
        feedbackPopup.classList.remove('hidden');
        localStorage.setItem('feedbackShown', 'true');
      }
    }, 2000);
  }, 1500);
}

function showCelebration(total) {
  celebrationTotal.textContent = `Total Amount: ₹${total.toFixed(2)}`;
  celebrationPopup.classList.remove('hidden');
}

function closeCelebration() {
  celebrationPopup.classList.add('hidden');
}

// ---------- UPI PAYMENT ----------
document.querySelectorAll('#upiPay, #gpayPay, #phonepePay, #paytmPay').forEach(btn => {
  btn.addEventListener('click', function() {
    if (cart.length === 0) { paymentMsg.textContent = '❌ Cart is empty!'; return; }
    upiPinSection.classList.remove('hidden');
    paymentMsg.textContent = '';
    pinError.textContent = '';
    upiPinSection.dataset.method = this.textContent.trim();
  });
});

document.getElementById('confirmUpiPay').addEventListener('click', () => {
  const pin = upiPin.value.trim();
  const method = upiPinSection.dataset.method || 'UPI';
  if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
    pinError.textContent = 'Please enter a valid 4-digit UPI PIN.';
    return;
  }
  pinError.textContent = '';
  let total = cart.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
  if (appliedOffer === 'SUMMER20') total = total * 0.8;
  else if (appliedOffer === 'TINT3') {
    const tintItems = cart.filter(item => item.category === 'tint');
    if (tintItems.length >= 3) {
      const freeItems = Math.floor(tintItems.length / 3);
      const discount = tintItems.slice(0, freeItems).reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
      total = total - discount;
    }
  } else if (appliedOffer === 'FIRST15') total = total * 0.85;
  
  paymentMsg.textContent = `✅ ${method} payment of ₹${total.toFixed(2)} confirmed!`;
  setTimeout(() => {
    cart = [];
    appliedOffer = '';
    updateCartUI();
    paymentMsg.textContent = '';
    cartPopup.classList.add('hidden');
    upiPinSection.classList.add('hidden');
    upiPin.value = '';
    showCelebration(total);
    showToast('🎉 Order placed successfully!');
    setTimeout(() => {
      if (!localStorage.getItem('feedbackShown')) {
        feedbackPopup.classList.remove('hidden');
        localStorage.setItem('feedbackShown', 'true');
      }
    }, 2000);
  }, 1500);
});

// ---------- POPUP CONTROLS ----------
function showToast(msg) {
  const old = document.querySelector('.toast-msg');
  if (old) old.remove();
  const div = document.createElement('div');
  div.className = 'toast-msg';
  div.textContent = msg;
  Object.assign(div.style, {
    position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
    background: 'var(--card-bg)', color: 'var(--text)',
    padding: '0.8rem 2rem', borderRadius: '30px',
    border: '1px solid var(--border)',
    boxShadow: 'var(--shadow)', zIndex: '9999',
    transition: '0.3s', fontWeight: '500'
  });
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

// ---------- THEME ----------
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  sunIcon.style.opacity = isLight ? '1' : '0.5';
  moonIcon.style.opacity = isLight ? '0.5' : '1';
});

// ---------- COOKIE ----------
const cookiePopup = document.getElementById('cookiePopup');
document.getElementById('acceptCookies').addEventListener('click', () => {
  cookiePopup.classList.add('hidden');
  localStorage.setItem('cookieConsent', 'accepted');
});
document.getElementById('declineCookies').addEventListener('click', () => {
  cookiePopup.classList.add('hidden');
});
if (localStorage.getItem('cookieConsent')) cookiePopup.classList.add('hidden');

// ---------- LOGIN ----------
const loginModal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const closeLogin = document.getElementById('closeLogin');
const loginForm = document.getElementById('loginForm');

loginBtn.addEventListener('click', () => loginModal.classList.remove('hidden'));
closeLogin.addEventListener('click', () => loginModal.classList.add('hidden'));
loginModal.addEventListener('click', (e) => { if (e.target === loginModal) loginModal.classList.add('hidden'); });

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('loginName').value.trim();
  const email = document.getElementById('loginEmail').value.trim();
  const phone = document.getElementById('loginPhone').value.trim();
  const pass = document.getElementById('loginPassword').value.trim();
  const confirm = document.getElementById('loginConfirm').value.trim();
  let valid = true;

  if (name.length < 2) { document.getElementById('nameError').textContent = 'Name must be at least 2 characters.'; valid = false; } 
  else document.getElementById('nameError').textContent = '';

  if (!email.includes('@') || !email.includes('.')) { document.getElementById('emailError').textContent = 'Enter a valid email.'; valid = false; } 
  else document.getElementById('emailError').textContent = '';

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone.replace(/\D/g, ''))) { document.getElementById('phoneError').textContent = 'Enter a valid 10-digit phone number.'; valid = false; } 
  else document.getElementById('phoneError').textContent = '';

  if (pass.length < 8 || !/\d/.test(pass)) { document.getElementById('passError').textContent = 'Password must be 8+ chars with a number.'; valid = false; } 
  else document.getElementById('passError').textContent = '';

  if (pass !== confirm) { document.getElementById('confirmError').textContent = 'Passwords do not match.'; valid = false; } 
  else document.getElementById('confirmError').textContent = '';

  if (valid) { showToast('✅ Registration successful! Welcome to TIRTIR!'); loginModal.classList.add('hidden'); loginForm.reset(); }
});

// ---------- CATEGORY TABS ----------
document.querySelectorAll('.cat-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    currentCategory = this.dataset.cat;
    renderProducts(currentCategory);
  });
});

// ---------- CLICK TABS ----------
document.querySelectorAll('.click-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.click-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    const target = this.dataset.tab;
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(`${target}Content`).classList.remove('hidden');
  });
});

// ---------- NAV DROPDOWN ----------
document.querySelectorAll('.dropdown-menu a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const cat = this.dataset.cat;
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.cat-tab[data-cat="${cat}"]`)?.classList.add('active');
    currentCategory = cat;
    renderProducts(cat);
    // Switch to home page
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector('.nav-link[data-page="home"]').classList.add('active');
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    document.getElementById('homePage').classList.add('active');
  });
});

// ---------- CART / WISHLIST POPUP CONTROLS ----------
document.getElementById('cartBtn').addEventListener('click', () => { renderCartPopup(); cartPopup.classList.remove('hidden'); });
document.getElementById('closeCart').addEventListener('click', () => { cartPopup.classList.add('hidden'); upiPinSection.classList.add('hidden'); });
document.getElementById('wishBtn').addEventListener('click', () => { renderWishPopup(); wishPopup.classList.remove('hidden'); });
document.getElementById('closeWish').addEventListener('click', () => wishPopup.classList.add('hidden'));
cartPopup.addEventListener('click', (e) => { if (e.target === cartPopup) { cartPopup.classList.add('hidden'); upiPinSection.classList.add('hidden'); } });
wishPopup.addEventListener('click', (e) => { if (e.target === wishPopup) wishPopup.classList.add('hidden'); });

// ---------- CLEAR ----------
document.getElementById('clearCart').addEventListener('click', () => { cart = []; appliedOffer = ''; updateCartUI(); renderCartPopup(); showToast('🗑️ Cart cleared.'); });
document.getElementById('clearWish').addEventListener('click', () => { wishlist = []; updateWishlistUI(); renderWishPopup(); showToast('🗑️ Wishlist cleared.'); });

// ---------- HERO SHOP ----------
document.getElementById('heroShopBtn').addEventListener('click', () => {
  document.querySelector('.product-grid').scrollIntoView({ behavior: 'smooth' });
});

// ---------- CHATBOT ----------
const chatToggle = document.getElementById('chatToggle');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');

chatToggle.addEventListener('click', () => chatBody.classList.toggle('hidden'));

function addChatMessage(msg, type = 'bot') {
  const div = document.createElement('div');
  div.className = type === 'bot' ? 'bot-msg' : 'user-msg';
  div.textContent = msg;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatSend.addEventListener('click', () => {
  const msg = chatInput.value.trim();
  if (!msg) return;
  addChatMessage(msg, 'user');
  chatInput.value = '';
  setTimeout(() => {
    const responses = {
      'best': 'Our best-selling products are the Mask Fit Cushion and Lip Tint Dewy!',
      'return': 'We offer a 30-day return policy. Items must be unused and in original packaging.',
      'free shipping': 'Yes! We offer free shipping on orders above ₹999.',
      'cruelty': 'Yes! All TIRTIR products are 100% cruelty-free and never tested on animals.',
      'default': 'Thanks for your question! Our team will get back to you shortly.'
    };
    const lower = msg.toLowerCase();
    let reply = responses.default;
    if (lower.includes('best') || lower.includes('top')) reply = responses.best;
    else if (lower.includes('return') || lower.includes('refund')) reply = responses.return;
    else if (lower.includes('shipping') || lower.includes('delivery')) reply = responses['free shipping'];
    else if (lower.includes('cruelty') || lower.includes('animal')) reply = responses.cruelty;
    addChatMessage(reply);
  }, 500);
});

chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') chatSend.click(); });

// Quick questions
document.querySelectorAll('.quick-q').forEach(btn => {
  btn.addEventListener('click', function() {
    const q = this.dataset.q;
    addChatMessage(q, 'user');
    setTimeout(() => {
      const responses = {
        'best': 'Our best-selling products are the Mask Fit Cushion and Lip Tint Dewy!',
        'return': 'We offer a 30-day return policy. Items must be unused and in original packaging.',
        'free shipping': 'Yes! We offer free shipping on orders above ₹999.',
        'cruelty': 'Yes! All TIRTIR products are 100% cruelty-free and never tested on animals.'
      };
      let reply = responses[Object.keys(responses).find(key => q.includes(key))] || 'Thanks for your question!';
      addChatMessage(reply);
    }, 500);
  });
});

// ---------- FEEDBACK ----------
const feedbackPopup = document.getElementById('feedbackPopup');
const feedbackLink = document.getElementById('feedbackLink');
const closeFeedback = document.getElementById('closeFeedback');
const feedbackForm = document.getElementById('feedbackForm');
const starRating = document.getElementById('starRating');
let selectedRating = 0;

feedbackLink.addEventListener('click', (e) => { e.preventDefault(); feedbackPopup.classList.remove('hidden'); });
closeFeedback.addEventListener('click', () => feedbackPopup.classList.add('hidden'));
feedbackPopup.addEventListener('click', (e) => { if (e.target === feedbackPopup) feedbackPopup.classList.add('hidden'); });

starRating.querySelectorAll('i').forEach(star => {
  star.addEventListener('click', function() {
    selectedRating = parseInt(this.dataset.rating);
    starRating.querySelectorAll('i').forEach(s => s.classList.toggle('active', parseInt(s.dataset.rating) <= selectedRating));
    document.getElementById('ratingError').textContent = '';
  });
});

feedbackForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('feedbackName').value.trim();
  if (!name) { alert('Please enter your name.'); return; }
  if (selectedRating === 0) { document.getElementById('ratingError').textContent = 'Please select a rating.'; return; }
  showToast('🌟 Thank you for your feedback!');
  feedbackPopup.classList.add('hidden');
  feedbackForm.reset();
  selectedRating = 0;
  starRating.querySelectorAll('i').forEach(s => s.classList.remove('active'));
});

// ---------- CONTACT FORM ----------
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  showToast('📨 Message sent successfully! We\'ll get back to you soon.');
  e.target.reset();
});

// ---------- INIT ----------
renderProducts('all');
updateCartUI();
updateWishlistUI();
