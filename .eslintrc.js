module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'plugin:cypress/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'cypress'],
  rules: {
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    'arrow-body-style': [2, 'as-needed'],
    'no-unused-expressions': [
      2,
      {
        allowTaggedTemplates: true,
      },
    ],
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'no-debugger': 0,
    'no-alert': 0,
    'no-unused-vars': 1,
    'no-console': 0,
    'import/prefer-default-export': 0,
    'func-names': 0,
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'max-len': 0,
    'import/extensions': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    'react/display-name': 1,
    'react/no-array-index-key': 0,
    'react/prefer-stateless-function': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-unescaped-entities': 0,
    'jsx-a11y/accessible-emoji': 0,
    'react/require-default-props': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': 0,
    'no-nested-ternary': 0,
    'no-shadow': 0,
    'cypress/no-unnecessary-waiting': 0,
  },
};
