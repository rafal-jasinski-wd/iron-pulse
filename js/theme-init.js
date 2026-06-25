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
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();
