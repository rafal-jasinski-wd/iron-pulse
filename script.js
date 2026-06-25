// @ts-check

/**
 * IronPulse - Modern Fitness Landing Page
 * Main entry point — ES Module orchestrator.
 *
 * Architecture:
 *   js/theme.js       → Dark/light toggle + ARIA labels
 *   js/navigation.js  → Mobile menu, sticky header, smooth scrolling
 *   js/reveals.js     → IntersectionObserver scroll animations
 *   js/accordion.js   → Trainer card expand/collapse
 *   js/form.js        → Registration form + success state
 *
 * @module main
 */

import { initTheme } from './js/theme.js';
import { initNavigation } from './js/navigation.js';
import { initReveals } from './js/reveals.js';
import { initAccordion } from './js/accordion.js';
import { initForm } from './js/form.js';

// --- Global Error Boundary ---
window.addEventListener('error', (event) => {
    console.error('IronPulse Global Script Error:', event.error || event.message);
    // Prevent default browser crashing/handling if appropriate,
    // but log it clearly for development audit safety.
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('IronPulse Unhandled Rejection:', event.reason);
});

document.addEventListener('DOMContentLoaded', () => {
    try {
        initTheme();
        initNavigation();
        initReveals();
        initAccordion();
        initForm();
    } catch (error) {
        console.error('Failed to initialize application modules:', error);
    }
});
