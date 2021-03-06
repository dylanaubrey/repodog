module.exports = {
  env: {
    node: true,
  },
  extends: ['airbnb-base', 'eslint-config-prettier'],
  parser: 'babel-eslint',
  plugins: ['eslint-plugin-prettier', 'sort-class-members'],
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
    'padding-line-between-statements': [
      2,
      { blankLine: 'any', next: '*', prev: '*' },
      { blankLine: 'always', next: '*', prev: 'multiline-block-like' },
      { blankLine: 'always', next: 'multiline-block-like', prev: '*' },
      { blankLine: 'always', next: '*', prev: 'multiline-expression' },
      { blankLine: 'always', next: 'multiline-expression', prev: '*' },
      { blankLine: 'always', next: '*', prev: 'directive' },
      { blankLine: 'always', next: 'directive', prev: '*' },
      { blankLine: 'always', next: '*', prev: 'multiline-const' },
      { blankLine: 'always', next: 'multiline-const', prev: '*' },
      { blankLine: 'always', next: '*', prev: 'multiline-let' },
      { blankLine: 'always', next: 'multiline-let', prev: '*' },
      { blankLine: 'never', next: 'cjs-export', prev: 'cjs-export' },
      { blankLine: 'never', next: 'cjs-import', prev: 'cjs-import' },
      { blankLine: 'always', next: 'case', prev: '*' },
      { blankLine: 'always', next: 'default', prev: '*' },
      { blankLine: 'never', next: 'break', prev: '*' },
    ],
    'prettier/prettier': [2],
    'sort-class-members/sort-class-members': [
      2,
      {
        accessorPairPositioning: 'getThenSet',
        groups: {
          'arrow-function-properties': [
            { propertyType: 'ArrowFunctionExpression', sort: 'alphabetical', type: 'property' },
          ],
          methods: [{ sort: 'alphabetical', type: 'method' }],
          'private-arrow-function-properties': [
            { name: '/_.+/', propertyType: 'ArrowFunctionExpression', type: 'property' },
          ],
          'private-methods': [{ name: '/_.+/', sort: 'alphabetical', type: 'method' }],
          'private-properties': [{ name: '/_.+/', sort: 'alphabetical', type: 'property' }],
          properties: [{ sort: 'alphabetical', type: 'property' }],
          'static-methods': [{ sort: 'alphabetical', static: true, type: 'method' }],
          'static-private-methods': [{ name: '/_.+/', sort: 'alphabetical', static: true, type: 'method' }],
          'static-private-properties': [{ name: '/_.+/', sort: 'alphabetical', static: true, type: 'property' }],
          'static-properties': [{ sort: 'alphabetical', static: true, type: 'property' }],
        },
        order: [
          '[static-properties]',
          '[static-private-properties]',
          '[static-methods]',
          '[static-private-methods]',
          '[arrow-function-properties]',
          '[properties]',
          '[private-arrow-function-properties]',
          '[private-properties]',
          'constructor',
          'getters',
          'setters',
          '[methods]',
          '[private-methods]',
        ],
      },
    ],
    'sort-keys': [2, 'asc', { caseSensitive: true, natural: true }],
    'sort-vars': [2, { ignoreCase: false }],
  },
};
