module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  settings: {},
  extends: ['plugin:vue/essential'],
  rules: {
    'array-callback-return': [0],
    'prefer-template': [0],
    'prefer-destructuring': [0],
    'no-underscore-dangle': [0],
    'no-shadow': [0],
    'consistent-return': [0],
    'no-console': [0],
    'max-len': [0],
    'function-paren-newline': [0],
    'no-mixed-operators': [0],
    'no-unused-expressions': [0]
  }
}
