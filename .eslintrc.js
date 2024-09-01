module.exports = {
  root: true,
  extends: [
    '@titicaca/eslint-config-triple',
    '@titicaca/eslint-config-triple/requiring-type-checking',
    '@titicaca/eslint-config-triple/prettier',
  ],
  rules: {
    'no-console': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'import/order': 'off',
  },
  settings: {
    'import/ignore': ['react-native'],
  },
}
