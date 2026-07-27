// @ts-check

/**
 * IronPulse Architecture Barrel Export & Lifecycle Orchestrator
 * Centralizes public module interfaces, component initializations,
 * and state management abstractions.
 * @module index
 */

export * from './constants.js';
export { initTheme } from './theme.js';
export { initNavigation } from './navigation.js';
export { initReveals } from './reveals.js';
export { initAccordion } from './accordion.js';
export { initForm } from './form.js';

import { initTheme } from './theme.js';
import { initNavigation } from './navigation.js';
import { initReveals } from './reveals.js';
import { initAccordion } from './accordion.js';
import { initForm } from './form.js';

/**
 * Bootstraps all application UI modules in the correct initialization sequence.
 * @returns {void}
 */
export function bootstrapApp() {
    initTheme();
    initNavigation();
    initReveals();
    initAccordion();
    initForm();
}
