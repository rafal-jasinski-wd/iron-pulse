import { describe, it, expect, beforeEach } from 'vitest';
import { initForm } from '../form.js';

describe('Form Module (Intake & Anti-Spam)', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <form id="registration-form" class="register-form">
                <input type="text" name="website_hp" id="website_hp" value="" />
                <input type="text" name="name" id="name" required />
                <input type="email" name="email" id="email" required />
                <input type="checkbox" name="privacy_consent" id="privacy_consent" required />
                <button type="submit" id="submit-btn">Submit</button>
            </form>
            <div id="thank-you-card" class="thank-you-card hidden" tabindex="-1">
                <button id="reset-form">Reset</button>
            </div>
            <div id="register"></div>
        `;
        initForm();
    });

    it('should show thank-you card on valid form submission', () => {
        const form = /** @type {HTMLFormElement} */ (document.getElementById('registration-form'));
        const thankYouCard = /** @type {HTMLElement} */ (document.getElementById('thank-you-card'));
        const nameInput = /** @type {HTMLInputElement} */ (document.getElementById('name'));
        const emailInput = /** @type {HTMLInputElement} */ (document.getElementById('email'));
        const consentCheckbox = /** @type {HTMLInputElement} */ (
            document.getElementById('privacy_consent')
        );

        nameInput.value = ' Jane Doe ';
        emailInput.value = ' jane@example.com ';
        consentCheckbox.checked = true;

        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));

        expect(form.classList.contains('hidden')).toBe(true);
        expect(thankYouCard.classList.contains('hidden')).toBe(false);
    });

    it('should reject submission when email format is invalid', () => {
        const form = /** @type {HTMLFormElement} */ (document.getElementById('registration-form'));
        const thankYouCard = /** @type {HTMLElement} */ (document.getElementById('thank-you-card'));
        const nameInput = /** @type {HTMLInputElement} */ (document.getElementById('name'));
        const emailInput = /** @type {HTMLInputElement} */ (document.getElementById('email'));

        nameInput.value = 'Jane Doe';
        emailInput.value = 'invalid-email-address';

        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));

        expect(form.classList.contains('hidden')).toBe(false);
        expect(thankYouCard.classList.contains('hidden')).toBe(true);
    });

    it('should reject bot submissions when honeypot field is populated', () => {
        const form = /** @type {HTMLFormElement} */ (document.getElementById('registration-form'));
        const thankYouCard = /** @type {HTMLElement} */ (document.getElementById('thank-you-card'));
        const honeypot = /** @type {HTMLInputElement} */ (document.getElementById('website_hp'));

        honeypot.value = 'http://spam-bot.com';

        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));

        expect(form.classList.contains('hidden')).toBe(false);
        expect(thankYouCard.classList.contains('hidden')).toBe(true);
    });

    it('should restore form visibility and reset fields on reset button click', () => {
        const form = /** @type {HTMLFormElement} */ (document.getElementById('registration-form'));
        const thankYouCard = /** @type {HTMLElement} */ (document.getElementById('thank-you-card'));
        const resetBtn = /** @type {HTMLButtonElement} */ (document.getElementById('reset-form'));

        form.classList.add('hidden');
        thankYouCard.classList.remove('hidden');

        resetBtn.click();

        expect(form.classList.contains('hidden')).toBe(false);
        expect(thankYouCard.classList.contains('hidden')).toBe(true);
    });
});
