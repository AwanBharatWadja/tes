// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initSkillsSection();
    initContactForm();
    initAnimations();
    initCounters();
});

// Navigation
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
}

// Scroll Effects
function initScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Trigger skill bar animations
                if (entry.target.classList.contains('skill-item')) {
                    const progressBar = entry.target.querySelector('.progress-bar');
                    if (progressBar) {
                        const progress = progressBar.getAttribute('data-progress');
                        setTimeout(() => {
                            progressBar.style.width = progress + '%';
                        }, 200);
                    }
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .hero-text,
        .hero-visual,
        .about-text,
        .profile-card,
        .skill-item,
        .project-card,
        .contact-info,
        .contact-form
    `);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Skills Section
function initSkillsSection() {
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCategories = document.querySelectorAll('.skill-category');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all tabs and categories
            skillTabs.forEach(t => t.classList.remove('active'));
            skillCategories.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding category
            this.classList.add('active');
            document.getElementById(category).classList.add('active');
            
            // Trigger skill bar animations for the active category
            const activeCategory = document.getElementById(category);
            const progressBars = activeCategory.querySelectorAll('.progress-bar');
            
            progressBars.forEach((bar, index) => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, index * 100);
            });
        });
    });

    // Initialize first tab
    const firstTab = document.querySelector('.skill-tab');
    if (firstTab) {
        firstTab.click();
    }
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Animations
function initAnimations() {
    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero-title .name-highlight');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.code-window');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close" aria-label="Close notification">&times;</button>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                color: var(--text-primary);
                padding: 1rem 1.5rem;
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-lg);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
                max-width: 400px;
                min-width: 300px;
                animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                border-left: 4px solid var(--primary-color);
            }

            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                flex: 1;
            }

            .notification-icon {
                font-size: 1.2rem;
                flex-shrink: 0;
            }

            .notification-message {
                font-size: 0.95rem;
                line-height: 1.4;
                font-weight: 500;
            }

            .notification-success {
                border-left-color: #10b981;
                background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%);
                color: #065f46;
            }

            .notification-error {
                border-left-color: #ef4444;
                background: linear-gradient(135deg, #fef2f2 0%, #fef7f7 100%);
                color: #991b1b;
            }

            .notification-info {
                border-left-color: #3b82f6;
                background: linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%);
                color: #1e40af;
            }

            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: inherit;
                opacity: 0.7;
                transition: var(--transition);
                padding: 0.25rem;
                border-radius: var(--radius-sm);
                flex-shrink: 0;
            }

            .notification-close:hover {
                opacity: 1;
                background: rgba(0,0,0,0.1);
            }

            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
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
                    transform: translateX(100%);
                    opacity: 0;
                }
            }

            @media (max-width: 480px) {
                .notification {
                    right: 1rem;
                    left: 1rem;
                    max-width: none;
                    min-width: auto;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Event listener for close button
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', function() {
        closeNotification(notification);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return '✅';
        case 'error': return '❌';
        case 'info': return 'ℹ️';
        default: return 'ℹ️';
    }
}

function closeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Any scroll-based functionality can be added here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize smooth page load
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Set initial body opacity for smooth load
document.body.style.opacity = '0';