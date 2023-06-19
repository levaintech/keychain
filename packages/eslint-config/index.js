module.exports = {
  extends: [
    'universe',
    'universe/shared/typescript-analysis',
    '@stickyjs'
  ],
  rules: {
    'import/no-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': ['error', {allowExpressions: true}],
  }
};