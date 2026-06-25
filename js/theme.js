// @ts-check

/**
 * Theme Module
 * Handles dark/light theme toggling with localStorage persistence
 * and dynamic ARIA label updates for accessibility.
 * @module theme
 */

import { Theme, AriaState } from './constants.js';

/** @type {HTMLElement} */
const htmlElement = document.documentElement;

/** @type {HTMLButtonElement | null} */
const themeToggleBtn = /** @type {HTMLButtonElement | null} */ (
    document.getElementById('theme-toggle')
);

/**
 * Updates the theme toggle button's aria-label to reflect the current action.
 * @param {string} theme - The current active theme ('dark' | 'light').
 */
function updateThemeToggleAccessibility(theme) {
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
    const initialTheme = htmlElement.getAttribute('data-theme') || Theme.DARK;
    updateThemeToggleAccessibility(initialTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme') || Theme.DARK;
            const newTheme = currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeToggleAccessibility(newTheme);
        });
    }
}
