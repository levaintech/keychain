module.exports = {
  extends: ['universe', 'universe/shared/typescript-analysis', '@stickyjs'],
  rules: {
    'import/no-default-export': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
  },
  overrides: [
    {
      files: ['**/*.e2e.ts'],
      extends: ['prettier', 'plugin:playwright/playwright-test'],
      rules: {
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
};
