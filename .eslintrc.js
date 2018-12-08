module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: ['airbnb-base', 'prettier'],
  rules: {
    'no-console': 0,
    'linebreak-style': [0, 'error', 'windows']
  }
};
