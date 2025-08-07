// ===== GLOBAL VARIABLES =====
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 120,
        disable: function() {
            return window.innerWidth < 768 && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }
    });

    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initFormHandling();
    initProjectInteractions();
    initSmoothScrolling();
    initLoadingSequence();
});

// ===== NAVIGATION =====
function initNavigation() {
    // Mobile hamburger toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', handleOutsideClick);
    
    // Update active nav link on scroll
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

function handleOutsideClick(e) {
    if (!navbar.contains(e.target)) {
        closeMobileMenu();
    }
}

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 150;
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    window.addEventListener('scroll', handleScroll);
}

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Navbar scroll effects
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Optional: Hide navbar on scroll down, show on scroll up
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Handle all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
}

function handleSmoothScroll(e) {
    const href = this.getAttribute('href');
    
    if (href === '#' || href === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        e.preventDefault();
        const offsetTop = targetElement.offsetTop - 100;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
    }
}

// ===== PROJECT INTERACTIONS =====
function initProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        // Add click handler for project details (future enhancement)
        card.addEventListener('click', () => {
            const projectTitle = card.querySelector('.project-title')?.textContent;
            if (projectTitle) {
                console.log(`Viewing details for: ${projectTitle}`);
                // Future: Open project modal or navigate to project page
            }
        });
        
        // Add keyboard navigation
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
}

// ===== FORM HANDLING =====
function initFormHandling() {
    const consultationForm = document.querySelector('.consultation-form');
    
    if (consultationForm) {
        consultationForm.addEventListener('submit', handleFormSubmit);
        
        // Initialize floating labels
        const formInputs = consultationForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            // Set initial state
            updateLabel(input);
            
            // Add event listeners
            input.addEventListener('focus', () => handleInputFocus(input));
            input.addEventListener('blur', () => handleInputBlur(input));
            input.addEventListener('input', () => updateLabel(input));
            input.addEventListener('change', () => updateLabel(input));
        });
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('.btn-submit');
    const formData = new FormData(form);
    
    // Validate form
    if (!validateForm(form)) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Show loading state
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending Request...';
    submitButton.disabled = true;
    
    try {
        // Simulate API call (replace with actual endpoint)
        await simulateFormSubmission(formData);
        
        // Success
        showNotification('Thank you! Your consultation request has been received. We\'ll contact you within 24 hours.', 'success');
        form.reset();
        
        // Reset floating labels
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => updateLabel(input));
        
    } catch (error) {
        showNotification('There was an error sending your request. Please try again or call us directly.', 'error');
    } finally {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            field.style.borderColor = '';
        }
    });
    
    // Email validation
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            emailField.style.borderColor = '#dc3545';
            isValid = false;
        }
    }
    
    return isValid;
}

function handleInputFocus(input) {
    input.parentElement.classList.add('focused');
}

function handleInputBlur(input) {
    input.parentElement.classList.remove('focused');
    updateLabel(input);
}

function updateLabel(input) {
    const label = input.nextElementSibling;
    if (!label || label.tagName !== 'LABEL') return;
    
    if (input.value.trim() || input.type === 'select-one' && input.selectedIndex > 0) {
        label.style.top = '-0.5rem';
        label.style.left = '1rem';
        label.style.fontSize = '0.8rem';
        label.style.color = 'var(--gold)';
    } else {
        label.style.top = '1.2rem';
        label.style.left = '1.2rem';
        label.style.fontSize = '1rem';
        label.style.color = 'var(--gray-medium)';
    }
}

async function simulateFormSubmission(formData) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Log form data (replace with actual API call)
    console.log('Form submission:', Object.fromEntries(formData));
    
    // Simulate success (90% of the time)
    if (Math.random() > 0.9) {
        throw new Error('Submission failed');
    }
    
    return { success: true };
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        </div>
    `;
    
    // Styles
    const colors = {
        success: { bg: 'var(--emerald)', color: 'white' },
        error: { bg: '#dc3545', color: 'white' },
        info: { bg: 'var(--gold)', color: 'var(--primary-black)' }
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${colors[type].bg};
        color: ${colors[type].color};
        padding: 1rem 1.5rem;
        border-radius: 4px;
        box-shadow: var(--shadow-heavy);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        max-width: 400px;
        font-family: var(--font-body);
        font-size: 0.9rem;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: flex-start;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: inherit;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        opacity: 0.7;
        transition: opacity 0.2s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => removeNotification(notification));
    closeButton.addEventListener('mouseenter', () => closeButton.style.opacity = '1');
    closeButton.addEventListener('mouseleave', () => closeButton.style.opacity = '0.7');
    
    // Auto remove after 6 seconds
    setTimeout(() => removeNotification(notification), 6000);
}

function removeNotification(notification) {
    if (!notification.parentNode) return;
    
    notification.style.transform = 'translateX(400px)';
    notification.style.opacity = '0';
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ===== LOADING SEQUENCE =====
function initLoadingSequence() {
    // Hide loading elements initially
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    // Staggered loading animation for hero elements
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 + (index * 200));
    });
}

// ===== UTILITY FUNCTIONS =====
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    preloadCriticalResources();
}

function preloadCriticalResources() {
    const criticalAssets = [
        'assets/logo-white.svg',
        'assets/logo-gold.svg',
        'assets/hero-video.mp4'
    ];
    
    criticalAssets.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = src.endsWith('.mp4') ? 'video' : 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// ===== VIDEO HANDLING =====
function initVideoHandling() {
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        // Ensure video plays properly
        heroVideo.muted = true;
        heroVideo.playsInline = true;
        
        // Handle loading states
        heroVideo.addEventListener('loadstart', () => {
            console.log('Video loading started');
        });
        
        heroVideo.addEventListener('canplay', () => {
            console.log('Video can play');
        });
        
        heroVideo.addEventListener('error', () => {
            console.error('Video failed to load, showing fallback');
            // Show fallback image
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, var(--primary-black), var(--charcoal));
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--gold);
                font-size: 2rem;
            `;
            fallback.innerHTML = '<i class="fas fa-building"></i>';
            heroVideo.parentNode.replaceChild(fallback, heroVideo);
        });
        
        // Pause video when not in viewport (performance)
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play();
                } else {
                    heroVideo.pause();
                }
            });
        }, { threshold: 0.5 });
        
        videoObserver.observe(heroVideo);
    }
}

// ===== ACCESSIBILITY =====
function initAccessibility() {
    // Keyboard navigation for custom elements
    const interactiveElements = document.querySelectorAll('.project-card, .discipline-card, .service-block');
    
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
    
    // Skip link for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#projects';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -100px;
        left: 0;
        background: var(--gold);
        color: var(--primary-black);
        padding: 0.5rem 1rem;
        text-decoration: none;
        z-index: 10001;
        transition: top 0.2s ease;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-100px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// ===== INITIALIZE ADDITIONAL FEATURES =====
document.addEventListener('DOMContentLoaded', () => {
    initPerformanceOptimizations();
    initVideoHandling();
    initAccessibility();
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Optionally show user-friendly error message
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

// ===== SCROLL TO TOP FUNCTIONALITY =====
function initScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--gold);
        color: var(--primary-black);
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        transform: translateY(100px) scale(0.8);
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        box-shadow: var(--shadow-medium);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'translateY(100px) scale(0.8)';
        }
    });
    
    // Hover effects
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
        scrollToTopBtn.style.boxShadow = 'var(--shadow-heavy)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
        scrollToTopBtn.style.boxShadow = 'var(--shadow-medium)';
    });
    
    // Click handler
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
document.addEventListener('DOMContentLoaded', initScrollToTop);

// ===== CONSOLE WELCOME MESSAGE =====
console.log(`
🏗️ Assetcore Engineering - Digital Excellence
Engineer Excellence. Build Legacy.

Website developed with precision and attention to detail.
For technical inquiries: info@assetcore.co.zw
`);