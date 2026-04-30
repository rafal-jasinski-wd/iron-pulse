/**
 * IronPulse - Modern Fitness Landing Page
 * Core JavaScript functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // Theme Toggle Functionality
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme in localStorage, default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update DOM
        htmlElement.setAttribute('data-theme', newTheme);
        
        // Save to LocalStorage
        localStorage.setItem('theme', newTheme);
    });

    // ==========================================
    // Mobile Navigation Toggle
    // ==========================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Open/Close menu
    mobileToggle.addEventListener('click', () => {
        const isActive = mobileToggle.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileToggle.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    });

    function openMobileMenu() {
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeMobileMenu() {
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // ==========================================
    // Sticky Navigation on Scroll (Optimized)
    // ==========================================
    const navbar = document.getElementById('navbar');
    let isTicking = false;
    
    window.addEventListener('scroll', () => {
        if (!isTicking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                isTicking = false;
            });
            isTicking = true;
        }
    }, { passive: true });

    // ==========================================
    // Intersection Observer for Scroll Reveals
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    
    // Configuration for the IntersectionObserver
    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.05 // 5% visibility is enough to trigger
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is visible in value dictated by threshold
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Unobserve the element once it has been revealed
                // This prevents the animation from triggering every time you scroll up and down
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Observe each element with the .reveal class
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // ==========================================
    // Trainer Card Expansion (Optimized)
    // ==========================================
    const trainerCards = document.querySelectorAll('.trainer-card');

    trainerCards.forEach(card => {
        card.addEventListener('click', () => {
            const isExpanded = card.classList.contains('expanded');
            const bio = card.querySelector('.trainer-bio');
            
            // Close all other cards
            trainerCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('expanded')) {
                    otherCard.classList.remove('expanded');
                    otherCard.setAttribute('aria-expanded', 'false');
                    const otherBio = otherCard.querySelector('.trainer-bio');
                    otherBio.style.height = otherBio.scrollHeight + 'px';
                    // Force reflow to apply pixel height before animating to 0
                    void otherBio.offsetHeight;
                    otherBio.style.height = '0px';
                }
            });

            // Toggle current card
            if (!isExpanded) {
                card.classList.add('expanded');
                card.setAttribute('aria-expanded', 'true');
                
                // Animate to full height
                bio.style.height = bio.scrollHeight + 'px';
                
                // Reset to auto after transition so it handles resizing
                bio.addEventListener('transitionend', function handler(e) {
                    if (e.propertyName === 'height' && card.classList.contains('expanded')) {
                        bio.style.height = 'auto';
                        bio.removeEventListener('transitionend', handler);
                    }
                });
            } else {
                card.setAttribute('aria-expanded', 'false');
                
                // Lock height to current pixel value before transitioning to 0
                bio.style.height = bio.scrollHeight + 'px';
                // Force reflow
                void bio.offsetHeight;
                
                card.classList.remove('expanded');
                bio.style.height = '0px';
            }
        });
    });

    // ==========================================
    // Smooth Scrolling for Anchor Links
    // ==========================================
    // Fallback/Enhancement over CSS smooth scroll to ensure consistency
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // Registration Form Handling
    // ==========================================
    const registrationForm = document.getElementById('registration-form');
    const thankYouCard = document.getElementById('thank-you-card');
    const resetBtn = document.getElementById('reset-form');

    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // In a real app, you would send form data to a server here
            // const formData = new FormData(registrationForm);
            
            // Show loading state (optional) or just switch cards
            registrationForm.classList.add('hidden');
            thankYouCard.classList.remove('hidden');
            
            // Scroll into view if needed
            thankYouCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            thankYouCard.classList.add('hidden');
            registrationForm.classList.remove('hidden');
            registrationForm.reset();
            
            // Scroll back to form start smoothly
            const registerSection = document.getElementById('register');
            const navHeight = document.querySelector('.navbar').offsetHeight;
            window.scrollTo({
                top: registerSection.offsetTop - navHeight,
                behavior: 'smooth'
            });
        });
    }
});
