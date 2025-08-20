// Assetcore Engineering - Premium Website JavaScript
// Enhanced with luxury animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initProjectModals();
    initContactForm();
    initSmoothScrolling();
    initParallaxEffects();
    initTeamScrolling();
    initLoadingAnimations();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Navbar scroll effect - transparent to solid
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 22, 40, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(212, 175, 55, 0.4)';
            navbar.style.backdropFilter = 'blur(25px)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.borderBottom = '1px solid rgba(212, 175, 55, 0.15)';
            navbar.style.backdropFilter = 'blur(15px)';
        }
    });
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Scroll animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special animations for different elements
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                } else if (entry.target.classList.contains('value-card')) {
                    animateValueCard(entry.target);
                } else if (entry.target.classList.contains('glass-card')) {
                    animateGlassCard(entry.target);
                } else if (entry.target.classList.contains('team-card')) {
                    animateTeamCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .project-card,
        .value-card,
        .glass-card,
        .team-card,
        .section-header,
        .vision-section,
        .mission-section,
        .contact-item
    `);
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Project card animations
function animateProjectCard(card) {
    const delay = Array.from(card.parentNode.children).indexOf(card) * 100;
    setTimeout(() => {
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
    }, delay);
}

// Value card animations
function animateValueCard(card) {
    const delay = Array.from(card.parentNode.children).indexOf(card) * 150;
    setTimeout(() => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.opacity = '1';
    }, delay);
}

// Glass card animations
function animateGlassCard(card) {
    const delay = Array.from(card.parentNode.children).indexOf(card) * 200;
    setTimeout(() => {
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
        card.style.backdropFilter = 'blur(20px)';
    }, delay);
}

// Team card animations
function animateTeamCard(card) {
    const delay = Array.from(card.parentNode.children).indexOf(card) * 100;
    setTimeout(() => {
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
    }, delay);
}

// Project modal functionality
function initProjectModals() {
    const modal = document.getElementById('projectModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalType = document.getElementById('modalType');
    const modalDuration = document.getElementById('modalDuration');
    const modalStatus = document.getElementById('modalStatus');
    const closeBtn = document.querySelector('.close');
    
    // Project data
    const projectData = {
        project1: {
            title: 'Metropolitan Tower Complex',
            description: 'A state-of-the-art commercial complex featuring innovative structural design and sustainable engineering solutions. This 40-story tower represents the pinnacle of modern architectural engineering with advanced seismic resistance and energy-efficient systems.',
            type: 'Commercial High-Rise',
            duration: '36 months',
            status: 'Completed',
            image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        project2: {
            title: 'Platinum Residences',
            description: 'Luxury residential development showcasing premium engineering excellence in every detail. Features include advanced foundation systems, smart building integration, and cutting-edge structural innovations for maximum comfort and safety.',
            type: 'Luxury Residential',
            duration: '24 months',
            status: 'Completed',
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        project3: {
            title: 'Industrial Innovation Hub',
            description: 'Advanced industrial facility designed for maximum efficiency and safety. Incorporates specialized structural systems for heavy machinery, advanced ventilation engineering, and sustainable manufacturing processes.',
            type: 'Industrial Complex',
            duration: '30 months',
            status: 'In Progress',
            image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        project4: {
            title: 'Skyline Bridge Project',
            description: 'Iconic bridge design combining aesthetic excellence with structural innovation. Features advanced cable-stay technology, seismic isolation systems, and sustainable materials for long-term durability and minimal environmental impact.',
            type: 'Infrastructure',
            duration: '42 months',
            status: 'Design Phase',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        project5: {
            title: 'Corporate Headquarters',
            description: 'Modern corporate headquarters featuring flexible workspace design and advanced building systems. Incorporates smart building technology, energy-efficient HVAC systems, and innovative structural solutions for open-plan environments.',
            type: 'Commercial Office',
            duration: '28 months',
            status: 'Completed',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        project6: {
            title: 'Green Innovation Center',
            description: 'Sustainable building design showcasing the latest in green engineering technology. Features renewable energy systems, advanced water management, sustainable materials, and innovative structural solutions for minimal environmental impact.',
            type: 'Sustainable Commercial',
            duration: '32 months',
            status: 'Planning',
            image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        }
    };
    
    // Open modal
    document.querySelectorAll('[data-project]').forEach(button => {
        button.addEventListener('click', (e) => {
            const projectId = e.target.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                modalImage.src = project.image;
                modalTitle.textContent = project.title;
                modalDescription.textContent = project.description;
                modalType.textContent = project.type;
                modalDuration.textContent = project.duration;
                modalStatus.textContent = project.status;
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Animate modal appearance
                setTimeout(() => {
                    modal.style.opacity = '1';
                }, 10);
            }
        });
    });
    
    // Close modal
    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitButton = document.querySelector('.submit-button');
    
    if (form) {
        // Animated label functionality
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, select, textarea');
            const label = group.querySelector('label');
            
            if (input && label) {
                // Handle input focus and blur
                input.addEventListener('focus', () => {
                    label.style.transform = 'translateY(-25px)';
                    label.style.fontSize = '0.8rem';
                    label.style.color = 'var(--champagne-gold)';
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        label.style.transform = 'translateY(0)';
                        label.style.fontSize = '1rem';
                        label.style.color = 'rgba(250, 250, 250, 0.6)';
                    }
                });
                
                // Check if input has value on load
                if (input.value) {
                    label.style.transform = 'translateY(-25px)';
                    label.style.fontSize = '0.8rem';
                    label.style.color = 'var(--champagne-gold)';
                }
            }
        });
        
        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Animate submit button
            submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitButton.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
                submitButton.style.background = 'var(--muted-emerald)';
                
                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    submitButton.innerHTML = '<span>Send Message</span><i class="fas fa-arrow-right"></i>';
                    submitButton.style.background = 'var(--champagne-gold)';
                    submitButton.disabled = false;
                    
                    // Reset labels
                    formGroups.forEach(group => {
                        const label = group.querySelector('label');
                        if (label) {
                            label.style.transform = 'translateY(0)';
                            label.style.fontSize = '1rem';
                            label.style.color = 'rgba(250, 250, 250, 0.6)';
                        }
                    });
                }, 2000);
            }, 2000);
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax effects
function initParallaxEffects() {
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < window.innerHeight) {
                heroImage.style.transform = `scale(1.1) translateY(${rate}px)`;
            }
        });
    }
}

// Team section horizontal scrolling
function initTeamScrolling() {
    const teamContainer = document.querySelector('.team-scroll-container');
    
    if (teamContainer) {
        // Touch/mouse wheel horizontal scrolling
        teamContainer.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
                e.preventDefault();
                teamContainer.scrollLeft += e.deltaY;
            }
        });
    }
}

// Loading animations
function initLoadingAnimations() {
    // Animate elements on page load
    const heroContent = document.querySelector('.hero-content');
    const navbar = document.querySelector('.navbar');
    
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translate(-50%, -50%)';
        }, 300);
    }
    
    if (navbar) {
        setTimeout(() => {
            navbar.style.opacity = '1';
        }, 100);
    }
    
    // Handle video loading and fallback
    initVideoBackground();
}

// Video background with fallback
function initVideoBackground() {
    const video = document.querySelector('.hero-video');
    const fallback = document.querySelector('.hero-image-fallback');
    
    if (video && fallback) {
        // Show fallback initially
        fallback.style.display = 'block';
        
        // When video loads successfully, hide fallback
        video.addEventListener('loadeddata', () => {
            fallback.style.display = 'none';
            video.style.opacity = '1';
        });
        
        // If video fails to load, keep fallback
        video.addEventListener('error', () => {
            fallback.style.display = 'block';
            video.style.display = 'none';
        });
        
        // Ensure video plays
        video.addEventListener('canplay', () => {
            video.play().catch(e => {
                console.log('Video autoplay failed:', e);
                // Fallback will remain visible
            });
        });
    }
}