module.exports = {
  env: {
    node: true,
  },
  extends: ['airbnb', 'eslint-config-prettier'],
  parser: 'babel-eslint',
  plugins: ['eslint-plugin-prettier'],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'max-len': [2, 120, 4],
    'no-param-reassign': ['error', { props: false }],
    'no-underscore-dangle': 0,
    'one-var': ['error', { initialized: 'never' }],
    'one-var-declaration-per-line': ['error', 'initializations'],
    'prettier/prettier': ['error'],
    'sort-keys': ['error', 'asc', { caseSensitive: true, natural: true }],
    'sort-vars': ['error', { ignoreCase: false }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
