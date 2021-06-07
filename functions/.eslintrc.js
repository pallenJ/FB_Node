module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",'prettier'
  ],
  rules: {
    indent: 'off',
    'linebreak-style': 0,
    // "quotes": [2, "double", { "avoidEscape": false }],
     "quotes": ['off', 'single'],
  },
};
