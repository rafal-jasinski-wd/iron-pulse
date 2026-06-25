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
export const Theme = {
    DARK: 'dark',
    LIGHT: 'light'
};

/**
 * CSS class names and active state hooks
 * @enum {string}
 * @readonly
 */
export const ClassName = {
    ACTIVE: 'active',
    EXPANDED: 'expanded',
    HIDDEN: 'hidden',
    SCROLLED: 'scrolled'
};

/**
 * ARIA state and description attributes
 * @enum {string}
 * @readonly
 */
export const AriaState = {
    EXPANDED: 'aria-expanded',
    HIDDEN: 'aria-hidden',
    LABEL: 'aria-label',
    LIVE: 'aria-live',
    CONTROLS: 'aria-controls'
};
