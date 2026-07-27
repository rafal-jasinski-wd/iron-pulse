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

    /** @type {number} */
    let lastSubmissionTime = 0;
    const SUBMISSION_COOLDOWN_MS = 3000;

    if (registrationForm && thankYouCard) {
        registrationForm.addEventListener('submit', (e) => {
            try {
                e.preventDefault();

                const now = Date.now();
                if (now - lastSubmissionTime < SUBMISSION_COOLDOWN_MS) {
                    console.warn('Submission rate limit exceeded. Please wait a moment.');
                    return;
                }
                lastSubmissionTime = now;

                // Honeypot anti-spam check
                /** @type {HTMLInputElement | null} */
                const honeypot = /** @type {HTMLInputElement | null} */ (
                    document.getElementById('website_hp')
                );
                if (honeypot && honeypot.value.trim() !== '') {
                    console.warn('Bot submission detected via honeypot field.');
                    return;
                }

                // Sanitize text inputs
                const formData = new FormData(registrationForm);
                const rawName = (formData.get('name') || '').toString().trim().slice(0, 100);
                const rawEmail = (formData.get('email') || '').toString().trim().slice(0, 254);
                const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!rawName || !rawEmail || !EMAIL_REGEX.test(rawEmail)) {
                    console.warn('Submission rejected: missing or invalid email format.');
                    return;
                }

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
