module.exports = {
  root: true,
  extends: [
    '@titicaca/eslint-config-triple',
    '@titicaca/eslint-config-triple/frontend',
    '@titicaca/eslint-config-triple/prettier',
  ],
  rules: {
    'import/no-unresolved': 'off',
    'import/namespace': 'off',
    'react/jsx-handler-names': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'no-console': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
}
