module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2020": true,
    "node": true,
    "jest/globals": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "arrowFunctions": true
    },
    "ecmaVersion": 6
  },
  "plugins": [
    "react",
    "jest"
  ],
  "rules": {
  },
  "parser": "babel-eslint"
};
