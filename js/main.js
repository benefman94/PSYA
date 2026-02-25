// ===============================================
// PSYA - Main JavaScript
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavbar();
    initQRCode();
    initScrollAnimations();
    initMobileMenu();
    initSmoothScroll();
});

// ===============================================
// Navbar Scroll Effect
// ===============================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===============================================
// QR Code Generation
// ===============================================
function initQRCode() {
    const qrcodeContainer = document.getElementById('qrcode');
    
    if (qrcodeContainer && typeof QRCode !== 'undefined') {
        // URL par défaut - à remplacer par le lien réel de l'application
        const appURL = 'https://psya-app.com/download';
        
        // Générer le QR code
        new QRCode(qrcodeContainer, {
            text: appURL,
            width: 200,
            height: 200,
            colorDark: '#a855f7',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    } else {
        // Fallback si QRCode n'est pas chargé
        qrcodeContainer.innerHTML = `
            <div style="width: 200px; height: 200px; background: linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #06b6d4 100%); border-radius: 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.9rem; text-align: center; padding: 1rem;">
                <div>
                    <i class="fas fa-qrcode" style="font-size: 3rem; margin-bottom: 0.5rem;"></i>
                    <p>QR Code<br>PSYA</p>
                </div>
            </div>
        `;
    }
}

// ===============================================
// Scroll Animations
// ===============================================
function initScrollAnimations() {
    // Créer un observer pour animer les éléments au scroll
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
    
    // Animer les cartes de fonctionnalités
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animer la section de téléchargement
    const downloadElements = document.querySelectorAll('.download-text, .download-qr');
    downloadElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease-out ${index * 0.2}s`;
        observer.observe(element);
    });
}

// ===============================================
// Mobile Menu
// ===============================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Toggle mobile menu
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'white';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }
        });
        
        // Fermer le menu lors du clic sur un lien
        const links = navLinks.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 968) {
                    navLinks.style.display = 'none';
                }
            });
        });
    }
}

// ===============================================
// Smooth Scroll
// ===============================================
function initSmoothScroll() {
    // Smooth scroll pour tous les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorer les liens vides
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===============================================
// Scroll Indicator Animation
// ===============================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// ===============================================
// App Store / Google Play Button Links
// ===============================================
// Ces liens devront être mis à jour avec les vraies URLs des stores
const appleBtn = document.querySelector('.apple-btn');
const googleBtn = document.querySelector('.google-btn');

if (appleBtn) {
    appleBtn.addEventListener('click', (e) => {
        // À remplacer par le vrai lien App Store
        const appStoreURL = 'https://apps.apple.com/app/psya';
        // Décommenter la ligne suivante quand le lien sera disponible
        // window.open(appStoreURL, '_blank');
        
        // Pour l'instant, afficher une alerte
        e.preventDefault();
        showComingSoonMessage('App Store');
    });
}

if (googleBtn) {
    googleBtn.addEventListener('click', (e) => {
        // À remplacer par le vrai lien Google Play
        const googlePlayURL = 'https://play.google.com/store/apps/details?id=com.psya.app';
        // Décommenter la ligne suivante quand le lien sera disponible
        // window.open(googlePlayURL, '_blank');
        
        // Pour l'instant, afficher une alerte
        e.preventDefault();
        showComingSoonMessage('Google Play');
    });
}

// ===============================================
// Coming Soon Message
// ===============================================
function showComingSoonMessage(store) {
    // Créer une notification élégante
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #06b6d4 100%);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 1rem;
        box-shadow: 0 10px 25px rgba(168, 85, 247, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        max-width: 300px;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <i class="fas fa-rocket" style="font-size: 2rem;"></i>
            <div>
                <strong style="display: block; margin-bottom: 0.5rem;">Bientôt disponible !</strong>
                <span style="font-size: 0.9rem;">L'application PSYA sera disponible sur ${store} très prochainement.</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Ajouter l'animation
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
    `;
    document.head.appendChild(style);
    
    // Supprimer après 5 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// ===============================================
// Performance: Lazy Load Images
// ===============================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback pour les navigateurs qui ne supportent pas le lazy loading natif
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/lazysizes@5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===============================================
// Analytics Tracking (À implémenter plus tard)
// ===============================================
function trackEvent(category, action, label) {
    // Placeholder pour tracking analytics
    console.log('Event tracked:', { category, action, label });
    
    // Exemple pour Google Analytics (à implémenter):
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
}

// Tracker les clics sur les boutons de téléchargement
document.querySelectorAll('.btn-primary, .store-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        trackEvent('Download', 'Click', e.target.textContent.trim());
    });
});
