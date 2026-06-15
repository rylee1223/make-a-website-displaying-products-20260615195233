/* ---------- Helper Functions ---------- */
const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

/* ---------- Mobile Navigation ---------- */
const hamburger = qs('.hamburger');
const drawer = qs('.mobile-drawer');
const overlay = qs('.overlay');

function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
}
function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
}
hamburger.addEventListener('click', openDrawer);
overlay.addEventListener('click', closeDrawer);
qsa('.nav-mobile a').forEach(link => {
    link.addEventListener('click', closeDrawer);
});

/* ---------- Hero Carousel ---------- */
const track = qs('.carousel-track');
const slides = qsa('.carousel-slide');
const prevBtn = qs('.carousel-nav.prev');
const nextBtn = qs('.carousel-nav.next');
const dotsContainer = qs('.carousel-dots');

let currentIndex = 0;
let slideInterval;

// create dots
slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', `Slide ${i + 1}`);
    if (i === 0) btn.classList.add('active');
    btn.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(btn);
});
const dots = qsa('.carousel-dots button');

function updateCarousel() {
    const width = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * width}px)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}
function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    updateCarousel();
}
function nextSlide() { goToSlide(currentIndex + 1); }
function prevSlide() { goToSlide(currentIndex - 1); }

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
track.addEventListener('transitionend', () => { /* placeholder for future infinite loop */ });

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
}
function stopAutoSlide() {
    clearInterval(slideInterval);
}
track.addEventListener('mouseenter', stopAutoSlide);
track.addEventListener('mouseleave', startAutoSlide);
startAutoSlide();

/* ---------- Scroll Reveal ---------- */
const revealElements = qsa('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

/* ---------- Add to Cart Toast ---------- */
let cartCount = 0;
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    qs('.toast-container').appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
qsa('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        cartCount++;
        qs('.cart-count').textContent = cartCount;
        showToast('Item added to cart');
        btn.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.2)' },
            { transform: 'scale(1)' }
        ], { duration: 200, easing: 'ease-out' });
    });
});

/* ---------- Newsletter Form ---------- */
qs('#newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    if (email && /\S+@\S+\.\S+/.test(email)) {
        showToast('Subscribed! Check your inbox.');
        e.target.reset();
    } else {
        alert('Please enter a valid email address.');
    }
});

/* ---------- Page Transition (simple fade) ---------- */
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = 0;
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity .3s ease';
        document.body.style.opacity = 1;
    });
});

/* ---------- Easter Egg Modal ---------- */
let typed = '';
document.addEventListener('keydown', (e) => {
    typed += e.key;
    if (typed.toLowerCase().includes('pikachu')) {
        openEasterEgg();
        typed = '';
    }
    if (typed.length > 15) typed = typed.slice(-15);
});
function openEasterEgg() {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.inset = '0';
    modal.style.background = 'rgba(0,0,0,0.8)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.innerHTML = `
        <div style="background:#151515;padding:2rem;border-radius:8px;text-align:center;max-width:90%;color:#fff;">
            <h2 style="color:${getComputedStyle(document.documentElement).getPropertyValue('--accent')}">Surprise!</h2>
            <p>Use code <strong>Pika15</strong> for 15% off.</p>
            <img src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif" alt="Pikachu" style="max-width:200px;margin:1rem 0;">
            <button id="close-easter" style="background:${getComputedStyle(document.documentElement).getPropertyValue('--accent')};border:none;padding:.5rem 1rem;color:#000;">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
    qs('#close-easter').addEventListener('click', () => modal.remove());
}

/* ---------- Accessibility: Close modal on ESC ---------- */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = qs('.modal');
        if (modal) modal.remove();
        closeDrawer();
    }
});