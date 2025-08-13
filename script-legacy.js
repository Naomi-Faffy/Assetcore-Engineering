// ===== GLOBAL VARIABLES =====
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// ===== INITIALIZE AOS =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initFormHandling();
    initParallaxEffects();
    initSmoothScrolling();
    initLoadingAnimations();
});

// ===== NAVIGATION FUNCTIONALITY =====
function initNavigation() {
    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Active nav link highlighting
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        handleParallaxEffects();
        throttle(updateActiveNavLink, 100);
    });
}

function handleNavbarScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class for navbar styling
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
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

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(handleParallaxEffects);
        });
    }
}

function handleParallaxEffects() {
    const scrollTop = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrollTop * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    // Hero video parallax effect
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        const yPos = scrollTop * 0.5;
        heroVideo.style.transform = `translateY(${yPos}px)`;
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Smooth scroll for hero action buttons
    const heroButtons = document.querySelectorAll('.hero-actions a');
    heroButtons.forEach(button => {
        button.addEventListener('click', smoothScroll);
    });
}

function smoothScroll(e) {
    const href = this.getAttribute('href');
    
    if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// ===== FORM HANDLING =====
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Add floating label effects
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', handleInputFocus);
            input.addEventListener('blur', handleInputBlur);
            input.addEventListener('input', handleInputChange);
        });
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Show success message
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Reset floating labels
        const labels = form.querySelectorAll('label');
        labels.forEach(label => {
            label.style.transform = '';
            label.style.fontSize = '';
            label.style.color = '';
        });
    }, 2000);
}

function handleInputFocus(e) {
    const label = e.target.nextElementSibling;
    if (label && label.tagName === 'LABEL') {
        animateLabel(label, true);
    }
}

function handleInputBlur(e) {
    const label = e.target.nextElementSibling;
    if (label && label.tagName === 'LABEL' && e.target.value === '') {
        animateLabel(label, false);
    }
}

function handleInputChange(e) {
    const label = e.target.nextElementSibling;
    if (label && label.tagName === 'LABEL') {
        if (e.target.value !== '') {
            animateLabel(label, true);
        } else {
            animateLabel(label, false);
        }
    }
}

function animateLabel(label, isActive) {
    if (isActive) {
        label.style.transform = 'translateY(-1.5rem)';
        label.style.fontSize = '0.8rem';
        label.style.color = 'var(--champagne-gold)';
    } else {
        label.style.transform = 'translateY(0)';
        label.style.fontSize = '1rem';
        label.style.color = 'var(--charcoal-gray)';
    }
}

// ===== LOADING ANIMATIONS =====
function initLoadingAnimations() {
    // Add loading class to elements for staggered animations
    const animatedElements = document.querySelectorAll('.hero-content > *, .section-header, .card, .project-card');
    
    animatedElements.forEach((element, index) => {
        element.classList.add('loading');
        element.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Initialize intersection observer for scroll animations
    initScrollAnimations();
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const elementsToAnimate = document.querySelectorAll('.value-card, .service-card, .team-card, .project-card');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
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

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--muted-emerald)' : 'var(--champagne-gold)'};
        color: var(--platinum-white);
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: var(--shadow-luxury);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Add close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ===== TEAM SCROLL FUNCTIONALITY =====
function initTeamScroll() {
    const teamScroll = document.querySelector('.team-scroll');
    if (teamScroll) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        teamScroll.addEventListener('mousedown', (e) => {
            isDown = true;
            teamScroll.classList.add('active');
            startX = e.pageX - teamScroll.offsetLeft;
            scrollLeft = teamScroll.scrollLeft;
        });
        
        teamScroll.addEventListener('mouseleave', () => {
            isDown = false;
            teamScroll.classList.remove('active');
        });
        
        teamScroll.addEventListener('mouseup', () => {
            isDown = false;
            teamScroll.classList.remove('active');
        });
        
        teamScroll.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - teamScroll.offsetLeft;
            const walk = (x - startX) * 2;
            teamScroll.scrollLeft = scrollLeft - walk;
        });
    }
}

// ===== PROJECT HOVER EFFECTS =====
function initProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== SERVICE CARD ANIMATIONS =====
function initServiceAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            // Add magnetic effect
            card.addEventListener('mousemove', handleMagneticEffect);
        });
        
        card.addEventListener('mouseleave', () => {
            card.removeEventListener('mousemove', handleMagneticEffect);
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });
}

function handleMagneticEffect(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const rotateX = y / 10;
    const rotateY = -x / 10;
    
    card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

// ===== INITIALIZE ADDITIONAL EFFECTS =====
document.addEventListener('DOMContentLoaded', () => {
    initTeamScroll();
    initProjectHoverEffects();
    initServiceAnimations();
});

// ===== LAZY LOADING FOR IMAGES =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== PERFORMANCE OPTIMIZATION =====
function initPerformanceOptimizations() {
    // Preload critical resources
    const criticalImages = [
        'assets/hero-video-poster.jpg',
        'assets/logo-white.svg',
        'assets/logo-gold.svg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
    
    // Initialize lazy loading
    initLazyLoading();
}

// ===== VIDEO HANDLING =====
function initVideoHandling() {
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        // Ensure video plays on mobile
        heroVideo.muted = true;
        heroVideo.playsInline = true;
        
        // Handle video loading errors
        heroVideo.addEventListener('error', () => {
            // Show fallback image
            const fallbackImage = document.createElement('img');
            fallbackImage.src = 'assets/hero-fallback.jpg';
            fallbackImage.className = 'hero-video';
            fallbackImage.alt = 'Assetcore Engineering Projects';
            
            heroVideo.parentNode.replaceChild(fallbackImage, heroVideo);
        });
        
        // Pause video when not in viewport (for performance)
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play();
                } else {
                    heroVideo.pause();
                }
            });
        });
        
        videoObserver.observe(heroVideo);
    }
}

// ===== INITIALIZE ALL OPTIMIZATIONS =====
document.addEventListener('DOMContentLoaded', () => {
    initPerformanceOptimizations();
    initVideoHandling();
});

// ===== SCROLL TO TOP FUNCTIONALITY =====
function initScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    
    // Add styles
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-gold);
        color: var(--onyx-black);
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        box-shadow: var(--shadow-luxury);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'translateY(100px)';
        }
    });
    
    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== INITIALIZE SCROLL TO TOP =====
document.addEventListener('DOMContentLoaded', initScrollToTop);

// ===== CURSOR EFFECTS (Optional luxury enhancement) =====
function initCursorEffects() {
    if (window.innerWidth > 1024) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--champagne-gold);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease;
            opacity: 0;
        `;
        
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        // Scale cursor on hover over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursor.style.opacity = '0.5';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.opacity = '1';
            });
        });
    }
}

// ===== INITIALIZE CURSOR EFFECTS =====
document.addEventListener('DOMContentLoaded', initCursorEffects);