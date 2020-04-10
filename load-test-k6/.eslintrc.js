module.exports = {
  root: true,
  extends: [
    'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:import/errors',
    'plugin:import/warnings',
    "plugin:jsdoc/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',  // Allows for the use of imports
  },
  plugins: [
    "prettier"
  ],
  rules: {
    "prettier/prettier": [2,
    {
      "tabWidth": 4,
      "singleQuote": true
    }],
    "import/no-unresolved": 0,
    "eol-last": 2,
    "spaced-comment": 2
  }
};
