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

import { bootstrapApp } from './js/index.js';

// --- Global Error Boundary ---
window.addEventListener('error', (event) => {
    console.error('IronPulse Global Script Error:', event.error || event.message);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('IronPulse Unhandled Rejection:', event.reason);
});

document.addEventListener('DOMContentLoaded', () => {
    try {
        bootstrapApp();
    } catch (error) {
        console.error('Failed to initialize application modules:', error);
    }
});
