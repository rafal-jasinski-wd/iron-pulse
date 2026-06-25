// @ts-check

/**
 * Reveals Module
 * Uses IntersectionObserver to trigger scroll-in animations on `.reveal` elements.
 * Automatically disconnects the observer once all elements have been revealed.
 * @module reveals
 */

import { ClassName } from './constants.js';

/**
 * Initializes the IntersectionObserver for scroll reveal animations.
 * Each element is unobserved after activation, and the observer
 * disconnects entirely when all elements have been revealed.
 */
export function initReveals() {
    /** @type {NodeListOf<HTMLElement>} */
    const revealElements = document.querySelectorAll('.reveal');
    let revealCount = revealElements.length;

    if (revealCount === 0) return;

    /** @type {IntersectionObserverInit} */
    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.05
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add(ClassName.ACTIVE);
                observer.unobserve(entry.target);
                revealCount--;

                if (revealCount === 0) {
                    observer.disconnect();
                }
            }
        });
    }, revealOptions);

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
}
