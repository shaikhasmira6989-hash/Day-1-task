// ---------- DATA WITH REAL UNIQUE MAKEUP & SKINCARE IMAGES ----------
const products = [
    // CUSHION PRODUCTS - Real cushion/foundation images
    { 
        id: 1, 
        name: 'Mask Fit Cushion', 
        price: 899, 
        category: 'cushion', 
        img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&crop=center', 
        rating: 4.5 
    },
    { 
        id: 4, 
        name: 'Glow Cushion', 
        price: 999, 
        category: 'cushion', 
        img: 'https://images.unsplash.com/photo-1559599238-308793637427?w=300&h=300&fit=crop&crop=center', 
        rating: 4.7 
    },
    { 
        id: 8, 
        name: 'Cover Cushion', 
        price: 799, 
        category: 'cushion', 
        img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=300&fit=crop&crop=center', 
        rating: 4.1 
    },

    // TINT PRODUCTS - Real lip tint/lipstick images
    { 
        id: 2, 
        name: 'Lip Tint Dewy', 
        price: 549, 
        category: 'tint', 
        img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop&crop=center', 
        rating: 4.2 
    },
    { 
        id: 5, 
        name: 'Velvet Tint', 
        price: 649, 
        category: 'tint', 
        img: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop&crop=center', 
        rating: 4.3 
    },
    { 
        id: 7, 
        name: 'Watery Tint', 
        price: 599, 
        category: 'tint', 
        img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop&crop=center', 
        rating: 4.4 
    },
    { 
        id: 14, 
        name: 'Matte Lip Tint', 
        price: 599, 
        category: 'tint', 
        img: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop&crop=center', 
        rating: 4.0 
    },

    // SKINCARE PRODUCTS - Real skincare/serum/cream images
    { 
        id: 3, 
        name: 'Hydro Glow Spray', 
        price: 1299, 
        category: 'skincare', 
        img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop&crop=center', 
        rating: 4.8 
    },
    { 
        id: 6, 
        name: 'Revitalizing Cream', 
        price: 1599, 
        category: 'skincare', 
        img: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&h=300&fit=crop&crop=center', 
        rating: 4.6 
    },
    { 
        id: 13, 
        name: 'Vitamin C Serum', 
        price: 1199, 
        category: 'skincare', 
        img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop&crop=center', 
        rating: 4.7 
    },

    // LIP CARE PRODUCTS - Real lip care/lip mask images
    { 
        id: 9, 
        name: 'Lip Sleeping Mask', 
        price: 699, 
        category: 'lipcare', 
        img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop&crop=center', 
        rating: 4.9 
    },
    { 
        id: 11, 
        name: 'Tint Gloss', 
        price: 749, 
        category: 'lipcare', 
        img: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop&crop=center', 
        rating: 4.6 
    },

    // FACE MASK PRODUCTS - Real face mask/sheet mask images
    { 
        id: 10, 
        name: 'Sheet Mask Set', 
        price: 499, 
        category: 'facemask', 
        img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop&crop=center', 
        rating: 4.4 
    },
    { 
        id: 12, 
        name: 'Calming Face Mask', 
        price: 899, 
        category: 'facemask', 
        img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&crop=center', 
        rating: 4.3 
    }
];

let cart = [];
let wishlist = [];
let currentCategory = 'all';
let slideIndex = 0;
let isLoggedIn = false;
let pendingAction = null;
let pendingProductId = null;

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
const feedbackPopup = document.getElementById('feedbackPopup');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');

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

// ---------- PAGE NAVIGATION ----------
function navigateTo(page) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.add('hidden'));
    document.getElementById(page + 'Page').classList.remove('hidden');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector(`.nav-link[data-page="${page}"]`)?.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.dataset.page;
        if (page) navigateTo(page);
    });
});

// ---------- LOGIN VALIDATION ----------
function validateLoginForm() {
    let isValid = true;

    // Get all values
    const name = document.getElementById('loginName').value.trim();
    const phone = document.getElementById('loginPhone').value.trim();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const confirmPassword = document.getElementById('loginConfirm').value.trim();
    const address = document.getElementById('loginAddress').value.trim();
    const terms = document.getElementById('termsCheckbox').checked;

    // Name validation
    if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters.';
        document.getElementById('loginName').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('nameError').textContent = '';
        document.getElementById('loginName').classList.remove('error');
        document.getElementById('loginName').classList.add('success');
    }

    // Phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
        document.getElementById('phoneError').textContent = 'Enter a valid 10-digit phone number.';
        document.getElementById('loginPhone').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('phoneError').textContent = '';
        document.getElementById('loginPhone').classList.remove('error');
        document.getElementById('loginPhone').classList.add('success');
    }

    // Email validation
    if (!email.includes('@') || !email.includes('.')) {
        document.getElementById('emailError').textContent = 'Enter a valid email address.';
        document.getElementById('loginEmail').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = '';
        document.getElementById('loginEmail').classList.remove('error');
        document.getElementById('loginEmail').classList.add('success');
    }

    // Password validation (min 8 chars with number)
    if (password.length < 8 || !/\d/.test(password)) {
        document.getElementById('passError').textContent = 'Password must be at least 8 characters with a number.';
        document.getElementById('loginPassword').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('passError').textContent = '';
        document.getElementById('loginPassword').classList.remove('error');
        document.getElementById('loginPassword').classList.add('success');
    }

    // Confirm password validation
    if (password !== confirmPassword) {
        document.getElementById('confirmError').textContent = 'Passwords do not match.';
        document.getElementById('loginConfirm').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('confirmError').textContent = '';
        document.getElementById('loginConfirm').classList.remove('error');
        document.getElementById('loginConfirm').classList.add('success');
    }

    // Address validation
    if (address.length < 10) {
        document.getElementById('addressError').textContent = 'Please enter a complete address (min 10 characters).';
        document.getElementById('loginAddress').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('addressError').textContent = '';
        document.getElementById('loginAddress').classList.remove('error');
        document.getElementById('loginAddress').classList.add('success');
    }

    // Terms validation
    if (!terms) {
        document.getElementById('termsError').textContent = 'You must agree to the Terms & Conditions.';
        isValid = false;
    } else {
        document.getElementById('termsError').textContent = '';
    }

    return isValid;
}

// ---------- LOGIN ----------
function showLogin(action, productId) {
    pendingAction = action;
    pendingProductId = productId;
    loginModal.classList.remove('hidden');
    // Reset form
    loginForm.reset();
    document.querySelectorAll('.success, .error').forEach(el => {
        el.classList.remove('success', 'error');
    });
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
}

document.getElementById('closeLogin').addEventListener('click', () => {
    loginModal.classList.add('hidden');
    pendingAction = null;
    pendingProductId = null;
});

loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.add('hidden');
        pendingAction = null;
        pendingProductId = null;
    }
});

// Real-time validation on input
document.querySelectorAll('#loginForm input, #loginForm textarea').forEach(input => {
    input.addEventListener('input', function() {
        // Remove error/success classes
        this.classList.remove('error', 'success');
        const errorEl = document.getElementById(this.id + 'Error');
        if (errorEl) errorEl.textContent = '';
    });
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateLoginForm()) {
        isLoggedIn = true;
        showToast('✅ Registration successful! Welcome to TIRTIR!');
        loginModal.classList.add('hidden');
        loginForm.reset();

        // Store user data
        const userData = {
            name: document.getElementById('loginName').value.trim(),
            phone: document.getElementById('loginPhone').value.trim(),
            email: document.getElementById('loginEmail').value.trim(),
            address: document.getElementById('loginAddress').value.trim()
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');

        // Execute pending action
        if (pendingAction && pendingProductId) {
            if (pendingAction === 'cart') {
                addToCart(pendingProductId);
            } else if (pendingAction === 'wishlist') {
                addToWishlist(pendingProductId);
            }
            pendingAction = null;
            pendingProductId = null;
        }
    }
});

// ---------- RENDER PRODUCTS ----------
function renderProducts(category = 'all') {
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    if (grid) {
        grid.innerHTML = filtered.map(p => {
            const stars = '★'.repeat(Math.floor(p.rating)) + '☆'.repeat(5 - Math.floor(p.rating));
            return `
                <div class="product-card" data-id="${p.id}">
                    <img src="${p.img}" alt="${p.name}" loading="lazy">
                    <h4>${p.name}</h4>
                    <div class="rating">${stars} ${p.rating}</div>
                    <div class="price">₹${p.price}</div>
                    <div class="actions">
                        <button onclick="handleAddToCart(${p.id})"><i class="fas fa-cart-plus"></i> Cart</button>
                        <button onclick="handleAddToWishlist(${p.id})"><i class="fas fa-heart"></i> Wish</button>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// ---------- HANDLE CART/WISHLIST WITH LOGIN ----------
function handleAddToCart(id) {
    if (!isLoggedIn) {
        showLogin('cart', id);
        return;
    }
    addToCart(id);
}

function handleAddToWishlist(id) {
    if (!isLoggedIn) {
        showLogin('wishlist', id);
        return;
    }
    addToWishlist(id);
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
                <span style="min-width: 24px; text-align: center;">${item.qty || 1}</span>
                <button class="qty-btn" onclick="updateCartQty(${item.id}, ${(item.qty || 1) + 1})"><i class="fas fa-plus"></i></button>
                <button onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
    const total = cart.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
    cartTotalDiv.textContent = `Total: ₹${total.toFixed(2)}`;
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
    if (wishlist.some(item => item.id === id)) {
        showToast(`💔 ${product.name} already in wishlist.`);
        return;
    }
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

// ---------- PAYMENT ----------
function processPayment(method) {
    if (cart.length === 0) { paymentMsg.textContent = '❌ Cart is empty!'; return; }
    const total = cart.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
    paymentMsg.textContent = `✅ ${method} payment of ₹${total.toFixed(2)} successful!`;
    setTimeout(() => {
        cart = [];
        updateCartUI();
        paymentMsg.textContent = '';
        cartPopup.classList.add('hidden');
        upiPinSection.classList.add('hidden');
        showCelebration(total);
        showToast('🎉 Order placed successfully!');
        setTimeout(() => {
            feedbackPopup.classList.remove('hidden');
        }, 1500);
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
    const total = cart.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
    paymentMsg.textContent = `✅ ${method} payment of ₹${total.toFixed(2)} confirmed!`;
    setTimeout(() => {
        cart = [];
        updateCartUI();
        paymentMsg.textContent = '';
        cartPopup.classList.add('hidden');
        upiPinSection.classList.add('hidden');
        upiPin.value = '';
        showCelebration(total);
        showToast('🎉 Order placed successfully!');
        setTimeout(() => {
            feedbackPopup.classList.remove('hidden');
        }, 1500);
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
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--card-bg)',
        color: 'var(--text)',
        padding: '0.8rem 2rem',
        borderRadius: '30px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)',
        zIndex: '9999',
        transition: '0.3s',
        fontWeight: '500'
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

// ---------- CATEGORY TABS ----------
document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        currentCategory = this.dataset.cat;
        renderProducts(currentCategory);
        if (!document.getElementById('homePage').classList.contains('active')) {
            navigateTo('home');
        }
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
        navigateTo('home');
        setTimeout(() => {
            document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
            document.querySelector(`.cat-tab[data-cat="${cat}"]`)?.classList.add('active');
            currentCategory = cat;
            renderProducts(cat);
        }, 300);
    });
});

// ---------- FOOTER CATEGORY LINKS ----------
document.querySelectorAll('.footer-cat-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const cat = this.dataset.cat;
        navigateTo('home');
        setTimeout(() => {
            document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
            document.querySelector(`.cat-tab[data-cat="${cat}"]`)?.classList.add('active');
            currentCategory = cat;
            renderProducts(cat);
        }, 300);
    });
});

// ---------- CART / WISHLIST POPUP CONTROLS ----------
document.getElementById('cartBtn').addEventListener('click', () => {
    if (!isLoggedIn) {
        showLogin('view_cart', null);
        return;
    }
    renderCartPopup();
    cartPopup.classList.remove('hidden');
});

document.getElementById('closeCart').addEventListener('click', () => {
    cartPopup.classList.add('hidden');
    upiPinSection.classList.add('hidden');
});

document.getElementById('wishBtn').addEventListener('click', () => {
    if (!isLoggedIn) {
        showLogin('view_wishlist', null);
        return;
    }
    renderWishPopup();
    wishPopup.classList.remove('hidden');
});

document.getElementById('closeWish').addEventListener('click', () => wishPopup.classList.add('hidden'));
cartPopup.addEventListener('click', (e) => {
    if (e.target === cartPopup) {
        cartPopup.classList.add('hidden');
        upiPinSection.classList.add('hidden');
    }
});
wishPopup.addEventListener('click', (e) => {
    if (e.target === wishPopup) wishPopup.classList.add('hidden');
});

// ---------- CLEAR ----------
document.getElementById('clearCart').addEventListener('click', () => {
    cart = [];
    updateCartUI();
    renderCartPopup();
    showToast('🗑️ Cart cleared.');
});
document.getElementById('clearWish').addEventListener('click', () => {
    wishlist = [];
    updateWishlistUI();
    renderWishPopup();
    showToast('🗑️ Wishlist cleared.');
});

// ---------- HERO SHOP ----------
document.getElementById('heroShopBtn').addEventListener('click', () => {
    navigateTo('home');
    setTimeout(() => {
        document.querySelector('.product-grid')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
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

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') chatSend.click();
});

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
const closeFeedback = document.getElementById('closeFeedback');
const feedbackForm = document.getElementById('feedbackForm');
const starRating = document.getElementById('starRating');
let selectedRating = 0;

closeFeedback.addEventListener('click', () => feedbackPopup.classList.add('hidden'));
feedbackPopup.addEventListener('click', (e) => {
    if (e.target === feedbackPopup) feedbackPopup.classList.add('hidden');
});

// Feedback link in footer
document.getElementById('feedbackLink').addEventListener('click', (e) => {
    e.preventDefault();
    feedbackPopup.classList.remove('hidden');
});

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
    if (selectedRating === 0) {
        document.getElementById('ratingError').textContent = 'Please select a rating.';
        return;
    }
    showToast('🌟 Thank you for your feedback!');
    feedbackPopup.classList.add('hidden');
    feedbackForm.reset();
    selectedRating = 0;
    starRating.querySelectorAll('i').forEach(s => s.classList.remove('active'));
});

// ---------- CONTACT FORM ----------
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('📧 Message sent! We\'ll get back to you soon.');
    e.target.reset();
});

// ---------- INIT ----------
renderProducts('all');
updateCartUI();
updateWishlistUI();
