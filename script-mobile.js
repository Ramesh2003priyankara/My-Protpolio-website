// ===================================
// MOBILE UX ENHANCEMENTS
// ===================================

// Detect if device is mobile/touch
const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
};

const isSmallScreen = () => window.innerWidth <= 768;

// Improve form inputs on mobile (prevent iOS zoom on focus)
document.addEventListener('DOMContentLoaded', () => {
    if (isSmallScreen()) {
        const formInputs = document.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            // Ensures font-size is at least 16px to prevent iOS zoom
            input.style.fontSize = '16px';
        });
    }
});

// Improve mobile menu behavior
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    // Prevent body scroll when mobile menu is open
    navToggle.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close menu and restore scroll on nav link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            document.body.style.overflow = 'auto';
        });
    });
}

// Add viewport height fix for mobile browsers
const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

window.addEventListener('resize', setViewportHeight);
setViewportHeight();

// Improve mobile notification positioning
const showNotificationMobile = (message, type = 'success') => {
    if (typeof showNotification === 'function') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const isSmall = window.innerWidth <= 480;
        const topPosition = isSmall ? '60px' : '100px';
        const rightPosition = isSmall ? '10px' : '20px';
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: ${topPosition};
            right: ${rightPosition};
            left: ${isSmall ? '10px' : 'auto'};
            background: ${type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 1rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-weight: 600;
            max-width: calc(100% - 20px);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
};

// Handle orientation change
window.addEventListener('orientationchange', () => {
    setViewportHeight();
    
    // Close mobile menu on orientation change
    if (navMenu && navToggle) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Improve touch scrolling performance
if (isTouchDevice()) {
    const scrollableElements = document.querySelectorAll('.nav-menu, .projects-grid, .education-grid');
    scrollableElements.forEach(element => {
        element.style.webkitOverflowScrolling = 'touch';
    });
}

// Detect if user prefers dark mode
const prefersDarkMode = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// Detect if user prefers reduced motion
const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Optimize animations based on user preference
if (prefersReducedMotion()) {
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-base', '0.05s');
    document.documentElement.style.setProperty('--transition-slow', '0.05s');
}

// Improve form submission feedback on mobile
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        if (isSmallScreen()) {
            // Scroll to form to show feedback
            setTimeout(() => {
                contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        }
    });
}

// Add haptic feedback support (if available) for button clicks
if (navigator.vibrate) {
    document.querySelectorAll('button, .btn, .social-link').forEach(element => {
        element.addEventListener('click', () => {
            navigator.vibrate(10); // 10ms vibration
        });
    });
}

// Improve loading performance on slow networks
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Defer non-critical operations
        document.querySelectorAll('img').forEach(img => {
            if (img.dataset.src && !img.src) {
                img.src = img.dataset.src;
            }
        });
    });
}

console.log('%c📱 Mobile optimizations loaded', 'color: #10b981; font-size: 12px;');
