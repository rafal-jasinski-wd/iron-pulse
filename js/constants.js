/**
 * Application Constants
 * Single source of truth for string values, class names, and selectors.
 * Enables strict type checking and prevents magic string errors.
 * @module constants
 */

/**
 * Theme modes
 * @enum {string}
 * @readonly
 */
export const Theme = Object.freeze({
    DARK: 'dark',
    LIGHT: 'light'
});

/**
 * CSS class names and active state hooks
 * @enum {string}
 * @readonly
 */
export const ClassName = Object.freeze({
    ACTIVE: 'active',
    EXPANDED: 'expanded',
    HIDDEN: 'hidden',
    SCROLLED: 'scrolled'
});

/**
 * ARIA state and description attributes
 * @enum {string}
 * @readonly
 */
export const AriaState = Object.freeze({
    EXPANDED: 'aria-expanded',
    HIDDEN: 'aria-hidden',
    LABEL: 'aria-label',
    LIVE: 'aria-live',
    CONTROLS: 'aria-controls'
});

/**
 * Application DOM selectors
 * @enum {string}
 * @readonly
 */
export const Selector = Object.freeze({
    NAVBAR: '#navbar',
    NAV_MENU: '#nav-menu',
    MOBILE_TOGGLE: '.mobile-toggle',
    NAV_LINKS: '.nav-links a',
    THEME_TOGGLE: '#theme-toggle',
    REVEAL_ELEMENTS: '.reveal',
    TRAINER_CARDS: '.trainer-card',
    REGISTRATION_FORM: '#registration-form',
    THANK_YOU_CARD: '#thank-you-card',
    RESET_FORM: '#reset-form',
    HONEYPOT: '#website_hp'
});
