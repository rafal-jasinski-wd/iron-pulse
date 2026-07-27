import { describe, it, expect, beforeEach } from 'vitest';
import { initTheme } from '../theme.js';

describe('Theme Module', () => {
    beforeEach(() => {
        document.documentElement.removeAttribute('data-theme');
        localStorage.clear();
        document.body.innerHTML = `
            <button id="theme-toggle" aria-label="Toggle theme"></button>
        `;
    });

    it('should initialize theme state from data-theme or default to dark', () => {
        document.documentElement.setAttribute('data-theme', 'dark');
        initTheme();
        const btn = /** @type {HTMLButtonElement} */ (document.getElementById('theme-toggle'));
        expect(btn.getAttribute('aria-label')).toBe('Switch to light theme');
    });

    it('should toggle theme from dark to light on click', () => {
        document.documentElement.setAttribute('data-theme', 'dark');
        initTheme();
        const btn = /** @type {HTMLButtonElement} */ (document.getElementById('theme-toggle'));

        btn.click();

        expect(document.documentElement.getAttribute('data-theme')).toBe('light');
        expect(localStorage.getItem('theme')).toBe('light');
        expect(btn.getAttribute('aria-label')).toBe('Switch to dark theme');
    });
});
