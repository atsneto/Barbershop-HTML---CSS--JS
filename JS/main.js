// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(48, 45, 46, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(48, 45, 46, 0.08)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to elements
document.querySelectorAll('.service-card, .barber-card, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// (Carousel support removed) Previously used product-carousel initialization.

// Image fallback loader: try common extensions if image fails to load
function tryImageFallback(img) {
    const src = img.getAttribute('src');
    if (!src) return;
    const variants = [];
    // only attempt if path contains items folder
    if (src.includes('IMG/items')) {
        const base = src.replace(/\.(png|jpe?g)$/i, '');
        ['png', 'jpeg', 'jpg'].forEach(ext => variants.push(`${base}.${ext}`));
    }

    let tried = 0;
    function attempt() {
        if (tried >= variants.length) return;
        const candidate = variants[tried++];
        if (candidate === src) { attempt(); return; }
        img.src = candidate;
    }

    img.addEventListener('error', () => {
        console.warn('Image error, attempting fallback for', img.src);
        attempt();
    }, { once: false });

    // If image already attempted to load and failed before listener attached,
    // try fallbacks immediately when DOM is ready or if naturalWidth is zero.
    if (img.complete && img.naturalWidth === 0) {
        console.warn('Image already failed to load, attempting immediate fallback for', img.src);
        attempt();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach(img => tryImageFallback(img));
});

// Debug: log carousel image loading status and attach handlers
// (Removed carousel debug logs)

// Simple carousel initialization (swap src from data-images)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.simple-carousel').forEach((c, idx) => {
        const imgEl = c.querySelector('.simple-carousel__img');
        const prev = c.querySelector('.simple-carousel__btn--prev');
        const next = c.querySelector('.simple-carousel__btn--next');
        const images = (c.dataset.images || '').split(',').map(s => s.trim()).filter(Boolean);
        if (!imgEl || images.length === 0) return;

        let i = images.indexOf(imgEl.src) >= 0 ? images.indexOf(imgEl.src) : 0;

        function show() {
            imgEl.src = images[i];
            // ensure fallback logic applies for dynamically set src
            tryImageFallback(imgEl);
        }

        prev && prev.addEventListener('click', () => {
            i = (i - 1 + images.length) % images.length;
            show();
        });

        next && next.addEventListener('click', () => {
            i = (i + 1) % images.length;
            show();
        });

        // allow left/right arrow keys on focused carousel
        c.tabIndex = 0;
        c.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prev && prev.click();
            if (e.key === 'ArrowRight') next && next.click();
        });

        // initial show
        show();
    });
});
