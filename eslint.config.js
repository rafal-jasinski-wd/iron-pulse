import js from '@eslint/js';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2021,
                ...globals.node
            }
        },
        rules: {
            'no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }
            ],
            'no-console': 'off',
            eqeqeq: ['error', 'always'],
            curly: ['error', 'all']
        }
    },
    {
        ignores: ['node_modules/', 'coverage/', 'lighthouse-*.json', 'a11y-*.json', 'bp-*.json']
    }
];
