module.exports = {
    settings: {
        'import/parsers': {
            // 使用 TypeScript parser
            '@typescript-eslint/parser': ['.ts']
        },
        'import/resolver': {
            node: {
                extensions: ['.ts']
            }
        }
    },
    env: {
        browser: true,
        es6: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-base',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        // 禁止使用 var
        'no-var': 'error',
        // 优先使用 interface 而不是 type
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        'linebreak-style': [0, 'error', 'windows'],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never'
            }
        ],
        'no-console': 'off',
        'no-nested-ternary': 'off',
        '@typescript-eslint/no-this-alias': [
            'error',
            {
                allowDestructuring: true, // Allow `const { props, state } = this`; false by default
                allowedNames: ['that'] // Allow `const self = this`; `[]` by default
            }
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        'no-underscore-dangle': ['error', { allow: ['_id'] }],
        'prefer-const': 'off',
        'no-restricted-syntax': 'off',
        'no-await-in-loop': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/interface-name-prefix': [
            'error',
            {
                prefixWithI: 'always'
            }
        ],
        'class-methods-use-this': 'off'
    }
};
