import { describe, it, expect } from 'vitest';
import { Theme, ClassName, AriaState, Selector } from '../constants.js';

describe('Constants Module Immutability', () => {
    it('should be frozen objects preventing runtime mutations', () => {
        expect(Object.isFrozen(Theme)).toBe(true);
        expect(Object.isFrozen(ClassName)).toBe(true);
        expect(Object.isFrozen(AriaState)).toBe(true);
        expect(Object.isFrozen(Selector)).toBe(true);
    });

    it('should contain correct theme values', () => {
        expect(Theme.DARK).toBe('dark');
        expect(Theme.LIGHT).toBe('light');
    });

    it('should contain correct selector strings', () => {
        expect(Selector.NAVBAR).toBe('#navbar');
        expect(Selector.THEME_TOGGLE).toBe('#theme-toggle');
        expect(Selector.REGISTRATION_FORM).toBe('#registration-form');
    });
});
