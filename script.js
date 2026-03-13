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
    // Sticky Navigation on Scroll
    // ==========================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

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
    // Trainer Card Expansion
    // ==========================================
    const trainerCards = document.querySelectorAll('.trainer-card');

    trainerCards.forEach(card => {
        card.addEventListener('click', () => {
            const isExpanded = card.classList.contains('expanded');
            
            // Close all other cards
            trainerCards.forEach(otherCard => {
                otherCard.classList.remove('expanded');
                otherCard.setAttribute('aria-expanded', 'false');
            });

            // Toggle current card
            if (!isExpanded) {
                card.classList.add('expanded');
                card.setAttribute('aria-expanded', 'true');
            } else {
                card.setAttribute('aria-expanded', 'false');
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
