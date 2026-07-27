// @ts-check

/**
 * Theme Module
 * Handles dark/light theme toggling with localStorage persistence
 * and dynamic ARIA label updates for accessibility.
 * @module theme
 */

import { Theme, AriaState } from './constants.js';

/**
 * Updates the theme toggle button's aria-label to reflect the current action.
 * @param {string} theme - The current active theme ('dark' | 'light').
 * @param {HTMLButtonElement | null} themeToggleBtn - The theme toggle button.
 */
function updateThemeToggleAccessibility(theme, themeToggleBtn) {
    if (themeToggleBtn) {
        const label = theme === Theme.DARK ? 'Switch to light theme' : 'Switch to dark theme';
        themeToggleBtn.setAttribute(AriaState.LABEL, label);
    }
}

/**
 * Initializes the theme module.
 * Reads the resolved theme from the DOM (set by inline <head> script)
 * and binds the toggle click handler.
 */
export function initTheme() {
    const htmlElement = document.documentElement;
    /** @type {HTMLButtonElement | null} */
    const themeToggleBtn = /** @type {HTMLButtonElement | null} */ (
        document.getElementById('theme-toggle')
    );

    const initialTheme = htmlElement.getAttribute('data-theme') || Theme.DARK;
    updateThemeToggleAccessibility(initialTheme, themeToggleBtn);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme') || Theme.DARK;
            const newTheme = currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;

            htmlElement.setAttribute('data-theme', newTheme);
            try {
                localStorage.setItem('theme', newTheme);
            } catch (e) {
                // Ignore storage errors in private browsing
            }
            updateThemeToggleAccessibility(newTheme, themeToggleBtn);
        });
    }
}
