// ===================================
// NAVIGATION FUNCTIONALITY
// ===================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===================================
// TYPING EFFECT
// ===================================
const typingText = document.querySelector('.typing-text');
const titles = [
    'Software Engineer',
    'Web Developer',


];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500; // Pause before next title
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
setTimeout(typeEffect, 1000);

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateOnScroll = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .highlight-card, .stat-item');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});



// ===================================
// CONTACT FORM HANDLING
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // EmailJS often fails when the page is opened via file://
    // Run with Live Server / localhost for reliable sending.
    if (window.location.protocol === 'file:') {
        showNotification('Please run this site with Live Server (localhost) to enable email sending.', 'error');
        return;
    }

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = btn.innerHTML;

    // Show loading state
    btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    // Send email using EmailJS
    // Read IDs from the form so you can configure them in index.html.
    const serviceId = contactForm.dataset.emailjsService || 'service_743samz';
    const templateId = contactForm.dataset.emailjsTemplate || 'template_wp0ke0g';
    const publicKey = contactForm.dataset.emailjsPublicKey || 'ebVCE2VdY0Uys1qs9';

    // Send message to YOUR Gmail (notification email)
    emailjs.sendForm(serviceId, templateId, contactForm, publicKey)
        .then(() => {
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        }, (error) => {
            // Show error message
            const status = error?.status ?? 'unknown';
            const text = error?.text ?? '';
            console.error(`EmailJS FAILED: status=${status} text=${text}`, error);

            const details = text
                ? ` (status ${status}: ${text})`
                : ` (status ${status}). Check EmailJS Service ID, Template ID, Public Key, and allowed origins.`;
            showNotification(`Failed to send message. Please try again.${details}`, 'error');
        })
        .finally(() => {
            // Restore button state
            btn.innerHTML = originalBtnText;
            btn.disabled = false;
        });
});

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
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
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add notification animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-content i {
        font-size: 1.25rem;
    }
`;
document.head.appendChild(style);

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// GENERATE PLACEHOLDER IMAGES
// ===================================
function generatePlaceholderImage(elementId, width, height, text, gradient) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Create gradient background
    const grd = ctx.createLinearGradient(0, 0, width, height);
    if (gradient === 'primary') {
        grd.addColorStop(0, '#6366f1');
        grd.addColorStop(1, '#ec4899');
    } else if (gradient === 'secondary') {
        grd.addColorStop(0, '#14b8a6');
        grd.addColorStop(1, '#6366f1');
    } else if (gradient === 'accent') {
        grd.addColorStop(0, '#f59e0b');
        grd.addColorStop(1, '#ec4899');
    } else {
        grd.addColorStop(0, '#8b5cf6');
        grd.addColorStop(1, '#ec4899');
    }

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);

    // Add pattern overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 3 + 1;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    // Add text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);

    const img = document.getElementById(elementId);
    if (img) {
        img.src = canvas.toDataURL();
    }
}

// Generate all placeholder images
window.addEventListener('load', () => {
    // Profile image
    // generatePlaceholderImage('profileImage', 500, 500, 'SE Priyankara', 'primary');

    // Project images
    // Only generate a placeholder if the image is missing OR is explicitly a placeholder file.
    // This prevents overwriting real project screenshots (e.g. img/project2.jpg).
    function ensurePlaceholderIfNeeded(elementId, width, height, text, gradient) {
        const img = document.getElementById(elementId);
        if (!img) return;

        const src = (img.getAttribute('src') || '').trim();
        const isMarkedPlaceholder = img.dataset.placeholder === 'true';
        const isPlaceholderSrc = !src || /placeholder/i.test(src);
        const failedToLoad = img.complete && img.naturalWidth === 0;
        if (isMarkedPlaceholder || isPlaceholderSrc || failedToLoad) {
            generatePlaceholderImage(elementId, width, height, text, gradient);
        }
    }

    ensurePlaceholderIfNeeded('project1Image', 800, 500, 'E-Commerce', 'primary');
    ensurePlaceholderIfNeeded('project2Image', 800, 500, 'Salon Booking', 'secondary');
    ensurePlaceholderIfNeeded('project3Image', 800, 500, 'AI Analytics', 'accent');
    ensurePlaceholderIfNeeded('project4Image', 800, 500, 'Social Dashboard', 'primary');
    ensurePlaceholderIfNeeded('project5Image', 800, 500, 'Healthcare', 'secondary');
    ensurePlaceholderIfNeeded('project6Image', 800, 500, 'Real Estate', 'accent');
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// CURSOR EFFECT (OPTIONAL ENHANCEMENT)
// ===================================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid #6366f1;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease, opacity 0.2s ease;
    opacity: 0;
`;
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
cursorDot.style.cssText = `
    width: 6px;
    height: 6px;
    background: #6366f1;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 10000;
    transition: transform 0.1s ease;
    opacity: 0;
`;
document.body.appendChild(cursorDot);

document.addEventListener('mousemove', (e) => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';

    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    cursorDot.style.left = (e.clientX - 3) + 'px';
    cursorDot.style.top = (e.clientY - 3) + 'px';
});

// Cursor hover effects
document.querySelectorAll('a, button, .project-card, .skill-category').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = '#ec4899';
        cursorDot.style.transform = 'scale(1.5)';
        cursorDot.style.background = '#ec4899';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#6366f1';
        cursorDot.style.transform = 'scale(1)';
        cursorDot.style.background = '#6366f1';
    });
});

// Hide custom cursor on mobile
if (window.innerWidth < 768) {
    cursor.style.display = 'none';
    cursorDot.style.display = 'none';
}

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c👋 Welcome to my portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out the repository!', 'color: #ec4899; font-size: 14px;');
console.log('%cBuilt with ❤️ by SE Priyankara', 'color: #14b8a6; font-size: 12px;');

// ===================================
// THEME TOGGLE FUNCTIONALITY
// ===================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const html = document.documentElement;

// Check for saved user preference, if any, on load of the website
const savedTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

// Apply the theme
function setTheme(theme) {
    if (theme === 'light') {
        html.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon'); // Show moon to switch back to dark

        // Update particles color if they exist (optional, logic not strictly needed if CSS handles it)
    } else {
        html.removeAttribute('data-theme'); // Default is dark
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun'); // Show sun to switch to light
    }

    // Save preference
    localStorage.setItem('theme', theme);
}

// Initialize theme
if (savedTheme) {
    setTheme(savedTheme);
} else {
    setTheme(systemTheme);
}

// Toggle event
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);

        // Add a small rotation animation
        themeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
}
