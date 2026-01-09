// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navButtons = document.querySelector('.nav-buttons');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    navButtons.classList.toggle('active');
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .service-card, .about-card, .stat').forEach(el => {
    el.classList.add('animate-element');
    observer.observe(el);
});

// ===== Add animation styles dynamically =====
const style = document.createElement('style');
style.textContent = `
    .animate-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .animate-element.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .feature-card:nth-child(1) { transition-delay: 0s; }
    .feature-card:nth-child(2) { transition-delay: 0.1s; }
    .feature-card:nth-child(3) { transition-delay: 0.2s; }
    .feature-card:nth-child(4) { transition-delay: 0.3s; }
    .feature-card:nth-child(5) { transition-delay: 0.4s; }
    .feature-card:nth-child(6) { transition-delay: 0.5s; }

    .service-card:nth-child(1) { transition-delay: 0s; }
    .service-card:nth-child(2) { transition-delay: 0.15s; }
    .service-card:nth-child(3) { transition-delay: 0.3s; }

    .stat:nth-child(1) { transition-delay: 0s; }
    .stat:nth-child(2) { transition-delay: 0.1s; }
    .stat:nth-child(3) { transition-delay: 0.2s; }

    /* Mobile menu styles */
    @media (max-width: 768px) {
        .nav-links.active,
        .nav-buttons.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(10, 10, 15, 0.98);
            padding: 24px;
            border-bottom: 1px solid var(--color-border);
        }

        .nav-links.active {
            gap: 16px;
        }

        .nav-buttons.active {
            gap: 12px;
            top: calc(100% + 120px);
        }

        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }

        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    }
`;
document.head.appendChild(style);

// ===== Simulated Live Price Updates =====
const priceElement = document.querySelector('.price');
const changeElement = document.querySelector('.change');

if (priceElement && changeElement) {
    let basePrice = 1.0847;

    setInterval(() => {
        // Random price fluctuation
        const change = (Math.random() - 0.5) * 0.0010;
        basePrice += change;

        // Update price display
        priceElement.textContent = basePrice.toFixed(4);

        // Update change indicator
        const percentChange = ((basePrice - 1.0800) / 1.0800 * 100).toFixed(2);
        changeElement.textContent = `${percentChange >= 0 ? '+' : ''}${percentChange}%`;
        changeElement.className = `change ${percentChange >= 0 ? 'positive' : 'negative'}`;
    }, 3000);
}

// ===== Counter Animation for Stats =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        // Format the number
        if (target >= 1000000000) {
            element.textContent = '$' + (current / 1000000000).toFixed(1) + 'B+';
        } else if (target >= 1000) {
            element.textContent = Math.floor(current / 1000) + 'K+';
        } else if (target < 100) {
            element.textContent = current.toFixed(1) + '%';
        }
    }, 16);
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('.stat-value');
            if (statValue) {
                const text = statValue.textContent;
                if (text.includes('B+')) {
                    animateCounter(statValue, 2.4 * 1000000000);
                } else if (text.includes('K+')) {
                    animateCounter(statValue, 50000);
                } else if (text.includes('%')) {
                    animateCounter(statValue, 99.9);
                }
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

console.log('FXEthos website loaded successfully!');
