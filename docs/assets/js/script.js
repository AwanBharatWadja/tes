// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi semua fungsi
    initNavbar();
    initAnimations();
    initBookingButtons();
    initLoginForm();
    initSkillBars();
    initLoadingScreen();
});

// Loading Screen
function initLoadingScreen() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    window.addEventListener('load', function() {
        if (loadingOverlay) {
            setTimeout(() => {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                }, 500);
            }, 1000);
        }
    });
}

// Navbar Functionality
function initNavbar() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const menuNavigasi = document.querySelector('.menu-navigasi');
    const navbar = document.getElementById('navbar');

    // Hamburger menu toggle
    if (hamburgerMenu && menuNavigasi) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('aktif');
            menuNavigasi.classList.toggle('aktif');
            
            // Prevent body scroll when menu is open
            if (menuNavigasi.classList.contains('aktif')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Tutup menu saat link diklik (mobile)
        const menuLinks = document.querySelectorAll('.menu-navigasi a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerMenu.classList.remove('aktif');
                menuNavigasi.classList.remove('aktif');
                document.body.style.overflow = '';
            });
        });

        // Tutup menu saat klik di luar menu
        document.addEventListener('click', function(e) {
            if (!hamburgerMenu.contains(e.target) && !menuNavigasi.contains(e.target)) {
                hamburgerMenu.classList.remove('aktif');
                menuNavigasi.classList.remove('aktif');
                document.body.style.overflow = '';
            }
        });
    }

    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (navbar) {
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        lastScrollTop = scrollTop;
    });
}

// Smooth Animations
function initAnimations() {
    // Intersection Observer untuk animasi on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger skill bar animation if it's a skill item
                if (entry.target.classList.contains('skill-item')) {
                    const skillBar = entry.target.querySelector('.skill-bar');
                    if (skillBar) {
                        setTimeout(() => {
                            skillBar.classList.add('animate');
                        }, 200);
                    }
                }
            }
        });
    }, observerOptions);

    // Observasi elemen yang perlu animasi
    const animatedElements = document.querySelectorAll(`
        .kartu-keunggulan,
        .kartu-olahraga,
        .kartu-testimoni,
        .kartu-tempat-olahraga,
        .kartu-fasilitas,
        .item-fasilitas-tambahan,
        .kartu-member,
        .kartu-hobi,
        .kartu-sosial,
        .skill-item,
        .item-stats,
        .kartu-info
    `);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar[data-width]');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 500);
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        bar.style.width = '0';
        skillObserver.observe(bar);
    });
}

// Booking Buttons Functionality
function initBookingButtons() {
    const bookingButtons = document.querySelectorAll('.tombol-booking');

    bookingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const namaOlahraga = this.closest('.kartu-tempat-olahraga')
                                     ?.querySelector('h3')?.textContent || 'Tempat Olahraga';
            const harga = this.closest('.kartu-tempat-olahraga')
                             ?.querySelector('.label-harga')?.textContent || 'Harga';

            // Redirect ke WhatsApp dengan pesan booking
            const pesanBooking = `Halo! Saya ingin booking ${namaOlahraga} dengan ${harga}. 

Mohon informasi:
- Ketersediaan jadwal
- Metode pembayaran
- Fasilitas yang tersedia

Terima kasih! 🏃‍♂️`;
            
            const whatsappURL = `https://wa.me/6289533736447?text=${encodeURIComponent(pesanBooking)}`;
            window.open(whatsappURL, '_blank');
            
            // Show notification
            showNotification('Mengarahkan ke WhatsApp untuk booking...', 'info');
        });
    });

    // Member buttons
    const memberButtons = document.querySelectorAll('.tombol-pilih-member');

    memberButtons.forEach(button => {
        button.addEventListener('click', function() {
            const jenisMember = this.closest('.kartu-member')
                                   ?.querySelector('h3')?.textContent || 'Paket Member';

            const pesanMember = `Halo! Saya tertarik dengan ${jenisMember} di NaufalNyaa SportEase.

Mohon informasi lebih lanjut mengenai:
- Proses pendaftaran
- Metode pembayaran
- Benefit yang didapat
- Cara aktivasi member

Terima kasih! 💪`;
            
            const whatsappURL = `https://wa.me/6289533736447?text=${encodeURIComponent(pesanMember)}`;
            window.open(whatsappURL, '_blank');
            
            // Show notification
            showNotification('Mengarahkan ke WhatsApp untuk informasi membership...', 'info');
        });
    });
}

// Login Form Functionality
function initLoginForm() {
    const loginForm = document.getElementById('form-login');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email')?.value;
            const password = document.getElementById('password')?.value;

            // Validasi sederhana
            if (!email || !password) {
                showNotification('Mohon isi semua field!', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Format email tidak valid!', 'error');
                return;
            }

            if (password.length < 6) {
                showNotification('Password minimal 6 karakter!', 'error');
                return;
            }

            // Show loading
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Memproses...';
            submitButton.disabled = true;

            // Simulasi login (karena ini hanya landing page)
            setTimeout(() => {
                showNotification('Login berhasil! Selamat datang di NaufalNyaa SportEase 🎉', 'success');
                
                // Reset form dan button
                loginForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Social login buttons
    const googleButton = document.querySelector('.tombol-google');
    const facebookButton = document.querySelector('.tombol-facebook');

    if (googleButton) {
        googleButton.addEventListener('click', function() {
            showNotification('Fitur login Google akan segera tersedia! 🚀', 'info');
        });
    }

    if (facebookButton) {
        facebookButton.addEventListener('click', function() {
            showNotification('Fitur login Facebook akan segera tersedia! 📘', 'info');
        });
    }
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notifikasi');
    existingNotifications.forEach(notif => notif.remove());

    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.className = `notifikasi notifikasi-${type}`;
    notification.innerHTML = `
        <div class="notifikasi-content">
            <span class="notifikasi-icon">${getNotificationIcon(type)}</span>
            <span class="notifikasi-message">${message}</span>
        </div>
        <button class="tutup-notifikasi" aria-label="Tutup notifikasi">&times;</button>
    `;

    // Tambahkan CSS untuk notifikasi jika belum ada
    if (!document.querySelector('#notifikasi-styles')) {
        const style = document.createElement('style');
        style.id = 'notifikasi-styles';
        style.textContent = `
            .notifikasi {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                color: #2c3e50;
                padding: 16px 20px;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 15px;
                max-width: 400px;
                min-width: 300px;
                animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                border-left: 4px solid #40e0d0;
                backdrop-filter: blur(10px);
            }

            .notifikasi-content {
                display: flex;
                align-items: center;
                gap: 12px;
                flex: 1;
            }

            .notifikasi-icon {
                font-size: 1.2rem;
                flex-shrink: 0;
            }

            .notifikasi-message {
                font-size: 0.95rem;
                line-height: 1.4;
                font-weight: 500;
            }

            .notifikasi-success {
                border-left-color: #10b981;
                background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%);
                color: #065f46;
            }

            .notifikasi-error {
                border-left-color: #ef4444;
                background: linear-gradient(135deg, #fef2f2 0%, #fef7f7 100%);
                color: #991b1b;
            }

            .notifikasi-info {
                border-left-color: #3b82f6;
                background: linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%);
                color: #1e40af;
            }

            .tutup-notifikasi {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: inherit;
                opacity: 0.7;
                transition: all 0.3s ease;
                padding: 4px;
                border-radius: 4px;
                flex-shrink: 0;
            }

            .tutup-notifikasi:hover {
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
                .notifikasi {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                    min-width: auto;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Tambahkan ke DOM
    document.body.appendChild(notification);

    // Event listener untuk tombol tutup
    const closeButton = notification.querySelector('.tutup-notifikasi');
    closeButton.addEventListener('click', function() {
        closeNotification(notification);
    });

    // Auto close setelah 5 detik
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

// Smooth scroll untuk link internal
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 100; // Adjust for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gambar-hero img');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add scroll to top functionality
function addScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #40e0d0 0%, #20b2aa 100%);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            font-weight: bold;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(64, 224, 208, 0.3);
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(64, 224, 208, 0.4);
        }
        
        @media (max-width: 768px) {
            .scroll-to-top {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
                font-size: 1.3rem;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
addScrollToTop();

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
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

// Initialize lazy loading
initLazyLoading();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        const menuNavigasi = document.querySelector('.menu-navigasi');
        
        if (hamburgerMenu && menuNavigasi && menuNavigasi.classList.contains('aktif')) {
            hamburgerMenu.classList.remove('aktif');
            menuNavigasi.classList.remove('aktif');
            document.body.style.overflow = '';
        }
    }
});

// Initialize body opacity for smooth page load
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';

window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});