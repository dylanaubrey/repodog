export default {
  env: {
    node: true,
  },
  extends: [
    "airbnb",
  ],
  parser: "babel-eslint",
  rules: {
    "import/no-extraneous-dependencies": 0,
    "linebreak-style": 0,
    "max-len": [2, 120, 4],
    "no-param-reassign": ["error", { props: false }],
    "no-underscore-dangle": 0,
    "one-var": ["error", { initialized: "never" }],
    "one-var-declaration-per-line": ["error", "initializations"],
    "sort-keys": ["error", "asc", { caseSensitive: true, natural: true }],
    "sort-vars": ["error", { ignoreCase: false }],
  },
};
