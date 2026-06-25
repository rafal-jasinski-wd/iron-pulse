// @ts-check

/**
 * Accordion Module
 * Controls the trainer card expand/collapse behavior with
 * GPU-accelerated height/opacity transitions and full ARIA state management.
 * @module accordion
 */

import { ClassName, AriaState } from './constants.js';

/**
 * Toggles a single trainer card's expanded state.
 * Collapses any other expanded card before opening the target.
 * @param {HTMLElement} card - The trainer card element to toggle.
 * @param {NodeListOf<HTMLElement>} allCards - All trainer card elements for accordion behavior.
 */
function toggleTrainerCard(card, allCards) {
    const isExpanded = card.classList.contains(ClassName.EXPANDED);

    /** @type {HTMLElement | null} */
    const bio = card.querySelector('.trainer-bio');
    if (!bio) return;

    // Close all other expanded cards (accordion pattern)
    allCards.forEach((otherCard) => {
        if (otherCard !== card && otherCard.classList.contains(ClassName.EXPANDED)) {
            otherCard.classList.remove(ClassName.EXPANDED);
            otherCard.setAttribute(AriaState.EXPANDED, 'false');

            /** @type {HTMLElement | null} */
            const otherBio = otherCard.querySelector('.trainer-bio');
            if (otherBio) {
                otherBio.setAttribute(AriaState.HIDDEN, 'true');
                otherBio.style.height = otherBio.scrollHeight + 'px';
                void otherBio.offsetHeight; // Force reflow
                otherBio.style.height = '0px';
            }
        }
    });

    // Toggle selected card
    if (!isExpanded) {
        card.classList.add(ClassName.EXPANDED);
        card.setAttribute(AriaState.EXPANDED, 'true');
        bio.setAttribute(AriaState.HIDDEN, 'false');

        bio.style.height = bio.scrollHeight + 'px';
        bio.addEventListener('transitionend', function handler(e) {
            if (e.propertyName === 'height' && card.classList.contains(ClassName.EXPANDED)) {
                bio.style.height = 'auto';
                bio.removeEventListener('transitionend', handler);
            }
        });
    } else {
        card.setAttribute(AriaState.EXPANDED, 'false');
        bio.setAttribute(AriaState.HIDDEN, 'true');

        bio.style.height = bio.scrollHeight + 'px';
        void bio.offsetHeight; // Force reflow
        card.classList.remove(ClassName.EXPANDED);
        bio.style.height = '0px';
    }
}

/**
 * Initializes click and keyboard event handlers on all trainer cards.
 * Supports click, Enter, and Space key activation.
 */
export function initAccordion() {
    /** @type {NodeListOf<HTMLElement>} */
    const trainerCards = document.querySelectorAll('.trainer-card');

    trainerCards.forEach((card) => {
        card.addEventListener('click', () => toggleTrainerCard(card, trainerCards));

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTrainerCard(card, trainerCards);
            }
        });
    });
}
