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
        root: null, // Use the viewport as wrapper
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before the element hits the bottom
        threshold: 0.1 // 10% of element must be visible
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
});
