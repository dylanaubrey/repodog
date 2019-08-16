module.exports = {
  env: {
    node: true,
  },
  extends: ['airbnb', 'eslint-config-prettier'],
  parser: 'babel-eslint',
  plugins: ['eslint-plugin-prettier'],
  rules: {
    'func-names': [2, 'always'],
    'import/no-extraneous-dependencies': 0,
    'max-len': [2, { code: 120, comments: 100, ignoreRegExpLiterals: true, ignoreUrls: true }],
    'no-nested-ternary': 0,
    'no-param-reassign': [2, { props: false }],
    'no-underscore-dangle': 0,
    'no-use-before-define': [2, { functions: false }],
    'one-var': [2, { initialized: 'never' }],
    'one-var-declaration-per-line': [2, 'initializations'],
    'prettier/prettier': [2],
    'sort-keys': [2, 'asc', { caseSensitive: true, natural: true }],
    'sort-vars': [2, { ignoreCase: false }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
