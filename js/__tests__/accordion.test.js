import { describe, it, expect, beforeEach } from 'vitest';
import { initAccordion } from '../accordion.js';

describe('Accordion Module', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="trainer-card" id="card-1">
                <div class="trainer-bio" aria-hidden="true" style="height: 0px;">Bio 1</div>
            </div>
            <div class="trainer-card" id="card-2">
                <div class="trainer-bio" aria-hidden="true" style="height: 0px;">Bio 2</div>
            </div>
        `;
        initAccordion();
    });

    it('should expand card when clicked', () => {
        const card1 = /** @type {HTMLElement} */ (document.getElementById('card-1'));
        const bio1 = /** @type {HTMLElement} */ (card1.querySelector('.trainer-bio'));

        card1.click();

        expect(card1.classList.contains('expanded')).toBe(true);
        expect(card1.getAttribute('aria-expanded')).toBe('true');
        expect(bio1.getAttribute('aria-hidden')).toBe('false');
    });

    it('should collapse existing expanded card when another is clicked', () => {
        const card1 = /** @type {HTMLElement} */ (document.getElementById('card-1'));
        const card2 = /** @type {HTMLElement} */ (document.getElementById('card-2'));

        card1.click();
        expect(card1.classList.contains('expanded')).toBe(true);

        card2.click();
        expect(card1.classList.contains('expanded')).toBe(false);
        expect(card2.classList.contains('expanded')).toBe(true);
    });
});
