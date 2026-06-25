// @ts-check

/**
 * Navigation Module
 * Handles mobile hamburger menu, sticky header scroll behavior,
 * and smooth anchor-link scrolling with nav-height offset.
 * @module navigation
 */

import { ClassName, AriaState } from './constants.js';

/** @type {HTMLElement | null} */
const navbar = document.getElementById('navbar');

/** @type {HTMLButtonElement | null} */
const mobileToggle = document.querySelector('.mobile-toggle');

/** @type {HTMLElement | null} */
const navMenu = document.querySelector('.nav-menu');

/** @type {NodeListOf<HTMLAnchorElement>} */
const navLinks = document.querySelectorAll('.nav-links a');

/**
 * Opens the mobile overlay menu and locks body scroll.
 */
function openMobileMenu() {
    if (mobileToggle && navMenu) {
        mobileToggle.classList.add(ClassName.ACTIVE);
        mobileToggle.setAttribute(AriaState.EXPANDED, 'true');
        navMenu.classList.add(ClassName.ACTIVE);
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Closes the mobile overlay menu and restores body scroll.
 */
function closeMobileMenu() {
    if (mobileToggle && navMenu) {
        mobileToggle.classList.remove(ClassName.ACTIVE);
        mobileToggle.setAttribute(AriaState.EXPANDED, 'false');
        navMenu.classList.remove(ClassName.ACTIVE);
        document.body.style.overflow = '';
    }
}

/**
 * Returns the current navbar height for scroll offset calculations.
 * @returns {number} The navbar offsetHeight, or 80px as fallback.
 */
function getNavHeight() {
    return navbar ? navbar.offsetHeight : 80;
}

/**
 * Initializes mobile menu toggle, escape-key dismiss,
 * sticky header scroll behavior, and smooth anchor scrolling.
 */
export function initNavigation() {
    // --- Mobile Menu Toggle ---
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            const isActive = mobileToggle.classList.contains(ClassName.ACTIVE);
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    // Close menu when clicking a nav link
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (mobileToggle && mobileToggle.classList.contains(ClassName.ACTIVE)) {
                closeMobileMenu();
            }
        });
    });

    // Escape key closes mobile menu and returns focus
    document.addEventListener('keydown', (e) => {
        if (
            e.key === 'Escape' &&
            mobileToggle &&
            mobileToggle.classList.contains(ClassName.ACTIVE)
        ) {
            closeMobileMenu();
            mobileToggle.focus();
        }
    });

    // --- Sticky Header (rAF Throttled) ---
    let isTicking = false;

    if (navbar) {
        window.addEventListener(
            'scroll',
            () => {
                if (!isTicking) {
                    window.requestAnimationFrame(() => {
                        if (window.scrollY > 50) {
                            navbar.classList.add(ClassName.SCROLLED);
                        } else {
                            navbar.classList.remove(ClassName.SCROLLED);
                        }
                        isTicking = false;
                    });
                    isTicking = true;
                }
            },
            { passive: true }
        );
    }

    // --- Smooth Anchor Scrolling ---
    /** @type {NodeListOf<HTMLAnchorElement>} */
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            /** @type {HTMLElement | null} */
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                const targetPosition =
                    targetElement.getBoundingClientRect().top + window.pageYOffset - getNavHeight();

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}
