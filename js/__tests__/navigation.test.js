import { describe, it, expect, beforeEach } from 'vitest';
import { initNavigation } from '../navigation.js';

describe('Navigation Module', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <header id="navbar">
                <button class="mobile-toggle" aria-expanded="false" aria-controls="nav-menu">Menu</button>
                <nav class="nav-menu" id="nav-menu">
                    <ul class="nav-links">
                        <li><a href="#home">Home</a></li>
                    </ul>
                </nav>
            </header>
        `;
        initNavigation();
    });

    it('should open mobile menu on toggle click', () => {
        const toggle = /** @type {HTMLButtonElement} */ (document.querySelector('.mobile-toggle'));
        const menu = /** @type {HTMLElement} */ (document.querySelector('.nav-menu'));

        toggle.click();

        expect(toggle.classList.contains('active')).toBe(true);
        expect(toggle.getAttribute('aria-expanded')).toBe('true');
        expect(menu.classList.contains('active')).toBe(true);
    });

    it('should close mobile menu when escape key is pressed', () => {
        const toggle = /** @type {HTMLButtonElement} */ (document.querySelector('.mobile-toggle'));
        const menu = /** @type {HTMLElement} */ (document.querySelector('.nav-menu'));

        toggle.click(); // Open menu
        expect(menu.classList.contains('active')).toBe(true);

        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

        expect(toggle.classList.contains('active')).toBe(false);
        expect(menu.classList.contains('active')).toBe(false);
    });
});
