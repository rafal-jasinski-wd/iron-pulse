# IronPulse Architecture Manifest

## Overview

**IronPulse** is built on a pure, zero-dependency Vanilla HTML5, CSS3, and ES Module architecture. The codebase is designed for maximum runtime performance, fault tolerance, strict type safety, and WCAG 2.1 AA accessibility compliance.

---

## Directory & Module Hierarchy

```
iron-pulse/
├── index.html              # Core semantic structure, meta headers, SVG sprite definitions
├── style.css               # Design tokens, CSS custom properties, responsive component layouts
├── script.js               # Entry point; global error boundary & DOM bootstrapper
├── _headers                # Production HTTP response security headers for static edge hosting
├── tsconfig.json           # Compiler options for JavaScript type checking (`checkJs: true`)
├── vitest.config.js        # Vitest configuration for happy-dom test environment
├── js/
│   ├── index.js            # Barrel export module & `bootstrapApp()` orchestrator
│   ├── constants.js        # Immutable design tokens, enum strings, and DOM selectors (`Object.freeze`)
│   ├── theme-init.js       # Synchronous <head> blocking FOUC prevention script
│   ├── theme.js            # Theme toggle management & localStorage persistence
│   ├── navigation.js       # Mobile navigation overlay, scroll-throttling & smooth anchor scrolling
│   ├── reveals.js          # IntersectionObserver scroll reveal animation manager
│   ├── accordion.js        # Accessible trainer card disclosure & transition handler
│   ├── form.js             # Intake form handling, anti-spam honeypot & string sanitization
│   └── __tests__/
│       └── form.test.js    # Unit tests for form intake & anti-spam validation
└── .github/
    └── workflows/
        └── ci.yml          # GitHub Actions CI workflow (lint, type-check, test, format, audit)
```

---

## Key Architectural Principles

### 1. Immutability & Single Source of Truth

All string literals, CSS state classes, ARIA attributes, and DOM query selectors are declared in `js/constants.js` and protected with `Object.freeze()`. This prevents magic string typos and runtime property mutation.

### 2. Component-Prefix Methodology (CSS)

Styles follow a hybrid BEM / CUBE methodology using component prefixes:

- **Components**: `.trainer-card`, `.pricing-card`, `.feature-card`
- **Elements**: `.trainer-bio`, `.trainer-img`
- **States**: `.active`, `.expanded`, `.hidden`, `.scrolled`
- **Utilities**: `.reveal`, `.delay-1`, `.card-hover`

### 3. Progressive Enhancement & Accessibility (WCAG 2.1 AA)

- FOUC is eliminated via a synchronous inline `<head>` parser (`js/theme-init.js`).
- All interactive controls bind ARIA states (`aria-expanded`, `aria-controls`, `aria-hidden`, `aria-live`).
- Keyboard traps are avoided with proper focus redirection and `Escape` key handlers.
- Reduced-motion fallbacks are declared via `<noscript>` style blocks.

### 4. Continuous Quality Gates

The build validation suite (`npm run validate`) enforces a 4-tier security & quality pipeline:

1. `npm test`: Automated Vitest unit test suite execution.
2. `npm run lint`: ESLint (JS) and Stylelint (CSS) static analysis.
3. `npm run type-check`: TypeScript type validation (`tsc --noEmit`).
4. `npm run format:check`: Prettier code style validation.
5. `npm audit`: Automated high-severity dependency vulnerability scanner in CI.
