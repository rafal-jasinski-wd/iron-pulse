// @ts-check

/**
 * Theme Initialization (FOUC Prevention)
 * This script runs synchronously in <head> BEFORE the stylesheet loads,
 * preventing a Flash of Unstyled Content when the user has saved a theme.
 *
 * IMPORTANT: This must remain a blocking (non-module) script in <head>.
 * @module theme-init
 */
(function () {
    try {
        const savedTheme = localStorage.getItem('theme');
        const validTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
        document.documentElement.setAttribute('data-theme', validTheme);
    } catch (_err) {
        // Fallback gracefully if localStorage is disabled or throws in private browsing
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();
