// @ts-check

/**
 * Form Module
 * Handles registration form submission, success state display,
 * and focus management for accessibility.
 * @module form
 */

import { ClassName } from './constants.js';

/**
 * Initializes the registration form handlers.
 * On submit: hides form, shows thank-you card, shifts focus.
 * On reset: restores form, returns focus to first input.
 */
export function initForm() {
    /** @type {HTMLFormElement | null} */
    const registrationForm = /** @type {HTMLFormElement | null} */ (
        document.getElementById('registration-form')
    );

    /** @type {HTMLElement | null} */
    const thankYouCard = document.getElementById('thank-you-card');

    /** @type {HTMLButtonElement | null} */
    const resetBtn = /** @type {HTMLButtonElement | null} */ (
        document.getElementById('reset-form')
    );

    /** @type {HTMLElement | null} */
    const navbar = document.getElementById('navbar');

    if (registrationForm && thankYouCard) {
        registrationForm.addEventListener('submit', (e) => {
            try {
                e.preventDefault();

                registrationForm.classList.add(ClassName.HIDDEN);
                thankYouCard.classList.remove(ClassName.HIDDEN);

                // Shift focus to success announcement for screen readers
                thankYouCard.focus();
                thankYouCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } catch (err) {
                console.error('Error during form submission handling:', err);
            }
        });
    }

    if (resetBtn && registrationForm && thankYouCard) {
        resetBtn.addEventListener('click', () => {
            try {
                thankYouCard.classList.add(ClassName.HIDDEN);
                registrationForm.classList.remove(ClassName.HIDDEN);
                registrationForm.reset();

                // Return focus to first interactive field
                /** @type {HTMLElement | null} */
                const firstInput = registrationForm.querySelector('input, select, textarea');
                if (firstInput) {
                    firstInput.focus();
                }

                // Scroll back to registration section
                const registerSection = document.getElementById('register');
                if (registerSection) {
                    const navHeight = navbar ? navbar.offsetHeight : 80;
                    window.scrollTo({
                        top: registerSection.offsetTop - navHeight,
                        behavior: 'smooth'
                    });
                }
            } catch (err) {
                console.error('Error during form reset handling:', err);
            }
        });
    }
}
